// ********************************************************** //
// *********** Merchant Controller Of App ******************* //
// ********************************************************** //

const storeInformationRepo = require("../repositories/storeInformation.repo");
const personalInformationRepo = require("../repositories/personalInformation.repo");
const logicTools = require("../tools/logic.tools");

exports.create = async (req, res) => {
  try {
    let store = storeInfoPojo.create;
    let person = personInfoPojo.create;
    store.name = mock.name;
    person.firstname = mock.firstname;
    person.lastname = mock.lastname;
    person.phone_number = mock.phone_number;
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
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  try {
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error,
    });
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
    res.json({
      message: "FAIL",
      error: error,
    });
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
    res.json({
      message: "FAIL",
      error: err,
    });
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
    res.json({
      message: "FAIL",
      error: error,
    });
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
    res.json({
      message: "FAIL",
      error: error,
    });
  }
};
