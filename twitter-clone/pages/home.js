import { useSession } from "next-auth/react"; //to check if the user is logged in
import { useRouter } from "next/router";
import NewTweet from "@/components/newTweet";
import Tweets from "@/components/tweets";

export default function Home() {
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

  return (
    <>
      <NewTweet />
      <Tweets
        tweets={[
          { content: "test" },
          { content: "another" },
          { content: "me la pelas", pelas: "si pelas" },
        ]}
      />
      {/*we call to the component Tweets and send some information (tweets)*/}
      <a
        href="/api/auth/signout"
        className="border border-gray-100 hover:bg-red-600"
      >
        Logout
      </a>
    </>
  );
}
