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

exports.findAll = () => {
  let response;
  try {
    response = Merchant.findAll()
      .then((merchant) => {
        return { message: "OK", dataValues: merchant };
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

exports.findByPk = (merchant_id) => {
  let response;
  try {
    response = Merchant.findByPk(merchant_id)
      .then((merchant) => {
        return { message: "OK", dataValues: merchant };
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

exports.findByName = (merchant_name) => {
  let response;
  try {
    response = Merchant.findOne({ where: { merchant_name: merchant_name } })
      .then((merchant) => {
        return { message: "OK", dataValues: merchant };
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
