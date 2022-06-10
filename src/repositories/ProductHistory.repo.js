const db = require("../config/db.config");
const { Op, Model } = require("sequelize");

const actMembership = db.actMembership;
const role = db.role;
const storeInformation = db.storeInformation;
const warehouse = db.warehouse;
const promotion = db.promotion;
const tradingOrders = db.tradingOrders;
const productHistory = db.productHistory;
const personalInformation = db.personalInformation;
const tradingRole = db.tradingRole;

exports.create = (items) => {
  let response;
  try {
    response = productHistory
      .create(items)
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findByTradingId = (trading_ordersid) => {
  let response;
  try {
    response = productHistory
      .findAll({
        where: {
          fk_trading_ordersid: trading_ordersid,
        },
        order: [["createdAt", "ASC"]],
      })
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findByWarehouseId = (warehouseid) => {
  let response;
  try {
    response = productHistory
      .findAll({
        where: {
          fk_warehouseid: warehouseid,
        },
        order: [["createdAt", "ASC"]],
      })
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findById = (id) => {
  let response;
  try {
    response = productHistory
      .findByPk(id)
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return null;
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
    response = productHistory
      .findAll({ order: [["createdAt", "ASC"]] })
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findWarehouseWithToId = (id) => {
  let response;
  try {
    response = productHistory
      .findAll({
        where: { fk_trading_ordersid: id },
        include: [{ model: warehouse, as: "Warehouse" }],
        order: [["createdAt", "ASC"]],
      })
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
