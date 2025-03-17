const { Migration } = require("sutando");
const { Role } = require("../../../dist/app/enums/role");

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
        table.integer("role_id").default(Role.ADMIN);
        table.string("path").nullable();
        table.string("password");
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
