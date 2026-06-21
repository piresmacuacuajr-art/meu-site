import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content.replace(/Edson Grupo Imobiliária/g, 'Grupo Edson Imobiliária');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.json') || filePath.endsWith('.html')) {
      replaceInFile(filePath);
    }
  }
}

walk(path.join(process.cwd(), 'src'));
replaceInFile(path.join(process.cwd(), 'index.html'));
replaceInFile(path.join(process.cwd(), 'metadata.json'));
console.log('Replacement complete.');
