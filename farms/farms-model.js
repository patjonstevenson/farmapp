const db = require('../database/dbConfig');

// TODO: add farm
function addFarm(farm) {
    return db('farmdb.farms').insert(farm, 'id');
}
// TODO: update farm
function updateFarm(changes, id) {
    return db('farmdb.farms').where({ id }).update(changes);
}
// TODO: delete farm
function deleteFarm(id) {
    return db('farmdb.farms').where({ id }).del();
}
// TODO: find farm
function findFarmsBy(filter) {
    return db('farmdb.farms').where(filter);
}
// TODO: add pump
function addPump(pump) {
    return db('farmdb.pumps').insert(pump, 'id');
}
// TODO: update pump
function updatePump(changes, id) {
    return db('farmdb.pumps').where({ id }).update(changes)
}
// TODO: delete pump
// TODO: find pump
// TODO: add valve
// TODO: update valve
// TODO: delete valve
// TODO: find valve
// TODO: add pump group (pump with valves) ? (or implement separately?)
// TODO: other pump group fns (if using pump groups)
// TODO: add strategy (with tactics)
// TODO: update strategy
// TODO: delete strategy
// TODO: find strategy
// TODO: assign strategy to pump (could just do using update pump)