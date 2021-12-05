//on production use config-prod - on development use config-dev (there are no differences right now)
global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");

const express = require("express");
const cookie = require("cookie-parser"); 
const expressRateLimit = require("express-rate-limit");
const sanitize = require("./middleware/sanitize");
const cors = require("cors");
const authController = require("./controllers-layer/auth-controller");
const employeesController = require("./controllers-layer/employees-controller");

//initialize new express app:
const server = express();

// DOS Attack protection:
server.use("/api", expressRateLimit({
    windowMs: 1000, // 1 second
    max: 10, // limit each IP to 10 requests per windowMs
    message: "Are You a Hacker?" 
}));

// Enable cookies: 
server.use(cookie());

// XSS attack protection:
server.use(sanitize);

//allow cors access
server.use(cors({origin:"*"}));

server.use(express.json());

server.use("/api/auth",authController);
server.use("/api/employees",employeesController);

const port = process.env.PORT || 3001;
server.listen(port, () => console.log("Listening..."));