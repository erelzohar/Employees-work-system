const logic = require("../business-logic-layer/employees-logic");
const EmployeeModel = require("../models/employee-model");
const errorsHelper = require("../helpers/errors-helper");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        let employees = await logic.getAllEmployeesAsync();

        //filter out the employer so he wont return to the frontend:
        employees = employees.filter((e) => e.role === "employee");

        return res.json(employees);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

router.post("/", verifyAdmin, async (req, res) => {
    try {
        const newEmployee = new EmployeeModel(req.body);
        const errors = newEmployee.validateSync();
        if (errors) res.status(400).json(errors.message);
        const addedEmployee = await logic.addEmployeeAsync(newEmployee);
        return res.json(addedEmployee);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

router.put("/add-hours/:_id", async (req, res) => {
    try {
        const employeeToUpdate = req.body;
        const updatedEmployee = await logic.addWorkHoursAndSessionAsync(employeeToUpdate, req.params._id);
        res.json(updatedEmployee);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});

router.put("/is-working/:_id", verifyLoggedIn, async (req, res) => {
    try {
        const isWorking = await logic.startOrStopWorking(req.params._id, req.body.isWorking);
        res.json(isWorking);
    }
    catch (err) {
        res.status(500).json(errorsHelper.getError(err));
    }
});


module.exports = router;