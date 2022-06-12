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
    await quoteItemsRepo.delete(quoteForm["quote_id"], quoteForm["item_id"]);
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
  const id = req.params["id"];
  const result = await quoteItemsRepo.findByPk(id);
  console.log("result ", result);
  try {
    await quoteItemsRepo.delete(result["dataValues"]["quote_id"], result["dataValues"]["item_id"]);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  try {
    await updateQuote(result["dataValues"]["quote_id"]);
  } catch (error) {
    res.json({
      message: "fail",
    });
  }
  res.json({
    message: "OK",
  });
};

const updateQuote = async (quoteId) => {
  try {
    const [quote, quoteItem] = await Promise.all([
      quoteRepo.findById(quoteId),
      quoteItemsRepo.findAllByQuoteId(quoteId),
    ]);
    let initialValue = 0;
    let initialPrice = 0;
    for (let i = 0; i < quoteItem.length; i++) {
      initialValue += quoteItem[i]["dataValues"]["value"];
      initialPrice += quoteItem[i]["dataValues"]["price"];
    }
    quote["value"] = initialValue;
    quote["price"] = initialPrice;
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
  quoteItemForm.item_id = item["item_id"];
  await quoteItemsRepo.create(quoteItemForm);
};

const saveQuotePromotion = async (item) => {
  var quoteItemForm = quoteItemPojo.create;
  const [p, pi] = await Promise.all([
    promotionRepo.findByPk(item["item_id"]),
    promotionItemsRepo.findAllBypromotionId(item["item_id"]),
  ]);
  quoteItemForm.name = p["dataValues"]["title"];
  quoteItemForm.price = p["price"] * parseInt(item["value"]);
  quoteItemForm.quote_id = item["quote_id"];
  quoteItemForm.item_id = item["item_id"];
  let initialValue = 0;
  for (let i = 0; i < pi.length; i++) {
    initialValue += pi[i]["dataValues"]["value"] * parseInt(item["value"]);
  }
  quoteItemForm.value = initialValue;
  await quoteItemsRepo.create(quoteItemForm);
};
