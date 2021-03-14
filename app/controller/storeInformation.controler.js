// ********************************************************** //
// *********** Merchant Controller Of App ******************* //
// ********************************************************** //

const storeInformationRepo = require("../repositories/storeInformation.repo");
const personalInformationRepo = require("../repositories/personalInformation.repo");
const storeInfoPojo = require("../pojo/storeInformation.pojo");
const personInfoPojo = require("../pojo/person.pojo");

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
