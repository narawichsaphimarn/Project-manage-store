module.exports = db => {
  // **
  // Relation personalInformation One-To-One actMembership
  // **
  db.personalInformation.hasOne(db.actMembership, {
    as: "ActMembership",
    foreignKey: "fk_personal_informationid",
    targetKey: "uuid"
  });

  // **
  // Relation personal_information One-To-One storeInformation
  // **
  db.personalInformation.hasOne(db.storeInformation, {
    as: "StoreInformation",
    foreignKey: "fk_personal_informationid",
    targetKey: "uuid"
  });
};
