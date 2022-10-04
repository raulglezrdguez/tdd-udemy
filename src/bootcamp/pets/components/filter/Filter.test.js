import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Filter from "./Filter";

describe("Filter", () => {
  test("should be able to change value of favorite", () => {
    render(<Filter filters={{}} setFilters={jest.fn()} />);

    // get favorite select
    const favoriteSelect = screen.getByLabelText(/favorite/i);

    // initially favorite select set to any
    expect(favoriteSelect).toHaveValue("any");
    expect(favoriteSelect.value).toBe("any");

    // select favorite
    userEvent.selectOptions(favoriteSelect, "favorite");
    expect(favoriteSelect).toHaveValue("favorite");

    // select not favorite
    userEvent.selectOptions(favoriteSelect, "not favorite");
    expect(favoriteSelect).toHaveValue("not favorite");
  });

  test("should be able to change value of gender", () => {
    render(<Filter filters={{}} setFilters={jest.fn()} />);

    // get gender select
    const genderSelect = screen.getByLabelText(/gender/i);

    // initially favorite select set to any
    expect(genderSelect).toHaveValue("any");
    expect(genderSelect.value).toBe("any");

    // select gender female
    userEvent.selectOptions(genderSelect, "male");
    expect(genderSelect).toHaveValue("male");

    // select gender female
    userEvent.selectOptions(genderSelect, "female");
    expect(genderSelect).toHaveValue("female");
  });
});
