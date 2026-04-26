import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface Term {
    slug: string;
    title: string;
    category: string;
}

interface Props {
    activeTerm?: string;
    terms: Term[];
}

interface LayerDef {
    key: string;
    label: string;
}

const layers: LayerDef[] = [
    { key: 'tool', label: '응용 (Application)' },
    { key: 'technique', label: '기법 (Technique)' },
    { key: 'framework', label: '프레임워크 (Framework)' },
    { key: 'model', label: '모델 (Model)' },
    { key: 'concept', label: '개념 (Concept)' },
];

const styles: Record<string, CSSProperties> = {
    container: {
        background: 'var(--tsm-surface)',
        borderRadius: '8px',
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 14px 32px var(--tsm-shadow), inset 0 0 0 1px var(--tsm-outline)',
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: '110px minmax(0, 1fr)',
        gap: '0',
        alignItems: 'start',
        padding: '12px',
    },
    labelsColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
    },
    labelRow: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0',
        padding: '8px 10px',
        minHeight: '42px',
    },
    layerLabel: {
        fontSize: '10px',
        color: 'var(--tsm-label)',
        whiteSpace: 'nowrap',
        lineHeight: 1.9,
        opacity: 0.84,
    },
    scrollArea: {
        overflowX: 'auto',
        overflowY: 'hidden',
        borderRadius: '0',
        paddingBottom: '0',
    },
    rows: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        width: 'max-content',
        minWidth: '100%',
    },
    termsRow: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0',
        padding: '8px 10px',
        minHeight: '42px',
        minWidth: '100%',
        gap: '4px',
        width: 'max-content',
    },
    emptyState: {
        fontSize: '11px',
        color: 'var(--tsm-empty)',
        opacity: 0.88,
    },
    pill: {
        padding: '4px 11px',
        borderRadius: '999px',
        fontSize: '11px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        border: '1px solid transparent',
        position: 'relative',
        whiteSpace: 'nowrap',
        lineHeight: 1.4,
        flexShrink: 0,
        color: 'var(--tsm-pill-text)',
    },
};

function getLayerColorVar(layerKey: string, token: 'row' | 'pill' | 'border' | 'glow') {
    return `var(--tsm-${layerKey}-${token})`;
}

export default function TechStackMap({ activeTerm, terms }: Props) {
    const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
    const activePillRef = useRef<HTMLAnchorElement | null>(null);

    const termsByCategory = new Map<string, Term[]>();
    for (const layer of layers) {
        termsByCategory.set(layer.key, []);
    }
    for (const term of terms) {
        const list = termsByCategory.get(term.category);
        if (list) {
            list.push(term);
        }
    }

    useEffect(() => {
        const activePill = activePillRef.current;
        if (!activePill) {
            return;
        }

        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        let frameId = 0;

        const centerActivePill = () => {
            const scrollArea = activePill.closest('[data-map-scroll-area="true"]');
            if (!(scrollArea instanceof HTMLElement)) {
                return;
            }

            const pillRect = activePill.getBoundingClientRect();
            const areaRect = scrollArea.getBoundingClientRect();
            const nextLeft = scrollArea.scrollLeft + (pillRect.left - areaRect.left) - ((areaRect.width - pillRect.width) / 2);

            scrollArea.scrollTo({
                left: Math.max(0, nextLeft),
                behavior: 'smooth',
            });
        };

        frameId = requestAnimationFrame(() => {
            centerActivePill();
            timeoutId = setTimeout(centerActivePill, 140);
        });

        return () => {
            cancelAnimationFrame(frameId);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [activeTerm, terms.length]);

    return (
        <>
            <style>{`
                [data-tech-stack-map="true"] {
                    --tsm-surface: #f6f3ef;
                    --tsm-outline: rgba(71, 85, 105, 0.14);
                    --tsm-shadow: rgba(15, 23, 42, 0.08);
                    --tsm-label: #5b6472;
                    --tsm-empty: #64748b;
                    --tsm-pill-text: #334155;
                    --tsm-tool-row: #fff1e7;
                    --tsm-tool-pill: #fff8f3;
                    --tsm-tool-border: #ea580c;
                    --tsm-tool-glow: #fb923c;
                    --tsm-technique-row: #eaf8f3;
                    --tsm-technique-pill: #f4fcf8;
                    --tsm-technique-border: #0f766e;
                    --tsm-technique-glow: #2dd4bf;
                    --tsm-framework-row: #f2ecff;
                    --tsm-framework-pill: #f8f5ff;
                    --tsm-framework-border: #7c3aed;
                    --tsm-framework-glow: #a78bfa;
                    --tsm-model-row: #fff6df;
                    --tsm-model-pill: #fffbf0;
                    --tsm-model-border: #d97706;
                    --tsm-model-glow: #fbbf24;
                    --tsm-concept-row: #ebf4ff;
                    --tsm-concept-pill: #f5f9ff;
                    --tsm-concept-border: #2563eb;
                    --tsm-concept-glow: #60a5fa;
                }

                html.dark [data-tech-stack-map="true"] {
                    --tsm-surface: #0f1322;
                    --tsm-outline: rgba(148, 163, 184, 0.16);
                    --tsm-shadow: rgba(2, 6, 23, 0.34);
                    --tsm-label: #dbe4f0;
                    --tsm-empty: #cbd5e1;
                    --tsm-pill-text: #d8dee8;
                    --tsm-tool-row: #38241d;
                    --tsm-tool-pill: #493028;
                    --tsm-tool-border: #f97316;
                    --tsm-tool-glow: #fdba74;
                    --tsm-technique-row: #18322e;
                    --tsm-technique-pill: #21403c;
                    --tsm-technique-border: #14b8a6;
                    --tsm-technique-glow: #5eead4;
                    --tsm-framework-row: #2c2240;
                    --tsm-framework-pill: #382b52;
                    --tsm-framework-border: #8b5cf6;
                    --tsm-framework-glow: #c4b5fd;
                    --tsm-model-row: #3d2e18;
                    --tsm-model-pill: #4a3920;
                    --tsm-model-border: #f59e0b;
                    --tsm-model-glow: #fcd34d;
                    --tsm-concept-row: #1d3146;
                    --tsm-concept-pill: #29415a;
                    --tsm-concept-border: #60a5fa;
                    --tsm-concept-glow: #93c5fd;
                }
            `}</style>
            <div data-tech-stack-map="true" style={styles.container}>
                <div style={styles.layout}>
                    <div style={styles.labelsColumn}>
                        {layers.map((layer) => (
                            <div
                                key={`${layer.key}-label`}
                                style={{
                                    ...styles.labelRow,
                                    background: getLayerColorVar(layer.key, 'row'),
                                }}
                            >
                                <span style={styles.layerLabel}>{layer.label}</span>
                            </div>
                        ))}
                    </div>
                    <div style={styles.scrollArea} data-map-scroll-area="true">
                        <div style={styles.rows}>
                            {layers.map((layer) => {
                                const layerTerms = termsByCategory.get(layer.key) || [];
                                const rowColor = getLayerColorVar(layer.key, 'row');
                                const pillColor = getLayerColorVar(layer.key, 'pill');
                                const borderColor = getLayerColorVar(layer.key, 'border');
                                const glowColor = getLayerColorVar(layer.key, 'glow');
                                const activeBackground = `color-mix(in srgb, ${borderColor} 74%, ${pillColor})`;

                                return (
                                    <div
                                        key={layer.key}
                                        style={{
                                            ...styles.termsRow,
                                            background: rowColor,
                                        }}
                                    >
                                        {layerTerms.length === 0 && (
                                            <span style={styles.emptyState}>아직 연결된 용어가 없어.</span>
                                        )}
                                        {layerTerms.map((term) => {
                                            const isActive = term.slug === activeTerm;
                                            const isHovered = term.slug === hoveredTerm;

                                            const pillStyle: CSSProperties = {
                                                ...styles.pill,
                                                background: isActive ? activeBackground : pillColor,
                                                color: isActive ? '#ffffff' : 'var(--tsm-pill-text)',
                                                border: isActive
                                                    ? `1.5px solid ${glowColor}`
                                                    : `1px solid color-mix(in srgb, ${borderColor} 65%, transparent)`,
                                                boxShadow: isActive
                                                    ? `0 0 0 1px color-mix(in srgb, ${glowColor} 30%, transparent), 0 0 16px color-mix(in srgb, ${glowColor} 28%, transparent)`
                                                    : isHovered
                                                        ? `0 6px 14px color-mix(in srgb, ${glowColor} 16%, transparent)`
                                                        : 'none',
                                                transform: isHovered && !isActive ? 'translateY(-1px)' : 'none',
                                            };

                                            return (
                                                <a
                                                    key={term.slug}
                                                    href={`/ko/wiki/${term.slug}/`}
                                                    style={pillStyle}
                                                    title={term.title}
                                                    ref={isActive ? activePillRef : undefined}
                                                    data-term-slug={term.slug}
                                                    onMouseEnter={() => setHoveredTerm(term.slug)}
                                                    onMouseLeave={() => setHoveredTerm(null)}
                                                    aria-current={isActive ? 'page' : undefined}
                                                >
                                                    {isActive && (
                                                        <span
                                                            style={{
                                                                display: 'inline-block',
                                                                width: '5px',
                                                                height: '5px',
                                                                borderRadius: '50%',
                                                                background: glowColor,
                                                                marginRight: '6px',
                                                                verticalAlign: 'middle',
                                                            }}
                                                        />
                                                    )}
                                                    {term.title}
                                                </a>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
