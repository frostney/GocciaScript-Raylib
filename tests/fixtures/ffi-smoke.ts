import bunnyBytes from "../../examples/assets/raybunny.png" with { type: "bytes" };
import {
  AudioStream,
  CheckCollisionCircles,
  Color,
  ColorAlpha,
  ColorToInt,
  EncodeDataBase64,
  GetColor,
  GetFileExtension,
  GetRandomValue,
  IsPathFile,
  LoadAutomationEventList,
  LoadFileText,
  LoadImageFromMemory,
  MemAlloc,
  MemFree,
  RAYLIB_BINDING_INFO,
  SetRandomSeed,
  TextCopy,
  TextFormat,
  TextLength,
  TextReplace,
  UnloadAutomationEventList,
  UnloadFileText,
  UnloadImage,
  Vector2,
  closeRaylib,
} from "../../bindings/raylib.ts";

const assert = (condition: boolean, message: string): void => {
  if (!condition) throw new Error(message);
};

assert(RAYLIB_BINDING_INFO.raylibVersion === "6.0", "binding version");

SetRandomSeed(1234);
const random = GetRandomValue(10, 20);
assert(random >= 10 && random <= 20, "scalar native call");

const color = GetColor(305419896);
assert(color.r === 18 && color.g === 52 && color.b === 86 && color.a === 120, "aggregate return");
assert(ColorToInt(Color.create({ r: 18, g: 52, b: 86, a: 120 })) === 305419896, "aggregate argument");

assert(IsPathFile("./README.md") === true, "one-byte bool return");
assert(TextLength("raylib") === 6, "UTF-8 string argument");
assert(GetFileExtension("sprite.png") === ".png", "UTF-8 string return");

const memory = MemAlloc(32);
assert(memory.isNull === false, "pointer return");
assert(TextCopy(memory, "raylib") === 6, "mutable char pointer argument");
MemFree(memory);

const fileText = LoadFileText("./README.md");
assert(fileText.isNull === false, "owned char pointer return");
UnloadFileText(fileText);

const outputSize = new Int32Array(1);
const encoded = EncodeDataBase64(
  new Uint8Array([71, 111, 99, 99, 105, 97]),
  6,
  outputSize,
);
assert(encoded.isNull === false && outputSize[0] > 0, "owned encoded text pointer");
MemFree(encoded);

const emptyEvents = LoadAutomationEventList(null);
// The integration test checks raylib's log to prove that NULL, not the text
// "null", reached the native call.
assert(emptyEvents.count === 0, "empty automation event list");
UnloadAutomationEventList(emptyEvents);
assert(TextReplace("a-b-c", "-", null) === "abc", "null replacement text");
assert(TextReplace("a-b-c", "-", "+") === "a+b+c", "nullable C string text");

const faded = ColorAlpha(Color.create({ r: 18, g: 52, b: 86, a: 255 }), 0.5);
assert(
  faded.r === 18 && faded.g === 52 && faded.b === 86 && faded.a === 127,
  "aggregate argument mixed with a float argument",
);
const origin = Vector2.create({ x: 0, y: 0 });
const apart = Vector2.create({ x: 10, y: 0 });
assert(CheckCollisionCircles(origin, 6.5, apart, 4.5) === true, "overlapping circles");
assert(CheckCollisionCircles(origin, 4.5, apart, 4.5) === false, "separate circles");

const formatted = TextFormat(
  "%s %03d %.2f",
  FFI.varargs(["utf8string", "i32", "f32"], ["raylib", 7, 1.5]),
);
assert(formatted === "raylib 007 1.50", "variadic native call");

const stream = AudioStream.create({ sampleRate: 44100, channels: 2 });
assert(stream.buffer.isNull === true, "exact native field named buffer");
const streamStorage = FFI.metadata(stream);
assert(
  streamStorage.buffer instanceof ArrayBuffer &&
    streamStorage.size === AudioStream.size,
  "aggregate backing store through FFI.metadata",
);

const image = LoadImageFromMemory(".png", bunnyBytes, bunnyBytes.length);
assert(image.width === 32 && image.height === 32, "byte-pointer image load");
UnloadImage(image);

closeRaylib();
console.log("raylib ffi smoke ok");
