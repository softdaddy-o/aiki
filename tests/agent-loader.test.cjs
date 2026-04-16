const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');

describe('agent-loader', () => {
    let loader;

    before(() => {
        loader = require('../scripts/lib/agent-loader.cjs');
    });

    describe('loadAgent', () => {
        it('loads an agent by id and returns parsed structure', () => {
            const agent = loader.loadAgent('beginner-editor');
            assert.strictEqual(agent.id, 'beginner-editor');
            assert.ok(agent.version, 'should have a version');
            assert.ok(agent.systemPrompt, 'should have systemPrompt');
            assert.ok(agent.systemPrompt.length > 100, 'systemPrompt should be substantial');
            assert.ok(agent.category, 'should have category');
        });

        it('throws for unknown agent id', () => {
            assert.throws(() => loader.loadAgent('nonexistent-agent'), /not found/i);
        });

        it('returns input and output schema refs', () => {
            const agent = loader.loadAgent('beginner-editor');
            assert.ok(agent.input, 'should have input');
            assert.ok(agent.input.schema, 'should have input.schema');
            assert.ok(agent.output, 'should have output');
            assert.ok(agent.output.schema, 'should have output.schema');
        });
    });

    describe('loadPanel', () => {
        it('loads a panel by name with all agents', () => {
            const panel = loader.loadPanel('wiki-review');
            assert.strictEqual(panel.agents.length, 5);
            assert.strictEqual(panel.verdictRule, 'all_pass');
            assert.ok(panel.version);
        });

        it('each agent in panel has systemPrompt', () => {
            const panel = loader.loadPanel('wiki-review');
            for (const agent of panel.agents) {
                assert.ok(agent.systemPrompt, `${agent.id} should have systemPrompt`);
            }
        });

        it('loads news and project review panels', () => {
            assert.deepStrictEqual(
                loader.loadPanel('news-review').agents.map((agent) => agent.id),
                ['beginner-editor', 'fact-checker', 'skeptical-critic', 'tone-editor', 'structure-editor'],
            );
            assert.deepStrictEqual(
                loader.loadPanel('project-review').agents.map((agent) => agent.id),
                ['beginner-editor', 'fact-checker', 'skeptical-critic', 'tone-editor', 'structure-editor'],
            );
        });

        it('throws for unknown panel name', () => {
            assert.throws(() => loader.loadPanel('nonexistent-panel'), /not found/i);
        });
    });

    describe('loadSchema', () => {
        it('loads a JSON schema by name', () => {
            const schema = loader.loadSchema('review-input');
            assert.strictEqual(schema.type, 'object');
            assert.ok(schema.required.includes('term'));
        });

        it('throws for unknown schema', () => {
            assert.throws(() => loader.loadSchema('nonexistent'), /not found/i);
        });
    });

    describe('getRegistry', () => {
        it('returns parsed registry', () => {
            const registry = loader.getRegistry();
            assert.ok(registry.version);
            assert.ok(registry.panels);
            assert.ok(registry.agents);
        });
    });
});
