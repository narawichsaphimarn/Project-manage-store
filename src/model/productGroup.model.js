// ********************************************************** //
// ********** Model Group Of App **************************** //
// field - uuid
//       - role name
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const ProductGroup = sequelize.define("product_group", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: "compositeIndex",
    },
  });

  return ProductGroup;
};
