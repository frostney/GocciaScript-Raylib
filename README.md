# GocciaScript raylib

Generated, ABI-checked [raylib 6.0](https://github.com/raysan5/raylib/releases/tag/6.0)
bindings for [GocciaScript 0.14.0](https://github.com/frostney/GocciaScript/releases/tag/0.14.0).
The bindings load raylib as a dynamic library and keep unsafe FFI use explicit.

## What is included

- deterministic TypeScript bindings and declarations for all 600 functions of
  the pinned official `raylib_api.json`;
- all 35 native struct layouts checked against `raylib.h`;
- a machine-readable skip report, currently empty;
- macOS and Linux dynamic-library discovery;
- typed basic-window, keyboard-input, embedded-image, Bunnymark, and playable
  raycasting examples, all with an on-screen FPS counter;
- a separately licensed DOOM port whose game logic and software renderer
  execute inside GocciaScript, with dynamic raylib used only for platform I/O;
- package, generator, ABI, and representative native-call validation.

Struct fields keep their exact native names. `AudioStream.buffer` is therefore
raylib's pointer field rather than the aggregate's backing store, which
`FFI.metadata(value)` returns as `buffer`, `byteOffset`, and `size` for every
aggregate.

`const char *` values and non-owned text returns use GocciaScript's UTF-8
string descriptor. Mutable `char *` arguments and owned `char *` returns remain
raw pointers so callers can mutate them and return the exact allocation to
`UnloadFileText`, `UnloadUTF8`, or `MemFree`. Pointer arguments accept native
pointers, buffers, typed arrays, aggregates, and `null`.

The documented nullable C-string parameters of `LoadShader`,
`LoadShaderFromMemory`, `LoadAutomationEventList`, and the four
text-replacement APIs use `FFI.nullable("utf8string")`, so they accept a string
or `null`.

`TraceLog` and `TextFormat` are bound as variadic functions. GocciaScript
requires the C variadic tail as exactly one typed `FFI.varargs` argument, even
when it is empty:

```ts
TextFormat("%s %03d", FFI.varargs(["utf8string", "i32"], ["raylib", 7]));
TraceLog(LOG_INFO, "ready", FFI.varargs([], []));
```

GocciaScript ships no TypeScript declarations for its `FFI` global. Code that
is type-checked against `bindings/raylib.d.ts` declares it with the exported
`GocciaFFI` interface: `declare const FFI: GocciaFFI;`.

The official raylib 6.0 API describes 600 functions and all 600 are generated.
[SKIPPED.md](SKIPPED.md) remains the place where a future runtime or generator
limit is recorded. No shim is presented as native coverage.

## Requirements

- GocciaScript 0.14.0
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

GocciaScript denies host access by default. The repository `goccia.json`
requests only the `ffi` capability, and a config's request applies once you
have reviewed and trusted it:

```sh
GocciaRunner --trust goccia.json
```

Pass `-P` instead to accept the request for a single run without storing
trust.

## Use from another project

The package entry point is the generated bindings, so an installed copy is
imported by name:

```ts
import { InitWindow, closeRaylib } from "@frostney/gocciascript-raylib";
```

GocciaScript resolves a package name only when the importing project grants
`import` for `node_modules`, and it installs the `FFI` global only with the
`ffi` grant. That project's own `goccia.json` therefore needs both, trusted
or accepted with `-P` like the request above:

```json
{
  "source-type": "module",
  "permissions": {
    "allow-ffi": true,
    "allow-import": ["node_modules=."]
  }
}
```

Other files in the package, such as `SKIPPED.json`, stay importable by subpath.
Bindings that are instead imported by relative path from outside the importing
project need an `allow-read` grant for `bindings/raylib.ts`. Without the `ffi`
grant the bindings throw a `TypeError` that names it.

The examples are TypeScript, which GocciaScript parses as types-as-comments, and
use `for...of`; neither the traditional-`for` nor `while` compatibility flag
is required:

```sh
GocciaRunner examples/basic-window.ts
GocciaRunner examples/basic-input.ts
GocciaRunner examples/image-loading.ts
GocciaRunner examples/bunnymark.ts
GocciaRunner examples/doom-clone.ts
```

Bunnymark uses an immutable ESM byte import of the pinned `raybunny.png`; it
does not read an asset through a host filesystem API.

`doom-clone.ts` remains a small, clean-room MIT raycaster. The repository also
contains [an actual DOOM engine example](examples/doom-gpl/README.md) in the
separately licensed `examples/doom-gpl/` subproject:

```sh
GocciaRunner --trust examples/doom-gpl/goccia.json
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
loops. Their compatibility flags are scoped to `examples/doom-gpl/goccia.json`,
which also requests `ffi` and read access to `bindings/raylib.ts`, because the
bindings live outside the subproject's own directory. The bindings and smaller MIT
examples do not enable those flags. The initial
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
That loop experiment predates the public-raylib instanced drawing path. With
GocciaScript's import-binding fast path held constant, the 10,000-sprite
workload measured 30.35 FPS versus the 12.99-FPS `DrawTextureV` baseline. The
renderer uses `DrawMeshInstanced` and a custom shader through the generated
bindings; it has no companion native library.

On GocciaScript 0.10.0 every read of an imported binding was slow enough that
the example copied its imports into local constants. GocciaScript 0.11.0 and
later retain resolved import bindings, so the example now calls its imports
directly.
[Loop methodology](benchmarks/bunnymark-loop-syntax.md),
[the preceding application baseline](benchmarks/application-performance.md),
[the instancing validation](benchmarks/bunnymark-instancing.md), and
[the import-alias removal](benchmarks/import-binding-aliases.md) are recorded
in the repository.

## Project scripts and tests

The pure API-repair and normalization core is GocciaScript-compatible
TypeScript in `scripts/lib/api-core.ts`, and the unit suite runs in
GocciaScript's own test runner in both interpreter and bytecode modes.

The thin `.mjs` host adapters remain Node scripts because regeneration and
validation must compute SHA-256 digests, invoke the C compiler, and inspect
`npm pack`. `GocciaRunner` exposes no host process or hashing API. Its sandbox
mode can write regenerated files back to the checkout through `--copy-rw`, but
that would move only the file I/O into GocciaScript, not those steps.

## Regenerate and validate

```sh
npm run vendor:update  # only when intentionally refreshing pinned inputs
npm run generate
npm test
npm run check:generated
npm run test:types

GOCCIA_RUNNER=/path/to/GocciaRunner npm run test:abi
GOCCIA_RUNNER=/path/to/GocciaRunner npm run test:ffi
npm run pack:check
```

`npm run test:types` checks the declarations and a small consumer program
against them. `RAYLIB_INCLUDE_DIR` may point at a non-standard header directory
for the ABI test. `GOCCIA_TEST_RUNNER` selects the `GocciaTestRunner` binary
for `npm test` in the same way. The unit suite runs with
`--ignore-config-permissions` because it needs no capability, and the
native-call tests accept the config's `ffi` request for their own run, so
neither depends on a trust store. Regeneration verifies the pinned commit,
checksums, repaired JSON defect, inventory, and output determinism before
writing artifacts.

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
