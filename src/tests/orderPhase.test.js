import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe("App", () => {
  test("order phases for happy path", async () => {
    // render App
    render(<App />);

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);

    // find and click order button
    const orderSummaryButton = screen.getByRole("button", {
      name: /order sundae/i,
    });
    userEvent.click(orderSummaryButton);

    // check summary information based on order
    const summaryHeading = screen.getByRole("heading", {
      name: /order summary/i,
    });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole("heading", {
      name: /scoops: \$6.00/i,
    });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingHeading = screen.getByRole("heading", {
      name: /toppings: \$1.50/i,
    });
    expect(toppingHeading).toBeInTheDocument();

    // check summary option items
    expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
    expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
    expect(screen.getByText("Cherries")).toBeInTheDocument();
    // // alternatively
    // const optionItems = screen.getAllByRole('listitem')
    // const optionItemsText = optionItems.map(item => item.textContent)
    // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries'])

    // accept terms and conditions and click button to confirm order
    const tcCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    userEvent.click(tcCheckbox);

    const confirmOrderButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    userEvent.click(confirmOrderButton);

    // confirm order number on confirmation page
    // this one is async because there is a POST request to the server
    const thankYouHeader = await screen.findByRole("heading", {
      name: /thank you/i,
    });
    expect(thankYouHeader).toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // click "new order" button on confirmation page
    const newOrderButton = screen.getByRole("button", {
      name: /new order/i,
    });
    userEvent.click(newOrderButton);

    // check that scoops and topping subtotals have been reset
    const scoopsTotal = screen.getByText(/scoops total: \$0.00/i);
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText(/toppings total: \$0.00/i);
    expect(toppingsTotal).toBeInTheDocument();

    // await for items to appear to avoid errors
    await screen.findByRole("spinbutton", { name: /vanilla/i });
    await screen.findByRole("checkbox", { name: /cherries/i });
  });
});
