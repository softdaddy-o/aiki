const { failScriptWriting } = require('./llm-only-writing.cjs');

function normalizeList(values) {
    return Array.isArray(values)
        ? values
            .map((value) => String(value || '').trim())
            .filter(Boolean)
        : [];
}

function hasDetailedItems(check) {
    return normalizeList(check && check.items).length >= 3;
}

module.exports = {
    buildNewsFactChecks: () => failScriptWriting(
        'buildNewsFactChecks',
        'Fact-check prose must come from the LLM pipeline, not deterministic scripts.',
    ),
    hasDetailedItems,
};
