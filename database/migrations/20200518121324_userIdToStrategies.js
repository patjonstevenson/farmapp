
exports.up = function (knex) {
    return knex.schema.table('strategies', Strategies => {
        Strategies.integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    });

};

exports.down = function (knex) {
    return knex.schema.table('strategies', Strategies => {
        Strategies.dropColumn("user_id");
    });
};
