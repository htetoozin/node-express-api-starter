import fs from "fs";
import { directory, createFile, getStub } from "../generator";

const fileName = process.argv[2];

if (!fileName) {
  console.error("❌ Please provide a collection name");
  process.exit(1);
}

const stubPath = directory("../stubs/collection.stub");
const collectionDir = directory("../../resources");
const filePath = createFile(collectionDir, fileName);

// Check the collection directory exists, if the directory doesn't exist, create it
if (!fs.existsSync(collectionDir)) {
  fs.mkdirSync(collectionDir);
}

// Check the collection file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Collection file already exists`);
  process.exit(1);
}

const modelName =
  fileName.toLowerCase().replace("collection", "").charAt(0).toUpperCase() +
  fileName.toLowerCase().replace("collection", "").slice(1);

const stub = getStub(stubPath, modelName);

fs.writeFileSync(filePath, stub);

console.log(`✅ Collection file created successfully`);
