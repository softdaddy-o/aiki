import { useState, type CSSProperties } from 'react';

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
        padding: '16px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        fontFamily: 'inherit',
    },
    layer: {
        display: 'flex',
        alignItems: 'flex-start',
        borderRadius: '4px',
        padding: '8px 10px',
        gap: '8px',
        flexWrap: 'wrap',
    },
    layerLabel: {
        fontSize: '10px',
        color: '#888',
        whiteSpace: 'nowrap',
        minWidth: '110px',
        flexShrink: 0,
        lineHeight: 1.9,
    },
    termsContainer: {
        display: 'flex',
        gap: '4px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: '1 1 260px',
        minWidth: 0,
    },
    pill: {
        padding: '2px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        border: '1px solid transparent',
        position: 'relative' as const,
        whiteSpace: 'nowrap',
        lineHeight: 1.5,
    },
};

export default function TechStackMap({ activeTerm, terms }: Props) {
    const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

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

    return (
        <div style={styles.container}>
            {layers.map((layer) => {
                const layerTerms = termsByCategory.get(layer.key) || [];
                return (
                    <div
                        key={layer.key}
                        style={{
                            ...styles.layer,
                            background: layer.color,
                        }}
                    >
                        <span style={styles.layerLabel}>{layer.label}</span>
                        <div style={styles.termsContainer}>
                            {layerTerms.map((term) => {
                                const isActive = term.slug === activeTerm;
                                const isHovered = term.slug === hoveredTerm;

                                const pillStyle: CSSProperties = {
                                    ...styles.pill,
                                    background: isActive
                                        ? `${layer.borderColor}`
                                        : `${layer.color}`,
                                    color: isActive ? '#fff' : '#ccc',
                                    border: isActive
                                        ? `1.5px solid ${layer.glowColor}`
                                        : `1px solid ${layer.borderColor}`,
                                    boxShadow: isActive
                                        ? `0 0 8px ${layer.glowColor}40, 0 0 2px ${layer.glowColor}80`
                                        : isHovered
                                          ? `0 0 4px ${layer.glowColor}30`
                                          : 'none',
                                    transform: isHovered && !isActive ? 'translateY(-1px)' : 'none',
                                };

                                return (
                                    <a
                                        key={term.slug}
                                        href={`/ko/wiki/${term.slug}/`}
                                        style={pillStyle}
                                        title={term.title}
                                        onMouseEnter={() => setHoveredTerm(term.slug)}
                                        onMouseLeave={() => setHoveredTerm(null)}
                                    >
                                        {isActive && (
                                            <span style={{
                                                display: 'inline-block',
                                                width: '4px',
                                                height: '4px',
                                                borderRadius: '50%',
                                                background: layer.glowColor,
                                                marginRight: '4px',
                                                verticalAlign: 'middle',
                                            }} />
                                        )}
                                        {term.title}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
