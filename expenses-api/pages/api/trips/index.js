import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    //if get method just send back all the trips
    const trips = await prisma.trip.findMany();

    await Promise.all(
      //as we have an .map method so we need to tell the program to wait for iterate all values that why we use promise.all()
      trips.map(async (trip) => {
        //trip is another variable that is actually an array created with .map() which contain the trip and the expense related to taht trip
        trip.expenses = await prisma.expense.findMany({
          //.expenses create a new key named "expenses" and the put the expenses related to that trip using .findMany
          where: {
            // find all expenses that have the id of the trip same as the .map() we create before
            trip: trip.id,
          },
        });
      })
    );

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
