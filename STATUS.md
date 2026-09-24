# Milestone 0.5 — Earned scars and the wider road

Updated 2026-09-23. Playable development build; not a complete release.

## Implemented and tested
- Version 5 saves add bounded Body/Mind/Spirit/Fate practice. Successful physical work, investigation, crafting, aid, cultivation, exploration, training and victories earn relevant practice. Attribute increases require increasing effort and cap at +6 per attribute. Old saves retain their existing stats.
- Body increases strike damage and health capacity; Spirit increases qi capacity; Mind improves earned counter damage; Fate reduces retreat damage. All attributes also affect relevant checks and techniques.
- New fights snapshot earned development into four bounded threat tiers. Defeat causes treatable wounds with damage penalties. Clinic treatment spends coins and time. Deadly road challengers can kill a traveler already carrying two untreated wounds; death cannot continue into another chapter. Second Heart remains functional.
- Eight post-chapter-one regions have 64 distinct landmark names, geography, economies and dominant traditions. Players can select destinations; crossing regions costs three turns. These landmarks share eight functional area types; each province now has its own original panoramic background. Dedicated art for every individual landmark is unfinished.
- White Crane Covenant (orthodox), Reed Compact (unorthodox), Cinder Vow (demonic): distinct representatives, motives, internal disputes, economies, connections, local conversations and one-time service rewards. Original portraits integrated for all three. Standing unlocks paid technique lessons. Representatives follow 24-turn regional circuits. Full sect quest arcs and membership systems are not finished.
- Travel-triggered generated NPC meetings, local roles/goals, help/listen/leave choices, persistent trust and bounded memories. People recur when revisiting their area on a later road. Minor NPC portraits are explicitly unfinished.
- Unified action/speech textbox, contextual three-choice interface, mobile Send button, secondary actions disclosure, location art integrated into the chronicle, Cookie’s Compendium consolidating guides/world/character/memory information. Original animated black moon-marked Cookie asset; reduced-motion support.
- Field medicine is playable: paid training, examination, consultation, condition-specific treatment, complications/referral, fees, experience, cooldowns and remedies that consume district supplies. Costs, successes, failures, replay prevention and cross-region patients are tested.
- Local LM Studio selected by default, Qwen 3.5 reasoning_effort none preserved. Local requests have independent uncapped-by-default usage; paid-provider limits remain intact. Sequential calls, cancellation and late-response rejection retained.

## Verified this iteration
80 automated tests pass. New coverage: progression/caps, no greeting/rest/search farming, derived-stat validation, wound penalties and recovery, death persistence, v4 migration, province routes, sect service atomicity and replay refusal, generated traveler memory/costs/reloads. Existing complete chapter routes, 600-action campaign and AI fault tests remain passing.

Browser on isolated session saves: live local connection (69+ local requests, uncapped); exploration narration and choices; chapter transition; regional landmarks; Yun encounter and service; cancel live interpretation without applying action; import injured test save; treatment and traveler help; reload confirms resources, healed wound, scar and Spirit practice. Phone viewport 390x844: no horizontal overflow; Cookie animation disabled by Reduce motion. Live prose/choices exposed awkward wording and an unsupported trade suggestion; prompts were revised, with further live tests caught unrelated-NPC narration and invented formulas. Context was narrowed, investigation rewards made concrete, and a limited unsupported-discovery guard added. AI prose remains a quality limitation; no universal contradiction detector is claimed. Browser outage fallback and restored-endpoint retry passed. Clinic diagnosis, consultation and treatment were played through.

## Partial / next priorities
1. Continue live revised-prose/choice tests and actual stale-response browser flow. AI remains capable of wording errors; canonical rules remain visible.
2. Deeper sect arcs, differentiated encounter mechanics and authored consequences. Current new sect services share a simple sheltering mechanic.
3. Landmark-specific environment art, new NPC expression variants, sect insignia artwork, minor NPC visual identities. Three new portraits have breathing motion, not expression animation yet.
4. Expand field medicine beyond three condition families, with better patient identities and longer consequences.
5. Longer balance playthroughs with progressed builds, multiple wounds and every alignment. Current tests prove invariants, not final difficulty balance.
6. Expand crafting, faction agency and long-term purposes; school founding, succession and faction wars are not implemented.

Hourly continuation is PAUSED at the user’s request. Work here is active-session development; no unattended perpetual execution is claimed.

---
## Earlier milestone record

# Milestone 0.4 — Letters and loyalties

Delivered 2026-09-23. Release remains incomplete; see RELEASE-CHECKLIST.md.

## Implemented and verified
- Eight distinct principal-character requests, each with an opening, evidence errand, mutually exclusive choice and lasting response. Sixteen outcomes tested.
- Choices trade personal trust and insight against immediate payment and rival reputation. Betrayal closes that character's private technique teaching; reassurance cannot erase the boundary or reset the portrait to warm.
- Established valley contacts remain reachable by correspondence at shrine letter desks after chapter one. Requests, discoveries, decisions and relationships survive roads and reloads. Letter portraits are explicitly identified as correspondence, not physically present NPCs.
- Personal-thread tracking gives the actual destination and next step. Unrevealed personal evidence is excluded from narrator context until investigation.
- Isolated browser QA mode: `?test=1` uses per-tab session storage for characters, settings and backups. Normal local saves are untouched. Closing the test tab discards that session; export explicitly if needed.
- Added measurable essential release gates and separated optional expansions.

## Verification
56 Node tests pass, including all sixteen arc branches, resource failure atomicity, duplicate rejection, secret withholding, lesson refusal, cross-chapter correspondence and prior migration/long-session suites. Browser: fresh test character met Kao, opened his request, left the valley, investigated on the road, replied through the shrine on a 390px viewport, and reloaded the completed bond. Separate test character betrayed Shen and verified refusal after reassurance; the observed warm-expression mismatch was fixed and rechecked. No horizontal overflow at 390px; no captured browser console errors in the refusal test. No live AI provider calls or new art generation.

## Compatibility and limits
Version 4 saves remain compatible: arc state uses validated optional flags, defaulting to unopened in existing saves; no reset or migration is needed. Earlier v2/v3 migration paths still pass. These are eight initial short personal arcs, not complete lifetime relationships. Later reconciliation, mentorship benefits, romance, companion travel, deaths, and recurring minor-NPC reunions remain unfinished. Letter replies are explicit choices; free-form letter dialogue is not implemented. Correspondence currently arrives immediately with action time, without travel-delay simulation.

## Continuation
Hourly task heartbeat `vermilion-path-refinement` created ACTIVE on 2026-09-23 with fresh authorization. Next priority: recurring traveler identities and a complete medicine profession connected to district needs. Ask for live-provider credentials/spending only when those checks are ready; continue independent gameplay work meanwhile.

---

# Milestone 0.3 — Districts that remember

Implemented and tested on 2026-09-22. This is an expanded playable build, not the completed martial-life game.

- Eight persistent regional records track supplies, safety, prosperity, policy and recent causes. They advance every twelve watches, including while absent. Caravans and spoiled shipments affect stores; policy trades supplies against road safety. Prosperity changes labor wages; scarcity raises lodging prices.
- After chapter one, visit a market to hear a district petition. Choose relief or patrol funding, perform work at the clinic or gate, and return for payment. Each district pays once. Policies can later be changed at a cost without duplicating rewards. Projects persist across departure and reload.
- Four road enemy styles now differ in attack sequence, damage and guarding. The original Court enforcer retains its authored pattern. Combat explains the current style and numbers.
- Version 4 saves migrate versions 2 and 3. Existing character progress and procedural identities remain. New regional history begins at migration time; it does not invent retroactive actions.
- Fixed long-input memory overflow, herb capacity overflow, long seed mismatch, phantom later-chapter qigong teachers, misleading road retreat narration, promise attribution and guard qi text.
- Stale-tab writes are refused with a reload/export message. This is conflict detection, not simultaneous multiplayer or an atomic cross-process transaction.

Verification: 36 Node tests pass. Includes 600 actions across 30 road changes, repeated save round trips, both project branches, duplicate-payment rejection, transactional resource failure, regional wage/lodging effects, absent-region updates, all five enemy patterns, v3 migration, and existing first-chapter and mocked AI tests. Browser: existing Combat Test save migrated; relief project completed, payment and reload verified; policy change and watch-24 update verified; stale-tab action rejected; 390px phone action verified with no horizontal overflow. No real local or paid online model tested.

Limits: Regional simulation is a small economic/policy model, not autonomous sect politics. There is one two-branch petition per district; this is deliberately finite closure rather than unlimited renamed quests. Deeper recurring people, new authored personal arcs, professions, school founding, aging, succession, romance, injuries with mechanical recovery, and legacy remain unimplemented. No new portraits or audio in this milestone. Money from repeat work remains unbounded; broader economic balancing remains open.

Next milestone: principal NPC follow-up arcs tied to their existing memories, choices and faction loyalties; then recurring travelers and a complete profession loop. Preserve saves through migrations.

---

# Milestone status — 2026-09-22

## Delivered and verified

- Original implementation audited and preserved. Exploitable click-stacking, repeated rewards, disconnected handlers and missing persistence replaced with one transactional rules engine.
- Character creation: male/female full-body painted designs, four outfit palettes; origin, body type, affinity, unique skill, martial art, qigong and affiliation. Blank-canvas bonuses and all mechanical descriptions are visible.
- Playable first chapter: eight locations, conversations, exploration, evidence, rescue deadline, lessons, training, cultivation, resource-based combat, retreat, defeat and six conclusions.
- Ongoing journey: continue after the chapter; renewable seeded districts, four local travelers per district, five encounter families, relocation schedules, expiring opportunities, generated fights, work and general skill-checked approaches. Character state persists across roads.
- Eight distinct principal NPC illustrations, neutral/warm/hostile expressions, tone reactions and remembered speech. Eight area paintings change with travel. Restrained breathing/weather/combat effects and reduced motion.
- Single integrated gameplay panel contains chronicle, conversation, actions and composer. Phone navigation shortcuts and accessible controls.
- Version-3 saves, version-2 migration, automatic previous-save backup, checksummed export/import, validated text-transfer fallback and in-game confirmations.
- 28 automated checks pass. Browser checks passed for creation/palettes/blank bonuses, justice conclusion and reload, combat victory and counter, NPC expression changes, mobile fit/touch sizes, reduced motion, local AI connection failure, text-save validation/restoration, procedural encounter and continuation beyond the chapter.

## Implemented, not live-model verified

Local OpenAI-compatible model adapter and server-only online credentials; connection test, cancellation, manual retries, persisted request limits, bounded context and token cap. AI mode maps natural intent to legal actions, resolves rules, and automatically narrates the outcome with faction context and NPC knowledge boundaries. Mock-provider tests pass. No real local model or paid online provider was configured, so prose quality and real-provider compatibility are not claimed verified. Online spending stays disabled.

## Partial — do not describe as finished

- Ongoing play renews combinations from finite templates and existing area art. It is not infinitely unique authored content.
- “Try anything” means an open-ended attempt interpreted into supported approaches. Founding sects, property, sophisticated crafting, full faction wars and arbitrary simulation are not implemented.
- NPC relationship arcs are a foundation of tone, evidence, trust, promises and memory, not eight long authored personal campaigns. Minor-NPC archives exist; rich cross-district reunions are not implemented.
- NPC autonomy is scheduled movement plus timed crisis events, not independent strategic AI.
- Character motion is animated painted illustrations and expression changes, not skeletal rigs, full facial animation or lip synchronization. Body-type choices share the two full-body designs.
- File-download export event could not be verified in this in-app browser; text export and restore were verified. File-picker import uses the same validated decoder but was not browser-verified.
- Physical phone testing, offline service-worker installation and public hosting are not included. Preview runs only on this computer.

## Automation

The earlier hourly automation existed on disk but not in the app. Updating it failed; creating a replacement was rejected. The user then asked to leave task setup aside. No replacement is claimed active, and repeated blocked attempts were stopped.

Next work should follow BACKLOG.md and improve a concrete play session. Do not claim the broader long-term RPG vision is complete.

### Sidebar refinement — September 23
Moved Letters from the valley out of the chronicle into a compact, collapsed sidebar panel with a contact count; correspondence remains readable without large portrait cards. Roads across the jianghu now uses the same panel and two-column button grid as Paths through the rain. Browser verified both panels are 300px wide with identical 12px button text, 10px padding, and 129px button widths. App syntax check passed. Custom martial-art creation/evolution requested; implementation remains pending.

### GitHub Pages preparation
Added static build, relative asset/navigation paths, explicit offline-only Pages configuration and a tested-before-deploy GitHub Actions workflow. Added PAGES.md and AI-HOSTING.md. 96 automated tests passed. Static-browser checks verified character creation, named custom-art creation, travel, reload, phone layout and hidden unavailable AI controls. Public deployment, physical-phone checks, hosted AI and full custom-art evolution browser playtesting remain pending. Hourly automation remains paused.
