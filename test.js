const assert = require('assert');
const toy = require('./logic.js');

function seededRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

assert.strictEqual(toy.STEPS, 16, 'sequencer should use 16 steps');
assert.strictEqual(toy.TRACKS.length, 4, 'toy should have 4 tracks');
assert.ok(toy.SOUND_LIBRARY.length >= 28, 'expanded sound map should have at least 28 toy sounds');
for (const role of toy.TRACKS.map(t => t.id)) {
  const roleCount = toy.SOUND_LIBRARY.filter(sound => sound.role === role).length;
  assert.ok(roleCount >= 6, `role ${role} should have at least 6 sound options`);
}
const soundIds = new Set(toy.SOUND_LIBRARY.map(sound => sound.id));
for (const corner of toy.STYLE_CORNERS) {
  assert.ok(corner.soundIds.length >= 8, `${corner.id} should reference a rich sound family`);
  for (const id of corner.soundIds) assert.ok(soundIds.has(id), `${corner.id} references missing sound ${id}`);
}

const beat = toy.rollBeat({ random: seededRandom(1) });
assert.strictEqual(beat.tracks.length, 4, 'rollBeat creates 4 tracks');
for (const track of beat.tracks) {
  assert.strictEqual(track.pattern.length, 16, 'each pattern has 16 steps');
  assert.ok(track.pattern.some(Boolean), 'each track has at least one active step');
  assert.ok(track.sound && track.sound.id, 'each track has a sound');
}

const locked = toy.rollBeat({ random: seededRandom(2) });
locked.tracks[0].locked = true;
const beforeSound = locked.tracks[0].sound.id;
const swapped = toy.swapUnlockedSounds(locked, { random: seededRandom(3) });
assert.strictEqual(swapped.tracks[0].sound.id, beforeSound, 'locked track sound stays the same');
assert.ok(swapped.tracks.slice(1).some((t, i) => t.sound.id !== locked.tracks[i + 1].sound.id), 'at least one unlocked track swaps sound');

const sparse = toy.rollBeat({ random: seededRandom(4), density: 0.2 });
const dense = toy.makeDenser(sparse, { random: seededRandom(5) });
const sparseHits = sparse.tracks.flatMap(t => t.pattern).filter(Boolean).length;
const denseHits = dense.tracks.flatMap(t => t.pattern).filter(Boolean).length;
assert.ok(denseHits >= sparseHits, 'makeDenser should not reduce hit count');

const weird = toy.makeWeirder(sparse, { random: seededRandom(6) });
assert.strictEqual(weird.tracks.length, 4, 'makeWeirder preserves tracks');
assert.ok(weird.name.includes('Weird'), 'makeWeirder renames beat');

assert.ok(toy.STYLE_CORNERS && toy.STYLE_CORNERS.length === 4, 'toy exposes four style corners');
const topLeft = toy.weightsFromPosition({ x: 0, y: 0 });
assert.strictEqual(topLeft.softRoom, 1, 'top-left position should fully weight softRoom');
assert.strictEqual(topLeft.metalSpark, 0, 'top-left position should not weight metalSpark');
const centerWeights = toy.weightsFromPosition({ x: 0.5, y: 0.5 });
assert.ok(Object.values(centerWeights).every(v => Math.abs(v - 0.25) < 1e-9), 'center should evenly mix four corners');
const weightedSum = Object.values(toy.weightsFromPosition({ x: 0.2, y: 0.7 })).reduce((a, b) => a + b, 0);
assert.ok(Math.abs(weightedSum - 1) < 1e-9, 'corner weights should sum to 1');

const coordinateBeat = toy.rollBeatFromPosition({ x: 1, y: 0 }, { random: seededRandom(7) });
assert.strictEqual(coordinateBeat.morph.x, 1, 'coordinate beat stores x');
assert.strictEqual(coordinateBeat.morph.y, 0, 'coordinate beat stores y');
assert.strictEqual(coordinateBeat.tracks.length, 4, 'coordinate beat creates 4 tracks');
assert.ok(coordinateBeat.name.includes('Metal Spark') || coordinateBeat.cornerLabel.includes('Metal Spark'), 'top-right coordinate should identify Metal Spark as dominant corner');

console.log('logic tests passed');

assert.ok(toy.COORDINATE_SYSTEMS && toy.COORDINATE_SYSTEMS.material && toy.COORDINATE_SYSTEMS.genre, 'toy exposes material and genre coordinate systems');
assert.strictEqual(toy.getStyleCorners('material').length, 4, 'material system has 4 corners');
assert.strictEqual(toy.getStyleCorners('genre').length, 4, 'genre system has 4 corners');
const genreBeat = toy.rollBeatFromPosition({ x: 1, y: 0 }, { random: seededRandom(8), systemId: 'genre' });
assert.strictEqual(genreBeat.systemId, 'genre', 'coordinate beat stores selected coordinate system');
assert.ok(genreBeat.cornerLabel.includes('House') || genreBeat.cornerLabel.includes('Club'), 'genre top-right should be club/house leaning');
const materialBeat = toy.rollBeatFromPosition({ x: 0, y: 0 }, { random: seededRandom(9), systemId: 'material' });
assert.strictEqual(materialBeat.systemId, 'material', 'material beat stores selected coordinate system');
assert.ok(materialBeat.cornerLabel.includes('Soft'), 'material top-left should preserve Soft corner');
