exports.up = function (knex) {
    return knex.schema
        .table('tactics', Tactics => {
            Tactics.integer("user_id")
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
        .table('pumps', Pumps => {
            Pumps.integer("user_id")
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
        .table('valves', Valves => {
            Valves.integer("user_id")
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
};

exports.down = function (knex) {
    return knex.schema
        .table('valves', Valves => {
            Valves.dropColumn("user_id")
        })
        .table('pumps', Pumps => {
            Pumps.dropColumn("user_id")
        })
        .table('tactics', Tactics => {
            Tactics.dropColumn("user_id")
        });
};