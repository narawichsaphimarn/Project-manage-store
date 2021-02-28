// ********************************************************** //
// *********** Rest APIs Of App ***************************** //
// ********************************************************** //

const actMembership = require("../controller/actMembership.controller");
const role = require("../controller/role.controller");
const storeInformation = require("../controller/storeInformation.controler");
const warehouse = require("../controller/warehouse.controller");
const tradingOrders = require("../controller/tradingOrders.controller");
const order_item = require("../controller/productHistory.controller");
const promotion = require("../controller/promotion.controller");

module.exports = (app) => {
  // **
  // API actMembership
  // **
  app.post("/api/v1/act-membership/create", actMembership.create);
  app.post("/api/v1/act-membership/login", actMembership.login);
  app.get("/api/v1/act-membership/findAllMember/:id", actMembership.findAllById);
  app.get("/api/v1/act-membership/findUser/:id", actMembership.findDataUser);
  app.put(
    "/api/v1/act-membership/update-member",
    actMembership.updateDataActMember
  );
  app.delete(
    "/api/v1/act-membership/delete-member/:id",
    actMembership.deleteActMember
  );
  app.put("/api/v1/act-membership/update-role", actMembership.updateRole);
  app.get(
    "/api/v1/act-membership/find-username/:user",
    actMembership.findDataByUserName
  );

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
  app.get(
    "/api/v1/store-information/find-shope/:id",
    storeInformation.findByPk
  );
  app.get(
    "/api/v1/store-information/find-name/:name",
    storeInformation.fundByName
  );
  app.delete(
    "/api/v1/store-information/delete-shope/:id",
    storeInformation.deleteShope
  );

  // **
  // APIs warehouse
  // **
  app.post("/api/v1/warehouse/create", warehouse.create);
  app.put("/api/v1/warehouse/update", warehouse.update);
  app.delete("/api/v1/warehouse/delete/:id", warehouse.delete);
  app.get("/api/v1/warehouse/find/:id", warehouse.findOne);

  // **
  // APIs tradingOrders
  // **
  app.post("/api/v1/trading-orders/create", tradingOrders.createTradingOrders);

  // **
  // APIs Order Items
  // **
  app.post("/api/v1/order-items/create", order_item.createOrderItems);

  // **
  // APIs Order Promotion
  // **
  app.post("/api/v1/promotion/create", promotion.createPromotion);
};