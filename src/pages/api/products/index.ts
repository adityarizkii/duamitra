import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

async function getMethodHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.products.findMany({
      orderBy: {
        name: "asc",
      },
    });
    // console.log(data);

    res.status(200).json({ message: "success", data });
  } catch (err) {
    res.status(504).json({ message: "error when try to get products" });
    console.log(err);
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    getMethodHandler(req, res);
  }
}

export default handler;
