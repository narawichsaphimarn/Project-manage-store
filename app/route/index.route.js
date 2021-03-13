// ********************************************************** //
// *********** Rest APIs Of App ***************************** //
// ********************************************************** //

const actMembership = require("../controller/actMembership.controller");
const role = require("../controller/role.controller");
const storeInformation = require("../controller/storeInformation.controler");
const warehouse = require("../controller/warehouse.controller");
const tradingOrders = require("../controller/tradingOrders.controller");
const productHistory = require("../controller/productHistory.controller");
const promotion = require("../controller/promotion.controller");
const productGroup = require("../controller/productGroup.controller");

module.exports = (app) => {
  // **
  // API actMembership
  // **
  app.post("/api/v1/act-membership/create", actMembership.create);
  app.post("/api/v1/act-membership/login", actMembership.login);
  app.get("/api/v1/act-membership/findAllMember/:id", actMembership.findAllById);
  app.get("/api/v1/act-membership/findUser/:id", actMembership.findDataUser);
  app.put("/api/v1/act-membership/update-member", actMembership.updateDataActMember);
  app.delete("/api/v1/act-membership/delete-member/:id", actMembership.deleteActMember);
  app.put("/api/v1/act-membership/update-role", actMembership.updateRole);
  app.get("/api/v1/act-membership/find-username/:user", actMembership.findDataByUserName);

  // **
  // API role
  // **
  app.post("/api/v1/role/create", role.create);
  app.put("/api/v1/role/update", role.update);
  app.delete("/api/v1/role/delete/:id", role.delete);
  app.get("/api/v1/role/findRole/:id", role.findOneRole);
  app.get("/api/v1/role/findAllRole/:id", role.findAllRole);

  // **
  // API storeInformation
  // **
  app.get("/api/v1/store-information/findAll", storeInformation.findAllShope);
  app.get("/api/v1/store-information/find-shope/:id", storeInformation.findByPk);
  app.get("/api/v1/store-information/find-name/:name", storeInformation.fundByName);
  app.delete("/api/v1/store-information/delete-shope/:id", storeInformation.deleteShope);
  app.post("/api/v1/store-information/create", storeInformation.create);

  // **
  // APIs warehouse
  // **
  app.post("/api/v1/warehouse/create", warehouse.create);
  app.put("/api/v1/warehouse/update", warehouse.update);
  app.delete("/api/v1/warehouse/delete/:id", warehouse.delete);
  app.get("/api/v1/warehouse/find/:id", warehouse.findOne);
  app.get("/api/v1/warehouse/findAll", warehouse.findAll);
  app.get("/api/v1/warehouse/find-by-product-group/:id", warehouse.findAllByProductGroupId);

  // **
  // APIs tradingOrders
  // **
  app.post("/api/v1/trading-orders/create/:role", tradingOrders.createTradingOrders);
  app.get("/api/v1/trading-orders/find-by-date/:start/:end", tradingOrders.findOrderByDateAndRole);

  // **
  // APIs Order Items
  // **
  app.post("/api/v1/product-history/create", productHistory.createOrderItemsBuy);

  // **
  // APIs Order Promotion
  // **
  app.post("/api/v1/promotion/create", promotion.createPromotion);

  // **
  // APIs Product Group
  // **
  app.get("/api/v1/product-group/find-all", productGroup.findAll);
};
