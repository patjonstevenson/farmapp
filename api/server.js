/********************************
    Server File for Express API
********************************/

// =============================================
// IMPORTS

// Standard Middleware
const helmet = require("helmet");
const cors = require("cors");

// Routers
const authRouter = require("../auth/auth-router");
const usersRouter = require("../resources/users/users-router");
const farmsRouter = require("../resources/farms/farms-router");
const pumpsRouter = require("../resources/pumps/pumps-router.js");
const strategiesRouter = require("../resources/strategies/strategies-router");

// Custom Middleware
const authMiddleware = require("../auth/authenticate-middleware");
const idMiddleware = require("./validate-id-middleware");

const testMiddleware = require("./request-path-middleware");
// Puts params in body
const requestParamsMiddleware = require('./request-params-middleware');

// =============================================
// SERVER CREATION AND CONFIGURATION

// Create Server
const express = require("express");
const server = express();

// Apply Global Middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
// server.use(requestParamsMiddleware);

// Assignment of routers and middleware to routes
server.use("/api/auth", authRouter);

// Going to get rid of requestParamsMiddleware (bc stupid),
// so I will need to change anywhere that gets an id from req.body.params
// Also need to change, I think idMiddleware, to not put id in req.body
server.use("/api/users/:user_id/farms/:farm_id/pumps/", requestParamsMiddleware, testMiddleware, authMiddleware, idMiddleware, pumpsRouter);
server.use("/api/users/:user_id/farms", requestParamsMiddleware, testMiddleware, authMiddleware, idMiddleware, farmsRouter);
server.use("/api/users/:user_id/strategies", requestParamsMiddleware, authMiddleware, idMiddleware, strategiesRouter)
server.use("/api/users/:user_id", requestParamsMiddleware, authMiddleware, idMiddleware, usersRouter);

// =============================================

// Sanity Check
server.get('/', (req, res) => {
    res.status(200).json(`Server is up!`);
});

// Export
module.exports = server;