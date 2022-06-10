// ********************************************************** //
// ****** Model Merchant Of App ***************************** //
// field - uuid
//       - item name
//       - item value
//       - price
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const Warehouse = sequelize.define("warehouse", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.BIGINT(11),
    },
    price: {
      type: Sequelize.BIGINT(11),
    },
    image: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Warehouse;
};
