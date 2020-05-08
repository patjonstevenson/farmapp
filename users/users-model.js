const db = require('../database/dbConfig');

function findBy(filter) {
    return db("users").where(filter);
}

function findById(id) {
    return db("users").where({ id }).first();
}

async function add(user) {
    const [id] = await db("users").insert(user, 'id');
    return findById(id);
}

function getUserId(filter) {
    return db('users as u').where(filter).select('u.id').first();
}

module.exports = {
    findBy,
    findById,
    add,
    getUserId
};