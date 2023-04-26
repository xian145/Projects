export const getTweets = async (prisma) => {
  //this code will extract the data from the tables in descending order
  return await prisma.Tweet.findMany({
    where: {},
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
};
