import { useSession } from "next-auth/react"; //to check if the user is logged in
import { useRouter } from "next/router";
import NewTweet from "@/components/newTweet";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loggin</p>;
  }

  if (!session) {
    router.push("/");
  }

  return (
    <div>
      <NewTweet />
      <a
        href="/api/auth/signout"
        className="border border-gray-100 hover:bg-red-600"
      >
        Logout
      </a>
    </div>
  );
}
