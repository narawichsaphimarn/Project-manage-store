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
    secret:
      "_^!Gs?&cU6UmPGDP_n#JG7aac+RxHGJJcc#a+7w2W6SzEZm9HXv2fX2%^E9WkA5sEz#W7w?BNv%NM6+h%JHesh^D7e5EYLceJHYkT$7XKv",
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
    secret:
      "_^!Gs?&cU6UmPGDP_n#JG7aac+RxHGJJcc#a+7w2W6SzEZm9HXv2fX2%^E9WkA5sEz#W7w?BNv%NM6+h%JHesh^D7e5EYLceJHYkT$7XKv",
  },
};

module.exports = env;