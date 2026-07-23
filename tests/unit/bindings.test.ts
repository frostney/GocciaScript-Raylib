import raylibSource from "../../bindings/raylib.ts" with { type: "text" };
import declarations from "../../bindings/raylib.d.ts" with { type: "text" };
import skipped from "../../SKIPPED.json" with { type: "json" };

describe("generated raylib bindings", () => {
  test("exposes the stable-safe dynamic API", () => {
    expect(skipped.apiFunctions).toBe(600);
    expect(skipped.callableTargetAfterUpstreamSupport).toBe(597);
    expect(skipped.generatedFunctions + skipped.skippedFunctions).toBe(
      skipped.apiFunctions,
    );
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
    expect(declarations).toContain("interface VrStereoConfigValue");
    expect(declarations).toContain("export type FFITypedArray =");
    expect(declarations).not.toContain("| ArrayBufferView");
  });

  test("preserves owned pointers and nullable string variants", () => {
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

    for (const name of [
      "LoadShaderRaw",
      "LoadShaderFromMemoryRaw",
      "LoadAutomationEventListRaw",
      "TextReplaceRaw",
      "TextReplaceAllocRaw",
      "TextReplaceBetweenRaw",
      "TextReplaceBetweenAllocRaw",
    ]) {
      expect(raylibSource).toContain(`export const ${name} =`);
      expect(declarations).toContain(`function ${name}(`);
    }
  });

  test("reports stable FFI and intentional exclusions explicitly", () => {
    const byName = new Map(
      skipped.skipped.map((item) => [item.name, item]),
    );

    expect(byName.get("TraceLog").reason).toBe("varargs");
    expect(byName.get("TextFormat").reason).toBe("varargs");
    expect(byName.get("DrawBillboardPro").reason).toBe(
      "more-than-8-arguments",
    );
    expect(byName.get("DrawCircle").reason).toBe("mixed-top-level-f32");
  });
});
