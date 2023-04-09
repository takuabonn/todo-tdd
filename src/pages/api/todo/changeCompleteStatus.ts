// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { UpdateResponseData } from "types/todoType";

type TodoUpdateRequest = {
  id: string;
  is_completed: boolean;
};

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateResponseData>
) {
  console.log(req.body);
  const { id, is_completed } = req.body as TodoUpdateRequest;
  const updatedTodo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      is_completed: is_completed,
    },
  });
  res.status(200).json({
    todo: {
      id: updatedTodo.id,
      task: updatedTodo.task!,
      user_id: updatedTodo.userId,
      is_completed: updatedTodo.is_completed,
    },
  });
}
