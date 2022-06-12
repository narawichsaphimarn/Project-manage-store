const personRepo = require("../repositories/personalInformation.repo");

exports.create = async (req, res) => {
  const body = req.body;
  try {
    await personRepo.create(body);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  res.json({
    message: "OK",
  });
};

exports.findAll = async (req, res) => {
  var response;
  try {
    response = await personRepo.create(body);
  } catch (error) {
    res.json({
      message: "fail",
      data: {},
    });
  }
  res.json({
    message: "OK",
    data: response,
  });
};
