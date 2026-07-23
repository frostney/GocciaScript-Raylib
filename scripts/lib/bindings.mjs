import { readFile } from "node:fs/promises";
import { fromRoot, readJson, stableJson } from "./project.mjs";

const scalarTypes = new Map([
  ["bool", "bool"],
  ["char", "i8"],
  ["signed char", "i8"],
  ["unsigned char", "u8"],
  ["short", "i16"],
  ["short int", "i16"],
  ["signed short", "i16"],
  ["unsigned short", "u16"],
  ["unsigned short int", "u16"],
  ["int", "i32"],
  ["signed int", "i32"],
  ["unsigned", "u32"],
  ["unsigned int", "u32"],
  ["long", "i64"],
  ["long int", "i64"],
  ["unsigned long", "u64"],
  ["unsigned long int", "u64"],
  ["long long", "i64"],
  ["long long int", "i64"],
  ["unsigned long long", "u64"],
  ["unsigned long long int", "u64"],
  ["float", "f32"],
  ["double", "f64"],
  ["void", "void"],
]);

const intentionalSkips = new Map([
  ["TraceLog", "varargs"],
  ["TextFormat", "varargs"],
  ["DrawBillboardPro", "more-than-8-arguments"],
]);

const nullableStringParameters = new Map([
  ["LoadShader", [0, 1]],
  ["LoadShaderFromMemory", [0, 1]],
  ["LoadAutomationEventList", [0]],
  ["TextReplace", [2]],
  ["TextReplaceAlloc", [2]],
  ["TextReplaceBetween", [3]],
  ["TextReplaceBetweenAlloc", [3]],
]);

const ownedTextReturns = new Set([
  "LoadFileText",
  "EncodeDataBase64",
  "LoadUTF8",
  "TextReplaceAlloc",
  "TextReplaceBetweenAlloc",
  "TextInsertAlloc",
]);

export function ffiFieldName(name) {
  if (name === "buffer") return "nativeBuffer";
  if (name === "byteOffset") return "nativeByteOffset";
  return name;
}

function cleanType(type) {
  return type
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s*\*\s*/g, " *")
    .trim();
}

function stripConst(type) {
  return type.replace(/^const\s+/, "").trim();
}

function parseArray(type) {
  const match = cleanType(type).match(/^(.*)\[(\d+)\]$/);
  return match ? { element: match[1].trim(), length: Number(match[2]) } : null;
}

function parsePointer(type) {
  let remaining = cleanType(type);
  let depth = 0;
  while (remaining.endsWith("*")) {
    depth += 1;
    remaining = remaining.slice(0, -1).trim();
  }
  return {
    base: stripConst(remaining),
    depth,
    isConst: remaining.startsWith("const "),
  };
}

const pointerTs = (context) =>
  context === "argument" ? "FFIPointerInput" : "FFIPointer";

function createEnvironment(api) {
  return {
    structs: new Map(api.structs.map((item) => [item.name, item])),
    aliases: new Map(api.aliases.map((item) => [item.name, item])),
    enums: new Set(api.enums.map((item) => item.name)),
    callbacks: new Set(api.callbacks.map((item) => item.name)),
  };
}

function resolveType(type, env, context = "argument", stack = []) {
  const original = cleanType(type);
  const array = parseArray(original);
  if (array) {
    const element = resolveType(array.element, env, "field", stack);
    return {
      kind: "array",
      descriptor: `FFI.array(${element.descriptor}, ${array.length})`,
      ts: `FFIArrayValue<${element.ts}>`,
      length: array.length,
      element,
    };
  }

  const pointer = parsePointer(original);
  if (pointer.depth > 0) {
    const cString =
      pointer.depth === 1 &&
      pointer.base === "char" &&
      (pointer.isConst || context === "return") &&
      context !== "field";
    if (cString) {
      return { kind: "utf8string", descriptor: '"utf8string"', ts: "string" };
    }
    return {
      kind: "pointer",
      descriptor: '"pointer"',
      ts: pointerTs(context),
    };
  }

  const name = pointer.base;
  const scalar = scalarTypes.get(name);
  if (scalar) {
    return {
      kind: scalar,
      descriptor: `"${scalar}"`,
      ts: scalar === "bool" ? "boolean" : scalar === "void" ? "void" : "number",
    };
  }

  if (env.callbacks.has(name)) {
    return {
      kind: "pointer",
      descriptor: '"pointer"',
      ts: pointerTs(context),
    };
  }
  if (env.enums.has(name)) {
    return { kind: "i32", descriptor: '"i32"', ts: "number" };
  }
  if (env.structs.has(name)) {
    return { kind: "struct", descriptor: name, ts: `${name}Value`, name };
  }
  if (env.aliases.has(name)) {
    if (stack.includes(name)) {
      throw new Error(`Cyclic alias: ${[...stack, name].join(" -> ")}`);
    }
    const alias = env.aliases.get(name);
    if (alias.pointerDepth > 0) {
      return {
        kind: "pointer",
        descriptor: '"pointer"',
        ts: pointerTs(context),
      };
    }
    const resolved = resolveType(alias.type, env, context, [...stack, name]);
    return {
      ...resolved,
      // Use the underlying descriptor at call/layout sites so aliases never
      // create a JavaScript declaration-order dependency.
      descriptor: resolved.descriptor,
      ts: `${name}Value`,
      aliasTarget: resolved,
    };
  }
  if (name === "...") {
    throw new Error("varargs are unsupported");
  }
  throw new Error(`Unsupported C type: ${type}`);
}

function structDependencies(struct, env) {
  const dependencies = new Set();

  function visit(type) {
    const array = parseArray(type);
    if (array) {
      visit(array.element);
      return;
    }
    const pointer = parsePointer(type);
    if (pointer.depth > 0) return;
    const name = pointer.base;
    const alias = env.aliases.get(name);
    if (alias) {
      if (alias.pointerDepth === 0) visit(alias.type);
      return;
    }
    if (env.structs.has(name) && name !== struct.name) dependencies.add(name);
  }

  for (const field of struct.fields) visit(field.type);
  return dependencies;
}

function sortStructs(api, env) {
  const ordered = [];
  const visited = new Set();
  const visiting = new Set();

  function visit(name) {
    if (visited.has(name)) return;
    if (visiting.has(name)) throw new Error(`Cyclic by-value struct dependency: ${name}`);
    visiting.add(name);
    const struct = env.structs.get(name);
    for (const dependency of structDependencies(struct, env)) visit(dependency);
    visiting.delete(name);
    visited.add(name);
    ordered.push(struct);
  }

  for (const struct of api.structs) visit(struct.name);
  return ordered;
}

function docComment(description) {
  return description
    ? `/** ${description.replaceAll("*/", "* /")} */\n`
    : "";
}

function renderRuntimePrelude(raylib, goccia) {
  return `// Generated from official raylib ${raylib.version} (${raylib.commit}).
// Do not edit by hand; run npm run generate.

export const RAYLIB_BINDING_INFO = {
  raylibVersion: "${raylib.version}",
  raylibCommit: "${raylib.commit}",
  gocciaScriptVersion: "${goccia.version}",
  linkage: "dynamic",
};
export const RAYLIB_FIELD_ALIASES = {
  AudioStream: { buffer: "nativeBuffer" },
};

const raylibCandidates = (): string[] => {
  const suffix = FFI.suffix;
  const override = globalThis.RAYLIB_LIBRARY_PATH;
  let candidates: string[];
  if (suffix === ".dylib") {
    candidates = [
      "./libraylib.dylib",
      "/opt/homebrew/lib/libraylib.dylib",
      "/usr/local/lib/libraylib.dylib",
      "libraylib.dylib",
    ];
  } else if (suffix === ".so") {
    candidates = [
      "./libraylib.so",
      "/usr/local/lib/libraylib.so",
      "/usr/lib/libraylib.so",
      "/usr/lib/x86_64-linux-gnu/libraylib.so",
      "/usr/lib/aarch64-linux-gnu/libraylib.so",
      "libraylib.so",
    ];
  } else {
    candidates = ["./raylib.dll", "raylib.dll"];
  }
  if (typeof override === "string" && override.length > 0) {
    candidates.unshift(override);
  }
  return candidates;
};

const openRaylib = () => {
  const candidates = raylibCandidates();
  let lastError: string = "";
  for (const candidate of candidates) {
    try {
      return FFI.open(candidate);
    } catch (error) {
      lastError = String(error);
    }
  }
  throw new TypeError(
    "Unable to load the raylib ${raylib.version} dynamic library. Tried: " +
      candidates.join(", ") +
      ". Last error: " +
      lastError,
  );
};

export const raylibLibrary = openRaylib();
export const closeRaylib = (): void => {
  if (!raylibLibrary.closed) raylibLibrary.close();
};

`;
}

function renderDefinitions(api, env, orderedStructs) {
  let js = "";
  let dts = `// Generated from official raylib ${api.source.version}. Do not edit.

export interface FFIPointer {
  readonly address: number;
  readonly isNull: boolean;
}
/** Structural fallback for GocciaScript's Float16Array on TypeScript lib targets before ES2025. */
export interface FFIFloat16Array {
  readonly buffer: ArrayBufferLike;
  readonly byteOffset: number;
  readonly byteLength: number;
  readonly length: number;
  readonly BYTES_PER_ELEMENT: number;
  readonly [index: number]: number;
}
export type FFITypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | FFIFloat16Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;
export type FFIPointerInput =
  | FFIPointer
  | ArrayBuffer
  | SharedArrayBuffer
  | FFITypedArray
  | FFIAggregateValue
  | null;
export interface FFIAggregateValue {
  readonly buffer: ArrayBuffer;
  readonly byteOffset: number;
  readonly size: number;
}
export interface FFIArrayValue<T> extends FFIAggregateValue {
  readonly length: number;
  [index: number]: T;
}
export interface FFIStructDescriptor<T extends FFIAggregateValue> {
  readonly kind: "struct";
  readonly size: number;
  readonly alignment: number;
  create(initializer?: Partial<T>): T;
}
export interface FFILibrary {
  readonly path: string;
  readonly closed: boolean;
  bind(
    name: string,
    signature: { args: readonly unknown[]; returns: unknown },
  ): (...args: unknown[]) => unknown;
  symbol(name: string): FFIPointer;
  close(): void;
}
export declare const RAYLIB_BINDING_INFO: {
  raylibVersion: "${api.source.version}";
  raylibCommit: "${api.source.commit}";
  gocciaScriptVersion: string;
  linkage: "dynamic";
};
export declare const RAYLIB_FIELD_ALIASES: {
  AudioStream: { buffer: "nativeBuffer" };
};
export declare const raylibLibrary: FFILibrary;
export declare function closeRaylib(): void;

`;

  for (const struct of orderedStructs) {
    const fields = struct.fields.map((field) => {
      const resolved = resolveType(field.type, env, "field");
      return {
        ...field,
        resolved,
      };
    });
    js += docComment(struct.description);
    js += `export const ${struct.name} = FFI.struct({\n`;
    for (const field of fields) {
      js += `  ${JSON.stringify(ffiFieldName(field.name))}: ${field.resolved.descriptor},\n`;
    }
    js += "});\n\n";

    dts += docComment(struct.description);
    dts += `export interface ${struct.name}Value extends FFIAggregateValue {\n`;
    for (const field of fields) {
      if (ffiFieldName(field.name) !== field.name) {
        dts += `  /** Native C field: ${field.name}. */\n`;
      }
      dts += `  ${JSON.stringify(ffiFieldName(field.name))}: ${field.resolved.ts};\n`;
    }
    dts += "}\n";
    dts += `export declare const ${struct.name}: FFIStructDescriptor<${struct.name}Value>;\n\n`;
  }

  for (const alias of api.aliases) {
    if (alias.pointerDepth > 0) {
      js += `${docComment(alias.description)}export const ${alias.name} = "pointer";\n\n`;
      dts += `${docComment(alias.description)}export type ${alias.name}Value = FFIPointer;\n`;
      dts += `export declare const ${alias.name}: "pointer";\n\n`;
    } else {
      const target = resolveType(alias.type, env, "field");
      js += `${docComment(alias.description)}export const ${alias.name} = ${target.descriptor};\n\n`;
      dts += `${docComment(alias.description)}export type ${alias.name}Value = ${target.ts};\n`;
      dts += `export declare const ${alias.name}: typeof ${target.descriptor};\n\n`;
    }
  }

  for (const callback of api.callbacks) {
    js += `${docComment(callback.description)}export const ${callback.name} = "pointer";\n\n`;
    dts += `${docComment(callback.description)}export type ${callback.name}Value = FFIPointer;\n`;
    dts += `export declare const ${callback.name}: "pointer";\n\n`;
  }

  for (const enumType of api.enums) {
    for (const value of enumType.values) {
      js += `${docComment(value.description)}export const ${value.name} = ${JSON.stringify(value.value)};\n`;
      dts += `${docComment(value.description)}export declare const ${value.name}: ${JSON.stringify(value.value)};\n`;
    }
    js += "\n";
    dts += "\n";
  }

  const deferredDefines = [];
  for (const define of api.defines) {
    if (define.type === "INT" || define.type === "FLOAT" || define.type === "STRING") {
      js += `${docComment(define.description)}export const ${define.name} = ${JSON.stringify(define.value)};\n`;
      dts += `${docComment(define.description)}export declare const ${define.name}: ${JSON.stringify(define.value)};\n`;
    } else if (define.type === "FLOAT_MATH" && define.name === "DEG2RAD") {
      js += "export const DEG2RAD = PI / 180.0;\n";
      dts += "export declare const DEG2RAD: number;\n";
    } else if (define.type === "FLOAT_MATH" && define.name === "RAD2DEG") {
      js += "export const RAD2DEG = 180.0 / PI;\n";
      dts += "export declare const RAD2DEG: number;\n";
    } else if (define.type === "COLOR") {
      const values = [...String(define.value).matchAll(/\d+/g)].map((match) =>
        Number(match[0]),
      );
      if (values.length !== 4) {
        throw new Error(`Unable to parse color define ${define.name}`);
      }
      js += `${docComment(define.description)}export const ${define.name} = Color.create({ r: ${values[0]}, g: ${values[1]}, b: ${values[2]}, a: ${values[3]} });\n`;
      dts += `${docComment(define.description)}export declare const ${define.name}: ColorValue;\n`;
    } else if (
      define.type === "UNKNOWN" &&
      /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(define.name) &&
      /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(String(define.value))
    ) {
      deferredDefines.push(define);
    }
  }
  js += "\n";
  dts += "\n";

  return { js, dts, deferredDefines };
}

function classifyFunction(fn, env, goccia) {
  if (intentionalSkips.has(fn.name)) {
    return {
      supported: false,
      reason: intentionalSkips.get(fn.name),
      category: "intentional-0.1-scope",
    };
  }
  if (fn.params.length > goccia.ffi.maxArguments) {
    return {
      supported: false,
      reason: "more-than-8-arguments",
      category: "stable-runtime-limit",
    };
  }

  try {
    const args = fn.params.map((param) => resolveType(param.type, env, "argument"));
    let returns = resolveType(fn.returnType, env, "return");
    if (ownedTextReturns.has(fn.name)) {
      returns = {
        kind: "pointer",
        descriptor: '"pointer"',
        ts: "FFIPointer",
      };
    }
    const hasF32 = args.some((arg) => arg.kind === "f32");
    const hasOther = args.some((arg) => arg.kind !== "f32");
    if (!goccia.ffi.mixedTopLevelF32 && hasF32 && hasOther) {
      return {
        supported: false,
        reason: "mixed-top-level-f32",
        category: "stable-runtime-limit",
        args,
        returns,
      };
    }
    return { supported: true, args, returns };
  } catch (error) {
    return {
      supported: false,
      reason: "unsupported-c-type",
      category: "generator-limit",
      detail: error.message,
    };
  }
}

function renderFunctions(api, env, goccia, deferredDefines) {
  let js = "";
  let dts = "";
  const generated = [];
  const skipped = [];

  for (const fn of api.functions) {
    const classification = classifyFunction(fn, env, goccia);
    if (!classification.supported) {
      skipped.push({
        name: fn.name,
        reason: classification.reason,
        category: classification.category,
        signature: `${fn.returnType} ${fn.name}(${fn.params.map((param) => param.type).join(", ")})`,
        ...(classification.detail ? { detail: classification.detail } : {}),
      });
      continue;
    }

    generated.push(fn.name);
    const args = classification.args.map((arg) => arg.descriptor).join(", ");
    js += docComment(fn.description);
    js += `export const ${fn.name} = raylibLibrary.bind("${fn.name}", { args: [${args}], returns: ${classification.returns.descriptor} });\n\n`;

    dts += docComment(fn.description);
    dts += `export declare function ${fn.name}(${fn.params
      .map((param, index) => `${param.name || `arg${index}`}: ${classification.args[index].ts}`)
      .join(", ")}): ${classification.returns.ts};\n\n`;

    const nullableParameters = nullableStringParameters.get(fn.name);
    if (nullableParameters) {
      const rawArgs = classification.args.map((arg, index) =>
        nullableParameters.includes(index)
          ? { descriptor: '"pointer"', ts: "FFIPointerInput" }
          : arg,
      );
      js += `/** Raw-pointer variant for nullable C string parameters. */\n`;
      js += `export const ${fn.name}Raw = raylibLibrary.bind("${fn.name}", { args: [${rawArgs.map((arg) => arg.descriptor).join(", ")}], returns: ${classification.returns.descriptor} });\n\n`;
      dts += `/** Raw-pointer variant for nullable C string parameters. */\n`;
      dts += `export declare function ${fn.name}Raw(${fn.params
        .map((param, index) => `${param.name || `arg${index}`}: ${rawArgs[index].ts}`)
        .join(", ")}): ${classification.returns.ts};\n\n`;
    }
  }

  for (const define of deferredDefines) {
    js += `${docComment(define.description)}export const ${define.name} = ${define.value};\n`;
    dts += `${docComment(define.description)}export declare const ${define.name}: typeof ${define.value};\n`;
  }

  return { js, dts, generated, skipped };
}

function renderSkipped(api, goccia, generated, skipped) {
  const intentionalCount = skipped.filter(
    (item) => item.category === "intentional-0.1-scope",
  ).length;
  const report = {
    schemaVersion: 1,
    raylibVersion: api.source.version,
    raylibCommit: api.source.commit,
    gocciaScriptVersion: goccia.version,
    apiFunctions: api.inventory.functions,
    callableTargetAfterUpstreamSupport: api.inventory.functions - intentionalCount,
    generatedFunctions: generated.length,
    skippedFunctions: skipped.length,
    skipped,
  };

  const groups = new Map();
  for (const item of skipped) {
    const key = `${item.category}:${item.reason}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }

  let markdown = `# Skipped raylib functions

Generated against raylib ${api.source.version} at \`${api.source.commit}\` and
GocciaScript ${goccia.version}.

- Official API functions: ${report.apiFunctions}
- Generated and callable on the pinned stable runtime: ${report.generatedFunctions}
- Deterministically skipped: ${report.skippedFunctions}
- Target after mixed-top-level-\`f32\` support: ${report.callableTargetAfterUpstreamSupport}

The report is a compatibility boundary, not a claim that skipped functions are
implemented. Re-run the generator after the upstream FFI restriction is removed.
The three intentional 0.1 exclusions remain out of scope.
`;

  for (const [key, items] of groups) {
    const [category, reason] = key.split(":");
    markdown += `\n## ${category}: ${reason} (${items.length})\n\n`;
    for (const item of items) {
      markdown += `- \`${item.signature}\``;
      if (item.detail) markdown += ` — ${item.detail}`;
      markdown += "\n";
    }
  }

  return { report, markdown };
}

export async function renderBindingArtifacts() {
  const [api, raylib, goccia] = await Promise.all([
    readJson(fromRoot("vendor/raylib-6.0.normalized.json")),
    readJson(fromRoot("metadata/raylib.json")),
    readJson(fromRoot("metadata/gocciascript.json")),
  ]);
  const env = createEnvironment(api);
  const orderedStructs = sortStructs(api, env);
  const prelude = renderRuntimePrelude(raylib, goccia);
  const definitions = renderDefinitions(api, env, orderedStructs);
  const functions = renderFunctions(
    api,
    env,
    goccia,
    definitions.deferredDefines,
  );
  const skipped = renderSkipped(
    api,
    goccia,
    functions.generated,
    functions.skipped,
  );

  return {
    raylibTs: `${prelude}${definitions.js}${functions.js}`,
    raylibDts: `${definitions.dts}${functions.dts}`,
    skippedJson: stableJson(skipped.report),
    skippedMarkdown: skipped.markdown,
    stats: {
      generated: functions.generated.length,
      skipped: functions.skipped.length,
      target: skipped.report.callableTargetAfterUpstreamSupport,
    },
    api,
    env,
    orderedStructs,
    resolveType: (type, context) => resolveType(type, env, context),
  };
}

export async function readGeneratedArtifacts() {
  const entries = [
    ["raylibTs", "bindings/raylib.ts"],
    ["raylibDts", "bindings/raylib.d.ts"],
    ["skippedJson", "SKIPPED.json"],
    ["skippedMarkdown", "SKIPPED.md"],
  ];
  return Object.fromEntries(
    await Promise.all(
      entries.map(async ([key, path]) => [
        key,
        await readFile(fromRoot(path), "utf8"),
      ]),
    ),
  );
}
