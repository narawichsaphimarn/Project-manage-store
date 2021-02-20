// ********************************************************** //
// *********** Rest APIs Of App ***************************** //
// ********************************************************** //

const actMember = require("../controller/act_member.controller");
const role = require("../controller/role.controller");

module.exports = (app) => {
  // **
  // API member
  // **
  app.post("/api/v1/member/create", actMember.create);
  app.post("/api/v1/member/login", actMember.login);
  app.get("/api/v1/member/findMember/:id", actMember.findAll);
  // **
  // API role
  // **
  app.post("/api/v1/role/create", role.create);
};
