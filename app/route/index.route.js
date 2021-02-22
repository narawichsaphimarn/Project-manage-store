// ********************************************************** //
// *********** Rest APIs Of App ***************************** //
// ********************************************************** //

const actMember = require("../controller/act_member.controller");
const role = require("../controller/role.controller");
const merchant = require("../controller/merchant.controler");
const items = require("../controller/shop_items.controller");
const order_sale = require("../controller/order_sale.controller");
const order_item = require("../controller/order_item.controller");
const promotion = require("../controller/promotion.controller");

module.exports = (app) => {
  // **
  // API member
  // **
  app.post("/api/v1/member/create", actMember.create);
  app.post("/api/v1/member/login", actMember.login);
  app.get("/api/v1/member/findAllMember/:id", actMember.findAll);
  app.get("/api/v1/member/findUser/:id", actMember.findDataUser);
  app.put("/api/v1/member/update-member", actMember.updateDataActMember);
  app.delete("/api/v1/member/delete-member/:id", actMember.deleteActMember);
  app.put("/api/v1/member/update-role", actMember.updateRole);
  app.put("/api/v1/member/update-merchant", actMember.updateMerchant);

  // **
  // API role
  // **
  app.post("/api/v1/role/create", role.create);
  app.put("/api/v1/role/update", role.update);
  app.delete("/api/v1/role/delete/:id", role.delete);
  app.get("/api/v1/role/findRole/:id", role.findOneRole);
  app.get("/api/v1/role/findAllRole/:id", role.findAllRole);

  // **
  // API merchant
  // **
  app.get("/api/v1/merchant/findAll", merchant.findAllShope);
  app.get("/api/v1/merchant/find-shope/:id", merchant.findByPk);
  app.get("/api/v1/merchant/find-name/:name", merchant.fundByName);
  app.post("/api/v1/merchant/create", merchant.createShop);
  app.put("/api/v1/merchant/update-shope", merchant.updateShope);
  app.delete("/api/v1/merchant/delete-shope/:id", merchant.deleteShope);

  // **
  // APIs Items
  // **
  app.post("/api/v1/items/create", items.createItems);
  app.put("/api/v1/items/update", items.updateItems);
  app.delete("/api/v1/items/delete/:id", items.deleteItems);
  app.get("/api/v1/items/merchant-find-item/:id", items.findShopeItems);
  app.get("/api/v1/items/find-item/:id", items.findOneItems);

  // **
  // APIs Order Salse
  // **
  app.post("/api/v1/order-sale/create", order_sale.createOrderSale);

  // **
  // APIs Order Items
  // **
  app.post("/api/v1/order-items/create", order_item.createOrderItems);

  // **
  // APIs Order Promotion
  // **
};
