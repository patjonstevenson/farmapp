const db = require('../database/dbConfig');

module.exports = {
    // Strategies
    addStrategy,
    updateStrategy,
    deleteStrategy,
    findStrategyBy,
    findStrategyById,
    findStrategiesByFarm,
    findStrategiesByUser,
    // Tactics
    addTactic,
    updateTactic,
    deleteTactic,
    findTacticBy,
    findTacticById
};


// STRATEGIES

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
        // .groupBy('stra')
        .select(
            's.id as strategy_id', 's.name as strategy_name', // strategy
            't.id as tactic_id', 't.time', 't.humidity_high', 't.dryback' // tactics
        );
}

function findStrategiesByFarm(farm_id) {
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

// TACTICS

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