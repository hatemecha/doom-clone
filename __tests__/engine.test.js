import { tryMoveEntity, castRay } from '../engine.js';

describe('engine utilities', () => {
  test('tryMoveEntity blocks walls and updates position', () => {
    const map = Uint8Array.from([
      1,1,1,
      1,0,1,
      1,1,1
    ]);
    const player = { x: 1.5, y: 1.5 };
    expect(tryMoveEntity(map, 3, 3, player, 1.5, 1.2)).toBe(true);
    expect(player.y).toBeCloseTo(1.2);
    expect(tryMoveEntity(map, 3, 3, player, 0.5, 1.2)).toBe(false);
  });

  test('castRay hits nearest wall', () => {
    const map = Uint8Array.from([
      1,1,1,
      1,0,1,
      1,1,1
    ]);
    const ray = castRay(map, 3, 3, 1.5, 1.5, 1, 0);
    expect(ray.texId).toBe(1);
    expect(ray.dist).toBeCloseTo(0.5, 5);
  });
});
