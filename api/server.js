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
const pumpsRouter = require("../resources/pumps/pumps-router");
const valvesRouter = require("../resources/valves/valves-router");
const strategiesRouter = require("../resources/strategies/strategies-router");

// Custom Middleware
const authMiddleware = require("../auth/authenticate-middleware");
const idMiddleware = require("../auth/validate-id-middleware");
const loggerMiddleware = require("./logger-middleware");

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

server.use(loggerMiddleware);


// server.use(requestParamsMiddleware);
// Going to get rid of requestParamsMiddleware (bc stupid),
// so I will need to change anywhere that gets an id from req.body.params
// Also need to change, I think idMiddleware, to not put id in req.body

//// OLD
// server.use("/api/users/:user_id/farms/:farm_id/pumps/", testMiddleware, authMiddleware, idMiddleware, pumpsRouter);
// server.use("/api/users/:user_id/farms", requestParamsMiddleware, testMiddleware, authMiddleware, idMiddleware, farmsRouter);
// server.use("/api/users/:user_id/strategies", requestParamsMiddleware, authMiddleware, idMiddleware, strategiesRouter)
// server.use("/api/users/:user_id", requestParamsMiddleware, authMiddleware, idMiddleware, usersRouter);

/*
    URL => Router
    -------------
    /api/users/ => usersRouter
    /api/pumps/ => pumpsRouter
    /api/farms/ => farmRouter
    /api/strategies/ => strategiesRouter
*/

// ROUTES
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/farms", farmsRouter);
server.use("/api/pumps", pumpsRouter);
server.use("/api/valves", valvesRouter);
server.use("/api/strategies", strategiesRouter);
// server.use("/api/tactics", tacticsRouter);

// =============================================

// Sanity Check
server.get('/', (req, res) => {
    res.status(200).json(`Server is up!`);
});

// Export
module.exports = server;