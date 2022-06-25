const transaction = require("../repositories/transaction.repo");
const transactionPojo = require("../pojo/transaction.pojo");
const quote = require("../repositories/quote.repo");
const { createOrderId } = require("../tools/logic.tools");
const mappingQuote = require("../repositories/mappingQuote.repo");
const quoteService = require("../services/quote.service");
const tradingOrdersRepo = require("../repositories/tradingOrders.repo");
const tradingOrdersPojo = require("../pojo/tradingOrders.pojo");
const quoteItem = require("../repositories/quoteItems.repo");
const tradingRoleRepo = require("../repositories/tradingRole.repo");
const { sumValue } = require("../tools/logic.tools");
const productHistory = require("../repositories/ProductHistory.repo");
const warehouseRepo = require("../repositories/warehouse.repo");

exports.create = async (req, res) => {
  var transactionForm = transactionPojo.createTransaction;
  const body = req.body;
  let quote_uuid = "";
  // while (true) {
  //   transactionForm.order_id = createOrderId();
  //   const data = await tradingOrdersRepo.findByOrderId(transactionForm.order_id);
  //   if (data === null) {
  //     break;
  //   }
  // }
  try {
    let resultQuote = await quote.findById(body.quote_id);
    let resultMapping = await mappingQuote.FindMappingQuoteByQuoteId(body.quote_id);
    transactionForm.price = resultQuote.price;
    transactionForm.quote_id = resultQuote.uuid;
    transactionForm.value = resultQuote.value;
    transactionForm.status = "COMPLETE";
    transactionForm.order_id = body.orderId;
    transactionForm.slip = body.slip;
    await transaction.Create(transactionForm);
    quote_uuid = await quoteService.GenerateNewQuote();
    resultMapping.quote_id = quote_uuid;
    resultQuote.status = "COMPLETE";
    resultMapping.save();
    resultQuote.save();
  } catch (error) {
    console.error("Error : ", error);
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

exports.createV2 = async (req, res) => {
  var transactionForm = transactionPojo.createTransaction;
  const body = req.body;
  try {
    body.slip = req.file.path;
  } catch (error) {
    res.json({
      message: "fail",
      error: error,
    });
  }
  let quote_uuid = "";
  while (true) {
    transactionForm.order_id = createOrderId();
    const data = await tradingOrdersRepo.findByOrderId(transactionForm.order_id);
    if (data === null) {
      break;
    }
  }
  try {
    let resultQuote = await quote.findById(body.quote_id);
    let resultMapping = await mappingQuote.FindMappingQuoteByQuoteId(body.quote_id);
    transactionForm.price = resultQuote.price;
    transactionForm.quote_id = resultQuote.uuid;
    transactionForm.value = resultQuote.value;
    transactionForm.status = "COMPLETE";
    await transaction.Create(transactionForm);
    quote_uuid = await quoteService.GenerateNewQuote();
    resultMapping.quote_id = quote_uuid;
    resultQuote.status = "COMPLETE";
    resultMapping.save();
    resultQuote.save();
  } catch (error) {
    console.error("Error : ", error);
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

exports.cancle = async (req, res) => {
  var transactionForm = transactionPojo.createTransaction;
  const body = req.body;
  let quote_uuid = "";
  while (true) {
    transactionForm.order_id = createOrderId();
    const data = await tradingOrdersRepo.findByOrderId(transactionForm.order_id);
    if (data === null) {
      break;
    }
  }
  try {
    const [resultQuote, resultMapping] = await Promise.all([
      quote.findById(body.quote_id),
      mappingQuote.FindMappingQuoteByQuoteId(body.quote_id),
    ]);
    transactionForm.price = resultQuote.price;
    transactionForm.quote_id = resultQuote.uuid;
    transactionForm.value = resultQuote.value;
    transactionForm.status = "CANCLE";
    await transaction.Create(transactionForm);
    quote_uuid = await quoteService.GenerateNewQuote();
    resultMapping.quote_id = quote_uuid;
    resultQuote.status = "CANCLE";
    resultMapping.save();
    resultQuote.save();
  } catch (error) {
    console.error(error);
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

exports.findById = async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await transaction.findByPk(id);
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

exports.delete = async (req, res) => {
  const id = req.params["id"];
  try {
    const result = await transaction.delete(id);
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

exports.findOrderByDateAndRole = async (req, res) => {
  try {
    const startDate = req.params["start"];
    const endDate = req.params["end"];
    const resultTransaction = await transaction.findOrderAllBetweenDate(startDate, endDate);
    const dataOrder = [];
    for (let i = 0; i < resultTransaction.length; i++) {
      const item = resultTransaction[i];
      const resultQuoteItems = await quoteItem.findAllByQuoteId(item.quote_id);
      const resultProduct = await Promise.all(resultQuoteItems.map((item) => item.dataValues.name));
      const form = {
        id: item.uuid,
        order_id: item.order_id,
        value: item.value,
        price: item.price,
        status: item.status,
        items: resultProduct.join(","),
      };
      dataOrder.push(form);
    }
    let totalBuy = 0;
    let totalSell = 0;
    try {
      const [trb, trs] = await Promise.all([tradingRoleRepo.findByName("BUY"), tradingRoleRepo.findByName("SELL")]);
      const [tob, tos] = await Promise.all([
        tradingOrdersRepo.findPriceAllByRole(trb.dataValues.uuid, startDate, endDate),
        tradingOrdersRepo.findPriceAllByRole(trs.dataValues.uuid, startDate, endDate),
      ]);
      totalBuy = sumValue(tob);
      totalSell = sumValue(tos);
    } catch (error) {
      console.error(error);
    }

    res.json({
      message: "OK",
      totalBuy: totalBuy,
      totalSell: totalSell,
      dataValues: dataOrder,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.findOrderByDateAndRoleV2 = async (req, res) => {
  const id = req.params["id"];
  const startDate = req.params["start"];
  const endDate = req.params["end"];
  let result = [];
  try {
    switch (parseInt(id)) {
      case 0:
        result = await productHistory.findProductSellByDate(startDate, endDate);
        break;
      case 1:
        result = await tradingOrdersRepo.findOrderAllBetweenDateAndProductHistory(startDate, endDate);
        break;
      case 2:
        result = await warehouseRepo.findAllStoreAndPersional(startDate, endDate);
        break;
      case 3:
        let resultTransaction = await transaction.findOrderAllBetweenDate(startDate, endDate);
        let dataOrder = [];
        for (let i = 0; i < resultTransaction.length; i++) {
          let item = resultTransaction[i];
          const resultQuoteItems = await quoteItem.findAllByQuoteId(item.quote_id);
          item = { item, QuoteItems: resultQuoteItems };
          dataOrder.push(item);
        }
        result = dataOrder;
        break;
      case 4:
        result = await warehouseRepo.findAllStoreAndPersional(startDate, endDate);
        break;
      default:
        break;
    }
    // const resultTransaction = await transaction.findOrderAllBetweenDate(startDate, endDate);
    // const dataOrder = [];
    // for (let i = 0; i < resultTransaction.length; i++) {
    //   const item = resultTransaction[i];
    //   const resultQuoteItems = await quoteItem.findAllByQuoteId(item.quote_id);
    //   const resultProduct = await Promise.all(resultQuoteItems.map((item) => item.dataValues.name));
    //   const form = {
    //     id: item.uuid,
    //     order_id: item.order_id,
    //     value: item.value,
    //     price: item.price,
    //     status: item.status,
    //     items: resultProduct.join(","),
    //   };
    //   dataOrder.push(form);
    // }
    let totalBuy = 0;
    let totalSell = 0;
    try {
      const [trb, trs] = await Promise.all([tradingRoleRepo.findByName("BUY"), tradingRoleRepo.findByName("SELL")]);
      const [tob, tos] = await Promise.all([
        tradingOrdersRepo.findPriceAllByRole(trb.dataValues.uuid, startDate, endDate),
        tradingOrdersRepo.findPriceAllByRole(trs.dataValues.uuid, startDate, endDate),
      ]);
      totalBuy = sumValue(tob);
      totalSell = sumValue(tos);
    } catch (error) {
      console.error(error);
    }

    res.json({
      message: "OK",
      totalBuy: totalBuy,
      totalSell: totalSell,
      dataValues: result,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
