import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("SummaryForm", () => {
  test("Initial conditions", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("Checkbox enable button on first click and disable on second click", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });

    // clicking checkbox enable button
    // fireEvent.click(checkbox);
    userEvent.click(checkbox);
    expect(button).toBeEnabled();
    // clicking checkbox again disable button
    // fireEvent.click(checkbox);
    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    render(<SummaryForm />);
    // popover starts out hidden
    let popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termAndConditions);
    popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
