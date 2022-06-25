// ********************************************************** //
// ******************** MAIN Of App ************************* //
// ********************************************************** //

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db.config.js");

const app = express();

const { DB_FORCE, DB_ALTER, DB_MOCK } = process.env;

// force: true will drop the table if it already exists
db.sequelize
  .sync({ force: DB_FORCE === "false" ? false : true, alter: DB_ALTER === "false" ? false : true })
  .then(() => {
    if (DB_MOCK === "false" ? false : true) {
      require("./mock/index.mock")(db);
    }
  });

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));

require("./route/index.route")(app);

module.exports = app;
