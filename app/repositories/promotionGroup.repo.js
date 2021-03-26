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
const productGroup = db.productGroup;

exports.findByNameOrCreateRole = (roleName) => {
  let response;
  try {
    response = productGroup
      .findOrCreate({
        where: {
          name: roleName,
        },
        order: [["createdAt", "ASC"]],
      })
      .then((role) => {
        return role[0];
      })
      .catch((err) => {
        return {
          message: "FAIL",
          dataValues: null,
          error: err,
        };
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.create = (roleName) => {
  let response;
  try {
    response = productGroup
      .create(roleName)
      .then((role) => {
        return role;
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

exports.findById = (role_id) => {
  let response;
  try {
    response = productGroup
      .findByPk(role_id)
      .then((role_data) => {
        return role_data;
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

exports.findByName = (roleName) => {
  let response;
  try {
    response = productGroup
      .findOne({
        where: {
          name: roleName,
        },
        order: [["createdAt", "ASC"]],
      })
      .then((role) => {
        return role;
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
    response = productGroup
      .findAll({ order: [["createdAt", "ASC"]] })
      .then((role) => {
        return role;
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
