import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    //if get method just send back all the trips
    const trips = await prisma.trip.findMany();
    res.status(200).json(trips);
  }

  if (req.method === "POST") {
    //if POST method accept it only if have a user and a name included, if not send an error
    const { user, name, start_date, end_date } = req.body;

    if (!user || !name) {
      return res.status(400).json({ error: "user and name required" });
    }

    await prisma.trip.create({
      //create the respective POST
      data: {
        user,
        name,
        start_date,
        end_date,
      },
    });
    return res.status(200).end();
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
