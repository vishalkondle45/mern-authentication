const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  res.send("Hello There!");
});

app.listen(5000, () => {
  console.log("Listining to localhost 5000");
});
