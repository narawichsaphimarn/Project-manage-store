// ********************************************************** //
// *********** Role Controller Of App *********************** //
// ********************************************************** //

const logicTools = require("../tools/logic.tools");
const roleRepo = require("../repositories/role.repo");
const actMembershipRepo = require("../repositories/actMembership.repo");

// **
// Fuction create role
// **
exports.create = async (req, res) => {
  try {
    const role_name = req.body.roleName;
    const role = await roleRepo.create(role_name);
    res.json(role);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  try {
    const act_id = req.body.role_id;
    const _roleData = req.body.role_update_data;
    const role = await roleRepo.findById(act_id);
    role.role_name = logicTools.checkisData(_roleData) ? _roleData : role.role_name;
    const response = await role.save();
    if (response != null) {
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "FAIL",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.delete = async (req, res) => {
  try {
    const role_id = req.params["id"];
    const role = await roleRepo.findById(role_id);
    if (role != null) {
      await role.destroy();
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "FAIL",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.findAllRole = async (req, res) => {
  try {
    const act_id = req.params["id"];
    const act_member = await actMembershipRepo.findById(act_id);
    const role = await roleRepo.findById(act_member.fk_roleid);
    const roleData = await roleRepo.findAllByRoleNameSeparateUser(role.name);
    res.json({
      message: "OK",
      dataValues: roleData,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.findOneRole = async (req, res) => {
  try {
    const role_id = req.params["id"];
    const role = await roleRepo.findById(role_id);
    res.json({
      message: "OK",
      dataValues: role,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
