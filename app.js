const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello Mysql");
});

// listen for requests
app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
