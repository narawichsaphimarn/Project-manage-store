const db = require("../config/db.config");
const { Op } = require("sequelize");

const transaction = db.transaction;

exports.Create = (item) => {
  let response;
  try {
    response = transaction
      .create(item)
      .then((items) => {
        return items;
      })
      .catch((err) => {
        return {
          message: "FAIL",
          dataValues: null,
          error: err,
        };
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
    response = transaction
      .findAll()
      .then((items) => {
        return items;
      })
      .catch((err) => {
        return {
          message: "FAIL",
          dataValues: null,
          error: err,
        };
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};

exports.findByPk = (uuid) => {
  let response;
  try {
    response = transaction
      .findByPk(uuid)
      .then((items) => {
        return items;
      })
      .catch((err) => {
        return {
          message: "FAIL",
          dataValues: null,
          error: err,
        };
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
