const db = require("../config/db.config");

const actMembership = db.actMembership;
const role = db.role;
const storeInformation = db.storeInformation;
const warehouse = db.warehouse;
const promotion = db.promotion;
const tradingOrders = db.tradingOrders;
const productHistory = db.productHistory;
const personalInformation = db.personalInformation;
const tradingRole = db.tradingRole;

exports.create = (value) => {
  let response;
  try {
    response = tradingRole
      .create(value)
      .then((storeValue) => {
        return storeValue;
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
    response = tradingRole
      .findAll({ order: [["createdAt", "ASC"]] })
      .then((storeValue) => {
        return storeValue;
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
    response = tradingRole
      .findByPk(id)
      .then((storeValue) => {
        return storeValue;
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

exports.findByName = (name) => {
  let response;
  try {
    response = tradingRole
      .findOne({
        where: {
          name: name,
        },
        order: [["createdAt", "ASC"]],
      })
      .then((storeValue) => {
        return storeValue;
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
