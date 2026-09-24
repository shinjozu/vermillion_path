Current build: **0.4 — Letters and loyalties**. Meet a principal NPC, then choose their named personal request in Available Actions. After leaving the valley, contact established acquaintances through the shrine letter desk. Your existing save remains compatible. See RELEASE-CHECKLIST.md for the concrete release scope. Browser testing uses `?test=1` to keep normal saves untouched.

Current build: **0.3 — Districts that remember**. Existing v2/v3 saves migrate automatically. After the valley, visit a market and choose **Hear the district petition**. See STATUS.md for verified scope and unfinished systems.

# Vermilion Path — The Fever Ledger

A local-first, mobile-layout murim RPG. Original prototype preserved in the task's `work/original-audit` directory; this deliverable is the maintained build.

## Run

Requires Node.js 22 or later. No npm packages or paid services required.

```powershell
node server.mjs
```

Open http://127.0.0.1:4317. The server binds only to this computer. A phone-sized layout is supported; connecting a physical phone requires a separately approved hosting/network setup. Do not expose this local server to the internet.

Run tests: `node --test --test-isolation=none test/*.test.mjs` (the non-isolated runner avoids process-spawn restrictions in this workspace).

## Play

Choose a male/female design, painted outfit palette, origin, body type, affinity, unique skill, starting martial art, qigong and affiliation. Exact mechanical effects are shown beside each choice. Appearance has no stat bonus. Blank martial arts grant insight and a free first lesson; blank qigong grants capacity and an easier first breakthrough.

Travel costs one watch. Treat Lu Wen before watch 12; medicine moves at watch 20; the ferry closes at watch 30. Search for evidence, learn from teachers, train, cultivate, and bring the ledger to the tribunal. Six endings include justice, mercy, commerce, domination, wandering and defeat.

Combat is turn based. The enemy reveals a heavy, quick or guarded intention. Guard recovers qi and blocks damage; techniques counter specific intentions. Combine up to two known techniques. Tide-Thread plus Meteor Draw adds synergy damage. There are health/qi costs, herbs, mastery and a retreat option. Defeat concludes the story rather than leaving an unusable save.

NPC Reassure / Threaten / Show evidence buttons and the Speech composer alter remembered tone and expression. The offline speech parser is deliberately bounded and keyword-based; it is not AI and does not understand arbitrary conversation. Showing evidence and repeated greetings cannot farm trust.

## Saves

Automatic version-3 saves after resolved actions; previous valid save retained as recovery backup. Export/import use a checksummed JSON envelope and schema validation. The checksum detects damage; it is not an anti-cheat signature. Save data is local to the browser origin (`localhost` and `127.0.0.1` have separate saves). Export before moving browsers or addresses. Version-2 saves from this task migrate to version 3. Other unsupported versions are rejected; the old prototype had no save format.

## Local AI

Run an OpenAI-compatible model endpoint locally, such as the compatible endpoint offered by a local model server. In Settings choose Local, enter the loopback base URL ending in `/v1`, and enter the exact installed model identifier. Test connection. The local proxy accepts loopback endpoints only and blocks redirects. No local model has been installed or downloaded for you.

## Online AI — disabled by default

Only enable after approving spending. Keep credentials in server environment variables, never in the browser, source, saves or chat. Example variable names (no key values):

```text
ENABLE_ONLINE_AI=true
ONLINE_API_KEY=<set privately in your server environment>
ONLINE_MODEL=<approved provider model identifier>
ONLINE_BASE_URL=https://api.openai.com/v1
AI_DAILY_REQUESTS=30
```

Restart the server after configuration. The adapter uses the provider's Chat Completions interface. Compatibility varies by provider/model. There have been no live paid calls in this milestone. Provider documentation used: [OpenAI Chat API](https://developers.openai.com/api/reference/cli/resources/chat) and [conversation state](https://developers.openai.com/api/docs/guides/conversation-state).

The server limits each response to 600 generated tokens, keeps bounded context, serializes requests, persists the daily request allowance, and times out after 25 seconds. Failed/cancelled requests count toward the allowance; a provider may still charge for a cancelled call. Retries are manual. Host and origin checks plus a client request header protect the loopback proxy from ordinary cross-origin browser calls. The server serves only the public directory and never returns provider credentials.

AI interprets a natural action into a supported rule action or asks a short clarification. Clear intents resolve directly without an extra confirmation dialog; the reducer validates them, then the narrator describes the confirmed result. NPC tone can drive portrait reactions. Canonical facts and resource outcomes remain engine-owned; generated prose is excluded from authoritative memory. Model prose cannot be guaranteed contradiction-free without live model testing.

## Art and animation

Original art generated with the built-in Image Generation tool. Eight unique NPCs, three expression atlases, male/female full-body designs in four painted palettes, and eight location paintings. CSS atlas framing preserves the art and avoids tinting faces. Breathing, expression entrances, weather and combat slashes respect reduced-motion preferences. These are animated illustrations, not skeletal rigs, lip-synced video or frame-by-frame character animation. Mechanical body-type choices currently share the male/female artwork.

After a chapter conclusion, Continue your journey carries your character into another seeded district. New local travelers, opportunities, road fights and general work remain available. Take the next road renews the district again. General approaches let you attempt investigation, negotiation, crafting, stealth, aid, work, social interaction or a challenge in your own words. These are bounded skill checks, not a simulation of every imaginable action. Procedural content uses five encounter families and eight area illustrations; it is renewable but not infinitely unique authored content.

Save downloads also have a text-transfer fallback in Settings for browsers that block downloads.

See `STATUS.md`, `BACKLOG.md`, `AUDIT.md`, `ART.md` and `TESTING.md` for the honest implementation and verification record.
