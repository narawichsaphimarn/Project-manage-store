exports.checkisData = (data) => {
  return data != null && data != "" && data != undefined;
};

exports.createOrderId = () => {
  return Math.floor(Math.random() * 10000000000);
};

exports.sumValue = (price) => {
  let prices = 0;
  if (price != null) {
    price.map((item) => {
      prices = prices + item.dataValues.price;
    });
  }
  return prices;
};
