// ********************************************************** //
// *********** act_member Controller Of App ***************** //
// ********************************************************** //

const cryptoTools = require("../tools/crypto.tools");
const logicTools = require("../tools/logic.tools");
const roleRepo = require("../repositories/role.repo");
const actMemberRepo = require("../repositories/act_member.repo");
const merchantRepo = require("../repositories/merchant.repo");

// **
// Fuction creact member
// none role
// none merchant
// **
exports.create = async (req, res) => {
  try {
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
    member.setRole(role);
    res.json({
      message: "OK",
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (username != null && password != null) {
      const actData = await actMemberRepo.queryLogin(username, password);
      res.json(actData);
    } else {
      res.json({ message: "FAIL", error: "User incorect!" });
    }
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const act_member_id = req.params["id"];
    const role = await roleRepo.queryRoleById(act_member_id);
    console.log(role);
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
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.findDataUser = async (req, res) => {
  try {
    const act_member_id = req.params["id"];
    const actMemberData = await actMemberRepo.queryByPk(act_member_id);
    if (actMemberData != null) {
      res.json(actMemberData);
    } else {
      res.json({
        message: "FAIL",
      });
    }
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.updateDataActMember = async (req, res) => {
  try {
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
  } catch (error) {
    res.json({
      message: "FAIL",
      error: err,
    });
  }
};

exports.deleteActMember = async (req, res) => {
  try {
    const act_id = req.params["id"];
    const actMemberData = await actMemberRepo.queryByPk(act_id);
    const data = actMemberData.dataValues;
    await data.destroy();
    res.json({
      message: "OK",
    });
  } catch (err) {
    res.json({
      message: "FAIL",
      error: err,
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const act_member_id = req.body.act_member_id;
    const role_id = req.body.role_id;
    const actMemberData = await actMemberRepo.queryByPk(act_member_id);
    const _actMemberData = actMemberData.dataValues;
    const roleData = roleRepo.queryByPk(role_id);
    const _roleData = roleData.dataValues;
    _actMemberData.setRole(_roleData);
    res.json({
      message: "OK",
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: err,
    });
  }
};

exports.updateMerchant = async (req, res) => {
  try {
    const act_member_id = req.body.act_member_id;
    const merchant_id = req.body.merchant_id;
    const actMemberData = await actMemberRepo.queryByPk(act_member_id);
    const _actMemberData = actMemberData.dataValues;
    const merchantData = await actMemberRepo.queryByPk(merchant_id);
    const _merchantData = merchantData.dataValues;
    _actMemberData.setMerchant(_merchantData);
    res.json({
      message: "OK",
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: err,
    });
  }
};
