const authLogic = require("../business-logic-layer/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const EmployeeModel = require("../models/employee-model")
const router = require("express").Router();


router.post("/login", async (req, res) => {
    try {
        const loggedInUser = await authLogic.loginAsync(req.body);
        if (!loggedInUser) return res.status(401).send("Incorrect number or password.");
        res.json(loggedInUser);
    }
    catch (err) {
        res.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;