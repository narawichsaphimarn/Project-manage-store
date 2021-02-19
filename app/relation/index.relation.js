// ********************************************************** //
// ****** Relation Table Of App ***************************** //
// ********************************************************** //

module.exports = (db) => {
  // **
  // Relation act_member One-To-One merchant
  // **
  db.act_member.belongsTo(db.merchant, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });

  // **
  // Relation act_member One-To-One role
  // **
  db.act_member.belongsTo(db.role, {
    foreignKey: "fk_roleid",
    targetKey: "uuid",
  });

  // **
  // Relation merchant One-To-Many Items
  // **
  db.merchant.hasMany(db.shope_items, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });

  // **
  // Relation merchant One-To-Many promotion
  // **
  db.merchant.hasMany(db.promotion, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });

  // **
  // Relation merchant One-To-Many order_sale
  // **
  db.merchant.hasMany(db.order_sale, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });

  // **
  // Relation order_sale One-To-Many order_item
  // **
  db.order_sale.hasMany(db.order_item, {
    foreignKey: "fk_order_saleid",
    targetKey: "uuid",
  });

  // **
  // Relation shope_items One-To-Many order_item
  // **
  db.shope_items.hasMany(db.order_item, {
    foreignKey: "fk_shope_itemsid",
    targetKey: "uuid",
  });

  // **
  // Relation promotion Many-To-Many order_item
  // **
  db.promotion.belongsToMany(db.shope_items, {
    through: "promotion_shope_items",
  });
};
