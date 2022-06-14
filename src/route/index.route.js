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
const promotionItems = require("../controller/promotionItems.controller");
const quote = require("../controller/quote.controller");
const personalInformation = require("../controller/personnalInformation.controller");
const transaction = require("../controller/transaction.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

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
  app.post("/api/v1/store-information/create-item", upload.single("file"), storeInformation.createStoreAndItems);
  app.put("/api/v1/store-information/update", storeInformation.update);

  // **
  // APIs warehouse
  // **
  app.post("/api/v1/warehouse/create", warehouse.create);
  app.put("/api/v1/warehouse/update", upload.single("file"), warehouse.update);
  app.delete("/api/v1/warehouse/delete/:id", warehouse.delete);
  app.get("/api/v1/warehouse/find/:id", warehouse.findOne);
  app.get("/api/v1/warehouse/findAll", warehouse.findAll);
  app.get("/api/v1/warehouse/find-by-product-group/:id", warehouse.findAllByProductGroupId);

  // **
  // APIs tradingOrders
  // **
  app.post("/api/v1/trading-orders/create/:role", tradingOrders.createTradingOrders);
  app.get("/api/v1/trading-orders/find-by-date/:start/:end", tradingOrders.findOrderByDateAndRole);
  app.get("/api/v1/trading-orders", tradingOrders.findAll);
  // **
  // APIs Order Items
  // **
  app.post("/api/v1/product-history/create", productHistory.createOrderItemsBuy);

  // **
  // APIs Order Promotion
  // **
  app.post("/api/v1/promotion/create", upload.single("file"), promotion.createPromotion);
  app.get("/api/v1/promotion/findAll", promotion.findAllPromotion);
  app.get("/api/v1/promotion/findOne/:id", promotion.findOnePromotion);
  app.delete("/api/v1/promotion/delete/:id", promotion.delete);
  app.put("/api/v1/promotion/update", upload.single("file"), promotion.update);

  // **
  // APIs Product Group
  // **
  app.get("/api/v1/product-group/find-all", productGroup.findAll);

  // **
  // APIs Promotion Items
  // **
  app.get("/api/v1/promotion-item/find-all-by-promotion/:id", promotionItems.findItemsByPromotion);
  app.get("/api/v1/promotion-item/find-warehouse-all/:id", promotionItems.findAllWareHouseByProId);
  app.get("/api/v1/promotion-item/value-id/:id", promotionItems.findAllValueAndId);

  app.get("/api/v1/ping", (req, res) => {
    res.json({ message: "pong" });
  });

  // **
  // APIs Quote
  // **
  app.get("/api/v1/quote/:id", quote.getQuoteById);
  app.post("/api/v1/quote", quote.addProduct);
  app.post("/api/v1/quote/cancle", quote.cancle);
  app.delete("/api/v1/quote/:id", quote.delete);
  app.put("/api/v1/quote", quote.updateQuote);

  /**
   * APIs Personal Information
   */
  app.get("/api/v1/personal-information/id/:id", personalInformation.findOne);
  app.get("/api/v1/personal-information", personalInformation.findAll);
  app.post("/api/v1/personal-information", upload.single("file"), personalInformation.create);
  app.delete("/api/v1/personal-information/:id", personalInformation.delete);
  app.put("/api/v1/personal-information", upload.single("file"), personalInformation.update);

  /**
   * APIs transaction
   */
  app.post("/api/v1/transaction", transaction.create);
  app.post("/api/v1/transaction/cancle", transaction.cancle);
  app.get("/api/v1/transaction", transaction.findAll);
  app.get("/api/v1/transaction/:id", transaction.findById);
  app.delete("/api/v1/transaction/:id", transaction.delete);
  app.get("/api/v1/transaction/find-by-date/:start/:end", transaction.findOrderByDateAndRole);
};
