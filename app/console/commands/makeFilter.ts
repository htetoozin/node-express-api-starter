import fs from "fs";
import { directory, createFile, getStub } from "./generator";

const fileName = process.argv[2];

if (!fileName) {
  console.error("❌ Please provide a filter name");
  process.exit(1);
}

const stubPath = directory("../stubs/filter.stub");
const filterDir = directory("../../filters");
const filePath = createFile(filterDir, fileName);

// Check the filter directory exists, if the filter doesn't exist, create it
if (!fs.existsSync(filterDir)) {
  fs.mkdirSync(filterDir);
}

// Check the filter file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Filter file already exists`);
  process.exit(1);
}

const modelName =
  fileName.toLowerCase().replace("filter", "").charAt(0).toUpperCase() +
  fileName.toLowerCase().replace("filter", "").slice(1);

const stub = getStub(stubPath, modelName);

fs.writeFileSync(filePath, stub);

console.log(`✅ Filter file created successfully`);
