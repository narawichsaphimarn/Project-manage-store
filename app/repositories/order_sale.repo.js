const db = require("../config/db.config");
const { Op } = require("sequelize");

const OrderSale = db.order_sale;

exports.queryCreate = (items) => {
  let response;
  try {
    response = OrderSale.create(items)
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.queryByMerchantId = (merchant_id) => {
  let response;
  try {
    response = OrderSale.findAll({ where: { fk_merchantid: merchant_id } })
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.queryByActMemberId = (act_member_id) => {
  let response;
  try {
    response = OrderSale.findAll({ where: { fk_act_memberid: act_member_id } })
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.queryByPk = (shop_sale_id) => {
  let response;
  try {
    response = OrderSale.findByPk(shop_sale_id)
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findAll = () => {
  let response;
  try {
    response = OrderSale.findAll()
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
