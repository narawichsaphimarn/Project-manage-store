// ********************************************************** //
// *********** Order item Controller Of App ***************** //
// ********************************************************** //

const OrderItemsRepo = require("../repositories/order_item.repo");
const OrderItemPojo = require("../pojo/order_items.pojo");
const OrderSaleRepo = require("../repositories/order_sale.repo");
const ShopItemsRepo = require("../repositories/shop_items.repo");

exports.createOrderItems = async (req, res) => {
  try {
    const order_sale_id = req.body.order_sale_id;
    const orderSaleData = await OrderSaleRepo.queryByPk(order_sale_id);
    const orderData = req.body.dataValues;
    let price = 0;
    await orderData.map(async (item, index) => {
      const shop_item_id = item.shop_item_id;
      const shopItemsData = await ShopItemsRepo.queryByPk(shop_item_id);
      console.log(shopItemsData.item_price);
      let orderPojo = OrderItemPojo.orderItemsCreate;
      orderPojo = item.dataValues;
      const orderItemData = await OrderItemsRepo.queryCreate(orderPojo);
      price += orderPojo.order_item_price;
      console.log("price :: ", price);
      console.log("orderItemData :: ", orderItemData);
      await orderItemData.setOrder_sale(orderSaleData);
      await orderItemData.setShop_item(shopItemsData);
      orderSaleData.order_sale_price = price;
    });
    console.log("orderSaleData :: ", orderSaleData);
    await orderSaleData.save();
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
