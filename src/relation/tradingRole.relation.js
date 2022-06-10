module.exports = (db) => {
  db.tradingRole.hasOne(db.tradingOrders, {
    as: "TradingOrders",
    foreignKey: "fk_trading_roleid",
    targetKey: "uuid",
  });
};
