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

exports.findByActId = act_member_id => {
  let response;
  try {
    response = actMembership
      .findOne({
        where: {
          uuid: act_member_id
        },
        include: [
          {
            model: Role,
            where: {
              fk_roleid: db.Sequelize.col("role.uuid")
            },
            attributes: [
              ["uuid", "role_id"],
              ["role_name", "role"]
            ]
          }
        ]
      })
      .then(actmember => {
        return actmember;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findById = act_member_id => {
  let response;
  try {
    response = actMembership
      .findByPk(act_member_id)
      .then(actMember => {
        return actMember;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findByIdAndNotMe = act_member_id => {
  let response;
  try {
    response = actMembership
      .findAll({
        where: {
          [Op.not]: {
            uuid: act_member_id
          }
        }
      })
      .then(actMember => {
        return actMember;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findAllByIdNotUUIDAndNotAdmin = (act_member_id, role_id) => {
  let response;
  try {
    response = actMembership
      .findAll({
        where: {
          [Op.not]: {
            uuid: act_member_id
          },
          [Op.or]: {
            [Op.not]: {
              fk_roleid: role_id
            }
          }
        }
      })
      .then(actMember => {
        return actMember;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.login = async (username, password) => {
  let response;
  try {
    console.log(`username = ${username} & password = ${password}`);
    response = await actMembership
      .findOne({
        where: {
          username: username,
          password: password
        },
        attributes: [
          ["uuid", "act_member_id"],
          ["username", "user"]
        ],
        include: [
          {
            model: role,
            where: {
              fk_roleid: db.Sequelize.col("role.uuid")
            },
            attributes: [["name", "role"]]
          }
        ]
      })
      .then(loginActmember => {
        return loginActmember;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.create = actValues => {
  let response;
  try {
    response = actMembership
      .create(actValues)
      .then(createActMember => {
        return createActMember;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = null;
  }
  return response;
};

exports.findByUserName = username => {
  let response;
  try {
    response = actMembership
      .findOne({
        where: {
          username: username
        }
      })
      .then(ActMember => {
        return ActMember;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = null;
  }
  return response;
};
