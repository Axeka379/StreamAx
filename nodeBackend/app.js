require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// routes
app.use("/", require("./routes/homeRouter"));

// Uncaught 404's
app.use((req, res, next) => {
  res.status(404);
  res.json({ message: "404 - resource not found" });
});

// Uncaught server errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

app.listen(process.env.PORT ? process.env.PORT : 4000, () =>
  console.log(`Listening on port ${process.env.PORT ? process.env.PORT : 4000}!`)
);
