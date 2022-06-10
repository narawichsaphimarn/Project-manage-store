module.exports = (db) => {
  db.tradingOrders.belongsTo(db.storeInformation, {
    as: "StoreInformation",
    foreignKey: "fk_store_informationid",
    targetKey: "uuid",
  });

  db.tradingOrders.belongsTo(db.tradingRole, {
    as: "TradingRole",
    foreignKey: "fk_trading_roleid",
    targetKey: "uuid",
  });

  db.tradingOrders.hasMany(db.productHistory, {
    as: "ProductHistory",
    foreignKey: "fk_trading_ordersid",
    targetKey: "uuid",
  });
};
