import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewTweet() {
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  //we will not redirect since this is a component, simply will not render.
  if (!session || !session.user) return null;

  const handleInput = (e) => {
    const element = e.target;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
    setContent(e.target.value);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!content) {
          alert("no content");
          return;
        }

        //if we have something in the content, lets do this
        await fetch("/api/tweet", {
          //fetch the api with a POST method the header is to indicate what type of information we are sending, is very important, and body is what we sending
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });

        router.reload(window.location.pathname); // with this th page will autoreload so we can see the tweet we just made
      }}
    >
      <div>
        <div className="flex items-center justify-center w-full">
          <div className="flex w-1/3 px-1 pt-2 mt-2 ml-1 mr-1">
            <textarea
              className="w-full p-4 overflow-hidden text-lg font-medium bg-transparent border outline-none resize-none"
              maxLength={280}
              placeholder="What's happening?"
              name="content"
              onChange={handleInput}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="flex justify-end w-1/3 px-1 pt-2 mt-2 ml-1 mr-1">
            <button className="flex px-8 py-2 mt-0 mr-2 font-bold border rounded-full item-end bg-[#1da1f2]">
              Tweet
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 mb-5"></div>
      </div>
    </form>
  );
}
