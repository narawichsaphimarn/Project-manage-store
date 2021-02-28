// ********************************************************** //
// *********** Order sale Controller Of App ***************** //
// ********************************************************** //

const OrderSale = require("../repositories/tradingOrders.repo");
const ActMember = require("../repositories/actMembership.repo");
const Merchant = require("../repositories/storeInformation.repo");
const OrderSalePojo = require("../pojo/tradingOrders.pojo");

exports.createTradingOrders = async (req, res) => {
  try {
    const merchant_id = req.body.merchant_id;
    const act_member_id = req.body.act_member_id;
    let order_sale_pojo = OrderSalePojo.create;
    order_sale_pojo = req.body.dataValues;
    const orderData = await OrderSale.queryCreate(order_sale_pojo);
    if (act_member_id != null) {
      const actData = await ActMember.queryByPk(act_member_id);
      const _actData = actData.dataValues;
      orderData.setAct_member(_actData);
    }
    if (merchant_id != null) {
      const merchantData = await Merchant.findByPk(merchant_id);
      const _merchantData = merchantData.dataValues;
      orderData.setMerchant(_merchantData);
    }
    await orderData.save();
    res.json({
      message: "OK",
      dataValues: orderData
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "FAIL",
      error: error
    });
  }
};
