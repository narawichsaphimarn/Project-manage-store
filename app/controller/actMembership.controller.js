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
    actValues.user_id = req.body.user_id;
    actValues.username = req.body.username;
    actValues.password = req.body.password;
    personValues.firstname = req.body.firstname;
    personValues.lastname = req.body.lastname;
    personValues.phone_number = req.body.phone_number;
    const member = await actMembershipRepo.create(actValues);
    if (member != null) {
      const role = await roleRepo.findByNameOrCreateRole(req.body.role_name);
      const info = await personalInformationRepo.create(personValues);
      member.setRole(role);
      member.setPersonalInformation(info);
      res.json({
        message: "OK"
      });
    } else {
      res.json({
        message: "FAIL"
      });
    }
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error
    });
  }
};

exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (username != null && password != null) {
      const actData = await actMembershipRepo.login(username.toString(), password.toString());
      res.json({
        message: "OK",
        dataValues: actData
      });
    } else {
      res.json({
        message: "FAIL",
        error: "User incorect!"
      });
    }
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error
    });
  }
};

exports.findAllById = async (req, res) => {
  try {
    const act_member_id = req.params["id"];
    const role = await roleRepo.queryRoleById(act_member_id);
    if (role != null) {
      switch (role.role) {
        case "Admin":
          const dataAdmin = await actMembershipRepo.findByIdAndNotMe(
            act_member_id
          );
          res.json({
            message: "OK",
            dataValues: dataAdmin
          });
          break;
        case "Employees":
          const role = await roleRepo.queryRoleByName("Admin");
          const dataEmp = await actMembershipRepo.findAllByIdNotUUIDAndNotAdmin(
            act_member_id,
            role.uuid
          );
          res.json({
            message: "OK",
            dataValues: dataEmp
          });
          break;
        default:
          const dataOth = await actMembershipRepo.findById(act_member_id);
          res.json({
            message: "OK",
            dataValues: dataOth
          });
          break;
      }
    } else {
      res.json({
        message: "FAIL",
        error: "User not match!"
      });
    }
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error
    });
  }
};

exports.findDataUser = async (req, res) => {
  try {
    const act_member_id = req.params["id"];
    const actMemberData = await actMembershipRepo.findById(act_member_id);
    if (actMemberData != null) {
      res.json({
        message: "OK",
        dataValues: actMemberData
      });
    } else {
      res.json({
        message: "FAIL"
      });
    }
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error
    });
  }
};

exports.updateDataActMember = async (req, res) => {
  try {
    const act_id = req.body.act_member_id;
    const _actData = req.body.dataValues;
    const actMemberData = await actMembershipRepo.findById(act_id);
    const personSata = await personalInformationRepo.findById(
      actMemberData.fk_personal_informationid
    );
    if (actMemberData != null && _actData != null && personSata != null) {
      personSata.firstname = logicTools.checkisData(_actData.firstname)
        ? _actData.firstname
        : personSata.firstname;

      personSata.lastname = logicTools.checkisData(_actData.lastname)
        ? _actData.lastname
        : personSata.lastname;

      personSata.phone_number = logicTools.checkisData(_actData.phoneNumber)
        ? _actData.phoneNumber
        : personSata.phone_number;

      actMemberData.user_id = logicTools.checkisData(_actData.userId)
        ? _actData.userId
        : actMemberData.user_id;

      actMemberData.username = logicTools.checkisData(_actData.username)
        ? _actData.username
        : actMemberData.username;

      actMemberData.password = logicTools.checkisData(_actData.password)
        ? _actData.password
        : actMemberData.password;

      await actMemberData.save();
      await personSata.save();
      res.json({
        message: "OK"
      });
    } else {
      res.json({
        message: "FAIL",
        error: "User not match!"
      });
    }
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error
    });
  }
};

exports.deleteActMember = async (req, res) => {
  try {
    const act_id = req.params["id"];
    const actMemberData = await actMembershipRepo.findById(act_id);
    const data = actMemberData.dataValues;
    await data.destroy();
    res.json({
      message: "OK"
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const act_member_id = req.body.act_member_id;
    const role_id = req.body.role_id;
    const actMemberData = await actMembershipRepo.findById(act_member_id);
    const roleData = await roleRepo.findById(role_id);
    await actMemberData.setRole(roleData);
    await actMemberData.save();
    res.json({
      message: "OK"
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error
    });
  }
};

exports.findDataByUserName = async (req, res) => {
  try {
    const username = req.params["user"];
    const actMemberData = await actMembershipRepo.findByUserName(username);
    res.json({
      message: "OK",
      dataValues: actMemberData
    });
  } catch (error) {
    res.json({
      message: "FAIL",
      error: error
    });
  }
};
