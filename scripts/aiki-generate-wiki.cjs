#!/usr/bin/env node

const { failScriptWriting } = require('./lib/llm-only-writing.cjs');

failScriptWriting('scripts/aiki-generate-wiki.cjs', 'scripts/aiki-rewrite-wiki-llm.cjs');
