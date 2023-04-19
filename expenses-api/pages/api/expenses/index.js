import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { trip, name, date, amount, currency } = req.body;
    // will check if all maramtetter that are required are present and then whill post the expense with that information
    if (!trip) {
      return res.status(400).json({ message: "missing trip parameter" });
    }

    if (!name) {
      return res.status(400).json({ message: "missing name parameter" });
    }

    if (!amount) {
      return res.status(400).json({ message: "missing amount parameter" });
    }

    await prisma.expense.create({
      data: {
        trip,
        name,
        date,
        amount,
        currency,
      },
    });

    return res.status(200).end();
  }

  // otherwise will send a error message
  res.status(405).json({ message: "Method Not Allowed" });
}
