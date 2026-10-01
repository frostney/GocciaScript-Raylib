# Handoff

Last updated: 2026-10-01

## Current task

Make Bunnymark faster. Nothing is implemented yet; this file records the
measurements and the plan.

The work splits in two:

- **This repository**: a small change to `updateBunnies` that removes about a
  quarter of the update time with identical output.
- **GocciaScript**: the per-opcode cost of the bytecode VM is the real ceiling.
  This file gives the profile and a raylib-free reproduction to take there.

## State of the repository

- `main` is at the merge of PR #12. The 0.14.0 update (PR #11) is tagged
  `0.1.0`.
- `benchmarks/fleet-bunnymark.sh` compares a 0.10.0 revision with a current
  one on any machine. `CURRENT_REF=<ref>` selects the revision to measure.
- `benchmarks/bunnymark-update-loop.ts` times the update loop alone. It needs
  no window, no raylib and no capability.
- `benchmarks/import-binding-aliases.md` holds the fleet results.

## Where the frame goes

Measured on a Ryzen 9 6900HX with a Radeon RX 6600M, GocciaScript 0.14.0,
10,000 sprites, 150 frames, by timing each phase of the frame loop in a
scratch copy of `examples/lib/run-bunnymark.ts`:

| Draw path | Update | Draw | Overlay | Present | Whole frame |
|---|---:|---:|---:|---:|---:|
| `DrawMeshInstanced` | 27.6 ms | 0.25 ms | 0.03 ms | 0.33 ms | 28.2 ms |
| `DrawTextureV` | 30.3 ms | 72.4 ms | 0.04 ms | 0.43 ms | 103.2 ms |

The instanced path is 98% update loop. The same machine's two GPUs give the
same instanced frame rate, which confirms rendering is not the bound. The
`DrawTextureV` path is 70% native calls.

## Workstream A: the update loop in this repository

`benchmarks/bunnymark-update-loop.ts` runs the current `updateBunnies` and a
candidate, `updateHoisted`, and checks that both produce identical state.

```sh
GocciaRunner --ignore-config-permissions benchmarks/bunnymark-update-loop.ts
```

Three rounds on the Ryzen machine, 100 frames each:

| Variant | ms per frame |
|---|---:|
| Current | 28.13, 28.13, 28.09 |
| Hoisted | 20.49, 20.49, 20.51 |

That is 27% less update time. The transforms, positions and velocities are
identical after 100 frames.

The candidate makes two changes, measured separately in a scratch file:

| Change | ms per frame | Opcodes removed per sprite |
|---|---:|---|
| None | 28.1 | |
| Module constants read into locals before the loop | 24.3 | 3 `OP_GET_GLOBAL` |
| Edge tests compare against precomputed bounds | 26.5 | 4 `OP_ADD`, 3 `OP_LOAD_INT`, 1 `OP_SUB` |
| Both (`updateHoisted`) | 20.5 | all of the above |

**To do**

1. Move the body of `updateHoisted` into `updateBunnies` in
   `examples/lib/bunny-state.ts`. `addBunnies` reads the same constants per
   sprite and can take the same treatment, but it only runs when sprites are
   added.
2. Keep `tests/unit/bunny-state.test.ts` passing; it pins the edge-reversal
   semantics. Note that the bottom edge test is `y + halfHeight - 40 < 0`.
3. Run the gates in the README. `npm run test:bunnymark:visual` must still
   report the direct and instanced frames as byte-identical.
4. Measure end to end with `CURRENT_REF=<new revision>
   benchmarks/fleet-bunnymark.sh`. Expected, not measured: the instanced frame
   on the Ryzen machine falls from about 28 ms to about 21 ms, so from about
   37 FPS to about 47 FPS.
5. Remove `updateHoisted` from the benchmark file, or replace it with the
   next candidate.

**Measured but not recommended**

| Variant | ms per frame | Why not |
|---|---:|---|
| Hoisted, with a counted `for` loop | about 20.5 | Needs `compat-traditional-for-loop`; the examples deliberately use default syntax. The hoisted `for...of` loop measured about 23 ms in the same run, so the gain is about 12%. |
| Positions kept only in the Float32 instance buffer | about 20 | Motion becomes single precision, so positions differ from the current ones. |

These two came from a scratch file that is not in the repository.

## Workstream B: GocciaScript

The profile below is from
`GocciaRunner --ignore-config-permissions benchmarks/bunnymark-update-loop.ts
--global BUNNYMARK_UPDATE_VARIANT=<variant> --profile=all
--profile-output=profile.json`, divided by the 3,000,000 sprite updates in a
run.

| Opcode | Current, per sprite | Hoisted, per sprite |
|---|---:|---:|
| `OP_GET_LOCAL` | 33.51 | 34.51 |
| `OP_MOVE` | 8.28 | 8.28 |
| `OP_ADD` | 8.26 | 4.26 |
| `OP_LOAD_HOLE` | 6.16 | 6.16 |
| `OP_ARRAY_SET` | 4.14 | 4.14 |
| `OP_ARRAY_GET` | 4.00 | 4.00 |
| `OP_LOAD_INT` | 3.33 | 0.33 |
| `OP_MUL` | 3.07 | 3.07 |
| `OP_GET_GLOBAL` | 3.07 | 0.07 |
| `OP_JUMP_IF_TRUE` | 3.01 | 3.01 |
| `OP_JUMP_IF_FALSE` | 2.01 | 2.01 |
| `OP_GT`, `OP_LT` | 2.00 each | 2.00 each |
| `OP_ITER_NEXT`, `OP_JUMP`, `OP_PUSH_FINALLY_HANDLER`, `OP_POP_HANDLER` | 1.01 each | 1.01 each |
| **Total** | **88.8** | **78.8** |

The scalar fast path hit rate is 100% and the update function allocates about
74 objects per call, so boxing and allocation are not the cost.

What the numbers say:

- **Average cost is about 30 ns per opcode.** 28.1 ms for 10,000 sprites at
  88.8 opcodes each is 32 ns; the hoisted variant is 26 ns.
- **`OP_GET_GLOBAL` costs about 125 ns.** Removing three per sprite saved
  3.8 ms per frame. A module-level `const` read inside a function compiles to
  this opcode; the three here are `bunnyInstanceStride`, `bunnyXOffset` and
  `bunnyYOffset`, all numeric literals.
- **Plain arithmetic costs about 20 ns per opcode.** Removing eight
  arithmetic and load opcodes per sprite saved 1.6 ms per frame.
- **`OP_GET_LOCAL` is 38 to 44% of all opcodes.** The loop body has 8
  typed-array accesses and 11 to 16 arithmetic or compare operations, and it
  executes 33 local reads plus 8 moves for them.
- **Each iteration pays for `for...of` and block scoping.** Six
  `OP_LOAD_HOLE` and one finally-handler push and pop per sprite.

Candidates for the engine, as hypotheses from the opcode counts. None of them
has been checked against the compiler or VM source:

1. Resolve a module-level `const` with a literal initializer at compile time,
   or bind it as an upvalue, instead of `OP_GET_GLOBAL`.
2. Let arithmetic, compare and typed-array opcodes take local registers as
   operands, so a local read does not need its own `OP_GET_LOCAL`.
3. Skip the hole initialization for a loop-body `const` that cannot be read
   before its initializer.
4. Give `for...of` over an array a path without the finally handler when the
   body cannot exit abnormally in a way that needs iterator close.

The release binaries are stripped, and `perf` is restricted on the Ryzen
machine (`perf_event_paranoid` is 4). Finding the native hot spots inside the
dispatch loop needs a symbolized build from the GocciaScript repository.

GocciaScript 0.14.0 already fused some of these patterns: its changelog lists
"fuse less-than compares into OP_JUMP_IF_NOT_LT" (#1217) and "fuse increment,
add-immediate, write IC, and local property reads" (#1215). This loop does not
show `OP_JUMP_IF_NOT_LT`; its compares are `>` and `<` joined by `||`.

## Workstream C: native call overhead

The `DrawTextureV` path spends 72.4 ms per frame drawing 10,000 sprites, about
7.2 microseconds per sprite. Per sprite the loop in
`examples/lib/run-bunnymark.ts` does six typed-array reads, six writes to
struct fields (`drawPosition.x`, `.y`, `drawColor.r`, `.g`, `.b`, `.a`), and
one bound call taking a 20-byte `Texture`, a `Vector2` and a `Color` by value.

How that splits between the field writes and the call itself was not measured.
A benchmark that times the call alone, with the structs written once outside
the loop, would separate them. This matters for any binding consumer that
draws per object, not only for Bunnymark.

## Constraints already decided

- The examples use default GocciaScript syntax. `tests/unit/syntax.test.ts`
  rejects `while` and classic `for` in them.
- Bunnymark motion stays double precision, and the instanced and
  `DrawTextureV` frames must stay byte-identical.
- `benchmarks/import-binding-aliases.md` is the record of the fleet numbers.
  Add new measurements; do not rewrite the existing rows.

## Measuring across machines

- `boiler` (the Ryzen machine) runs everything locally. Hardware rendering
  needs the desktop session unlocked; `DRI_PRIME=1` selects the RX 6600M.
  Ask Johannes before opening windows on his display.
- `firepit` (Apple M5 Max) and `burnside` (Apple M1 Max) do not accept SSH.
  They were driven through lantaarn; the lantaarn repository's
  `.agent/HANDOFF.md` on `boiler` describes how.
- The update-loop benchmark needs none of that. It runs anywhere GocciaRunner
  0.14.0 runs.

## Not verified

- The end-to-end frame rate after the hoisting change.
- Whether the same opcode costs hold on Apple silicon; the profile is from
  x86-64 only.
- Any of the four engine candidates against GocciaScript's source.
