export const getTweets = async (prisma) => {
  //this code will extract the data from the tables in descending order
  return await prisma.Tweet.findMany({
    where: {},
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      //since author is not part of the original table we need to tell prisma to look into author that is the relation we made with the uiser table
      author: true,
    },
  });
};
