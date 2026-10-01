# Import-binding alias removal

Measured on 2026-10-01 while updating the bindings from GocciaScript 0.10.0 to
0.14.0, to decide whether Bunnymark should keep copying its raylib imports
into local constants.

## Setup

- AMD Ryzen 9 6900HX, Linux Mint 22.3 (x86-64)
- GocciaScript 0.10.0 and 0.14.0 release binaries, bytecode mode
- dynamically loaded raylib 6.0 at the pinned commit
- Xvfb with Mesa llvmpipe 25.2.8 (software OpenGL 4.5), so absolute frame rates
  are not comparable with the Apple M1 Max results in the other reports

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
0.12 microseconds more on 0.14.0. GocciaScript 0.11.0 lists the change as "retain resolved import
bindings".

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

For the whole update, the previous revision on 0.10.0 (aliases, heightmap
quad) was compared with this revision on 0.14.0 (direct imports, plane quad)
under the same workload, three interleaved runs each:

| Draw path | Previous revision, 0.10.0 | This revision, 0.14.0 |
|---|---|---|
| `DrawTextureV` | 2946, 2916, 2940 ms (mean 2934.0) | 2875, 2877, 2877 ms (mean 2876.3) |
| `DrawMeshInstanced` | 1260, 1290, 1268 ms (mean 1272.7) | 1182, 1181, 1176 ms (mean 1179.7) |

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
