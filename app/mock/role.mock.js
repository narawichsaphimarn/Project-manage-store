// ********************************************************** //
// *********** Mockup role data Of App *********************** //
// ********************************************************** //

module.exports = (db) => {
  try {
    const Role = db.role;
    mockCreate = (mock) => {
      Role.create({
        role_name: mock.roleName,
      }).catch((err) => {
        console.err(err);
      });
    };

    mockCreate({ roleName: "Admin" });
    mockCreate({ roleName: "Employees" });
    mockCreate({ roleName: "Merchant" });
  } catch (error) {
    console.error(error);
  }
};
