// ********************************************************** //
// ************ Promotion Controller Of App ***************** //
// ********************************************************** //

const Promotion = require("../repositories/promotion.repo");
const PromotionPojo = require("../pojo/promotion.pojo");
const Merchant = require("../repositories/storeInformation.repo");
const ShopItems = require("../repositories/warehouse.repo");

exports.createPromotion = async (req, res) => {
  try {
    const mercahntId = req.body.merchant_id;
    let promotionPojo = PromotionPojo.create;
    promotionPojo = req.body.dataValues;
    const itemData = req.body.itemValues;
    const merchant = await Merchant.findByPk(mercahntId);
    let dataMerchant = merchant.dataValues;
    if (dataMerchant != null) {
      const promotion = await Promotion.queryCreate(promotionPojo);
      promotion.setMerchant(dataMerchant);
      await itemData.map(async (item) => {
        const itemId = item;
        const shopItemsData = await ShopItems.queryByPk(itemId);
        shopItemsData.setShopItems(promotion);
      });
      promotion.save();
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "Have not merchant!",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};
