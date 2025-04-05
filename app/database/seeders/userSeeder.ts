import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { Role } from "../../enums/role";
import { db } from "../../config/database";

const userSeeder = async () => {
  try {
    for (let i = 0; i < 10; i++) {
      await db.table("users").insert({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role_id: Role.ADMIN,
        password: bcrypt.hashSync("123456", 10),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    console.log("✅ Successfully seeded 10 users");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

userSeeder().catch(console.error);

export default userSeeder;
