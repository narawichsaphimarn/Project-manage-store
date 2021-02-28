// ********************************************************** //
// *********** Order item Controller Of App ***************** //
// ********************************************************** //

const OrderItemsRepo = require("../repositories/productHistory.repo");
const OrderItemPojo = require("../pojo/productHistory.pojo");
const OrderSaleRepo = require("../repositories/tradingOrders.repo");
const ShopItemsRepo = require("../repositories/warehouse.repo");
const PromotionRepo = require("../repositories/promotion.repo");

exports.createOrderItems = async (req, res) => {
  try {
    const order_sale_id = req.body.order_sale_id;
    const orderSaleData = await OrderSaleRepo.queryByPk(order_sale_id);
    const orderItemsData = req.body.dataValues;
    let price = 0;
    price = await Promise.all(
      orderItemsData.map(async (item) => {
        const shop_item_id = item.shop_item_id;
        const promotion_id = item.promotion_id;
        if (shop_item_id != null) {
          const shopItemsData = await ShopItemsRepo.queryByPk(shop_item_id);
          let orderPojo = OrderItemPojo.create;
          orderPojo = item.dataValues;
          const orderItemData = await OrderItemsRepo.queryCreate(orderPojo);
          price += orderPojo.order_item_price;
          let valueItemsUpdate =
            shopItemsData.item_value - orderPojo.order_item_value;
          shopItemsData.item_value = valueItemsUpdate;
          await shopItemsData.save();
          await orderItemData.setOrder_sale(orderSaleData);
          await orderItemData.setShop_item(shopItemsData);
        } else if (promotion_id != null) {
          const promotionData = await PromotionRepo.queryByPk(promotion_id);
          let orderPojo = OrderItemPojo.create;
          orderPojo = item.dataValues;
          const orderItemData = await OrderItemsRepo.queryCreate(orderPojo);
          price += orderPojo.order_item_price;
          await orderItemData.setOrder_sale(orderSaleData);
          await orderItemData.setPromotion(promotionData);
        }
        return price;
      })
    );
    orderSaleData.order_sale_price = price[0];
    await orderSaleData.save();
    res.json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};