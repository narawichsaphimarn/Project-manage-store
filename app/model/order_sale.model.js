// ********************************************************** //
// ********** Model Role Of App ***************************** //
// field - uuid
//       - order_sale_price
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const OrderSale = sequelize.define("order_sale", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    order_sale_price: {
      type: Sequelize.BIGINT(11),
    },
    order_sale_id: {
      type: Sequelize.STRING,
      unique: "compositeIndex",
    },
  });

  return OrderSale;
};
