module.exports = (db) => {
  // **
  // Relation actMembership One-To-One personalInformation
  // **
  db.actMembership.belongsTo(db.personalInformation, {
    as: "PersonalInformation",
    foreignKey: "fk_personal_informationid",
    targetKey: "uuid",
  });

  // **
  // Relation actMembership One-To-One role
  // **
  db.actMembership.belongsTo(db.role, {
    as: "Role",
    foreignKey: "fk_roleid",
    targetKey: "uuid",
  });
};