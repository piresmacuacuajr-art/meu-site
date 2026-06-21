import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content.replace(/Eduardo Matsinhe/g, 'Edson Massingue');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

replaceInFile(path.join(process.cwd(), 'src/data.ts'));
console.log('Replacement complete.');
