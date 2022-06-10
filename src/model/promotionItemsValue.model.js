// ********************************************************** //
// ********** Model Group Of App **************************** //
// field - uuid
//       - value
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const PromotionItems = sequelize.define("promotion_items", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    value: {
      type: Sequelize.BIGINT(11),
    },
  });

  return PromotionItems;
};
