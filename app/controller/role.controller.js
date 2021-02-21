// ********************************************************** //
// *********** Role Controller Of App *********************** //
// ********************************************************** //

const db = require("../config/db.config");
const roleRepo = require("../repositories/role.repo");
const actNameRepo = require("../repositories/act_member.repo");

const Role = db.role;

// **
// Fuction create role
// **
exports.create = async (req, res) => {
  try {
    const role_name = req.body.roleName;
    const role = await roleRepo.queryCreate(role_name);
    res.json(role);
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const act_id = req.body.role_id;
    const _roleData = req.body.role_update_data;
    const role = await roleRepo.queryByPk(act_id);
    const data = role.dataValues;
    data.role_name = _roleData;
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
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const role_id = req.params["id"];
    const role = await roleRepo.queryByPk(role_id);
    const data = role.dataValues;
    await data.destroy();
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

exports.findAllRole = async (req, res) => {
  try {
    const act_id = req.params["id"];
    const act_member = await actNameRepo.queryByPk(act_id);
    const data = act_member.dataValues.dataValues;
    const role_name = await roleRepo.queryByPk(data.fk_roleid);
    const roleData = await roleRepo.queryAllRoleSeparateUser(
      role_name.dataValues.role_name
    );
    res.json(roleData);
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.findOneRole = async (req, res) => {
  try {
    const role_id = req.params["id"];
    const role = await roleRepo.queryByPk(role_id);
    res.json(role);
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};
