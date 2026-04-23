#!/usr/bin/env node

const { failScriptWriting } = require('./lib/llm-only-writing.cjs');

failScriptWriting('scripts/aiki-backfill-reader-value.cjs', 'the review panel or an LLM rewrite command');
