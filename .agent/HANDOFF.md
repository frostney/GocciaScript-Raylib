# Handoff

Last updated: 2026-10-01

## Current task

Land the fleet benchmark pull request (#12). The Bunnymark numbers for
GocciaScript 0.10.0 versus 0.14.0 are collected for every machine and recorded
in `benchmarks/import-binding-aliases.md`; nothing is left to measure.

State: the 0.14.0 update is merged (PR #11, merge commit `3eeab1f`) and tagged
`0.1.0`. PR #12 (branch `bench/fleet-bunnymark`) adds
`benchmarks/fleet-bunnymark.sh`, which runs the comparison on one machine and
prints a Markdown table, and records the fleet results.

Fleet results, 10,000 sprites, 100 frames, three interleaved runs:

| Machine | Renderer | Instanced 0.10.0 -> 0.14.0 | Direct 0.10.0 -> 0.14.0 |
|---|---|---|---|
| boiler (Ryzen 9 6900HX, Linux) | Radeon RX 6600M | 31.3 -> 37.4 FPS | 10.2 -> 10.0 FPS |
| boiler | Radeon 680M | 31.4 -> 37.8 FPS | 10.2 -> 10.6 FPS |
| boiler | llvmpipe under Xvfb | 20.7 -> 23.0 FPS | 8.8 -> 9.1 FPS |
| firepit (Apple M5 Max, macOS 27.0.1) | Apple M5 Max | 51.5 -> 62.0 FPS | 17.8 -> 18.2 FPS |
| burnside (Apple M1 Max, macOS 26.5.2) | Apple M1 Max | 26.9 -> 30.9 FPS | 10.2 -> 10.5 FPS |

The whole fleet is measured and recorded in
`benchmarks/import-binding-aliases.md`. The Macs do not accept SSH; they were
driven through lantaarn (`lantaarn-ctl` from boiler over Tailscale), which was
capturing the screen at 30 FPS during the runs.

## What changed

- **Runtime pin**: `metadata/gocciascript.json`, CI, `tests/linux/Dockerfile`,
  npm scripts, the Node test harness and the DOOM Makefile target 0.14.0 and
  `GocciaRunner` (`GOCCIA_LOADER` is now `GOCCIA_RUNNER`).
- **Permissions**: `"unsafe-ffi"` is a hard error on 0.14.0. Both `goccia.json`
  files use a `permissions` block. The DOOM config also requests read access to
  `bindings/raylib.ts`, because that file is outside its project directory.
  Unit and palette tests pass `--ignore-config-permissions`; native-call tests
  and CI pass `-P`.
- **Generator**: all 600 functions are bound (was 488). `TraceLog` and
  `TextFormat` are variadic, the seven `*Raw` duplicates became
  `FFI.nullable("utf8string")`, and `AudioStream.buffer` keeps its native name.
  The declarations gained a branded `FFIAggregate`, `FFIAggregateMetadata`,
  `FFIVarargs` and `GocciaFFI`.
- **Examples**: Bunnymark uses `GenMeshPlane` and direct imports; DOOM scales
  with `DrawTextureEx`. Frames are byte-identical before and after.
- **Package entry point**: `package.json` has an `exports` map, so an installed
  copy is imported as `@frostney/gocciascript-raylib`; every other packaged file
  stays reachable by subpath.
- **Tests**: `tests/types/consumer.ts` is compiled by `npm run test:types`;
  `tests/fixtures/ffi-smoke.ts` covers mixed-float, variadic, nullable and
  exact-field-name calls; CI and Docker now run `make test-palette`.
- **Docs**: both READMEs, `SKIPPED.md`, and the new
  `benchmarks/import-binding-aliases.md`.

## Decisions made

- `allow-ffi` stays unscoped: library discovery falls back to a bare loader
  name and to `RAYLIB_LIBRARY_PATH`, which a path scope cannot describe.
- `Goccia.gc()` every 10 frames stays in `examples/doom-gpl/run.ts`. Without it
  the heap grows about 1.7 MB per frame until the memory ceiling forces a
  collection; a `max-memory` setting was no faster than the explicit call.
- The Node `.mjs` adapters stay: `GocciaRunner` has no host process or hashing
  API.
- `for...of` stays. On 0.14.0 a classic `for` is about 8 to 10% faster in the
  isolated update loop, which does not change the whole-frame conclusion.
- The package version stays `0.1.0`; the package is not on npm and the
  repository has no tags.
- The benchmark note keeps its software-rendered numbers for now. Johannes
  wants numbers from several machines before it is updated.

## Validation

Run on Linux x86-64 against the 0.14.0 release binaries, raylib at the pinned
commit, and a private Xvfb with Mesa llvmpipe: `npm run generate`, `npm test`,
`check:generated`, `test:types`, `test:abi`, `test:ffi`, `pack:check`, the five
window smokes, `test:bunnymark:visual`, `make test-palette` and
`make smoke GOCCIA_FLAGS=-P` all pass.

Not run locally: the macOS lane and the Docker build.

A scratch consumer project that installed the packed tarball imported the
bindings by name, by subpath, and as types under `tsc`.

On the Radeon RX 6600M the instanced Bunnymark path spends about 27.6 ms of a
28.2 ms frame in the JavaScript update loop at 10,000 sprites; drawing and
presenting take under 1 ms. The `DrawTextureV` path spends about 72 ms per
frame in its 10,000 native calls.

## Open questions

- Callback-taking raylib functions accept `FFI.callback(...).create(fn)` handles
  at run time, but `FFIPointerInput` does not type them. This predates the
  update.

## Next steps

1. Merge the fleet benchmark pull request (#12).
2. Optimise the Bunnymark update loop, which bounds the instanced path.
