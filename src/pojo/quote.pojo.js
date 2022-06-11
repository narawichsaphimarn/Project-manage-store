exports.create = {
  value: Number,
  price: Number,
};

exports.addQuote = {
  quote_id: String,
  items: {
    item: [],
    promotion: [],
  },
};
