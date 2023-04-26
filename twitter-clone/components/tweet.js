export default function Tweet({ tweet }) {
  //recive as an argument tweet, that came from tweets that came form home, and return a <p></p> with the content of the tweet
  return (
    //content is a property that came from the array
    <p>{tweet.content}</p>
  );
}
