interface ShowcaseSourceMeta {
    provider: string;
    itemLabel: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
}

interface ShowcaseMetaHeroProps {
    id: string;
    className: string;
    heroCopyClassName: string;
    metaGridClassName: string;
    metaCardClassName: string;
    metaSourceCardClassName: string;
    metaMarkClassName: string;
    metaCopyClassName: string;
    tagRowClassName: string;
    title: string;
    summary?: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
    renderSection?: boolean;
}

export default function ShowcaseMetaHero({
    id,
    className,
    heroCopyClassName,
    metaGridClassName,
    metaCardClassName,
    metaSourceCardClassName,
    metaMarkClassName,
    metaCopyClassName,
    tagRowClassName,
    title,
    summary,
    tags,
    sourceMeta,
    metricValue,
    license,
    renderSection = true,
}: ShowcaseMetaHeroProps) {
    const content = (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <span
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        minHeight: '30px',
                        padding: '0 12px',
                        borderRadius: '999px',
                        background: 'color-mix(in srgb, var(--color-projects) 14%, transparent)',
                        color: 'var(--color-projects)',
                        fontSize: '.74rem',
                        fontWeight: 900,
                        letterSpacing: '.12em',
                        textTransform: 'uppercase',
                    }}
                >
                    Interactive Showcase
                </span>
            </div>

            <div className={heroCopyClassName}>
                <h1>{title}</h1>
                {summary ? <p>{summary}</p> : null}
            </div>

            <div className={metaGridClassName}>
                <article className={`${metaCardClassName} ${metaSourceCardClassName} ${sourceMeta.className}`.trim()}>
                    <div className={metaMarkClassName}>{sourceMeta.mark}</div>
                    <div className={metaCopyClassName}>
                        <span>{sourceMeta.provider}</span>
                        <strong>{sourceMeta.path}</strong>
                    </div>
                </article>
                <article className={metaCardClassName}>
                    <span>{sourceMeta.metricLabel}</span>
                    <strong>{metricValue}</strong>
                </article>
                <article className={metaCardClassName}>
                    <span>License</span>
                    <strong>{license}</strong>
                </article>
            </div>

            {tags.length > 0 && (
                <div className={tagRowClassName}>
                    {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            )}
        </>
    );

    if (!renderSection) return content;

    return (
        <section className={className} id={id}>
            {content}
        </section>
    );
}
