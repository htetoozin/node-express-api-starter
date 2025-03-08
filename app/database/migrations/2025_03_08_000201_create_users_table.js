const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    if (!(await schema.hasTable("users"))) {
      await schema.createTable("users", (table) => {
        table.increments("id");
        table.string("name");
        table.string("email").unique();
        table.string("password", 6);
        table.integer("role_id").default(1);
        table.timestamps();
      });
    }
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("users");
  }
};
