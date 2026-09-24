# Audit of the existing prototype

Audited original `index.html`, `styles.css`, and `script.js` in the earlier `2026-09-22/de` workspace. A copy of those three files is preserved in this task's `work/original-audit` folder.

## Confirmed from source

- `select()` incremented stats on every click instead of replacing the selected choice. Unlimited stat stacking.
- Story buttons awarded reputation repeatedly, including on failed checks.
- Creator could advance without a selection; reset omitted learned techniques and scene state.
- NPC selection referenced `npcPortrait`, but no element had that ID. Also depended extensively on implicit DOM globals.
- Technique button handlers were attached before any techniques existed; buttons created later had no handlers.
- Action input was interpolated into `innerHTML`, creating a script/markup injection surface.
- Three scenes advanced on a stat threshold regardless of action meaning. The last scene had no ending.
- Health, consumable qi, inventory, quests, persistent NPC memory, cultivation and combat were absent.
- No save/load, export/import, recovery, migrations, AI provider, AI cancellation, context management or usage controls.
- Eight factions were presented beneath a heading claiming nine powers.
- NPCs were names, static quotes and CSS shapes; there were no finished character portraits or expression frames.
- There was no generated minor-NPC system or independently progressing NPC goal simulation.
- Long promotional sections displaced the actual action interface. Appended playable markup lacked matching layout styling in the inspected stylesheet.

Earlier task summaries claimed playable free-form resolution, remembered consequences and animated NPC panels. These claims exceeded the actual implementation: resolution was threshold-only, memory was a five-line log, and portraits were abstract placeholders. This audit did not execute the old prototype; runtime consequences above are source-based findings.

## Replacement foundation

The current build uses a pure transactional reducer, explicit action legality, derived character stats, resource costs, one-time reward flags, versioned validated saves and a dependency-free loopback server. All player/model text is escaped before rendering. The prototype's eight faction identities were preserved and expanded. The reference sheet is not used anywhere in the build.

## 2026-09-23 current-build audit
Baseline 36 tests passed. Principal characters had tone and memory but no personal quest lifecycle and disappeared after chapter one. Added initial arcs and explicitly remote correspondence. Browser QA previously shared normal localStorage: added isolated session-storage test mode to protect player saves. Browser testing caught and fixed an estranged NPC showing a warm portrait after reassurance. Remaining: long-term NPC arcs, recurring traveler reuse, professions, school/life/legacy systems, and live AI verification; see release gates.
