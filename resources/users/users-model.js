const db = require('../../database/dbConfig');
const Farm = require('../farms/farms-model');
const Pump = require('../pumps/pumps-model');
const Strategy = require('../strategies/strategies-model');


     function fetchUserResources(user_id) {
    try {
        const farms = Farm.findFarmsByUser(user_id);
        const pumps = Pump.findPumpsByUser(user_id);
        const valves = Pump.findValvesByUser(user_id);
        const strategies = Strategy.findStrategiesByUser(user_id);
        const tactics = Strategy.findTacticsByUser(user_id);
        return Promise.all([
            farms, pumps, valves, strategies, tactics
        ]);


        // const farms = await Farm.findFarmsByUser(user_id);
        // const pumps = await Pump.findPumpsByUser(user_id);
        // const valves = await Pump.findValvesByUser(user_id);
        // const strategies = await Strategy.findStrategiesByUser(user_id);
        // const tactics = await Strategy.findTacticsByUser(user_id);
        // return ({
        //     farms, pumps, valves, strategies, tactics
        // });
    } catch (error) {
        return { error };
    }
}

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
    console.log("GET USER ID");
    return db('users as u').where(filter).select('u.id').first();
}

module.exports = {
    fetchUserResources,
    findBy,
    findById,
    add,
    getUserId
};