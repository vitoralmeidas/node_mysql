const express = require("express");
const con = require("./DB/config");

const app = express();

// posts json data
app.use(express.json());

////////////////////////// USUARIOS ///////////////////////////////
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
      else {
        res.json({ message: results });
        results.forEach((e) => console.log(e.id_usuario));
      }
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

////////////////////////// ENDEREÇOS ///////////////////////////////

//get by user id
app.get("/enderecos-usuario/:id_usuario", (req, res) => {
  con.query(
    "SELECT * FROM endereco_usuario WHERE id_usuario = ?",
    req.params.id_usuario,
    function (err, results, fields) {
      if (err) res.json({ message: err });
      else res.json({ results });
    }
  );
});

// get by address id
app.get("/enderecos-usuario/:id_endereco_usuario", (req, res) => {
  con.query(
    "SELECT * FROM endereco_usuario WHERE id_endereco_usuario = ?",
    req.params.id_endereco_usuario,
    function (err, results) {
      if (err) res.json({ err });
      else res.json({ results });
    }
  );
});

// post new address
app.post("/enderecos-usuario/", (req, res) => {
  const data = req.body;
  con.query(
    "INSERT INTO endereco_usuario SET ?",
    data,
    function (err, results) {
      if (err) res.json({ err });
      else res.json({ results });
    }
  );
});

// put
app.put("/enderecos-usuario/:id_endereco_usuario", (req, res) => {
  const data = [
    req.body.id_usuario,
    req.body.logradouro,
    req.body.numero,
    req.body.cidade,
    req.body.uf,
    req.body.cep,
    req.body.bairro,
    req.body.complemento,
    req.params.id_endereco_usuario,
  ];
  con.query(
    "UPDATE endereco_usuario SET id_usuario = ?, logradouro = ?, numero = ?, cidade = ?, uf = ?, cep = ?, bairro = ?, complemento = ? WHERE id_endereco_usuario = ?",
    data,
    function (err, results, fields) {
      if (err) res.json({ err });
      else res.json({ results });
    }
  );
});

// delete
app.delete("/enderecos-usuario/:id_endereco_usuario", (req, res) => {
  con.query(
    "DELETE FROM endereco_usuario WHERE id_endereco_usuario = " +
      req.params.id_endereco_usuario,
    function (err, results) {
      if (err) res.json({ err });
      else res.json({ results });
    }
  );
});

// listen for requests
const PORT = 3000;
app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
