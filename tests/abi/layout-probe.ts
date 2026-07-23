// Generated ABI probe for raylib 6.0 bindings.
import {
  Vector2,
  Vector3,
  Vector4,
  Matrix,
  Color,
  Rectangle,
  Image,
  Texture,
  RenderTexture,
  NPatchInfo,
  GlyphInfo,
  Font,
  Camera3D,
  Camera2D,
  Mesh,
  Shader,
  MaterialMap,
  Material,
  Transform,
  BoneInfo,
  ModelSkeleton,
  Model,
  ModelAnimation,
  Ray,
  RayCollision,
  BoundingBox,
  Wave,
  AudioStream,
  Sound,
  Music,
  VrDeviceInfo,
  VrStereoConfig,
  FilePathList,
  AutomationEvent,
  AutomationEventList,
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

console.log("STRUCT\tVector2\t" + Vector2.size + "\t" + Vector2.alignment);
console.log("FIELD\tVector2\tx\t" + fieldOffset(Vector2, "x", "f32"));
console.log("FIELD\tVector2\ty\t" + fieldOffset(Vector2, "y", "f32"));
console.log("STRUCT\tVector3\t" + Vector3.size + "\t" + Vector3.alignment);
console.log("FIELD\tVector3\tx\t" + fieldOffset(Vector3, "x", "f32"));
console.log("FIELD\tVector3\ty\t" + fieldOffset(Vector3, "y", "f32"));
console.log("FIELD\tVector3\tz\t" + fieldOffset(Vector3, "z", "f32"));
console.log("STRUCT\tVector4\t" + Vector4.size + "\t" + Vector4.alignment);
console.log("FIELD\tVector4\tx\t" + fieldOffset(Vector4, "x", "f32"));
console.log("FIELD\tVector4\ty\t" + fieldOffset(Vector4, "y", "f32"));
console.log("FIELD\tVector4\tz\t" + fieldOffset(Vector4, "z", "f32"));
console.log("FIELD\tVector4\tw\t" + fieldOffset(Vector4, "w", "f32"));
console.log("STRUCT\tMatrix\t" + Matrix.size + "\t" + Matrix.alignment);
console.log("FIELD\tMatrix\tm0\t" + fieldOffset(Matrix, "m0", "f32"));
console.log("FIELD\tMatrix\tm4\t" + fieldOffset(Matrix, "m4", "f32"));
console.log("FIELD\tMatrix\tm8\t" + fieldOffset(Matrix, "m8", "f32"));
console.log("FIELD\tMatrix\tm12\t" + fieldOffset(Matrix, "m12", "f32"));
console.log("FIELD\tMatrix\tm1\t" + fieldOffset(Matrix, "m1", "f32"));
console.log("FIELD\tMatrix\tm5\t" + fieldOffset(Matrix, "m5", "f32"));
console.log("FIELD\tMatrix\tm9\t" + fieldOffset(Matrix, "m9", "f32"));
console.log("FIELD\tMatrix\tm13\t" + fieldOffset(Matrix, "m13", "f32"));
console.log("FIELD\tMatrix\tm2\t" + fieldOffset(Matrix, "m2", "f32"));
console.log("FIELD\tMatrix\tm6\t" + fieldOffset(Matrix, "m6", "f32"));
console.log("FIELD\tMatrix\tm10\t" + fieldOffset(Matrix, "m10", "f32"));
console.log("FIELD\tMatrix\tm14\t" + fieldOffset(Matrix, "m14", "f32"));
console.log("FIELD\tMatrix\tm3\t" + fieldOffset(Matrix, "m3", "f32"));
console.log("FIELD\tMatrix\tm7\t" + fieldOffset(Matrix, "m7", "f32"));
console.log("FIELD\tMatrix\tm11\t" + fieldOffset(Matrix, "m11", "f32"));
console.log("FIELD\tMatrix\tm15\t" + fieldOffset(Matrix, "m15", "f32"));
console.log("STRUCT\tColor\t" + Color.size + "\t" + Color.alignment);
console.log("FIELD\tColor\tr\t" + fieldOffset(Color, "r", "u8"));
console.log("FIELD\tColor\tg\t" + fieldOffset(Color, "g", "u8"));
console.log("FIELD\tColor\tb\t" + fieldOffset(Color, "b", "u8"));
console.log("FIELD\tColor\ta\t" + fieldOffset(Color, "a", "u8"));
console.log("STRUCT\tRectangle\t" + Rectangle.size + "\t" + Rectangle.alignment);
console.log("FIELD\tRectangle\tx\t" + fieldOffset(Rectangle, "x", "f32"));
console.log("FIELD\tRectangle\ty\t" + fieldOffset(Rectangle, "y", "f32"));
console.log("FIELD\tRectangle\twidth\t" + fieldOffset(Rectangle, "width", "f32"));
console.log("FIELD\tRectangle\theight\t" + fieldOffset(Rectangle, "height", "f32"));
console.log("STRUCT\tImage\t" + Image.size + "\t" + Image.alignment);
console.log("FIELD\tImage\tdata\t" + fieldOffset(Image, "data", "pointer"));
console.log("FIELD\tImage\twidth\t" + fieldOffset(Image, "width", "i32"));
console.log("FIELD\tImage\theight\t" + fieldOffset(Image, "height", "i32"));
console.log("FIELD\tImage\tmipmaps\t" + fieldOffset(Image, "mipmaps", "i32"));
console.log("FIELD\tImage\tformat\t" + fieldOffset(Image, "format", "i32"));
console.log("STRUCT\tTexture\t" + Texture.size + "\t" + Texture.alignment);
console.log("FIELD\tTexture\tid\t" + fieldOffset(Texture, "id", "u32"));
console.log("FIELD\tTexture\twidth\t" + fieldOffset(Texture, "width", "i32"));
console.log("FIELD\tTexture\theight\t" + fieldOffset(Texture, "height", "i32"));
console.log("FIELD\tTexture\tmipmaps\t" + fieldOffset(Texture, "mipmaps", "i32"));
console.log("FIELD\tTexture\tformat\t" + fieldOffset(Texture, "format", "i32"));
console.log("STRUCT\tRenderTexture\t" + RenderTexture.size + "\t" + RenderTexture.alignment);
console.log("FIELD\tRenderTexture\tid\t" + fieldOffset(RenderTexture, "id", "u32"));
console.log("FIELD\tRenderTexture\ttexture\t" + fieldOffset(RenderTexture, "texture", "aggregate"));
console.log("FIELD\tRenderTexture\tdepth\t" + fieldOffset(RenderTexture, "depth", "aggregate"));
console.log("STRUCT\tNPatchInfo\t" + NPatchInfo.size + "\t" + NPatchInfo.alignment);
console.log("FIELD\tNPatchInfo\tsource\t" + fieldOffset(NPatchInfo, "source", "aggregate"));
console.log("FIELD\tNPatchInfo\tleft\t" + fieldOffset(NPatchInfo, "left", "i32"));
console.log("FIELD\tNPatchInfo\ttop\t" + fieldOffset(NPatchInfo, "top", "i32"));
console.log("FIELD\tNPatchInfo\tright\t" + fieldOffset(NPatchInfo, "right", "i32"));
console.log("FIELD\tNPatchInfo\tbottom\t" + fieldOffset(NPatchInfo, "bottom", "i32"));
console.log("FIELD\tNPatchInfo\tlayout\t" + fieldOffset(NPatchInfo, "layout", "i32"));
console.log("STRUCT\tGlyphInfo\t" + GlyphInfo.size + "\t" + GlyphInfo.alignment);
console.log("FIELD\tGlyphInfo\tvalue\t" + fieldOffset(GlyphInfo, "value", "i32"));
console.log("FIELD\tGlyphInfo\toffsetX\t" + fieldOffset(GlyphInfo, "offsetX", "i32"));
console.log("FIELD\tGlyphInfo\toffsetY\t" + fieldOffset(GlyphInfo, "offsetY", "i32"));
console.log("FIELD\tGlyphInfo\tadvanceX\t" + fieldOffset(GlyphInfo, "advanceX", "i32"));
console.log("FIELD\tGlyphInfo\timage\t" + fieldOffset(GlyphInfo, "image", "aggregate"));
console.log("STRUCT\tFont\t" + Font.size + "\t" + Font.alignment);
console.log("FIELD\tFont\tbaseSize\t" + fieldOffset(Font, "baseSize", "i32"));
console.log("FIELD\tFont\tglyphCount\t" + fieldOffset(Font, "glyphCount", "i32"));
console.log("FIELD\tFont\tglyphPadding\t" + fieldOffset(Font, "glyphPadding", "i32"));
console.log("FIELD\tFont\ttexture\t" + fieldOffset(Font, "texture", "aggregate"));
console.log("FIELD\tFont\trecs\t" + fieldOffset(Font, "recs", "pointer"));
console.log("FIELD\tFont\tglyphs\t" + fieldOffset(Font, "glyphs", "pointer"));
console.log("STRUCT\tCamera3D\t" + Camera3D.size + "\t" + Camera3D.alignment);
console.log("FIELD\tCamera3D\tposition\t" + fieldOffset(Camera3D, "position", "aggregate"));
console.log("FIELD\tCamera3D\ttarget\t" + fieldOffset(Camera3D, "target", "aggregate"));
console.log("FIELD\tCamera3D\tup\t" + fieldOffset(Camera3D, "up", "aggregate"));
console.log("FIELD\tCamera3D\tfovy\t" + fieldOffset(Camera3D, "fovy", "f32"));
console.log("FIELD\tCamera3D\tprojection\t" + fieldOffset(Camera3D, "projection", "i32"));
console.log("STRUCT\tCamera2D\t" + Camera2D.size + "\t" + Camera2D.alignment);
console.log("FIELD\tCamera2D\toffset\t" + fieldOffset(Camera2D, "offset", "aggregate"));
console.log("FIELD\tCamera2D\ttarget\t" + fieldOffset(Camera2D, "target", "aggregate"));
console.log("FIELD\tCamera2D\trotation\t" + fieldOffset(Camera2D, "rotation", "f32"));
console.log("FIELD\tCamera2D\tzoom\t" + fieldOffset(Camera2D, "zoom", "f32"));
console.log("STRUCT\tMesh\t" + Mesh.size + "\t" + Mesh.alignment);
console.log("FIELD\tMesh\tvertexCount\t" + fieldOffset(Mesh, "vertexCount", "i32"));
console.log("FIELD\tMesh\ttriangleCount\t" + fieldOffset(Mesh, "triangleCount", "i32"));
console.log("FIELD\tMesh\tvertices\t" + fieldOffset(Mesh, "vertices", "pointer"));
console.log("FIELD\tMesh\ttexcoords\t" + fieldOffset(Mesh, "texcoords", "pointer"));
console.log("FIELD\tMesh\ttexcoords2\t" + fieldOffset(Mesh, "texcoords2", "pointer"));
console.log("FIELD\tMesh\tnormals\t" + fieldOffset(Mesh, "normals", "pointer"));
console.log("FIELD\tMesh\ttangents\t" + fieldOffset(Mesh, "tangents", "pointer"));
console.log("FIELD\tMesh\tcolors\t" + fieldOffset(Mesh, "colors", "pointer"));
console.log("FIELD\tMesh\tindices\t" + fieldOffset(Mesh, "indices", "pointer"));
console.log("FIELD\tMesh\tboneCount\t" + fieldOffset(Mesh, "boneCount", "i32"));
console.log("FIELD\tMesh\tboneIndices\t" + fieldOffset(Mesh, "boneIndices", "pointer"));
console.log("FIELD\tMesh\tboneWeights\t" + fieldOffset(Mesh, "boneWeights", "pointer"));
console.log("FIELD\tMesh\tanimVertices\t" + fieldOffset(Mesh, "animVertices", "pointer"));
console.log("FIELD\tMesh\tanimNormals\t" + fieldOffset(Mesh, "animNormals", "pointer"));
console.log("FIELD\tMesh\tvaoId\t" + fieldOffset(Mesh, "vaoId", "u32"));
console.log("FIELD\tMesh\tvboId\t" + fieldOffset(Mesh, "vboId", "pointer"));
console.log("STRUCT\tShader\t" + Shader.size + "\t" + Shader.alignment);
console.log("FIELD\tShader\tid\t" + fieldOffset(Shader, "id", "u32"));
console.log("FIELD\tShader\tlocs\t" + fieldOffset(Shader, "locs", "pointer"));
console.log("STRUCT\tMaterialMap\t" + MaterialMap.size + "\t" + MaterialMap.alignment);
console.log("FIELD\tMaterialMap\ttexture\t" + fieldOffset(MaterialMap, "texture", "aggregate"));
console.log("FIELD\tMaterialMap\tcolor\t" + fieldOffset(MaterialMap, "color", "aggregate"));
console.log("FIELD\tMaterialMap\tvalue\t" + fieldOffset(MaterialMap, "value", "f32"));
console.log("STRUCT\tMaterial\t" + Material.size + "\t" + Material.alignment);
console.log("FIELD\tMaterial\tshader\t" + fieldOffset(Material, "shader", "aggregate"));
console.log("FIELD\tMaterial\tmaps\t" + fieldOffset(Material, "maps", "pointer"));
console.log("FIELD\tMaterial\tparams\t" + fieldOffset(Material, "params", "aggregate"));
console.log("STRUCT\tTransform\t" + Transform.size + "\t" + Transform.alignment);
console.log("FIELD\tTransform\ttranslation\t" + fieldOffset(Transform, "translation", "aggregate"));
console.log("FIELD\tTransform\trotation\t" + fieldOffset(Transform, "rotation", "aggregate"));
console.log("FIELD\tTransform\tscale\t" + fieldOffset(Transform, "scale", "aggregate"));
console.log("STRUCT\tBoneInfo\t" + BoneInfo.size + "\t" + BoneInfo.alignment);
console.log("FIELD\tBoneInfo\tname\t" + fieldOffset(BoneInfo, "name", "aggregate"));
console.log("FIELD\tBoneInfo\tparent\t" + fieldOffset(BoneInfo, "parent", "i32"));
console.log("STRUCT\tModelSkeleton\t" + ModelSkeleton.size + "\t" + ModelSkeleton.alignment);
console.log("FIELD\tModelSkeleton\tboneCount\t" + fieldOffset(ModelSkeleton, "boneCount", "i32"));
console.log("FIELD\tModelSkeleton\tbones\t" + fieldOffset(ModelSkeleton, "bones", "pointer"));
console.log("FIELD\tModelSkeleton\tbindPose\t" + fieldOffset(ModelSkeleton, "bindPose", "pointer"));
console.log("STRUCT\tModel\t" + Model.size + "\t" + Model.alignment);
console.log("FIELD\tModel\ttransform\t" + fieldOffset(Model, "transform", "aggregate"));
console.log("FIELD\tModel\tmeshCount\t" + fieldOffset(Model, "meshCount", "i32"));
console.log("FIELD\tModel\tmaterialCount\t" + fieldOffset(Model, "materialCount", "i32"));
console.log("FIELD\tModel\tmeshes\t" + fieldOffset(Model, "meshes", "pointer"));
console.log("FIELD\tModel\tmaterials\t" + fieldOffset(Model, "materials", "pointer"));
console.log("FIELD\tModel\tmeshMaterial\t" + fieldOffset(Model, "meshMaterial", "pointer"));
console.log("FIELD\tModel\tskeleton\t" + fieldOffset(Model, "skeleton", "aggregate"));
console.log("FIELD\tModel\tcurrentPose\t" + fieldOffset(Model, "currentPose", "pointer"));
console.log("FIELD\tModel\tboneMatrices\t" + fieldOffset(Model, "boneMatrices", "pointer"));
console.log("STRUCT\tModelAnimation\t" + ModelAnimation.size + "\t" + ModelAnimation.alignment);
console.log("FIELD\tModelAnimation\tname\t" + fieldOffset(ModelAnimation, "name", "aggregate"));
console.log("FIELD\tModelAnimation\tboneCount\t" + fieldOffset(ModelAnimation, "boneCount", "i32"));
console.log("FIELD\tModelAnimation\tkeyframeCount\t" + fieldOffset(ModelAnimation, "keyframeCount", "i32"));
console.log("FIELD\tModelAnimation\tkeyframePoses\t" + fieldOffset(ModelAnimation, "keyframePoses", "pointer"));
console.log("STRUCT\tRay\t" + Ray.size + "\t" + Ray.alignment);
console.log("FIELD\tRay\tposition\t" + fieldOffset(Ray, "position", "aggregate"));
console.log("FIELD\tRay\tdirection\t" + fieldOffset(Ray, "direction", "aggregate"));
console.log("STRUCT\tRayCollision\t" + RayCollision.size + "\t" + RayCollision.alignment);
console.log("FIELD\tRayCollision\thit\t" + fieldOffset(RayCollision, "hit", "bool"));
console.log("FIELD\tRayCollision\tdistance\t" + fieldOffset(RayCollision, "distance", "f32"));
console.log("FIELD\tRayCollision\tpoint\t" + fieldOffset(RayCollision, "point", "aggregate"));
console.log("FIELD\tRayCollision\tnormal\t" + fieldOffset(RayCollision, "normal", "aggregate"));
console.log("STRUCT\tBoundingBox\t" + BoundingBox.size + "\t" + BoundingBox.alignment);
console.log("FIELD\tBoundingBox\tmin\t" + fieldOffset(BoundingBox, "min", "aggregate"));
console.log("FIELD\tBoundingBox\tmax\t" + fieldOffset(BoundingBox, "max", "aggregate"));
console.log("STRUCT\tWave\t" + Wave.size + "\t" + Wave.alignment);
console.log("FIELD\tWave\tframeCount\t" + fieldOffset(Wave, "frameCount", "u32"));
console.log("FIELD\tWave\tsampleRate\t" + fieldOffset(Wave, "sampleRate", "u32"));
console.log("FIELD\tWave\tsampleSize\t" + fieldOffset(Wave, "sampleSize", "u32"));
console.log("FIELD\tWave\tchannels\t" + fieldOffset(Wave, "channels", "u32"));
console.log("FIELD\tWave\tdata\t" + fieldOffset(Wave, "data", "pointer"));
console.log("STRUCT\tAudioStream\t" + AudioStream.size + "\t" + AudioStream.alignment);
console.log("FIELD\tAudioStream\tbuffer\t" + fieldOffset(AudioStream, "nativeBuffer", "pointer"));
console.log("FIELD\tAudioStream\tprocessor\t" + fieldOffset(AudioStream, "processor", "pointer"));
console.log("FIELD\tAudioStream\tsampleRate\t" + fieldOffset(AudioStream, "sampleRate", "u32"));
console.log("FIELD\tAudioStream\tsampleSize\t" + fieldOffset(AudioStream, "sampleSize", "u32"));
console.log("FIELD\tAudioStream\tchannels\t" + fieldOffset(AudioStream, "channels", "u32"));
console.log("STRUCT\tSound\t" + Sound.size + "\t" + Sound.alignment);
console.log("FIELD\tSound\tstream\t" + fieldOffset(Sound, "stream", "aggregate"));
console.log("FIELD\tSound\tframeCount\t" + fieldOffset(Sound, "frameCount", "u32"));
console.log("STRUCT\tMusic\t" + Music.size + "\t" + Music.alignment);
console.log("FIELD\tMusic\tstream\t" + fieldOffset(Music, "stream", "aggregate"));
console.log("FIELD\tMusic\tframeCount\t" + fieldOffset(Music, "frameCount", "u32"));
console.log("FIELD\tMusic\tlooping\t" + fieldOffset(Music, "looping", "bool"));
console.log("FIELD\tMusic\tctxType\t" + fieldOffset(Music, "ctxType", "i32"));
console.log("FIELD\tMusic\tctxData\t" + fieldOffset(Music, "ctxData", "pointer"));
console.log("STRUCT\tVrDeviceInfo\t" + VrDeviceInfo.size + "\t" + VrDeviceInfo.alignment);
console.log("FIELD\tVrDeviceInfo\thResolution\t" + fieldOffset(VrDeviceInfo, "hResolution", "i32"));
console.log("FIELD\tVrDeviceInfo\tvResolution\t" + fieldOffset(VrDeviceInfo, "vResolution", "i32"));
console.log("FIELD\tVrDeviceInfo\thScreenSize\t" + fieldOffset(VrDeviceInfo, "hScreenSize", "f32"));
console.log("FIELD\tVrDeviceInfo\tvScreenSize\t" + fieldOffset(VrDeviceInfo, "vScreenSize", "f32"));
console.log("FIELD\tVrDeviceInfo\teyeToScreenDistance\t" + fieldOffset(VrDeviceInfo, "eyeToScreenDistance", "f32"));
console.log("FIELD\tVrDeviceInfo\tlensSeparationDistance\t" + fieldOffset(VrDeviceInfo, "lensSeparationDistance", "f32"));
console.log("FIELD\tVrDeviceInfo\tinterpupillaryDistance\t" + fieldOffset(VrDeviceInfo, "interpupillaryDistance", "f32"));
console.log("FIELD\tVrDeviceInfo\tlensDistortionValues\t" + fieldOffset(VrDeviceInfo, "lensDistortionValues", "aggregate"));
console.log("FIELD\tVrDeviceInfo\tchromaAbCorrection\t" + fieldOffset(VrDeviceInfo, "chromaAbCorrection", "aggregate"));
console.log("STRUCT\tVrStereoConfig\t" + VrStereoConfig.size + "\t" + VrStereoConfig.alignment);
console.log("FIELD\tVrStereoConfig\tprojection\t" + fieldOffset(VrStereoConfig, "projection", "aggregate"));
console.log("FIELD\tVrStereoConfig\tviewOffset\t" + fieldOffset(VrStereoConfig, "viewOffset", "aggregate"));
console.log("FIELD\tVrStereoConfig\tleftLensCenter\t" + fieldOffset(VrStereoConfig, "leftLensCenter", "aggregate"));
console.log("FIELD\tVrStereoConfig\trightLensCenter\t" + fieldOffset(VrStereoConfig, "rightLensCenter", "aggregate"));
console.log("FIELD\tVrStereoConfig\tleftScreenCenter\t" + fieldOffset(VrStereoConfig, "leftScreenCenter", "aggregate"));
console.log("FIELD\tVrStereoConfig\trightScreenCenter\t" + fieldOffset(VrStereoConfig, "rightScreenCenter", "aggregate"));
console.log("FIELD\tVrStereoConfig\tscale\t" + fieldOffset(VrStereoConfig, "scale", "aggregate"));
console.log("FIELD\tVrStereoConfig\tscaleIn\t" + fieldOffset(VrStereoConfig, "scaleIn", "aggregate"));
console.log("STRUCT\tFilePathList\t" + FilePathList.size + "\t" + FilePathList.alignment);
console.log("FIELD\tFilePathList\tcount\t" + fieldOffset(FilePathList, "count", "u32"));
console.log("FIELD\tFilePathList\tpaths\t" + fieldOffset(FilePathList, "paths", "pointer"));
console.log("STRUCT\tAutomationEvent\t" + AutomationEvent.size + "\t" + AutomationEvent.alignment);
console.log("FIELD\tAutomationEvent\tframe\t" + fieldOffset(AutomationEvent, "frame", "u32"));
console.log("FIELD\tAutomationEvent\ttype\t" + fieldOffset(AutomationEvent, "type", "u32"));
console.log("FIELD\tAutomationEvent\tparams\t" + fieldOffset(AutomationEvent, "params", "aggregate"));
console.log("STRUCT\tAutomationEventList\t" + AutomationEventList.size + "\t" + AutomationEventList.alignment);
console.log("FIELD\tAutomationEventList\tcapacity\t" + fieldOffset(AutomationEventList, "capacity", "u32"));
console.log("FIELD\tAutomationEventList\tcount\t" + fieldOffset(AutomationEventList, "count", "u32"));
console.log("FIELD\tAutomationEventList\tevents\t" + fieldOffset(AutomationEventList, "events", "pointer"));
