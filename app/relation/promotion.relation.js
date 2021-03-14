module.exports = (db) => {
  db.promotion.hasMany(db.productHistory, {
    as: "ProductHistory",
    foreignKey: "fk_promotionid",
    targetKey: "uuid",
  });
  db.promotion.hasMany(db.promotionItemValue, {
    as: "PromotionItemValue",
    foreignKey: "fk_promotionid",
    targetKey: "uuid",
  });
};
