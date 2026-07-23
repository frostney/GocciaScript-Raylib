const malformedDescription: string =
  'some filters available: "*.*", "FILES*", "DIRS*"';
const repairedDescription: string =
  'some filters available: \\"*.*\\", \\"FILES*\\", \\"DIRS*\\"';

const countOccurrences = (value: string, needle: string): number =>
  value.split(needle).length - 1;

const normalizeAlias = (alias) => {
  const pointerDepth = alias.name.startsWith("*") ? 1 : 0;
  return {
    name: pointerDepth ? alias.name.slice(1) : alias.name,
    type: alias.type,
    pointerDepth,
    description: alias.description ?? "",
  };
};

const normalizeParams = (params = []) =>
  params.map(({ name, type, description = "" }) => ({
    name,
    type,
    description,
  }));

const assertUnique = (items, label: string): void => {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item.name)) {
      throw new Error(`Duplicate ${label} name: ${item.name}`);
    }
    seen.add(item.name);
  }
};

export const repairOfficialJson = (raw: string): string => {
  const repairCount = countOccurrences(raw, malformedDescription);
  if (repairCount !== 1) {
    throw new Error(
      `Expected exactly one LoadDirectoryFilesEx repair site, found ${repairCount}`,
    );
  }
  return raw.replace(malformedDescription, repairedDescription);
};

export const normalizeApiDocument = (
  parsed,
  metadata,
  sourceSha256: string,
) => {
  const normalized = {
    schemaVersion: 1,
    source: {
      repository: metadata.repository,
      version: metadata.version,
      commit: metadata.commit,
      path: metadata.api.path,
      blob: metadata.api.blob,
      sha256: sourceSha256,
      repairs: [
        {
          function: "LoadDirectoryFilesEx",
          field: "description",
          reason: "Escape three unescaped quoted glob examples",
          count: 1,
        },
      ],
    },
    inventory: {
      defines: parsed.defines.length,
      structs: parsed.structs.length,
      aliases: parsed.aliases.length,
      enums: parsed.enums.length,
      callbacks: parsed.callbacks.length,
      functions: parsed.functions.length,
    },
    defines: parsed.defines.map(
      ({ name, type, value, description = "" }) => ({
        name,
        type,
        value,
        description,
      }),
    ),
    structs: parsed.structs.map(
      ({ name, description = "", fields = [] }) => ({
        name,
        description,
        fields: fields.map(
          ({
            name: fieldName,
            type,
            description: fieldDescription = "",
          }) => ({
            name: fieldName,
            type,
            description: fieldDescription,
          }),
        ),
      }),
    ),
    aliases: parsed.aliases.map(normalizeAlias),
    enums: parsed.enums.map(
      ({ name, description = "", values = [] }) => ({
        name,
        description,
        values: values.map(
          ({
            name: valueName,
            value,
            description: valueDescription = "",
          }) => ({
            name: valueName,
            value,
            description: valueDescription,
          }),
        ),
      }),
    ),
    callbacks: parsed.callbacks.map(
      ({ name, description = "", returnType, params = [] }) => ({
        name,
        description,
        returnType,
        params: normalizeParams(params),
      }),
    ),
    functions: parsed.functions.map(
      ({ name, description = "", returnType, params = [] }) => ({
        name,
        description,
        returnType,
        params: normalizeParams(params),
      }),
    ),
  };

  for (const [key, expected] of Object.entries(metadata.expectedInventory)) {
    if (normalized.inventory[key] !== expected) {
      throw new Error(
        `raylib inventory drift for ${key}: expected ${expected}, got ${normalized.inventory[key]}`,
      );
    }
  }

  assertUnique(normalized.structs, "struct");
  assertUnique(normalized.aliases, "alias");
  assertUnique(normalized.enums, "enum");
  assertUnique(normalized.callbacks, "callback");
  assertUnique(normalized.functions, "function");

  return normalized;
};
