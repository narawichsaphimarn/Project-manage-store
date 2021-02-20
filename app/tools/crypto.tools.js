const crypto = require("crypto");
const env = require("../config/env");

exports.hashCode = (data) => {
  var secret = env.staging.secret;
  const hash = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return hash;
};
