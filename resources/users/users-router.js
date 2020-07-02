const express = require('express');
const router = express.Router();

const idMiddleware = require('../../auth/validate-id-middleware');

const User = require('./users-model');
const Farm = require('../farms/farms-model');

const farmHelpers = require('../farms/farms-helpers');

// USER
router.get('/:id', async (req, res) => {
    console.log("req.params in users-router for get to /:id:\n", req.params);
    const { id } = req.params;
    try {
        // const userInfo = await User.findById(id);
        const data = await User.fetchUserResources(id);
        const user = await User.findById(id);
        // const farms = await Farm.getFarmInfoByUser(id);
        if (data.error) {
            console.log(`\n\nERROR in GET to /users/${id}\n${data.error}`);
            res.status(500).json({ message: "Error processing user data.", error: data.error });
        } else {
            res.status(200).json({ ...data, user });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

// FARMS

// PUMPS

// Valves

module.exports = router;