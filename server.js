const express = require("express");
const app = express();
const env = require("./app/config/env");
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require("./app/config/db.config.js")(env.staging);
const PORT = process.env.PORT || 3001;

// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
// });

require("./app/route/index.route")(app);
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
