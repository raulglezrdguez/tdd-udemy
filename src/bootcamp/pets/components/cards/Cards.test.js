import { render, screen } from "@testing-library/react";

import Cards from "./Cards";

import cats from "../../mocks/cats.json";

describe("Cards", () => {
  test("should render five cards", () => {
    render(<Cards cats={cats} />);

    // search cards
    const cards = screen.getAllByRole("article");
    // expect(cards).toHaveLength(5);
    expect(cards.length).toBe(5);
  });
});
