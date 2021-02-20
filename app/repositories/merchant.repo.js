const db = require("../config/db.config");
const { Op } = require("sequelize");

const Actmember = db.act_member;
const Role = db.role;
const Merchant = db.merchant;

exports.queryCreate = (merchantName) => {
  let response;
  try {
    response = Merchant.create({
      merchant_name: merchantName,
    })
      .then((merchant) => {
        return merchant;
      })
      .catch((err) => {
        return { message: "FAIL", error: err, dataValues: null };
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
