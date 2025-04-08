import fs from "fs";
import { directory, createFile, getStub } from "./generator";

const fileName = process.argv[2];

if (!fileName) {
  console.error("❌ Please provide a controller name");
  process.exit(1);
}

const stubPath = directory("../stubs/controller.stub");
const controllerDir = directory("../../controllers");
const filePath = createFile(controllerDir, fileName);

// Check the controller directory exists, if the directory doesn't exist, create it
if (!fs.existsSync(controllerDir)) {
  fs.mkdirSync(controllerDir);
}

// Check the controller file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Controller file already exists`);
  process.exit(1);
}

const stub = getStub(stubPath, fileName);

fs.writeFileSync(filePath, stub);

console.log(`✅ Controller file created successfully`);
