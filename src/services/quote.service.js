const quotePojo = require("../pojo/quote.pojo");
const quoteRepo = require("../repositories/quote.repo");

exports.GenerateNewQuote = async () => {
  var quote = quotePojo.create;
  quote.price = 0;
  quote.value = 0;
  const result = await quoteRepo.Create(quote);
  return result["uuid"];
};
