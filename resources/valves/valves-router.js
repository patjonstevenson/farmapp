const Valve = require("./valves-model");
const router = require("express").Router();
const idMiddleware = require('../../auth/validate-id-middleware');

router.get('/', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    try {
        const pumps = await Valve.findValvessBy({ pump_id });
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
router.get('/:valve_id', idMiddleware, async (req, res) => {
    const { valve_id } = req.params;
    try {
        const pump = await Valve.findValveById(valve_id);
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
    const { name, params } = req.body;
    const { pump_id, id } = params;
    console.log("User ID in POST valve: ", id);
    console.log(`\nREQ.BODY:\n${req.body}\n`, req.body);
    // const pump = req.body;
    try {
        const [new_id] = await Valve.addValve({ name, pump_id });
        if (new_id.error) {
            res.status(400).json({ message: 'Error adding pump.', error: new_id.error });
        } else {
            const newValve = await Valve.findValveById(new_id);
            res.status(200).json({ newValve });
        }
    } catch (error) {
        // console.log(`\n\nERROR in POST to /users/${req.params.id}/farms/${farm_id}/pumps\n${error}`);
        console.log("\n\nERROR in POST to /:id_pump_id/valves");
        console.log("Error:\n", error);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.put('/:valve_id', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Valve.updateValve(changes, pump_id);
        if (num_changed.error || num_changed == 0) {
            res.status(400).json({ message: 'Error updating pump.', error: num_changed });
        } else {
            const updatedValve = await Valve.findValveById(pump_id);
            res.status(200).json({ updatedValve });
        }
    } catch (error) {
        console.log(`\n\nERROR in PUT to /users/${req.params.id}/farms/${req.params.farm_id}/pumps/${pump_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.delete('/:valve_id', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    try {
        const deleted = await Valve.deleteValve(pump_id);
        if (deleted.error) {
            res.status(400).json({ message: 'Error deleting pump.', error: deleted.error });
        } else {
            // const updatedFarm = await Valve.findFarmsBy({ id: farm_id });
            res.status(200).json({ deleted });
        }
    } catch (error) {
        console.log(`\n\nERROR in DELETE to /users/${req.params.id}/farms/${req.params.farm_id}/pumps/${pump_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

module.exports = router;