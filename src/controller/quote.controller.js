const quoteRepo = require("../repositories/quote.repo");
const quoteItemsRepo = require("../repositories/quoteItems.repo");
const quotePojo = require("../pojo/quote.pojo");
const warehouseRepo = require("../repositories/warehouse.repo");
const quoteItemPojo = require("../pojo/quoteItem.pojo");
const promotionRepo = require("../repositories/promotion.repo");
const promotionItemsRepo = require("../repositories/promotionItemsValue.repo");
const mappingQuote = require("../repositories/mappingQuote.repo");
const quoteService = require("../services/quote.service");

exports.getQuoteById = async (req, res) => {
  const quote_id = req.params["id"];
  try {
    const [resultQuote, resultQuoteItems] = await Promise.all([
      quoteRepo.findById(quote_id),
      quoteItemsRepo.findAllByQuoteId(quote_id),
    ]);
    const result = await Promise.all(
      resultQuoteItems.map(async (item) => {
        const product = await warehouseRepo.findByPk(item.item_id);
        if (!product) {
          const promotion = await promotionRepo.findByPk(item.item_id);
          item.dataValues.image = promotion.image;
          item.dataValues.description = promotion.description;
        } else {
          item.dataValues.image = product.image;
          item.dataValues.description = product.description;
        }
        return item;
      }),
    );
    res.json({
      message: "OK",
      dataValues: { quote: resultQuote, quoteItems: result },
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
  try {
    const result = await saveQuoteItem(quoteForm);
  } catch (error) {
    try {
      const result = await saveQuotePromotion(quoteForm);
    } catch (error) {
      res.json({
        message: "fail",
      });
    }
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
  try {
    const result = await saveQuoteItem(quoteForm);
  } catch (error) {
    try {
      const result = await saveQuotePromotion(quoteForm);
    } catch (error) {
      res.json({
        message: "fail",
      });
    }
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
  const { quote_id, item_id } = req.params;
  const result = await quoteItemsRepo.findByItemId(item_id, quote_id);
  try {
    await quoteItemsRepo.delete(result["dataValues"]["quote_id"], result["dataValues"]["item_id"]);
  } catch (error) {
    console.error("Error : ", error);
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
  var quoteItemForm = {};
  const wh = await warehouseRepo.findByPk(item["item_id"]);
  quoteItemForm.name = wh["name"];
  quoteItemForm.price = wh["price"] * parseInt(item["value"]);
  quoteItemForm.quote_id = item["quote_id"];
  quoteItemForm.value = item["value"];
  quoteItemForm.item_id = item["item_id"];
  await quoteItemsRepo.create(quoteItemForm);
};

const saveQuotePromotion = async (item) => {
  var quoteItemForm = {};
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
    initialValue += parseInt(pi[i]["dataValues"]["value"]);
  }
  quoteItemForm.value = item["value"];
  quoteItemForm.value_by_item = initialValue * parseInt(item["value"]);
  await quoteItemsRepo.create(quoteItemForm);
};

exports.cancle = async () => {
  const id = req.params["id"];
  let quote_uuid = "";
  try {
    const [resultQuote, resultMapping] = await Promise.all([
      quoteRepo.findById(id),
      mappingQuote.FindMappingQuoteByQuoteId(id),
    ]);
    quote_uuid = await quoteService.GenerateNewQuote();
    resultMapping.quote_id = quote_uuid;
    resultQuote.status = "CANCLE";
    resultMapping.save;
    resultQuote.save;
  } catch (error) {
    res.json({
      message: "fail",
      quote_id: quote_uuid,
    });
  }
  res.json({
    message: "OK",
    quote_id: quote_uuid,
  });
};
