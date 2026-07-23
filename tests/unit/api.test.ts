import metadata from "../../metadata/raylib.json" with { type: "json" };
import raw from "../../vendor/raylib-6.0-api.raw.json" with { type: "text" };
import normalized from "../../vendor/raylib-6.0.normalized.json" with {
  type: "json",
};
import {
  normalizeApiDocument,
  repairOfficialJson,
} from "../../scripts/lib/api-core.ts";

describe("raylib API normalization", () => {
  test("repairs exactly the known malformed description", () => {
    expect(() => JSON.parse(raw)).toThrow(SyntaxError);
    expect(JSON.parse(repairOfficialJson(raw)).functions).toHaveLength(600);

    let rejectedUnknownInput = false;
    try {
      repairOfficialJson("{}");
    } catch (error) {
      rejectedUnknownInput = error instanceof Error;
    }
    expect(rejectedUnknownInput).toBe(true);
  });

  test("validates the complete raylib 6.0 inventory", () => {
    const parsed = JSON.parse(repairOfficialJson(raw));
    const api = normalizeApiDocument(parsed, metadata, metadata.api.sha256);

    expect(api.inventory).toMatchObject({
      functions: 600,
      structs: 35,
      aliases: 6,
      callbacks: 6,
    });
    expect(api.source.repairs).toEqual([
      {
        function: "LoadDirectoryFilesEx",
        field: "description",
        reason: "Escape three unescaped quoted glob examples",
        count: 1,
      },
    ]);
  });

  test("normalization is deterministic and matches the vendored IR", () => {
    const parsed = JSON.parse(repairOfficialJson(raw));
    const first = normalizeApiDocument(parsed, metadata, metadata.api.sha256);
    const second = normalizeApiDocument(parsed, metadata, metadata.api.sha256);

    expect(first).toEqual(second);
    expect(first).toEqual(normalized);
  });
});
