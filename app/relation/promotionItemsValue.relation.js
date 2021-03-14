module.exports = (db) => {
  db.promotionItemValue.belongsTo(db.promotion, {
    as: "Promotion",
    foreignKey: "fk_promotionid",
    targetKey: "uuid",
  });

  db.promotionItemValue.belongsTo(db.warehouse, {
    as: "Warehouse",
    foreignKey: "fk_warehouseid",
    targetKey: "uuid",
  });
};
