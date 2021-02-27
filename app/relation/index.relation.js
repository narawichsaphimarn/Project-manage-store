// ********************************************************** //
// ****** Relation Table Of App ***************************** //
// ********************************************************** //

module.exports = (db) => {
  ///////////////////////////////////////////////////////////////
  // **
  // Relation act_member One-To-One merchant
  // **
  db.act_member.belongsTo(db.merchant, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });

  // **
  // Relation merchant One-To-One act_member
  // **
  db.merchant.hasOne(db.act_member, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  // **
  // Relation act_member One-To-One role
  // **
  db.act_member.belongsTo(db.role, {
    foreignKey: "fk_roleid",
    targetKey: "uuid",
  });

  // **
  // Relation role One-To-One act_member
  // **
  db.role.hasOne(db.act_member, {
    foreignKey: "fk_roleid",
    targetKey: "uuid",
  });
  /////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////
  // **
  // Relation merchant One-To-Many Items
  // **
  db.merchant.hasMany(db.shop_items, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });

  // **
  // Relation shop_items N-To-N merchant
  // **
  db.shop_items.belongsTo(db.merchant, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });
  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////
  // **
  // Relation merchant One-To-Many promotion
  // **
  db.merchant.hasMany(db.promotion, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });

  // **
  // Relation promotion N-To-N merchant
  // **
  db.promotion.belongsTo(db.merchant, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });
  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////
  // **
  // Relation merchant One-To-Many order_sale
  // **
  db.merchant.hasMany(db.order_sale, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });

  // **
  // Relation order_sale N-To-N merchant
  // **
  db.order_sale.belongsTo(db.merchant, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  // **
  // Relation order_sale One-To-Many order_item
  // **
  db.order_sale.hasMany(db.order_item, {
    foreignKey: "fk_order_saleid",
    targetKey: "uuid",
  });

  // **
  // Relation order_item N-To-N order_sale
  // **
  db.order_item.belongsTo(db.order_sale, {
    foreignKey: "fk_order_saleid",
    targetKey: "uuid",
  });
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  // **
  // Relation shop_items One-To-Many order_item
  // **
  db.shop_items.hasMany(db.order_item, {
    foreignKey: "fk_shop_itemsid",
    targetKey: "uuid",
  });

  // **
  // Relation order_item N-To-N shop_items
  // **
  db.order_item.belongsTo(db.shop_items, {
    foreignKey: "fk_shop_itemsid",
    targetKey: "uuid",
  });
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  // **
  // Relation promotion Many-To-Many shop_items
  // **
  db.promotion.belongsToMany(db.shop_items, {
    as: "Promotions",
    through: "promotion_shop_items",
    foreignKey: "fk_promotionid",
    otherKey: "fk_shop_itemsid",
  });

  // **
  // Relation shop_items Many-To-Many promotion
  // **
  db.shop_items.belongsToMany(db.promotion, {
    as: "ShopItems",
    through: "promotion_shop_items",
    foreignKey: "fk_shop_itemsid",
    otherKey: "fk_promotionid",
  });
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  // **
  // Relation promotion one-To-Many order_item
  // **
  db.promotion.hasMany(db.order_item, {
    foreignKey: "fk_promotionid",
    targetKey: "uuid",
  });

  // **
  // Relation order_item one-To-Many promotion
  // **
  db.order_item.belongsTo(db.promotion, {
    foreignKey: "fk_promotionid",
    targetKey: "uuid",
  });
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  // **
  // Relation act_member One-To-Many order_sale
  // **
  db.act_member.hasMany(db.order_sale, {
    foreignKey: "fk_act_memberid",
    targetKey: "uuid",
  });

  // **
  // Relation order_sale N-To-N order_sale
  // **
  db.order_sale.belongsTo(db.act_member, {
    foreignKey: "fk_act_memberid",
    targetKey: "uuid",
  });
  ///////////////////////////////////////////////////////////
};
