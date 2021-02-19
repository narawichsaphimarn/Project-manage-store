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
  const ActMember = sequelize.define("act_member", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
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

  return ActMember;
};
