import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      if (file !== "node_modules") getFiles(name, files);
    } else {
      if (name.endsWith(".js")) files.push(name);
    }
  }
  return files;
}

const allFiles = getFiles(path.join(__dirname, "src"));
allFiles.push(path.join(__dirname, "server.js"));
allFiles.push(path.join(__dirname, "config", "db.js"));

let hasError = false;

for (const file of allFiles) {
  const code = fs.readFileSync(file, "utf8");
  const regex = /import\s+.*?\s+from\s+["'](.*?)["']/g;
  let match;
  while ((match = regex.exec(code)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith(".")) {
      const dir = path.dirname(file);
      const absPath = path.resolve(dir, importPath);
      if (!fs.existsSync(absPath)) {
        console.error(`❌ BAD IMPORT in ${file}:`);
        console.error(`   Imported path: ${importPath}`);
        console.error(`   Resolved absolute path: ${absPath}`);
        console.error(`   File does not exist on disk!`);
        hasError = true;
      }
      
      // Check for strict casing match because Windows is case-insensitive but Linux isn't
      if (fs.existsSync(absPath)) {
        const basename = path.basename(absPath);
        const dirname = path.dirname(absPath);
        const actualFiles = fs.readdirSync(dirname);
        if (!actualFiles.includes(basename)) {
          console.error(`❌ CASING MISMATCH in ${file}:`);
          console.error(`   Imported path: ${importPath}`);
          console.error(`   Actual file case on disk does not match!`);
          hasError = true;
        }
      }
    }
  }
}

if (!hasError) {
  console.log("✅ All local imports are valid and exist on disk with exact casing.");
}
