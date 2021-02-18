// ********************************************************** //
// ******************** MAIN Of App ************************* //
// ********************************************************** //

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require("./app/config/db.config.js");
const PORT = process.env.PORT || 3001;

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { alter: true }");
  require("./app/mock/index.mock")(db);
});

require("./app/route/index.route")(app);
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
