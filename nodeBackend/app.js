require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const jwtHandler = require("./authorization/jwtHandler");
const websocket = require("ws");
const https = require("https");
const http = require("http");

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/", require("./routes/homeRouter"));
app.use("/videos", require("./routes/videosRouter"));
//app.use(jwtHandler.jwtAuth, express.static('../../'));
//app.use(express.static('../../'))
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

let server;

try {
  const privateKey = fs.readFileSync("../.cert/key.pem", "utf8");
  const certificate = fs.readFileSync("../.cert/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app).listen(4000);

  // Redirect from http port 80 to https

  http
    .createServer(function (req, res) {
      res.writeHead(301, {
        Location: "https://" + req.headers["host"] + req.url,
      });
      res.end();
    })
    .listen(80);
} catch (error) {
  console.log(error.message);
  server = app.listen(process.env.PORT ? process.env.PORT : 4000, () =>
    console.log(
      `Listening on port ${process.env.PORT ? process.env.PORT : 4000}!`
    )
  );
}
const wss = new websocket.Server({ server })
app.on('upgrade', wss.handleUpgrade)

let webSockUsers = []

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === websocket.OPEN) {
      // console.log(data)
      client.send(data)
    }
  })
}

wss.on('connection', function connection(ws) {
  webSockUsers.push({
    wsConnection: ws,
    playerId: Math.round(Math.random() * 100),
  })
  // ws.send(
  //   JSON.stringify({ message: 'your id is' + Math.round(Math.random() * 100) })
  // )

  ws.on('message', function incoming(message) {
    wss.broadcast(message)
    //saveNewMessage(message)
    //console.log(message)
  })
  ws.on('close', function close() {
    // console.log('disconnected')
    //wss.broadcast(JSON.stringify({ message: "disconnected" }));
  })
})
