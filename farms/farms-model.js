const db = require('../database/dbConfig');

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
}

/*
    NOTE: All add functions assume the relevant foreign keys
    are included in the objects being passed to them.
*/

function addFarm(farm) {
    return db('farmdb.farms').insert(farm, 'id');
}

function updateFarm(changes, id) {
    return db('farmdb.farms').where({ id }).update(changes);
}

function deleteFarm(id) {
    return db('farmdb.farms').where({ id }).del();
}

function findFarmsBy(filter) {
    return db('farmdb.farms').where(filter);
}

// TODO
function findFarmsByUser(user_id) {
    return db('farmdb.users as u')
        .join('farmdb.farms as f', 'f.user_id', 'u.id')
        .where({ 'u.id': user_id })
        .select(
            'f.id as farm_id', 'f.name as farm_name', 'f.timezone'
        );
}

// TODO
async function getFarmInfoByUser(user_id) {
    try {
        // get farms DONE
        const farms = await findFarmsByUser(user_id);
        // get pumps and valves DONE
        const pumps = await findPumpsByUser(user_id);
        // get strategies and tactics DONE
        const strategies = await findStrategiesByUser(user_id);
        return ({
            farms, pumps, strategies
        });
    } catch (error) {
        return { error };
    }
}


// // TODO
// function getFarmInfoByUser(user_id) {
//     // This needs to go to a formatting helper function from farms-helpers.js
//     return db('farmdb.users as u')
//         .join('farmdb.farms as f', 'f.user_id', 'u.id')
//         .join('farmdb.pumps as p', 'p.farm_id', 'f.id')
//         .join('farmdb.valves as v', 'v.pump_id', 'p.id')
//         .join('farmdb.strategies as s', 's.id', 'p.strategy_id')
//         .join('farmdb.tactics as t', 't.strategy_id', 's.id')
//         .where({ 'u.id': user_id })
//         .select(
//             'f.id as farm_id', 'f.name as farm_name', 'f.timezone', // farm
//             'p.id as pump_id', 'p.name as pump_name', // pump
//             'v.id as valve_id', 'v.name as valve_name', // valves
//             's.id as strategy_id', 's.name as strategy_name', // strategy
//             't.id as tactic_id', 't.time', 't.humidity_high' // tactic
//         )
// }

function addPump(pump) {
    return db('farmdb.pumps').insert(pump, 'id');
}

function updatePump(changes, id) {
    return db('farmdb.pumps').where({ id }).update(changes);
}

function deletePump(id) {
    return db('farmdb.pumps').where({ id }).del();
}

function findPumpById(id) {
    return db('farmdb.pumps').where({ id }).first();
}

function findPumpBy(filter) {
    return db('farmdb.pumps').where(filter);
}

// TODO
function findPumpsByFarm(farm_id) {
    return db('farmdb.farms as f')
        .join('farmdb.pumps as p', 'p.farm_id', 'f.id')
        .where({ 'f.id': farm_id })
        .select(
            'p'
        );
}


function findPumpsByUser(user_id) {
    return db('farmdb.users as u')
        .join('farmdb.farms as f', 'f.user_id', 'u.id')
        .join('farmdb.pumps as p', 'p.farm_id', 'f.id')
        .join('farmdb.valves as v', 'v.pump_id', 'v.id')
        .where({ 'u.id': user_id })
        .select(
            'p.id as pump_id', 'p.name as pump_name', 'p.farm_id', 'p.strategy_id', // pump
            'v.id as valve_id', 'v.name as valve_name', 'v.pump_id as v_pump_id' // valve
        );
}

function addValve(valve) {
    return db('farmdb.valves').insert(valve, 'id');
}

function updateValve(changes, id) {
    return db('farmdb.valves').where({ id }).update(changes);
}

function deleteValve(id) {
    return db('farmdb.valves').where({ id }).del();
}

function findValveById(id) {
    return db('farmdb.valves').where({ id }).first();
}
function findValveBy(filter) {
    return db('farmdb.valves').where(filter);
}
// TODO: add pump group (pump with valves) ? (or implement separately?)
// TODO: other pump group fns (if using pump groups)
// TODO: add strategy (with tactics)
function addStrategy(strategy) {
    return db('farmdb.strategies').insert(strategy, 'id');
}

function updateStrategy(changes, id) {
    return db('farmdb.strategies').where({ id }).update(changes);
}

function deleteStrategy(id) {
    return db('farmdb.strategies').where({ id }).del();
}

function findStrategyById(id) {
    return db('farmdb.strategies').where({ id }).first();
}
function findStrategyBy(filter) {
    return db('farmdb.strategies').where(filter);
}

function findStrategiesByUser(user_id) {
    // Returns list of strategies by user
    return db('farmdb.users as u')
        .join('farmdb.farms as f', 'f.user_id', 'u.id')
        .join('farmdb.pumps as p', 'p.farm_id', 'f.id')
        .join('farmdb.strategies as s', 's.id', 'f.strategy_id')
        .join('farmid.tactics as t', 't.strategy_id', 's.id')
        .where({ 'u.id': user_id })
        .groupBy('stra')
        .select(
            's.id as strategy_id', 's.name as strategy_name', // strategy
            't.id as tactic_id', 't.time', 't.humidity_high', 't.dryback' // tactics
        );
}

function findStrategyByFarm(farm_id) {
    // Returns list of strategies by farm
    return db('farmdb.farms as f')
        .join('farmdb.pumps as p', 'p.farm_id', 'f.id')
        .join('farmdb.strategies as s', 's.id', 'f.strategy_id')
        .join('farmid.tactics as t', 't.strategy_id', 's.id')
        .where({ 'f.id': farm_id })
        .select(
            's.id as strategy_id', 's.name as strategy_name', // strategy
            't.id as tactic_id', 't.time', 't.humidity_high', 't.dryback' // tactics
        );
}

function addTactic(tactic) {
    return db('farmdb.tactics').insert(tactic, 'id');
}

function updateTactic(changes, id) {
    return db('farmdb.tactics').where({ id }).update(changes);
}

function deleteTactic(id) {
    return db('farmdb.tactics').where({ id }).del();
}

function findTacticBy(filter) {
    return db('farmdb.tactics').where(filter);
}

function findTacticById(id) {
    return db('farmdb.tactics').where({ id }).first();
}

// TODO: assign strategy to pump (could just do using update pump)