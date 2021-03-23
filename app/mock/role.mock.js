// ********************************************************** //
// *********** Mockup role data Of App ********************** //
// ********************************************************** //

const roleRepo = require("../repositories/role.repo");

module.exports = (db) => {
  try {
    mockCreate = (mock) => {
      roleRepo.create(mock.name);
    };

    mockCreate({
      name: "Admin",
    });
    mockCreate({
      name: "Employees",
    });
  } catch (error) {
    console.error("Role Mock ", error);
  }
};
