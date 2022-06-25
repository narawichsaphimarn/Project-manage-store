// ********************************************************** //
// *********** Order item Controller Of App ***************** //
// ********************************************************** //

const tradingOrdersRepo = require("../repositories/tradingOrders.repo");
const ProductHistoryRepo = require("../repositories/ProductHistory.repo");
const warehouseRepo = require("../repositories/warehouse.repo");
const promotionRepo = require("../repositories/promotion.repo");
const promotionItemsRepo = require("../repositories/promotionItemsValue.repo");

exports.createOrderItemsBuy = async (req, res) => {
  try {
    const tradingId = req.body.order_sale_id;
    const form = req.body.dataValues;
    const to = await tradingOrdersRepo.findById(tradingId);
    if (to != null) {
      form.map(async (dataJson) => {
        const wh = await warehouseRepo.findByPk(dataJson.id);
        const pro = await promotionRepo.findOne(dataJson.id);
        const ph = await ProductHistoryRepo.create(dataJson.dataValues);
        if (wh != null) {
          ph.setWarehouse(wh);
          ph.old_value = wh.dataValues.value;
          wh.value -= dataJson.dataValues.value;
          ph.save();
          wh.save();
        } else if (pro != null) {
          ph.setPromotion(pro);
          const piv = await promotionItemsRepo.findAllBypromotionId(dataJson.id);
          ph.old_value = dataJson.dataValues.old_value;
          piv.map(async (item) => {
            const valuePromotion = item.value;
            const valueW = item.Warehouse;
            const wh = await warehouseRepo.findByPk(valueW.dataValues.key);
            const valueAll = dataJson.dataValues.value * valuePromotion;
            wh.value -= valueAll;
            wh.save();
            ph.save();
          });
        }
        ph.setTradingOrders(to);
      });
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "Fail tradingOrders no have ID!",
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
