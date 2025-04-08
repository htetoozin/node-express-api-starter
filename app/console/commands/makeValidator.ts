import fs from "fs";
import { directory, createFile, getStub } from "./generator";

const fileName = process.argv[2];

if (!fileName) {
  console.error("❌ Please provide a validator name");
  process.exit(1);
}

const stubPath = directory("../stubs/validator.stub");
const validatorDir = directory("../../validators");
const filePath = createFile(validatorDir, fileName);

// Check the validator directory exists, if the directory doesn't exist, create it
if (!fs.existsSync(validatorDir)) {
  fs.mkdirSync(validatorDir);
}

// Check the validator file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Validator file already exists`);
  process.exit(1);
}

const modelName =
  fileName.toLowerCase().replace("validator", "").charAt(0).toUpperCase() +
  fileName.toLowerCase().replace("validator", "").slice(1);

const stub = getStub(stubPath, modelName);

fs.writeFileSync(filePath, stub);

console.log(`✅ Validator file created successfully`);
