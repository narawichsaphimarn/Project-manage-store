module.exports = (db) => {
  db.act_member.belongsTo(db.merchant, {
    foreignKey: "fk_merchantid",
    targetKey: "uuid",
  });
  db.act_member.hasOne(db.role, {
    foreignKey: "fk_roleid",
    targetKey: "uuid",
  });
};
