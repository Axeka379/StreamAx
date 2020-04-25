const jwtHandler = require("../authorization/jwtHandler");

const startController = {};

startController.getStart = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "YAHALLO fetched from server",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

startController.loginPost = async (req, res, next) => {
  try {
    console.log(req.body)
    const jwtToken = await jwtHandler.getTokenForAuth(
      req.body.username,
      req.body.password,
      10000
    );

    if (jwtToken) {
      res.status(200).json({
        message:
          "Accepted",
        APIToken: jwtToken,
      });
    } else {
      res.status(401).json({
        message: "Denied user, wrong username or password",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = startController;
