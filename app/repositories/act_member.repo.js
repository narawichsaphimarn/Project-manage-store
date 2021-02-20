const db = require("../config/db.config");
const { Op } = require("sequelize");

const Actmember = db.act_member;
const Role = db.role;
const Merchant = db.merchant;

exports.queryByPk = (act_member_id) => {
  const reponse = Actmember.findByPk(act_member_id)
    .then((actMember) => {
      return { message: "OK", dataValues: actMember };
    })
    .catch((err) => {
      return { message: "FAIL", error: err, dataValues: null };
    });
  return reponse;
};

exports.queryAllByIdNotUUID = (act_member_id) => {
  return Actmember.findAll({
    where: { [Op.not]: { uuid: act_member_id } },
  })
    .then((actMember) => {
      return { message: "OK", dataValues: actMember };
    })
    .catch((err) => {
      return { message: "FAIL", error: err, dataValues: null };
    });
};

exports.queryAllByIdNotUUIDAndNotAdmin = (act_member_id, role_id) => {
  return Actmember.findAll({
    where: {
      [Op.not]: { uuid: act_member_id },
      [Op.or]: { [Op.not]: { fk_roleid: role_id } },
    },
  })
    .then((actMember) => {
      return { message: "OK", dataValues: actMember };
    })
    .catch((err) => {
      return { message: "FAIL", error: err, dataValues: null };
    });
};

exports.queryLogin = (username, password) => {
  return Actmember.findOne({
    where: { username: username, password: password },
    attributes: [
      ["uuid", "act_member_id"],
      ["username", "user"],
    ],
    include: [
      {
        model: Role,
        where: { fk_roleid: db.Sequelize.col("role.uuid") },
        attributes: [["role_name", "role"]],
      },
    ],
  })
    .then((loginActmember) => {
      return { message: "OK", dataValues: loginActmember };
    })
    .catch((err) => {
      return { message: "FAIL", error: err };
    });
};

exports.queryCreate = (
  firstname,
  lastname,
  phoneNumber,
  userId,
  username,
  password
) => {
  return Actmember.create({
    firstname: firstname,
    lastname: lastname,
    phone_number: phoneNumber,
    user_id: userId,
    username: username,
    password: password,
  })
    .then((createActMember) => {
      return createActMember;
    })
    .catch((err) => {
      res.json({
        message: "FAIL",
        error: err,
        dataValues: null,
      });
    });
};
