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

exports.create = (items) => {
  let response;
  try {
    response = tradingOrders
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

exports.findByStoreInformationId = (id) => {
  let response;
  try {
    response = tradingOrders
      .findAll({
        where: {
          fk_store_informationid: id,
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

exports.findByTradingRoleId = (id) => {
  let response;
  try {
    response = tradingOrders
      .findAll({
        where: {
          fk_trading_roleid: id,
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

exports.findByPromotionId = (id) => {
  let response;
  try {
    response = tradingOrders
      .findAll({
        where: {
          fk_promotionid: id,
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
    response = tradingOrders
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
    response = tradingOrders
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

exports.findByOrderId = (id) => {
  let response;
  try {
    response = tradingOrders
      .findOne({ where: { order_id: id }, order: [["createdAt", "ASC"]] })
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

exports.findOrderAllBetweenDate = (startDate, endDate) => {
  let response;
  try {
    response = tradingOrders
      .findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        attributes: [["createdAt", "date"], ["order_id", "id"], "price", ["order_id", "id"], "uuid"],
        include: [
          {
            model: tradingRole,
            as: "TradingRole",
            attributes: [["name", "role"]],
          },
          {
            model: storeInformation,
            as: "StoreInformation",
            attributes: ["name"],
          },
        ],
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

exports.findPriceAllByRole = (id, startDate, endDate) => {
  let response;
  try {
    response = tradingOrders
      .findAll({
        where: {
          [Op.and]: [{ fk_trading_roleid: id }, { createdAt: { [Op.between]: [startDate, endDate] } }],
        },
        attributes: ["price"],
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
