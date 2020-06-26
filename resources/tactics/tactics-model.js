const db = require('../../database/dbConfig');

module.exports = {
    addTactic,
    updateTactic,
    deleteTactic,
    findTacticBy,
    findTacticById,
    findTacticsByUser
}

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

function findTacticsByUser(user_id) {
    return db('tactics').where({ user_id });
}

// TODO: assign strategy to pump (could just do using update pump)