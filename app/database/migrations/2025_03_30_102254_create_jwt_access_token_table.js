const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("jwt_access_token", (table) => {
      table.increments("id");
      table.integer("token_id").unsigned();
      table.string("token_type");
      table.string("token");
      table.timestamp("last_used_at");
      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("jwt_access_token");
  }
};
