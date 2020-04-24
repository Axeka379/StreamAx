const startController = {};

startController.getStart = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Home",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = startController;
