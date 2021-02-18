const db = require("../config/db.config");
const Actmember = db.act_member;
const Role = db.role;
const Merchant = db.merchant;

exports.create = (req, res) => {
  Actmember.create({
    firstname: req.body.firstname,
  });
};
