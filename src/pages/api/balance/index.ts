import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
const getMethodHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await prisma.balance.findMany();
  res.status(200).json({ message: "success", data });
};

const patchMethodHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const reqBody = JSON.parse(req.body);

  const existingBalance = await prisma.balance.findUnique({
    where: {
      id: "admin",
    },
  });

  if (!existingBalance)
    return res.status(404).json({ message: "Balance not found" });

  if (reqBody.type === "sell") {
    const data = await prisma.balance.update({
      where: {
        id: "admin",
      },
      data: {
        capitalBalance: reqBody.capitalBalance + existingBalance.capitalBalance,
        profitBalance: reqBody.profitBalance + existingBalance.profitBalance,
      },
    });
    res.status(200).json({ message: "success update balance", data });
  } else if (reqBody.type === "buy") {
    const data = await prisma.balance.update({
      where: {
        id: "admin",
      },
      data: {
        capitalBalance: existingBalance.capitalBalance - reqBody.capitalBalance,
      },
    });
    res.status(200).json({ message: "success update balance", data });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    getMethodHandler(req, res);
  } else if (req.method === "PATCH") {
    patchMethodHandler(req, res);
  }
};

export default handler;
