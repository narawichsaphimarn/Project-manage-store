module.exports = (sequelize, Sequelize) => {
  const Merchant = sequelize.define("merchant", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    merchant_name: {
      type: Sequelize.STRING,
    },
  });

  return Merchant;
};
