// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { GetResponseData, PostResponseData, Todo } from "types/todoType";

type TodoRequest = {
  user_id: string;
  task: string;
};

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponseData | GetResponseData>
) {
  if (req.method === "POST") {
    console.log(req.body);
    const { user_id, task } = req.body as TodoRequest;
    const savedTodo = await prisma.todo.create({
      data: {
        userId: user_id,
        task: task,
      },
    });
    res.status(201).json({
      todo: {
        id: savedTodo.id,
        task: savedTodo.task!,
        user_id: savedTodo.userId,
      },
    });
  }

  if (req.method === "GET") {
    const session = await getSession();
    const todoList = await prisma.todo.findMany({
      where: {
        AND: {
          userId: session?.user.id,
        },
      },
    });

    res.status(200).json({
      todo_list: todoList.map((todo) => ({
        user_id: todo.userId,
        task: todo.task!,
        id: todo.id,
      })),
    });
  }
}
