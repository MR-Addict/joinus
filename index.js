// Offical packages
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

// Offical variable
const app = express();

// Offical middleware
app.use(flash());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  })
);

// Custom libs
const joinus_schema = require("./libs/schema");
const joinus_pool = require("./libs/pool");
const initPassport = require("./libs/passportConfig");
initPassport(passport);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// check authenticate
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/admin");
}

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

app.get("/login", checkNotAuthenticated, (req, res) => {
  const error_message = req.flash("error");
  res.render("pages/login", { error: error_message });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Listening on port 8084
const port = process.env.PORT || 8084;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));
