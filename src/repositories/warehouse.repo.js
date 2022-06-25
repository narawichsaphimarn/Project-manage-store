const db = require("../config/db.config");
const { Op, QueryTypes } = require("sequelize");
const connectDb = require("../config/db.config");

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

exports.update = (item, id) => {
  let response;
  try {
    response = warehouse
      .update(item, { where: { uuid: id } })
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

exports.create = (items) => {
  let response;
  try {
    response = warehouse
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
    response = warehouse
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

exports.findByPk = (id) => {
  let response;
  try {
    response = warehouse
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

exports.findById = (id) => {
  let response;
  try {
    response = warehouse
      .findOne({
        where: { uuid: id },
        attributes: [["uuid", "key"], ["name", "title"], "image", "price", "description", "value"],
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

exports.findProductGroupId = (id) => {
  let response;
  try {
    response = warehouse
      .findAll({
        where: { [Op.and]: [{ fk_product_groupid: id }, { value: { [Op.gt]: 0 } }] },
        attributes: [["uuid", "key"], ["name", "title"], "image", "price", "description", "value"],
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

exports.findAll = async () => {
  let response;
  try {
    response = await db2.sequelize.query(
      `select w.uuid as 'key', w.name as 'title', w.image, w.price, w.description, w.value, si.name, 
pi2.phone_number,pi2.email, pi2.merchant_name, pi2.uuid as merchant_id
from warehouses w 
left join store_informations si on si.uuid = w.fk_store_informationid 
left join personal_informations pi2 on pi2.uuid = si.fk_personal_informationid 
where w.value > 0 ORDER BY w.updatedAt asc`,
      { type: QueryTypes.SELECT },
    );
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findAllStoreAndPersional = (startDate, endDate) => {
  let response;
  try {
    response = warehouse
      .findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, `${endDate} 23:59:59`],
          },
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: storeInformation,
            as: "StoreInformation",
            include: [
              {
                model: personalInformation,
                as: "PersonalInformation",
              },
            ],
          },
        ],
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
