const db = require("../config/db.config");
const { Op } = require("sequelize");

const quote = db.quote;

exports.Create = (item) => {
  let response;
  try {
    response = quote
      .findOrCreate({ where: { uuid: "Jane" }, defaults: { value: item["value"], price: item["price"] } })
      .then((quote) => {
        return quote[0];
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

exports.findById = (uuid) => {
  let response;
  try {
    response = quote
      .findByPk(uuid)
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
