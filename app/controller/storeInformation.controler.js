// ********************************************************** //
// *********** Merchant Controller Of App ******************* //
// ********************************************************** //

const storeInformationRepo = require("../repositories/storeInformation.repo");
const personalInformationRepo = require("../repositories/personalInformation.repo");
const storeInfoPojo = require("../pojo/storeInformation.pojo");
const personInfoPojo = require("../pojo/person.pojo");
const warehouseRepo = require("../repositories/warehouse.repo");
const productGroupRepo = require("../repositories/promotionGroup.repo");
const tradingOrdersRepo = require("../repositories/tradingOrders.repo");
const tradingOrdersPojo = require("../pojo/tradingOrders.pojo");
const tradingRoleRepo = require("../repositories/tradingRole.repo");
const productHistoryRepo = require("../repositories/ProductHistory.repo");
const productHistoryPojo = require("../pojo/ProductHistory.pojo");

exports.create = async (req, res) => {
  try {
    let store = storeInfoPojo.create;
    let person = personInfoPojo.create;
    store.name = req.body.name;
    person.firstname = req.body.firstname;
    person.lastname = req.body.lastname;
    person.phone_number = req.body.phone_number;
    const sf = await storeInformationRepo.create(store);
    if (sf != null) {
      const pf = await personalInformationRepo.create(person);
      sf.setPersonalInformation(pf);
    }
    res.json({
      message: "OK",
      dataValues: sf,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.createStoreAndItems = async (req, res) => {
  try {
    const mock = req.body;
    let store = storeInfoPojo.create;
    let person = personInfoPojo.create;
    store.name = mock.name;
    person.firstname = mock.firstname;
    person.lastname = mock.lastname;
    person.phone_number = mock.phone_number;
    const sf = await storeInformationRepo.create(store);
    const tr = await tradingRoleRepo.findByName(mock.role);
    if (sf != null) {
      const pf = await personalInformationRepo.create(person);
      sf.setPersonalInformation(pf);
      let dataItem = mock.dataValues;
      if (dataItem.length != 0) {
        let trad = tradingOrdersPojo.create;
        const to = await tradingOrdersRepo.create(trad);
        to.setTradingRole(tr);
        let price = 0;
        price = await Promise.all(
          dataItem.map(async (element) => {
            price += element.price;
            const pg = await productGroupRepo.findByName(element.group);
            const wr = await warehouseRepo.create(element.warehouse);
            wr.setProductGroup(pg);
            wr.setStoreInformation(sf);
            let product = productHistoryPojo.create;
            product.old_value = 0;
            product.price = element.price;
            product.value = element.warehouse.value;
            const ph = await productHistoryRepo.create(product);
            ph.setTradingOrders(to);
            ph.setWarehouse(wr);
            return price;
          })
        );
        to.price = price[0];
        to.setStoreInformation(sf);
        await to.save();
      }
      res.json({
        message: "OK",
      });
    } else {
      const sf = await storeInformationRepo.findByName(store.name);
      const pf = await personalInformationRepo.create(person);
      sf.setPersonalInformation(pf);
      let dataItem = mock.dataValues;
      if (dataItem.length != 0) {
        let trad = tradingOrdersPojo.create;
        const to = await tradingOrdersRepo.create(trad);
        to.setTradingRole(tr);
        let price = 0;
        price = await Promise.all(
          dataItem.map(async (element) => {
            price += element.price;
            const pg = await productGroupRepo.findByName(element.group);
            const wr = await warehouseRepo.create(element.warehouse);
            wr.setProductGroup(pg);
            wr.setStoreInformation(sf);
            let product = productHistoryPojo.create;
            product.old_value = 0;
            product.price = element.price;
            product.value = element.warehouse.value;
            const ph = await productHistoryRepo.create(product);
            ph.setTradingOrders(to);
            ph.setWarehouse(wr);
            return price;
          })
        );
        to.price = price[0];
        to.setStoreInformation(sf);
        await to.save();
      }
      res.json({
        message: "OK",
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  try {
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.findAllShope = async (req, res) => {
  try {
    const values = await storeInformationRepo.findAll();
    res.json({
      message: "OK",
      dataValues: values,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.findByPk = async (req, res) => {
  try {
    const id = req.params["id"];
    const values = await storeInformationRepo.findById(id);
    res.json({
      message: "OK",
      dataValues: values,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.fundByName = async (req, res) => {
  try {
    const name = req.params["name"];
    const values = await storeInformationRepo.findByName(name);
    res.json({
      message: "OK",
      dataValues: values,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.deleteShope = async (req, res) => {
  try {
    const id = req.params["id"];
    const storeInformation = await storeInformationRepo.findById(id);
    await storeInformation.destroy();
    res.json({
      message: "OK",
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
