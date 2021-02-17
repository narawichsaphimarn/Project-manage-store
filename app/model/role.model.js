module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    role_name: {
      type: Sequelize.STRING,
    },
  });

  return Role;
};
