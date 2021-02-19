// ********************************************************** //
// *********** Role Controller Of App *********************** //
// ********************************************************** //

const db = require("../config/db.config");
const Role = db.role;

// **
// Fuction create role
// **
exports.create = (req, res) => {
  Role.create({
    role_name: req.body.roleName,
  })
    .then(() => {
      res.json({
        message: "OK",
      });
    })
    .catch(() => {
      res.json({
        message: "FAIL",
      });
    });
};
