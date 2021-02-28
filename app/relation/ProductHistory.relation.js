module.exports = db => {
  db.productHistory.belongsTo(db.tradingOrders, {
    as: "TradingOrders",
    foreignKey: "fk_trading_ordersid",
    targetKey: "uuid"
  });

  db.productHistory.belongsTo(db.warehouse, {
    as: "Warehouse",
    foreignKey: "fk_warehouseid",
    targetKey: "uuid"
  });
};
