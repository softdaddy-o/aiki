#!/usr/bin/env node

const { failScriptWriting } = require('./lib/llm-only-writing.cjs');

failScriptWriting('scripts/aiki-sync-news-factcheck.cjs', 'news-review or an LLM-assisted fact-check rewrite');
