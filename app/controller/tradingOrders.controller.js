// ********************************************************** //
// *********** Order sale Controller Of App ***************** //
// ********************************************************** //

const tradingOrdersRepo = require("../repositories/tradingOrders.repo");
const tradingRoleRepo = require("../repositories/tradingRole.repo");
const { createOrderId } = require("../tools/logic.tools");
const storeInformationRepo = require("../repositories/storeInformation.repo");

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
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};
