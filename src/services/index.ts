import prisma from "@/lib/prisma";

export const getUser = async (username: string) => {
  const users = await prisma.users.findMany();

  const user = users.find((user) => user.username === username);
  if (user) return user;

  return null;
};
