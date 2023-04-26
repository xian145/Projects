import prisma from "lib/prisma";
import { authOptions } from "pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.end();

  if (req.method !== "POST") return res.end("method not allowed");

  if (req.method === "POST") {
    await prisma.user.update({
      //update the table "user"
      where: { email: session.user.email },
      data: {
        name: req.body.name,
        username: req.body.username,
      },
    });

    res.end();
  }
}
