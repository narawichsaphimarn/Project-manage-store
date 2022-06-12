const db = require("../config/db.config");
const { Op } = require("sequelize");

const quoteItems = db.quoteItems;

exports.findAllByQuoteId = (uuid) => {
  let response;
  try {
    response = quoteItems
      .findAll({
        where: {
          quote_id: uuid,
        },
      })
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

exports.create = (item) => {
  let response;
  try {
    response = quoteItems
      .create(item)
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

exports.delete = (uuid) => {
  let response;
  try {
    response = quoteItems
      .destroy({
        where: {
          uuid: uuid,
        },
      })
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
