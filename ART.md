# Original art manifest

All shipped art was generated with the built-in Image Generation tool during this task. No purchased assets or reference-sheet backgrounds are used. Generated PNGs are stored inside `public/assets`, never referenced from an external cache.

- `players.png`: 4 columns × 2 rows. Male then female full-body wandering swordspeople; columns vermilion, jade, midnight/gold, ivory/wine. Same identities and poses, independently painted outfit palettes. Prompt requested practical layered hanfu, wraps, boots and sheathed blades, full figures, charcoal setting and original painted wuxia art.
- `portraits-v2.png`: 4 columns × 2 rows. Shen Lian (mature physician with spectacles), Kao Ren (broad bald bearded veteran), Bai Yue (white-haired veiled oracle), Qiao (elderly river master), Du Yan (short-haired muscular smith), Mian (bob and half-mask), Anwei (round-faced shaved-head nun), Yao (weathered red-braided captain). Prompt emphasized different ages, builds, faces, silhouettes and costumes.
- `portraits-warm.png`: edit of the same atlas, preserving identities and layout, changing only facial expressions toward trust, relief and subtle smiles.
- `portraits-hostile.png`: edit of the same atlas, preserving identities and layout, changing only expressions toward distrust, anger or disappointment appropriate to each personality.
- `areas.png`: 2 columns × 4 rows: Rain Gate, Last Apothecary, Market of Closed Eyes, Lantern Ferry, Red Hearth, Shrine of Unnamed Bells, Sealed Sluice, Rain Tribunal. Prompt requested separate detailed painted location scenes with distinctive landmarks, rainy atmosphere, charcoal and vermilion palette and no lettering.
- `valley.png`: original standalone rainy river-village vista, retained as supplementary art.
- `portraits.png`: first generated NPC atlas, superseded by the more distinctive v2. Retained as an unused source variant.

Final prompt specifications are summarized above; full generation prompts are in this task's tool history. No post-generation raster editing was performed. The app selects tiles with CSS background positioning.

Animation scope: breathing-scale and sway of complete painted busts, expression-frame changes with a short entrance fade, rain, and combat impact/slash effects. Not lip-sync, skeletal deformation, or fully animated eyes/mouths. All effects disable under either the OS preference or the in-game reduced-motion switch.

## 2026-09-23 original generated assets
Built-in ImageGen; no paid-provider API calls. Workspace files under public/assets:
- cookie.png: black cat, amber eyes, ivory crescent forehead, three-frame open/blink/ear pose sprite, dark painterly murim style. CSS blink/breathing, reduced motion respected.
- yun.png: elderly East Asian woman martial magistrate, short silver hair, clouded eye, ivory and black armor, wooden sword, mountain monastery. Prompt: original gritty painterly murim waist-up portrait, black ink/vermilion accents, no text/watermark.
- ma-jun.png: broad sun-weathered ferryman, shaved temples and braid, missing tooth, patched indigo river coat, brass coin earring, shoulder rope, rainy boat landing. Same original murim portrait style.
- seol.png: slender adult East Asian woman, asymmetric auburn bob, branching old jaw burn, black/crimson healer robes, closed copper needle case, volcanic sanctuary. Same original murim portrait style; no horns.
The three sect portraits were visually inspected and copied from Codex generated_images into the project. They have restrained CSS breathing but no expression variants yet. Regional backgrounds remain shared; minor generated travelers currently have no portraits and are labeled accordingly. Dedicated faction insignia not yet generated.

### Original province panoramas, built-in ImageGen
All eight assets in public/assets, inspected before integration. Shared prompt: original murim environment, cinematic painterly realism and ink textures, charcoal/vermillion palette with natural region colors, panoramic 16:9, inhabited architecture and small people for scale, quiet center for chat overlay, no text/UI/logo/border.
- black-reed.png: southern marshes, stilt villages, reed channels, fish nets, lantern skiffs, drowned ancestral halls.
- fallen-plum.png: snowy highlands, terraced tea farms, sword monastery, stone stairs and plum trees.
- cinder-ford.png: volcanic basalt gorge, foundries, red cloth bridges, geothermal channels and exiled cultivators.
- white-heron.png: eastern river city, rice barges, red-sailed junks, stone bridges, magistrate towers, silk estates.
- broken-moon.png: northern steppe, ruined border wall, horse-clan camps, cold moon and glacier-fed river.
- nine-wells.png: desert oasis, sandstone gates, wells, crimson awnings, caravans and dunes at twilight.
- quiet-thunder.png: cedar forest, medicinal groves, secluded martial academy, suspension bridges, waterfall and stormclouds.
- red-willow.png: coastal archipelago, typhoon harbor, pearl-diving boats, red sails and island sea temple.
These are regional panoramas shared among that province’s landmarks, not 64 unique landmark paintings. Dry regions omit the rain overlay.
