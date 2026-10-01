import {
  BeginShaderMode,
  DrawMeshInstanced,
  EndShaderMode,
  GenMeshPlane,
  IsShaderValid,
  LoadMaterialDefault,
  LoadShaderFromMemory,
  MATERIAL_MAP_DIFFUSE,
  SetMaterialTexture,
  UnloadMaterial,
  UnloadMesh,
  UnloadShader,
  UpdateMeshBuffer,
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

export const createBunnyInstancing = (texture) => {
  const shader = LoadShaderFromMemory(
    vertexShaderSource,
    fragmentShaderSource,
  );
  if (!IsShaderValid(shader)) {
    UnloadShader(shader);
    return null;
  }

  // GenMeshPlane supplies an uploaded one-quad mesh centred on the XZ plane.
  // Its texture coordinates already match the sprite; its positions move to
  // the screen plane with the sprite origin at the top-left corner.
  const mesh = GenMeshPlane(texture.width, texture.height, 1, 1);
  const quadVertices = new Float32Array([
    0, 0, 0,
    texture.width, 0, 0,
    0, texture.height, 0,
    texture.width, texture.height, 0,
  ]);
  UpdateMeshBuffer(mesh, 0, quadVertices, quadVertices.byteLength, 0);

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
