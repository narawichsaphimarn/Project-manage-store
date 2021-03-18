// ********************************************************** //
// ******************** MAIN Of App ************************* //
// ********************************************************** //

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');

const db = require('./app/config/db.config.js');
const PORT = process.env.PORT || 3001;

// force: true will drop the table if it already exists
<<<<<<< HEAD
db.sequelize.sync({ force: true, alter: true }).then(() => {
  console.log('Drop and Resync with { alter: true }');
  require('./app/mock/index.mock')(db);
=======
db.sequelize.sync().then(() => {
  console.log("Drop and Resync with { force: true, alter: true }");
  // require("./app/mock/index.mock")(db);
>>>>>>> d9d4bd6db90e1221cbfbe731c24b3847d91b1769
});

var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

require('./app/route/index.route')(app);
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
