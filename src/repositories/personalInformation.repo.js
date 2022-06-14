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

exports.create = (actValues) => {
  let response;
  try {
    response = personalInformation
      .create(actValues)
      .then((createActMember) => {
        return createActMember;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = null;
  }
  return response;
};

exports.findAll = () => {
  let response;
  try {
    response = personalInformation
      .findAll({
        where: { merchant_name: { [Op.not]: null } },
        order: [["createdAt", "ASC"]],
      })
      .then((value) => {
        return value;
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
    response = personalInformation
      .findByPk(id)
      .then((value) => {
        return value;
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
    response = personalInformation
      .findOne({
        where: {
          name: name,
        },
        order: [["createdAt", "ASC"]],
      })
      .then((value) => {
        return value;
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
    response = personalInformation
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

exports.delete = (id) => {
  let response;
  try {
    response = personalInformation
      .destroy({
        where: {
          uuid: id,
        },
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
