// ********************************************************** //
// *************** Environment Of App *********************** //
// ********************************************************** //

const env = {
  staging: {
    database: "heroku_f6b6c9a30f243e9",
    username: "b0204370f77ea2",
    password: "96606f50",
    host: "us-cdbr-east-03.cleardb.com",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  local: {
    database: "heroku_f6b6c9a30f243e9",
    username: "b0204370f77ea2",
    password: "96606f50",
    host: "us-cdbr-east-03.cleardb.com",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

module.exports = env;
