// ********************************************************** //
// **** Model act_member Of App ***************************** //
// field - uuid
//       - firstname
//       - lastname
//       - phone number
//       - user id
//       - username
//       - password
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const ActMembership = sequelize.define("act_membership", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
      unique: "compositeIndex",
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return ActMembership;
};
