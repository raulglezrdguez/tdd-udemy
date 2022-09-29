import userEvent from "@testing-library/user-event";

import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

describe("Total Updates", () => {
  test("update scoops subtotal when scoops change", async () => {
    render(<Options optionType={"scoops"} />);

    // make sure total starts out at $0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent(/0.00$/i);

    // update vanilla scoop to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent(/2.00$/i);

    // update chocolate scoop to 2 and check the subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(scoopsSubtotal).toHaveTextContent(/6.00$/i);
  });

  test("update toppings subtotal when toppings change", async () => {
    render(<Options optionType={"toppings"} />);

    // make sure total starts at $0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent(/\$0.00$/i);

    // check the checkbox Cherries and check the subtotals
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent(/\$1.50$/i);

    // check the checkbox M&Ms and check the subtotals
    const mmsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    userEvent.click(mmsCheckbox);
    expect(toppingsSubtotal).toHaveTextContent(/\$3.00$/i);

    // uncheck M&Ms and check the subtotals
    userEvent.click(mmsCheckbox);
    expect(toppingsSubtotal).toHaveTextContent(/\$1.50$/i);
  });
});
