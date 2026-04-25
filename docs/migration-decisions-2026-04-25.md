# 2026-04-25 Guide/Tone Migration Decisions

- common 2.3.0 adds a public-copy ban for the internal reader persona names `네니엘`, `네니얼`, `내니엘`, `내니얼`.
- Scanned rendered content fields and markdown bodies before migration: 0 forbidden persona-name hit(s).
- Because the new common rule had zero content hits and wiki/news 3.1.2 is a dependency/example patch, this migration updates guideVersion, formatVersion, and reviewStamp metadata mechanically.
- Legacy news files without h2 sections are wrapped into three formatVersion 2 sections while preserving paragraph order and body text.
- Decision item for later human review: confirm whether mechanically refreshed reviewStamp values should remain accepted for patch/minor guide-only migrations, or whether the project wants a separate stamp type for mechanical migrations.
