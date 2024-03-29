module.exports = (sequelize, Sequelize) => {
  const QuoteItems = sequelize.define("quote_items", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    value: {
      type: Sequelize.BIGINT(11),
    },
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.BIGINT(11),
    },
    quote_id: {
      type: Sequelize.STRING,
    },
    item_id: {
      type: Sequelize.STRING,
    },
  });

  return QuoteItems;
};
