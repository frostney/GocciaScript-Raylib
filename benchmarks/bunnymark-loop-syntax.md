# Bunnymark loop syntax benchmark

Measured on 2026-07-23 to determine whether the Bunnymark example should
enable GocciaScript's traditional-`for` or `while` compatibility syntax.

## Setup

- Apple M1 Max
- GocciaScript 0.10.0, bytecode mode
- dynamically loaded raylib 6.0
- 10,000 fixed-seed bunnies
- identical update, `DrawTextureV`, input, FFI, and rendering work
- target-FPS cap disabled
- 25 frames per run
- one complete warm-up per variant
- five interleaved measured trials
- all variants ran with the same compatibility flags so the flag configuration
  itself could not bias one variant

## Results

| Loop | Observed FPS trials | Mean FPS | Mean real time | Mean 25-frame time after startup |
|---|---|---:|---:|---:|
| current `for...of` | 4.1, 4.0, 4.1, 4.0, 4.1 | 4.06 | 8.006 s | 6.3348 s |
| indexed classic `for` | 4.0, 3.9, 3.9, 4.0, 4.0 | 3.96 | 8.168 s | 6.4842 s |
| indexed `while` | 4.0, 4.0, 4.0, 4.0, 4.1 | 4.02 | 8.012 s | 6.3692 s |

The `while` result was effectively tied with `for...of` and about 0.5% slower
after startup, within normal run noise. Classic `for` was consistently about
2.4% slower in the measured frame portion.

## Decision

Keep `for...of` and leave both compatibility flags disabled. Loop syntax is
not the Bunnymark bottleneck: at this sprite count, rendering and the
per-sprite FFI call to `DrawTextureV` dominate. A material speed-up therefore
needs fewer native crossings or a batched native drawing surface, not legacy
loop syntax.
