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

exports.findByActId = (act_member_id) => {
  let response;
  try {
    response = actMembership
      .findOne({
        where: {
          uuid: act_member_id,
        },
        include: [
          {
            model: Role,
            where: {
              fk_roleid: db.Sequelize.col("role.uuid"),
            },
            attributes: [
              ["uuid", "role_id"],
              ["role_name", "role"],
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
      })
      .then((actmember) => {
        return actmember;
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

exports.findById = async (act_member_id) => {
  let response;
  try {
    response = await db2.sequelize.query(
      "select am.uuid,am.id, am.username, am.password, pi2.address, pi2.age, pi2.firstname, pi2.lastname,pi2.email, pi2.phone_number from `act_memberships` am left join `personal_informations` pi2 on pi2.uuid = am.fk_personal_informationid where am.uuid = " +
        `'${act_member_id}'` +
        " ORDER BY am.updatedAt asc",
      { type: QueryTypes.SELECT },
    );
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findByPk = (act_member_id) => {
  let response;
  try {
    response = actMembership
      .findByPk(act_member_id)
      .then((actMember) => {
        return actMember;
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

exports.findByIdAndNotMe = async (act_member_id) => {
  let response;
  try {
    response = await db2.sequelize.query(
      "select am.uuid,am.id, am.username, am.password, pi2.address, pi2.age, pi2.firstname, pi2.lastname,pi2.email, pi2.phone_number from `act_memberships` am left join `personal_informations` pi2 on pi2.uuid = am.fk_personal_informationid where am.uuid != " +
        `'${act_member_id}'` +
        " ORDER BY am.updatedAt asc",
      { type: QueryTypes.SELECT },
    );
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findAllByIdNotUUIDAndNotAdmin = async (act_member_id, role_id) => {
  let response;
  try {
    response = await db2.sequelize.query(
      "select am.uuid,am.id, am.username, am.password, pi2.address, pi2.age, pi2.firstname, pi2.lastname,pi2.email, pi2.phone_number from `act_memberships` am left join `personal_informations` pi2 on pi2.uuid = am.fk_personal_informationid where am.uuid != " +
        `'${act_member_id}'` +
        "and am.fk_roleid != " +
        `'${role_id}'` +
        " ORDER BY am.updatedAt asc",
      { type: QueryTypes.SELECT },
    );
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.login = async (username, password) => {
  let response;
  try {
    response = await actMembership
      .findOne({
        where: {
          username: username,
          password: password,
        },
        attributes: [
          ["uuid", "act_member_id"],
          ["username", "user"],
        ],
        include: [
          {
            model: role,
            as: "Role",
            attributes: [["name", "role"]],
          },
        ],
        order: [["createdAt", "ASC"]],
      })
      .then((loginActmember) => {
        return loginActmember;
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

exports.create = (actValues) => {
  let response;
  try {
    response = actMembership
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

exports.findByUserName = (username) => {
  let response;
  try {
    response = actMembership
      .findOne({
        where: {
          username: username,
        },
        order: [["createdAt", "ASC"]],
      })
      .then((ActMember) => {
        return ActMember;
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
