import { rest } from "msw";
import { getSession } from "next-auth/react";
import fetch from "node-fetch";

export const handlers = [
  rest.post("http://localhost:3000/api/todo", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(201),
      ctx.set("Accept", "text/plain, */*"),
      ctx.set("Content-Type", "application/json"),
      ctx.set("Authorization", `token 123456`),
      ctx.set("timeout", "20000"),
      ctx.json({
        todo: {
          id: "yyy",
          task: "task2",
          user_id: "aaa",
        },
      })
    );
  }),
  rest.get("http://localhost:3000/api/todo", (req, res, ctx) => {
    ctx.set("Accept", "text/plain, */*");
    ctx.set("Content-Type", "application/json");
    ctx.set("Authorization", `token 123456`);
    return res(
      ctx.status(200),
      ctx.json({
        todo_list: [
          {
            id: "xxx",
            task: "task1",
            user_id: "aaa",
          },
          {
            id: "yyy",
            task: "task2",
            user_id: "aaa",
          },
        ],
      })
    );
  }),
];
