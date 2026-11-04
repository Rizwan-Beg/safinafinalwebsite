const fs = require('fs');
const path = require('path');

// This script patches the hardcoded 1MB file size limit in @medusajs/dashboard
const targetDir = path.join(__dirname, '../../node_modules/@medusajs/dashboard/dist');
const TARGET_STRINGS = [
  '__MAX_UPLOAD_FILE_SIZE__ ?? 1024 * 1024',
  '__MAX_UPLOAD_FILE_SIZE__ !== null ? __MAX_UPLOAD_FILE_SIZE__ : 1024 * 1024',
  '__MAX_UPLOAD_FILE_SIZE__ ?? 50 * 1024 * 1024'
];

if (!fs.existsSync(targetDir)) {
  console.log('Dashboard dist folder not found.');
  process.exit(0);
}

let patchedFiles = 0;

const patchFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const target of TARGET_STRINGS) {
    if (content.includes(target)) {
      // Replace the entire expression so Vite doesn't override it with 1MB!
      content = content.split(target).join('(50 * 1024 * 1024)');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched ${filePath}`);
    patchedFiles++;
  }
};

const walkSync = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkSync(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.mjs')) {
      patchFile(fullPath);
    }
  }
};

console.log('Patching Medusa dashboard file limits...');
walkSync(targetDir);
console.log(`Successfully patched ${patchedFiles} files.`);

console.log('Running patch-product-create...');
require('./patch-product-create.js');
