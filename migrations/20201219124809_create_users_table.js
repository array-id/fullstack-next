exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('email');
        table.string('password');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
