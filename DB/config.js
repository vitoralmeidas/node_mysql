require("dotenv").config();
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test_back_node",
  password: process.env.MYSQL_PASS,
});

con.connect((err) => {
  if (err) console.warn("Error in connection");
});

module.exports = con;
