/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Card from "./Card";

const cardProps = {
  name: "Sydney",
  phone: "1111111111",
  email: "laura@gmail.com",
  image: { url: "/images/sydney.png", alt: "sydney" },
  favorite: false,
  updateFavorite: jest.fn(),
};

describe("card", () => {
  test("should show props of cat", () => {
    render(<Card {...cardProps} />);

    // cat name
    expect(
      screen.getByRole("heading", { name: /sydney/i })
    ).toBeInTheDocument();

    // owner phone number
    expect(screen.getByText(/1111111111/i)).toBeInTheDocument();

    // owner email
    expect(screen.getByText(/laura@gmail.com/i)).toBeInTheDocument();

    // image cat
    expect(screen.getByRole("img", { name: /sydney/i })).toBeInTheDocument();
    expect(screen.getByAltText(/sydney/i).src).toContain("/images/sydney.png");
    expect(screen.getByAltText(/sydney/i)).toHaveAttribute(
      "src",
      "/images/sydney.png"
    );
  });

  test("should show outline heart", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByAltText(/outline heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });

  test("should show filled heart", () => {
    render(<Card {...cardProps} favorite={true} />);

    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/outline heart/i)).not.toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByAltText(/outline heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();

    const heartButton = screen.getByRole("button");
    userEvent.click(heartButton);

    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/outline heart/i)).not.toBeInTheDocument();

    userEvent.click(heartButton);

    expect(screen.getByAltText(/outline heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });
});
