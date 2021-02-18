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
};
