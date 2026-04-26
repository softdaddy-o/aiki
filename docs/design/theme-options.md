# AIKI visual theme options

## Option 1: Bold editorial knowledge site

Status: preserved as option 1.

Reference direction:
- Future Fur style landing page: oversized wordmark typography, bright cyan rules, cream/white surface, minimal shadow, product-spec labeling.
- Applied locally to the main Korean pages: home, wiki index/detail, news index/detail, projects index/detail, model profile, search, fact check, backlinks, timeline, and card components.

Preserved artifacts:
- Reapply patch: `.harness/theme-options/option-1-bold-editorial.patch`
- Local screenshots: `test-results/visual-preview-option1/`

Design notes:
- Default visual mode is light editorial.
- The design language is rule/grid driven rather than card/shadow driven.
- Cyan becomes the primary information architecture color across news, wiki, and project surfaces.
- This is not yet a clean theme-token-only system. It includes layout and component CSS changes, so future comparisons should treat it as a full visual concept.

## Option 2: Soft spatial knowledge system

Status: applied as the current preview direction.

Reference direction:
- 2026 soft spatial UI: airy aurora fields, frosted navigation, glass bento surfaces, calm gradients, and high-contrast modern sans typography.
- Applied locally to the main Korean pages: home, news index/detail, wiki index/detail, model profile, projects index/detail, search, fact check, timeline, zoom tabs, and card components.

Preserved artifacts:
- Reapply patch: `.harness/theme-options/option-2-soft-spatial.patch`
- Local screenshots: `test-results/visual-preview-option2/`

Design notes:
- Default visual mode is light, spacious, and atmospheric.
- Page structure uses frosted panels and bento cards rather than hard editorial rules.
- The model profile keeps the user's requested context wording pattern and makes context/memory the first visual card.
- This is a full visual concept patch, not a token-only theme. Future Astro theme extraction should split variables, shared page chrome, and page-specific component rules.
