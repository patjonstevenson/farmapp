const valves = require("./valves-model");
const router = require("express").router();

// VALVES
router.get('/:pump_id/valves', idMiddleware, async (req, res) => {
    const { pump_id } = req.params;
    try {
        const pumps = await Pump.findValvessBy({ pump_id });
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
    const { valve_id } = req.params;
    try {
        const pump = await Pump.findValveById(valve_id);
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
    const { name, params } = req.body;
    const { pump_id, id } = params;
    console.log("User ID in POST valve: ", id);
    console.log(`\nREQ.BODY:\n${req.body}\n`, req.body);
    // const pump = req.body;
    try {
        const [new_id] = await Pump.addValve({ name, pump_id });
        if (new_id.error) {
            res.status(400).json({ message: 'Error adding pump.', error: new_id.error });
        } else {
            const newPump = await Pump.findValveById(new_id);
            res.status(200).json({ newPump });
        }
    } catch (error) {
        // console.log(`\n\nERROR in POST to /users/${req.params.id}/farms/${farm_id}/pumps\n${error}`);
        console.log("\n\nERROR in POST to /:id_pump_id/valves");
        console.log("Error:\n", error);
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