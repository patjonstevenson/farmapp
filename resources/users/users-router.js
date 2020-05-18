const express = require('express');
const router = express.Router();

const idMiddleware = require('./validate-id-middleware');

const User = require('./users-model');
const Farm = require('../farms/farms-model');

const farmHelpers = require('../farms/farms-helpers');

// USER
router.get('/', async (req, res) => {
    const { id } = req.body.params;
    try {
        const userInfo = await User.findById(id);
        const farms = await Farm.getFarmInfoByUser(id);
        if (farms.error) {
            console.log(`\n\nERROR in GET to /users/${req.body.params.id}\n${farms.error}`);
            res.status(500).json({ message: "Error processing farm data.", error: farms.error });
        } else {
            res.status(200).json({ ...userInfo, farms });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

// FARMS

// PUMPS

// Valves

module.exports = router;