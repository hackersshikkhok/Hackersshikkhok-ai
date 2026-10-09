import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const archiverPkg = require('archiver');

function createZip(sourceDir: string, outZipPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outZipPath);
    const archive = archiverPkg('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`[ZIP] Created ${outZipPath} (${archive.pointer()} total bytes)`);
      resolve(archive.pointer());
    });

    archive.on('error', (err: any) => reject(err));

    archive.pipe(output);
    archive.directory(sourceDir, path.basename(sourceDir));
    archive.finalize();
  });
}

async function run() {
  console.log('Generating installable WordPress release ZIPs...');
  const coreBytes = await createZip('hackersshikkhok-core', 'hackersshikkhok-core.zip');
  const themeBytes = await createZip('hackersshikkhok-theme', 'hackersshikkhok-theme.zip');
  console.log(`Successfully built:
- hackersshikkhok-core.zip: ${(coreBytes / (1024 * 1024)).toFixed(2)} MB
- hackersshikkhok-theme.zip: ${(themeBytes / (1024 * 1024)).toFixed(2)} MB`);
}

run().catch(err => {
  console.error('Packaging failed:', err);
  process.exit(1);
});
