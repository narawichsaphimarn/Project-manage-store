// ********************************************************** //
// *********** act_member Controller Of App ***************** //
// ********************************************************** //

const logicTools = require("../tools/logic.tools");
const roleRepo = require("../repositories/role.repo");
const actMembershipRepo = require("../repositories/actMembership.repo");
const personalInformationRepo = require("../repositories/personalInformation.repo");
const actMembershipPojo = require("../pojo/actMembership.pojo");
const personPojo = require("../pojo/person.pojo");

// **
// Fuction creact member
// none role
// none merchant
// **
exports.create = async (req, res) => {
  try {
    let actValues = actMembershipPojo.create;
    let personValues = personPojo.create;
    if (req.body.username !== null || req.body.password !== null) {
      actValues.id = req.body.id;
      actValues.username = req.body.username;
      actValues.password = req.body.password;
      personValues.firstname = req.body.firstname;
      personValues.lastname = req.body.lastname;
      personValues.phone_number = req.body.phone_number;
      personValues.age = req.body.age;
      personValues.address = req.body.address;
      personValues.email = req.body.email;
      const member = await actMembershipRepo.create(actValues);
      if (member != null) {
        const role = await roleRepo.findByNameOrCreateRole(req.body.role_name);
        const info = await personalInformationRepo.create(personValues);
        member.setRole(role);
        member.setPersonalInformation(info);
        res.json({
          message: "OK",
        });
      } else {
        res.json({
          message: "FAIL",
        });
      }
    } else {
      res.json({
        message: "FAIL Username or Password is null",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.login = async (req, res) => {
  try {
    if (req.body.username !== null || req.body.password !== null) {
      const username = req.body.username;
      const password = req.body.password;
      if (username != null && password != null) {
        const actData = await actMembershipRepo.login(username.toString(), password.toString());
        if (actData != null) {
          res.json({
            message: "OK",
            dataValues: actData,
          });
        } else {
          res.sendStatus(403);
        }
      } else {
        res.sendStatus(403);
      }
    } else {
      res.json({
        message: "FAIL Username or Password is null",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.findAllById = async (req, res) => {
  try {
    const act_member_id = req.params["id"];
    const act = await actMembershipRepo.findByPk(act_member_id);
    if (act != null) {
      const role = await roleRepo.findById(act.fk_roleid);
      if (role != null) {
        switch (role.name) {
          case "Admin":
            const dataAdmin = await actMembershipRepo.findByIdAndNotMe(act_member_id);
            res.json({
              message: "OK",
              dataValues: dataAdmin,
            });
            break;
          case "Employees":
            const role = await roleRepo.findByName("Admin");
            const dataEmp = await actMembershipRepo.findAllByIdNotUUIDAndNotAdmin(act_member_id, role.uuid);
            res.json({
              message: "OK",
              dataValues: dataEmp,
            });
            break;
          default:
            const dataOth = await actMembershipRepo.findById(act_member_id);
            res.json({
              message: "OK",
              dataValues: dataOth,
            });
            break;
        }
      } else {
        res.json({
          message: "FAIL",
          error: "User not match!",
        });
      }
    } else {
      res.json({
        message: "FAIL",
        error: "Have not ID!",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.findDataUser = async (req, res) => {
  try {
    const act_member_id = req.params["id"];
    const actMemberData = await actMembershipRepo.findById(act_member_id);
    if (actMemberData != null) {
      res.json({
        message: "OK",
        dataValues: actMemberData,
      });
    } else {
      res.json({
        message: "FAIL",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.updateDataActMember = async (req, res) => {
  try {
    const act_id = req.body.act_member_id;
    const _actData = req.body.dataValues;
    const actMemberData = await actMembershipRepo.findByPk(act_id);
    const personSata = await personalInformationRepo.findById(actMemberData.fk_personal_informationid);
    if (actMemberData != null && _actData != null && personSata != null) {
      personSata.firstname = logicTools.checkisData(_actData.firstname) ? _actData.firstname : personSata.firstname;

      personSata.lastname = logicTools.checkisData(_actData.lastname) ? _actData.lastname : personSata.lastname;

      personSata.phone_number = logicTools.checkisData(_actData.phoneNumber) ? _actData.phoneNumber : personSata.phone_number;

      personSata.email = logicTools.checkisData(_actData.email) ? _actData.email : personSata.email;

      personSata.address = logicTools.checkisData(_actData.address) ? _actData.address : personSata.address;

      personSata.age = logicTools.checkisData(_actData.age) ? _actData.age : personSata.age;

      actMemberData.id = logicTools.checkisData(_actData.userId) ? _actData.userId : actMemberData.id;

      actMemberData.username = logicTools.checkisData(_actData.username) ? _actData.username : actMemberData.username;

      actMemberData.password = logicTools.checkisData(_actData.password) ? _actData.password : actMemberData.password;

      await actMemberData.save();
      await personSata.save();
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "FAIL",
        error: "User not match!",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.deleteActMember = async (req, res) => {
  try {
    const act_id = req.params["id"];
    const actMemberData = await actMembershipRepo.findById(act_id);
    await actMemberData.destroy();
    res.json({
      message: "OK",
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.updateRole = async (req, res) => {
  try {
    const act_member_id = req.body.act_member_id;
    const role_id = req.body.role_id;
    if (role_id != null) {
      const actMemberData = await actMembershipRepo.findById(act_member_id);
      const roleData = await roleRepo.findById(role_id);
      await actMemberData.setRole(roleData);
      await actMemberData.save();
      res.json({
        message: "OK",
      });
    } else {
      res.json({
        message: "Fail No data",
      });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.findDataByUserName = async (req, res) => {
  try {
    const username = req.params["user"];
    const actMemberData = await actMembershipRepo.findByUserName(username);
    res.json({
      message: "OK",
      dataValues: actMemberData,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
