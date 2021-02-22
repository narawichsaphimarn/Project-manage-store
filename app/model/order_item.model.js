// ********************************************************** //
// ********** Model Role Of App ***************************** //
// field - uuid
//       - order_item_value
//       - order_item_price
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define("order_item", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    order_item_value: {
      type: Sequelize.BIGINT(11),
    },
    order_item_price: {
      type: Sequelize.BIGINT(11),
    },
    old_order_item_value: {
      type: Sequelize.BIGINT(11),
    },
  });

  return OrderItem;
};
