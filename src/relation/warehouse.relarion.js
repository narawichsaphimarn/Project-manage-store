module.exports = (db) => {
  db.warehouse.belongsTo(db.storeInformation, {
    as: "StoreInformation",
    foreignKey: "fk_store_informationid",
    targetKey: "uuid",
  });

  db.warehouse.hasMany(db.productHistory, {
    as: "ProductHistory",
    foreignKey: "fk_warehouseid",
    targetKey: "uuid",
  });

  db.warehouse.hasMany(db.promotionItemValue, {
    as: "PromotionItemValue",
    foreignKey: "fk_warehouseid",
    targetKey: "uuid",
  });

  db.warehouse.belongsTo(db.productGroup, {
    as: "ProductGroup",
    foreignKey: "fk_product_groupid",
    targetKey: "uuid",
  });
};
