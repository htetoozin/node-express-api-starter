import fs from "fs";
import { directory, createFile, getStub } from "./generator";

const fileName = process.argv[2];

if (!fileName) {
  console.error("❌ Please provide a model name");
  process.exit(1);
}

const stubPath = directory("../stubs/model.stub");
const modelDir = directory("../../models");
const filePath = createFile(modelDir, fileName);

// Check the model directory exists, if the model doesn't exist, create it
if (!fs.existsSync(modelDir)) {
  fs.mkdirSync(modelDir);
}

// Check the model file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Model file already exists`);
  process.exit(1);
}

const modelName =
  fileName.toLowerCase().replace("model", "").charAt(0).toUpperCase() +
  fileName.toLowerCase().replace("model", "").slice(1);

const stub = getStub(stubPath, modelName);

fs.writeFileSync(filePath, stub);

console.log(`✅ Model file created successfully`);
