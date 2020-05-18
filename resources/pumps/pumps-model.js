const db = require('../../database/dbConfig');

module.exports = {
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
    findValvesBy,
    findValveById,
    findValvesByUser
};

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
        // .join('valves as v', 'v.pump_id', 'v.id')
        .where({ 'f.id': farm_id })
        .select(
            'p.id as pump_id', 'p.name', 'p.strategy_id', 'p.farm_id'//, // Pump
            // 'v.id as valve_id', 'v.name as valve_name', 'v.pump_id as v_pump_id' // valve
        );
}

function findPumpsByUser(user_id) {
    return db('farms as f')
        .join('pumps as p', 'p.farm_id', 'f.id')
        // .join('valves as v', 'v.pump_id', 'v.id')
        .where({ 'f.user_id': user_id })
        .select(
            'p.id as pump_id', 'p.name as pump_name', 'p.farm_id', 'p.strategy_id', // pump
            // 'v.id as valve_id', 'v.name as valve_name', 'v.pump_id as v_pump_id' // valve
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
function findValvesBy(filter) {
    return db('valves').where(filter);
}

function findValvesByUser(user_id) {
    return db('farms as f')
        .join('pumps as p', 'f.id', 'p.farm_id')
        .join('valves as v', 'p.id', 'v.pump_id')
        .where({ 'f.user_id': user_id })
        .select(
            'v.id as valve_id', 'v.name as valve_name', 'v.pump_id as pump_id'
        );
}

function findValvesByFarm(farm_id) {
    return db('farms as f')
        .join('pumps as p', 'f.id', 'p.farm_id')
        .join('valves as v', 'p.id', 'v.pump_id')
        .where({ 'f.id': farm_id })
        .select(
            'v.id as valve_id', 'v.name as valve_name', 'v.pump_id as pump_id'
        );
}

// TODO: add pump group (pump with valves) ? (or implement separately?)
// TODO: other pump group fns (if using pump groups)