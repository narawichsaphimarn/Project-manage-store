// ********************************************************** //
// ****** Model Merchant Of App ***************************** //
// field - uuid
//       - merchant name
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const StoreInformation = sequelize.define("store_information", {
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

  return StoreInformation;
};
