function titleOf(entry) {
    return String(entry?.data?.title || '');
}

function toNumber(value) {
    const number = Number(value || 0);
    return Number.isFinite(number) ? number : 0;
}

function toTime(value) {
    if (!value) return 0;
    const time = new Date(value).getTime();
    return Number.isFinite(time) ? time : 0;
}

function byTitle(left, right) {
    return titleOf(left).localeCompare(titleOf(right), 'ko');
}

export function projectPopularity(entry) {
    return toNumber(entry?.data?.sourceMetric ?? entry?.data?.stars);
}

export function projectRecency(entry) {
    return toTime(entry?.data?.date);
}

export function wikiPopularity(entry) {
    return toNumber(entry?.data?.mentionCount);
}

export function wikiRecency(entry) {
    return toTime(entry?.data?.firstMentioned);
}

export function sortProjectsByPopular(entries) {
    return [...entries].sort((left, right) => (
        projectPopularity(right) - projectPopularity(left)
        || byTitle(left, right)
    ));
}

export function sortProjectsByRecent(entries) {
    return [...entries].sort((left, right) => (
        projectRecency(right) - projectRecency(left)
        || projectPopularity(right) - projectPopularity(left)
        || byTitle(left, right)
    ));
}

export function sortWikiByPopular(entries) {
    return [...entries].sort((left, right) => (
        wikiPopularity(right) - wikiPopularity(left)
        || byTitle(left, right)
    ));
}

export function sortWikiByRecent(entries) {
    return [...entries].sort((left, right) => (
        wikiRecency(right) - wikiRecency(left)
        || wikiPopularity(right) - wikiPopularity(left)
        || byTitle(left, right)
    ));
}
