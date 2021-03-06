// ********************************************************** //
// ****** Relation Table Of App ***************************** //
// ********************************************************** //

module.exports = (db) => {
  require("./personalInformation.relation")(db);
  require("./actMembership.relation")(db);
  require("./storeInformation.relation")(db);
  require("./productHistory.relation")(db);
  require("./tradingOrders.relation")(db);
  require("./promotion.relation")(db);
  require("./role.relation")(db);
  require("./warehouse.relarion")(db);
  require("./tradingRole.relation")(db);
};
