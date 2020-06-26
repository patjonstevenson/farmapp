const Pump = require("./pumps-model");
const idMiddleware = require('../../auth/validate-id-middleware');
const router = require('express').Router();

router.get('/byUserId/:user_id', async (req, res) => {
    const { user_id } = req.params;
    // console.log("FARM ID: ", farm_id);
    // console.log("req.params: ", req.params);
    // console.log("\nInside pumps-router.js handler for GET to /:id/farms/:farm_id/pumps\n")
    try {
        const pumps = await Pump.findPumpsByUser(user_id);
        console.log("PUMPS: ", pumps);
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

router.get('/byFarmId/:farm_id', async (req, res) => {
    const { farm_id } = req.params;
    // console.log("FARM ID: ", farm_id);
    // console.log("req.params: ", req.params);
    // console.log("\nInside pumps-router.js handler for GET to /:id/farms/:farm_id/pumps\n")
    try {
        const pumps = await Pump.findPumpsBy({ farm_id });
        console.log("PUMPS: ", pumps);
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

router.get('/:pump_id', /*idMiddleware,*/ async (req, res) => {
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
router.post('/', /*idMiddleware,*/ async (req, res) => {
    const pump = req.body;
    if (!valve.user_id) {
        req.status(400).json({ message: "user_id required for POST to /api/valves" });
    }
    if (!valve.farm_id) {
        req.status(400).json({ message: "farm_id required for POST to /api/valves" });
    }
    console.log("\nREQ BODY: ", req.body);
    // console.log("User ID in POST pump: ", id);
    try {
        const [new_id] = await Pump.addPump({ name: pump.name, farm_id, user_id: id });
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
router.put('/:pump_id', /*idMiddleware,*/ async (req, res) => {
    const { pump_id } = req.params;
    const { params, changes } = req.body;
    console.log("CHANGES: ", changes);
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
router.delete('/:pump_id', /*idMiddleware,*/ async (req, res) => {
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