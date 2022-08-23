// Offical packages
const express = require("express");
const bodyParser = require("body-parser");

// Offical variable
const app = express();
// set the view engine to ejs
app.set("view engine", "ejs");

// Offical middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Custom libs
const joinus_schema = require("./libs/schema");
const joinus_pool = require("./libs/pool");

// Router
app.get("/", (req, res) => {
  res.render("pages/index");
});

app.post("/", (req, res) => {
  const joinus_records = req.body;
  const joinus_sql = "INSERT INTO joinus SET ?";
  const joinus_validate_result = joinus_schema.form_schema.validate(joinus_records);

  if (joinus_validate_result.error) {
    console.error(joinus_validate_result.error);
    res.status(502).render("pages/fail");
  } else {
    joinus_pool.pool_insert.query(joinus_sql, joinus_records, (error, result) => {
      if (error) {
        console.error(error);
        res.status(502).render("pages/fail");
      } else {
        console.log(new Date().toLocaleString() + " New submit");
        res.render("pages/success");
      }
    });
  }
});

// Listening on port 8084
const port = process.env.PORT || 8084;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));
