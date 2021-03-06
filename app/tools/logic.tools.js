exports.checkisData = (data) => {
  return data != null && data != "" && data != undefined;
};

exports.createOrderId = () => {
  return Math.floor(Math.random() * 10000000000);
};
