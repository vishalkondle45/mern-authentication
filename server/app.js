const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");

const app = express();

app.use(express.json())
app.use("/api", router);
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://mern:mern@cluster0.ayvj5pf.mongodb.net/mern-authentication?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));
