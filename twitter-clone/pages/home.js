import { useSession } from "next-auth/react"; //to check if the user is logged in
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    router.push("/");
  } else
    return (
      <div>
        <p>You are logged in!</p>
        <a
          href="/api/auth/signout"
          className="border border-gray-100 hover:bg-red-600"
        >
          Logout
        </a>
      </div>
    );
}
