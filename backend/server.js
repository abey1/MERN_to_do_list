const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");

const app = express();

// enforcing cores policy
app.use(cors());

// allowing the backend accepting json
app.use(express.json());

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
