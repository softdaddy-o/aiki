interface ShowcaseSectionItem<T extends string> {
    id: T;
    label: string;
    description: string;
}

interface ShowcaseSectionNavProps<T extends string> {
    items: readonly ShowcaseSectionItem<T>[];
    activeId: T;
    onSelect: (id: T) => void;
}

export default function ShowcaseSectionNav<T extends string>({
    items,
    activeId,
    onSelect,
}: ShowcaseSectionNavProps<T>) {
    return (
        <nav className="showcase-section-nav" aria-label="Showcase section navigation">
            <style>{navCss}</style>
            {items.map((item, index) => (
                <button
                    aria-current={activeId === item.id ? 'true' : undefined}
                    className={activeId === item.id ? 'active' : ''}
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item.id)}
                >
                    <span className="nav-index">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                        <strong>{item.label}</strong>
                        <em>{item.description}</em>
                    </span>
                </button>
            ))}
        </nav>
    );
}

const navCss = `
.showcase-section-nav {
    position: sticky;
    top: 96px;
    z-index: 20;
    align-self: start;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: color-mix(in srgb, var(--color-surface) 88%, transparent);
    box-shadow: 0 18px 42px rgba(0, 0, 0, 0.14);
    backdrop-filter: blur(18px);
}
.showcase-section-nav button {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    min-height: 56px;
    padding: 8px 10px;
    border: 1px solid transparent;
    border-radius: 7px;
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
    font: inherit;
    text-align: left;
    transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}
.showcase-section-nav button:hover,
.showcase-section-nav button:focus-visible {
    border-color: color-mix(in srgb, var(--color-projects) 40%, var(--color-border));
    background: color-mix(in srgb, var(--color-projects) 9%, transparent);
    color: var(--color-text);
    outline: none;
}
.showcase-section-nav button.active {
    border-color: var(--color-projects);
    background: color-mix(in srgb, var(--color-projects) 14%, var(--color-surface));
    color: var(--color-text);
}
.showcase-section-nav .nav-index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: var(--color-surface-alt);
    color: var(--color-projects);
    flex-shrink: 0;
    font-size: 0.72rem;
    font-weight: 850;
}
.showcase-section-nav strong,
.showcase-section-nav em {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.showcase-section-nav strong {
    font-size: 0.82rem;
}
.showcase-section-nav em {
    margin-top: 2px;
    font-size: 0.72rem;
    font-style: normal;
    color: var(--color-text-muted);
}
@media (max-width: 900px) {
    .showcase-section-nav {
        position: sticky;
        top: 72px;
        flex-direction: row;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        scroll-snap-type: x proximity;
    }
    .showcase-section-nav button {
        scroll-snap-align: start;
    }
}
@media (max-width: 640px) {
    .showcase-section-nav {
        margin-right: -4px;
        margin-left: -4px;
    }
    .showcase-section-nav button {
        min-height: 52px;
    }
}
`;
