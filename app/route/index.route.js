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
  app.get("/api/v1/member/findAllMember/:id", actMember.findAll);
  app.get("/api/v1/member/findUser/:id", actMember.findDataUser);
  app.put("/api/v1/member/update-member", actMember.updateDataActMember);
  app.delete("/api/v1/member/delete-member/:id", actMember.deleteActMember);

  // **
  // API role
  // **
  app.post("/api/v1/role/create", role.create);
};
