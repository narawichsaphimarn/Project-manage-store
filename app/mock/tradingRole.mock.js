const tradingRoleRepo = require("../repositories/tradingRole.repo")

module.exports = (db) => {
    try {
        createTradingRole = (mock) => {
            tradingRoleRepo.create(mock)
        }

        createTradingRole({
            name: "BUY"
        })
        createTradingRole({
            name: "SELL"
        })
    } catch (error) {
        console.error(error);
    }
}