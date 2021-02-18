const actMember = require("../controller/act_member.controller")
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "OK",
    });
  });

  app.get("*", (req, res) => {
    res.json({
      message: "Error",
    });
  });

  
};
