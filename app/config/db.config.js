// ********************************************************** //
// *********** Connection DB Of App ************************* //
// ********************************************************** //

const Sequelize = require("sequelize");
const env = require("./env");
const _env = env.local;
const db = {};
const sequelize = new Sequelize(_env.database, _env.username, _env.password, {
  host: _env.host,
  dialect: _env.dialect,
  operatorsAliases: false,

  pool: {
    max: _env.max,
    min: _env.pool.min,
    acquire: _env.pool.acquire,
    idle: _env.pool.idle,
  },
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.act_member = require("../model/act_member.model")(sequelize, Sequelize);
db.merchant = require("../model/merchant.model")(sequelize, Sequelize);
db.role = require("../model/role.model")(sequelize, Sequelize);
db.shop_items = require("../model/shop_items.model")(sequelize, Sequelize);
db.promotion = require("../model/promotion.model")(sequelize, Sequelize);
db.order_sale = require("../model/order_sale.model")(sequelize, Sequelize);
db.order_item = require("../model/order_item.model")(sequelize, Sequelize);
require("../relation/index.relation")(db);

module.exports = db;
