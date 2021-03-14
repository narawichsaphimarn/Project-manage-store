// ********************************************************** //
// ************ Promotion Controller Of App ***************** //
// ********************************************************** //

const Promotion = require("../repositories/promotion.repo");
const PromotionPojo = require("../pojo/promotion.pojo");
const Merchant = require("../repositories/storeInformation.repo");
const ShopItems = require("../repositories/warehouse.repo");

exports.createPromotion = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
