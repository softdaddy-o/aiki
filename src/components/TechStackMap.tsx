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
    color: string;
    borderColor: string;
    glowColor: string;
}

const layers: LayerDef[] = [
    { key: 'tool', label: '응용 (Application)', color: '#4a3a3c', borderColor: '#7a5a5c', glowColor: '#ff6b8a' },
    { key: 'technique', label: '기법 (Technique)', color: '#3a4a3c', borderColor: '#5a7a5c', glowColor: '#6bff8a' },
    { key: 'framework', label: '프레임워크 (Framework)', color: '#4a3a5c', borderColor: '#7a5a8c', glowColor: '#b06bff' },
    { key: 'model', label: '모델 (Model)', color: '#4a4530', borderColor: '#7a7550', glowColor: '#ffd06b' },
    { key: 'concept', label: '개념 (Concept)', color: '#3a4a5c', borderColor: '#5a7a9c', glowColor: '#6bb0ff' },
];

const styles: Record<string, CSSProperties> = {
    container: {
        background: '#0a0a1a',
        borderRadius: '8px',
        width: '100%',
        overflow: 'hidden',
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
        color: '#9ca3af',
        whiteSpace: 'nowrap',
        lineHeight: 1.9,
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
        color: '#94a3b8',
        opacity: 0.85,
    },
    pill: {
        padding: '4px 11px',
        borderRadius: '999px',
        fontSize: '11px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        border: '1px solid transparent',
        position: 'relative',
        whiteSpace: 'nowrap',
        lineHeight: 1.4,
        flexShrink: 0,
    },
};

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
        <div style={styles.container}>
            <div style={styles.layout}>
                {/* Keep row gaps and inner radii at zero so the dark container never leaks through as separator lines. */}
                <div style={styles.labelsColumn}>
                    {layers.map((layer) => (
                        <div
                            key={`${layer.key}-label`}
                            style={{
                                ...styles.labelRow,
                                background: layer.color,
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
                            return (
                                <div
                                    key={layer.key}
                                    style={{
                                        ...styles.termsRow,
                                        background: layer.color,
                                    }}
                                >
                                    {layerTerms.length === 0 && (
                                        <span style={styles.emptyState}>아직 연결된 키워드가 없습니다.</span>
                                    )}
                                    {layerTerms.map((term) => {
                                        const isActive = term.slug === activeTerm;
                                        const isHovered = term.slug === hoveredTerm;

                                        const pillStyle: CSSProperties = {
                                            ...styles.pill,
                                            background: isActive ? layer.borderColor : layer.color,
                                            color: isActive ? '#ffffff' : '#d1d5db',
                                            border: isActive
                                                ? `1.5px solid ${layer.glowColor}`
                                                : `1px solid ${layer.borderColor}`,
                                            boxShadow: isActive
                                                ? `0 0 0 1px ${layer.glowColor}33, 0 0 12px ${layer.glowColor}30`
                                                : isHovered
                                                    ? `0 0 6px ${layer.glowColor}22`
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
                                                            background: layer.glowColor,
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
    );
}
