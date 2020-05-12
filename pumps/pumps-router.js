const Pump = require("../pumps/pumps-model");

const idMiddleware = require('../users/validate-id-middleware');

const router = require('express').Router();

// PUMPS
router.get('/', async (req, res) => {
    const { farm_id } = req.body.params;
    console.log("FARM ID: ", farm_id);
    console.log("req.body: ", req.body);
    console.log("\nInside pumps-router.js handler for GET to /:id/farms/:farm_id/pumps\n")
    try {
        const pumps = await Pump.findPumpsByFarm(farm_id);
        console.log("PUMPS: ", pumps);
        if (pumps.error) {
            res.status(500).json({ message: "Error processing pump data.", error: farms.error });
        } else {
            res.status(200).json({ pumps });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.body.params.id}/farms/${farm_id}/pumps\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.get('/:pump_id', idMiddleware, async (req, res) => {
    const { id, farm_id, pump_id } = req.body.params;
    try {
        const pump = await Pump.findPumpById(pump_id);
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
router.post('/', idMiddleware, async (req, res) => {
    const { id, farm_id } = req.body.params;
    const pump = req.body;
    console.log("\nREQ BODY: ", req.body);
    try {
        const [new_id] = await Pump.addPump({ name: pump.name, farm_id });
        console.log("\nPUMP CREATION SUCCESS\nnew_id: ", new_id);
        if (new_id.error) {
            res.status(400).json({ message: 'Error adding pump.', error: new_id.error });
        } else {
            const newPump = await Pump.findPumpById(new_id);
            res.status(200).json({ newPump });
        }
    } catch (error) {
        console.log(`\n\nERROR in POST to /users/${req.params.id}/farms/${farm_id}/pumps\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.put('/:pump_id', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Pump.updatePump(changes, pump_id);
        if (num_changed.error || num_changed == 0) {
            res.status(400).json({ message: 'Error updating pump.', error: num_changed });
        } else {
            const updatedPump = await Pump.findPumpById(pump_id);
            res.status(200).json({ updatedPump });
        }
    } catch (error) {
        console.log(`\n\nERROR in PUT to /users/${req.params.id}/farms/${req.params.farm_id}/pumps/${pump_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.delete('/:pump_id', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    try {
        const deleted = await Pump.deletePump(pump_id);
        if (deleted.error) {
            res.status(400).json({ message: 'Error deleting pump.', error: deleted.error });
        } else {
            // const updatedFarm = await Pump.findFarmsBy({ id: farm_id });
            res.status(200).json({ deleted });
        }
    } catch (error) {
        console.log(`\n\nERROR in DELETE to /users/${req.params.id}/farms/${req.params.farm_id}/pumps/${pump_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});


// VALVES
router.get('/:pump_id/valves', idMiddleware, async (req, res) => {
    const { farm_id } = req.params;
    try {
        const pumps = await Pump.findPumpsByFarm(farm_id);
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
router.get('/:pump_id/valves/:valve_id', idMiddleware, async (req, res) => {
    const { id, farm_id, pump_id } = req.params;
    try {
        const pump = await Pump.findPumpById(pump_id);
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
router.post('/:pump_id/valves', idMiddleware, async (req, res) => {
    const { id, farm_id } = req.params;
    const pump = req.body;
    try {
        const new_id = await Pump.addPump({ ...pump, user_id: id, farm_id });
        if (new_id.error) {
            res.status(400).json({ message: 'Error adding pump.', error: new_id.error });
        } else {
            const newPump = await Pump.findPumpById(new_id);
            res.status(200).json({ newPump });
        }
    } catch (error) {
        console.log(`\n\nERROR in POST to /users/${req.params.id}/farms/${farm_id}/pumps\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.put('/:pump_id/valves/:valve_id', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Pump.updatePump(changes, pump_id);
        if (num_changed.error || num_changed == 0) {
            res.status(400).json({ message: 'Error updating pump.', error: num_changed });
        } else {
            const updatedPump = await Pump.findPumpById(pump_id);
            res.status(200).json({ updatedPump });
        }
    } catch (error) {
        console.log(`\n\nERROR in PUT to /users/${req.params.id}/farms/${req.params.farm_id}/pumps/${pump_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.delete('/:pump_id/valves/:valve_id', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    try {
        const deleted = await Pump.deletePump(pump_id);
        if (deleted.error) {
            res.status(400).json({ message: 'Error deleting pump.', error: deleted.error });
        } else {
            // const updatedFarm = await Pump.findFarmsBy({ id: farm_id });
            res.status(200).json({ deleted });
        }
    } catch (error) {
        console.log(`\n\nERROR in DELETE to /users/${req.params.id}/farms/${req.params.farm_id}/pumps/${pump_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});


module.exports = router;