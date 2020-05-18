const db = require('../../database/dbConfig');
const Pump = require('../pumps/pumps-model.js');
const Strategy = require('../strategies/strategies-model.js');

module.exports = {
    // Farms
    addFarm,
    updateFarm,
    deleteFarm,
    findFarmsBy,
    findFarmsByUser,
    getFarmInfoByUser,
    // Pumps
    addPump,
    updatePump,
    deletePump,
    findPumpById,
    findPumpBy,
    findPumpsByFarm,
    findPumpsByUser,
    // Valves
    addValve,
    updateValve,
    deleteValve,
    findValveBy,
    findValveById,
    // Strategies
    addStrategy,
    updateStrategy,
    deleteStrategy,
    findStrategyBy,
    findStrategyById,
    findStrategyByFarm,
    findStrategiesByUser,
    // Tactics
    addTactic,
    updateTactic,
    deleteTactic,
    findTacticBy,
    findTacticById
};

/*
    NOTE: All add functions assume the relevant foreign keys
    are included in the objects being passed to them.
*/

// FARMS

function addFarm(farm) {
    return db('farms').insert(farm, 'id');
}

function updateFarm(changes, id) {
    return db('farms').where({ id }).update(changes);
}

function deleteFarm(id) {
    return db('farms').where({ id }).del();
}

function findFarmsBy(filter) {
    return db('farms').where(filter);
}

// TODO
async function findFarmsByUser(user_id) {
    console.log(`Running findFarmsByUser for user_id: ${user_id}`);
    // return db('users as u')
    //     .join('farms as f', 'f.user_id', 'u.id')
    //     .where({ 'u.id': user_id })
    //     .select(
    //         'f.id as farm_id', 'f.name as farm_name', 'f.timezone'
    //     );
    return await db('farms as f')
        .where({ 'f.user_id': user_id })
        .select('*');
}

// TODO
async function getFarmInfoByUser(user_id) {
    try {
        // get farms DONE
        const farms = await findFarmsByUser(user_id);
        // get pumps and valves DONE
        const pumps = await Pump.findPumpsByUser(user_id);
        const valves = await Pump.findValvesByUser(user_id);
        console.log("Pumps in model: ", pumps);
        // get strategies and tactics DONE
        const strategies = await Strategy.findStrategiesByUser(user_id);
        return ({
            farms, pumps, valves, strategies
        });
    } catch (error) {
        return { error };
    }
}


// // TODO
// function getFarmInfoByUser(user_id) {
//     // This needs to go to a formatting helper function from farms-helpers.js
//     return db('users as u')
//         .join('farms as f', 'f.user_id', 'u.id')
//         .join('pumps as p', 'p.farm_id', 'f.id')
//         .join('valves as v', 'v.pump_id', 'p.id')
//         .join('strategies as s', 's.id', 'p.strategy_id')
//         .join('tactics as t', 't.strategy_id', 's.id')
//         .where({ 'u.id': user_id })
//         .select(
//             'f.id as farm_id', 'f.name as farm_name', 'f.timezone', // farm
//             'p.id as pump_id', 'p.name as pump_name', // pump
//             'v.id as valve_id', 'v.name as valve_name', // valves
//             's.id as strategy_id', 's.name as strategy_name', // strategy
//             't.id as tactic_id', 't.time', 't.humidity_high' // tactic
//         )
// }

// PUMPS

function addPump(pump) {
    return db('pumps').insert(pump, 'id');
}

function updatePump(changes, id) {
    return db('pumps').where({ id }).update(changes);
}

function deletePump(id) {
    return db('pumps').where({ id }).del();
}

function findPumpById(id) {
    return db('pumps').where({ id }).first();
}

function findPumpBy(filter) {
    return db('pumps').where(filter);
}

// TODO
function findPumpsByFarm(farm_id) {
    return db('farms as f')
        .join('pumps as p', 'p.farm_id', 'f.id')
        .where({ 'f.id': farm_id })
        .select(
            'p.id as pump_id',
        );
}


async function findPumpsByUser(user_id) {
    console.log("\nRUNNING findPumpsByUser with user_id = ", user_id);
    return await db('users as u')
        .join('farms as f', 'f.user_id', 'u.id')
        .join('pumps as p', 'p.farm_id', 'f.id')
        .join('valves as v', 'v.pump_id', 'v.id')
        .where({ 'u.id': user_id })
        .select(
            'p.id as pump_id', 'p.name as pump_name', 'p.farm_id', 'p.strategy_id', // pump
            'v.id as valve_id', 'v.name as valve_name', 'v.pump_id as v_pump_id' // valve
        );
}

// VALVES

function addValve(valve) {
    return db('valves').insert(valve, 'id');
}

function updateValve(changes, id) {
    return db('valves').where({ id }).update(changes);
}

function deleteValve(id) {
    return db('valves').where({ id }).del();
}

function findValveById(id) {
    return db('valves').where({ id }).first();
}
function findValveBy(filter) {
    return db('valves').where(filter);
}
// TODO: add pump group (pump with valves) ? (or implement separately?)
// TODO: other pump group fns (if using pump groups)

// STRATEGIES

// TODO: add strategy (with tactics)
function addStrategy(strategy) {
    return db('strategies').insert(strategy, 'id');
}

function updateStrategy(changes, id) {
    return db('strategies').where({ id }).update(changes);
}

function deleteStrategy(id) {
    return db('strategies').where({ id }).del();
}

function findStrategyById(id) {
    return db('strategies').where({ id }).first();
}
function findStrategyBy(filter) {
    return db('strategies').where(filter);
}

function findStrategiesByUser(user_id) {
    // Returns list of strategies by user
    return db('users as u')
        .join('farms as f', 'f.user_id', 'u.id')
        .join('pumps as p', 'p.farm_id', 'f.id')
        .join('strategies as s', 's.id', 'f.strategy_id')
        .join('farmid.tactics as t', 't.strategy_id', 's.id')
        .where({ 'u.id': user_id })
        // .groupBy('stra')
        .select(
            's.id as strategy_id', 's.name as strategy_name', // strategy
            't.id as tactic_id', 't.time', 't.humidity_high', 't.dryback' // tactics
        );
}

function findStrategyByFarm(farm_id) {
    // Returns list of strategies by farm
    return db('farms as f')
        .join('pumps as p', 'p.farm_id', 'f.id')
        .join('strategies as s', 's.id', 'f.strategy_id')
        .join('farmid.tactics as t', 't.strategy_id', 's.id')
        .where({ 'f.id': farm_id })
        .select(
            's.id as strategy_id', 's.name as strategy_name', // strategy
            't.id as tactic_id', 't.time', 't.humidity_high', 't.dryback' // tactics
        );
}

// TACTICS

function addTactic(tactic) {
    return db('tactics').insert(tactic, 'id');
}

function updateTactic(changes, id) {
    return db('tactics').where({ id }).update(changes);
}

function deleteTactic(id) {
    return db('tactics').where({ id }).del();
}

function findTacticBy(filter) {
    return db('tactics').where(filter);
}

function findTacticById(id) {
    return db('tactics').where({ id }).first();
}

// TODO: assign strategy to pump (could just do using update pump)