// ********************************************************** //
// *********** Mockup role data Of App *********************** //
// ********************************************************** //

module.exports = (db) => {
  const Role = db.role;

  Role.create({
    role_name: "Admin",
  });
  Role.create({
    role_name: "Employees",
  });
  Role.create({
    role_name: "Merchant",
  });
};
