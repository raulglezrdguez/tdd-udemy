/* eslint-disable testing-library/no-debugging-utils */
import { rest } from "msw";

import { render, screen, within } from "@testing-library/react";
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

  test("should filter for favorite cats", async () => {
    render(<Pets />);

    // get all cards
    const cards = await screen.findAllByRole("article");

    // click the first and fourth card favorite button
    // within: search elements within another element only (nested queries)
    const firstCardFavoriteButton = within(cards[0]).getByRole("button");
    const fourthCardFavoriteButton = within(cards[3]).getByRole("button");
    userEvent.click(firstCardFavoriteButton);
    userEvent.click(fourthCardFavoriteButton);

    // set favorite select to favorite
    const favoriteSelect = screen.getByRole("combobox", { name: /favorite/i });
    userEvent.selectOptions(favoriteSelect, "favorite");

    // get the favorite cards
    const favoriteCards = screen.getAllByRole("article");
    expect(favoriteCards).toStrictEqual([cards[0], cards[3]]);
  });

  test("should filter for not favorite cats", async () => {
    render(<Pets />);

    // get all cards
    const cards = await screen.findAllByRole("article");

    // click the second and third card favorite button
    // within: search elements within another element only (nested queries)
    const secondCardFavoriteButton = within(cards[1]).getByRole("button");
    const thirdCardFavoriteButton = within(cards[2]).getByRole("button");
    userEvent.click(secondCardFavoriteButton);
    userEvent.click(thirdCardFavoriteButton);

    // set favorite select to not favorite
    const favoriteSelect = screen.getByRole("combobox", { name: /favorite/i });
    userEvent.selectOptions(favoriteSelect, "not favorite");

    // get the not favorite cards
    const notFavoriteCards = screen.getAllByRole("article");
    expect(notFavoriteCards).toStrictEqual([cards[0], cards[3], cards[4]]);
  });

  test("should filter for favorite male cats", async () => {
    render(<Pets />);

    // get all cards
    const cards = await screen.findAllByRole("article");

    // set favorite to third and fourth cats
    const thirdCard = within(cards[2]).getByRole("button");
    const fourthCard = within(cards[3]).getByRole("button");
    userEvent.click(thirdCard);
    userEvent.click(fourthCard);

    // select male gender
    const genderSelect = screen.getByLabelText(/gender/i);
    userEvent.selectOptions(genderSelect, "male");
    // select favorite
    const favoriteSelect = screen.getByLabelText(/favorite/i);
    userEvent.selectOptions(favoriteSelect, "favorite");

    // expect show fourth cat
    const filteredCards = screen.getAllByRole("article");
    expect(filteredCards).toStrictEqual([cards[3]]);
  });
});
