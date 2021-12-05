require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");
const EmployeeModel = require("../models/employee-model")

async function loginAsync(credentials) {
    try {
        credentials.password = cryptoHelper.hash(credentials.password);

        const user = await EmployeeModel.findOne({ "phoneNumber": credentials.phoneNumber, "password": credentials.password });
        if (!user) throw new Error("Incorrect number or password");

        // Generate new token:
        if (user) user.token = jwtHelper.getNewToken(user);
        return user;
    }
    catch (err) {
        return null;
    }
}

module.exports = {
    loginAsync
};