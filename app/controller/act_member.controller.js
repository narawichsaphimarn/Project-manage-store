// ********************************************************** //
// *********** act_member Controller Of App ***************** //
// ********************************************************** //

const db = require("../config/db.config");
const tools = require("../tools/crypto.tools");

const Actmember = db.act_member;
const Role = db.role;
const Merchant = db.merchant;

// **
// Fuction creact member
// none role
// none merchant
// **
exports.create = (req, res) => {
  var member;
  var merchant;
  Actmember.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone_number: req.body.phoneNumber,
    user_id: req.body.userId,
    username: req.body.username,
    password: tools.hashCode(req.body.password),
  })
    .then((createActMember) => {
      member = createActMember;

      return Merchant.create({
        merchant_name: req.body.merchantName,
      });
    })
    .then((_merchant) => {
      console.log("_merchant :: ", _merchant);
      member.setMerchant(_merchant);
      return Role.findOne({
        where: { role_name: req.body.roleName },
      });
    })
    .then((_role) => {
      console.log("_role :: ", _role);
      member.setRole(_role);
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

exports.login = (req, res) => {
  Actmember.findOne({
    where: { username: req.body.username, password: req.body.password },
    attributes: [
      ["uuid", "act_member_id"],
      ["username", "user"],
    ],
    include: [
      {
        model: Role,
        where: { fk_roleid: db.Sequelize.col("role.uuid") },
        attributes: [["role_name", "role"]],
      },
    ],
  })
    .then((loginActmember) => {
      res.json({
        message: "OK",
        dataValues: loginActmember,
      });
    })
    .catch((err) => {
      console.err(err);
      res.json({
        message: "FAIL",
        error: err,
      });
    });
};
