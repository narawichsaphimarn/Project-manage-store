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
      primaryKey: true,
    },
    promotion_name: {
      type: Sequelize.STRING,
    },
    promotion_price: {
      type: Sequelize.BIGINT(11),
    },
    promotion_desc: {
      type: Sequelize.STRING,
    },
  });

  return Promotion;
};
