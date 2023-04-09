// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { DeleteResponseData } from "types/todoType";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponseData>
) {
  const todoId = req.query.todoId as string;
  const deletedTodo = await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });

  res.status(200).json({
    todo: {
      id: deletedTodo.id,
      task: deletedTodo.task!,
      user_id: deletedTodo.userId,
      is_completed: deletedTodo.is_completed,
    },
  });
}
