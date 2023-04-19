import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const expense = await prisma.expense.findUnique({
      where: {
        id: parseInt(req.query.id), //req.query.id is a string so we use parseInt to transform that string to a integer, bc id need to be integer
      },
    });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json(expense);
  }

  if (req.method === "PUT") {
    const { trip, name, date, amount, currency } = req.body;

    await prisma.expense.update({
      data: {
        trip,
        name,
        date,
        amount,
        currency,
      },
      where: {
        id: parseInt(req.query.id),
      },
    });

    return res.status(200).end("updated");
  }

  if (req.method === "DELETE") {
    await prisma.expense.delete({
      where: {
        id: parseInt(req.query.id),
      },
    });

    return res.status(200).end("Expense Deleted");
  }
}
