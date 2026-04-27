interface ShowcaseSourceMeta {
    provider: string;
    title: string;
    itemLabel: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
}

interface NemotronPersonasKoreaShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
}

export default function NemotronPersonasKoreaShowcase({
    slug,
    title,
    summary,
    tags,
    sourceMeta,
    metricValue,
    license,
}: NemotronPersonasKoreaShowcaseProps) {
    return (
        <section className="npk-main">
            <h2>{title}</h2>
            <p>{summary}</p>
            <p>slug: {slug}</p>
            <p>{sourceMeta.provider}</p>
            <p>metric: {metricValue}</p>
            <p>license: {license}</p>
            <p>tags: {tags.join(', ')}</p>
        </section>
    );
}
