module.exports = (db) => {
  db.promotion.belongsToMany(db.warehouse, {
    as: "Warehouse",
    through: "promotion_warehouse",
    foreignKey: "fk_promotionid",
    otherKey: "fk_warehouseid",
  });
  db.promotion.hasMany(db.productHistory, {
    as: "ProductHistory",
    foreignKey: "fk_promotionid",
    targetKey: "uuid",
  });
};
