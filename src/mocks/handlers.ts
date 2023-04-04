import { rest } from "msw";
import { getSession } from "next-auth/react";
import fetch from "node-fetch";

export const handlers = [
  rest.post("http://localhost:3000/api/todo", async (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(201),
      ctx.set("Accept", "text/plain, */*"),
      ctx.set("Content-Type", "application/json"),
      ctx.set("Authorization", `token 123456`),
      ctx.set("timeout", "20000"),
      ctx.json({ status: 200, message: "success" })
    );
  }),
];
