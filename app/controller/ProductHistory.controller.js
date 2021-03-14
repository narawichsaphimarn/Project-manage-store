// ********************************************************** //
// *********** Order item Controller Of App ***************** //
// ********************************************************** //

const tradingOrdersRepo = require("../repositories/tradingOrders.repo");
const ProductHistoryRepo = require("../repositories/ProductHistory.repo");
const warehouseRepo = require("../repositories/warehouse.repo");
const promotionRepo = require("../repositories/promotion.repo");

exports.createOrderItemsBuy = async (req, res) => {
  try {
    const tradingId = req.body.order_sale_id;
    const form = req.body.dataValues;
    const to = await tradingOrdersRepo.findById(tradingId);
    form.map(async (item) => {
      let dataJson = JSON.parse(item);
      const wh = await warehouseRepo.findByPk(dataJson.id);
      const pro = await promotionRepo.findByPk(dataJson.id);
      const ph = await ProductHistoryRepo.create(dataJson.dataValues);
      if (wh != null) {
        ph.setWarehouse(wh);
        ph.old_value = wh.dataValues.value;
        wh.value -= dataJson.dataValues.value;
        ph.save();
        wh.save();
      } else if (pro != null) {
        ph.setPromotion(pro);
      }
      ph.setTradingOrders(to);
    });
    res.json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
