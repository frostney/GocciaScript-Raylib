# DOOM executing in GocciaScript

This is the meme-accurate example: DOOM's WAD parser, level setup, thinkers,
game logic, AI, fixed-point math, BSP traversal, and 320x200 software renderer
execute as JavaScript/TypeScript inside GocciaScript's bytecode VM.

There is no native DOOM engine library and no WebAssembly engine. The only
native boundary is the repository's dynamic raylib binding, used for the
window, keyboard polling, one framebuffer upload per frame, and the FPS
overlay.

The GPL engine seed is the pinned pure-JavaScript LinuxDoom port
[`curioustorvald/tsvm-doom`](https://github.com/curioustorvald/tsvm-doom).
The preparation step converts its custom module exports into static
GocciaScript TypeScript modules and substitutes raylib platform modules.
`UPSTREAM.json` records the exact commit and tree.

## License boundary

The root package remains MIT. Everything in this directory is GPL-2.0-only and
is deliberately excluded from the npm package.

No id Software game data is committed or packaged. Supply a lawfully obtained
IWAD or use the optional checksummed Freedoom download. The sparse upstream
checkout explicitly excludes its bundled shareware WAD and music pack.

## Launch

Requirements:

- GocciaScript 0.10.0
- raylib 6.0 as a dynamic library
- Node.js, Git, Make, curl, shasum, and unzip

From the repository root:

```sh
make -C examples/doom-gpl run-freedoom
```

From this directory:

```sh
make run-freedoom
```

With an owned IWAD:

```sh
make run IWAD=/actual/absolute/path/to/doom.wad
```

The Freedoom target downloads version 0.13.0 into ignored `.cache` storage,
verifies its SHA-256 digest, and imports `freedoom1.wad` as immutable bytes.

Controls:

- arrows or WASD: move and turn
- Control: fire
- Space: use
- Shift: run
- Alt: strafe modifier
- 1-7: weapons
- Tab: automap

## Runtime syntax and performance

The engine uses classic `for`, `while`, and `do...while` loops extensively.
Those compatibility features are enabled only by this subproject's
`goccia.json`; the MIT bindings and smaller examples continue to use the
default syntax.

On an Apple M1 Max with GocciaScript 0.10.0 bytecode, the first working
320x200 build renders Freedoom E1M1 at roughly 3 FPS. This is a real engine
port, but it is not yet a real-time port. Stable 0.10.0 spends most of its time
in the software renderer and indexed-to-RGBA pixel loops.

Audio, menus, save files, and full Doom II parity are not wired into this first
GocciaScript host. The imported engine surface is strongest for single-player
Doom 1.

## Validation

```sh
make verify-source
make prepare
make test-palette
make smoke
```

`make test-palette` checks all 256 palette indices across all 14 DOOM
`PLAYPAL` slots against the packed RGBA fallback in both interpreter and
bytecode modes. The palette and fallback framebuffer use paired byte and
32-bit views, so the copied bytes remain RGBA on either little- or big-endian
hosts. `make smoke` uses the indexed-texture shader when available and falls
back to the packed RGBA display path if shader setup fails.

`make smoke` runs deterministic engine frames against cached Freedoom data and
writes `.cache/doom-goccia-smoke.png`. The current upstream port claims vanilla
demo synchronization, but its published repository does not contain the
claimed test corpus or reference goldens; this project therefore does not
repeat that fidelity claim without adding its own oracle tests.
