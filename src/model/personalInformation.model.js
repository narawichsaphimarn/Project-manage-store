// ********************************************************** //
// ********** Model personal information Of App ************* //
// field - uuid
//       - First name
//       - Last name
//       - phone number
// ********************************************************** //

module.exports = (sequelize, Sequelize) => {
  const PersonalInformation = sequelize.define("personal_information", {
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
    age: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    merchant_name: {
      type: Sequelize.STRING,
    },
    icon: {
      type: Sequelize.STRING,
    },
  });
  return PersonalInformation;
};
