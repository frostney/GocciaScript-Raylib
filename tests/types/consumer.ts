// Type-only consumer of the generated declarations; `npm run test:types`
// compiles it and never runs it. That script passes `--moduleSuffixes .d` so
// the import resolves to raylib.d.ts rather than the untyped runtime module.
import type * as Raylib from "../../bindings/raylib";
import type {
  AudioStreamValue,
  ColorValue,
  FFIPointer,
  FFIPointerInput,
  GocciaFFI,
} from "../../bindings/raylib";

declare const raylib: typeof Raylib;
declare const FFI: GocciaFFI;

const stream: AudioStreamValue = raylib.AudioStream.create({
  sampleRate: 44100,
});
export const nativeField: FFIPointer = stream.buffer;
export const streamStorage: ArrayBuffer = FFI.metadata(stream).buffer;
export const streamSize: number = stream.size;
export const streamPointer: FFIPointerInput = stream;

const color: ColorValue = raylib.Color.create({ r: 1, g: 2, b: 3, a: 4 });
export const colorStorage: ArrayBuffer = color.buffer;

raylib.LoadShader(null, "fragment.glsl");
export const replaced: string = raylib.TextReplace("a-b", "-", null);
export const formatted: string = raylib.TextFormat(
  "%d",
  FFI.varargs(["i32"], [1]),
);
raylib.TraceLog(raylib.LOG_INFO, "ready", FFI.varargs([], []));
raylib.DrawCircle(20, 20, 10.5, raylib.RED);

// @ts-expect-error the variadic tail is required
raylib.TextFormat("%d");
// @ts-expect-error a plain array is not a typed variadic tail
raylib.TextFormat("%d", [1]);
// @ts-expect-error only documented nullable C strings accept null
raylib.TextLength(null);
// @ts-expect-error AudioStream.buffer is the native pointer field
export const wrongStorage: ArrayBuffer = stream.buffer;
// @ts-expect-error plain objects are not FFI aggregates
export const notAggregate: FFIPointerInput = { size: 4 };
// @ts-expect-error the aggregate brand is not an export
export type Brand = typeof Raylib.ffiAggregate;
