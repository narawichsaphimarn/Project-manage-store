const db = require("../config/db.config");

const actMembership = db.actMembership;
const role = db.role;
const storeInformation = db.storeInformation;
const warehouse = db.warehouse;
const promotion = db.promotion;
const tradingOrders = db.tradingOrders;
const productHistory = db.productHistory;
const personalInformation = db.personalInformation;
const tradingRole = db.tradingRole;

exports.create = (actValues) => {
    let response;
    try {
        response = personalInformation.create(actValues)
            .then((createActMember) => {
                return createActMember;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
    } catch (error) {
        console.error(error);
        response = null;
    }
    return response;
};

exports.findAll = () => {
    let response;
    try {
        response = personalInformation.findAll()
            .then((value) => {
                return value
            })
            .catch((error) => {
                console.error(error);
                return null
            });
    } catch (error) {
        console.error(error);
        response = error;
    }
    return response;
};

exports.findById = (id) => {
    let response;
    try {
        response = personalInformation.findByPk(id)
            .then((value) => {
                return value
            })
            .catch((error) => {
                console.error(error);
                return null
            });
    } catch (error) {
        console.error(error);
        response = error;
    }
    return response;
};

exports.findByName = (name) => {
    let response;
    try {
        response = personalInformation.findOne({
                where: {
                    name: name
                }
            })
            .then((value) => {
                return value
            })
            .catch((error) => {
                console.error(error);
                return null
            });
    } catch (error) {
        console.error(error);
        response = error;
    }
    return response;
};