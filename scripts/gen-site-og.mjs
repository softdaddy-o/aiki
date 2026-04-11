#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'public', 'og', 'site-default.png');
const FONT_PATH = path.join(ROOT, 'scripts', 'assets', 'pretendard-regular.ttf');

async function main() {
    const fontData = fs.readFileSync(FONT_PATH);
    const markup = html`
        <div style="display:flex; flex-direction:column; justify-content:space-between; width:1200px; height:630px; padding:72px; background:linear-gradient(135deg, #091122 0%, #12213d 50%, #4f46e5 100%); color:#f8fafc; font-family:Pretendard;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div style="display:flex; flex-direction:column; gap:18px; max-width:760px;">
                    <div style="display:flex; align-items:center; padding:10px 18px; border-radius:999px; border:1px solid rgba(191,219,254,0.35); background:rgba(59,130,246,0.18); font-size:28px; font-weight:700; letter-spacing:0.08em; color:#dbeafe;">
                        AI NEWS HUB
                    </div>
                    <div style="display:flex; font-size:94px; font-weight:800; line-height:1; letter-spacing:-0.05em;">
                        AIKI
                    </div>
                    <div style="display:flex; font-size:36px; line-height:1.42; color:#dbe4f3;">
                        AI 뉴스, 용어, 모델 비교를 한 곳에서.
                    </div>
                </div>
                <div style="display:flex; align-items:center; justify-content:center; width:180px; height:180px; border-radius:36px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.16); font-size:88px; font-weight:800;">
                    A
                </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top:2px solid rgba(191,219,254,0.24); padding-top:24px;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div style="display:flex; font-size:28px; color:#bfdbfe;">aiki.softdaddy-o.com</div>
                    <div style="display:flex; font-size:24px; color:#cbd5e1;">Curated coverage with human verification.</div>
                </div>
                <div style="display:flex; font-size:28px; font-weight:700; color:#dbeafe;">Soft Daddy</div>
            </div>
        </div>
    `;

    const svg = await satori(markup, {
        width: 1200,
        height: 630,
        fonts: [{ name: 'Pretendard', data: fontData, weight: 400, style: 'normal' }],
    });
    const png = new Resvg(svg).render().asPng();
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, png);
    console.log(`generated ${OUT_PATH}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
