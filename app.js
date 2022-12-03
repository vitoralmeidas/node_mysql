const express = require("express");
const con = require("./DB/config");

const app = express();

// posts json data
app.use(express.json());

const PORT = 3000;

// get
app.get("/usuarios", (req, res) => {
  con.query("select * from usuarios", (err, results) => {
    if (err) res.json({ message: err });
    else res.json({ results });
  });
});

// get by id
app.get("/usuarios/:id_usuario", (req, res) => {
  con.query(
    "SELECT * FROM usuarios WHERE id_usuario = ?",
    req.params.id_usuario,
    function (err, results, fields) {
      if (err) res.json({ message: err });
      else res.json({ message: results });
    }
  );
});

// put
app.put("/usuarios/:id_usuario", (req, res) => {
  const data = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.cpf,
    req.params.id_usuario,
  ];

  con.query(
    "UPDATE usuarios SET nome = ?, email = ?, telefone = ?, cpf = ? WHERE id_usuario = ?",
    data,
    function (err, results, fields) {
      if (err) res.json({ message: err });
      else res.json({ results });
    }
  );
});

// post
app.post("/usuarios", (req, res) => {
  const data = req.body;
  con.query("INSERT INTO usuarios SET?", data, function (err, results, fields) {
    if (err) res.json({ message: err });
    else res.json({ results });
  });
});

// delete
app.delete("/usuarios/:id_usuario", (req, res) => {
  con.query(
    "DELETE FROM usuarios WHERE id_usuario =" + req.params.id_usuario,
    function (err, results, fields) {
      if (err) res.json({ message: err });
      else res.json({ results });
    }
  );
});

// listen for requests
app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
