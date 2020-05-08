const Farm = require('./farms-model');
const helpers = require('./farms-helpers');

const router = require('express').Router();
const idMiddleware = require('../users/validate-id-middleware');

router.get('/', idMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const farms = await Farm.findFarmsByUser(id);
        if (farms.error) {
            res.status(500).json({ message: "Error processing farm data.", error: farms.error });
        } else {
            res.status(200).json({ farms });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/farms\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.get('/:farm_id', idMiddleware, async (req, res) => {
    const { farm_id } = req.params;
    try {
        const farms = await Farm.findFarmsBy({ id: farm_id });
        if (farms.error) {
            res.status(500).json({ message: "Error processing farm data.", error: farms.error });
        } else {
            res.status(200).json({ farms });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/farms/${req.params.farm_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.post('/', idMiddleware, async (req, res) => {
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
        console.log(`\n\nERROR in POST to /users/${req.params.id}/farms\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.put('/:farm_id', idMiddleware, async (req, res) => {
    const { farm_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Farm.updateFarm(changes, farm_id);
        if (num_changed.error || num_changed == 0) {
            res.status(400).json({ message: 'Error updating farm.', error: num_changed });
        } else {
            const updatedFarm = await Farm.findFarmsBy({ id: farm_id });
            res.status(200).json({ updatedFarm });
        }
    } catch (error) {
        console.log(`\n\nERROR in PUT to /users/${req.params.id}/farms/${req.params.farm_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.delete('/:farm_id', idMiddleware, async (req, res) => {
    const { farm_id } = req.params;
    try {
        const deleted = await Farm.deleteFarm(farm_id);
        if (deleted.error) {
            res.status(400).json({ message: 'Error deleting farm.', error: deleted.error });
        } else {
            // const updatedFarm = await Farm.findFarmsBy({ id: farm_id });
            res.status(200).json({ deleted });
        }
    } catch (error) {
        console.log(`\n\nERROR in DELETE to /users/${req.params.id}/farms/${req.params.farm_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});

module.exports = router;