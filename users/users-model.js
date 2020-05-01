const db = require('../database/dbConfig');

function findBy(filter) {
    return db("farmdb.users").where(filter);
}

function findById(id) {
    return db("farmdb.users").where({ id }).first();
}

async function add(user) {
    const [id] = await db("farmdb.users").insert(user, 'id');
    return findById(id);
}

module.exports = {
    findBy,
    findById,
    add
}