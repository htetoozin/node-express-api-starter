import fs from "fs";
import { directory, createFile, getStub } from "../generator";

const fileName = process.argv[2];

if (!fileName) {
  console.error("❌ Please provide a seeder name");
  process.exit(1);
}

const stubPath = directory("../stubs/seeder.stub");
const seedersDir = directory("../../database/seeders");
const filePath = createFile(seedersDir, fileName);

// Check the seeders directory exists, if the directory doesn't exist, create it
if (!fs.existsSync(seedersDir)) {
  fs.mkdirSync(seedersDir);
}

// Check the seeder file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Seeder file already exists`);
  process.exit(1);
}

const stub = getStub(stubPath, fileName);

fs.writeFileSync(filePath, stub);

console.log(`✅ Seeder file created successfully`);
