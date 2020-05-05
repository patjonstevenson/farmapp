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
const usersRouter = require("../users/users-router");
const farmsRouter = require("../farms/farms-router");
const pumpsRouter = require("../pumps/pumps-router.js");
const strategiesRouter = require("../strategies/strategies-router");

// Custom Middleware
const authMiddleware = require("../auth/authenticate-middleware");
const idMiddleware = require("../users/validate-id-middleware");

// =============================================
// SERVER CREATION AND CONFIGURATION

// Create Server
const express = require("express");
const server = express();

// Apply Global Middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

// Assignment of routers and middleware to routes
server.use("/api/auth", authRouter);
server.use("/api/users", authMiddleware, usersRouter);
server.use("/api/users/:id/farms", authMiddleware, idMiddleware, farmsRouter);
server.use("/api/users/:id/farms/:farm_id/pumps", authMiddleware, idMiddleware, pumpsRouter);
server.use("/api/users/:id/strategies", authMiddleware, idMiddleware, strategiesRouter)

// =============================================

// Sanity Check
server.get('/', (req, res) => {
    res.status(200).json(`Server is up!`);
});

// Export
module.exports = server;