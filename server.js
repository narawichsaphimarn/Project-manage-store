// ********************************************************** //
// ******************** MAIN Of App ************************* //
// ********************************************************** //

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");

const db = require("./app/config/db.config.js");
const PORT = process.env.PORT || 3001;

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false, alter: false }).then(() => {
  console.log("Drop and Resync with { alter: true }");
  require("./app/mock/index.mock")(db);
});

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

require("./app/route/index.route")(app);
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
