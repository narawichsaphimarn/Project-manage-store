const db = require("../config/db.config");
const { Op } = require("sequelize");

const Promotion = db.promotion;

exports.queryCreate = (items) => {
  let response;
  try {
    response = Promotion.create(items)
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
    response = Promotion.findAll({ where: { fk_merchantid: merchant_id } })
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

exports.queryByPk = (shop_items_id) => {
  let response;
  try {
    response = Promotion.findByPk(shop_items_id)
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
    response = Promotion.findAll()
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
