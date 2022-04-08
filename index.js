if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (e) => console.error(e));
db.once("open", () => console.log("Mongo connected"));

app.use(express.json());

const centreRouter = require("./routes/centres");
app.use("/centres", centreRouter);

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Tracking your climbing made easy");
});

app.listen(process.env.PORT || 3000);
