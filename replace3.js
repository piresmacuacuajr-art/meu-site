import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content.replace(/Tânia Tembe/g, 'Edson Massingue');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

replaceInFile(path.join(process.cwd(), 'src/App.tsx'));
console.log('Replacement complete.');
