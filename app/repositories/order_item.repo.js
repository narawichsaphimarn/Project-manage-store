const db = require("../config/db.config");
const { Op } = require("sequelize");

const OrderItem = db.order_item;

exports.queryCreate = (items) => {
  let response;
  try {
    response = OrderItem.create(items)
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

exports.queryByOrderSaleId = (order_sale_id) => {
  let response;
  try {
    response = OrderItem.findAll({ where: { fk_order_saleid: order_sale_id } })
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

exports.queryByShopeItemsId = (order_item_id) => {
  let response;
  try {
    response = OrderItem.findAll({ where: { fk_shop_itemsid: order_item_id } })
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
    response = OrderItem.findByPk(shop_items_id)
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
    response = OrderItem.findAll()
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
