import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const getMethodHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.products.findUnique({
      where: {
        id: req.query.id as string,
      },
    });
    console.log(data);
    return res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(500).json({ message: "error when try to get data" });
  }
};

const patchMethodHanlder = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const reqBody = JSON.parse(req.body);

  try {
    const data = await prisma.products.update({
      where: {
        id: req.query.id as string,
      },
      data: {
        name: reqBody.name,
        price: reqBody.price,
        stock: reqBody.stock,
      },
    });
    return res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(500).json({ message: "error when try to get data" });
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    getMethodHandler(req, res);
  } else if (req.method === "PATCH") {
    patchMethodHanlder(req, res);
  }
}

export default handler;
