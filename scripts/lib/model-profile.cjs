const { failScriptWriting } = require('./llm-only-writing.cjs');

module.exports = {
    buildModelProfile: () => failScriptWriting(
        'buildModelProfile',
        'modelProfile prose must come from the LLM content pipeline.',
    ),
    buildModelFactChecks: () => failScriptWriting(
        'buildModelFactChecks',
        'Model fact-check prose must come from the LLM content pipeline.',
    ),
};
