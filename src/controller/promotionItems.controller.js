// ********************************************************** //
// ************ Promotion Items Controller Of App *********** //
// ********************************************************** //

const promotionItemsRepo = require("../repositories/promotionItemsValue.repo");

exports.findItemsByPromotion = async (req, res) => {
  try {
    const piv = await promotionItemsRepo.findAllBypromotionId(req.params["id"]);
    res.json({
      message: "OK",
      dataValues: piv,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.findAllWareHouseByProId = async (req, res) => {
  try {
    const piv = await promotionItemsRepo.findAllWareHouseByProId(req.params["id"]);
    res.json({
      message: "OK",
      dataValues: piv,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.findAllValueAndId = async (req, res) => {
  try {
    const piv = await promotionItemsRepo.findValuseAndId(req.params["id"]);
    res.json({
      message: "OK",
      dataValues: piv,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
