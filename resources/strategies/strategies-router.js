const Strategy = require("./strategies-model");

const idMiddleware = require('../../auth/validate-id-middleware');

const router = require('express').Router();

router.get('/byUserId/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const strategies = await Strategy.findStrategiesByUser(id);
        if (strategies.error) {
            return res.status(500).json({ message: "Error processing pump data.", error: strategies.error });
        } else {
            console.log("Strategies in strategies router:\n", strategies);
            return res.status(200).json({ strategies });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${id}/strategies\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error });
    }
});
router.get('/:strategy_id', async (req, res) => {
    const { strategy_id } = req.params;
    try {
        const strategy = await Strategy.findStrategyById(strategy_id);
        if (strategy.error) {
            return res.status(500).json({ message: "Error processing strategy data.", error: strategy.error });
        } else {
            return res.status(200).json({ strategy });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/strategies/${strategy_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.post('/', async (req, res) => {
    const strategy = req.body;
    if (!strategy.user_id) {
        return res.status(400).json({ message: "user_id required for POST to /api/strategy" });
    }
    console.log("\nSTRATEGY (from req.body):\n", strategy);
    try {
        const [new_id] = await Strategy.addStrategy(strategy);
        if (new_id.error) {
            return res.status(400).json({ message: 'Error adding strategy.', error: new_id.error });
        } else {
            const newStrategy = await Strategy.findStrategyById(new_id);
            return res.status(200).json(newStrategy);
        }
    } catch (error) {
        console.log(`\n\nERROR in POST to /users/${req.body.params.id}/strategies\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.put('/:strategy_id', async (req, res) => {
    const { strategy_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Strategy.updateStrategy(changes, strategy_id);
        if (num_changed.error || num_changed == 0) {
            return res.status(400).json({ message: 'Error updating strategy.', error: num_changed });
        } else {
            const updatedStrategy = await Strategy.findStrategyById(strategy_id);
            return res.status(200).json(updatedStrategy);
        }
    } catch (error) {
        console.log(`\n\nERROR in PUT to /users/${req.params.id}/strategies/${strategy_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.delete('/:strategy_id', async (req, res) => {
    const { strategy_id } = req.params;
    try {
        const deleted = await Strategy.deleteStrategy(strategy_id);
        if (deleted.error) {
            return res.status(400).json({ message: 'Error deleting strategy.', error: deleted.error });
        } else {
            // const updatedFarm = await Strategy.findFarmsBy({ id: farm_id });
            return res.status(200).json(deleted);
        }
    } catch (error) {
        console.log(`\n\nERROR in DELETE to /users/${req.params.id}/strategies/${strategy_id}\n${error}`);
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
});

module.exports = router;