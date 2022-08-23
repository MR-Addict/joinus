const mysql = require("mysql");

const pool_insert = mysql.createPool({
  connectionLimit: 4,
  host: "localhost",
  user: "joinus_insert",
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

module.exports = { pool_insert };
