// ********************************************************** //
// ****** Model Merchant Of App ***************************** //
// field - uuid
//       - merchant name
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const Merchant = sequelize.define("merchant", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    merchant_name: {
      type: Sequelize.STRING,
      unique: "compositeIndex",
    },
  });

  return Merchant;
};
