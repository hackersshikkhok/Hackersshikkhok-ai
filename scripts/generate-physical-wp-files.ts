import fs from 'fs';
import path from 'path';
import { INITIAL_VIRTUAL_FILES } from '../src/data/wpVirtualFiles';

async function main() {
  console.log(`Writing ${INITIAL_VIRTUAL_FILES.length} WordPress files to disk...`);
  
  for (const file of INITIAL_VIRTUAL_FILES) {
    const filePath = path.resolve(process.cwd(), file.path);
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, file.content, 'utf8');
    console.log(`Created: ${file.path}`);
  }
  
  console.log('All WordPress Plugin, Theme, and Documentation files successfully generated on disk!');
}

main().catch((err) => {
  console.error('Error generating files:', err);
  process.exit(1);
});
