const db = require("../config/db.config");
const { Op } = require("sequelize");

const ShopeItems = db.shop_items;

exports.queryCreate = (items) => {
  let response;
  try {
    response = ShopeItems.create(items)
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
    response = ShopeItems.findAll({ where: { fk_merchantid: merchant_id } })
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
    response = ShopeItems.findByPk(shop_items_id)
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
    response = ShopeItems.findAll()
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
