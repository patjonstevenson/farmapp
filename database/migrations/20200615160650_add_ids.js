
exports.up = function (knex) {
    return knex.schema
        .table('valves', Valves => {
            Valves.integer("farm_id")
                .unsigned()
                .references("id")
                .inTable("farms")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
};

exports.down = function (knex) {
    return knex.schema
        .table('valves', Valves => {
            Valves.dropColumn("farm_id")
        })
};
