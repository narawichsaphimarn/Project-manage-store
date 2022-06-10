// ********************************************************** //
// ********** Model Role Of App ***************************** //
// field - uuid
//       - role name
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const TradingRole = sequelize.define("trading_role", {
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

  return TradingRole;
};
