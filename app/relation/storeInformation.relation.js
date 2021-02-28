module.exports = db => {
  // **
  // Relation merchant One-To-One personal_information
  // **
  db.storeInformation.belongsTo(db.personalInformation, {
    as: "PersonalInformation",
    foreignKey: "fk_personal_informationid",
    targetKey: "uuid"
  });

  db.storeInformation.hasMany(db.tradingOrders, {
    as: "TradingOrders",
    foreignKey: "fk_store_informationid",
    targetKey: "uuid"
  });

  db.storeInformation.hasMany(db.warehouse, {
    as: "Warehouse",
    foreignKey: "fk_store_informationid",
    targetKey: "uuid"
  });
};
