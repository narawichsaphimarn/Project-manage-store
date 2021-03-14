// ********************************************************** //
// *************** Environment Of App *********************** //
// ********************************************************** //

const env = {
  secret: "_^!Gs?&cU6UmPGDP_n#JG7aac+RxHGJJcc#a+7w2W6SzEZm9HXv2fX2%^E9WkA5sEz#W7w?BNv%NM6+h%JHesh^D7e5EYLceJHYkT$7XKv",
  staging: {
    database: "ShopingCart1",
    username: "naras",
    password: "naras",
    host: "fourdust.kozow.com",
    dialect: "mysql",
    port: "3306",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  local: {
    database: "ShopingCart2",
    username: "naras",
    password: "naras",
    host: "fourdust.kozow.com",
    dialect: "mysql",
    port: "3306",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

module.exports = env;
