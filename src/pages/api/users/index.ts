import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const getMethodHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.users.findMany();
    // console.log(data);
    return res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(500).json({ message: "error when try to get data" });
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    getMethodHandler(req, res);
  }
}

export default handler;
