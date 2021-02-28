// ********************************************************** //
// *********** Shop Items Controller Of App ***************** //
// ********************************************************** //

const storeInformationRepo = require("../repositories/storeInformation.repo");
const warehouseRepo = require("../repositories/warehouse.repo");
const warehousePojo = require("../pojo/warehouse.pojo");
const logicTools = require("../tools/logic.tools");

exports.create = async (req, res) => {
  try { } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  try { } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const shop_item_id = req.params["id"];
    const items = await warehouseRepo.findById(shop_item_id);
    await items.destroy();
    res.json({
      message: "OK",
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params["id"];
    const items = await warehouseRepo.findById(id);
    res.json({
      message: "OK",
      dataValues: items,
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const items = await warehouseRepo.findAll();
    res.json({
      message: "OK",
      dataValues: items,
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
}