const router = require('express').Router();
const Tactic = require('./tactics-model');

router.get('/byUserId/:id', async (req, res) => {
    const { id } = req.body.params;
    try {
        const tactics = await Tactic.findTacticsByUser(id);
        if (tactics.error) {
            res.status(500).json({ message: "Error processing pump data.", error: tactics.error });
        } else {
            console.log("Tactics in tactics router:\n", tactics);
            res.status(200).json({ tactics });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${id}/tactics\n${error}`);
        res.status(500).json({ message: "Internal server error.", error });
    }
});
router.get('/:tactic_id', async (req, res) => {
    const { tactic_id } = req.params;
    try {
        const tactic = await Tactic.findTacticById(tactic_id);
        if (tactic.error) {
            res.status(500).json({ message: "Error processing tactic data.", error: tactic.error });
        } else {
            res.status(200).json({ tactic });
        }
    } catch (error) {
        console.log(`\n\nERROR in GET to /users/${req.params.id}/tactics/${tactic_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.post('/', async (req, res) => {
    const { params, id, ...tactic } = req.body;
    console.log("\nTACTIC (from req.body):\n", tactic);
    try {
        const [new_id] = await Tactic.addTactic({ user_id: id, ...tactic });
        if (new_id.error) {
            res.status(400).json({ message: 'Error adding tactic.', error: new_id.error });
        } else {
            const newTactic = await Tactic.findTacticById(new_id);
            res.status(200).json({ newTactic });
        }
    } catch (error) {
        console.log(`\n\nERROR in POST to /users/${req.body.params.id}/tactics\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.put('/:tactic_id', async (req, res) => {
    const { tactic_id } = req.params;
    const changes = req.body;
    try {
        const num_changed = await Tactic.updateTactic(changes, tactic_id);
        if (num_changed.error || num_changed == 0) {
            res.status(400).json({ message: 'Error updating tactic.', error: num_changed });
        } else {
            const updatedTactic = await Tactic.findTacticById(tactic_id);
            res.status(200).json({ updatedTactic });
        }
    } catch (error) {
        console.log(`\n\nERROR in PUT to /users/${req.params.id}/tactics/${tactic_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});
router.delete('/:tactic_id', async (req, res) => {
    const { tactic_id } = req.params;
    try {
        const deleted = await Tactic.deleteTactic(tactic_id);
        if (deleted.error) {
            res.status(400).json({ message: 'Error deleting tactic.', error: deleted.error });
        } else {
            // const updatedFarm = await Tactic.findFarmsBy({ id: farm_id });
            res.status(200).json({ deleted });
        }
    } catch (error) {
        console.log(`\n\nERROR in DELETE to /users/${req.params.id}/tactics/${tactic_id}\n${error}`);
        res.status(500).json({ message: "Internal server error.", error: error });
    }
});


module.exports = router;