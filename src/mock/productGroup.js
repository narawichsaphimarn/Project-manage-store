// ********************************************************** //
// *********** Mockup group data Of App ********************* //
// ********************************************************** //

const productGroupRepo = require("../repositories/promotionGroup.repo");

module.exports = async (db) => {
  try {
    mockCreate = (mock) => {
      productGroupRepo.create(mock);
    };

    await mockCreate({
      name: "Food",
    });
    await mockCreate({
      name: "Water",
    });
    await mockCreate({
      name: "Candy",
    });
  } catch (error) {
    console.error(error);
  }
};
