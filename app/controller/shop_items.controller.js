// ********************************************************** //
// *********** Shop Items Controller Of App ***************** //
// ********************************************************** //

const merchantRepo = require("../repositories/merchant.repo");
const shopItemsRepo = require("../repositories/shop_items.repo");
const shopePojo = require("../pojo/item.pojo");
const logicTools = require("../tools/logic.tools");

exports.createItems = async (req, res) => {
  try {
    const merchant_id = req.body.merchant_id;
    const merchant = await merchantRepo.findByPk(merchant_id);
    let _merchant = merchant.dataValues;
    const items = req.body.dataValues;
    if (_merchant != null) {
      items.map(async (item, index) => {
        let itemPojo = shopePojo.shope_item_shope;
        itemPojo = item;
        const shopItems = await shopItemsRepo.queryCreate(itemPojo);
        shopItems.setMerchant(_merchant);
        await shopItems.reload();
      });
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "Can not connect Shop",
      });
    }
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.updateItems = async (req, res) => {
  try {
    const shop_item_id = req.body.shop_item_id;
    const shopItemsData = await shopItemsRepo.queryByPk(shop_item_id);
    let itemPojo = shopePojo.shope_item_shope;
    itemPojo = req.body.dataValues;
    shopItemsData.item_name = logicTools.checkisData(itemPojo.item_name)
      ? itemPojo.item_name
      : shopItemsData.item_name;
    shopItemsData.item_value = logicTools.checkisData(itemPojo.item_value)
      ? itemPojo.item_value
      : shopItemsData.item_value;
    shopItemsData.item_price = logicTools.checkisData(itemPojo.item_price)
      ? itemPojo.item_price
      : shopItemsData.item_price;
    shopItemsData.item_img = logicTools.checkisData(itemPojo.item_img)
      ? itemPojo.item_img
      : shopItemsData.item_img;
    shopItemsData.item_desc = logicTools.checkisData(itemPojo.item_desc)
      ? itemPojo.item_desc
      : shopItemsData.item_desc;
    await shopItemsData.save();
    await shopItemsData.reload();
    res.json({
      message: "OK",
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.deleteItems = async (req, res) => {
  try {
    const shop_item_id = req.params["id"];
    const items = await shopItemsRepo.queryByPk(shop_item_id);
    await items.destroy();
    res.json({
      message: "OK",
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.findShopeItems = async (req, res) => {
  try {
    const merchant_id = req.params["id"];
    const items = await shopItemsRepo.queryByMerchantId(merchant_id);
    res.json({
      message: "OK",
      dataValues: items,
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.findOneItems = async (req, res) => {
  try {
    const shop_item_id = req.params["id"];
    const items = await shopItemsRepo.queryByPk(shop_item_id);
    res.json({
      message: "OK",
      dataValues: items,
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};
