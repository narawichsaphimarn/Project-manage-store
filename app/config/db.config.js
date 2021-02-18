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
require("../relation/index.relation")(db);

module.exports = db;
