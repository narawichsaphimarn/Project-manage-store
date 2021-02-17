const Sequelize = require("sequelize");

module.exports = (env_type) => {
  const _env = env_type;
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
};
