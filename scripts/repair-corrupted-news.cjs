#!/usr/bin/env node

const { failScriptWriting } = require('./lib/llm-only-writing.cjs');

failScriptWriting('scripts/repair-corrupted-news.cjs', 'an LLM rewrite after repairing the source data');
