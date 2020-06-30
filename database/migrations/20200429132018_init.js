
exports.up = function (knex) {
    return knex.schema
        .createTable("users", Users => {
            Users.increments();
            Users.string("first_name").notNullable();
            Users.string("last_name").notNullable();
            Users.string("email")
                .unique()
                .notNullable();
            Users.string("password").notNullable();
        })
        .createTable("farms", Farms => {
            Farms.increments();
            Farms.string("name").notNullable();
            // Farms.string("latitude");
            // Farms.string("longitude");
            Farms.string("timezone").notNullable();
            Farms.integer("user_id")
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
        .createTable("strategies", Strategies => {
            Strategies.increments();
            Strategies.string("name").notNullable();
        })
        .createTable("tactics", Tactics => {
            Tactics.increments();
            Tactics.integer("strategy_id")
                .unsigned()
                .references("id")
                .inTable("strategies")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
            Tactics.string("time").notNullable();
            // Tactics.string("days");
            // TODO: Find out if two decimal places is sufficient
            Tactics.decimal("humidity_high", 5, 2).notNullable();
            Tactics.decimal("dryback", 5, 2).notNullable();
        })
        .createTable("pumps", Pumps => {
            Pumps.increments();
            Pumps.string("name");
            Pumps.integer("farm_id")
                .unsigned()
                .references("id")
                .inTable("farms")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
            Pumps.integer("strategy_id")
                .unsigned()
                .references("id")
                .inTable("strategies")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
        .createTable("valves", Valves => {
            Valves.increments();
            Valves.string("name");
            Valves.integer("pump_id")
                .unsigned()
                .references("id")
                .inTable("pumps")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("valves")
        .dropTableIfExists("pumps")
        .dropTableIfExists("tactics")
        .dropTableIfExists("strategies")
        .dropTableIfExists("farms")
        .dropTableIfExists("users");
};
