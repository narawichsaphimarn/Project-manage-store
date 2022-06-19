// ********************************************************** //
// ******************** MAIN Of App ************************* //
// ********************************************************** //

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db.config.js");

const app = express();

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false, alter: false }).then(() => {
  // console.log("Drop and Resync with { alter: true }");
  // require("./mock/index.mock")(db);
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
