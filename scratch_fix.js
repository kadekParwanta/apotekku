const fs = require('fs');
const path = require('path');
const files = [
  'src/pages/backoffice/Dashboard.jsx',
  'src/pages/backoffice/Replenishment.jsx',
];
for (const rel of files) {
  const p = path.join(__dirname, rel);
  let content = fs.readFileSync(p, 'utf8');
  const before = content;
  content = content.replace(/\\·/g, '·');
  fs.writeFileSync(p, content);
  console.log(rel, before === content ? 'no change' : 'changed');
}
