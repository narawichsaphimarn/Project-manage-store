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

exports.delete = (quote_id, item_id) => {
  let response;
  try {
    response = quoteItems
      .destroy({
        where: {
          quote_id: quote_id,
          item_id: item_id,
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

exports.findByPk = (uuid) => {
  let response;
  try {
    response = quoteItems
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
