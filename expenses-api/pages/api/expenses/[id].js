import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const trip = await prisma.expense.findUnique({
      where: {
        id: parseInt(req.query.id), //req.query.id is a string so we use parseInt to transform that string to a integer, bc id need to be integer
      },
    });
    if (!trip) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(trip);
  }
}
