const db = require('../../database/dbConfig');

export default {
    addValve,
    updateValve,
    deleteValve,
    findValvesBy,
    findValveById,
    findValvesByUser
}

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