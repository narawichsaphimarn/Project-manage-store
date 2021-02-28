// ********************************************************** //
// ******** Mockup act_member data Of App ******************* //
// ********************************************************** //

const roleRepo = require("../repositories/role.repo");
const actMembershipRepo = require("../repositories/actMembership.repo");
const personalInformationRepo = require("../repositories/personalInformation.repo")
const actMembershipPojo = require("../pojo/actMembership.pojo");
const personPojo = require("../pojo/person.pojo")

module.exports = async (db) => {
  try {
    mockCreate = async (mock) => {
      let actMembership = actMembershipPojo.create
      let person = personPojo.create
      actMembership.password = mock.password
      actMembership.username = mock.username
      actMembership.user_id = mock.user_id
      person.firstname = mock.firstname
      person.lastname = mock.lastname
      person.phone_number = mock.phone_number
      const member = await actMembershipRepo.create(actMembership)
      if (member != null) {
        const role = await roleRepo.findByNameOrCreateRole(mock.roleName)
        const info = await personalInformationRepo.create(person)

        member.setRole(role)
        member.setPersonalInformation(info)
      }
    };

    await mockCreate({
      firstname: "Admin",
      lastname: "Admin",
      phone_number: "0000000000",
      user_id: "111111111",
      username: "admin",
      password: "admin",
      roleName: "Admin",
    });

    await mockCreate({
      firstname: "Admin2",
      lastname: "Admin2",
      phone_number: "0000000000",
      user_id: "111111111",
      username: "admin2",
      password: "admin2",
      roleName: "Admin",
    });

    await mockCreate({
      firstname: "Admin3",
      lastname: "Admin3",
      phone_number: "0000000000",
      user_id: "111111111",
      username: "admin3",
      password: "admin3",
      roleName: "Admin",
    });

    await mockCreate({
      firstname: "Employees",
      lastname: "Employees",
      phone_number: "22222222222",
      user_id: "33333333333",
      username: "employees",
      password: "employees",
      roleName: "Employees",
    });

    await mockCreate({
      firstname: "Employees2",
      lastname: "Employees2",
      phone_number: "22222222222",
      user_id: "33333333333",
      username: "employees2",
      password: "employees2",
      roleName: "Employees",
    });

    await mockCreate({
      firstname: "Employees3",
      lastname: "Employees3",
      phone_number: "22222222222",
      user_id: "33333333333",
      username: "employees3",
      password: "employees3",
      roleName: "Employees",
    });
  } catch (error) {
    console.error(error);
  }
};