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
