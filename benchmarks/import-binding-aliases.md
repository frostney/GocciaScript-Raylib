# Import-binding alias removal

Measured on 2026-10-01 while updating the bindings from GocciaScript 0.10.0 to
0.14.0, to decide whether Bunnymark should keep copying its raylib imports
into local constants.

## Setup

- AMD Ryzen 9 6900HX, Linux Mint 22.3 (x86-64)
- GocciaScript 0.10.0 and 0.14.0 release binaries, bytecode mode
- dynamically loaded raylib 6.0 at the pinned commit
- Xvfb with Mesa llvmpipe 25.2.8 (software OpenGL 4.5) for the two sections
  below; [Across machines](#across-machines) lists its own renderers

## Imported binding versus local alias

A module exports `add` and a numeric constant. A second module calls
`add(sum, K)` 300,000 times, once through the imported bindings and once
through module-level `const` copies of them. Each variant ran three times in
one process; the three runs agreed within 0.4%.

| GocciaScript | Through imports | Through local aliases | Ratio |
|---|---:|---:|---:|
| 0.10.0 | 5773.1 ms | 192.6 ms | 29.97x |
| 0.14.0 | 218.7 ms | 149.1 ms | 1.47x |

Each iteration reads two imported bindings. Compared with a local read, one
imported read cost about 9.3 microseconds more on 0.10.0 and costs about
0.12 microseconds more on 0.14.0. GocciaScript 0.11.0 lists the change as
"retain resolved import bindings".

## Bunnymark with and without aliases

The 0.14.0 example was run with the alias block from the previous revision and
with direct imports: 10,000 fixed-seed sprites (`1234`), uncapped target,
25 frames per run, three interleaved runs per variant. The values are the
example's own 25-frame time after startup.

| Draw path | Direct imports | Local aliases |
|---|---|---|
| `DrawTextureV` | 2803, 2784, 2908 ms (mean 2831.7) | 2733, 2852, 2831 ms (mean 2805.3) |
| `DrawMeshInstanced` | 1118, 1142, 1196 ms (mean 1152.0) | 1125, 1168, 1184 ms (mean 1159.0) |

The means differ by 0.9% on the per-sprite `DrawTextureV` path and by 0.6% in
the other direction on the instanced path. Both differences are smaller than
the spread between runs of one variant.

## Across machines

`benchmarks/fleet-bunnymark.sh` compared the last 0.10.0 revision (`70a0453`:
aliases, heightmap quad) on GocciaScript 0.10.0 with tag `0.1.0` (direct
imports, plane quad) on GocciaScript 0.14.0. Each row is 10,000 fixed-seed
sprites, uncapped, 100 frames per run after startup, three interleaved runs
per variant, reported as total frames over total frame time. The comparison
covers the engine and the example together.

| Machine | Renderer | Draw path | 0.10.0 | 0.14.0 | Change |
|---|---|---|---:|---:|---:|
| Apple M5 Max, macOS 27.0.1 | Apple M5 Max | `DrawMeshInstanced` | 51.5 FPS | 62.0 FPS | +20.3% |
| Apple M5 Max, macOS 27.0.1 | Apple M5 Max | `DrawTextureV` | 17.8 FPS | 18.2 FPS | +2.2% |
| Apple M1 Max, macOS 26.5.2 | Apple M1 Max | `DrawMeshInstanced` | 26.9 FPS | 30.9 FPS | +14.7% |
| Apple M1 Max, macOS 26.5.2 | Apple M1 Max | `DrawTextureV` | 10.2 FPS | 10.5 FPS | +2.6% |
| Ryzen 9 6900HX, Linux Mint 22.3 | Radeon RX 6600M | `DrawMeshInstanced` | 31.3 FPS | 37.4 FPS | +19.7% |
| Ryzen 9 6900HX, Linux Mint 22.3 | Radeon RX 6600M | `DrawTextureV` | 10.2 FPS | 10.0 FPS | -2.3% |
| Ryzen 9 6900HX, Linux Mint 22.3 | Radeon 680M | `DrawMeshInstanced` | 31.4 FPS | 37.8 FPS | +20.4% |
| Ryzen 9 6900HX, Linux Mint 22.3 | Radeon 680M | `DrawTextureV` | 10.2 FPS | 10.6 FPS | +4.6% |
| Ryzen 9 6900HX, Linux Mint 22.3 | llvmpipe under Xvfb | `DrawMeshInstanced` | 20.7 FPS | 23.0 FPS | +11.0% |
| Ryzen 9 6900HX, Linux Mint 22.3 | llvmpipe under Xvfb | `DrawTextureV` | 8.8 FPS | 9.1 FPS | +3.1% |

Per-run 100-frame times in milliseconds, in run order:

| Machine and renderer | Draw path | 0.10.0 | 0.14.0 |
|---|---|---|---|
| Apple M5 Max | `DrawMeshInstanced` | 1948, 1934, 1945 | 1629, 1595, 1618 |
| Apple M5 Max | `DrawTextureV` | 5504, 5603, 5769 | 5563, 5469, 5480 |
| Apple M1 Max | `DrawMeshInstanced` | 3913, 3644, 3583 | 3229, 3246, 3236 |
| Apple M1 Max | `DrawTextureV` | 9857, 9747, 9717 | 9566, 9510, 9508 |
| Radeon RX 6600M | `DrawMeshInstanced` | 3197, 3187, 3212 | 2658, 2676, 2682 |
| Radeon RX 6600M | `DrawTextureV` | 9760, 9840, 9804 | 10062, 10018, 10011 |
| Radeon 680M | `DrawMeshInstanced` | 3186, 3185, 3190 | 2645, 2651, 2644 |
| Radeon 680M | `DrawTextureV` | 9852, 9825, 9796 | 9394, 9383, 9403 |
| llvmpipe under Xvfb | `DrawMeshInstanced` | 4797, 4851, 4857 | 4322, 4363, 4382 |
| llvmpipe under Xvfb | `DrawTextureV` | 11285, 11326, 11320 | 10941, 11027, 10928 |

The instanced path gains 15 to 20% on every hardware renderer, and the
per-sprite `DrawTextureV` path stays within 5% either way. On the Ryzen
machine the two GPUs give the same instanced frame rate: at 10,000 sprites the
frame is bound by the JavaScript update loop, which measured about 27.6 ms of
a 28.2 ms frame on the Radeon RX 6600M, with drawing and presenting under
1 ms.

Both Macs were driven through a remote-desktop session that captured the
screen at 30 FPS during the runs, so their absolute numbers may be slightly
low. The first 0.10.0 instanced run on the M1 Max is about 8% slower than the
other two.

## Decision

The alias block is removed. It no longer changes the measured frame time, and
the instanced path, which is the default, reads no imported binding per
sprite.

## Rendering equivalence

The same update replaced two other 0.10.0 workarounds with functions that
0.10.0 could not bind because they mix `float` with other argument types.
Both replacements were checked against the previous rendering:

- Bunnymark's instanced quad now comes from `GenMeshPlane` instead of a
  `GenMeshHeightmap` call on a throwaway 2x2 image. The graphical integration
  test still finds the instanced and `DrawTextureV` frames byte-identical, with
  the SHA-256 recorded for Linux in
  [the instancing report](bunnymark-instancing.md):
  `e22537b001590b497bad6c8da318d38339bef0fb4cdb95a8c8f449584e47d1a0`.
- DOOM scales its 320x200 texture with `DrawTextureEx` instead of a zoomed
  `Camera2D`. Frame 8 of the Freedoom smoke scene, with the FPS overlay
  disabled, is byte-identical before and after on both the indexed-shader and
  RGBA display paths:
  `2fdda7ef7a9f42f95e17a33e5e955618af5afd6b19a282781316024893c506e0`.
