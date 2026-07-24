# GocciaScript raylib

Generated, ABI-checked [raylib 6.0](https://github.com/raysan5/raylib/releases/tag/6.0)
bindings for [GocciaScript 0.10.0](https://github.com/frostney/GocciaScript/releases/tag/0.10.0).
The bindings load raylib as a dynamic library and keep unsafe FFI use explicit.

## What is included

- deterministic TypeScript bindings and declarations generated from the pinned
  official `raylib_api.json`;
- all 35 native struct layouts checked against `raylib.h`;
- a machine-readable stable-runtime skip report;
- macOS and Linux dynamic-library discovery;
- typed basic-window, keyboard-input, embedded-image, Bunnymark, and playable
  raycasting examples, all with an on-screen FPS counter;
- a separately licensed DOOM port whose game logic and software renderer
  execute inside GocciaScript, with dynamic raylib used only for platform I/O;
- package, generator, ABI, and representative native-call validation.

GocciaScript reserves aggregate properties named `buffer` and `byteOffset`.
raylib's `AudioStream.buffer` is therefore exposed as `nativeBuffer`; the
generated `RAYLIB_FIELD_ALIASES` object records this sole 6.0 rename.

`const char *` values and non-owned text returns use GocciaScript's UTF-8
string descriptor. Mutable `char *` arguments and owned `char *` returns remain
raw pointers so callers can mutate them and return the exact allocation to
`UnloadFileText`, `UnloadUTF8`, or `MemFree`. Pointer arguments accept native
pointers, buffers, typed arrays, aggregates, and `null`.

Stable FFI cannot express a parameter that accepts either a JavaScript string
or a null pointer with one descriptor. `LoadShaderRaw`,
`LoadShaderFromMemoryRaw`, and `LoadAutomationEventListRaw` are therefore
generated as additional raw-pointer bindings for their documented nullable
C-string parameters. The four text-replacement APIs likewise expose `Raw`
variants for their nullable replacement argument. The normal exports remain
convenient for non-null strings.

The official raylib 6.0 API describes 600 functions. Three are intentionally
outside the 0.1 scope (`TraceLog`, `TextFormat`, and `DrawBillboardPro`).
GocciaScript 0.10.0 also rejects functions that mix a top-level `f32` argument
with other top-level argument types. Every other function is generated, and
[SKIPPED.md](SKIPPED.md) records the exact stable-version boundary. No shim is
presented as native coverage.

## Requirements

- GocciaScript 0.10.0
- raylib 6.0 built as a shared/dynamic library
- Node.js 24 or newer for host filesystem, hashing, compiler, and packaging
  orchestration
- a C11 compiler for ABI validation

On macOS:

```sh
brew install raylib
```

On Linux, install or build raylib 6.0 with `BUILD_SHARED_LIBS=ON` and make
`libraylib.so` discoverable. The generated module checks the current directory,
common `/usr` and `/usr/local` paths, and the platform loader path. A launcher
can set `globalThis.RAYLIB_LIBRARY_PATH` before dynamically importing the
bindings when raylib lives elsewhere.

## Run an example

The repository `goccia.json` opts into only the unsafe FFI extension. The
examples are TypeScript, which GocciaScript parses as types-as-comments, and
use `for...of`; neither the traditional-`for` nor `while` compatibility flag
is required:

```sh
GocciaScriptLoader examples/basic-window.ts
GocciaScriptLoader examples/basic-input.ts
GocciaScriptLoader examples/image-loading.ts
GocciaScriptLoader examples/bunnymark.ts
GocciaScriptLoader examples/doom-clone.ts
```

Bunnymark uses an immutable ESM byte import of the pinned `raybunny.png`; it
does not read an asset through a host filesystem API.

`doom-clone.ts` remains a small, clean-room MIT raycaster. The repository also
contains [an actual DOOM engine example](examples/doom-gpl/README.md) in the
separately licensed `examples/doom-gpl/` subproject:

```sh
make -C examples/doom-gpl run IWAD=/absolute/path/to/doom.wad
# Or download checksummed, freely redistributable Freedoom data:
make -C examples/doom-gpl run-freedoom
```

The GPL subproject adapts a pinned pure-JavaScript LinuxDoom port into static
GocciaScript TypeScript modules. WAD parsing, thinkers, AI, BSP traversal, and
software rendering run in GocciaScript bytecode. There is no native or
WebAssembly DOOM engine; dynamic raylib handles the window, input, framebuffer
upload, and FPS overlay. No proprietary IWAD is committed, and the entire GPL
directory is excluded from the MIT npm tarball.

The full engine legitimately uses classic `for`, `while`, and `do...while`
loops. Their compatibility flags are scoped to `examples/doom-gpl/goccia.json`;
the bindings and smaller MIT examples do not enable them. The initial
GocciaScript 0.10.0 implementation rendered at roughly 3 FPS on an Apple M1
Max. The packed-palette fallback reaches 4.97 FPS, and presenting the indexed
framebuffer through a palette-texture shader reaches 6.32 FPS in controlled
steady-state measurements. It is genuine but not yet real-time.

## Bunnymark performance

A five-trial, uncapped comparison with 10,000 fixed-seed sprites found no
performance case for compatibility loops:

| Loop | Mean observed FPS | Mean 25-frame time after startup |
|---|---:|---:|
| current `for...of` | 4.06 | 6.3348 s |
| indexed classic `for` | 3.96 | 6.4842 s |
| indexed `while` | 4.02 | 6.3692 s |

The current `for...of` loop stays, and both legacy loop flags remain disabled.
That loop experiment predates the application-side import aliases and the
public-raylib instanced drawing path. With the import-binding fast path held
constant, the 10,000-sprite workload now measures 30.35 FPS versus the
12.99-FPS `DrawTextureV` baseline. The renderer uses `DrawMeshInstanced` and a
custom shader through the generated bindings; it has no companion native
library. [Loop methodology](benchmarks/bunnymark-loop-syntax.md),
[the preceding application baseline](benchmarks/application-performance.md),
and [the instancing validation](benchmarks/bunnymark-instancing.md) are
recorded in the repository.

## Project scripts and tests

The pure API-repair and normalization core is GocciaScript-compatible
TypeScript in `scripts/lib/api-core.ts`, and the unit suite runs in
GocciaScript's own test runner in both interpreter and bytecode modes.

The thin `.mjs` host adapters remain Node scripts because regeneration must
read and write the real checkout, compute SHA-256 digests, invoke the C
compiler, and inspect `npm pack`. Stable `GocciaScriptLoader` intentionally
does not expose ambient host filesystem or process APIs; the sandbox runner
uses a virtual filesystem whose writes are returned as a diff rather than
materialized into the checkout.

## Regenerate and validate

```sh
npm run vendor:update  # only when intentionally refreshing pinned inputs
npm run generate
npm test
npm run check:generated
npm run test:types

GOCCIA_LOADER=/path/to/GocciaScriptLoader npm run test:abi
GOCCIA_LOADER=/path/to/GocciaScriptLoader npm run test:ffi
npm run pack:check
```

`RAYLIB_INCLUDE_DIR` may point at a non-standard header directory for the ABI
test. Regeneration verifies the pinned commit, checksums, repaired JSON defect,
inventory, and output determinism before writing artifacts.

The Linux release lane can also be reproduced from macOS or Linux with:

```sh
docker build -f tests/linux/Dockerfile .
```

## Upgrade policy

1. Update `metadata/raylib.json` to an official stable tag and commit.
2. Record new source and asset SHA-256 values.
3. Run `npm run vendor:update && npm run generate`.
4. Review the normalized inventory and skip report.
5. Run unit, ABI, FFI, package, and example smoke validation on macOS and Linux.

Do not silently accept upstream input drift: pin changes and the narrow JSON
repair are reviewable release changes.

## License

This package is available under the [MIT License](LICENSE). raylib remains
under its upstream zlib license. `examples/doom-gpl/` is an explicitly
separate GPL-2.0-only subproject and is excluded from the MIT npm package.
No proprietary IWAD is included anywhere.
