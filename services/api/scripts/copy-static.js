const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

const root = path.join(__dirname, "..");
copyDir(path.join(root, "src", "views"), path.join(root, "dist", "views"));
copyDir(path.join(root, "src", "public"), path.join(root, "dist", "public"));

console.log("✅ Copied views/ and public/ to dist/");
