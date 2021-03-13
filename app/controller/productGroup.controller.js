// ********************************************************** //
// *********** product group Controller Of App ************** //
// ********************************************************** //

const productGroupRepo = require("../repositories/promotionGroup.repo");

exports.findAll = async (req, res) => {
  try {
    const items = await productGroupRepo.findAll();
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
