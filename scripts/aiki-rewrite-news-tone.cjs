#!/usr/bin/env node

const { failScriptWriting } = require('./lib/llm-only-writing.cjs');

failScriptWriting('scripts/aiki-rewrite-news-tone.cjs', 'news-review or a targeted LLM rewrite');
