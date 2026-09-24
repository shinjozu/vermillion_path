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

# Verification record

## Automated

Command: `node --test --test-isolation=none test/*.test.mjs`

28 passing checks, zero failures in the latest full run. Includes:

- Every creator option validates; repeated creation does not stack stats; prototype-key choices rejected.
- Complete justice, mercy, trade, domination, wandering and defeat outcomes.
- Second Heart once-only survival and save reload.
- Duplicate reward/learning rejection, remote teaching rejection, failed transaction immutability.
- Blank-canvas free lesson, cultivation prerequisites and qi costs.
- Time-driven courier death and medicine relocation.
- Unknown/ambiguous action handling; no state change from OOC text.
- Corrupt checksum, future version and invalid stats rejection; backup recovery.
- Two-technique resource accounting and learned-technique restrictions.
- Retreat health cost and preserved main quest.
- Generated legal-action sequences across nine builds, validating and round-tripping state after each step.
- Tone expression changes and anti-farming relationship behavior.
- Seed reproducibility, encounter reward uniqueness and traveler memory.
- Twenty successive district transitions, preserving character and valid saves.
- Open-ended approach costs/checks and separate road-combat rewards.
- Local endpoint restrictions, unsupported AI action rejection, bounded mock request, usage accounting, malformed response, outage/retry, cancellation, concurrency, disabled online spending and interpreted tone.

## Browser interaction checks

Used separate localhost test chronicles (`Test Lin`, `Combat Test`); the earlier 127.0.0.1 save was not overwritten by these test runs.

- Female + jade palette and both blank-canvas choices displayed correctly; starting insight and resources matched the engine.
- Learned the free first lesson via the actual button.
- Threaten → hostile portrait; Reassure → warm portrait; lost trust did not reset for free.
- 390 × 844 phone viewport: no horizontal overflow; visible buttons at least 44px tall.
- Completed rescue/evidence/wedge/ledger/tribunal justice route; reloaded and confirmed the conclusion and courier survival.
- Completed a combat route with real Strike and technique buttons. Cinder Palm counter against Guard dealt 13 damage and took 0 return damage in the tested build; victory granted the ledger.
- Desktop inspection confirmed chronicle, portrait, quick actions and composer share one outer panel.
- Reduced-motion control produced computed animation name `none`.
- Connection to a deliberately unavailable local endpoint failed visibly while preserving offline play.
- Text export produced a version-3 checksummed save; malformed text was rejected; valid text restored through the in-game confirmation.
- Continued a chapter-two character into White Heron District, then completed a seeded escort encounter with the stated qi/time cost and reward.
- No console errors were found in the inspected playthroughs.

## Findings fixed during verification

- Native browser confirmation dialogs could stall the in-app browser. Replaced with in-game modal confirmation.
- Updated later-district travel text to avoid describing the first chapter’s named NPCs as if they were present everywhere.
- Preserved open character/training panels during action renders.
- Added mobile shortcuts to reduce scrolling between actions, map and sheet.
- Removed non-canonical AI prose from authoritative context; narrator receives confirmed engine events.

## Not verified

Real model prose/compatibility, a live paid provider, physical devices, all file chooser behaviors, every visual animation on every browser, full accessibility audit, cross-tab concurrent save conflict handling. The native file-download event timed out in this browser; use the tested text-transfer fallback if needed.

## 2026-09-23 progression and jianghu checks
Run `node --test --test-isolation=none test/*.test.mjs`: 74 passing. See growth.test.mjs and jianghu.test.mjs for new rule coverage. Browser checks used only ?test=1 session storage. Recovery fixture explicitly sets low HP to reach a reproducible defeat; this is test setup, not a gameplay action. Imported through actual save UI; clinic treatment, traveler help and reload verified. Local narration connection verified; cancel before interpretation completion verified. 390px viewport fits and reduced motion computes animation:none. Final revised AI prompt quality and full browser outage/stale tests remain pending.

Further checks: 80 tests pass after medicine, lesson and unsupported-discovery coverage. Browser: clinic diagnosis, consultation and successful tonic treatment; intentional endpoint port 9 outage gave offline fallback; restoring port 1234 and Retry returned Connected. Region route to Nine Wells advanced three turns, selected correct desert background, had no rain layer and no phone overflow. Narration still invented a formula before the new limited discovery guard; this is recorded as a found defect, not a successful prose test.
