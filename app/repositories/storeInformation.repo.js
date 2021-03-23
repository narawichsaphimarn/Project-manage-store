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

exports.create = (value) => {
  let response;
  try {
    response = storeInformation
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
    response = storeInformation
      .findAll()
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

exports.update = (item, id) => {
  let response;
  try {
    response = storeInformation
      .update(item, { where: { uuid: id } })
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
    response = storeInformation
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
    response = storeInformation
      .findOne({
        where: {
          name: name,
        },
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
