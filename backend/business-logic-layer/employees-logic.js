require("../data-access-layer/dal");
const EmployeeModel = require("../models/employee-model");
const cryptoHelper = require("../helpers/crypto-helper");


function getAllEmployeesAsync() {
    return EmployeeModel.find().exec();
}

function addEmployeeAsync(employeeToAdd) {

    //reset all for security reasons:
    employeeToAdd.role = "employee";
    employeeToAdd.totalHours = 0;
    employeeToAdd.totalSessions = 0;

    //hash password:
    employeeToAdd.password = cryptoHelper.hash(employeeToAdd.password);

    return employeeToAdd.save();
}

function addWorkHoursAndSessionAsync(employeeToUpdate, _id) {
    //add the hours and 1 session:
    return EmployeeModel.updateOne({ _id }, {
        totalHours: employeeToUpdate.totalHours,
        totalSessions: employeeToUpdate.totalSessions
    }).exec();
}

function startOrStopWorking(_id, isWorking) {
    EmployeeModel.updateOne({ _id }, {
        isWorking: !isWorking
    }).exec();
    return !isWorking;
}

module.exports = {
    getAllEmployeesAsync,
    addEmployeeAsync,
    addWorkHoursAndSessionAsync,
    startOrStopWorking
}