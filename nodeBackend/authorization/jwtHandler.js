const jwt = require("jsonwebtoken");

// middleware for checking auth with jwt
module.exports.jwtAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("No auth found");
    }
    //const jwtToken = await getTokenForAuth(req.body.user, req.body.password, 10000)
    //console.log(jwt.sign({ user: 'admin', id: 'admin' }, process.env.JWTKEY, { expiresIn: 10000 }))
    const token = req.headers.authorization.split(" ")[1];
    console.log(process.env.JWTKEY);
    jwt.verify(token, process.env.JWTKEY);
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
    const loginUser = username === "admin" ? true : false;
    if (loginUser) {
      const result = encrPassword === "yahallo" ? true : false;
      if (result) {
        return jwt.sign(
          { user: loginUser.user, id: loginUser._id },
          process.env.JWTKEY,
          { expiresIn: expireTime }
        );
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};
