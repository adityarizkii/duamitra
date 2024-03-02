import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const getMethodHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.history.findMany({
      include: {
        product: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(500).json({ message: "error when try to get data" });
  }
};

const postMethodHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody: any = JSON.parse(req.body);
  console.log(reqBody);

  try {
    await prisma.history.create({
      data: {
        type: reqBody.type,
        qty: reqBody.qty,
        productId: reqBody.productId,
        userId: reqBody.userId,
        price: reqBody.price,
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
