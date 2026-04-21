const http = require("http");
const port = process.env.PORT || 8080;

http
  .createServer((req, res) => {
    const url = req.url;
    console.log(`Received request for ${url}`);

    try {
      if (url.match(/\/typst.*/)) {
        res.writeHead(200, {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        });

        const params = new URL(
          `http://${process.env.HOST ?? "localhost"}${req.url}`,
        ).searchParams;
        const url = params.get("url");
        console.log(`Fetching document from URL: ${url}`);
        const response = fetch(url).then((response) =>
          response.text().then((typstContent) => {
            res.write(typstContent);
            res.end();
          }),
        );
      }
    } catch (error) {
      console.log("Error fetching the document:", error);
      res.writeHead(500, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      });
      res.write("Error fetching the document.");
      res.end();
    }
  })
  .listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
