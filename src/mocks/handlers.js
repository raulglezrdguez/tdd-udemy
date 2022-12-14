import { rest } from "msw";
import cats from "../bootcamp/pets/mocks/cats.json";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),
  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    // create random order number
    const orderNumber = Math.floor(Math.random() * 1000000);
    return res(ctx.status(200), ctx.json({ orderNumber }));
  }),
  rest.get("http://localhost:3030/cats", (req, res, ctx) => {
    // return cats
    return res(ctx.status(200), ctx.json(cats));
  }),
];
