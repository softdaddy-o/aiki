const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');

const AGENTS_DIR = path.resolve(__dirname, '..', '..', 'agents');
const REGISTRY_PATH = path.join(AGENTS_DIR, '_registry.yaml');

let registryCache = null;

function getRegistry() {
    if (registryCache) return registryCache;

    if (!fs.existsSync(REGISTRY_PATH)) {
        throw new Error(`Agent registry not found: ${REGISTRY_PATH}`);
    }

    const raw = fs.readFileSync(REGISTRY_PATH, 'utf8');
    registryCache = yaml.load(raw);
    return registryCache;
}

function clearCache() {
    registryCache = null;
}

function loadAgent(id) {
    const registry = getRegistry();
    const entry = registry.agents && registry.agents[id];
    if (!entry) {
        throw new Error(`Agent "${id}" not found in registry`);
    }

    const filePath = path.join(AGENTS_DIR, entry.path);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Agent file not found: ${filePath}`);
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const meta = parsed.data || {};

    return {
        id: meta.id || id,
        name: meta.name || id,
        version: meta.version || '0.0.0',
        lastUpdated: meta.lastUpdated || null,
        category: meta.category || entry.category,
        input: meta.input || {},
        output: meta.output || {},
        hints: meta.hints || {},
        systemPrompt: parsed.content.trim(),
        filePath,
    };
}

function loadPanel(panelName) {
    const registry = getRegistry();
    const panelDef = registry.panels && registry.panels[panelName];
    if (!panelDef) {
        throw new Error(`Panel "${panelName}" not found in registry`);
    }

    const agents = (panelDef.agents || []).map((agentId) => loadAgent(agentId));

    return {
        name: panelName,
        version: panelDef.version,
        description: panelDef.description,
        agents,
        execution: panelDef.execution || 'parallel',
        verdictRule: panelDef.verdictRule || 'all_pass',
        outputSchema: panelDef.outputSchema || null,
    };
}

function loadSchema(schemaName) {
    const filePath = path.join(AGENTS_DIR, 'schemas', `${schemaName}.json`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Schema "${schemaName}" not found at ${filePath}`);
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

module.exports = {
    loadAgent,
    loadPanel,
    loadSchema,
    getRegistry,
    clearCache,
};
