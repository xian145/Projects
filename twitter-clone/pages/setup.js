import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Setup() {
  const { data: session, status } = useSession(); //we get data from the user session
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  if (!session || !session.user) {
    router.push("/");
    return;
  }

  if (status === "loading") return null;

  if (status !== "loading" && session.user.username) {
    //if already have a username go to /home
    router.push("/home");
    return;
  }

  return (
    <div className="flex justify-center p-4 mt-20">
      <form
        className="mt-2 ml-20"
        onSubmit={async (e) => {
          e.preventDefault();

          if (!username || !name) {
            alert("Fill all inputs");
            return;
          }

          await fetch("/api/setup", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ name, username }),
          });
          session.user.name = name;
          session.user.username = username;
          router.push("/home");
        }}
      >
        <div className="flex-1 mb-5">
          <div className="flex-1 mb-5">Name</div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-1 text-black border"
            placeholder="Henrick"
          />
          <div className="flex-1 mt-4 mb-5">Username</div>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="p-1 text-black border"
            placeholder="henrick.145"
          />
        </div>

        <button className="px-8 py-2 mt-2 mr-8 font-bold border rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover">
          Save
        </button>
      </form>
    </div>
  );
}
