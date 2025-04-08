import fs from "fs";
import path from "path";

/**
 * Get directory path
 * @param path
 * @returns
 */
export const directory = (filePath: string) => {
  return path.join(__dirname, filePath);
};

/**
 * Create file path
 * @param folder
 * @param fileName
 * @returns
 */
export const createFile = (folder: string, fileName: string) => {
  return path.join(folder, `${fileName}.ts`);
};

/**
 * Get stub file
 * @param stubPath
 * @param fileName
 * @returns
 */
export const getStub = (stubPath: string, fileName: string) => {
  let stub = fs.readFileSync(stubPath, "utf-8");
  stub = stub.replace(/{{name}}/g, fileName);

  return stub;
};
