#!/usr/bin/env node

const { failScriptWriting } = require('./lib/llm-only-writing.cjs');

failScriptWriting('scripts/aiki-backfill-range.cjs', 'the news LLM pipeline');
