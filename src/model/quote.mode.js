module.exports = (sequelize, Sequelize) => {
  const Quote = sequelize.define("quote", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    value: {
      type: Sequelize.BIGINT(11),
    },
    price: {
      type: Sequelize.BIGINT(11),
    },
    status: {
      type: Sequelize.STRING,
    },
  });

  return Quote;
};
