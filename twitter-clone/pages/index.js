import { useSession } from "next-auth/react"; //we can check is someone is logged in
import { useRouter } from "next/router"; //help us to redirect if the session is active

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (session) {
    //If the session is active before we render something we will make a redirection to the home page
    router.push("/home");
  } else
    return (
      <div>
        <h1>You are not login</h1>
        <a
          className="p-1 border border-gray-300 rounded-md hover:bg-green-100 hover:pointer hover:text-gray-800"
          href="/api/auth/signin"
        >
          Login
        </a>
      </div>
    );
}
