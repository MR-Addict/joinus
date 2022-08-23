const mysql = require("mysql");
const users = [];

const pool_insert = mysql.createPool({
  connectionLimit: 4,
  host: "localhost",
  user: "joinus_insert",
  password: "password",
  database: "joinus",
});

const pool_select = mysql.createPool({
  connectionLimit: 4,
  host: "localhost",
  user: "joinus_select",
  password: "password",
  database: "joinus",
});

pool_insert.getConnection((err, connection) => {
  if (err) console.error(err);
  else {
    console.log("MySQL Connected successfully!");
    connection.release();
  }
});

pool_select.query("SELECT * FROM admin", function (err, result, fields) {
  if (err) {
    console.error(err);
  } else {
    result.forEach(function (user) {
      users.push(user);
    });
  }
});

module.exports = { pool_insert, pool_select, users };
