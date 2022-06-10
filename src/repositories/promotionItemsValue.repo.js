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
const promotionItem = db.promotionItemValue;
const db2 = require("../config/db.config");

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
      .findAll({ order: '"updatedAt" ASC' })
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
          attributes: [["uuid", "key"], ["name", "title"], "image", "price", "description", "value"],
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

exports.findAllProId = (id) => {
  let response;
  try {
    response = promotionItem
      .findAll({ where: { fk_promotionid: id }, order: [["createdAt", "ASC"]] })
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

exports.findAllWareHouseByProId = async (id) => {
  let response;
  try {
    response = await db2.sequelize.query(
      "select w.name as 'title', w.description, w.image, w.price, w.value from `promotion_items` pi2 left join `warehouses` w on w.uuid = pi2.fk_warehouseid where pi2.fk_promotionid = " +
        `'${id}'` +
        " ORDER BY w.updatedAt asc",
      { type: QueryTypes.SELECT }
    );
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findValuseAndId = async (id) => {
  let response;
  try {
    response = await db2.sequelize.query(
      "select pi2.value, pi2.fk_warehouseid as 'id' from `promotion_items` pi2 where pi2.fk_promotionid = " +
        `'${id}'` +
        " ORDER BY pi2.updatedAt asc",
      { type: QueryTypes.SELECT }
    );
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
