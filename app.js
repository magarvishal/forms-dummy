const express = require("express");
require("dotenv").config();
const app = express();
const formRouter = require("./routes/formRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/api/forms", formRouter);

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  const db = process.env.DATABASE;

  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("db connected");
    });
});
