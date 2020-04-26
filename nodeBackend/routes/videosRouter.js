const express = require("express");
const router = express.Router();
const controller = require("../controllers/videosController");
const jwtHandler = require("../authorization/jwtHandler");

router.route("/").get(controller.getVideos);

module.exports = router;
