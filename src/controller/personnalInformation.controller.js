const personRepo = require("../repositories/personalInformation.repo");

exports.create = async (req, res) => {
  const body = req.body;
  body.icon = req.file.path;
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
    response = await personRepo.findAll();
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

exports.findOne = async (req, res) => {
  const id = req.params["id"];
  var response;
  try {
    response = await personRepo.findById(id);
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

exports.update = async (req, res) => {
  const body = req.body;
  if (req.file) {
    body.icon = req.file.path;
  }
  try {
    response = await personRepo.update(body, body.id);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  res.json({
    message: "OK",
  });
};

exports.delete = async (req, res) => {
  const id = req.params["id"];
  try {
    response = await personRepo.delete(id);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  res.json({
    message: "OK",
  });
};
