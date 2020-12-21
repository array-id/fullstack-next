exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table) {
        table.increments();
        table.string('title');
        table.text('content');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return kenx.schema.dropTable('posts');
};
