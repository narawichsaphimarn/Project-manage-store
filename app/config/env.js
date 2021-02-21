// ********************************************************** //
// *************** Environment Of App *********************** //
// ********************************************************** //

const env = {
  secret:
    "_^!Gs?&cU6UmPGDP_n#JG7aac+RxHGJJcc#a+7w2W6SzEZm9HXv2fX2%^E9WkA5sEz#W7w?BNv%NM6+h%JHesh^D7e5EYLceJHYkT$7XKv",
  staging: {
    database: "heroku_5805ccaaddd02a0",
    username: "bca0acb0721baa",
    password: "d6149bc3",
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
    database: "heroku_70d82bac1ba4d98",
    username: "b6430c0ab77cc5",
    password: "aad3aab3",
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
