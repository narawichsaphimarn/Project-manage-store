// ********************************************************** //
// ********** Model Role Of App ***************************** //
// field - uuid
//       - role name
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      unique: "compositeIndex"
    }
  });

  return Role;
};
