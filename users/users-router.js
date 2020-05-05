const express = require('express');
const router = express.Router();

const idMiddleware = require('./validate-id-middleware');

const User = require('./users-model');
const Farm = require('../farms/farms-model');

const farmHelpers = require('../farms/farms-helpers');

// USER
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
        console.log(`\n\nERROR in GET to /users/${req.params.id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

// FARMS


// PUMPS
router.get('/:id/farms/:farm_id/pumps', idMiddleware, async (req, res) => {
    const { farm_id } = req.params;
    try {
        const pumps = await Farm.findPumpsByFarm(farm_id);
        if (pumps.error) {
            res.status(500).json({ message: "Error processing pump data.", error: farms.error });
        } else {
            res.status(200).json({ pumps });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/farms/${farm_id}/pumps\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.get('/:id/farms/:farm_id/pumps/:pump_id', idMiddleware, async (req, res) => {
    const { id, farm_id, pump_id } = req.params;
    try {
        const pump = await Farm.findPumpById(pump_id);
        if (pump.error) {
            res.status(500).json({ message: "Error processing pump data.", error: pump.error });
        } else {
            res.status(200).json({ pump });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/farms/${req.params.farm_id}/pumps/${pump_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.post('/:id/farms/:farm_id/pumps', idMiddleware, async (req, res) => {
    const { id, farm_id } = req.params;
    const pump = req.body;
    try {
        const new_id = await Farm.addPump({ ...pump, user_id: id, farm_id });
        if (new_id.error) {
            res.status(400).json({ message: 'Error adding pump.', error: new_id.error });
        } else {
            const newPump = await Farm.findPumpsById(new_id);
            res.status(200).json({ newPump });
        }
    } catch (error) {
        console.log(`\n\nERROR in POST to /users/${req.params.id}/farms/${farm_id}/pumps\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.put('/:id/farms/:farm_id/pumps/:pump_id', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Farm.updatePump(changes, pump_id);
        if (num_changed.error || num_changed == 0) {
            res.status(400).json({ message: 'Error updating pump.', error: num_changed });
        } else {
            const updatedPump = await Farm.findPumpId(pump_id);
            res.status(200).json({ updatedPump });
        }
    } catch (error) {
        console.log(`\n\nERROR in PUT to /users/${req.params.id}/farms/${req.params.farm_id}/pumps/${pump_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.delete('/:id/farms/:farm_id/pumps/:pump_id', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    try {
        const deleted = await Farm.deletePump(pump_id);
        if (deleted.error) {
            res.status(400).json({ message: 'Error deleting pump.', error: deleted.error });
        } else {
            // const updatedFarm = await Farm.findFarmsBy({ id: farm_id });
            res.status(200).json({ deleted });
        }
    } catch (error) {
        console.log(`\n\nERROR in DELETE to /users/${req.params.id}/farms/${req.params.farm_id}/pumps/${pump_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

// Valves