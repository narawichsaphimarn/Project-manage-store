const quoteRepo = require("../repositories/quote.repo");
const quoteItemsRepo = require("../repositories/quoteItems.repo");
const quotePojo = require("../pojo/quote.pojo");

exports.GetQuoteById = async (req, res) => {
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

exports.AddProduct = async (req, res) => {
  var quoteForm = quotePojo.addQuote;
  quoteForm = req.body;
  if (quoteForm.items.item.length > 0) {

  }

};

const saveQuoteItem = async () => {

}

const saveQuotePromotion = async () => {
    
}
