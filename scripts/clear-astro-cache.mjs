import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const cachePaths = [
    path.join(root, '.astro'),
    path.join(root, 'node_modules', '.astro'),
];

for (const target of cachePaths) {
    if (!fs.existsSync(target)) {
        continue;
    }

    fs.rmSync(target, { recursive: true, force: true });
    console.log(`[clear-astro-cache] removed ${path.relative(root, target)}`);
}
