require("dotenv").config();

const config = {
  db: {
    host: "localhost",
    user: "root",
    database: "test_back_node",
    password: process.env.MYSQL_PASS,
  },
};

module.exports = config;
