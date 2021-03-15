module.exports = (db) => {
  db.productGroup.hasOne(db.warehouse, {
    as: "Warehouse",
    foreignKey: "fk_product_groupid",
    targetKey: "uuid",
  });
};
