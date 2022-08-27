const mysql = require("mysql");
const users = [];
const statistics_command =
  "SELECT (SELECT COUNT(*) FROM `joinus` WHERE DATE(`提交时间`)=CURRENT_DATE) AS '今日提交',(SELECT COUNT(*) FROM `joinus`) AS '所有提交',(SELECT COUNT(*) FROM `joinus` WHERE `性别`='女') AS '女',(SELECT COUNT(*) FROM `joinus` WHERE `性别`='男') AS '男',(SELECT COUNT(*) FROM `joinus` WHERE `第一志愿`='组织策划部') AS '组策1',(SELECT COUNT(*) FROM `joinus` WHERE `第一志愿`='技术开发部') AS '技术1',(SELECT COUNT(*) FROM `joinus` WHERE `第一志愿`='科普活动部') AS '科普1',(SELECT COUNT(*) FROM `joinus` WHERE `第一志愿`='新闻宣传部') AS '新宣1',(SELECT COUNT(*) FROM `joinus` WHERE `第一志愿`='对外联络部') AS '外联1',(SELECT COUNT(*) FROM `joinus` WHERE `第一志愿`='双创联合服务部') AS '双创1',(SELECT COUNT(*) FROM `joinus` WHERE `第二志愿`='组织策划部') AS '组策2',(SELECT COUNT(*) FROM `joinus` WHERE `第二志愿`='技术开发部') AS '技术2',(SELECT COUNT(*) FROM `joinus` WHERE `第二志愿`='科普活动部') AS '科普2',(SELECT COUNT(*) FROM `joinus` WHERE `第二志愿`='新闻宣传部') AS '新宣2',(SELECT COUNT(*) FROM `joinus` WHERE `第二志愿`='对外联络部') AS '外联2',(SELECT COUNT(*) FROM `joinus` WHERE `第二志愿`='双创联合服务部') AS '双创2'";

const pool_insert = mysql.createPool({
  connectionLimit: 50,
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

module.exports = { pool_insert, pool_select, users, statistics_command };
