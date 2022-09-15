// Offical packages
const express = require("express");
const excel = require("exceljs");
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
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

const suspend_time = "2022-10-16 12:00:00";

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

// Routers
app.get("/", (req, res) => {
  if (new Date().getTime() < new Date(suspend_time).getTime())
    res.render("pages/suspend", { message: suspend_time + " 后可重新报名" });
  else res.render("pages/index");
});

app.post("/", (req, res) => {
  if (new Date().getTime() < new Date(suspend_time).getTime()) {
    res.render("pages/suspend", { message: suspend_time + " 后可重新报名" });
    return;
  }

  const joinus_records = req.body;
  const joinus_sql = "INSERT INTO joinus SET ?";
  const joinus_validate_result = joinus_schema.form_schema.validate(joinus_records);

  if (joinus_validate_result.error) {
    console.error(joinus_validate_result.error);
    res.status(502).render("pages/fail", { message: "错误原因：你提交的表单存在格式错误" });
  } else {
    joinus_pool.pool_insert.query(joinus_sql, joinus_records, (error, result) => {
      if (error) {
        console.error(error);
        res.status(502).render("pages/fail", { message: "错误原因：你的表单保存到数据库错误" });
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
    successRedirect: "/admin",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/admin");
  });
});

app.post("/insight", checkAuthenticated, (req, res) => {
  const insight_render = { single: "", days: "" };
  joinus_pool.pool_select.query(joinus_pool.statistics_command.single_cmd, (err, result, fields) => {
    if (err) {
      console.error(err);
    } else {
      if (result.length) {
        insight_render.single = JSON.parse(JSON.stringify(result[0]));
      }
    }
    // select days
    joinus_pool.pool_select.query(joinus_pool.statistics_command.days_cmd, (err, result, fields) => {
      if (err) {
        console.error(err);
      } else {
        if (result.length) {
          insight_render.days = JSON.parse(JSON.stringify(result));
        }
      }
      res.send(insight_render);
    });
  });
});

app.get("/admin", checkAuthenticated, (req, res) => {
  const admin_render = { login_user: req.user.username };
  res.render("pages/admin", admin_render);
});

// Export mysql data
app.get("/export", checkAuthenticated, (req, res) => {
  if (req.user.username === "visitor") {
    res.send("You have no access!");
    return;
  }
  joinus_pool.pool_select.query("SELECT * FROM joinus", (err, result, fields) => {
    if (err) {
      console.error(err);
    } else {
      // export data
      if (result.length) {
        // Create sheets
        const punch_export = JSON.parse(JSON.stringify(result));
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet("报名表单");
        const worksheet_columns = [];
        Object.keys(punch_export[0]).forEach(function (prop) {
          worksheet_columns.push({
            header: prop,
            key: prop,
          });
        });
        worksheet.columns = worksheet_columns;
        worksheet.addRows(punch_export);

        // Wrap text and alignment
        Object.keys(punch_export[0]).forEach((prop) => {
          worksheet.getColumn(prop).width = 15;
          worksheet.getColumn(prop).alignment = { vertical: "middle", horizontal: "center" };
          if (prop === "自我介绍") {
            worksheet.getColumn(prop).width = 100;
            worksheet.getColumn(prop).alignment = { vertical: "middle", horizontal: "left", wrapText: true };
          } else {
            if (["邮箱", "学号", "学院", "专业"].includes(prop)) {
              worksheet.getColumn(prop).width = 20;
            }
          }
        });
        // Header style
        worksheet.getRow(1).font = {
          bold: true,
          color: { argb: "00008B" },
        };

        // Export excel
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" +
            "%E6%8A%A5%E5%90%8D%E6%80%BB%E8%A1%A8-" +
            new Date().toISOString().split("T")[0] +
            ".xlsx"
        );
        return workbook.xlsx.write(res).then(function () {
          res.status(200).end();
        });
      }
      // databse is empty
      else {
        console.error("The database is empty!");
      }
    }
  });
});

// Listening on port 8084
const port = process.env.PORT || 8084;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));
