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
    tags,
    sourceMeta,
    metricValue,
    license,
    renderSection = true,
}: ShowcaseMetaHeroProps) {
    const content = (
        <>
            <div className={heroCopyClassName}>
                <h1>{title}</h1>
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
    );

    if (!renderSection) return content;

    return (
        <section className={className} id={id}>
            {content}
        </section>
    );
}
