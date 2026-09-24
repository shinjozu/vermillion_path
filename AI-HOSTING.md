# Free hosted AI: research and next implementation

Reviewed September 23, 2026. Nothing has been deployed, subscribed to, or charged. The Pages edition currently works without AI.

## Recommended candidate: Cloudflare Workers + Workers AI

Workers AI currently includes 10,000 neurons daily on the Workers Free plan. Requests fail after the free allowance is exhausted; going beyond it requires a paid plan. Neurons measure model compute, not requests, so the number of narrated turns depends on model and context size. Some models require paid billing and must be avoided for this setup.

Start evaluation with a model listed as free-plan eligible, such as `@cf/meta/llama-3.1-8b-instruct-fp8-fast`, and verify account availability before deployment. This is a candidate, not a tested narrator recommendation. Narrative quality, structured interpretation and latency still need live playtests.

Primary sources:
- https://developers.cloudflare.com/workers-ai/platform/pricing/
- https://developers.cloudflare.com/changelog/post/2026-07-28-models-require-workers-paid/

## Alternative: a Worker proxy + Groq Free

Groq offers model-dependent free-plan request/token limits and returns HTTP 429 when limits are exceeded. It uses an OpenAI-compatible API, which may make adapting the current model interface easier. A Groq provider key must remain in the backend's secret store. This introduces a second account/provider and still requires a protected proxy.

Primary sources:
- https://console.groq.com/docs/rate-limits
- https://console.groq.com/docs/quickstart

## Required security and game integration

Use HTTPS and authenticated player sessions with server-verified identity. Keep provider credentials or the Workers AI binding exclusively on the server. CORS origin checks are supplementary; they are not authentication. Do not embed a shared secret in the Pages JavaScript.

The backend should allow only fixed narration/interpretation/choice operations and an explicitly selected model. Validate request size and game-state structure, bound output tokens and context, serialize requests per player, and enforce persistent per-player and account-wide quotas before inference. Never accept arbitrary provider URLs. Keep a timeout, cancellation/stale-response handling, and labeled offline fallback.

For personal play, restrict access to the owner's identity. Do not open unauthenticated public inference. Account login, identity setup, and a concrete deployment review are needed before publication. Remain on the free plan with no automatic paid upgrade. Retention/privacy terms should be reviewed before sending personal information; game scenes should contain only game data.

The existing AI service depends on Node filesystem storage, so it cannot simply be uploaded as a Worker. Prompt construction and output validation need extraction into portable modules, with persistent quota storage replacing local usage files. This backend is researched, not implemented or live-tested yet.
