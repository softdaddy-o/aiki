import { useEffect, useState } from 'react';

interface UseShowcaseSectionNavOptions<T extends string> {
    ids: readonly T[];
    sectionPrefix: string;
    initialId?: T;
    rootMargin?: string;
}

export default function useShowcaseSectionNav<T extends string>({
    ids,
    sectionPrefix,
    initialId,
    rootMargin = '-20% 0px -55% 0px',
}: UseShowcaseSectionNavOptions<T>) {
    const [activeId, setActiveId] = useState<T>(initialId ?? ids[0]);

    useEffect(() => {
        const sections = ids
            .map((id) => document.getElementById(`${sectionPrefix}${id}`))
            .filter((section): section is HTMLElement => section instanceof HTMLElement);

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((left, right) => {
                        if (right.intersectionRatio !== left.intersectionRatio) {
                            return right.intersectionRatio - left.intersectionRatio;
                        }
                        return Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top);
                    });

                const nextEntry = visibleEntries[0];
                if (!nextEntry) return;

                const nextId = nextEntry.target.id.replace(sectionPrefix, '') as T;
                setActiveId(nextId);
            },
            {
                rootMargin,
                threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
            },
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [ids, rootMargin, sectionPrefix]);

    const scrollToSection = (id: T) => {
        setActiveId(id);
        const target = document.getElementById(`${sectionPrefix}${id}`);
        if (!target) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'start',
        });
    };

    return { activeId, scrollToSection };
}
