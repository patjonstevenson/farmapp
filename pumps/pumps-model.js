const db = require('../database/dbConfig');

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
    findValveBy,
    findValveById,
};

// PUMPS

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

// VALVES

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