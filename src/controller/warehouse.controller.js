// ********************************************************** //
// *********** Shop Items Controller Of App ***************** //
// ********************************************************** //

const storeInformationRepo = require("../repositories/storeInformation.repo");
const warehouseRepo = require("../repositories/warehouse.repo");
const warehousePojo = require("../pojo/warehouse.pojo");
const productGroupRepo = require("../repositories/promotionGroup.repo");
const tradingOrdersRepo = require("./tradingOrders.controller");
const personalInformationRepo = require("../repositories/personalInformation.repo");

exports.create = async (req, res) => {
  try {
    const merchantId = await storeInformationRepo.findById(req.body.id);
    if (merchantId != null) {
      const dataWarehouse = req.body.dataValues;
      dataWarehouse.map(async (item) => {
        let form = warehousePojo.create;
        const group = await productGroupRepo.findByNameOrCreateRole(item.group);
        form = item.dataValues;
        const wh = await warehouseRepo.create(form);
        wh.setStoreInformation(merchantId);
        wh.setProductGroup(group);
      });
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "Fail ID wrong!",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  let image = "";
  try {
    image = req.file.path;
  } catch (error) {
    image = "";
  }
  let data = JSON.parse(req.body.dataValues);
  data.image = image;
  try {
    const wh = await warehouseRepo.update(data, req.body.shop_item_id);
    const whData = await warehouseRepo.findByPk(req.body.shop_item_id);
    if (whData != null) {
      const siData = await storeInformationRepo.findById(whData.fk_store_informationid);
      if (siData != null) {
        const si = await storeInformationRepo.update({ name: req.body.dataValues.si_name }, siData.uuid);
        siData.setPersonalInformation(req.body.merchant_id);
        siData.save();
        if (si === 0) {
          res.json({
            message: "Fail Name is Duplicate",
            dataValues: [],
          });
        }
        // req.body.dataValues.image = image;
        // await personalInformationRepo.update(req.body.dataValues, siData.fk_personal_informationid);
      }
    }
    res.json({
      message: "OK",
      dataValues: wh,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.delete = async (req, res) => {
  try {
    const shop_item_id = req.params["id"];
    const items = await warehouseRepo.findByPk(shop_item_id);
    await items.destroy();
    res.json({
      message: "OK",
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params["id"];
    const items = await warehouseRepo.findById(id);
    res.json({
      message: "OK",
      dataValues: items,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.findAll = async (req, res) => {
  try {
    const items = await warehouseRepo.findAll();
    res.json({
      message: "OK",
      dataValues: items,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.findAllByProductGroupId = async (req, res) => {
  try {
    const id = req.params["id"];
    const items = await warehouseRepo.findProductGroupId(id);
    res.json({
      message: "OK",
      dataValues: items,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
