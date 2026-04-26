interface SharedShowcaseChromeOptions {
    rootClass: string;
    heroClass: string;
    panelClass: string;
    heroCopyClass: string;
    metaGridClass: string;
    metaCardClass: string;
    metaSourceCardClass: string;
    metaMarkClass: string;
    metaCopyClass: string;
    tagRowClass: string;
    heroCopyMaxWidth?: string;
}

const selector = (className: string) => `.${className}`;

export function createSharedShowcaseChromeCss({
    rootClass,
    heroClass,
    panelClass,
    heroCopyClass,
    metaGridClass,
    metaCardClass,
    metaSourceCardClass,
    metaMarkClass,
    metaCopyClass,
    tagRowClass,
    heroCopyMaxWidth = '720px',
}: SharedShowcaseChromeOptions): string {
    return `
${selector(rootClass)}{display:contents;color:var(--color-text)}
${selector(heroClass)},${selector(panelClass)}{border:1px solid var(--color-border);background:var(--color-surface);border-radius:12px;padding:20px;min-width:0;box-shadow:var(--shadow-card)}
${selector(heroClass)}{display:grid;gap:16px}
${selector(heroCopyClass)} h1{margin:0 0 10px;color:var(--color-text);font-size:clamp(2rem,4vw,3.2rem);line-height:.98;letter-spacing:0;text-transform:none;overflow-wrap:anywhere}
${selector(heroCopyClass)} p{max-width:${heroCopyMaxWidth};margin:0;color:var(--color-text-muted);line-height:1.7}
${selector(metaGridClass)}{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:12px}
${selector(metaCardClass)}{display:grid;gap:10px;align-content:start;min-width:0;padding:14px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface-alt)}
${selector(metaSourceCardClass)}{grid-template-columns:auto minmax(0,1fr);align-items:center}
${selector(metaMarkClass)}{display:inline-grid;place-items:center;width:42px;height:42px;border-radius:10px;background:color-mix(in srgb,var(--color-projects) 14%,transparent);color:var(--color-projects);font-size:1.1rem;font-weight:900}
${selector(metaCopyClass)}{display:grid;gap:4px;min-width:0}
${selector(metaCardClass)} span,${selector(metaCopyClass)} span{color:var(--color-text-muted);font-size:.76rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
${selector(metaCardClass)} strong,${selector(metaCopyClass)} strong{overflow-wrap:anywhere;font-family:var(--font-heading);font-size:1.02rem;line-height:1.25}
${selector(tagRowClass)}{display:flex;flex-wrap:wrap;gap:8px}
${selector(tagRowClass)} span{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
@media (max-width:640px){${selector(heroClass)},${selector(panelClass)}{padding:14px}${selector(metaGridClass)}{grid-template-columns:minmax(0,1fr)}}
`;
}
