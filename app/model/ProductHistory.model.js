// ********************************************************** //
// ********** Model Role Of App ***************************** //
// field - uuid
//       - order_item_value
//       - order_item_price
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const ProductHistory = sequelize.define("product_history", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    value: {
      type: Sequelize.BIGINT(11)
    },
    price: {
      type: Sequelize.BIGINT(11)
    },
    old_value: {
      type: Sequelize.BIGINT(11)
    }
  });

  return ProductHistory;
};
