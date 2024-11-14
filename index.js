const http = require("http");
const port = process.env.PORT || 3000;
const fs = require("fs");

function serverStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("500 - Internal Error");
    }
    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  //normalize url by removing querystring, optional
  //trailing slash, and making it lowercase

  const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
  switch (path) {
    case "":
      serverStaticFile(res, "/public/home.html", "text/html");
      break;

    case "/about":
      serverStaticFile(res, "/public/about.html");
      break;

    default:
      serverStaticFile(res, "/public/404.html", "text/html");
      res.end("not found");
      break;
  }
});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
