const db = require("../config/db.config");
const { Op, QueryTypes } = require("sequelize");

const actMembership = db.actMembership;
const role = db.role;
const storeInformation = db.storeInformation;
const warehouse = db.warehouse;
const promotion = db.promotion;
const tradingOrders = db.tradingOrders;
const productHistory = db.productHistory;
const personalInformation = db.personalInformation;
const tradingRole = db.tradingRole;
const db2 = require("../config/db.config");

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
            [Op.between]: [startDate, `${endDate} 23:59:59`],
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

exports.findOrderAllBetweenDateAndProductHistory = (startDate, endDate) => {
  let response;
  try {
    response = tradingOrders
      .findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, `${endDate} 23:59:59`],
          },
        },
        include: [
          {
            model: tradingRole,
            as: "TradingRole",
          },
          {
            model: storeInformation,
            as: "StoreInformation",
          },
          {
            model: productHistory,
            as: "ProductHistory",
            include: [{ model: warehouse, as: "Warehouse" }],
          },
        ],
        order: [["createdAt", "DESC"]],
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
          [Op.and]: [{ fk_trading_roleid: id }, { createdAt: { [Op.between]: [startDate, `${endDate} 23:59:59`] } }],
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

exports.findAllTransaction = async () => {
  let response;
  try {
    response = await db2.sequelize.query(
      `select to2.uuid as id, to2.price, to2.createdAt, to2.updatedAt, tr.name as status , si.name as product_name, pi2.merchant_name , pi2.icon as thumnail, w.image as product_thumnail
from trading_orders to2
left join trading_roles tr on tr.uuid = to2.fk_trading_roleid
left join store_informations si on si.uuid = to2.fk_store_informationid 
left join personal_informations pi2 on pi2.uuid = si.fk_personal_informationid
left join warehouses w on w.fk_store_informationid = si.uuid
WHERE tr.name = 'BUY' ORDER BY to2.createdAt DESC`,
      { type: QueryTypes.SELECT },
    );
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
