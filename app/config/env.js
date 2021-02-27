// ********************************************************** //
// *************** Environment Of App *********************** //
// ********************************************************** //

const env = {
  secret:
    "_^!Gs?&cU6UmPGDP_n#JG7aac+RxHGJJcc#a+7w2W6SzEZm9HXv2fX2%^E9WkA5sEz#W7w?BNv%NM6+h%JHesh^D7e5EYLceJHYkT$7XKv",
  staging: {
    database: "shop_market",
    username: "naras",
    password: "naras",
    host: "fourdust.kozow.com",
    dialect: "mysql",
    port: "3306",
    pool: {
      max: 10,
      min: 0,
      acquire: 900000,
      idle: 900000,
    },
  },
  local: {
    database: "shop_market",
    username: "naras",
    password: "naras",
    host: "fourdust.kozow.com",
    dialect: "mysql",
    port: "3307",
    pool: {
      max: 10,
      min: 0,
      acquire: 900000,
      idle: 900000,
    },
  },
};

module.exports = env;
