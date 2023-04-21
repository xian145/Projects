export default async function handler(req, res) {
  //this function will handle the request if is a POST request
  if (req.method === "POST") {
    console.log("test");
  }

  res.end();
}
