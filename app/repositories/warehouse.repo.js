const db = require("../config/db.config");
const { Op } = require("sequelize");

const actMembership = db.actMembership;
const role = db.role;
const storeInformation = db.storeInformation;
const warehouse = db.warehouse;
const promotion = db.promotion;
const tradingOrders = db.tradingOrders;
const productHistory = db.productHistory;
const personalInformation = db.personalInformation;
const tradingRole = db.tradingRole;

exports.create = items => {
  let response;
  try {
    response = warehouse
      .create(items)
      .then(items => {
        return items;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findByStoreInformationId = id => {
  let response;
  try {
    response = warehouse
      .findAll({
        where: {
          fk_store_informationid: id
        }
      })
      .then(items => {
        return items;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findById = id => {
  let response;
  try {
    response = warehouse
      .findByPk(id)
      .then(items => {
        return items;
      })
      .catch(error => {
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
    response = warehouse
      .findAll({
        attributes: [
          ["uuid", "key"],
          ["name", "title"],
          "image",
          "price",
          "description"
        ]
      })
      .then(items => {
        return items;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
