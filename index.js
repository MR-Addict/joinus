// Offical packages
const express = require("express");

// Offical variable
const app = express();
// set the view engine to ejs
app.set("view engine", "ejs");

// Offical middleware
app.use(express.static("public"));

// Router
app.get("/", (req, res) => {
  res.render("pages/index");
});

app.post("/", (req, res) => {
  res.render("pages/index");
  console.log(new Date().toLocaleString() + " Form submit");
});

// Listening on port 8084
const port = process.env.PORT || 8084;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));
