module.exports = (db) => {
  db.act_member.belongsTo(db.customers, {
    foreignKey: "fk_customerid",
    targetKey: "uuid",
  });
  db.customers.hasOne(db.address, {
    foreignKey: "fk_customerid",
    targetKey: "uuid",
  });
};
