// DON'T USE THIS! USE USERS-MODEL.JS

const db = require("../database/dbConfig");

const users = require("../resources/users/users-model");

async function add(user) {
    try {
        const [id] = await db("users").insert(user, 'id');
        return users.findById(id);
    } catch (error) {
        return { error };
    }
}



module.exports = {
    add,
    findBy: users.findBy
}