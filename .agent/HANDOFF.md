# Handoff

Last updated: 2026-10-01

## Current task

Move the repository from GocciaScript 0.10.0 to 0.14.0 and replace the
workarounds that 0.10.0 forced with what 0.11.0 to 0.14.0 provide natively.

State: implemented and validated locally on the branch `t3code/4b7db725`, and
published as a pull request. Merging is left to Johannes. After the merge the
repository gets its first tag; the tag name is not decided yet.

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
- Which name the first tag gets. `github:` provider imports and npm
  publication both depend on it.

## Next steps

1. Merge the pull request once CI is green on both lanes.
2. Tag the merge commit.
3. Collect Bunnymark numbers across machines, then update
   `benchmarks/import-binding-aliases.md`.
4. Optimise the Bunnymark update loop, which now bounds the instanced path.
