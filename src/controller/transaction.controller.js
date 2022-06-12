const transaction = require("../repositories/transaction.repo");
const transactionPojo = require("../pojo/transaction.pojo");
const quote = require("../repositories/quote.repo");
const { createOrderId } = require("../tools/logic.tools");
const mappingQuote = require("../repositories/mappingQuote.repo");

exports.create = async (req, res) => {
  var transactionForm = transactionPojo.createTransaction;
  const body = req.body;
  while (true) {
    transactionForm.order_id = createOrderId();
    const data = await tradingOrdersRepo.findByOrderId(form.order_id);
    if (data === null) {
      break;
    }
  }
  try {
    const resultQuote = await quote.findById(body.quote_id);
    const resultMapping = await mappingQuote.FindMappingQuote();
    transactionForm.order_id = await transaction.Create(transactionForm);
    transactionForm.price = resultQuote.price;
    transactionForm.quote_id = resultQuote.uuid;
    transactionForm.value = resultQuote.value;
    transactionForm.status = "COMPLETE";
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  res.json({
    message: "OK",
  });
};

exports.findAll = async (req, res) => {
  try {
    const result = await transaction.findAll();
    res.json({
      message: "OK",
      data: result,
    });
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
};
