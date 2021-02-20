// ********************************************************** //
// *********** act_member Controller Of App ***************** //
// ********************************************************** //

const { Op } = require("sequelize");
const db = require("../config/db.config");
const cryptoTools = require("../tools/crypto.tools");
const logicTools = require("../tools/logic.tools");
const roleRepo = require("../repositories/role.repo");
const actMemberRepo = require("../repositories/act_member.repo");
const merchantRepo = require("../repositories/merchant.repo");

const Actmember = db.act_member;
const Role = db.role;
const Merchant = db.merchant;

// **
// Fuction creact member
// none role
// none merchant
// **
exports.create = async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone_number = req.body.phoneNumber;
  const user_id = req.body.userId;
  const username = req.body.username;
  const password = cryptoTools.hashCode(req.body.password);
  const merchant_name = req.body.merchantName;
  const role_name = req.body.roleName;
  var member = await actMemberRepo.queryCreate(
    firstname,
    lastname,
    phone_number,
    user_id,
    username,
    password
  );

  if (
    merchant_name != null &&
    role_name != "Admin" &&
    role_name != "Employees"
  ) {
    const merchant = await merchantRepo.queryCreate(merchant_name);
    member.setMerchant(merchant);
  }
  const role = await roleRepo.queryRoleOrCreateRole(role_name);
  if (member.setRole(role)) {
    res.json({
      message: "OK",
    });
  } else {
    res.json({
      message: "FAIL",
    });
  }
};

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username != null && password != null) {
    const actData = await actMemberRepo.queryLogin(username, password);
    res.json(actData);
  } else {
    res.json({ message: "FAIL", error: "User incorect!" });
  }
};

exports.findAll = async (req, res) => {
  const act_member_id = req.params["id"];
  const role = await roleRepo.queryRoleById(act_member_id);

  if (role.dataValues != null) {
    Actmember.findOne;
    switch (role.dataValues.role) {
      case "Admin":
        const dataActAdmin = await actMemberRepo.queryAllByIdNotUUID(
          act_member_id
        );
        res.json(dataActAdmin);
        break;
      case "Employees":
        const role = await roleRepo.queryRoleByName("Admin");
        const act_member_value = await actMemberRepo.queryAllByIdNotUUIDAndNotAdmin(
          act_member_id,
          role.dataValues.dataValues.uuid
        );
        res.json(act_member_value);
        break;
      default:
        const dataAct = await actMemberRepo.queryByPk(act_member_id);
        res.json(dataAct);
        break;
    }
  } else {
    res.json({ message: "FAIL", error: "User not match!" });
  }
};

exports.findDataUser = async (req, res) => {
  const act_member_id = req.params["id"];
  const actMemberData = await actMemberRepo.queryByPk(act_member_id);
  if (actMemberData != null) {
    res.json(actMemberData);
  } else {
    res.json({
      message: "FAIL",
    });
  }
};

exports.updateDataActMember = async (req, res) => {
  const act_id = req.body.act_member_id;
  const _actData = req.body.dataValues;
  const actMemberData = await actMemberRepo.queryByPk(act_id);
  const data = actMemberData.dataValues;
  if (data != null && _actData != null) {
    data.firstname = logicTools.checkisData(_actData.firstname)
      ? _actData.firstname
      : data.firstname;

    data.lastname = logicTools.checkisData(_actData.lastname)
      ? _actData.lastname
      : data.lastname;

    data.phone_number = logicTools.checkisData(_actData.phoneNumber)
      ? _actData.phoneNumber
      : data.phone_number;

    data.user_id = logicTools.checkisData(_actData.userId)
      ? _actData.userId
      : data.user_id;

    data.username = logicTools.checkisData(_actData.username)
      ? _actData.username
      : data.username;

    data.password = logicTools.checkisData(_actData.password)
      ? cryptoTools.hashCode(_actData.password)
      : data.password;

    const response = await data.save();
    if (response != null) {
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "FAIL",
      });
    }
  } else {
    res.json({ message: "FAIL", error: "User not match!" });
  }
};
