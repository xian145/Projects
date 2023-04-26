import { useSession } from "next-auth/react"; //to check if the user is logged in
import { useRouter } from "next/router";
import NewTweet from "@/components/newTweet";
import Tweets from "@/components/tweets";
import prisma from "@/lib/prisma";
import { getTweets } from "@/lib/data";
import { useEffect } from "react";

export default function Home({ tweets }) {
  useEffect(() => {
    document.body.style.opacity = 1;
  }, []);
  //to this function enter tweets as a props from the function below this one
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    //render nothing if loading
    return null;
  }

  if (!session) {
    //return to root page if not loggin
    router.push("/");
  }

  if (session && !session.user.username) {
    //if dont have username send the user to /setup
    router.push("/setup");
    return;
  }

  return (
    <>
      <NewTweet />
      <Tweets tweets={tweets} />
      <a
        href="/api/auth/signout"
        className="border border-gray-100 hover:bg-red-600"
      >
        Logout
      </a>
    </>
  );
}

export async function getServerSideProps() {
  //this function will call the function "getTweets" from /lib/data.js and send prisma as a prop so can use prisma
  let tweets = await getTweets(prisma); //wait to get all the ifnormation from the tables
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
}
