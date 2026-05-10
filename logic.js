(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BeatToy = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const STEPS = 16;
  const TRACKS = [
    { id: 'kick', label: 'Pulse', emoji: '🥁' },
    { id: 'snare', label: 'Crack', emoji: '🪵' },
    { id: 'hat', label: 'Spark', emoji: '🔑' },
    { id: 'texture', label: 'Ghost', emoji: '🌫️' }
  ];

  const SOUND_LIBRARY = [
    { id: 'rubber-room-kick', name: 'Rubber Room', role: 'kick', emoji: '🫀', color: '#ff6b35', x: 18, y: 68, tone: 'kick', tags: ['warm', 'body', 'round'] },
    { id: 'basement-door', name: 'Basement Door', role: 'kick', emoji: '🚪', color: '#d8572a', x: 25, y: 78, tone: 'thud', tags: ['wood', 'dark', 'heavy'] },
    { id: 'soft-box', name: 'Soft Box', role: 'kick', emoji: '📦', color: '#f08a4b', x: 32, y: 62, tone: 'kick', tags: ['dry', 'soft', 'short'] },
    { id: 'subway-heart', name: 'Subway Heart', role: 'kick', emoji: '🚇', color: '#c44536', x: 14, y: 52, tone: 'sub', tags: ['deep', 'urban', 'pulse'] },
    { id: 'laundry-heart', name: 'Laundry Heart', role: 'kick', emoji: '🧺', color: '#e76f51', x: 21, y: 58, tone: 'thud', tags: ['cloth', 'warm', 'pulse'] },
    { id: 'shoe-stomp', name: 'Shoe Stomp', role: 'kick', emoji: '👟', color: '#bc6c25', x: 9, y: 82, tone: 'thud', tags: ['floor', 'body', 'stomp'] },
    { id: 'cardboard-boom', name: 'Cardboard Boom', role: 'kick', emoji: '📦', color: '#f4a261', x: 30, y: 88, tone: 'kick', tags: ['box', 'hollow', 'boom'] },

    { id: 'paper-slap', name: 'Paper Slap', role: 'snare', emoji: '📄', color: '#ffd166', x: 52, y: 48, tone: 'snap', tags: ['paper', 'flat', 'dry'] },
    { id: 'ceramic-clack', name: 'Ceramic Clack', role: 'snare', emoji: '☕', color: '#f7c66a', x: 58, y: 36, tone: 'clack', tags: ['cup', 'bright', 'hard'] },
    { id: 'desk-knuckle', name: 'Desk Knuckle', role: 'snare', emoji: '✊', color: '#f9a03f', x: 44, y: 42, tone: 'wood', tags: ['hand', 'wood', 'mid'] },
    { id: 'metal-ruler', name: 'Metal Ruler', role: 'snare', emoji: '📏', color: '#ffb703', x: 64, y: 28, tone: 'metal', tags: ['metal', 'ring', 'sharp'] },
    { id: 'book-clap', name: 'Book Clap', role: 'snare', emoji: '📕', color: '#fcbf49', x: 48, y: 38, tone: 'snap', tags: ['book', 'clap', 'dry'] },
    { id: 'chopstick-snap', name: 'Chopstick Snap', role: 'snare', emoji: '🥢', color: '#e9c46a', x: 60, y: 46, tone: 'wood', tags: ['wood', 'thin', 'snap'] },
    { id: 'can-pop', name: 'Can Pop', role: 'snare', emoji: '🥫', color: '#fca311', x: 70, y: 30, tone: 'metal', tags: ['can', 'pop', 'bright'] },

    { id: 'key-rain', name: 'Key Rain', role: 'hat', emoji: '🔑', color: '#7ad7ff', x: 76, y: 22, tone: 'hat', tags: ['metal', 'tiny', 'rain'] },
    { id: 'glass-insect', name: 'Glass Insect', role: 'hat', emoji: '🪲', color: '#9bf6ff', x: 83, y: 34, tone: 'hat', tags: ['glass', 'thin', 'fast'] },
    { id: 'plastic-teeth', name: 'Plastic Teeth', role: 'hat', emoji: '🪥', color: '#80edff', x: 71, y: 44, tone: 'tick', tags: ['plastic', 'click', 'small'] },
    { id: 'coin-spark', name: 'Coin Spark', role: 'hat', emoji: '🪙', color: '#48cae4', x: 88, y: 18, tone: 'metal', tags: ['coin', 'spark', 'bright'] },
    { id: 'scissor-ants', name: 'Scissor Ants', role: 'hat', emoji: '✂️', color: '#90e0ef', x: 84, y: 44, tone: 'hat', tags: ['scissor', 'tiny', 'fast'] },
    { id: 'rice-shaker', name: 'Rice Shaker', role: 'hat', emoji: '🍚', color: '#caf0f8', x: 78, y: 54, tone: 'tick', tags: ['grain', 'shake', 'soft'] },
    { id: 'foil-whisper', name: 'Foil Whisper', role: 'hat', emoji: '🪩', color: '#ade8f4', x: 92, y: 28, tone: 'metal', tags: ['foil', 'shimmer', 'thin'] },

    { id: 'sink-ghost', name: 'Sink Ghost', role: 'texture', emoji: '💧', color: '#b9ff8a', x: 42, y: 18, tone: 'water', tags: ['water', 'soft', 'flow'] },
    { id: 'radio-dust', name: 'Radio Dust', role: 'texture', emoji: '📻', color: '#c8a4ff', x: 36, y: 26, tone: 'noise', tags: ['dust', 'air', 'old'] },
    { id: 'zipper-bird', name: 'Zipper Bird', role: 'texture', emoji: '🤐', color: '#bdb2ff', x: 68, y: 64, tone: 'zip', tags: ['zipper', 'creature', 'scratch'] },
    { id: 'floor-creak', name: 'Floor Creak', role: 'texture', emoji: '🪵', color: '#a7c957', x: 30, y: 32, tone: 'creak', tags: ['wood', 'slow', 'alive'] },
    { id: 'neon-moth', name: 'Neon Moth', role: 'texture', emoji: '🦋', color: '#f15bb5', x: 62, y: 72, tone: 'glitch', tags: ['electric', 'bug', 'weird'] },
    { id: 'pocket-static', name: 'Pocket Static', role: 'texture', emoji: '📱', color: '#fee440', x: 50, y: 74, tone: 'noise', tags: ['static', 'phone', 'grain'] },
    { id: 'fan-fog', name: 'Fan Fog', role: 'texture', emoji: '🌀', color: '#a0c4ff', x: 27, y: 20, tone: 'noise', tags: ['fan', 'air', 'soft'] },
    { id: 'vinyl-ghost', name: 'Vinyl Ghost', role: 'texture', emoji: '💿', color: '#c77dff', x: 45, y: 15, tone: 'noise', tags: ['vinyl', 'dust', 'loop'] },
    { id: 'wire-snake', name: 'Wire Snake', role: 'texture', emoji: '🧵', color: '#ffafcc', x: 72, y: 78, tone: 'zip', tags: ['wire', 'snake', 'scratch'] },
    { id: 'toy-alien', name: 'Toy Alien', role: 'texture', emoji: '🧸', color: '#ff006e', x: 86, y: 72, tone: 'glitch', tags: ['toy', 'alien', 'weird'] }
  ];

  const MATERIAL_CORNERS = [
    {
      id: 'softRoom',
      label: 'Soft Room',
      shortLabel: 'Soft',
      x: 0,
      y: 0,
      color: '#b9ff8a',
      density: 0.32,
      weirdness: 0.12,
      swing: 0.08,
      featureAnchor: { soft: 0.95, organic: 0.88, sustain: 0.48, high: 0.24, metallic: 0.06, body: 0.36, noise: 0.32, glitch: 0.04, synthetic: 0.08 },
      soundIds: ['soft-box', 'paper-slap', 'desk-knuckle', 'sink-ghost', 'floor-creak', 'radio-dust', 'laundry-heart', 'book-clap', 'fan-fog', 'vinyl-ghost']
    },
    {
      id: 'metalSpark',
      label: 'Metal Spark',
      shortLabel: 'Metal',
      x: 1,
      y: 0,
      color: '#7ad7ff',
      density: 0.52,
      weirdness: 0.28,
      swing: 0.03,
      featureAnchor: { soft: 0.12, organic: 0.2, sustain: 0.25, high: 0.92, metallic: 0.95, body: 0.12, noise: 0.34, glitch: 0.18, synthetic: 0.38 },
      soundIds: ['key-rain', 'glass-insect', 'coin-spark', 'metal-ruler', 'ceramic-clack', 'plastic-teeth', 'scissor-ants', 'foil-whisper', 'can-pop', 'rice-shaker']
    },
    {
      id: 'bodyPulse',
      label: 'Body Pulse',
      shortLabel: 'Body',
      x: 0,
      y: 1,
      color: '#ff6b35',
      density: 0.42,
      weirdness: 0.18,
      swing: 0.14,
      featureAnchor: { soft: 0.36, organic: 0.78, sustain: 0.25, high: 0.18, metallic: 0.08, body: 0.96, low: 0.84, transient: 0.7, noise: 0.18, glitch: 0.06 },
      soundIds: ['rubber-room-kick', 'basement-door', 'subway-heart', 'desk-knuckle', 'floor-creak', 'soft-box', 'shoe-stomp', 'laundry-heart', 'cardboard-boom', 'book-clap']
    },
    {
      id: 'glitchCreature',
      label: 'Glitch Creature',
      shortLabel: 'Glitch',
      x: 1,
      y: 1,
      color: '#ff7aa8',
      density: 0.68,
      weirdness: 0.72,
      swing: 0.2,
      featureAnchor: { soft: 0.16, organic: 0.22, sustain: 0.58, high: 0.64, metallic: 0.34, body: 0.18, noise: 0.9, glitch: 0.96, synthetic: 0.86 },
      soundIds: ['neon-moth', 'zipper-bird', 'pocket-static', 'plastic-teeth', 'radio-dust', 'coin-spark', 'wire-snake', 'toy-alien', 'fan-fog', 'foil-whisper']
    }
  ];

  const GENRE_CORNERS = [
    {
      id: 'rockKit',
      label: 'Rock Kit',
      shortLabel: 'Rock',
      x: 0,
      y: 0,
      color: '#ffd166',
      density: 0.42,
      weirdness: 0.1,
      swing: 0.04,
      featureAnchor: { organic: 0.86, body: 0.56, transient: 0.72, mid: 0.62, low: 0.48, high: 0.34, metallic: 0.2, glitch: 0.04, synthetic: 0.06 },
      soundIds: ['basement-door', 'rubber-room-kick', 'desk-knuckle', 'book-clap', 'chopstick-snap', 'rice-shaker', 'foil-whisper', 'floor-creak']
    },
    {
      id: 'houseClub',
      label: 'House Club',
      shortLabel: 'House',
      x: 1,
      y: 0,
      color: '#7ad7ff',
      density: 0.58,
      weirdness: 0.18,
      swing: 0.02,
      featureAnchor: { synthetic: 0.66, low: 0.72, high: 0.72, transient: 0.78, metallic: 0.62, sustain: 0.28, body: 0.36, glitch: 0.12, organic: 0.22 },
      soundIds: ['subway-heart', 'rubber-room-kick', 'coin-spark', 'key-rain', 'glass-insect', 'foil-whisper', 'pocket-static', 'vinyl-ghost']
    },
    {
      id: 'boomBap',
      label: 'Boom Bap',
      shortLabel: 'Hip-hop',
      x: 0,
      y: 1,
      color: '#ff6b35',
      density: 0.36,
      weirdness: 0.16,
      swing: 0.28,
      featureAnchor: { organic: 0.72, soft: 0.56, low: 0.66, mid: 0.64, noise: 0.42, sustain: 0.38, transient: 0.56, metallic: 0.18, synthetic: 0.14, glitch: 0.12 },
      soundIds: ['soft-box', 'cardboard-boom', 'paper-slap', 'book-clap', 'radio-dust', 'vinyl-ghost', 'rice-shaker', 'laundry-heart']
    },
    {
      id: 'glitchIDM',
      label: 'Glitch IDM',
      shortLabel: 'IDM',
      x: 1,
      y: 1,
      color: '#ff7aa8',
      density: 0.74,
      weirdness: 0.82,
      swing: 0.18,
      featureAnchor: { glitch: 0.96, synthetic: 0.9, noise: 0.84, high: 0.72, transient: 0.72, sustain: 0.48, metallic: 0.46, organic: 0.08, body: 0.12 },
      soundIds: ['neon-moth', 'toy-alien', 'wire-snake', 'zipper-bird', 'pocket-static', 'plastic-teeth', 'scissor-ants', 'can-pop']
    }
  ];

  const COORDINATE_SYSTEMS = {
    material: {
      id: 'material',
      label: 'Material',
      subtitle: 'Soft / Metal / Body / Glitch',
      corners: MATERIAL_CORNERS,
      axisX: 'soft ↔ sharp',
      axisY: 'room ↔ body'
    },
    genre: {
      id: 'genre',
      label: 'Genre',
      subtitle: 'Rock / House / Hip-hop / IDM',
      corners: GENRE_CORNERS,
      axisX: 'acoustic ↔ electronic',
      axisY: 'straight ↔ broken'
    }
  };

  const STYLE_CORNERS = MATERIAL_CORNERS;

  const BEAT_NAMES = ['Kitchen Jackpot', 'Room Machine', 'Misheard Club', 'Desk Rave', 'Tiny Factory', 'Pocket Jungle', 'Keychain Techno'];
  const FEATURE_KEYS = ['low', 'mid', 'high', 'transient', 'noise', 'sustain', 'organic', 'metallic', 'synthetic', 'body', 'soft', 'glitch'];
  const ROLE_FEATURE_ANCHORS = {
    kick: { low: 0.92, mid: 0.34, high: 0.08, transient: 0.72, noise: 0.12, sustain: 0.2, organic: 0.55, metallic: 0.08, synthetic: 0.22, body: 0.88, soft: 0.32, glitch: 0.06 },
    snare: { low: 0.22, mid: 0.82, high: 0.48, transient: 0.9, noise: 0.38, sustain: 0.22, organic: 0.55, metallic: 0.34, synthetic: 0.22, body: 0.42, soft: 0.22, glitch: 0.12 },
    hat: { low: 0.04, mid: 0.28, high: 0.94, transient: 0.92, noise: 0.62, sustain: 0.12, organic: 0.22, metallic: 0.78, synthetic: 0.38, body: 0.08, soft: 0.12, glitch: 0.22 },
    texture: { low: 0.24, mid: 0.46, high: 0.54, transient: 0.28, noise: 0.82, sustain: 0.82, organic: 0.42, metallic: 0.34, synthetic: 0.58, body: 0.18, soft: 0.42, glitch: 0.64 }
  };

  function rng(opts) { return (opts && opts.random) || Math.random; }
  function choose(list, random) { return list[Math.floor(random() * list.length)]; }
  function clamp01(value) { return Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0.5)); }
  function clampFeature(value) { return Math.max(0, Math.min(1, value)); }
  function blankFeatures(seed = 0.18) {
    return FEATURE_KEYS.reduce((features, key) => {
      features[key] = seed;
      return features;
    }, {});
  }
  function bump(features, key, value) {
    features[key] = clampFeature(Math.max(features[key] || 0, value));
  }
  function add(features, key, value) {
    features[key] = clampFeature((features[key] || 0) + value);
  }
  function normalizeFeatureObject(features) {
    return FEATURE_KEYS.reduce((out, key) => {
      out[key] = clampFeature(features[key] ?? 0.18);
      return out;
    }, {});
  }
  function vectorSimilarity(features, anchor) {
    const normalized = normalizeFeatureObject(features || {});
    const normalizedAnchor = normalizeFeatureObject(anchor || {});
    const distanceSquared = FEATURE_KEYS.reduce((sum, key) => {
      const diff = normalized[key] - normalizedAnchor[key];
      return sum + diff * diff;
    }, 0);
    const maxDistance = Math.sqrt(FEATURE_KEYS.length);
    return clampFeature(1 - Math.sqrt(distanceSquared) / maxDistance);
  }
  function inferSoundFeatures(sound) {
    const features = blankFeatures(0.12);
    const roleSeeds = {
      kick: { low: 0.86, mid: 0.36, high: 0.1, transient: 0.68, noise: 0.12, sustain: 0.18, organic: 0.58, body: 0.78, soft: 0.28 },
      snare: { low: 0.22, mid: 0.76, high: 0.42, transient: 0.82, noise: 0.32, sustain: 0.18, organic: 0.52, body: 0.38, soft: 0.18 },
      hat: { low: 0.04, mid: 0.24, high: 0.9, transient: 0.9, noise: 0.58, sustain: 0.12, metallic: 0.68, soft: 0.1 },
      texture: { low: 0.22, mid: 0.44, high: 0.5, transient: 0.24, noise: 0.78, sustain: 0.78, synthetic: 0.52, soft: 0.38, glitch: 0.42 }
    };
    Object.entries(roleSeeds[sound.role] || {}).forEach(([key, value]) => bump(features, key, value));

    const toneBoosts = {
      kick: { low: 0.9, body: 0.84, transient: 0.68 },
      sub: { low: 0.98, body: 0.72, sustain: 0.34, synthetic: 0.38 },
      thud: { low: 0.78, body: 0.9, organic: 0.7 },
      snap: { transient: 0.94, mid: 0.72, sustain: 0.08 },
      clack: { transient: 0.88, high: 0.62, metallic: 0.34 },
      wood: { organic: 0.88, mid: 0.7, body: 0.5, metallic: 0.05 },
      metal: { metallic: 0.96, high: 0.86, transient: 0.84, sustain: 0.24 },
      hat: { metallic: 0.82, high: 0.96, transient: 0.94, noise: 0.64 },
      tick: { high: 0.78, transient: 0.88, sustain: 0.08 },
      water: { soft: 0.86, organic: 0.76, sustain: 0.72, noise: 0.48 },
      noise: { noise: 0.9, sustain: 0.74, synthetic: 0.48 },
      zip: { glitch: 0.72, high: 0.62, noise: 0.66, transient: 0.5 },
      creak: { organic: 0.86, sustain: 0.64, body: 0.46, noise: 0.34 },
      glitch: { glitch: 0.96, synthetic: 0.88, noise: 0.78, high: 0.66 }
    };
    Object.entries(toneBoosts[sound.tone] || {}).forEach(([key, value]) => bump(features, key, value));

    const tagBoosts = {
      warm: { soft: 0.62, organic: 0.62 },
      body: { body: 0.92, low: 0.68 },
      round: { soft: 0.56, low: 0.62 },
      wood: { organic: 0.9, metallic: 0.04 },
      dark: { low: 0.68, high: 0.16 },
      heavy: { low: 0.84, body: 0.78 },
      dry: { sustain: 0.08, transient: 0.76 },
      soft: { soft: 0.9 },
      short: { sustain: 0.08, transient: 0.7 },
      urban: { synthetic: 0.42, low: 0.58 },
      pulse: { body: 0.68, low: 0.62 },
      cloth: { soft: 0.84, organic: 0.58 },
      floor: { body: 0.72, low: 0.66 },
      stomp: { body: 0.9, transient: 0.74 },
      hollow: { mid: 0.55, sustain: 0.36 },
      boom: { low: 0.9, body: 0.76 },
      paper: { soft: 0.72, organic: 0.68, noise: 0.28 },
      cup: { high: 0.56, transient: 0.72 },
      bright: { high: 0.86 },
      hard: { transient: 0.84, soft: 0.08 },
      hand: { body: 0.58, organic: 0.72 },
      metal: { metallic: 0.96, high: 0.82 },
      ring: { sustain: 0.5, metallic: 0.84 },
      sharp: { high: 0.86, transient: 0.9 },
      book: { organic: 0.66, mid: 0.64 },
      clap: { transient: 0.9, mid: 0.75 },
      thin: { high: 0.8, low: 0.02 },
      can: { metallic: 0.74, high: 0.66 },
      pop: { transient: 0.88, sustain: 0.1 },
      tiny: { high: 0.82, low: 0.02 },
      rain: { noise: 0.6, sustain: 0.34 },
      glass: { high: 0.88, metallic: 0.58 },
      fast: { transient: 0.86, sustain: 0.08 },
      plastic: { synthetic: 0.58, high: 0.55 },
      click: { transient: 0.9, sustain: 0.05 },
      small: { high: 0.68, low: 0.04 },
      coin: { metallic: 0.9, high: 0.82 },
      spark: { high: 0.92, transient: 0.86 },
      scissor: { metallic: 0.82, high: 0.78 },
      grain: { noise: 0.5, high: 0.5 },
      shake: { noise: 0.62, transient: 0.58 },
      foil: { metallic: 0.76, noise: 0.72, high: 0.86 },
      shimmer: { high: 0.88, sustain: 0.42 },
      water: { soft: 0.9, organic: 0.74, sustain: 0.76 },
      flow: { sustain: 0.82, transient: 0.12 },
      dust: { noise: 0.72, soft: 0.42 },
      air: { soft: 0.74, noise: 0.58 },
      old: { organic: 0.5, noise: 0.5 },
      zipper: { glitch: 0.68, high: 0.54 },
      creature: { glitch: 0.74, organic: 0.38 },
      scratch: { noise: 0.72, high: 0.64, glitch: 0.58 },
      slow: { sustain: 0.68, transient: 0.18 },
      alive: { organic: 0.82 },
      electric: { synthetic: 0.86, glitch: 0.82 },
      bug: { glitch: 0.78, high: 0.68 },
      weird: { glitch: 0.94 },
      static: { noise: 0.96, synthetic: 0.74 },
      phone: { synthetic: 0.76 },
      fan: { noise: 0.72, sustain: 0.74 },
      vinyl: { noise: 0.62, organic: 0.48 },
      loop: { sustain: 0.55 },
      wire: { synthetic: 0.66, glitch: 0.58 },
      snake: { sustain: 0.58, glitch: 0.58 },
      toy: { synthetic: 0.68, glitch: 0.62 },
      alien: { synthetic: 0.9, glitch: 0.9 }
    };
    for (const tag of sound.tags || []) {
      Object.entries(tagBoosts[tag] || {}).forEach(([key, value]) => bump(features, key, value));
    }
    if ((sound.tags || []).includes('soft')) add(features, 'transient', -0.1);
    return normalizeFeatureObject(features);
  }
  function getSoundById(id) {
    return SOUND_LIBRARY.find(sound => sound.id === id);
  }
  function scoreSoundForRole(sound, role) {
    return vectorSimilarity(sound.features || inferSoundFeatures(sound), ROLE_FEATURE_ANCHORS[role] || ROLE_FEATURE_ANCHORS.texture);
  }
  function scoreSoundForCorner(sound, corner) {
    return vectorSimilarity(sound.features || inferSoundFeatures(sound), corner.featureAnchor || {});
  }

  SOUND_LIBRARY.forEach(sound => {
    sound.features = inferSoundFeatures(sound);
    sound.roleScores = TRACKS.reduce((scores, track) => {
      scores[track.id] = scoreSoundForRole(sound, track.id);
      return scores;
    }, {});
  });

  function clonePattern(pattern) { return pattern.slice(); }
  function getStyleCorners(systemId = 'material') {
    return (COORDINATE_SYSTEMS[systemId] || COORDINATE_SYSTEMS.material).corners;
  }

  function getCoordinateSystem(systemId = 'material') {
    return COORDINATE_SYSTEMS[systemId] || COORDINATE_SYSTEMS.material;
  }

  function cloneBeat(beat) {
    return {
      name: beat.name,
      tempo: beat.tempo,
      activeTrack: beat.activeTrack || 0,
      morph: beat.morph ? { ...beat.morph } : undefined,
      systemId: beat.systemId,
      algorithm: beat.algorithm,
      cornerLabel: beat.cornerLabel,
      cornerWeights: beat.cornerWeights ? { ...beat.cornerWeights } : undefined,
      tracks: beat.tracks.map(t => ({ ...t, pattern: clonePattern(t.pattern) }))
    };
  }

  function weightsFromPosition(position, systemId = 'material') {
    const x = clamp01(position && position.x);
    const y = clamp01(position && position.y);
    const corners = getStyleCorners(systemId);
    return {
      [corners[0].id]: (1 - x) * (1 - y),
      [corners[1].id]: x * (1 - y),
      [corners[2].id]: (1 - x) * y,
      [corners[3].id]: x * y
    };
  }

  function dominantCorner(weights, systemId = 'material') {
    return getStyleCorners(systemId).reduce((best, corner) => {
      return weights[corner.id] > weights[best.id] ? corner : best;
    }, getStyleCorners(systemId)[0]);
  }

  function weightedStyleValue(weights, key, systemId = 'material') {
    return getStyleCorners(systemId).reduce((sum, corner) => sum + weights[corner.id] * corner[key], 0);
  }

  function styleScore(sound, weights, systemId = 'material') {
    return getStyleCorners(systemId).reduce((score, corner) => {
      const featureAffinity = scoreSoundForCorner(sound, corner);
      const familyAffinity = corner.soundIds.includes(sound.id) ? 1 : 0.08;
      const affinity = featureAffinity * 0.78 + familyAffinity * 0.22;
      return score + weights[corner.id] * affinity;
    }, 0);
  }

  function weightedChoose(list, random, weightFn) {
    const weighted = list.map(item => ({ item, weight: Math.max(0.001, weightFn(item)) }));
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    let cursor = random() * total;
    for (const entry of weighted) {
      cursor -= entry.weight;
      if (cursor <= 0) return entry.item;
    }
    return weighted[weighted.length - 1].item;
  }

  function pickSound(role, random, excludeId) {
    let candidates = SOUND_LIBRARY.filter(s => s.role === role && s.id !== excludeId);
    if (!candidates.length) candidates = SOUND_LIBRARY.filter(s => s.id !== excludeId);
    if (!candidates.length) candidates = SOUND_LIBRARY;
    return choose(candidates, random);
  }

  function pickSoundForWeights(role, weights, random, excludeId, systemId = 'material') {
    let candidates = SOUND_LIBRARY.filter(s => s.role === role && s.id !== excludeId);
    if (!candidates.length) candidates = SOUND_LIBRARY.filter(s => s.id !== excludeId);
    if (!candidates.length) candidates = SOUND_LIBRARY;
    return weightedChoose(candidates, random, sound => {
      const coordinateScore = styleScore(sound, weights, systemId);
      const roleScore = scoreSoundForRole(sound, role);
      return coordinateScore * 0.68 + roleScore * 0.32;
    });
  }

  function basePattern(role, random, density) {
    const pattern = Array(STEPS).fill(false);
    const d = typeof density === 'number' ? density : 0.45;
    if (role === 'kick') {
      [0, 8].forEach(i => pattern[i] = true);
      if (random() < d) pattern[6] = true;
      if (random() < d * 0.8) pattern[12] = true;
      if (random() < d * 0.4) pattern[14] = true;
    } else if (role === 'snare') {
      [4, 12].forEach(i => pattern[i] = true);
      if (random() < d * 0.6) pattern[10] = true;
      if (random() < d * 0.35) pattern[15] = true;
    } else if (role === 'hat') {
      for (let i = 0; i < STEPS; i += 2) pattern[i] = random() < 0.75;
      if (!pattern.some(Boolean)) pattern[2] = true;
      if (random() < d) pattern[7] = true;
      if (random() < d) pattern[15] = true;
    } else {
      for (let i = 0; i < STEPS; i++) pattern[i] = random() < d * 0.33;
      if (!pattern.some(Boolean)) pattern[Math.floor(random() * STEPS)] = true;
    }
    return pattern;
  }

  function rollBeat(opts = {}) {
    const random = rng(opts);
    const density = typeof opts.density === 'number' ? opts.density : 0.45 + random() * 0.25;
    const tracks = TRACKS.map(track => ({
      role: track.id,
      label: track.label,
      emoji: track.emoji,
      locked: false,
      sound: pickSound(track.id, random),
      pattern: basePattern(track.id, random, density)
    }));
    return {
      name: choose(BEAT_NAMES, random),
      tempo: 92 + Math.floor(random() * 54),
      activeTrack: 0,
      tracks
    };
  }

  function rollBeatFromPosition(position, opts = {}) {
    const random = rng(opts);
    const systemId = opts.systemId || 'material';
    const x = clamp01(position && position.x);
    const y = clamp01(position && position.y);
    const weights = weightsFromPosition({ x, y }, systemId);
    const corner = dominantCorner(weights, systemId);
    const density = weightedStyleValue(weights, 'density', systemId) + random() * 0.12;
    const weirdness = weightedStyleValue(weights, 'weirdness', systemId);
    const tracks = TRACKS.map(track => {
      const pattern = basePattern(track.id, random, density);
      if (weirdness > 0.45 && track.id !== 'kick') {
        const flips = 1 + Math.floor(weirdness * 3);
        for (let i = 0; i < flips; i++) {
          const step = Math.floor(random() * STEPS);
          pattern[step] = !pattern[step];
        }
        if (!pattern.some(Boolean)) pattern[Math.floor(random() * STEPS)] = true;
      }
      return {
        role: track.id,
        label: track.label,
        emoji: track.emoji,
        locked: false,
        sound: pickSoundForWeights(track.id, weights, random, undefined, systemId),
        pattern
      };
    });
    return {
      name: corner.label + ' Coordinates',
      systemId,
      algorithm: 'feature-weighted-v1',
      cornerLabel: corner.label,
      cornerWeights: weights,
      morph: { x, y },
      tempo: 88 + Math.floor(density * 72) + Math.floor(weirdness * 16),
      activeTrack: 0,
      tracks
    };
  }

  function swapUnlockedSounds(beat, opts = {}) {
    const random = rng(opts);
    const next = cloneBeat(beat);
    next.name = beat.name + ' / Resampled';
    next.tracks = next.tracks.map(t => t.locked ? t : ({ ...t, sound: pickSound(t.role, random, t.sound.id) }));
    return next;
  }

  function mutateRhythm(beat, opts = {}) {
    const random = rng(opts);
    const next = cloneBeat(beat);
    next.name = beat.name + ' / Mutated';
    next.tracks.forEach(track => {
      if (track.locked) return;
      const flips = 1 + Math.floor(random() * 3);
      for (let i = 0; i < flips; i++) {
        const step = Math.floor(random() * STEPS);
        track.pattern[step] = !track.pattern[step];
      }
      if (!track.pattern.some(Boolean)) track.pattern[Math.floor(random() * STEPS)] = true;
    });
    return next;
  }

  function makeDenser(beat, opts = {}) {
    const random = rng(opts);
    const next = cloneBeat(beat);
    next.name = beat.name + ' / Denser';
    next.tracks.forEach(track => {
      if (track.locked) return;
      const additions = track.role === 'hat' ? 3 : 2;
      for (let i = 0; i < additions; i++) track.pattern[Math.floor(random() * STEPS)] = true;
    });
    return next;
  }

  function makeSparser(beat, opts = {}) {
    const random = rng(opts);
    const next = cloneBeat(beat);
    next.name = beat.name + ' / Sparser';
    next.tracks.forEach(track => {
      if (track.locked) return;
      const active = track.pattern.map((v, i) => v ? i : -1).filter(i => i >= 0);
      const removals = Math.min(active.length - 1, 2);
      for (let i = 0; i < removals; i++) {
        const idx = active.splice(Math.floor(random() * active.length), 1)[0];
        track.pattern[idx] = false;
      }
    });
    return next;
  }

  function makeWeirder(beat, opts = {}) {
    const random = rng(opts);
    let next = mutateRhythm(swapUnlockedSounds(beat, { random }), { random });
    next.name = 'Weird ' + beat.name;
    next.tracks.forEach(track => {
      if (track.locked) return;
      const shift = 1 + Math.floor(random() * 5);
      track.pattern = track.pattern.map((_, i, arr) => arr[(i - shift + STEPS) % STEPS]);
    });
    return next;
  }

  function toggleStep(beat, trackIndex, stepIndex) {
    const next = cloneBeat(beat);
    next.tracks[trackIndex].pattern[stepIndex] = !next.tracks[trackIndex].pattern[stepIndex];
    return next;
  }

  function setLocked(beat, trackIndex, locked) {
    const next = cloneBeat(beat);
    next.tracks[trackIndex].locked = !!locked;
    return next;
  }

  function setActiveTrack(beat, trackIndex) {
    const next = cloneBeat(beat);
    next.activeTrack = trackIndex;
    return next;
  }

  function assignSoundToActiveTrack(beat, soundId) {
    const sound = SOUND_LIBRARY.find(s => s.id === soundId);
    if (!sound) return cloneBeat(beat);
    const next = cloneBeat(beat);
    next.tracks[next.activeTrack || 0].sound = sound;
    return next;
  }

  return {
    STEPS,
    TRACKS,
    FEATURE_KEYS,
    COORDINATE_SYSTEMS,
    STYLE_CORNERS,
    getStyleCorners,
    getCoordinateSystem,
    SOUND_LIBRARY,
    inferSoundFeatures,
    scoreSoundForRole,
    scoreSoundForCorner,
    getSoundById,
    rollBeat,
    rollBeatFromPosition,
    weightsFromPosition,
    swapUnlockedSounds,
    mutateRhythm,
    makeDenser,
    makeSparser,
    makeWeirder,
    toggleStep,
    setLocked,
    setActiveTrack,
    assignSoundToActiveTrack
  };
});
