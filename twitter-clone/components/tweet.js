import timeago from "@/lib/timeago";

export default function Tweet({ tweet }) {
  //recive as an argument tweet, that came from tweets that came form home, and return a <p></p> with the content of the tweet
  return (
    //content is a property that came from the array
    <div className="flex flex-col p-3 m-3 border border-solid">
      <div className="flex space-x-2">
        <div className="font-extrabold ">{tweet.author.name}</div>
        <div className="text-gray-400">@{tweet.author.username}</div>
        <div className="text-gray-400">·</div>
        <div className="text-gray-400">
          {timeago.format(new Date(tweet.createdAt))}
        </div>
      </div>
      <div className="tweet-content">{tweet.content}</div>
    </div>
  );
}
