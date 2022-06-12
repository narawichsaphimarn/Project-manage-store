const transaction = require("../repositories/transaction.repo");
const transactionPojo = require("../pojo/transaction.pojo");

exports.create = async (req, res) => {
  var transactionForm = transactionPojo.createTransaction;
  transactionForm = req.body;
  try {
    await transaction.Create(transactionForm);
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
