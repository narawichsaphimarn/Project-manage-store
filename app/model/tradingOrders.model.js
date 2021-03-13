// ********************************************************** //
// ********** Model Role Of App ***************************** //
// field - uuid
//       - order_sale_price
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const TradingOrders = sequelize.define("trading_orders", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    price: {
      type: Sequelize.BIGINT(11)
    },
    order_id: {
      type: Sequelize.STRING,
      unique: "compositeIndex"
    }
  });

  return TradingOrders;
};
