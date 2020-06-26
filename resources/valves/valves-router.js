const Valve = require("./valves-model");
const router = require("express").Router();
const idMiddleware = require('../../auth/validate-id-middleware');

router.get('/byUserId/:user_id', idMiddleware, async (req, res) => {
    const { user_id } = req.params;
    try {
        const valves = await Valve.findValvesByUser({ user_id });
        if (valves.error) {
            return res.status(500).json({ message: "Error processing valve data.", error: farms.error });
        } else {
            return res.status(200).json({ valves });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/farms/${farm_id}/valves\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});

router.get('/byPumpId/:pump_id', /*idMiddleware,*/ async (req, res) => {
    const { pump_id } = req.params;
    try {
        const valves = await Valve.findValvesBy({ pump_id });
        if (valves.error) {
            return res.status(500).json({ message: "Error processing valve data.", error: farms.error });
        } else {
            return res.status(200).json({ valves });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/farms/${farm_id}/valves\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});

router.get('/:valve_id', /*idMiddleware,*/ async (req, res) => {
    const { valve_id } = req.params;
    try {
        const valve = await Valve.findValveById(valve_id);
        if (valve.error) {
            return res.status(500).json({ message: "Error processing valve data.", error: valve.error });
        } else {
            return res.status(200).json({ valve });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/farms/${req.params.farm_id}/valves/${valve_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.post('/', /*idMiddleware,*/ async (req, res) => {
    const valve = req.body;
    if (!valve.user_id) {
        return res.status(400).json({ message: "user_id required for POST to /api/valves" });
    }
    if (!valve.farm_id) {
        return res.status(400).json({ message: "farm_id required for POST to /api/valves" });
    }
    if (!valve.pump_id) {
        return res.status(400).json({ message: "pump_id required for POST to /api/valves" });
    }
    // const { valve_id, id } = params;
    // console.log("User ID in POST valve: ", id);
    console.log(`\nREQ.BODY:\n${req.body}\n`, req.body);
    // const valve = req.body;
    try {
        const [new_id] = await Valve.addValve(valve);
        if (new_id.error) {
            return res.status(400).json({ message: 'Error adding valve.', error: new_id.error });
        } else {
            const newValve = await Valve.findValveById(new_id);
            return res.status(200).json({ newValve });
        }
    } catch (error) {
        // console.log(`\n\nERROR in POST to /users/${req.params.id}/farms/${farm_id}/valves\n${error}`);
        console.log("\n\nERROR in POST to /:id_valve_id/valves");
        console.log("Error:\n", error);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.put('/:valve_id', /*idMiddleware,*/ async (req, res) => {
    const { valve_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Valve.updateValve(changes, valve_id);
        if (num_changed.error || num_changed == 0) {
            return res.status(400).json({ message: 'Error updating valve.', error: num_changed });
        } else {
            const updatedValve = await Valve.findValveById(valve_id);
            return res.status(200).json({ updatedValve });
        }
    } catch (error) {
        console.log(`\n\nERROR in PUT to /users/${req.params.id}/farms/${req.params.farm_id}/valves/${valve_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.delete('/:valve_id', /*idMiddleware,*/ async (req, res) => {
    const { valve_id } = req.params;
    try {
        const deleted = await Valve.deleteValve(valve_id);
        if (deleted.error) {
            return res.status(400).json({ message: 'Error deleting valve.', error: deleted.error });
        } else {
            // const updatedFarm = await Valve.findFarmsBy({ id: farm_id });
            return res.status(200).json({ deleted });
        }
    } catch (error) {
        console.log(`\n\nERROR in DELETE to /users/${req.params.id}/farms/${req.params.farm_id}/valves/${valve_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});

module.exports = router;