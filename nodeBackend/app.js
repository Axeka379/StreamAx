require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fs = require('fs');
const privateKey = fs.readFileSync('../.cert/key.pem', 'utf8');
const certificate = fs.readFileSync('../.cert/cert.pem', 'utf8');
const https = require('https');

const credentials = {key: privateKey, cert: certificate};

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

https.createServer(credentials, app).listen(4000);