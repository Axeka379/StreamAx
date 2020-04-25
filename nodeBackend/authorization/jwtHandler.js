const jwt = require("jsonwebtoken");

// middleware for checking auth with jwt
module.exports.jwtAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("No auth found");
    }

    const token = req.headers.authorization.split(" ")[1];
    console.log(process.env.JWTKEY);
    jwt.verify(token, "yahallo"); // set env
    next();
  } catch (err) {
    err.constructor === Error
      ? res.status(401).json({
          message: "Forbidden, you need a valid API-token use this resource",
        })
      : res.status(401).json({
          message: err.message,
        });
  }
};

module.exports.getTokenForAuth = async (username, encrPassword, expireTime) => {
  try {
    const loginUser = username === "admin" ? true : false; // hardcoded, replace with db
    if (loginUser) {
      const result = encrPassword === "yahallo" ? true : false;
      if (result) {
        return jwt.sign(
          { user: loginUser.user, id: loginUser._id },
          "yahallo", // set env instead
          { expiresIn: expireTime }
        );
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};
