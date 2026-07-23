import {
  BLACK,
  BLUE,
  BeginDrawing,
  ClearBackground,
  CloseWindow,
  Color,
  DARKGRAY,
  DrawFPS,
  DrawLine,
  DrawRectangle,
  DrawText,
  EndDrawing,
  GetFrameTime,
  InitWindow,
  IsKeyDown,
  IsKeyPressed,
  KEY_A,
  KEY_D,
  KEY_DOWN,
  KEY_LEFT,
  KEY_R,
  KEY_RIGHT,
  KEY_S,
  KEY_SPACE,
  KEY_UP,
  KEY_W,
  MAROON,
  RAYWHITE,
  RED,
  SetTargetFPS,
  TakeScreenshot,
  WindowShouldClose,
  YELLOW,
  closeRaylib,
} from "../bindings/raylib.ts";
import { frameNumbers } from "./lib/frames.ts";

type Player = {
  x: number;
  y: number;
  angle: number;
  health: number;
};

type Enemy = {
  x: number;
  y: number;
  health: number;
  alive: boolean;
  attackTimer: number;
};

const screenWidth: number = 960;
const screenHeight: number = 600;
const rayWidth: number = 2;
const rayCount: number = screenWidth / rayWidth;
const fieldOfView: number = Math.PI / 3;
const moveSpeed: number = 3.1;
const turnSpeed: number = 2.2;
const collisionRadius: number = 0.18;

const level = [
  "1111111111111111",
  "1000000000000001",
  "1011100111011101",
  "1000100001000001",
  "1010101101011101",
  "1010001001000001",
  "1011101001110101",
  "1000000000000101",
  "1011011110110101",
  "1001000000010001",
  "1000011100000001",
  "1111111111111111",
];

const wallColors = [
  Color.create({ r: 164, g: 39, b: 37, a: 255 }),
  Color.create({ r: 148, g: 35, b: 34, a: 255 }),
  Color.create({ r: 128, g: 31, b: 30, a: 255 }),
  Color.create({ r: 108, g: 27, b: 27, a: 255 }),
  Color.create({ r: 88, g: 24, b: 24, a: 255 }),
  Color.create({ r: 70, g: 21, b: 21, a: 255 }),
];
const ceilingColor = Color.create({ r: 28, g: 30, b: 38, a: 255 });
const floorColor = Color.create({ r: 54, g: 48, b: 42, a: 255 });
const enemyColor = Color.create({ r: 48, g: 170, b: 62, a: 255 });
const enemyDark = Color.create({ r: 25, g: 92, b: 35, a: 255 });
const gunColor = Color.create({ r: 92, g: 96, b: 104, a: 255 });

let player: Player = { x: 2.5, y: 1.5, angle: 0, health: 100 };
let enemies: Enemy[] = [];
let muzzleFrames: number = 0;
const depthBuffer: number[] = [];
const maximumFrames: number =
  typeof globalThis.RAYLIB_EXAMPLE_MAX_FRAMES === "number"
    ? globalThis.RAYLIB_EXAMPLE_MAX_FRAMES
    : Infinity;
const screenshotPath: string =
  typeof globalThis.RAYLIB_EXAMPLE_SCREENSHOT === "string"
    ? globalThis.RAYLIB_EXAMPLE_SCREENSHOT
    : "";
const resetGame = (): void => {
  player = { x: 2.5, y: 1.5, angle: 0, health: 100 };
  enemies = [
    { x: 7.5, y: 1.5, health: 3, alive: true, attackTimer: 0 },
    { x: 12.5, y: 3.5, health: 3, alive: true, attackTimer: 0 },
    { x: 6.5, y: 7.5, health: 3, alive: true, attackTimer: 0 },
    { x: 13.5, y: 9.5, health: 3, alive: true, attackTimer: 0 },
  ];
};

const cellAt = (x: number, y: number): string => {
  const mapX = Math.floor(x);
  const mapY = Math.floor(y);
  if (mapY < 0 || mapY >= level.length) return "1";
  if (mapX < 0 || mapX >= level[mapY].length) return "1";
  return level[mapY][mapX];
};

const canStand = (x: number, y: number): boolean => {
  return (
    cellAt(x - collisionRadius, y - collisionRadius) === "0" &&
    cellAt(x + collisionRadius, y - collisionRadius) === "0" &&
    cellAt(x - collisionRadius, y + collisionRadius) === "0" &&
    cellAt(x + collisionRadius, y + collisionRadius) === "0"
  );
};

const normalizeAngle = (angle: number): number => {
  const fullTurn = Math.PI * 2;
  return ((angle + Math.PI) % fullTurn + fullTurn) % fullTurn - Math.PI;
};

const clearLine = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): boolean => {
  const distance = Math.hypot(x1 - x0, y1 - y0);
  const steps = Math.max(1, Math.floor(distance * 12));
  for (const offset of frameNumbers(steps - 1)) {
    const step = offset + 1;
    const amount = step / steps;
    if (cellAt(x0 + (x1 - x0) * amount, y0 + (y1 - y0) * amount) !== "0") {
      return false;
    }
  }
  return true;
};

const movePlayer = (amount: number): void => {
  const nextX = player.x + Math.cos(player.angle) * amount;
  const nextY = player.y + Math.sin(player.angle) * amount;
  if (canStand(nextX, player.y)) player.x = nextX;
  if (canStand(player.x, nextY)) player.y = nextY;
};

const strafePlayer = (amount: number): void => {
  const nextX = player.x + Math.cos(player.angle + Math.PI / 2) * amount;
  const nextY = player.y + Math.sin(player.angle + Math.PI / 2) * amount;
  if (canStand(nextX, player.y)) player.x = nextX;
  if (canStand(player.x, nextY)) player.y = nextY;
};

const shoot = (): void => {
  let target: Enemy | null = null;
  let targetDistance = Infinity;
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    const distance = Math.hypot(dx, dy);
    const angle = Math.abs(normalizeAngle(Math.atan2(dy, dx) - player.angle));
    if (
      angle < 0.075 &&
      distance < targetDistance &&
      clearLine(player.x, player.y, enemy.x, enemy.y)
    ) {
      target = enemy;
      targetDistance = distance;
    }
  }
  if (target !== null) {
    target.health -= 1;
    if (target.health <= 0) target.alive = false;
  }
  muzzleFrames = 5;
};

const updateEnemies = (delta: number): void => {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.hypot(dx, dy);
    enemy.attackTimer -= delta;
    if (
      distance < 0.72 &&
      clearLine(enemy.x, enemy.y, player.x, player.y) &&
      enemy.attackTimer <= 0
    ) {
      player.health = Math.max(0, player.health - 8);
      enemy.attackTimer = 0.65;
    } else if (
      distance < 7 &&
      distance > 0.8 &&
      clearLine(enemy.x, enemy.y, player.x, player.y)
    ) {
      const speed = delta * 0.7;
      const nextX = enemy.x + (dx / distance) * speed;
      const nextY = enemy.y + (dy / distance) * speed;
      if (cellAt(nextX, enemy.y) === "0") enemy.x = nextX;
      if (cellAt(enemy.x, nextY) === "0") enemy.y = nextY;
    }
  }
};

const castScene = (): void => {
  DrawRectangle(0, 0, screenWidth, screenHeight / 2, ceilingColor);
  DrawRectangle(0, screenHeight / 2, screenWidth, screenHeight / 2, floorColor);

  for (const ray of frameNumbers(rayCount)) {
    const camera = (2 * ray) / rayCount - 1;
    const rayAngle = player.angle + Math.atan(camera * Math.tan(fieldOfView / 2));
    const rayX = Math.cos(rayAngle);
    const rayY = Math.sin(rayAngle);
    let mapX = Math.floor(player.x);
    let mapY = Math.floor(player.y);
    const deltaX = Math.abs(1 / rayX);
    const deltaY = Math.abs(1 / rayY);
    const stepX = rayX < 0 ? -1 : 1;
    const stepY = rayY < 0 ? -1 : 1;
    let sideX =
      rayX < 0 ? (player.x - mapX) * deltaX : (mapX + 1 - player.x) * deltaX;
    let sideY =
      rayY < 0 ? (player.y - mapY) * deltaY : (mapY + 1 - player.y) * deltaY;
    let side = 0;

    const maximumRaySteps = level.length * level[0].length;
    for (const _step of frameNumbers(maximumRaySteps)) {
      if (cellAt(mapX, mapY) !== "0") break;
      if (sideX < sideY) {
        sideX += deltaX;
        mapX += stepX;
        side = 0;
      } else {
        sideY += deltaY;
        mapY += stepY;
        side = 1;
      }
    }

    let distance;
    if (side === 0) {
      distance = (mapX - player.x + (1 - stepX) / 2) / rayX;
    } else {
      distance = (mapY - player.y + (1 - stepY) / 2) / rayY;
    }
    distance = Math.max(0.05, distance);
    depthBuffer[ray] = distance;
    const wallHeight = Math.min(
      screenHeight,
      Math.floor(screenHeight / distance),
    );
    const wallTop = Math.floor((screenHeight - wallHeight) / 2);
    const shade = Math.min(
      wallColors.length - 1,
      Math.floor(distance / 1.8) + side,
    );
    DrawRectangle(ray * rayWidth, wallTop, rayWidth + 1, wallHeight, wallColors[shade]);
  }
};

const drawEnemies = (): void => {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    const distance = Math.hypot(dx, dy);
    const relative = normalizeAngle(Math.atan2(dy, dx) - player.angle);
    if (Math.abs(relative) >= fieldOfView / 1.7) continue;
    const screenX = Math.floor(
      screenWidth / 2 + Math.tan(relative) * (screenWidth / 2) / Math.tan(fieldOfView / 2),
    );
    const rayIndex = Math.max(
      0,
      Math.min(rayCount - 1, Math.floor(screenX / rayWidth)),
    );
    if (distance >= depthBuffer[rayIndex]) continue;

    const size = Math.min(screenHeight, Math.floor(screenHeight / distance));
    const left = Math.floor(screenX - size / 4);
    const top = Math.floor(screenHeight / 2 - size / 2);
    DrawRectangle(left, top + Math.floor(size * 0.24), Math.floor(size / 2), Math.floor(size * 0.7), enemyColor);
    DrawRectangle(left + Math.floor(size * 0.1), top, Math.floor(size * 0.3), Math.floor(size * 0.32), enemyDark);
    DrawRectangle(left + Math.floor(size * 0.15), top + Math.floor(size * 0.1), Math.max(2, Math.floor(size * 0.05)), Math.max(2, Math.floor(size * 0.05)), RED);
    DrawRectangle(left + Math.floor(size * 0.3), top + Math.floor(size * 0.1), Math.max(2, Math.floor(size * 0.05)), Math.max(2, Math.floor(size * 0.05)), RED);
  }
};

const drawWeapon = (): void => {
  const gunWidth = 150;
  const left = screenWidth / 2 - gunWidth / 2;
  DrawRectangle(left, screenHeight - 105, gunWidth, 105, gunColor);
  DrawRectangle(left + 48, screenHeight - 145, 54, 65, DARKGRAY);
  if (muzzleFrames > 0) {
    DrawRectangle(screenWidth / 2 - 16, screenHeight - 180, 32, 40, YELLOW);
    muzzleFrames -= 1;
  }
  DrawRectangle(screenWidth / 2 - 8, screenHeight / 2, 16, 2, RAYWHITE);
  DrawRectangle(screenWidth / 2, screenHeight / 2 - 8, 2, 16, RAYWHITE);
};

const drawMinimap = (): void => {
  const cellSize = 8;
  const originX = 12;
  const originY = 48;
  for (const [y, row] of level.entries()) {
    for (const [x, cell] of row.split("").entries()) {
      if (cell === "1") {
        DrawRectangle(originX + x * cellSize, originY + y * cellSize, cellSize, cellSize, MAROON);
      }
    }
  }
  for (const enemy of enemies) {
    if (enemy.alive) {
      DrawRectangle(
        originX + Math.floor(enemy.x * cellSize) - 2,
        originY + Math.floor(enemy.y * cellSize) - 2,
        4,
        4,
        enemyColor,
      );
    }
  }
  const playerX = originX + Math.floor(player.x * cellSize);
  const playerY = originY + Math.floor(player.y * cellSize);
  DrawRectangle(playerX - 2, playerY - 2, 5, 5, BLUE);
  DrawLine(
    playerX,
    playerY,
    playerX + Math.floor(Math.cos(player.angle) * 10),
    playerY + Math.floor(Math.sin(player.angle) * 10),
    RAYWHITE,
  );
};

resetGame();
InitWindow(screenWidth, screenHeight, "GocciaScript raycaster: Drop of Doom");
SetTargetFPS(60);

try {
  for (const renderedFrame of frameNumbers(maximumFrames)) {
    if (WindowShouldClose()) break;
    const delta = Math.min(GetFrameTime(), 0.05);
    if (player.health > 0) {
      if (IsKeyDown(KEY_W) || IsKeyDown(KEY_UP)) movePlayer(moveSpeed * delta);
      if (IsKeyDown(KEY_S) || IsKeyDown(KEY_DOWN)) movePlayer(-moveSpeed * delta);
      if (IsKeyDown(KEY_A)) strafePlayer(-moveSpeed * delta);
      if (IsKeyDown(KEY_D)) strafePlayer(moveSpeed * delta);
      if (IsKeyDown(KEY_LEFT)) player.angle -= turnSpeed * delta;
      if (IsKeyDown(KEY_RIGHT)) player.angle += turnSpeed * delta;
      player.angle = normalizeAngle(player.angle);
      if (IsKeyPressed(KEY_SPACE)) shoot();
      updateEnemies(delta);
    } else if (IsKeyPressed(KEY_R)) {
      resetGame();
    }

    BeginDrawing();
    ClearBackground(BLACK);
    castScene();
    drawEnemies();
    drawWeapon();
    drawMinimap();
    DrawText("DROP OF DOOM", 12, 12, 24, RAYWHITE);
    DrawText("HEALTH " + player.health, screenWidth - 170, 16, 22, player.health > 25 ? RAYWHITE : RED);
    DrawText("WASD move  arrows turn  Space fire", 250, 16, 18, RAYWHITE);
    DrawFPS(screenWidth - 100, 48);
    if (player.health <= 0) {
      DrawRectangle(220, 220, 520, 120, BLACK);
      DrawText("YOU DIED", 365, 235, 42, RED);
      DrawText("Press R to restart", 365, 292, 22, RAYWHITE);
    }
    EndDrawing();
    if (screenshotPath.length > 0 && renderedFrame === 1) {
      TakeScreenshot(screenshotPath);
    }
  }
} finally {
  CloseWindow();
  closeRaylib();
}
