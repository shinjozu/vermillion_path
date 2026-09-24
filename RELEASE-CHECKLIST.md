# Vermilion Path release gates

Updated 2026-09-23. Release is **not complete**. A checkbox requires implementation and evidence; passing unit tests alone does not establish play quality. Existing art and systems should be extended rather than rebuilt.

## Essential release scope

- [x] Character creation: seven mechanical choices, blank-art bonuses, male/female designs and palettes; derived stats cannot stack. Existing automated and browser checks.
- [x] First chapter: exploration, conversations, rescue deadline, training, cultivation, combat, nonviolent solutions and six conclusions; route and reload tests.
- [x] Campaign continuation: retained character state, renewable encounters, persistent district policies with completed projects and consequences; 600-action test.
- [ ] People: eight distinct personal arcs plus later consequences, meaningful friendship/rivalry/mentorship, recurring minor characters whose identity and important memories survive return. Initial eight two-outcome requests implemented; later relationship growth and reunions remain.
- [ ] Martial discipline: at least three mechanically different progression paths with foundations, advanced forms, movement and defense; meaningful within-realm progression; earned technique experimentation. Current eight techniques and five enemy styles are the foundation.
- [ ] Professions: at least two complete noncombat professions with acquisition, work, demand, costs, skill progression, failure and useful outputs. Generic labor/craft approaches do not satisfy this.
- [ ] School: found a school, recruit distinct disciples, teach, manage bounded income/upkeep and resolve a consequential dispute; verify both sustainable operation and recovery from failure.
- [ ] Life and legacy: adult starting age, meaningful time passage, aging, voluntary succession, next-generation creation and inherited world consequences; two-generation playthrough required.
- [ ] Evolving world: faction resources and goals cause discoverable disputes, alliances and succession; regional causes recorded; long simulation avoids permanent dead ends. Current regional stores/safety/policy simulation is partial.
- [ ] Fair agency: ambiguous actions get useful clarification; unsupported requests stay honest; loss/retreat/recovery verified; optional difficulty and narration length affect the intended systems.
- [ ] AI: local and secure online paths, memory/secret boundaries, outages/cancellation/context/usage controls and real-provider verification. Mocks pass; real providers remain unconfigured. Paid verification requires approval.
- [ ] Presentation: consistent area art and principal portraits, expressions, reduced motion, phone reading/action flow, optional controlled audio and clearly identified unfinished assets. Existing paintings and breathing effects verified; audio and richer animation remain.
- [ ] Reliability: no known critical exploit or save-loss bug; all supported migrations, recovery, export/import, isolated browser tests and long campaigns pass. Stale-tab detection exists; simultaneous atomic write protection and broader import coverage remain.
- [ ] Release playtest: complete two contrasting first-chapter builds, a long profession/school campaign, and a two-generation campaign through the actual UI, including a 390px viewport; no critical console errors or broken interactions.

## Next milestones in priority order

1. Finish and verify initial eight personal arcs and letter continuity; do not claim this completes the whole relationship gate.
2. Recurring traveler reunions and medicine profession connected to district scarcity and patients.
3. Injury recovery, martial progression and a second profession.
4. School founding, distinct disciples and sustainable administration.
5. Aging, succession and inherited world state.
6. Faction simulation depth, balance, AI verification when available, presentation and full release playtests.

## Optional after release

Additional regions and paintings; extensive romance routes; complex faction warfare; advanced alchemy and forging; large technique libraries; elaborate character rigs; more generations and campaign themes. Do not let these displace the essential gates.

## Recurring work

Hourly heartbeat `vermilion-path-refinement` was created ACTIVE on 2026-09-23 for this task. Follow the latest brief, use isolated test saves, update evidence, and avoid duplicate/overlapping work. Report unchanged blockers only when new information requires action. When all essential gates pass, report the evidence and disable continuation rather than expanding scope indefinitely.
