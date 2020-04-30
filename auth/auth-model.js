// DON'T USE THIS! USE USERS-MODEL.JS

const db = require("../database/dbConfig");

const users = require("../users/users-model");

async function add(user) {
    const [id] = await db("farmdb.users").insert(user, 'id');
    return users.findById(id);
}

module.exports = {
    add
}