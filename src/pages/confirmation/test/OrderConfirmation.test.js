/* eslint-disable testing-library/no-debugging-utils */
import { rest } from "msw";

import { render, screen } from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import OrderConfirmation from "../OrderConfirmation";

describe("OrderConfirmation", () => {
  test("server error on order confirmation", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<OrderConfirmation setOrderPhase={jest.fn()} />);

    const alert = await screen.findByRole("alert");
    // screen.debug();
    expect(alert).toHaveTextContent(
      /an unexpected error ocurred. please try again later/i
    );
  });
});
