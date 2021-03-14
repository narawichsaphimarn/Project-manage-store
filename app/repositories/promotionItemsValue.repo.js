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
const promotionItem = db.promotionItemValue;

exports.create = (value) => {
  let response;
  try {
    response = promotionItem
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
    response = promotionItem
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

exports.findById = (id) => {
  let response;
  try {
    response = promotionItem
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

exports.findAllBypromotionId = (id) => {
  let response;
  try {
    response = promotionItem
      .findAll({
        where: {
          fk_promotionid: id,
        },
        attributes: ["value"],
        include: {
          model: warehouse,
          as: "Warehouse",
          attributes: [
            ["uuid", "key"],
            ["name", "title"],
            "image",
            "price",
            "description",
            "value",
          ],
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
