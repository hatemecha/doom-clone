const TABLE_SIZE = 3600;
const ANGLE_STEP = (Math.PI * 2) / TABLE_SIZE;
const sinTable = new Float32Array(TABLE_SIZE);
const cosTable = new Float32Array(TABLE_SIZE);
for (let i = 0; i < TABLE_SIZE; i++) {
  const a = i * ANGLE_STEP;
  sinTable[i] = Math.sin(a);
  cosTable[i] = Math.cos(a);
}
export function fastSin(rad) {
  let idx = Math.round(rad / ANGLE_STEP) % TABLE_SIZE;
  if (idx < 0) idx += TABLE_SIZE;
  return sinTable[idx];
}
export function fastCos(rad) {
  let idx = Math.round(rad / ANGLE_STEP) % TABLE_SIZE;
  if (idx < 0) idx += TABLE_SIZE;
  return cosTable[idx];
}
export function tryMoveEntity(map, mapW, mapH, obj, nx, ny) {
  const radius = 0.2;
  if (nx < 0 || ny < 0 || nx >= mapW || ny >= mapH) return false;
  if (map[Math.floor(ny - radius) * mapW + Math.floor(nx - radius)] > 0) return false;
  if (map[Math.floor(ny - radius) * mapW + Math.floor(nx + radius)] > 0) return false;
  if (map[Math.floor(ny + radius) * mapW + Math.floor(nx - radius)] > 0) return false;
  if (map[Math.floor(ny + radius) * mapW + Math.floor(nx + radius)] > 0) return false;
  obj.x = nx;
  obj.y = ny;
  return true;
}
export function castRay(map, mapW, mapH, px, py, dirX, dirY) {
  let mapX = Math.floor(px);
  let mapY = Math.floor(py);
  const deltaDistX = Math.abs(1 / (dirX || 1e-6));
  const deltaDistY = Math.abs(1 / (dirY || 1e-6));
  let stepX, stepY;
  let sideDistX, sideDistY;
  if (dirX < 0) {
    stepX = -1;
    sideDistX = (px - mapX) * deltaDistX;
  } else {
    stepX = 1;
    sideDistX = (mapX + 1 - px) * deltaDistX;
  }
  if (dirY < 0) {
    stepY = -1;
    sideDistY = (py - mapY) * deltaDistY;
  } else {
    stepY = 1;
    sideDistY = (mapY + 1 - py) * deltaDistY;
  }
  let hit = 0,
    side = 0,
    texId = 1;
  for (let i = 0; i < 64; i++) {
    if (sideDistX < sideDistY) {
      sideDistX += deltaDistX;
      mapX += stepX;
      side = 0;
    } else {
      sideDistY += deltaDistY;
      mapY += stepY;
      side = 1;
    }
    hit = map[mapY * mapW + mapX];
    if (hit > 0) {
      texId = hit;
      break;
    }
  }
  let perpWallDist;
  if (side === 0)
    perpWallDist = (mapX - px + (1 - stepX) / 2) / (dirX || 1e-6);
  else perpWallDist = (mapY - py + (1 - stepY) / 2) / (dirY || 1e-6);
  return { dist: perpWallDist, texId, side, mapX, mapY };
}
