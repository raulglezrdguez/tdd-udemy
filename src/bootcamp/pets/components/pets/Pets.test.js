/* eslint-disable testing-library/no-debugging-utils */
import { rest } from "msw";

import { render, screen } from "@testing-library/react";
import { server } from "../../../../mocks/server";

import Pets from "./Pets";
import userEvent from "@testing-library/user-event";

describe("Pets", () => {
  test("should show filters and cats", async () => {
    render(<Pets />);

    const filters = screen.getAllByRole("combobox");
    expect(filters.length).toBe(2);

    const catCards = await screen.findAllByRole("article");
    expect(catCards.length).toBe(5);
  });

  test("should show error message on server error", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/cats", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Pets />);

    // expect error
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(
      /an unexpected error ocurred. please try again later/i
    );
  });

  test("should filter for male cats", async () => {
    render(<Pets />);

    // get all cards
    const cards = await screen.findAllByRole("article");

    // get filter gender combobox
    // const filterGender = screen.getByRole("combobox", { name: /gender/i });
    const filterGender = screen.getByLabelText(/gender/i);

    // change gender
    userEvent.selectOptions(filterGender, "male");

    // current cards should be only male
    const maleCards = screen.getAllByRole("article");
    // toStrictEqual for array and object
    expect(maleCards).toStrictEqual([cards[1], cards[3]]);
  });

  test("should filter for female cats", async () => {
    render(<Pets />);

    // get all cards
    const cards = await screen.findAllByRole("article");

    // get filter gender combobox
    // const filterGender = screen.getByRole("combobox", { name: /gender/i });
    const filterGender = screen.getByLabelText(/gender/i);

    // change gender
    userEvent.selectOptions(filterGender, "female");

    // current cards should be only male
    const femaleCards = screen.getAllByRole("article");
    // toStrictEqual for array and object
    expect(femaleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
  });
});
