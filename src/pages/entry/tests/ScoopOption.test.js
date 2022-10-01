/* eslint-disable testing-library/no-debugging-utils */
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import ScoopOption from "../ScoopOption";

describe("ScoopOption", () => {
  test("red input box for invalid scoop count", () => {
    render(
      <ScoopOption
        updateItemCount={jest.fn()}
        item={{ name: "Vanilla", imagePath: "/images/vanilla.png" }}
      />
    );
    const vanillaInput = screen.getByRole("spinbutton", { name: /vanilla/i });
    expect(vanillaInput).toBeInTheDocument();

    // input negative number
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");
    expect(vanillaInput).toHaveClass("is-invalid");

    // input out of range value
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "20");
    expect(vanillaInput).toHaveClass("is-invalid");

    // input decimal value
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1.2");
    expect(vanillaInput).toHaveClass("is-invalid");

    // input valid value
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");
    expect(vanillaInput).not.toHaveClass("is-invalid");
  });
});
