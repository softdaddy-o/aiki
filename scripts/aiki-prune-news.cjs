const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const { shouldPruneNews } = require('./lib/content-policy.cjs');

const NEWS_DIR = path.resolve(__dirname, '../src/content/news/ko');

function extractFrontmatter(content) {
    const match = String(content || '').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    return match ? match[1] : '';
}

function readScalar(frontmatter, field) {
    const patterns = [
        new RegExp(`^${field}:\\s*"([^"]*)"`, 'm'),
        new RegExp(`^${field}:\\s*'([^']*)'`, 'm'),
        new RegExp(`^${field}:\\s*([^\\n]+)`, 'm'),
    ];

    for (const pattern of patterns) {
        const match = frontmatter.match(pattern);
        if (match) {
            return String(match[1] || '').trim();
        }
    }

    return '';
}

function readTags(frontmatter) {
    const inlineMatch = frontmatter.match(/^tags:\s*\[(.*)\]/m);
    if (inlineMatch) {
        return inlineMatch[1]
            .split(',')
            .map((tag) => tag.replace(/^['"]|['"]$/g, '').trim())
            .filter(Boolean);
    }

    const blockMatch = frontmatter.match(/^tags:\s*\r?\n((?:\s*-\s.*\r?\n?)*)/m);
    if (!blockMatch) {
        return [];
    }

    return blockMatch[1]
        .split(/\r?\n/)
        .map((line) => line.match(/^\s*-\s*(.*)$/))
        .filter(Boolean)
        .map((match) => match[1].replace(/^['"]|['"]$/g, '').trim())
        .filter(Boolean);
}

function parseNewsFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = extractFrontmatter(content);

    return {
        path: filePath,
        title: readScalar(frontmatter, 'title'),
        summary: readScalar(frontmatter, 'summary'),
        date: readScalar(frontmatter, 'date'),
        sourceUrl: readScalar(frontmatter, 'sourceUrl'),
        score: Number(readScalar(frontmatter, 'score') || 0),
        sourceCount: Number(readScalar(frontmatter, 'sourceCount') || 1),
        tags: readTags(frontmatter),
    };
}

function toTrash(filePath) {
    const escaped = filePath.replace(/'/g, "''");
    const command = [
        'Add-Type -AssemblyName Microsoft.VisualBasic',
        `[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile('${escaped}', [Microsoft.VisualBasic.FileIO.UIOption]::OnlyErrorDialogs, [Microsoft.VisualBasic.FileIO.RecycleOption]::SendToRecycleBin)`,
    ].join('; ');

    execFileSync('powershell.exe', ['-NoProfile', '-Command', command], {
        stdio: 'ignore',
    });
}

function main() {
    const args = new Set(process.argv.slice(2));
    const dryRun = args.has('--dry-run');
    const files = fs.readdirSync(NEWS_DIR)
        .filter((file) => file.endsWith('.md'))
        .map((file) => path.join(NEWS_DIR, file));

    const pruneTargets = files
        .map((filePath) => parseNewsFile(filePath))
        .filter((entry) => shouldPruneNews(entry));

    if (pruneTargets.length === 0) {
        console.log('No news files to prune.');
        return;
    }

    for (const entry of pruneTargets) {
        const relativePath = path.relative(NEWS_DIR, entry.path);
        if (dryRun) {
            console.log(`[dry-run] ${relativePath}`);
            continue;
        }

        toTrash(entry.path);
        console.log(`Pruned ${relativePath}`);
    }

    console.log(`${dryRun ? 'Would prune' : 'Pruned'} ${pruneTargets.length} news files.`);
}

main();
