import Tweet from "./tweet";

export default function Tweets({ tweets }) {
  //to this function we send some infomration that is tweets
  if (!tweets) return null; //if its nothing in tweets then do nothing

  return (
    //if is something in tweets make a map of every tweet in the array and send it to the component "Tweet" with the key as index and the first argument is actually the curerent value from the array, so its tweets
    <>
      {tweets.map((tweet, index) => (
        <Tweet tweet={tweet} key={index} />
      ))}
    </>
  );
}
