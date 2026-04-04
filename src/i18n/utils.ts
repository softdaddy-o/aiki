import ko from './ko.json';
import en from './en.json';

const translations: Record<string, Record<string, string>> = { ko, en };

export function t(lang: string, key: string): string {
    return translations[lang]?.[key] ?? translations['ko'][key] ?? key;
}

export function getLocaleFromUrl(url: URL): string {
    const [, locale] = url.pathname.split('/');
    if (locale === 'en') return 'en';
    return 'ko';
}
