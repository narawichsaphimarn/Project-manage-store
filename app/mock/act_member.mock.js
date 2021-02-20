// ********************************************************** //
// ******** Mockup act_member data Of App ******************* //
// ********************************************************** //
const tools = require("../tools/crypto.tools");

module.exports = async (db) => {
  try {
    const Actmember = db.act_member;
    const Role = db.role;
    const Merchant = db.merchant;

    mockCreate = (mock) => {
      var member;
      Actmember.create({
        firstname: mock.firstname,
        lastname: mock.lastname,
        phone_number: mock.phoneNumber,
        user_id: mock.userId,
        username: mock.username,
        password: tools.hashCode(mock.password),
      })
        .then((createActMember) => {
          member = createActMember;
          if (mock.merchantName != null && mock.roleName === "Merchant") {
            Merchant.create({
              merchant_name: mock.merchantName,
            }).then((_merchant) => {
              member.setMerchant(_merchant);
            });
          }

          Role.findOne({
            where: { role_name: mock.roleName },
          }).then((_role) => {
            member.setRole(_role);
          });
        })
        .catch((err) => {
          console.err(err);
        });
    };

    mockCreate({
      firstname: "Admin",
      lastname: "Admin",
      phoneNumber: "0000000000",
      userId: "111111111",
      username: "admin",
      password: "admin",
      merchantName: null,
      roleName: "Admin",
    });

    mockCreate({
      firstname: "Admin2",
      lastname: "Admin2",
      phoneNumber: "0000000000",
      userId: "111111111",
      username: "admin2",
      password: "admin2",
      merchantName: null,
      roleName: "Admin",
    });

    mockCreate({
      firstname: "Admin3",
      lastname: "Admin3",
      phoneNumber: "0000000000",
      userId: "111111111",
      username: "admin3",
      password: "admin3",
      merchantName: null,
      roleName: "Admin",
    });

    mockCreate({
      firstname: "Narawich",
      lastname: "Saphimarn",
      phoneNumber: "0618938497",
      userId: "B5909711",
      username: "naras",
      password: "naras",
      merchantName: "Shop online",
      roleName: "Merchant",
    });

    mockCreate({
      firstname: "Narawich2",
      lastname: "Saphimarn2",
      phoneNumber: "0618938497",
      userId: "B5909711",
      username: "naras2",
      password: "naras2",
      merchantName: "Shop online2",
      roleName: "Merchant",
    });

    mockCreate({
      firstname: "Narawich3",
      lastname: "Saphimarn3",
      phoneNumber: "0618938497",
      userId: "B5909711",
      username: "naras3",
      password: "naras3",
      merchantName: "Shop online3",
      roleName: "Merchant",
    });

    mockCreate({
      firstname: "Employees",
      lastname: "Employees",
      phoneNumber: "22222222222",
      userId: "33333333333",
      username: "employees",
      password: "employees",
      merchantName: null,
      roleName: "Employees",
    });

    mockCreate({
      firstname: "Employees2",
      lastname: "Employees2",
      phoneNumber: "22222222222",
      userId: "33333333333",
      username: "employees2",
      password: "employees2",
      merchantName: null,
      roleName: "Employees",
    });

    mockCreate({
      firstname: "Employees3",
      lastname: "Employees3",
      phoneNumber: "22222222222",
      userId: "33333333333",
      username: "employees3",
      password: "employees3",
      merchantName: null,
      roleName: "Employees",
    });
  } catch (error) {
    console.error(error);
  }
};
