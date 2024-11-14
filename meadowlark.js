const express = require("express");
const app = express();

const { create } = require("express-handlebars");
const expressHandlebars = create({
  defaultLayout: "main",
});

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
});

//custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

//custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});

//configure handlebars view engine
app.engine("handlebars", expressHandlebars.engine);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

const fortunes = [
  "conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "you will have a pleasant surprise",
];

app.listen(port, () => {
  console.log(
    `Express started on http://localhost: ${port}; ` +
      `press Ctrl-C to terminate.`
  );
});
