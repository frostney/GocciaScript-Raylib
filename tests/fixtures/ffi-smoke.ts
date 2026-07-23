import bunnyBytes from "../../examples/assets/raybunny.png" with { type: "bytes" };
import {
  Color,
  ColorToInt,
  EncodeDataBase64,
  GetColor,
  GetFileExtension,
  GetRandomValue,
  IsPathFile,
  LoadAutomationEventListRaw,
  LoadFileText,
  LoadImageFromMemory,
  MemAlloc,
  MemFree,
  RAYLIB_BINDING_INFO,
  SetRandomSeed,
  TextCopy,
  TextLength,
  UnloadAutomationEventList,
  UnloadFileText,
  UnloadImage,
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

const emptyEvents = LoadAutomationEventListRaw(null);
assert(emptyEvents.count === 0, "nullable C string raw binding");
UnloadAutomationEventList(emptyEvents);

const image = LoadImageFromMemory(".png", bunnyBytes, bunnyBytes.length);
assert(image.width === 32 && image.height === 32, "byte-pointer image load");
UnloadImage(image);

closeRaylib();
console.log("raylib ffi smoke ok");
