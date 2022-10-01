import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

describe("Options", () => {
  test("displays image from each scoop option from server", async () => {
    render(<Options optionType={"scoops"} />);

    // find images
    const images = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(images).toHaveLength(2);

    // confirm alt text of images
    const altText = images.map((image) => image.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("displays image from each tooping option from server", async () => {
    render(<Options optionType={"toppings"} />);

    // find images
    const images = await screen.findAllByRole("img", { name: /topping$/i });
    expect(images).toHaveLength(3);

    // confirm alt text of images
    const altText = images.map((image) => image.alt);
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
  });

  test("no scoops subtotal update on invalid input", async () => {
    render(<Options optionType={"scoops"} />);

    // get scoopsTotal
    const scoopsTotal = screen.getByText(/scoops total: \$/i, { exact: false });
    expect(scoopsTotal).toBeInTheDocument();
    expect(scoopsTotal).toHaveTextContent(/\$0.00/i);

    // get vanilla input
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    expect(vanillaInput).toBeInTheDocument();

    // set invalid input
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");
    // expect no change in scoops total
    expect(scoopsTotal).toHaveTextContent(/\$0.00/i);

    // set valid input
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    // expect scoops total change correctly
    expect(scoopsTotal).toHaveTextContent(/\$2.00/i);
  });
});
