import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  //chek if the session is active
  if (!session) return res.status(401).json({ message: "Not logged in" });

  //search for the user in the db
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  //if user fetched is not succesful
  if (!user) return res.status(401).json({ message: "user not found" });

  //this function will handle the request if is a POST request
  if (req.method === "POST") {
    console.log(req.body);
  }

  res.end();
}
