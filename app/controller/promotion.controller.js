// ********************************************************** //
// ************ Promotion Controller Of App ***************** //
// ********************************************************** //

const PromotionRepo = require("../repositories/promotion.repo");
const PromotionPojo = require("../pojo/promotion.pojo");
const WarehouseRepo = require("../repositories/warehouse.repo");
const PromotionItemValueRepo = require("../repositories/promotionItemsValue.repo");

exports.createPromotion = async (req, res) => {
  try {
    let formPromo = PromotionPojo.create;
    formPromo.name = req.body.name;
    formPromo.price = req.body.price;
    formPromo.description = req.body.description;
    formPromo.image = req.body.image;
    const promo = await PromotionRepo.create(formPromo);
    if (promo != null) {
      let dataItem = req.body.dataValues;
      if (dataItem != null) {
        dataItem.map(async (item) => {
          const wh = await WarehouseRepo.findByPk(item.id);
          const piv = await PromotionItemValueRepo.create({ value: item.value });
          await piv.setWarehouse(wh);
          await piv.setPromotion(promo);
        });
      }
    }
    res.json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.findAllPromotion = async (req, res) => {
  try {
    const promo = await PromotionRepo.findAll();
    res.json({
      message: "OK",
      dataValues: promo,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.findOnePromotion = async (req, res) => {
  try {
    const promo = await PromotionRepo.findByPk(req.params["id"]);
    res.json({
      message: "OK",
      dataValues: promo,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
