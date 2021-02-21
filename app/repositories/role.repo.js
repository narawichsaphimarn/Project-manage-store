const db = require("../config/db.config");
const { Op } = require("sequelize");

const Actmember = db.act_member;
const Role = db.role;
const Merchant = db.merchant;

exports.queryRoleById = (act_member_id) => {
  let response;
  try {
    response = Actmember.findOne({
      where: { uuid: act_member_id },
      include: [
        {
          model: Role,
          where: { fk_roleid: db.Sequelize.col("role.uuid") },
          attributes: [
            ["uuid", "role_id"],
            ["role_name", "role"],
          ],
        },
      ],
    })
      .then((actmember) => {
        return {
          message: "OK",
          dataValues: actmember.dataValues.role.dataValues,
        };
      })
      .catch((err) => {
        return { message: "FAIL", dataValues: null, error: err };
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.queryRoleByName = (roleName) => {
  let response;
  try {
    response = Role.findOne({ where: { role_name: roleName } })
      .then((role) => {
        return { message: "OK", dataValues: role };
      })
      .catch((err) => {
        return { message: "FAIL", dataValues: null, error: err };
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.queryRoleOrCreateRole = (roleName) => {
  let response;
  try {
    response = Role.findOrCreate({
      where: { role_name: roleName },
    })
      .then((role) => {
        return role[0];
      })
      .catch((err) => {
        return { message: "FAIL", dataValues: null, error: err };
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.queryCreate = (roleName) => {
  let response;
  try {
    response = Role.create({
      role_name: roleName,
    })
      .then(() => {
        return { message: "OK" };
      })
      .catch(() => {
        return { message: "FAIL" };
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.queryAllRoleSeparateUser = (user) => {
  console.log("user :: ", user);
  let response;
  try {
    switch (user) {
      case "Admin":
        response = Role.findAll()
          .then((role_data) => {
            return { message: "OK", dataValues: role_data };
          })
          .catch((error) => {
            return { message: "FAIL", dataValues: null, error: error };
          });
        break;
      case "Employees":
        response = Role.findAll({
          where: { [Op.not]: { role_name: "Admin" } },
        })
          .then((role_data) => {
            return { message: "OK", dataValues: role_data };
          })
          .catch((error) => {
            return { message: "FAIL", dataValues: null, error: error };
          });
        break;
      default:
        response = Role.findAll({
          where: {
            [Op.not]: { role_name: "Admin" },
            [Op.and]: { [Op.not]: { role_name: "Employees" } },
          },
        })
          .then((role_data) => {
            return { message: "OK", dataValues: role_data };
          })
          .catch((error) => {
            return { message: "FAIL", dataValues: null, error: error };
          });
        break;
    }
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.queryByPk = (role_id) => {
  let response;
  try {
    response = Role.findByPk(role_id)
      .then((role_data) => {
        return { message: "OK", dataValues: role_data };
      })
      .catch((error) => {
        return { message: "FAIL", dataValues: null, error: error };
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
