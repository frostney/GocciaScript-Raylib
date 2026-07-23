import { ffiFieldName, renderBindingArtifacts } from "./bindings.mjs";

function cString(value) {
  return JSON.stringify(value);
}

function renderOracle(api, orderedStructs) {
  let source = `// Generated from official raylib ${api.source.version}. Do not edit.
#include <stddef.h>
#include <stdio.h>
#include "raylib.h"

int main(void) {
`;
  for (const struct of orderedStructs) {
    source += `  printf("STRUCT\\t${struct.name}\\t%zu\\t%zu\\n", sizeof(${struct.name}), _Alignof(${struct.name}));\n`;
    for (const field of struct.fields) {
      source += `  printf("FIELD\\t${struct.name}\\t${field.name}\\t%zu\\n", offsetof(${struct.name}, ${field.name}));\n`;
    }
  }
  source += `  return 0;
}
`;
  return source;
}

function probeKind(resolved) {
  if (resolved.kind === "array" || resolved.kind === "struct") return "aggregate";
  if (resolved.kind === "pointer") return "pointer";
  if (
    [
      "bool",
      "i8",
      "u8",
      "i16",
      "u16",
      "i32",
      "u32",
      "i64",
      "u64",
      "f32",
      "f64",
    ].includes(resolved.kind)
  ) {
    return resolved.kind;
  }
  throw new Error(`Cannot probe ABI offset for ${resolved.kind}`);
}

function renderProbe(api, orderedStructs, resolveType) {
  const names = orderedStructs.map((struct) => struct.name);
  let source = `// Generated ABI probe for raylib ${api.source.version} bindings.
import {
  ${names.join(",\n  ")},
  raylibLibrary,
} from "../../bindings/raylib.ts";

const bytesFor = (kind: string) => {
  let buffer;
  let value;
  if (kind === "bool") {
    return { value: true, bytes: new Uint8Array([1]) };
  }
  if (kind === "i8") {
    buffer = new ArrayBuffer(1);
    value = -37;
    new Int8Array(buffer)[0] = value;
  } else if (kind === "u8") {
    buffer = new ArrayBuffer(1);
    value = 173;
    new Uint8Array(buffer)[0] = value;
  } else if (kind === "i16") {
    buffer = new ArrayBuffer(2);
    value = 12345;
    new Int16Array(buffer)[0] = value;
  } else if (kind === "u16") {
    buffer = new ArrayBuffer(2);
    value = 45678;
    new Uint16Array(buffer)[0] = value;
  } else if (kind === "i32") {
    buffer = new ArrayBuffer(4);
    value = 305419896;
    new Int32Array(buffer)[0] = value;
  } else if (kind === "u32") {
    buffer = new ArrayBuffer(4);
    value = 2309737967;
    new Uint32Array(buffer)[0] = value;
  } else if (kind === "i64" || kind === "u64") {
    buffer = new ArrayBuffer(8);
    value = 12345;
    const bytes = new Uint8Array(buffer);
    bytes[0] = 57;
    bytes[1] = 48;
  } else if (kind === "f32") {
    buffer = new ArrayBuffer(4);
    value = 123.25;
    new Float32Array(buffer)[0] = value;
  } else if (kind === "f64") {
    buffer = new ArrayBuffer(8);
    value = 9876.5;
    new Float64Array(buffer)[0] = value;
  } else {
    throw new TypeError("Unknown scalar probe kind: " + kind);
  }
  return { value, bytes: new Uint8Array(buffer) };
};

const pointerBytes = (pointer) => {
  const bytes = new Uint8Array(8);
  let address = pointer.address;
  for (const [i] of bytes.entries()) {
    bytes[i] = address % 256;
    address = Math.floor(address / 256);
  }
  return bytes;
};

const findBytes = (haystack, needle) => {
  const starts = Array.from(
    { length: haystack.length - needle.length + 1 },
    (_unused, start) => start,
  );
  for (const start of starts) {
    let matches = true;
    for (const [index] of needle.entries()) {
      if (haystack[start + index] !== needle[index]) {
        matches = false;
        break;
      }
    }
    if (matches) return start;
  }
  throw new Error("Unable to locate field sentinel bytes");
};

const probePointer = raylibLibrary.symbol("InitWindow");

const fieldOffset = (Type, field, kind) => {
  const value = Type.create();
  if (kind === "aggregate") return value[field].byteOffset;
  if (kind === "pointer") {
    value[field] = probePointer;
    const width = Type.size > 4 ? 8 : 4;
    return findBytes(
      new Uint8Array(value.buffer),
      pointerBytes(probePointer).subarray(0, width),
    );
  }
  const probe = bytesFor(kind);
  value[field] = probe.value;
  return findBytes(new Uint8Array(value.buffer), probe.bytes);
};

`;

  for (const struct of orderedStructs) {
    source += `console.log("STRUCT\\t${struct.name}\\t" + ${struct.name}.size + "\\t" + ${struct.name}.alignment);\n`;
    for (const field of struct.fields) {
      const resolved = resolveType(field.type, "field");
      source += `console.log("FIELD\\t${struct.name}\\t${field.name}\\t" + fieldOffset(${struct.name}, ${cString(ffiFieldName(field.name))}, ${cString(probeKind(resolved))}));\n`;
    }
  }

  return source;
}

export async function renderAbiArtifacts() {
  const artifacts = await renderBindingArtifacts();
  return {
    oracleC: renderOracle(artifacts.api, artifacts.orderedStructs),
    layoutProbeTs: renderProbe(
      artifacts.api,
      artifacts.orderedStructs,
      artifacts.resolveType,
    ),
  };
}
