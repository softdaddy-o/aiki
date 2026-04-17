#!/usr/bin/env node

const path = require('path');

const {
    BACKLOG_FILE,
    REPORT_FILE,
    refreshWikiDiscoveryBacklog,
} = require('./lib/wiki-discovery-backlog.cjs');

const ROOT = path.resolve(__dirname, '..');

function main() {
    const { backlog, discovered } = refreshWikiDiscoveryBacklog({
        rootDir: ROOT,
        write: true,
        writeReport: true,
    });

    const pending = backlog.items.filter((item) => item.status === 'pending').length;
    console.log(
        `discovered=${discovered.length} pending=${pending} backlog=${path.posix.normalize(BACKLOG_FILE)} report=${path.posix.normalize(REPORT_FILE)}`,
    );
}

main();
