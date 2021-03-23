// ********************************************************** //
// ************ Promotion Controller Of App ***************** //
// ********************************************************** //

const PromotionRepo = require("../repositories/promotion.repo");
const PromotionPojo = require("../pojo/promotion.pojo");
const WarehouseRepo = require("../repositories/warehouse.repo");
const PromotionItemValueRepo = require("../repositories/promotionItemsValue.repo");
const logicTools = require("../tools/logic.tools");

exports.createPromotion = async (req, res) => {
  try {
    let formPromo = PromotionPojo.create;
    formPromo.name = req.body.name;
    formPromo.price = req.body.price;
    formPromo.description = req.body.description;
    formPromo.image = req.body.image;
    const promo2 = await PromotionRepo.create(formPromo);
    if (promo2 != null) {
      let dataItem = req.body.dataValues;
      if (dataItem != null) {
        dataItem.map(async (item) => {
          const wh = await WarehouseRepo.findByPk(item.id);
          const piv = await PromotionItemValueRepo.create({ value: item.value });
          await piv.setWarehouse(wh);
          await piv.setPromotion(promo2);
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

exports.delete = async (req, res) => {
  try {
    const piv = await PromotionItemValueRepo.findAllProId(req.params["id"]);
    if (piv != null) {
      await piv.map((item) => {
        item.destroy();
      });
      const promo = await PromotionRepo.findOne(req.params["id"]);
      if (promo != null) {
        promo.destroy();
        res.json({
          message: "OK",
        });
      } else {
        res.json({
          message: "Fail no id",
        });
      }
    } else {
      res.json({
        message: "Fail no id",
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  try {
    const promo = await PromotionRepo.findOne(req.body.promotion_id);
    if (promo != null) {
      promo.image = logicTools.checkisData(req.body.image) ? req.body.image : promo.image;
      promo.description = logicTools.checkisData(req.body.description) ? req.body.description : promo.description;
      promo.price = req.body.price;
      promo.name = logicTools.checkisData(req.body.name) ? req.body.name : promo.name;
      await promo.save();
      if (promo != null) {
        const piv = await PromotionItemValueRepo.findAllProId(req.body.promotion_id);
        await piv.map((item) => {
          item.destroy();
        });
        let dataItem = req.body.dataValues;
        if (dataItem != null) {
          dataItem.map(async (item) => {
            const wh = await WarehouseRepo.findByPk(item.id);
            const piv2 = await PromotionItemValueRepo.create({ value: item.value });
            await piv2.setWarehouse(wh);
            await piv2.setPromotion(promo);
          });
        }
      }
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "Fail no id",
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
