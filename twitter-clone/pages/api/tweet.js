import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end("method not allowed");
  }

  const session = await getServerSession(req, res, authOptions);

  //search for the user in the db
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  //this function will handle the request if is a POST request
  if (req.method === "POST") {
    await prisma.Tweet.create({
      data: {
        content: req.body.content,
        author: {
          connect: { id: user.id }, //we are telling to prisma that the id for teh author most be search un User table and extract from there
        },
      },
    });
    res.end();
    return;
  }

  res.end();
}
