# Play Vermilion Path 0.5.0

1. Extract the entire ZIP.
2. Install Node.js 22 or newer if needed.
3. Double-click **Start Game.cmd** and keep its window open.
4. Open **http://localhost:4317/** in your browser.

If port 4317 is already occupied by the game, use the running game or close its server before starting this copy. Do not open index.html directly.

Offline mode needs no model or paid account. For local narration, start LM Studio with `qwen/qwen3.5-9b`, choose Local in Settings, and test `http://127.0.0.1:1234/v1`. The adapter sends `reasoning_effort: "none"`. Node.js and model weights are not bundled. Paid AI requires separate server configuration.

Saves live in your browser, not this package. Keep using the same browser and address: localhost and 127.0.0.1 have separate storage. Export your save in Settings before switching. The `?test=1` address uses isolated test saves.

This is a playable development build with regional journeys, combat, cultivation, growth, wounds, sect requests, recurring travelers, field medicine and the compact correspondence sidebar. Custom martial-art creation/evolution remains pending. Procedural content is bounded, and AI prose can still be inconsistent; validated rules control state changes.

All 90 automated tests passed before packaging. Personal saves, credentials, runtime usage records and model files are excluded. See STATUS.md and TESTING.md for development history; older README milestone descriptions are historical.
