// ********************************************************** //
// *********** Role Controller Of App *********************** //
// ********************************************************** //

const db = require("../config/db.config");
const roleRepo = require("../repositories/role.repo");

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
