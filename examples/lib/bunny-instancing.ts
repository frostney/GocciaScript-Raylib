import {
  BeginShaderMode,
  DrawMeshInstanced,
  EndShaderMode,
  GenImageColor,
  GenMeshHeightmap,
  IsShaderValid,
  LoadMaterialDefault,
  LoadShaderFromMemory,
  MATERIAL_MAP_DIFFUSE,
  SetMaterialTexture,
  UnloadImage,
  UnloadMaterial,
  UnloadMesh,
  UnloadShader,
  UpdateMeshBuffer,
  Vector3,
  WHITE,
} from "../../bindings/raylib.ts";

const vertexShaderSource = `#version 330
in vec3 vertexPosition;
in vec2 vertexTexCoord;
in mat4 instanceTransform;
out vec2 fragTexCoord;
out vec4 fragColor;
uniform mat4 mvp;
void main() {
  fragTexCoord = vertexTexCoord;
  fragColor = instanceTransform[0];
  vec2 position = vertexPosition.xy + instanceTransform[3].xy;
  gl_Position = mvp*vec4(position, 0.0, 1.0);
}`;

const fragmentShaderSource = `#version 330
in vec2 fragTexCoord;
in vec4 fragColor;
out vec4 finalColor;
uniform sampler2D texture0;
uniform vec4 colDiffuse;
void main() {
  finalColor = texture(texture0, fragTexCoord)*colDiffuse*fragColor;
}`;

const quadVertices = new Float32Array([
  0, 0, 0,
  0, 32, 0,
  32, 32, 0,
  0, 0, 0,
  32, 32, 0,
  32, 0, 0,
]);

const quadTexcoords = new Float32Array([
  0, 0,
  0, 1,
  1, 1,
  0, 0,
  1, 1,
  1, 0,
]);

export const createBunnyInstancing = (texture) => {
  const shader = LoadShaderFromMemory(
    vertexShaderSource,
    fragmentShaderSource,
  );
  if (!IsShaderValid(shader)) {
    UnloadShader(shader);
    return null;
  }

  const meshImage = GenImageColor(2, 2, WHITE);
  const mesh = GenMeshHeightmap(
    meshImage,
    Vector3.create({ x: texture.width, y: 0, z: texture.height }),
  );
  UnloadImage(meshImage);
  UpdateMeshBuffer(mesh, 0, quadVertices, quadVertices.byteLength, 0);
  UpdateMeshBuffer(mesh, 1, quadTexcoords, quadTexcoords.byteLength, 0);

  const material = LoadMaterialDefault();
  material.shader = shader;
  SetMaterialTexture(material, MATERIAL_MAP_DIFFUSE, texture);
  return { material, mesh };
};

export const drawBunnyInstances = (
  instancing,
  state,
): void => {
  if (state.length === 0) return;
  BeginShaderMode(instancing.material.shader);
  DrawMeshInstanced(
    instancing.mesh,
    instancing.material,
    state.transforms,
    state.length,
  );
  EndShaderMode();
};

export const unloadBunnyInstancing = (instancing): void => {
  UnloadMesh(instancing.mesh);
  // The material owns its custom shader and attached bunny texture in raylib.
  UnloadMaterial(instancing.material);
};
