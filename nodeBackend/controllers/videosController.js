const jwtHandler = require("../authorization/jwtHandler");
const fs = require("fs");
const videoController = {};

videoController.getVideos = async (req, res, next) => {
  console.log("get video");
  const path = "/home/nnms/hdd0m/Lager/Cosmos.Possible.Worlds.S01E01.Ladder.to.the.Stars.REPACK.1080p.WEBRip.x264-CAFFEiNE/Cosmos.Possible.Worlds.S01E01.Ladder.to.the.Stars.REPACK.1080p.WEBRip.x264-CAFFEiNE.mkv"; // add own file
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mkv",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mkv",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
};

module.exports = videoController;
