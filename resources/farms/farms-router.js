const Farm = require('./farms-model');
const Pump = require('../pumps/pumps-model');
const helpers = require('./farms-helpers');

const router = require('express').Router();
const idMiddleware = require('../../auth/validate-id-middleware');
const { response } = require('../../api/server');

router.get('/byUserId/:user_id', async (req, res) => {
    // const { id } = req.params;
    const { user_id } = req.params;
    console.log(`\n\nRUNNING GET TO /farms/byUserId for user_id: ${user_id}\n`);
    try {
        // const farms = await Farm.getFarmInfoByUser(id);
        const farms = await Farm.findFarmsByUser(user_id);

        const pumps = [];
        const pump = {};
        for (farm in farms) {
            pump = await Pump.findPumpsByFarm(farm.id);
            pumps.append(pump);
        }
        const valves = [];
        const valve = {};
        for (pump in pumps) {
            valve = await Pump.findValvesByFarm();

        }

        if (farms.error) {
            return res.status(500).json({ message: "Error processing farm data.", error: farms.error });
        } else {
            console.log(farms);
            return res.status(200).json({ farms });
        }
    } catch (error) {
        console.log(error);
        console.log(`\n\nERROR in GET to /farms/byUserId/${user_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.get('/:farm_id', /*idMiddleware,*/ async (req, res) => {
    const { farm_id } = req.params;
    try {
        const farms = await Farm.findFarmsBy({ id: farm_id });
        if (farms.error) {
            return res.status(500).json({ message: "Error processing farm data.", error: farms.error });
        } else {
            return res.status(200).json({ farms });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/farms/${req.params.farm_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.post('/', async (req, res) => {
    // const { id } = req.params;
    const farm = req.body;
    if (!farm.user_id) {
        return res.status(400).json({ message: "user_id required for POST to /api/farms" });
    }
    try {
        const [new_id] = await Farm.addFarm(farm);
        if (new_id.error) {
            return res.status(400).json({ message: 'Error adding farm.', error: new_id.error });
        } else {
            console.log("Made it to else (no error from Farm.addFarm)");
            console.log(`typeof 8: ${typeof 8}`)
            console.log(`Type of new_id: ${typeof Number(new_id)}`);
            console.log(`new_id =  ${new_id}`);
            const newFarm = await Farm.findFarmById(new_id);
            return res.status(200).json(newFarm);
        }
    } catch (error) {
        console.log(`\n\nERROR in POST to /users/${id}/farms\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.put('/:farm_id', /*idMiddleware,*/ async (req, res) => {
    const { farm_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Farm.updateFarm(changes, farm_id);
        if (num_changed.error || num_changed == 0) {
            return res.status(400).json({ message: 'Error updating farm.', error: num_changed });
        } else {
            const updatedFarm = await Farm.findFarmsBy({ id: farm_id });
            return res.status(200).json(updatedFarm); // Do this to the rest of the resources
        }
    } catch (error) {
        console.log(`\n\nERROR in PUT to /users/${req.params.id}/farms/${req.params.farm_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.delete('/:farm_id', /*idMiddleware,*/ async (req, res) => {
    const { farm_id } = req.params;
    try {
        const deleted = await Farm.deleteFarm(farm_id);
        if (deleted.error) {
            return res.status(400).json({ message: 'Error deleting farm.', error: deleted.error });
        } else {
            // const updatedFarm = await Farm.findFarmsBy({ id: farm_id });
            return res.status(200).json(deleted);
        }
    } catch (error) {
        console.log(`\n\nERROR in DELETE to /users/${req.params.id}/farms/${req.params.farm_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});

module.exports = router;