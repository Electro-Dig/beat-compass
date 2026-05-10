# Beat Compass

A playful coordinate-based drum toy inspired by the interaction ideas behind Google Creative Lab's **The Infinite Drum Machine**.

> Move a point inside a four-corner coordinate system. The position becomes weights. The weights choose drum-like sounds, rhythm density, and weirdness. Then you can lock tracks, mutate the pattern, and replace sounds from a small sound map.

## Current Status

Prototype / V5. Static web app. No build step required.

Open locally:

```bash
python -m http.server 58410 --bind 127.0.0.1
# then open http://localhost:58410/index.html
```

Run logic tests:

```bash
node test.js
```

## What This Is

This prototype explores one interaction idea:

> Drum creation can happen inside a visible coordinate system, not only through random generation or a linear sample list.

The core loop:

1. Choose a coordinate system preset.
2. Move the XY point.
3. Generate a beat from that position.
4. Watch the 16-step pattern update beside the compass.
5. Lock favorite tracks.
6. Mutate rhythm or swap unlocked sounds.
7. Replace specific sounds from the sound map.

## Coordinate Systems

### Material

A sound-material space:

- **Soft Room** — paper, wood, water, room objects.
- **Metal Spark** — keys, glass, metal, bright transients.
- **Body Pulse** — door, desk, footstep, low thud.
- **Glitch Creature** — static, zipper, toy, weird electronic texture.

### Genre

A drum-style space:

- **Rock Kit** — stable backbeat, acoustic-ish kit feeling.
- **House Club** — club pulse, brighter hats, straighter drive.
- **Boom Bap** — sparse, dusty, looser, sample-feeling rhythm.
- **Glitch IDM** — broken, dense, offset, electronic fragments.

## Algorithm Provenance

This is important:

- The current **Material** and **Genre** coordinate presets are **handcrafted prototype rules**.
- They are **not trained from** The Infinite Drum Machine's original audio dataset.
- They are **not derived from** the original project's t-SNE coordinates.
- The original GitHub repository for The Infinite Drum Machine contains the front-end visualizer and drum machine code, but explicitly says it does **not** include the audio files or the t-SNE generated from those audio files.

References:

- The Infinite Drum Machine page: https://experiments.withgoogle.com/ai/drum-machine
- Original repository: https://github.com/googlecreativelab/aiexperiments-drum-machine
- AudioNotebooks referenced by the original README: https://github.com/kylemcdonald/AudioNotebooks

## Current Algorithm

For a position `(x, y)` where both values are between `0` and `1`, the four corner weights are computed with bilinear interpolation:

```text
topLeft     = (1 - x) * (1 - y)
topRight    = x * (1 - y)
bottomLeft  = (1 - x) * y
bottomRight = x * y
```

The four weights always sum to `1`.

Each coordinate system defines four corners. Each corner contains:

- `soundIds`: sounds favored by that corner.
- `density`: how busy the rhythm tends to be.
- `weirdness`: how likely it is to add off-grid or unusual mutations.
- `color`: visual identity.

Beat generation then:

1. Computes corner weights from XY.
2. Scores sounds by their affinity to the weighted corners.
3. Weighted-samples one sound for each track role: kick / snare / hat / texture.
4. Generates 16-step patterns with density and weirdness influenced by the weighted corner values.
5. Preserves locked tracks when swapping or mutating.

## Relationship to The Infinite Drum Machine

This project borrows the **interaction philosophy**, not the data:

- Infinite Drum Machine: real audio samples → fingerprints/features → t-SNE map → user selects sounds in a map.
- Beat Compass: handcrafted style corners → XY weights → weighted sound/rhythm generation → user explores a controllable drum space.

So this is closer to a **coordinate drum sketch** than a faithful remake.

## Files

- `index.html` — static web prototype.
- `logic.js` — sound library, coordinate systems, beat generation, mutation logic.
- `test.js` — Node tests for core logic.
- `README.md` — this document.

## GitHub Release Notes for First Upload

Suggested repo name:

- `beat-compass`
- `coordinate-drum-machine`
- `sound-map-drum-toy`

Before public release:

- Add a license if desired.
- Replace synthetic Web Audio sounds with real samples if the goal is closer to Infinite Drum Machine.
- Add screenshots / GIF demo.
- Consider hosting with GitHub Pages.
