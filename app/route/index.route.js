// ********************************************************** //
// *********** Rest APIs Of App ***************************** //
// ********************************************************** //

const actMember = require("../controller/act_member.controller");
const role = require("../controller/role.controller");

module.exports = (app) => {
  app.get("*", (req, res) => {
    res.json({
      message: "Error",
    });
  });

  // **
  // API member
  // **
  app.post("/api/v1/member/create", actMember.create);
  app.post("/api/v1/member/login", actMember.login);

  // **
  // API role
  // **
  app.post("/api/v1/role/create", role.create);
};
