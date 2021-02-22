// ********************************************************** //
// *********** Order sale Controller Of App ***************** //
// ********************************************************** //

const OrderSale = require("../repositories/order_sale.repo");
const ActMember = require("../repositories/act_member.repo");
const Merchant = require("../repositories/merchant.repo");
const OrderSalePojo = require("../pojo/order_sale.pojo");

exports.createOrderSale = async (req, res) => {
  try {
    const merchant_id = req.body.merchant_id;
    const act_member_id = req.body.act_member_id;
    let order_sale_pojo = OrderSalePojo.orderSaleCreate;
    order_sale_pojo = req.body.dataValues;
    const orderData = await OrderSale.queryCreate(order_sale_pojo);
    if (act_member_id != null) {
      const actData = await ActMember.queryByPk(act_member_id);
      const _actData = actData.dataValues;
      orderData.ActMember(_actData);
    }
    if (merchant_id != null) {
      const merchantData = await Merchant.findByPk(merchant_id);
      const _merchantData = merchantData.dataValues;
      orderData.setMerchant(_merchantData);
    }
    await orderData.save();
    res.json({
      message: "OK",
      dataValues: orderData,
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};


