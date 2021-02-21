// ********************************************************** //
// *********** Merchant Controller Of App ******************* //
// ********************************************************** //

const merchantRepo = require("../repositories/merchant.repo");
const logicTools = require("../tools/logic.tools");

exports.findAllShope = async (req, res) => {
  try {
    const merchantdata = await merchantRepo.findAll();
    res.json(merchantdata);
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.createShop = async (req, res) => {
  try {
    const merchant_name = req.body.merchant_name;
    const merchant = await merchantRepo.queryCreate(merchant_name);
    res.json({
      message: "OK",
      dataValues: merchant,
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.findByPk = async (req, res) => {
  try {
    const merchant_id = req.params["id"];
    const merchant = await merchantRepo.findByPk(merchant_id);
    res.json(merchant);
  } catch (error) {
    res.json({
      message: "FAIL",
      error: err,
    });
  }
};

exports.fundByName = async (req, res) => {
  try {
    const merchant_name = req.params["name"];
    const merchant = await merchantRepo.findByName(merchant_name);
    res.json(merchant);
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.updateShope = async (req, res) => {
  try {
    const merchant_id = req.body.merchant_id;
    const merchant_name_update = req.body.merchant_name;
    const merchant = await merchantRepo.findByPk(merchant_id);
    const merchantData = merchant.dataValues;
    merchantData.merchant_name = logicTools.checkisData(merchant_name_update)
      ? merchant_name_update
      : merchantData.merchant_name;
    await merchantData.save();
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

exports.deleteShope = async (req, res) => {
  try {
    const merchant_id = req.params["id"];
    const merchant = await merchantRepo.findByPk(merchant_id);
    const merchantData = merchant.dataValues;
    await merchantData.destroy();
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
