import raylibSource from "../../bindings/raylib.ts" with { type: "text" };
import declarations from "../../bindings/raylib.d.ts" with { type: "text" };
import skipped from "../../SKIPPED.json" with { type: "json" };

describe("generated raylib bindings", () => {
  test("exposes the complete dynamic API", () => {
    expect(skipped.apiFunctions).toBe(600);
    expect(skipped.generatedFunctions).toBe(600);
    expect(skipped.skipped).toEqual([]);
    expect(raylibSource.match(/ = raylibLibrary\.bind\(/g)).toHaveLength(600);
    expect(raylibSource).toContain('linkage: "dynamic"');

    for (const name of [
      "InitWindow",
      "WindowShouldClose",
      "IsKeyDown",
      "LoadImageFromMemory",
      "LoadTextureFromImage",
      "DrawTextureV",
    ]) {
      expect(raylibSource).toContain(`export const ${name} =`);
    }
  });

  test("emits every aggregate and representative public type family", () => {
    expect(raylibSource.match(/ = FFI\.struct\(/g)).toHaveLength(35);
    expect(raylibSource).toContain("export const RAYWHITE = Color.create");
    expect(raylibSource).toContain("export const KEY_W = 87;");
    expect(raylibSource).toContain("export const Quaternion = Vector4;");
    expect(raylibSource).toContain('export const AudioCallback = "pointer";');
    expect(raylibSource).toMatch(
      /export const AudioStream = FFI\.struct\(\{\n  "buffer": "pointer",/,
    );
    expect(declarations).toContain(
      'interface AudioStreamValue extends FFIAggregate, Omit<FFIAggregateMetadata, "buffer">',
    );
    expect(declarations).toContain("interface VrStereoConfigValue");
    expect(declarations).toContain("export type FFITypedArray =");
    expect(declarations).not.toContain("| ArrayBufferView");
  });

  test("preserves owned pointers and nullable string parameters", () => {
    expect(raylibSource).toMatch(
      /export const LoadFileText = .*returns: "pointer"/,
    );
    expect(raylibSource).toMatch(
      /export const UnloadFileText = .*args: \["pointer"\]/,
    );
    expect(raylibSource).toMatch(
      /export const TextReplace = .*returns: "utf8string"/,
    );
    expect(raylibSource).toMatch(
      /export const TextReplaceAlloc = .*returns: "pointer"/,
    );
    expect(declarations).toMatch(
      /function LoadImageFromMemory\(fileType: string, fileData: FFIPointerInput/,
    );

    expect(raylibSource.match(/nullableUtf8String[,\]]/g)).toHaveLength(9);
    expect(raylibSource).toMatch(
      /export const LoadShader = .*args: \[nullableUtf8String, nullableUtf8String\]/,
    );
    expect(raylibSource).toMatch(
      /export const TextReplaceBetween = .*"utf8string", nullableUtf8String\]/,
    );
    expect(declarations).toContain(
      "function LoadAutomationEventList(fileName: string | null)",
    );
    expect(raylibSource).not.toContain("export const LoadShaderRaw =");
    expect(raylibSource).not.toContain("export const TextReplaceRaw =");
  });

  test("binds variadic, high-arity, and mixed float signatures", () => {
    expect(raylibSource).toMatch(
      /export const TraceLog = .*args: \["i32", "utf8string"\], variadic: true, returns: "void"/,
    );
    expect(raylibSource).toMatch(
      /export const TextFormat = .*args: \["utf8string"\], variadic: true, returns: "utf8string"/,
    );
    expect(raylibSource.match(/variadic: true/g)).toHaveLength(2);
    expect(declarations).toContain(
      "function TextFormat(text: string, args: FFIVarargs): string;",
    );
    expect(raylibSource).toMatch(
      /export const DrawBillboardPro = .*args: \[Camera3D, Texture, Rectangle, Vector3, Vector3, Vector2, Vector2, "f32", Color\]/,
    );
    expect(raylibSource).toMatch(
      /export const DrawCircle = .*args: \["i32", "i32", "f32", Color\]/,
    );
  });
});
