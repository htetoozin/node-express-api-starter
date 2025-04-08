import fs from "fs";
import { directory, createFile, getStub } from "../generator";

const fileName = process.argv[2];

if (!fileName) {
  console.error("❌ Please provide a resource name");
  process.exit(1);
}

const stubPath = directory("../stubs/resource.stub");
const resourceDir = directory("../../resources");
const filePath = createFile(resourceDir, fileName);

// Check the resource directory exists, if the directory doesn't exist, create it
if (!fs.existsSync(resourceDir)) {
  fs.mkdirSync(resourceDir);
}

// Check the resource file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Resource file already exists`);
  process.exit(1);
}

const modelName =
  fileName.toLowerCase().replace("resource", "").charAt(0).toUpperCase() +
  fileName.toLowerCase().replace("resource", "").slice(1);

const stub = getStub(stubPath, modelName);

fs.writeFileSync(filePath, stub);

console.log(`✅ Resource file created successfully`);
