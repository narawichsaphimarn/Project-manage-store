// ********************************************************** //
// ******** Mockup act_member data Of App ******************* //
// ********************************************************** //

const roleRepo = require("../repositories/role.repo");
const actMembershipRepo = require("../repositories/actMembership.repo");
const personalInformationRepo = require("../repositories/personalInformation.repo");
const actMembershipPojo = require("../pojo/actMembership.pojo");
const personPojo = require("../pojo/person.pojo");

module.exports = async (db) => {
  try {
    mockCreate = async (mock) => {
      let actMembership = actMembershipPojo.create;
      let person = personPojo.create;
      actMembership.password = mock.password;
      actMembership.username = mock.username;
      actMembership.id = mock.id;
      person.firstname = mock.firstname;
      person.lastname = mock.lastname;
      person.phone_number = mock.phone_number;
      person.age = mock.age;
      person.address = mock.address;
      person.email = mock.email;
      const member = await actMembershipRepo.create(actMembership);
      if (member != null) {
        const role = await roleRepo.findByNameOrCreateRole(mock.roleName);
        const info = await personalInformationRepo.create(person);

        member.setRole(role);
        member.setPersonalInformation(info);
      }
    };

    await mockCreate({
      firstname: "Admin",
      lastname: "Admin",
      lastname: "Admin",
      age: "50",
      address: "-",
      phone_number: "0000000000",
      id: "111111111",
      username: "admin",
      password: "admin",
      roleName: "Admin",
      email: "-",
    });

    await mockCreate({
      firstname: "Admin2",
      lastname: "Admin2",
      age: "50",
      address: "-",
      phone_number: "0000000000",
      id: "111111111",
      username: "admin2",
      password: "admin2",
      roleName: "Admin",
      email: "-",
    });

    await mockCreate({
      firstname: "Admin3",
      lastname: "Admin3",
      age: "50",
      address: "-",
      phone_number: "0000000000",
      id: "111111111",
      username: "admin3",
      password: "admin3",
      roleName: "Admin",
      email: "-",
    });

    await mockCreate({
      firstname: "Employees",
      lastname: "Employees",
      age: "50",
      address: "-",
      phone_number: "22222222222",
      id: "33333333333",
      username: "employees",
      password: "employees",
      roleName: "Employees",
      email: "-",
    });

    await mockCreate({
      firstname: "Employees2",
      lastname: "Employees2",
      age: "50",
      address: "-",
      phone_number: "22222222222",
      id: "33333333333",
      username: "employees2",
      password: "employees2",
      roleName: "Employees",
      email: "-",
    });

    await mockCreate({
      firstname: "Employees3",
      lastname: "Employees3",
      age: "50",
      address: "-",
      phone_number: "22222222222",
      id: "33333333333",
      username: "employees3",
      password: "employees3",
      roleName: "Employees",
      email: "-",
    });
  } catch (error) {
    console.error(error);
  }
};
