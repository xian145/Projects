import prisma from "@/lib/prisma";
import { AuthOptions } from "pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AuthOptions);

  if (!session) return res.status(401).json({ message: "Not logged in" });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) return res.status(401).json({ message: "user not found" });

  //this function will handle the request if is a POST request
  if (req.method === "POST") {
    console.log(req.body);
  }

  res.end();
}
