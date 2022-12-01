require("dotenv").config();
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test_back_node",
  password: process.env.MYSQL_PASS,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});
