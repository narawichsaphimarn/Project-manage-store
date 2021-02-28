module.exports = db => {
  // **
  // Relation role One-To-One act_member
  // **
  db.role.hasOne(db.actMembership, {
    foreignKey: "fk_roleid",
    targetKey: "uuid"
  });
};
