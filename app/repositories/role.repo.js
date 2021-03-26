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

exports.findByName = (roleName) => {
  let response;
  try {
    response = role
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

exports.findByNameOrCreateRole = (roleName) => {
  let response;
  try {
    response = role
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
    response = role
      .create({ name: roleName })
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

exports.findAllByRoleNameSeparateUser = (user) => {
  console.log("user :: ", user);
  let response;
  try {
    switch (user) {
      case "Admin":
        response = role
          .findAll({ order: '"updatedAt" ASC' })
          .then((role_data) => {
            return role_data;
          })
          .catch((error) => {
            console.error(error);
            return null;
          });
        break;
      case "Employees":
        response = Role.findAll({
          where: {
            [Op.not]: {
              role_name: "Admin",
            },
          },
          order: [["createdAt", "ASC"]],
        })
          .then((role_data) => {
            return role_data;
          })
          .catch((error) => {
            console.error(error);
            return null;
          });
        break;
      default:
        response = Role.findAll({
          where: {
            [Op.not]: {
              role_name: "Admin",
            },
            [Op.and]: {
              [Op.not]: {
                role_name: "Employees",
              },
            },
          },
          order: [["createdAt", "ASC"]],
        })
          .then((role_data) => {
            return role_data;
          })
          .catch((error) => {
            console.error(error);
            return null;
          });
        break;
    }
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findById = (role_id) => {
  let response;
  try {
    response = role
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

exports.findByActId = (role_id) => {
  let response;
  try {
    response = role
      .findOne({ order: [["createdAt", "ASC"]] })
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
