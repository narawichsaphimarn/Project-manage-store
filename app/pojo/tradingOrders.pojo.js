exports.create = {
  order_sale_price: Number,
  order_sale_id: String,
};

exports.findByDate = {
  date: Date,
  name: String,
  order: Array,
  price: Number,
  role: String,
  orderId: String,
  value: Number,
  old_value: Number,
};
