#!/usr/bin/env node

const { failScriptWriting } = require('./lib/llm-only-writing.cjs');

failScriptWriting('scripts/fix-reader-value-yaml.cjs', 'an LLM rewrite that preserves existing facts');
