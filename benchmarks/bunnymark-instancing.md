# Bunnymark public-Raylib instancing experiment

Measured on 2026-07-24 to test whether GocciaScript-Raylib can remove the
per-sprite FFI bottleneck without a companion native library.

## Setup

- Apple M1 Max, macOS 26.5.2
- GocciaScript import-binding fast path at commit `3b19fdbe`
- production loader SHA-256
  `4d86950f941e4028e098090a7cb3e9a7bda1d713b78f59334fa92586f99da7d0`
- GocciaScript-Raylib baseline at commit `ff978c1`
- dynamically loaded raylib 6.0
- 10,000 fixed-seed sprites (`1234`)
- uncapped target, 25 frames per run
- one unrecorded warm-up per variant
- five measured pairs with alternating run order
- overlays and normal Bunnymark update/collision work enabled

The baseline is the import-fast-path `DrawTextureV` implementation on
`origin/main`. The candidate uses only existing public bindings:
`BeginShaderMode`, `DrawMeshInstanced`, and `EndShaderMode`.

## Results

| Pair | First path | Baseline frame time | Baseline FPS | Instanced frame time | Instanced FPS |
|---:|---|---:|---:|---:|---:|
| 1 | baseline | 1963 ms | 12.74 | 811 ms | 30.83 |
| 2 | instanced | 1906 ms | 13.12 | 828 ms | 30.19 |
| 3 | baseline | 1908 ms | 13.10 | 822 ms | 30.41 |
| 4 | instanced | 1908 ms | 13.10 | 810 ms | 30.86 |
| 5 | baseline | 1941 ms | 12.88 | 849 ms | 29.45 |
| **Mean** | | **1925.2 ms** | **12.99** | **824.0 ms** | **30.35** |

The instanced path reduces the measured 25-frame portion by 57.2% and raises
observed FPS by 2.34x. Mean end-to-end loader execution falls from 2551.57 ms
to 1346.91 ms. Mean startup falls from 456.6 ms to 343.8 ms.

## Rendering equivalence

The graphical integration test renders frame 8 of the same fixed-seed,
1,000-sprite scene through both `DrawTextureV` and `DrawMeshInstanced`, with a
fixed update delta and the timing overlay disabled. The two 1280x720 PNG files
are byte-identical on both tested desktop paths:

- macOS/OpenGL:
  `982eb299ae1a855b3e4cbda832e4e34b49876999e1a3b710c392288f60bc1c3d`
- Linux/Xvfb/Mesa llvmpipe:
  `e22537b001590b497bad6c8da318d38339bef0fb4cdb95a8c8f449584e47d1a0`

The macOS image also byte-matches a test-instrumented capture from the
`origin/main` `DrawTextureV` implementation, not only the retained direct
fallback in the candidate.

The custom fragment shader retains raylib's default
`texture0 * colDiffuse * fragColor` formula. Instance order is insertion order,
and `BeginShaderMode` flushes prior queued 2D work before the instanced draw.

## Scope and tradeoffs

- This is a Bunnymark-specific `DrawTextureV` fast path for one 32x32 texture,
  not a new general Raylib API.
- Motion remains double precision. Exact byte colors and float instance
  transforms live in compact typed arrays; a small numeric index array avoids
  a costly custom iterator in the per-frame hot loop.
- Raylib still allocates, converts, uploads, and frees a 64-byte transform per
  sprite for every `DrawMeshInstanced` call (640 KiB per 10,000 sprites).
  A persistent rlgl VBO could have a higher ceiling but is outside this
  public-Raylib-only experiment.
- The shader is GLSL 330, matching the repository's pinned macOS and Linux
  desktop raylib builds. It is not a web/mobile shader path.
- The material owns the custom shader and attached bunny texture. If shader
  creation fails, the example falls back to its direct `DrawTextureV` path.
