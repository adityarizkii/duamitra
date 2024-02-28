import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const getMethodHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.history.findMany();
    // console.log(data);
    return res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(500).json({ message: "error when try to get data" });
  }
};

const postMethodHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  try {
    await prisma.history.create({
      data: {
        itemName: "test",
        details: "test",
        updater: "admin",
        transactionAmount: -1000000,
      },
    });
    res.status(200).json({ message: "success create history" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error when try to create history" });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    getMethodHandler(req, res);
  } else if (req.method === "POST") {
    postMethodHandler(req, res);
  }
};

export default handler;
