// ********************************************************** //
// ********** Model Role Of App ***************************** //
// field - uuid
//       - promotion_name
//       - promotion_price
//       - promotion_desc
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const Promotion = sequelize.define("promotion", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.BIGINT(11)
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Promotion;
};
