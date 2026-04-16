import type { ReactNode } from 'react';
import { useId } from 'react';

interface TermHintProps {
    term: ReactNode;
    description: ReactNode;
}

export default function TermHint({ term, description }: TermHintProps) {
    const tooltipId = useId();

    return (
        <span className="term-hint">
            <span className="term-hint__label">{term}</span>
            <button
                aria-describedby={tooltipId}
                aria-label="용어 설명 보기"
                className="term-hint__button"
                type="button"
            >
                ?
            </button>
            <span className="term-hint__tooltip" id={tooltipId} role="tooltip">
                {description}
            </span>
        </span>
    );
}
