module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    order_id: {
      type: Sequelize.STRING,
      unique: "compositeIndex",
    },
    value: {
      type: Sequelize.BIGINT(11),
    },
    price: {
      type: Sequelize.BIGINT(11),
    },
    quote_id: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  });

  return Transaction;
};
