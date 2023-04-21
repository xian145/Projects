import { useSession } from "next-auth/react";
import { useState } from "react";

export default function NewTweet() {
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  //we will not redirect since this is a component, simply will not render.
  if (!session || !session.user) return null;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!content) {
          alert("no content");
          return;
        }

        alert(content);
      }}
    >
      <div className="flex">
        <div className="flex px-1 pt-2 mt-2 ml-1 mr-1">
          <textarea
            className="w-full p-4 text-lg font-medium bg-transparent border outline-none color-primary"
            row={2}
            column={50}
            placeholder="What's happening?"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div>
        <div>
          <button className="text-black bg-blue-300 border hover:bg-blue-600">
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
}
