// ********************************************************** //
// ******** Mockup act_member data Of App ******************* //
// ********************************************************** //

module.exports = async (db) => {
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
      password: mock.password,
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
    firstname: "Employees",
    lastname: "Employees",
    phoneNumber: "22222222222",
    userId: "33333333333",
    username: "employees",
    password: "employees",
    merchantName: null,
    roleName: "Employees",
  });
};
