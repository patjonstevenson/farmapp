const express = require('express');
const router = express.Router();

const idMiddleware = require('./validate-id-middleware');

const User = require('./users-model');
const Farm = require('../farms/farms-model');

const farmHelpers = require('../farms/farms-helpers');

router.get('/:id', idMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const userInfo = await User.findById(id);
        const farms = await Farm.getFarmInfoByUser(id);
        if (farms.error) {
            res.status(500).json({ message: "Error processing farm data.", error: farms.error });
        } else {
            res.status(200).json({ ...userInfo, farms });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/:id\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

router.get('/:id/farms', idMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const farms = await Farm.findFarmsByUser(id);
        if (farms.error) {
            res.status(500).json({ message: "Error processing farm data.", error: farms.error });
        } else {
            res.status(200).json({ farms });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/:id/farms\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

router.get('/:id/farms/:farm_id', idMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const farms = await Farm.findFarmsBy({ id: farm_id });
        if (farms.error) {
            res.status(500).json({ message: "Error processing farm data.", error: farms.error });
        } else {
            res.status(200).json({ farms });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/:id/farms/:farm_id\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

router.post('/:id/farms', idMiddleware, async (req, res) => {
    const { id } = req.params;
    const farm = req.body;
    try {
        const new_id = await Farm.addFarm({ ...farm, user_id: id });
        if (new_id.error) {
            res.status(400).json({ message: 'Error adding farm.', error: new_id.error });
        } else {
            const newFarm = await Farm.findFarmsBy({ id: new_id });
            res.status(200).json({ newFarm });
        }
    } catch (error) {
        console.log(`\n\nERROR in POST to /users/:id/farms\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

router.put('/:id/farms/:farm_id', idMiddleware, async (req, res) => {
    const { farm_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Farm.updateFarm(changes, farm_id);
        if (num_changed.error || num_changed == 0) {
            res.status(400).json({ message: 'Error adding farm.', error: new_id.error });
        } else {
            const udpatedFarm = await Farm.findFarmsBy({ id: farm_id });
            res.status(200).json({ updatedFarm });
        }
    } catch (error) {
        console.log(`\n\nERROR in POST to /users/:id/farms\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});