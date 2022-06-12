const db = require("../config/db.config");
const { Op } = require("sequelize");

const mappingQuote = db.mappingQuote;

exports.FindMappingQuote = (user_id) => {
  let response;
  try {
    response = mappingQuote
      .findOrCreate({ where: { user_id: user_id }, defaults: { user_id: user_id } })
      .then((mappingQuote) => {
        return mappingQuote[0];
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

exports.FindMappingQuoteByQuoteId = (quote_id) => {
  let response;
  try {
    response = mappingQuote
      .findOrCreate({ where: { quote_id: quote_id }, defaults: { user_id: user_id } })
      .then((mappingQuote) => {
        return mappingQuote[0];
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

exports.Update = (items) => {
  let response;
  try {
    response = mappingQuote
      .update(items, { where: { user_id: items["user_id"] } })
      .then((item) => {
        return item;
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
