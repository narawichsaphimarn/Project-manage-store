const quoteRepo = require("../repositories/quote.repo");
const quoteItemsRepo = require("../repositories/quoteItems.repo");
const quotePojo = require("../pojo/quote.pojo");
const warehouseRepo = require("../repositories/warehouse.repo");
const quoteItemPojo = require("../pojo/quoteItem.pojo");
const promotionRepo = require("../repositories/promotion.repo");
const promotionItemsRepo = require("../repositories/promotionItemsValue.repo");

exports.getQuoteById = async (req, res) => {
  const quote_id = req.params["id"];
  try {
    const [resultQuote, resultQuoteItems] = await Promise.all([
      quoteRepo.findById(quote_id),
      quoteItemsRepo.findAllByQuoteId(quote_id),
    ]);
    res.json({
      message: "OK",
      dataValues: { quote: resultQuote, quoteItems: resultQuoteItems },
    });
  } catch (error) {
    res.json({
      message: "No data",
      dataValues: { quote: {}, quoteItems: [] },
    });
  }
};

exports.addProduct = async (req, res) => {
  var quoteForm = quotePojo.addQuote;
  quoteForm = req.body;
  switch (quoteForm.type) {
    case "item":
      try {
        const result = await saveQuoteItem(quoteForm);
      } catch (error) {
        console.error(error);
        res.json({
          message: "fail",
        });
      }
      break;
    case "promotion":
      try {
        const result = await saveQuotePromotion(quoteForm);
      } catch (error) {
        console.error(error);
        res.json({
          message: "fail",
        });
      }
      break;
  }
  try {
    await updateQuote(quoteForm["quote_id"]);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  res.json({
    message: "OK",
  });
};

exports.updateQuote = async (req, res) => {
  var quoteForm = quotePojo.addQuote;
  quoteForm = req.body;
  try {
    await quoteItemsRepo.delete(quoteForm["quote_id"]);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  switch (quoteForm.type) {
    case "item":
      try {
        const result = await saveQuoteItem(quoteForm);
      } catch (error) {
        console.error(error);
        res.json({
          message: "fail",
        });
      }
      break;
    case "promotion":
      try {
        const result = await saveQuotePromotion(quoteForm);
      } catch (error) {
        console.error(error);
        res.json({
          message: "fail",
        });
      }
      break;
  }
  try {
    await updateQuote(quoteForm["quote_id"]);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  res.json({
    message: "OK",
  });
};

exports.delete = async (req, res) => {
  const quote_id = req.params["id"];
  try {
    await quoteItemsRepo.delete(quote_id);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  try {
    await updateQuote(quoteForm["quote_id"]);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
};

const updateQuote = async (quoteId) => {
  try {
    const [quote, quoteItem] = await Promise.all([
      quoteRepo.findById(quoteId),
      quoteItemsRepo.findAllByQuoteId(quoteId),
    ]);
    const initialValue = 0;
    const value = await quoteItem.reduce(
      (previousValue, currentValue) => parseInt(previousValue["value"]) + currentValue,
      initialValue,
    );
    quote["value"] = value;
    quote.save();
  } catch (error) {
    return false;
  }
  return true;
};

const saveQuoteItem = async (item) => {
  var quoteItemForm = quoteItemPojo.create;
  const wh = await warehouseRepo.findByPk(item["item_id"]);
  quoteItemForm.name = wh["name"];
  quoteItemForm.price = wh["price"] * parseInt(item["value"]);
  quoteItemForm.quote_id = item["quote_id"];
  quoteItemForm.value = item["value"];
  await quoteItemsRepo.create(quoteItemForm);
};

const saveQuotePromotion = async (item) => {
  var quoteItemForm = quoteItemPojo.create;
  const [p, pi] = await Promise.all([
    promotionRepo.findByPk(item["item_id"]),
    promotionItemsRepo.findAllBypromotionId(item["item_id"]),
  ]);
  quoteItemForm.name = p["name"];
  quoteItemForm.price = p["price"] * parseInt(item["value"]);
  quoteItemForm.quote_id = item["quote_id"];
  const initialValue = 0;
  const value = await pi.reduce(
    (previousValue, currentValue) => parseInt(previousValue["value"]) + currentValue,
    initialValue,
  );
  quoteItemForm.value = value;
  await quoteItemsRepo.create(quoteItemForm);
};
