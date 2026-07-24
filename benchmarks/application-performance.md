# Application-side performance validation

Measured on 2026-07-24 after applying the validated Bunnymark and DOOM
application-side improvements.

## Setup

- Apple M1 Max
- GocciaScript 0.10.0 in bytecode mode
- dynamically loaded raylib 6.0
- the repository's pinned Bunnymark asset and Freedoom 0.13.0 data

## Bunnymark

The workload used 10,000 sprites, an uncapped target, 25 frames per run, and
five measured trials. Each trial included application startup; frame time below
subtracts the reported startup time from GocciaScript's execution time.

| Trial | Startup | Execution | 25-frame time after startup |
|---:|---:|---:|---:|
| 1 | 451 ms | 2509.53 ms | 2058.53 ms |
| 2 | 451 ms | 2513.74 ms | 2062.74 ms |
| 3 | 444 ms | 2522.43 ms | 2078.43 ms |
| 4 | 452 ms | 2504.94 ms | 2052.94 ms |
| 5 | 444 ms | 2496.96 ms | 2052.96 ms |
| Mean | 448.4 ms | 2509.52 ms | 2061.12 ms |

The mean measured frame portion is 12.13 FPS. The preceding profiling baseline
for the same workload was 4.00 FPS. The example's normal 1,000-sprite,
60-FPS-capped startup smoke also passes.

## DOOM

Three 30-frame runs measured the cached-length and packed-palette candidate:

| Trial | Execution |
|---:|---:|
| 1 | 9000.02 ms |
| 2 | 9169.85 ms |
| 3 | 9016.46 ms |
| Mean | 9062.11 ms |

The retained profiling baseline took 13.30-13.41 seconds for the same 30-frame
workload, so the reproduced candidate reduces end-to-end execution time by
about 32%. This includes startup and is separate from the profiler's 4.71 FPS
steady-state estimate.

The indexed-texture shader was measured in five paired runs against that packed
RGBA fallback, alternating path order. Each run discarded 12 warm-up frames and
timed the next 24 frames with raylib's monotonic clock, for 120 measured frames
per path. The normal FPS overlay and periodic garbage collections remained
enabled.

| Display path | Mean frame time | Mean FPS | FPS range | Sample SD |
|---|---:|---:|---:|---:|
| packed RGBA fallback | 201.22 ms | 4.97 | 4.96-5.00 | 0.016 |
| indexed-texture shader | 158.33 ms | 6.32 | 6.28-6.35 | 0.028 |

The shader reduces whole-frame time by 21.31% and raises steady-state
performance by 1.27x for this stationary early-E1M1 scene. The deterministic
frame-8 shader and fallback screenshots are byte-identical when only the live
FPS overlay is disabled. The focused palette test checks all 256 entries in all
14 palette slots with 28,672 assertions in each of interpreter and bytecode
modes.
