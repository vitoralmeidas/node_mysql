const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();

const execQuery = (sqlQuery, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test_back_node",
    password: process.env.MYSQL_PASS,
  });
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) res.json(error);
    else res.json(results);
    connection.end();
    console.log("Executou!");
  });
};

// posts json data
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Ok..." });
});

app.post("/clientes", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const cpf = req.body.cpf;
  execQuery(
    `INSERT INTO usuarios(nome, email, telefone, cpf) VALUES('${nome}', '${email}', '${telefone}', '${cpf}')`,
    res
  );
});

// listen for requests
app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
