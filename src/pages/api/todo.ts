// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  status: number;
  message: string;
};

type TodoRequest = {
  user_id: string;
  task: string;
};

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.body);
  const { user_id, task } = req.body as TodoRequest;
  await prisma.todo.create({
    data: {
      userId: user_id,
      task: task,
    },
  });
  res.status(201).json({ status: 201, message: "success" });
}
