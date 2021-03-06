// ********************************************************** //
// *********** Connection DB Of App ************************* //
// ********************************************************** //

const Sequelize = require("sequelize");
const env = require("./env");
const _env = env.staging;
const db = {};
const sequelize = new Sequelize(_env.database, _env.username, _env.password, {
  host: _env.host,
  dialect: _env.dialect,
  operatorsAliases: false,
  port: _env.port,
  pool: {
    max: _env.max,
    min: _env.pool.min,
    acquire: _env.pool.acquire,
    idle: _env.pool.idle,
  },
  timezone: "+07:00",
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.actMembership = require("../model/actMembership.model")(
  sequelize,
  Sequelize
);
db.storeInformation = require("../model/storeInformation.model")(
  sequelize,
  Sequelize
);
db.role = require("../model/role.model")(sequelize, Sequelize);
db.warehouse = require("../model/warehouse.model")(sequelize, Sequelize);
db.promotion = require("../model/promotion.model")(sequelize, Sequelize);
db.tradingOrders = require("../model/tradingOrders.model")(
  sequelize,
  Sequelize
);
db.productHistory = require("../model/ProductHistory.model")(
  sequelize,
  Sequelize
);
db.personalInformation = require("../model/personalInformation.model")(
  sequelize,
  Sequelize
);
db.tradingRole = require("../model/tradingRole.model")(sequelize, Sequelize);
db.productGroup = require("../model/productGroup.model")(sequelize, Sequelize);
require("../relation")(db);

module.exports = db;
