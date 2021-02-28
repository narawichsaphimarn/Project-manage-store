module.exports = db => {
  db.warehouse.belongsTo(db.storeInformation, {
    as: "StoreInformation",
    foreignKey: "fk_store_informationid",
    targetKey: "uuid"
  });

  db.warehouse.hasMany(db.productHistory, {
    as: "ProductHistory",
    foreignKey: "fk_warehouseid",
    targetKey: "uuid"
  });

  db.warehouse.belongsToMany(db.promotion, {
    as: "Promotion",
    through: "promotion_warehouse",
    foreignKey: "fk_warehouseid",
    otherKey: "fk_promotionid"
  });
};
