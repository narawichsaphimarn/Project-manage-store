// ********************************************************** //
// ****** Model Merchant Of App ***************************** //
// field - uuid
//       - item name
//       - item value
//       - price
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const ShopItems = sequelize.define("shop_items", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    item_name: {
      type: Sequelize.STRING,
    },
    item_value: {
      type: Sequelize.BIGINT(11),
    },
    item_price: {
      type: Sequelize.BIGINT(11),
    },
    item_img: {
      type: Sequelize.STRING,
    },
    item_desc: {
      type: Sequelize.STRING,
    },
  });

  return ShopItems;
};
