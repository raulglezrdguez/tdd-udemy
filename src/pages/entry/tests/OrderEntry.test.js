import { rest } from "msw";

import {
  render,
  screen,
  // waitFor,
} from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";

describe("OrderEntry", () => {
  test("handle errors for scoops and topping routes", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<OrderEntry />);

    // await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert", {
      // name: 'An unexpected error ocurred. Please try again later.',
    });

    expect(alerts).toHaveLength(2);
    // });
  });

  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent(/\$0.00/i);
  });

  test("update scoops, then toppings and check grandTotal", async () => {
    render(<OrderEntry />);

    // check grandTotal start on $0.00
    // const grandTotal = screen.getByText("Grand total: $", {
    //   exact: false,
    // });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent(/\$0.00/i);

    // update scoops and then update toppings and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    const hotfudgeInput = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotfudgeInput);
    expect(grandTotal).toHaveTextContent(/\$3.50$/i);

    // update toppings, then scoops and check grand total
    const mmsInput = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    userEvent.click(mmsInput);
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent(/\$9.00/i);

    // remove toppings and check grand total
    userEvent.click(mmsInput);
    expect(grandTotal).toHaveTextContent(/\$7.50/i);

    // remove scoops and check grand total
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "0");
    expect(grandTotal).toHaveTextContent(/\$3.50/i);
  });
});
