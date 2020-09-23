const jwtHandler = require("../authorization/jwtHandler");
const fs = require("fs");
const videoController = {};

videoController.getVideos = async (req, res, next) => {
  console.log("get video");
  //const path = "/home/nnms/hdd0m/Lager/Adventure.Time.S01-10.COMPLETE.Plus.Extras.1080p.WEB-DL.BluRay.x264-MiXED/Adventure.Time.With.Finn.And.Jake.S02.1080p.BluRay.x264-DEiMOS/advtimes02e03.mp4"
  const path = "/home/nnms/hdd1m/Tank/Rick.and.Morty.S04E10.1080p.WEBRip.x264-BTX/rick.and.morty.s04e10.1080p.webrip.x264-btx.mkv"
  //const path = "/home/nnms/hdd2m/Tank/Avatar The Last Airbender S01-S03 br hevc-d3g/Avatar The Last Airbender S01/Avatar.The.Last.Airbender.S01E01.BluRay.1080p.AC3.H265-d3g.mkv"
  
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
