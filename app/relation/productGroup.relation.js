module.exports = (db) => {
  db.productGroup.hasOne(db.warehouse, {
    foreignKey: "fk_product_groupid",
    targetKey: "uuid",
  });
};
