const REPO_ROOT_HINT = 'D:/srcp/aiki/docs/tone-guide-common.md';

function createDisabledWritingError(scriptName, replacement = '') {
    const nextStep = replacement
        ? ` Use ${replacement} instead.`
        : '';
    return new Error(
        `${scriptName} is disabled because scripts must not author or rewrite user-facing copy.${nextStep} Tone and prose must come from the LLM pipeline guided by ${REPO_ROOT_HINT}.`,
    );
}

function failScriptWriting(scriptName, replacement = '') {
    throw createDisabledWritingError(scriptName, replacement);
}

module.exports = {
    createDisabledWritingError,
    failScriptWriting,
};
