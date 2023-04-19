import prisma from "lib/prisma";

export default async function handler(req, res) {
  //all this methos we need to know the id of the trip
  if (req.method === "GET") {
    const trip = await prisma.trip.findUnique({
      where: {
        id: parseInt(req.query.id), //req.query.id is a string so we use parseInt to transform that string to a integer, bc id need to be integer
      },
    });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    res.status(200).json(trip);
  }

  if (req.method === "PUT") {
    const { user, name, start_date, end_date } = req.body;

    await prisma.trip.update({
      data: {
        user,
        name,
        start_date,
        end_date,
      },
      where: {
        id: parseInt(req.query.id),
      },
    });

    return res.status(200).end("updated");
  }

  if (req.method === "DELETE") {
  }
}
