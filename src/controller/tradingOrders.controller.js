// ********************************************************** //
// *********** Order sale Controller Of App ***************** //
// ********************************************************** //

const tradingOrdersRepo = require("../repositories/tradingOrders.repo");
const tradingRoleRepo = require("../repositories/tradingRole.repo");
const { createOrderId } = require("../tools/logic.tools");
const storeInformationRepo = require("../repositories/storeInformation.repo");
const { sumValue } = require("../tools/logic.tools");
const tradingOrdersPojo = require("../pojo/tradingOrders.pojo");
const productHistoryRepo = require("../repositories/ProductHistory.repo");
const warehouseRepo = require("../repositories/warehouse.repo");
const transaction = require("../repositories/transaction.repo");
const transactionPojo = require("../pojo/transaction.pojo");

exports.createTradingOrders = async (req, res) => {
  try {
    const role = req.params["role"];
    const form = req.body.dataValues;
    while (true) {
      form.order_id = createOrderId();
      const data = await tradingOrdersRepo.findByOrderId(form.order_id);
      if (data === null) {
        break;
      }
    }
    const to = await tradingOrdersRepo.create(form);
    const tr = await tradingRoleRepo.findByName(role);
    if (req.body.storeInformation != null) {
      const si = await storeInformationRepo.findById(req.body.storeInformation);
      to.setStoreInformation(si);
    }
    to.setTradingRole(tr);
    res.json({
      message: "OK",
      dataValues: to.dataValues,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.findOrderByDateAndRole = async (req, res) => {
  try {
    const startDate = req.params["start"];
    const endDate = req.params["end"];
    const to = await tradingOrdersRepo.findOrderAllBetweenDate(startDate, endDate);
    const dataOrder = [];
    for (let i = 0; i < to.length; i++) {
      const item = to[i];
      const price = item.price;
      const toPojo = tradingOrdersPojo.findByDate;
      toPojo.date = item.dataValues.date;
      toPojo.role = item.dataValues.TradingRole.dataValues.role;
      if (item.dataValues.StoreInformation != null) toPojo.name = item.dataValues.StoreInformation.dataValues.name;
      else toPojo.name = null;
      console.log("to.uuid ==> ", item.uuid);
      const [ph, pht] = await Promise.all([
        productHistoryRepo.findWarehouseWithToId(item.uuid).then((res) => {
          const data = [];
          res.map((itemWh) => {
            console.log("itemWh Warehouse ==> ", itemWh);
            data.push(itemWh.Warehouse.name);
          });
          return data;
        }),
        productHistoryRepo.findByTradingId(item.uuid).then((res) => {
          return { value: res[0]["value"], old_value: res[0]["old_value"] };
        }),
      ]);
      console.log("ph ==> ", ph);
      console.log("pht ==> ", pht);
      toPojo.order = ph;
      toPojo.orderId = item.dataValues.id;
      toPojo.price = price;
      toPojo.value = pht["value"];
      toPojo.old_value = pht["old_value"];
      dataOrder.push(JSON.stringify(toPojo));
    }

    if (to.length !== 0) {
      const [trb, trs] = await Promise.all([tradingRoleRepo.findByName("BUY"), tradingRoleRepo.findByName("SELL")]);
      const [tob, tos] = await Promise.all([
        tradingOrdersRepo.findPriceAllByRole(trb.dataValues.uuid, startDate, endDate),
        tradingOrdersRepo.findPriceAllByRole(trs.dataValues.uuid, startDate, endDate),
      ]);
      const totalBuy = sumValue(tob);
      const totalSell = sumValue(tos);
      const form = { allBuy: totalBuy, allSell: totalSell, order: dataOrder };
      res.json({
        message: "OK",
        dataValues: form,
      });
    } else {
      res.json({
        message: "No data",
        dataValues: { allBuy: 0, allSell: 0, order: [] },
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
