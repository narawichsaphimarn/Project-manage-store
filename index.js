require("dotenv").config();
const app = require("./src");

const { PORT } = process.env;

app.listen(PORT);
