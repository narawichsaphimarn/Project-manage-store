// ********************************************************** //
// *********** Connection DB Of App ************************* //
// ********************************************************** //

const Sequelize = require("sequelize");
const {
  DB_HOST,
  DB_USER,
  DB_PASSWOD,
  DB_DATABASE,
  DB_DIALECT,
  DB_PORT,
  DB_POOL_MAX,
  DB_POOL_MIN,
  DB_POOL_ACQUIRE,
  DB_POOL_IDLE,
} = process.env;
const db = {};
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWOD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  operatorsAliases: false,
  port: DB_PORT,
  pool: {
    acquire: DB_POOL_ACQUIRE,
    idle: DB_POOL_IDLE,
  },
  timezone: "+07:00",
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.actMembership = require("../model/actMembership.model")(sequelize, Sequelize);
db.storeInformation = require("../model/storeInformation.model")(sequelize, Sequelize);
db.role = require("../model/role.model")(sequelize, Sequelize);
db.warehouse = require("../model/warehouse.model")(sequelize, Sequelize);
db.promotion = require("../model/promotion.model")(sequelize, Sequelize);
db.tradingOrders = require("../model/tradingOrders.model")(sequelize, Sequelize);
db.productHistory = require("../model/ProductHistory.model")(sequelize, Sequelize);
db.personalInformation = require("../model/personalInformation.model")(sequelize, Sequelize);
db.tradingRole = require("../model/tradingRole.model")(sequelize, Sequelize);
db.productGroup = require("../model/productGroup.model")(sequelize, Sequelize);
db.promotionItemValue = require("../model/promotionItemsValue.model")(sequelize, Sequelize);
db.quote = require("../model/quote.mode")(sequelize, Sequelize);
db.quoteItems = require("../model/quote_items.model")(sequelize, Sequelize);
db.transaction = require("../model/transaction.model")(sequelize, Sequelize);
db.mappingQuote = require("../model/mappigQuote.model")(sequelize, Sequelize);
require("../relation")(db);

module.exports = db;
