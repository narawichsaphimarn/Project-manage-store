// ********************************************************** //
// *********** Mockup main Of App *********************** //
// ********************************************************** //

module.exports = async db => {
  await require("./role.mock")(db);
  await require("./productGroup")(db)
  await require("./tradingRole.mock")(db);
  await require("./actMembership.mock")(db);
  await require("./storeInformation.mock")(db);

};
