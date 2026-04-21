import { useEffect, useRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import type { Zoom } from 'medium-zoom';

interface ShowcaseZoomImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'alt' | 'src' | 'className'> {
    src: string;
    alt: string;
    buttonClassName?: string;
    imgClassName?: string;
    hint?: string;
    zoomLabel?: string;
    zoomMargin?: number;
    zoomBackground?: string;
}

export const showcaseZoomImageCss = `
.showcase-zoom-trigger{position:relative;display:block;width:100%;padding:0;border:0;background:none;text-align:left;cursor:zoom-in}
.showcase-zoom-trigger:focus-visible{outline:2px solid var(--color-projects);outline-offset:4px;border-radius:14px}
.showcase-zoom-trigger img{display:block;width:100%;height:auto;pointer-events:none;user-select:none;-webkit-user-drag:none}
.showcase-zoom-hint{position:absolute;right:12px;bottom:12px;display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:rgba(15,23,42,.82);color:#fff;font-size:.74rem;font-weight:700;letter-spacing:.01em}
.medium-zoom-overlay{z-index:2147483645!important}
.medium-zoom-image--opened{z-index:2147483646!important}
@media (max-width:720px){
  .showcase-zoom-hint{right:10px;bottom:10px;font-size:.7rem}
}
`;

export default function ShowcaseZoomImage({
    src,
    alt,
    buttonClassName,
    imgClassName,
    hint = '클릭해서 확대',
    zoomLabel,
    zoomMargin = 32,
    zoomBackground = 'rgba(15, 23, 42, 0.9)',
    ...imgProps
}: ShowcaseZoomImageProps) {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const zoomRef = useRef<Zoom | null>(null);

    useEffect(() => {
        let cancelled = false;
        const target = imageRef.current;

        if (!target) {
            return;
        }

        void import('medium-zoom').then(({ default: mediumZoom }) => {
            if (cancelled) {
                return;
            }

            const zoom = mediumZoom({
                margin: zoomMargin,
                background: zoomBackground,
            });

            zoom.attach(target);
            zoomRef.current = zoom;
        });

        return () => {
            cancelled = true;

            if (zoomRef.current && target) {
                zoomRef.current.detach(target);
                zoomRef.current = null;
            }
        };
    }, [src, zoomBackground, zoomMargin]);

    const handleOpen = () => {
        if (!imageRef.current || !zoomRef.current) {
            return;
        }

        void zoomRef.current.open({ target: imageRef.current });
    };

    return (
        <button
            type="button"
            className={joinClasses('showcase-zoom-trigger', buttonClassName)}
            onClick={handleOpen}
            aria-label={zoomLabel ?? `${alt} 확대 보기`}
        >
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className={imgClassName}
                loading="lazy"
                {...imgProps}
            />
            <span className="showcase-zoom-hint" aria-hidden="true">{hint}</span>
        </button>
    );
}

function joinClasses(...parts: Array<string | undefined>) {
    return parts.filter(Boolean).join(' ');
}
