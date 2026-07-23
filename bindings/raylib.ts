// Generated from official raylib 6.0 (dbc56a87da87d973a9c5baa4e7438a9d20121d28).
// Do not edit by hand; run npm run generate.

export const RAYLIB_BINDING_INFO = {
  raylibVersion: "6.0",
  raylibCommit: "dbc56a87da87d973a9c5baa4e7438a9d20121d28",
  gocciaScriptVersion: "0.10.0",
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
    "Unable to load the raylib 6.0 dynamic library. Tried: " +
      candidates.join(", ") +
      ". Last error: " +
      lastError,
  );
};

export const raylibLibrary = openRaylib();
export const closeRaylib = (): void => {
  if (!raylibLibrary.closed) raylibLibrary.close();
};

/** Vector2, 2 components */
export const Vector2 = FFI.struct({
  "x": "f32",
  "y": "f32",
});

/** Vector3, 3 components */
export const Vector3 = FFI.struct({
  "x": "f32",
  "y": "f32",
  "z": "f32",
});

/** Vector4, 4 components */
export const Vector4 = FFI.struct({
  "x": "f32",
  "y": "f32",
  "z": "f32",
  "w": "f32",
});

/** Matrix, 4x4 components, column major, OpenGL style, right-handed */
export const Matrix = FFI.struct({
  "m0": "f32",
  "m4": "f32",
  "m8": "f32",
  "m12": "f32",
  "m1": "f32",
  "m5": "f32",
  "m9": "f32",
  "m13": "f32",
  "m2": "f32",
  "m6": "f32",
  "m10": "f32",
  "m14": "f32",
  "m3": "f32",
  "m7": "f32",
  "m11": "f32",
  "m15": "f32",
});

/** Color, 4 components, R8G8B8A8 (32bit) */
export const Color = FFI.struct({
  "r": "u8",
  "g": "u8",
  "b": "u8",
  "a": "u8",
});

/** Rectangle, 4 components */
export const Rectangle = FFI.struct({
  "x": "f32",
  "y": "f32",
  "width": "f32",
  "height": "f32",
});

/** Image, pixel data stored in CPU memory (RAM) */
export const Image = FFI.struct({
  "data": "pointer",
  "width": "i32",
  "height": "i32",
  "mipmaps": "i32",
  "format": "i32",
});

/** Texture, tex data stored in GPU memory (VRAM) */
export const Texture = FFI.struct({
  "id": "u32",
  "width": "i32",
  "height": "i32",
  "mipmaps": "i32",
  "format": "i32",
});

/** RenderTexture, fbo for texture rendering */
export const RenderTexture = FFI.struct({
  "id": "u32",
  "texture": Texture,
  "depth": Texture,
});

/** NPatchInfo, n-patch layout info */
export const NPatchInfo = FFI.struct({
  "source": Rectangle,
  "left": "i32",
  "top": "i32",
  "right": "i32",
  "bottom": "i32",
  "layout": "i32",
});

/** GlyphInfo, font characters glyphs info */
export const GlyphInfo = FFI.struct({
  "value": "i32",
  "offsetX": "i32",
  "offsetY": "i32",
  "advanceX": "i32",
  "image": Image,
});

/** Font, font texture and GlyphInfo array data */
export const Font = FFI.struct({
  "baseSize": "i32",
  "glyphCount": "i32",
  "glyphPadding": "i32",
  "texture": Texture,
  "recs": "pointer",
  "glyphs": "pointer",
});

/** Camera, defines position/orientation in 3d space */
export const Camera3D = FFI.struct({
  "position": Vector3,
  "target": Vector3,
  "up": Vector3,
  "fovy": "f32",
  "projection": "i32",
});

/** Camera2D, defines position/orientation in 2d space */
export const Camera2D = FFI.struct({
  "offset": Vector2,
  "target": Vector2,
  "rotation": "f32",
  "zoom": "f32",
});

/** Mesh, vertex data and vao/vbo */
export const Mesh = FFI.struct({
  "vertexCount": "i32",
  "triangleCount": "i32",
  "vertices": "pointer",
  "texcoords": "pointer",
  "texcoords2": "pointer",
  "normals": "pointer",
  "tangents": "pointer",
  "colors": "pointer",
  "indices": "pointer",
  "boneCount": "i32",
  "boneIndices": "pointer",
  "boneWeights": "pointer",
  "animVertices": "pointer",
  "animNormals": "pointer",
  "vaoId": "u32",
  "vboId": "pointer",
});

/** Shader */
export const Shader = FFI.struct({
  "id": "u32",
  "locs": "pointer",
});

/** MaterialMap */
export const MaterialMap = FFI.struct({
  "texture": Texture,
  "color": Color,
  "value": "f32",
});

/** Material, includes shader and maps */
export const Material = FFI.struct({
  "shader": Shader,
  "maps": "pointer",
  "params": FFI.array("f32", 4),
});

/** Transform, vertex transformation data */
export const Transform = FFI.struct({
  "translation": Vector3,
  "rotation": Vector4,
  "scale": Vector3,
});

/** Bone, skeletal animation bone */
export const BoneInfo = FFI.struct({
  "name": FFI.array("i8", 32),
  "parent": "i32",
});

/** Skeleton, animation bones hierarchy */
export const ModelSkeleton = FFI.struct({
  "boneCount": "i32",
  "bones": "pointer",
  "bindPose": "pointer",
});

/** Model, meshes, materials and animation data */
export const Model = FFI.struct({
  "transform": Matrix,
  "meshCount": "i32",
  "materialCount": "i32",
  "meshes": "pointer",
  "materials": "pointer",
  "meshMaterial": "pointer",
  "skeleton": ModelSkeleton,
  "currentPose": "pointer",
  "boneMatrices": "pointer",
});

/** ModelAnimation, contains a full animation sequence */
export const ModelAnimation = FFI.struct({
  "name": FFI.array("i8", 32),
  "boneCount": "i32",
  "keyframeCount": "i32",
  "keyframePoses": "pointer",
});

/** Ray, ray for raycasting */
export const Ray = FFI.struct({
  "position": Vector3,
  "direction": Vector3,
});

/** RayCollision, ray hit information */
export const RayCollision = FFI.struct({
  "hit": "bool",
  "distance": "f32",
  "point": Vector3,
  "normal": Vector3,
});

/** BoundingBox */
export const BoundingBox = FFI.struct({
  "min": Vector3,
  "max": Vector3,
});

/** Wave, audio wave data */
export const Wave = FFI.struct({
  "frameCount": "u32",
  "sampleRate": "u32",
  "sampleSize": "u32",
  "channels": "u32",
  "data": "pointer",
});

/** AudioStream, custom audio stream */
export const AudioStream = FFI.struct({
  "nativeBuffer": "pointer",
  "processor": "pointer",
  "sampleRate": "u32",
  "sampleSize": "u32",
  "channels": "u32",
});

/** Sound */
export const Sound = FFI.struct({
  "stream": AudioStream,
  "frameCount": "u32",
});

/** Music, audio stream, anything longer than ~10 seconds should be streamed */
export const Music = FFI.struct({
  "stream": AudioStream,
  "frameCount": "u32",
  "looping": "bool",
  "ctxType": "i32",
  "ctxData": "pointer",
});

/** VrDeviceInfo, Head-Mounted-Display device parameters */
export const VrDeviceInfo = FFI.struct({
  "hResolution": "i32",
  "vResolution": "i32",
  "hScreenSize": "f32",
  "vScreenSize": "f32",
  "eyeToScreenDistance": "f32",
  "lensSeparationDistance": "f32",
  "interpupillaryDistance": "f32",
  "lensDistortionValues": FFI.array("f32", 4),
  "chromaAbCorrection": FFI.array("f32", 4),
});

/** VrStereoConfig, VR stereo rendering configuration for simulator */
export const VrStereoConfig = FFI.struct({
  "projection": FFI.array(Matrix, 2),
  "viewOffset": FFI.array(Matrix, 2),
  "leftLensCenter": FFI.array("f32", 2),
  "rightLensCenter": FFI.array("f32", 2),
  "leftScreenCenter": FFI.array("f32", 2),
  "rightScreenCenter": FFI.array("f32", 2),
  "scale": FFI.array("f32", 2),
  "scaleIn": FFI.array("f32", 2),
});

/** File path list */
export const FilePathList = FFI.struct({
  "count": "u32",
  "paths": "pointer",
});

/** Automation event */
export const AutomationEvent = FFI.struct({
  "frame": "u32",
  "type": "u32",
  "params": FFI.array("i32", 4),
});

/** Automation event list */
export const AutomationEventList = FFI.struct({
  "capacity": "u32",
  "count": "u32",
  "events": "pointer",
});

/** Quaternion, 4 components (Vector4 alias) */
export const Quaternion = Vector4;

/** Texture2D, same as Texture */
export const Texture2D = Texture;

/** TextureCubemap, same as Texture */
export const TextureCubemap = Texture;

/** RenderTexture2D, same as RenderTexture */
export const RenderTexture2D = RenderTexture;

/** Camera type fallback, defaults to Camera3D */
export const Camera = Camera3D;

/** Anim pose, an array of Transform[] */
export const ModelAnimPose = "pointer";

/** Logging: Redirect trace log messages */
export const TraceLogCallback = "pointer";

/** FileIO: Load binary data */
export const LoadFileDataCallback = "pointer";

/** FileIO: Save binary data */
export const SaveFileDataCallback = "pointer";

/** FileIO: Load text data */
export const LoadFileTextCallback = "pointer";

/** FileIO: Save text data */
export const SaveFileTextCallback = "pointer";

export const AudioCallback = "pointer";

/** Set to try enabling V-Sync on GPU */
export const FLAG_VSYNC_HINT = 64;
/** Set to run program in fullscreen */
export const FLAG_FULLSCREEN_MODE = 2;
/** Set to allow resizable window */
export const FLAG_WINDOW_RESIZABLE = 4;
/** Set to disable window decoration (frame and buttons) */
export const FLAG_WINDOW_UNDECORATED = 8;
/** Set to hide window */
export const FLAG_WINDOW_HIDDEN = 128;
/** Set to minimize window (iconify) */
export const FLAG_WINDOW_MINIMIZED = 512;
/** Set to maximize window (expanded to monitor) */
export const FLAG_WINDOW_MAXIMIZED = 1024;
/** Set to window non focused */
export const FLAG_WINDOW_UNFOCUSED = 2048;
/** Set to window always on top */
export const FLAG_WINDOW_TOPMOST = 4096;
/** Set to allow windows running while minimized */
export const FLAG_WINDOW_ALWAYS_RUN = 256;
/** Set to allow transparent framebuffer */
export const FLAG_WINDOW_TRANSPARENT = 16;
/** Set to support HighDPI */
export const FLAG_WINDOW_HIGHDPI = 8192;
/** Set to support mouse passthrough, only supported when FLAG_WINDOW_UNDECORATED */
export const FLAG_WINDOW_MOUSE_PASSTHROUGH = 16384;
/** Set to run program in borderless windowed mode */
export const FLAG_BORDERLESS_WINDOWED_MODE = 32768;
/** Set to try enabling MSAA 4X */
export const FLAG_MSAA_4X_HINT = 32;
/** Set to try enabling interlaced video format (for V3D) */
export const FLAG_INTERLACED_HINT = 65536;

/** Display all logs */
export const LOG_ALL = 0;
/** Trace logging, intended for internal use only */
export const LOG_TRACE = 1;
/** Debug logging, used for internal debugging, it should be disabled on release builds */
export const LOG_DEBUG = 2;
/** Info logging, used for program execution info */
export const LOG_INFO = 3;
/** Warning logging, used on recoverable failures */
export const LOG_WARNING = 4;
/** Error logging, used on unrecoverable failures */
export const LOG_ERROR = 5;
/** Fatal logging, used to abort program: exit(EXIT_FAILURE) */
export const LOG_FATAL = 6;
/** Disable logging */
export const LOG_NONE = 7;

/** Key: NULL, used for no key pressed */
export const KEY_NULL = 0;
/** Key: ' */
export const KEY_APOSTROPHE = 39;
/** Key: , */
export const KEY_COMMA = 44;
/** Key: - */
export const KEY_MINUS = 45;
/** Key: . */
export const KEY_PERIOD = 46;
/** Key: / */
export const KEY_SLASH = 47;
/** Key: 0 */
export const KEY_ZERO = 48;
/** Key: 1 */
export const KEY_ONE = 49;
/** Key: 2 */
export const KEY_TWO = 50;
/** Key: 3 */
export const KEY_THREE = 51;
/** Key: 4 */
export const KEY_FOUR = 52;
/** Key: 5 */
export const KEY_FIVE = 53;
/** Key: 6 */
export const KEY_SIX = 54;
/** Key: 7 */
export const KEY_SEVEN = 55;
/** Key: 8 */
export const KEY_EIGHT = 56;
/** Key: 9 */
export const KEY_NINE = 57;
/** Key: ; */
export const KEY_SEMICOLON = 59;
/** Key: = */
export const KEY_EQUAL = 61;
/** Key: A | a */
export const KEY_A = 65;
/** Key: B | b */
export const KEY_B = 66;
/** Key: C | c */
export const KEY_C = 67;
/** Key: D | d */
export const KEY_D = 68;
/** Key: E | e */
export const KEY_E = 69;
/** Key: F | f */
export const KEY_F = 70;
/** Key: G | g */
export const KEY_G = 71;
/** Key: H | h */
export const KEY_H = 72;
/** Key: I | i */
export const KEY_I = 73;
/** Key: J | j */
export const KEY_J = 74;
/** Key: K | k */
export const KEY_K = 75;
/** Key: L | l */
export const KEY_L = 76;
/** Key: M | m */
export const KEY_M = 77;
/** Key: N | n */
export const KEY_N = 78;
/** Key: O | o */
export const KEY_O = 79;
/** Key: P | p */
export const KEY_P = 80;
/** Key: Q | q */
export const KEY_Q = 81;
/** Key: R | r */
export const KEY_R = 82;
/** Key: S | s */
export const KEY_S = 83;
/** Key: T | t */
export const KEY_T = 84;
/** Key: U | u */
export const KEY_U = 85;
/** Key: V | v */
export const KEY_V = 86;
/** Key: W | w */
export const KEY_W = 87;
/** Key: X | x */
export const KEY_X = 88;
/** Key: Y | y */
export const KEY_Y = 89;
/** Key: Z | z */
export const KEY_Z = 90;
/** Key: [ */
export const KEY_LEFT_BRACKET = 91;
/** Key: '\' */
export const KEY_BACKSLASH = 92;
/** Key: ] */
export const KEY_RIGHT_BRACKET = 93;
/** Key: ` */
export const KEY_GRAVE = 96;
/** Key: Space */
export const KEY_SPACE = 32;
/** Key: Esc */
export const KEY_ESCAPE = 256;
/** Key: Enter */
export const KEY_ENTER = 257;
/** Key: Tab */
export const KEY_TAB = 258;
/** Key: Backspace */
export const KEY_BACKSPACE = 259;
/** Key: Ins */
export const KEY_INSERT = 260;
/** Key: Del */
export const KEY_DELETE = 261;
/** Key: Cursor right */
export const KEY_RIGHT = 262;
/** Key: Cursor left */
export const KEY_LEFT = 263;
/** Key: Cursor down */
export const KEY_DOWN = 264;
/** Key: Cursor up */
export const KEY_UP = 265;
/** Key: Page up */
export const KEY_PAGE_UP = 266;
/** Key: Page down */
export const KEY_PAGE_DOWN = 267;
/** Key: Home */
export const KEY_HOME = 268;
/** Key: End */
export const KEY_END = 269;
/** Key: Caps lock */
export const KEY_CAPS_LOCK = 280;
/** Key: Scroll down */
export const KEY_SCROLL_LOCK = 281;
/** Key: Num lock */
export const KEY_NUM_LOCK = 282;
/** Key: Print screen */
export const KEY_PRINT_SCREEN = 283;
/** Key: Pause */
export const KEY_PAUSE = 284;
/** Key: F1 */
export const KEY_F1 = 290;
/** Key: F2 */
export const KEY_F2 = 291;
/** Key: F3 */
export const KEY_F3 = 292;
/** Key: F4 */
export const KEY_F4 = 293;
/** Key: F5 */
export const KEY_F5 = 294;
/** Key: F6 */
export const KEY_F6 = 295;
/** Key: F7 */
export const KEY_F7 = 296;
/** Key: F8 */
export const KEY_F8 = 297;
/** Key: F9 */
export const KEY_F9 = 298;
/** Key: F10 */
export const KEY_F10 = 299;
/** Key: F11 */
export const KEY_F11 = 300;
/** Key: F12 */
export const KEY_F12 = 301;
/** Key: Shift left */
export const KEY_LEFT_SHIFT = 340;
/** Key: Control left */
export const KEY_LEFT_CONTROL = 341;
/** Key: Alt left */
export const KEY_LEFT_ALT = 342;
/** Key: Super left */
export const KEY_LEFT_SUPER = 343;
/** Key: Shift right */
export const KEY_RIGHT_SHIFT = 344;
/** Key: Control right */
export const KEY_RIGHT_CONTROL = 345;
/** Key: Alt right */
export const KEY_RIGHT_ALT = 346;
/** Key: Super right */
export const KEY_RIGHT_SUPER = 347;
/** Key: KB menu */
export const KEY_KB_MENU = 348;
/** Key: Keypad 0 */
export const KEY_KP_0 = 320;
/** Key: Keypad 1 */
export const KEY_KP_1 = 321;
/** Key: Keypad 2 */
export const KEY_KP_2 = 322;
/** Key: Keypad 3 */
export const KEY_KP_3 = 323;
/** Key: Keypad 4 */
export const KEY_KP_4 = 324;
/** Key: Keypad 5 */
export const KEY_KP_5 = 325;
/** Key: Keypad 6 */
export const KEY_KP_6 = 326;
/** Key: Keypad 7 */
export const KEY_KP_7 = 327;
/** Key: Keypad 8 */
export const KEY_KP_8 = 328;
/** Key: Keypad 9 */
export const KEY_KP_9 = 329;
/** Key: Keypad . */
export const KEY_KP_DECIMAL = 330;
/** Key: Keypad / */
export const KEY_KP_DIVIDE = 331;
/** Key: Keypad * */
export const KEY_KP_MULTIPLY = 332;
/** Key: Keypad - */
export const KEY_KP_SUBTRACT = 333;
/** Key: Keypad + */
export const KEY_KP_ADD = 334;
/** Key: Keypad Enter */
export const KEY_KP_ENTER = 335;
/** Key: Keypad = */
export const KEY_KP_EQUAL = 336;
/** Key: Android back button */
export const KEY_BACK = 4;
/** Key: Android menu button */
export const KEY_MENU = 5;
/** Key: Android volume up button */
export const KEY_VOLUME_UP = 24;
/** Key: Android volume down button */
export const KEY_VOLUME_DOWN = 25;

/** Mouse button left */
export const MOUSE_BUTTON_LEFT = 0;
/** Mouse button right */
export const MOUSE_BUTTON_RIGHT = 1;
/** Mouse button middle (pressed wheel) */
export const MOUSE_BUTTON_MIDDLE = 2;
/** Mouse button side (advanced mouse device) */
export const MOUSE_BUTTON_SIDE = 3;
/** Mouse button extra (advanced mouse device) */
export const MOUSE_BUTTON_EXTRA = 4;
/** Mouse button forward (advanced mouse device) */
export const MOUSE_BUTTON_FORWARD = 5;
/** Mouse button back (advanced mouse device) */
export const MOUSE_BUTTON_BACK = 6;

/** Default pointer shape */
export const MOUSE_CURSOR_DEFAULT = 0;
/** Arrow shape */
export const MOUSE_CURSOR_ARROW = 1;
/** Text writing cursor shape */
export const MOUSE_CURSOR_IBEAM = 2;
/** Cross shape */
export const MOUSE_CURSOR_CROSSHAIR = 3;
/** Pointing hand cursor */
export const MOUSE_CURSOR_POINTING_HAND = 4;
/** Horizontal resize/move arrow shape */
export const MOUSE_CURSOR_RESIZE_EW = 5;
/** Vertical resize/move arrow shape */
export const MOUSE_CURSOR_RESIZE_NS = 6;
/** Top-left to bottom-right diagonal resize/move arrow shape */
export const MOUSE_CURSOR_RESIZE_NWSE = 7;
/** The top-right to bottom-left diagonal resize/move arrow shape */
export const MOUSE_CURSOR_RESIZE_NESW = 8;
/** The omnidirectional resize/move cursor shape */
export const MOUSE_CURSOR_RESIZE_ALL = 9;
/** The operation-not-allowed shape */
export const MOUSE_CURSOR_NOT_ALLOWED = 10;

/** Unknown button, for error checking */
export const GAMEPAD_BUTTON_UNKNOWN = 0;
/** Gamepad left DPAD up button */
export const GAMEPAD_BUTTON_LEFT_FACE_UP = 1;
/** Gamepad left DPAD right button */
export const GAMEPAD_BUTTON_LEFT_FACE_RIGHT = 2;
/** Gamepad left DPAD down button */
export const GAMEPAD_BUTTON_LEFT_FACE_DOWN = 3;
/** Gamepad left DPAD left button */
export const GAMEPAD_BUTTON_LEFT_FACE_LEFT = 4;
/** Gamepad right button up (i.e. PS3: Triangle, Xbox: Y) */
export const GAMEPAD_BUTTON_RIGHT_FACE_UP = 5;
/** Gamepad right button right (i.e. PS3: Circle, Xbox: B) */
export const GAMEPAD_BUTTON_RIGHT_FACE_RIGHT = 6;
/** Gamepad right button down (i.e. PS3: Cross, Xbox: A) */
export const GAMEPAD_BUTTON_RIGHT_FACE_DOWN = 7;
/** Gamepad right button left (i.e. PS3: Square, Xbox: X) */
export const GAMEPAD_BUTTON_RIGHT_FACE_LEFT = 8;
/** Gamepad top/back trigger left (first), it could be a trailing button */
export const GAMEPAD_BUTTON_LEFT_TRIGGER_1 = 9;
/** Gamepad top/back trigger left (second), it could be a trailing button */
export const GAMEPAD_BUTTON_LEFT_TRIGGER_2 = 10;
/** Gamepad top/back trigger right (first), it could be a trailing button */
export const GAMEPAD_BUTTON_RIGHT_TRIGGER_1 = 11;
/** Gamepad top/back trigger right (second), it could be a trailing button */
export const GAMEPAD_BUTTON_RIGHT_TRIGGER_2 = 12;
/** Gamepad center buttons, left one (i.e. PS3: Select) */
export const GAMEPAD_BUTTON_MIDDLE_LEFT = 13;
/** Gamepad center buttons, middle one (i.e. PS3: PS, Xbox: XBOX) */
export const GAMEPAD_BUTTON_MIDDLE = 14;
/** Gamepad center buttons, right one (i.e. PS3: Start) */
export const GAMEPAD_BUTTON_MIDDLE_RIGHT = 15;
/** Gamepad joystick pressed button left */
export const GAMEPAD_BUTTON_LEFT_THUMB = 16;
/** Gamepad joystick pressed button right */
export const GAMEPAD_BUTTON_RIGHT_THUMB = 17;

/** Gamepad left stick X axis */
export const GAMEPAD_AXIS_LEFT_X = 0;
/** Gamepad left stick Y axis */
export const GAMEPAD_AXIS_LEFT_Y = 1;
/** Gamepad right stick X axis */
export const GAMEPAD_AXIS_RIGHT_X = 2;
/** Gamepad right stick Y axis */
export const GAMEPAD_AXIS_RIGHT_Y = 3;
/** Gamepad back trigger left, pressure level: [1..-1] */
export const GAMEPAD_AXIS_LEFT_TRIGGER = 4;
/** Gamepad back trigger right, pressure level: [1..-1] */
export const GAMEPAD_AXIS_RIGHT_TRIGGER = 5;

/** Albedo material (same as: MATERIAL_MAP_DIFFUSE) */
export const MATERIAL_MAP_ALBEDO = 0;
/** Metalness material (same as: MATERIAL_MAP_SPECULAR) */
export const MATERIAL_MAP_METALNESS = 1;
/** Normal material */
export const MATERIAL_MAP_NORMAL = 2;
/** Roughness material */
export const MATERIAL_MAP_ROUGHNESS = 3;
/** Ambient occlusion material */
export const MATERIAL_MAP_OCCLUSION = 4;
/** Emission material */
export const MATERIAL_MAP_EMISSION = 5;
/** Heightmap material */
export const MATERIAL_MAP_HEIGHT = 6;
/** Cubemap material (NOTE: Uses GL_TEXTURE_CUBE_MAP) */
export const MATERIAL_MAP_CUBEMAP = 7;
/** Irradiance material (NOTE: Uses GL_TEXTURE_CUBE_MAP) */
export const MATERIAL_MAP_IRRADIANCE = 8;
/** Prefilter material (NOTE: Uses GL_TEXTURE_CUBE_MAP) */
export const MATERIAL_MAP_PREFILTER = 9;
/** Brdf material */
export const MATERIAL_MAP_BRDF = 10;

/** Shader location: vertex attribute: position */
export const SHADER_LOC_VERTEX_POSITION = 0;
/** Shader location: vertex attribute: texcoord01 */
export const SHADER_LOC_VERTEX_TEXCOORD01 = 1;
/** Shader location: vertex attribute: texcoord02 */
export const SHADER_LOC_VERTEX_TEXCOORD02 = 2;
/** Shader location: vertex attribute: normal */
export const SHADER_LOC_VERTEX_NORMAL = 3;
/** Shader location: vertex attribute: tangent */
export const SHADER_LOC_VERTEX_TANGENT = 4;
/** Shader location: vertex attribute: color */
export const SHADER_LOC_VERTEX_COLOR = 5;
/** Shader location: matrix uniform: model-view-projection */
export const SHADER_LOC_MATRIX_MVP = 6;
/** Shader location: matrix uniform: view (camera transform) */
export const SHADER_LOC_MATRIX_VIEW = 7;
/** Shader location: matrix uniform: projection */
export const SHADER_LOC_MATRIX_PROJECTION = 8;
/** Shader location: matrix uniform: model (transform) */
export const SHADER_LOC_MATRIX_MODEL = 9;
/** Shader location: matrix uniform: normal */
export const SHADER_LOC_MATRIX_NORMAL = 10;
/** Shader location: vector uniform: view */
export const SHADER_LOC_VECTOR_VIEW = 11;
/** Shader location: vector uniform: diffuse color */
export const SHADER_LOC_COLOR_DIFFUSE = 12;
/** Shader location: vector uniform: specular color */
export const SHADER_LOC_COLOR_SPECULAR = 13;
/** Shader location: vector uniform: ambient color */
export const SHADER_LOC_COLOR_AMBIENT = 14;
/** Shader location: sampler2d texture: albedo (same as: SHADER_LOC_MAP_DIFFUSE) */
export const SHADER_LOC_MAP_ALBEDO = 15;
/** Shader location: sampler2d texture: metalness (same as: SHADER_LOC_MAP_SPECULAR) */
export const SHADER_LOC_MAP_METALNESS = 16;
/** Shader location: sampler2d texture: normal */
export const SHADER_LOC_MAP_NORMAL = 17;
/** Shader location: sampler2d texture: roughness */
export const SHADER_LOC_MAP_ROUGHNESS = 18;
/** Shader location: sampler2d texture: occlusion */
export const SHADER_LOC_MAP_OCCLUSION = 19;
/** Shader location: sampler2d texture: emission */
export const SHADER_LOC_MAP_EMISSION = 20;
/** Shader location: sampler2d texture: heightmap */
export const SHADER_LOC_MAP_HEIGHT = 21;
/** Shader location: samplerCube texture: cubemap */
export const SHADER_LOC_MAP_CUBEMAP = 22;
/** Shader location: samplerCube texture: irradiance */
export const SHADER_LOC_MAP_IRRADIANCE = 23;
/** Shader location: samplerCube texture: prefilter */
export const SHADER_LOC_MAP_PREFILTER = 24;
/** Shader location: sampler2d texture: brdf */
export const SHADER_LOC_MAP_BRDF = 25;
/** Shader location: vertex attribute: bone indices */
export const SHADER_LOC_VERTEX_BONEIDS = 26;
/** Shader location: vertex attribute: bone weights */
export const SHADER_LOC_VERTEX_BONEWEIGHTS = 27;
/** Shader location: matrix attribute: bone transforms (animation) */
export const SHADER_LOC_MATRIX_BONETRANSFORMS = 28;
/** Shader location: vertex attribute: instance transforms */
export const SHADER_LOC_VERTEX_INSTANCETRANSFORM = 29;

/** Shader uniform type: float */
export const SHADER_UNIFORM_FLOAT = 0;
/** Shader uniform type: vec2 (2 float) */
export const SHADER_UNIFORM_VEC2 = 1;
/** Shader uniform type: vec3 (3 float) */
export const SHADER_UNIFORM_VEC3 = 2;
/** Shader uniform type: vec4 (4 float) */
export const SHADER_UNIFORM_VEC4 = 3;
/** Shader uniform type: int */
export const SHADER_UNIFORM_INT = 4;
/** Shader uniform type: ivec2 (2 int) */
export const SHADER_UNIFORM_IVEC2 = 5;
/** Shader uniform type: ivec3 (3 int) */
export const SHADER_UNIFORM_IVEC3 = 6;
/** Shader uniform type: ivec4 (4 int) */
export const SHADER_UNIFORM_IVEC4 = 7;
/** Shader uniform type: unsigned int */
export const SHADER_UNIFORM_UINT = 8;
/** Shader uniform type: uivec2 (2 unsigned int) */
export const SHADER_UNIFORM_UIVEC2 = 9;
/** Shader uniform type: uivec3 (3 unsigned int) */
export const SHADER_UNIFORM_UIVEC3 = 10;
/** Shader uniform type: uivec4 (4 unsigned int) */
export const SHADER_UNIFORM_UIVEC4 = 11;
/** Shader uniform type: sampler2d */
export const SHADER_UNIFORM_SAMPLER2D = 12;

/** Shader attribute type: float */
export const SHADER_ATTRIB_FLOAT = 0;
/** Shader attribute type: vec2 (2 float) */
export const SHADER_ATTRIB_VEC2 = 1;
/** Shader attribute type: vec3 (3 float) */
export const SHADER_ATTRIB_VEC3 = 2;
/** Shader attribute type: vec4 (4 float) */
export const SHADER_ATTRIB_VEC4 = 3;

/** 8 bit per pixel (no alpha) */
export const PIXELFORMAT_UNCOMPRESSED_GRAYSCALE = 1;
/** 8*2 bpp (2 channels) */
export const PIXELFORMAT_UNCOMPRESSED_GRAY_ALPHA = 2;
/** 16 bpp */
export const PIXELFORMAT_UNCOMPRESSED_R5G6B5 = 3;
/** 24 bpp */
export const PIXELFORMAT_UNCOMPRESSED_R8G8B8 = 4;
/** 16 bpp (1 bit alpha) */
export const PIXELFORMAT_UNCOMPRESSED_R5G5B5A1 = 5;
/** 16 bpp (4 bit alpha) */
export const PIXELFORMAT_UNCOMPRESSED_R4G4B4A4 = 6;
/** 32 bpp */
export const PIXELFORMAT_UNCOMPRESSED_R8G8B8A8 = 7;
/** 32 bpp (1 channel - float) */
export const PIXELFORMAT_UNCOMPRESSED_R32 = 8;
/** 32*3 bpp (3 channels - float) */
export const PIXELFORMAT_UNCOMPRESSED_R32G32B32 = 9;
/** 32*4 bpp (4 channels - float) */
export const PIXELFORMAT_UNCOMPRESSED_R32G32B32A32 = 10;
/** 16 bpp (1 channel - half float) */
export const PIXELFORMAT_UNCOMPRESSED_R16 = 11;
/** 16*3 bpp (3 channels - half float) */
export const PIXELFORMAT_UNCOMPRESSED_R16G16B16 = 12;
/** 16*4 bpp (4 channels - half float) */
export const PIXELFORMAT_UNCOMPRESSED_R16G16B16A16 = 13;
/** 4 bpp (no alpha) */
export const PIXELFORMAT_COMPRESSED_DXT1_RGB = 14;
/** 4 bpp (1 bit alpha) */
export const PIXELFORMAT_COMPRESSED_DXT1_RGBA = 15;
/** 8 bpp */
export const PIXELFORMAT_COMPRESSED_DXT3_RGBA = 16;
/** 8 bpp */
export const PIXELFORMAT_COMPRESSED_DXT5_RGBA = 17;
/** 4 bpp */
export const PIXELFORMAT_COMPRESSED_ETC1_RGB = 18;
/** 4 bpp */
export const PIXELFORMAT_COMPRESSED_ETC2_RGB = 19;
/** 8 bpp */
export const PIXELFORMAT_COMPRESSED_ETC2_EAC_RGBA = 20;
/** 4 bpp */
export const PIXELFORMAT_COMPRESSED_PVRT_RGB = 21;
/** 4 bpp */
export const PIXELFORMAT_COMPRESSED_PVRT_RGBA = 22;
/** 8 bpp */
export const PIXELFORMAT_COMPRESSED_ASTC_4x4_RGBA = 23;
/** 2 bpp */
export const PIXELFORMAT_COMPRESSED_ASTC_8x8_RGBA = 24;

/** No filter, pixel approximation */
export const TEXTURE_FILTER_POINT = 0;
/** Linear filtering */
export const TEXTURE_FILTER_BILINEAR = 1;
/** Trilinear filtering (linear with mipmaps) */
export const TEXTURE_FILTER_TRILINEAR = 2;
/** Anisotropic filtering 4x */
export const TEXTURE_FILTER_ANISOTROPIC_4X = 3;
/** Anisotropic filtering 8x */
export const TEXTURE_FILTER_ANISOTROPIC_8X = 4;
/** Anisotropic filtering 16x */
export const TEXTURE_FILTER_ANISOTROPIC_16X = 5;

/** Repeats texture in tiled mode */
export const TEXTURE_WRAP_REPEAT = 0;
/** Clamps texture to edge pixel in tiled mode */
export const TEXTURE_WRAP_CLAMP = 1;
/** Mirrors and repeats the texture in tiled mode */
export const TEXTURE_WRAP_MIRROR_REPEAT = 2;
/** Mirrors and clamps to border the texture in tiled mode */
export const TEXTURE_WRAP_MIRROR_CLAMP = 3;

/** Automatically detect layout type */
export const CUBEMAP_LAYOUT_AUTO_DETECT = 0;
/** Layout is defined by a vertical line with faces */
export const CUBEMAP_LAYOUT_LINE_VERTICAL = 1;
/** Layout is defined by a horizontal line with faces */
export const CUBEMAP_LAYOUT_LINE_HORIZONTAL = 2;
/** Layout is defined by a 3x4 cross with cubemap faces */
export const CUBEMAP_LAYOUT_CROSS_THREE_BY_FOUR = 3;
/** Layout is defined by a 4x3 cross with cubemap faces */
export const CUBEMAP_LAYOUT_CROSS_FOUR_BY_THREE = 4;

/** Default font generation, anti-aliased */
export const FONT_DEFAULT = 0;
/** Bitmap font generation, no anti-aliasing */
export const FONT_BITMAP = 1;
/** SDF font generation, requires external shader */
export const FONT_SDF = 2;

/** Blend textures considering alpha (default) */
export const BLEND_ALPHA = 0;
/** Blend textures adding colors */
export const BLEND_ADDITIVE = 1;
/** Blend textures multiplying colors */
export const BLEND_MULTIPLIED = 2;
/** Blend textures adding colors (alternative) */
export const BLEND_ADD_COLORS = 3;
/** Blend textures subtracting colors (alternative) */
export const BLEND_SUBTRACT_COLORS = 4;
/** Blend premultiplied textures considering alpha */
export const BLEND_ALPHA_PREMULTIPLY = 5;
/** Blend textures using custom src/dst factors (use rlSetBlendFactors()) */
export const BLEND_CUSTOM = 6;
/** Blend textures using custom rgb/alpha separate src/dst factors (use rlSetBlendFactorsSeparate()) */
export const BLEND_CUSTOM_SEPARATE = 7;

/** No gesture */
export const GESTURE_NONE = 0;
/** Tap gesture */
export const GESTURE_TAP = 1;
/** Double tap gesture */
export const GESTURE_DOUBLETAP = 2;
/** Hold gesture */
export const GESTURE_HOLD = 4;
/** Drag gesture */
export const GESTURE_DRAG = 8;
/** Swipe right gesture */
export const GESTURE_SWIPE_RIGHT = 16;
/** Swipe left gesture */
export const GESTURE_SWIPE_LEFT = 32;
/** Swipe up gesture */
export const GESTURE_SWIPE_UP = 64;
/** Swipe down gesture */
export const GESTURE_SWIPE_DOWN = 128;
/** Pinch in gesture */
export const GESTURE_PINCH_IN = 256;
/** Pinch out gesture */
export const GESTURE_PINCH_OUT = 512;

/** Camera custom, controlled by user (UpdateCamera() does nothing) */
export const CAMERA_CUSTOM = 0;
/** Camera free mode */
export const CAMERA_FREE = 1;
/** Camera orbital, around target, zoom supported */
export const CAMERA_ORBITAL = 2;
/** Camera first person */
export const CAMERA_FIRST_PERSON = 3;
/** Camera third person */
export const CAMERA_THIRD_PERSON = 4;

/** Perspective projection */
export const CAMERA_PERSPECTIVE = 0;
/** Orthographic projection */
export const CAMERA_ORTHOGRAPHIC = 1;

/** Npatch layout: 3x3 tiles */
export const NPATCH_NINE_PATCH = 0;
/** Npatch layout: 1x3 tiles */
export const NPATCH_THREE_PATCH_VERTICAL = 1;
/** Npatch layout: 3x1 tiles */
export const NPATCH_THREE_PATCH_HORIZONTAL = 2;

export const RAYLIB_VERSION_MAJOR = 6;
export const RAYLIB_VERSION_MINOR = 0;
export const RAYLIB_VERSION_PATCH = 0;
export const RAYLIB_VERSION = "6.0";
export const PI = 3.141592653589793;
export const DEG2RAD = PI / 180.0;
export const RAD2DEG = 180.0 / PI;
/** Light Gray */
export const LIGHTGRAY = Color.create({ r: 200, g: 200, b: 200, a: 255 });
/** Gray */
export const GRAY = Color.create({ r: 130, g: 130, b: 130, a: 255 });
/** Dark Gray */
export const DARKGRAY = Color.create({ r: 80, g: 80, b: 80, a: 255 });
/** Yellow */
export const YELLOW = Color.create({ r: 253, g: 249, b: 0, a: 255 });
/** Gold */
export const GOLD = Color.create({ r: 255, g: 203, b: 0, a: 255 });
/** Orange */
export const ORANGE = Color.create({ r: 255, g: 161, b: 0, a: 255 });
/** Pink */
export const PINK = Color.create({ r: 255, g: 109, b: 194, a: 255 });
/** Red */
export const RED = Color.create({ r: 230, g: 41, b: 55, a: 255 });
/** Maroon */
export const MAROON = Color.create({ r: 190, g: 33, b: 55, a: 255 });
/** Green */
export const GREEN = Color.create({ r: 0, g: 228, b: 48, a: 255 });
/** Lime */
export const LIME = Color.create({ r: 0, g: 158, b: 47, a: 255 });
/** Dark Green */
export const DARKGREEN = Color.create({ r: 0, g: 117, b: 44, a: 255 });
/** Sky Blue */
export const SKYBLUE = Color.create({ r: 102, g: 191, b: 255, a: 255 });
/** Blue */
export const BLUE = Color.create({ r: 0, g: 121, b: 241, a: 255 });
/** Dark Blue */
export const DARKBLUE = Color.create({ r: 0, g: 82, b: 172, a: 255 });
/** Purple */
export const PURPLE = Color.create({ r: 200, g: 122, b: 255, a: 255 });
/** Violet */
export const VIOLET = Color.create({ r: 135, g: 60, b: 190, a: 255 });
/** Dark Purple */
export const DARKPURPLE = Color.create({ r: 112, g: 31, b: 126, a: 255 });
/** Beige */
export const BEIGE = Color.create({ r: 211, g: 176, b: 131, a: 255 });
/** Brown */
export const BROWN = Color.create({ r: 127, g: 106, b: 79, a: 255 });
/** Dark Brown */
export const DARKBROWN = Color.create({ r: 76, g: 63, b: 47, a: 255 });
/** White */
export const WHITE = Color.create({ r: 255, g: 255, b: 255, a: 255 });
/** Black */
export const BLACK = Color.create({ r: 0, g: 0, b: 0, a: 255 });
/** Blank (Transparent) */
export const BLANK = Color.create({ r: 0, g: 0, b: 0, a: 0 });
/** Magenta */
export const MAGENTA = Color.create({ r: 255, g: 0, b: 255, a: 255 });
/** My own White (raylib logo) */
export const RAYWHITE = Color.create({ r: 245, g: 245, b: 245, a: 255 });

/** Initialize window and OpenGL context */
export const InitWindow = raylibLibrary.bind("InitWindow", { args: ["i32", "i32", "utf8string"], returns: "void" });

/** Close window and unload OpenGL context */
export const CloseWindow = raylibLibrary.bind("CloseWindow", { args: [], returns: "void" });

/** Check if application should close (KEY_ESCAPE pressed or windows close icon clicked) */
export const WindowShouldClose = raylibLibrary.bind("WindowShouldClose", { args: [], returns: "bool" });

/** Check if window has been initialized successfully */
export const IsWindowReady = raylibLibrary.bind("IsWindowReady", { args: [], returns: "bool" });

/** Check if window is currently fullscreen */
export const IsWindowFullscreen = raylibLibrary.bind("IsWindowFullscreen", { args: [], returns: "bool" });

/** Check if window is currently hidden */
export const IsWindowHidden = raylibLibrary.bind("IsWindowHidden", { args: [], returns: "bool" });

/** Check if window is currently minimized */
export const IsWindowMinimized = raylibLibrary.bind("IsWindowMinimized", { args: [], returns: "bool" });

/** Check if window is currently maximized */
export const IsWindowMaximized = raylibLibrary.bind("IsWindowMaximized", { args: [], returns: "bool" });

/** Check if window is currently focused */
export const IsWindowFocused = raylibLibrary.bind("IsWindowFocused", { args: [], returns: "bool" });

/** Check if window has been resized last frame */
export const IsWindowResized = raylibLibrary.bind("IsWindowResized", { args: [], returns: "bool" });

/** Check if one specific window flag is enabled */
export const IsWindowState = raylibLibrary.bind("IsWindowState", { args: ["u32"], returns: "bool" });

/** Set window configuration state using flags */
export const SetWindowState = raylibLibrary.bind("SetWindowState", { args: ["u32"], returns: "void" });

/** Clear window configuration state flags */
export const ClearWindowState = raylibLibrary.bind("ClearWindowState", { args: ["u32"], returns: "void" });

/** Toggle window state: fullscreen/windowed, resizes monitor to match window resolution */
export const ToggleFullscreen = raylibLibrary.bind("ToggleFullscreen", { args: [], returns: "void" });

/** Toggle window state: borderless windowed, resizes window to match monitor resolution */
export const ToggleBorderlessWindowed = raylibLibrary.bind("ToggleBorderlessWindowed", { args: [], returns: "void" });

/** Set window state: maximized, if resizable */
export const MaximizeWindow = raylibLibrary.bind("MaximizeWindow", { args: [], returns: "void" });

/** Set window state: minimized, if resizable */
export const MinimizeWindow = raylibLibrary.bind("MinimizeWindow", { args: [], returns: "void" });

/** Restore window from being minimized/maximized */
export const RestoreWindow = raylibLibrary.bind("RestoreWindow", { args: [], returns: "void" });

/** Set icon for window (single image, RGBA 32bit) */
export const SetWindowIcon = raylibLibrary.bind("SetWindowIcon", { args: [Image], returns: "void" });

/** Set icon for window (multiple images, RGBA 32bit) */
export const SetWindowIcons = raylibLibrary.bind("SetWindowIcons", { args: ["pointer", "i32"], returns: "void" });

/** Set title for window */
export const SetWindowTitle = raylibLibrary.bind("SetWindowTitle", { args: ["utf8string"], returns: "void" });

/** Set window position on screen */
export const SetWindowPosition = raylibLibrary.bind("SetWindowPosition", { args: ["i32", "i32"], returns: "void" });

/** Set monitor for the current window */
export const SetWindowMonitor = raylibLibrary.bind("SetWindowMonitor", { args: ["i32"], returns: "void" });

/** Set window minimum dimensions (for FLAG_WINDOW_RESIZABLE) */
export const SetWindowMinSize = raylibLibrary.bind("SetWindowMinSize", { args: ["i32", "i32"], returns: "void" });

/** Set window maximum dimensions (for FLAG_WINDOW_RESIZABLE) */
export const SetWindowMaxSize = raylibLibrary.bind("SetWindowMaxSize", { args: ["i32", "i32"], returns: "void" });

/** Set window dimensions */
export const SetWindowSize = raylibLibrary.bind("SetWindowSize", { args: ["i32", "i32"], returns: "void" });

/** Set window opacity [0.0f..1.0f] */
export const SetWindowOpacity = raylibLibrary.bind("SetWindowOpacity", { args: ["f32"], returns: "void" });

/** Set window focused */
export const SetWindowFocused = raylibLibrary.bind("SetWindowFocused", { args: [], returns: "void" });

/** Get native window handle */
export const GetWindowHandle = raylibLibrary.bind("GetWindowHandle", { args: [], returns: "pointer" });

/** Get current screen width */
export const GetScreenWidth = raylibLibrary.bind("GetScreenWidth", { args: [], returns: "i32" });

/** Get current screen height */
export const GetScreenHeight = raylibLibrary.bind("GetScreenHeight", { args: [], returns: "i32" });

/** Get current render width (it considers HiDPI) */
export const GetRenderWidth = raylibLibrary.bind("GetRenderWidth", { args: [], returns: "i32" });

/** Get current render height (it considers HiDPI) */
export const GetRenderHeight = raylibLibrary.bind("GetRenderHeight", { args: [], returns: "i32" });

/** Get number of connected monitors */
export const GetMonitorCount = raylibLibrary.bind("GetMonitorCount", { args: [], returns: "i32" });

/** Get current monitor where window is placed */
export const GetCurrentMonitor = raylibLibrary.bind("GetCurrentMonitor", { args: [], returns: "i32" });

/** Get specified monitor position */
export const GetMonitorPosition = raylibLibrary.bind("GetMonitorPosition", { args: ["i32"], returns: Vector2 });

/** Get specified monitor width (current video mode used by monitor) */
export const GetMonitorWidth = raylibLibrary.bind("GetMonitorWidth", { args: ["i32"], returns: "i32" });

/** Get specified monitor height (current video mode used by monitor) */
export const GetMonitorHeight = raylibLibrary.bind("GetMonitorHeight", { args: ["i32"], returns: "i32" });

/** Get specified monitor physical width in millimetres */
export const GetMonitorPhysicalWidth = raylibLibrary.bind("GetMonitorPhysicalWidth", { args: ["i32"], returns: "i32" });

/** Get specified monitor physical height in millimetres */
export const GetMonitorPhysicalHeight = raylibLibrary.bind("GetMonitorPhysicalHeight", { args: ["i32"], returns: "i32" });

/** Get specified monitor refresh rate */
export const GetMonitorRefreshRate = raylibLibrary.bind("GetMonitorRefreshRate", { args: ["i32"], returns: "i32" });

/** Get window position XY on monitor */
export const GetWindowPosition = raylibLibrary.bind("GetWindowPosition", { args: [], returns: Vector2 });

/** Get window scale DPI factor */
export const GetWindowScaleDPI = raylibLibrary.bind("GetWindowScaleDPI", { args: [], returns: Vector2 });

/** Get the human-readable, UTF-8 encoded name of the specified monitor */
export const GetMonitorName = raylibLibrary.bind("GetMonitorName", { args: ["i32"], returns: "utf8string" });

/** Set clipboard text content */
export const SetClipboardText = raylibLibrary.bind("SetClipboardText", { args: ["utf8string"], returns: "void" });

/** Get clipboard text content */
export const GetClipboardText = raylibLibrary.bind("GetClipboardText", { args: [], returns: "utf8string" });

/** Get clipboard image content */
export const GetClipboardImage = raylibLibrary.bind("GetClipboardImage", { args: [], returns: Image });

/** Enable waiting for events on EndDrawing(), no automatic event polling */
export const EnableEventWaiting = raylibLibrary.bind("EnableEventWaiting", { args: [], returns: "void" });

/** Disable waiting for events on EndDrawing(), automatic events polling */
export const DisableEventWaiting = raylibLibrary.bind("DisableEventWaiting", { args: [], returns: "void" });

/** Shows cursor */
export const ShowCursor = raylibLibrary.bind("ShowCursor", { args: [], returns: "void" });

/** Hides cursor */
export const HideCursor = raylibLibrary.bind("HideCursor", { args: [], returns: "void" });

/** Check if cursor is not visible */
export const IsCursorHidden = raylibLibrary.bind("IsCursorHidden", { args: [], returns: "bool" });

/** Enables cursor (unlock cursor) */
export const EnableCursor = raylibLibrary.bind("EnableCursor", { args: [], returns: "void" });

/** Disables cursor (lock cursor) */
export const DisableCursor = raylibLibrary.bind("DisableCursor", { args: [], returns: "void" });

/** Check if cursor is on the screen */
export const IsCursorOnScreen = raylibLibrary.bind("IsCursorOnScreen", { args: [], returns: "bool" });

/** Set background color (framebuffer clear color) */
export const ClearBackground = raylibLibrary.bind("ClearBackground", { args: [Color], returns: "void" });

/** Setup canvas (framebuffer) to start drawing */
export const BeginDrawing = raylibLibrary.bind("BeginDrawing", { args: [], returns: "void" });

/** End canvas drawing and swap buffers (double buffering) */
export const EndDrawing = raylibLibrary.bind("EndDrawing", { args: [], returns: "void" });

/** Begin 2D mode with custom camera (2D) */
export const BeginMode2D = raylibLibrary.bind("BeginMode2D", { args: [Camera2D], returns: "void" });

/** Ends 2D mode with custom camera */
export const EndMode2D = raylibLibrary.bind("EndMode2D", { args: [], returns: "void" });

/** Begin 3D mode with custom camera (3D) */
export const BeginMode3D = raylibLibrary.bind("BeginMode3D", { args: [Camera3D], returns: "void" });

/** Ends 3D mode and returns to default 2D orthographic mode */
export const EndMode3D = raylibLibrary.bind("EndMode3D", { args: [], returns: "void" });

/** Begin drawing to render texture */
export const BeginTextureMode = raylibLibrary.bind("BeginTextureMode", { args: [RenderTexture], returns: "void" });

/** Ends drawing to render texture */
export const EndTextureMode = raylibLibrary.bind("EndTextureMode", { args: [], returns: "void" });

/** Begin custom shader drawing */
export const BeginShaderMode = raylibLibrary.bind("BeginShaderMode", { args: [Shader], returns: "void" });

/** End custom shader drawing (use default shader) */
export const EndShaderMode = raylibLibrary.bind("EndShaderMode", { args: [], returns: "void" });

/** Begin blending mode (alpha, additive, multiplied, subtract, custom) */
export const BeginBlendMode = raylibLibrary.bind("BeginBlendMode", { args: ["i32"], returns: "void" });

/** End blending mode (reset to default: alpha blending) */
export const EndBlendMode = raylibLibrary.bind("EndBlendMode", { args: [], returns: "void" });

/** Begin scissor mode (define screen area for following drawing) */
export const BeginScissorMode = raylibLibrary.bind("BeginScissorMode", { args: ["i32", "i32", "i32", "i32"], returns: "void" });

/** End scissor mode */
export const EndScissorMode = raylibLibrary.bind("EndScissorMode", { args: [], returns: "void" });

/** Begin stereo rendering (requires VR simulator) */
export const BeginVrStereoMode = raylibLibrary.bind("BeginVrStereoMode", { args: [VrStereoConfig], returns: "void" });

/** End stereo rendering (requires VR simulator) */
export const EndVrStereoMode = raylibLibrary.bind("EndVrStereoMode", { args: [], returns: "void" });

/** Load VR stereo config for VR simulator device parameters */
export const LoadVrStereoConfig = raylibLibrary.bind("LoadVrStereoConfig", { args: [VrDeviceInfo], returns: VrStereoConfig });

/** Unload VR stereo config */
export const UnloadVrStereoConfig = raylibLibrary.bind("UnloadVrStereoConfig", { args: [VrStereoConfig], returns: "void" });

/** Load shader from files and bind default locations */
export const LoadShader = raylibLibrary.bind("LoadShader", { args: ["utf8string", "utf8string"], returns: Shader });

/** Raw-pointer variant for nullable C string parameters. */
export const LoadShaderRaw = raylibLibrary.bind("LoadShader", { args: ["pointer", "pointer"], returns: Shader });

/** Load shader from code strings and bind default locations */
export const LoadShaderFromMemory = raylibLibrary.bind("LoadShaderFromMemory", { args: ["utf8string", "utf8string"], returns: Shader });

/** Raw-pointer variant for nullable C string parameters. */
export const LoadShaderFromMemoryRaw = raylibLibrary.bind("LoadShaderFromMemory", { args: ["pointer", "pointer"], returns: Shader });

/** Check if a shader is valid (loaded on GPU) */
export const IsShaderValid = raylibLibrary.bind("IsShaderValid", { args: [Shader], returns: "bool" });

/** Get shader uniform location */
export const GetShaderLocation = raylibLibrary.bind("GetShaderLocation", { args: [Shader, "utf8string"], returns: "i32" });

/** Get shader attribute location */
export const GetShaderLocationAttrib = raylibLibrary.bind("GetShaderLocationAttrib", { args: [Shader, "utf8string"], returns: "i32" });

/** Set shader uniform value */
export const SetShaderValue = raylibLibrary.bind("SetShaderValue", { args: [Shader, "i32", "pointer", "i32"], returns: "void" });

/** Set shader uniform value vector */
export const SetShaderValueV = raylibLibrary.bind("SetShaderValueV", { args: [Shader, "i32", "pointer", "i32", "i32"], returns: "void" });

/** Set shader uniform value (matrix 4x4) */
export const SetShaderValueMatrix = raylibLibrary.bind("SetShaderValueMatrix", { args: [Shader, "i32", Matrix], returns: "void" });

/** Set shader uniform value and bind the texture (sampler2d) */
export const SetShaderValueTexture = raylibLibrary.bind("SetShaderValueTexture", { args: [Shader, "i32", Texture], returns: "void" });

/** Unload shader from GPU memory (VRAM) */
export const UnloadShader = raylibLibrary.bind("UnloadShader", { args: [Shader], returns: "void" });

/** Get a ray trace from screen position (i.e mouse) */
export const GetScreenToWorldRay = raylibLibrary.bind("GetScreenToWorldRay", { args: [Vector2, Camera3D], returns: Ray });

/** Get a ray trace from screen position (i.e mouse) in a viewport */
export const GetScreenToWorldRayEx = raylibLibrary.bind("GetScreenToWorldRayEx", { args: [Vector2, Camera3D, "i32", "i32"], returns: Ray });

/** Get the screen space position for a 3d world space position */
export const GetWorldToScreen = raylibLibrary.bind("GetWorldToScreen", { args: [Vector3, Camera3D], returns: Vector2 });

/** Get size position for a 3d world space position */
export const GetWorldToScreenEx = raylibLibrary.bind("GetWorldToScreenEx", { args: [Vector3, Camera3D, "i32", "i32"], returns: Vector2 });

/** Get the screen space position for a 2d camera world space position */
export const GetWorldToScreen2D = raylibLibrary.bind("GetWorldToScreen2D", { args: [Vector2, Camera2D], returns: Vector2 });

/** Get the world space position for a 2d camera screen space position */
export const GetScreenToWorld2D = raylibLibrary.bind("GetScreenToWorld2D", { args: [Vector2, Camera2D], returns: Vector2 });

/** Get camera transform matrix (view matrix) */
export const GetCameraMatrix = raylibLibrary.bind("GetCameraMatrix", { args: [Camera3D], returns: Matrix });

/** Get camera 2d transform matrix */
export const GetCameraMatrix2D = raylibLibrary.bind("GetCameraMatrix2D", { args: [Camera2D], returns: Matrix });

/** Set target FPS (maximum) */
export const SetTargetFPS = raylibLibrary.bind("SetTargetFPS", { args: ["i32"], returns: "void" });

/** Get time in seconds for last frame drawn (delta time) */
export const GetFrameTime = raylibLibrary.bind("GetFrameTime", { args: [], returns: "f32" });

/** Get elapsed time in seconds since InitWindow() */
export const GetTime = raylibLibrary.bind("GetTime", { args: [], returns: "f64" });

/** Get current FPS */
export const GetFPS = raylibLibrary.bind("GetFPS", { args: [], returns: "i32" });

/** Swap back buffer with front buffer (screen drawing) */
export const SwapScreenBuffer = raylibLibrary.bind("SwapScreenBuffer", { args: [], returns: "void" });

/** Register all input events */
export const PollInputEvents = raylibLibrary.bind("PollInputEvents", { args: [], returns: "void" });

/** Wait for some time (halt program execution) */
export const WaitTime = raylibLibrary.bind("WaitTime", { args: ["f64"], returns: "void" });

/** Set the seed for the random number generator */
export const SetRandomSeed = raylibLibrary.bind("SetRandomSeed", { args: ["u32"], returns: "void" });

/** Get a random value between min and max (both included) */
export const GetRandomValue = raylibLibrary.bind("GetRandomValue", { args: ["i32", "i32"], returns: "i32" });

/** Load random values sequence, no values repeated */
export const LoadRandomSequence = raylibLibrary.bind("LoadRandomSequence", { args: ["u32", "i32", "i32"], returns: "pointer" });

/** Unload random values sequence */
export const UnloadRandomSequence = raylibLibrary.bind("UnloadRandomSequence", { args: ["pointer"], returns: "void" });

/** Takes a screenshot of current screen (filename extension defines format) */
export const TakeScreenshot = raylibLibrary.bind("TakeScreenshot", { args: ["utf8string"], returns: "void" });

/** Setup init configuration flags (view FLAGS) */
export const SetConfigFlags = raylibLibrary.bind("SetConfigFlags", { args: ["u32"], returns: "void" });

/** Open URL with default system browser (if available) */
export const OpenURL = raylibLibrary.bind("OpenURL", { args: ["utf8string"], returns: "void" });

/** Set the current threshold (minimum) log level */
export const SetTraceLogLevel = raylibLibrary.bind("SetTraceLogLevel", { args: ["i32"], returns: "void" });

/** Set custom trace log */
export const SetTraceLogCallback = raylibLibrary.bind("SetTraceLogCallback", { args: ["pointer"], returns: "void" });

/** Internal memory allocator */
export const MemAlloc = raylibLibrary.bind("MemAlloc", { args: ["u32"], returns: "pointer" });

/** Internal memory reallocator */
export const MemRealloc = raylibLibrary.bind("MemRealloc", { args: ["pointer", "u32"], returns: "pointer" });

/** Internal memory free */
export const MemFree = raylibLibrary.bind("MemFree", { args: ["pointer"], returns: "void" });

/** Load file data as byte array (read) */
export const LoadFileData = raylibLibrary.bind("LoadFileData", { args: ["utf8string", "pointer"], returns: "pointer" });

/** Unload file data allocated by LoadFileData() */
export const UnloadFileData = raylibLibrary.bind("UnloadFileData", { args: ["pointer"], returns: "void" });

/** Save data to file from byte array (write), returns true on success */
export const SaveFileData = raylibLibrary.bind("SaveFileData", { args: ["utf8string", "pointer", "i32"], returns: "bool" });

/** Export data to code (.h), returns true on success */
export const ExportDataAsCode = raylibLibrary.bind("ExportDataAsCode", { args: ["pointer", "i32", "utf8string"], returns: "bool" });

/** Load text data from file (read), returns a '\0' terminated string */
export const LoadFileText = raylibLibrary.bind("LoadFileText", { args: ["utf8string"], returns: "pointer" });

/** Unload file text data allocated by LoadFileText() */
export const UnloadFileText = raylibLibrary.bind("UnloadFileText", { args: ["pointer"], returns: "void" });

/** Save text data to file (write), string must be '\0' terminated, returns true on success */
export const SaveFileText = raylibLibrary.bind("SaveFileText", { args: ["utf8string", "utf8string"], returns: "bool" });

/** Set custom file binary data loader */
export const SetLoadFileDataCallback = raylibLibrary.bind("SetLoadFileDataCallback", { args: ["pointer"], returns: "void" });

/** Set custom file binary data saver */
export const SetSaveFileDataCallback = raylibLibrary.bind("SetSaveFileDataCallback", { args: ["pointer"], returns: "void" });

/** Set custom file text data loader */
export const SetLoadFileTextCallback = raylibLibrary.bind("SetLoadFileTextCallback", { args: ["pointer"], returns: "void" });

/** Set custom file text data saver */
export const SetSaveFileTextCallback = raylibLibrary.bind("SetSaveFileTextCallback", { args: ["pointer"], returns: "void" });

/** Rename file (if exists) */
export const FileRename = raylibLibrary.bind("FileRename", { args: ["utf8string", "utf8string"], returns: "i32" });

/** Remove file (if exists) */
export const FileRemove = raylibLibrary.bind("FileRemove", { args: ["utf8string"], returns: "i32" });

/** Copy file from one path to another, dstPath created if it doesn't exist */
export const FileCopy = raylibLibrary.bind("FileCopy", { args: ["utf8string", "utf8string"], returns: "i32" });

/** Move file from one directory to another, dstPath created if it doesn't exist */
export const FileMove = raylibLibrary.bind("FileMove", { args: ["utf8string", "utf8string"], returns: "i32" });

/** Replace text in an existing file */
export const FileTextReplace = raylibLibrary.bind("FileTextReplace", { args: ["utf8string", "utf8string", "utf8string"], returns: "i32" });

/** Find text in existing file */
export const FileTextFindIndex = raylibLibrary.bind("FileTextFindIndex", { args: ["utf8string", "utf8string"], returns: "i32" });

/** Check if file exists */
export const FileExists = raylibLibrary.bind("FileExists", { args: ["utf8string"], returns: "bool" });

/** Check if a directory path exists */
export const DirectoryExists = raylibLibrary.bind("DirectoryExists", { args: ["utf8string"], returns: "bool" });

/** Check file extension (recommended include point: .png, .wav) */
export const IsFileExtension = raylibLibrary.bind("IsFileExtension", { args: ["utf8string", "utf8string"], returns: "bool" });

/** Get file length in bytes (NOTE: GetFileSize() conflicts with windows.h) */
export const GetFileLength = raylibLibrary.bind("GetFileLength", { args: ["utf8string"], returns: "i32" });

/** Get file modification time (last write time) */
export const GetFileModTime = raylibLibrary.bind("GetFileModTime", { args: ["utf8string"], returns: "i64" });

/** Get pointer to extension for a filename string (includes dot: '.png') */
export const GetFileExtension = raylibLibrary.bind("GetFileExtension", { args: ["utf8string"], returns: "utf8string" });

/** Get pointer to filename for a path string */
export const GetFileName = raylibLibrary.bind("GetFileName", { args: ["utf8string"], returns: "utf8string" });

/** Get filename string without extension (uses static string) */
export const GetFileNameWithoutExt = raylibLibrary.bind("GetFileNameWithoutExt", { args: ["utf8string"], returns: "utf8string" });

/** Get full path for a given fileName with path (uses static string) */
export const GetDirectoryPath = raylibLibrary.bind("GetDirectoryPath", { args: ["utf8string"], returns: "utf8string" });

/** Get previous directory path for a given path (uses static string) */
export const GetPrevDirectoryPath = raylibLibrary.bind("GetPrevDirectoryPath", { args: ["utf8string"], returns: "utf8string" });

/** Get current working directory (uses static string) */
export const GetWorkingDirectory = raylibLibrary.bind("GetWorkingDirectory", { args: [], returns: "utf8string" });

/** Get the directory of the running application (uses static string) */
export const GetApplicationDirectory = raylibLibrary.bind("GetApplicationDirectory", { args: [], returns: "utf8string" });

/** Create directories (including full path requested), returns 0 on success */
export const MakeDirectory = raylibLibrary.bind("MakeDirectory", { args: ["utf8string"], returns: "i32" });

/** Change working directory, return true on success */
export const ChangeDirectory = raylibLibrary.bind("ChangeDirectory", { args: ["utf8string"], returns: "bool" });

/** Check if a given path is a file or a directory */
export const IsPathFile = raylibLibrary.bind("IsPathFile", { args: ["utf8string"], returns: "bool" });

/** Check if fileName is valid for the platform/OS */
export const IsFileNameValid = raylibLibrary.bind("IsFileNameValid", { args: ["utf8string"], returns: "bool" });

/** Load directory filepaths, files and directories, no subdirs scan */
export const LoadDirectoryFiles = raylibLibrary.bind("LoadDirectoryFiles", { args: ["utf8string"], returns: FilePathList });

/** Load directory filepaths with extension filtering and subdir scan; some filters available: "*.*", "FILES*", "DIRS*" */
export const LoadDirectoryFilesEx = raylibLibrary.bind("LoadDirectoryFilesEx", { args: ["utf8string", "utf8string", "bool"], returns: FilePathList });

/** Unload filepaths */
export const UnloadDirectoryFiles = raylibLibrary.bind("UnloadDirectoryFiles", { args: [FilePathList], returns: "void" });

/** Check if a file has been dropped into window */
export const IsFileDropped = raylibLibrary.bind("IsFileDropped", { args: [], returns: "bool" });

/** Load dropped filepaths */
export const LoadDroppedFiles = raylibLibrary.bind("LoadDroppedFiles", { args: [], returns: FilePathList });

/** Unload dropped filepaths */
export const UnloadDroppedFiles = raylibLibrary.bind("UnloadDroppedFiles", { args: [FilePathList], returns: "void" });

/** Get the file count in a directory */
export const GetDirectoryFileCount = raylibLibrary.bind("GetDirectoryFileCount", { args: ["utf8string"], returns: "u32" });

/** Get the file count in a directory with extension filtering and recursive directory scan. Use 'DIR' in the filter string to include directories in the result */
export const GetDirectoryFileCountEx = raylibLibrary.bind("GetDirectoryFileCountEx", { args: ["utf8string", "utf8string", "bool"], returns: "u32" });

/** Compress data (DEFLATE algorithm), memory must be MemFree() */
export const CompressData = raylibLibrary.bind("CompressData", { args: ["pointer", "i32", "pointer"], returns: "pointer" });

/** Decompress data (DEFLATE algorithm), memory must be MemFree() */
export const DecompressData = raylibLibrary.bind("DecompressData", { args: ["pointer", "i32", "pointer"], returns: "pointer" });

/** Encode data to Base64 string (includes NULL terminator), memory must be MemFree() */
export const EncodeDataBase64 = raylibLibrary.bind("EncodeDataBase64", { args: ["pointer", "i32", "pointer"], returns: "pointer" });

/** Decode Base64 string (expected NULL terminated), memory must be MemFree() */
export const DecodeDataBase64 = raylibLibrary.bind("DecodeDataBase64", { args: ["utf8string", "pointer"], returns: "pointer" });

/** Compute CRC32 hash code */
export const ComputeCRC32 = raylibLibrary.bind("ComputeCRC32", { args: ["pointer", "i32"], returns: "u32" });

/** Compute MD5 hash code, returns static int[4] (16 bytes) */
export const ComputeMD5 = raylibLibrary.bind("ComputeMD5", { args: ["pointer", "i32"], returns: "pointer" });

/** Compute SHA1 hash code, returns static int[5] (20 bytes) */
export const ComputeSHA1 = raylibLibrary.bind("ComputeSHA1", { args: ["pointer", "i32"], returns: "pointer" });

/** Compute SHA256 hash code, returns static int[8] (32 bytes) */
export const ComputeSHA256 = raylibLibrary.bind("ComputeSHA256", { args: ["pointer", "i32"], returns: "pointer" });

/** Load automation events list from file, NULL for empty list, capacity = MAX_AUTOMATION_EVENTS */
export const LoadAutomationEventList = raylibLibrary.bind("LoadAutomationEventList", { args: ["utf8string"], returns: AutomationEventList });

/** Raw-pointer variant for nullable C string parameters. */
export const LoadAutomationEventListRaw = raylibLibrary.bind("LoadAutomationEventList", { args: ["pointer"], returns: AutomationEventList });

/** Unload automation events list from file */
export const UnloadAutomationEventList = raylibLibrary.bind("UnloadAutomationEventList", { args: [AutomationEventList], returns: "void" });

/** Export automation events list as text file */
export const ExportAutomationEventList = raylibLibrary.bind("ExportAutomationEventList", { args: [AutomationEventList, "utf8string"], returns: "bool" });

/** Set automation event list to record to */
export const SetAutomationEventList = raylibLibrary.bind("SetAutomationEventList", { args: ["pointer"], returns: "void" });

/** Set automation event internal base frame to start recording */
export const SetAutomationEventBaseFrame = raylibLibrary.bind("SetAutomationEventBaseFrame", { args: ["i32"], returns: "void" });

/** Start recording automation events (AutomationEventList must be set) */
export const StartAutomationEventRecording = raylibLibrary.bind("StartAutomationEventRecording", { args: [], returns: "void" });

/** Stop recording automation events */
export const StopAutomationEventRecording = raylibLibrary.bind("StopAutomationEventRecording", { args: [], returns: "void" });

/** Play a recorded automation event */
export const PlayAutomationEvent = raylibLibrary.bind("PlayAutomationEvent", { args: [AutomationEvent], returns: "void" });

/** Check if a key has been pressed once */
export const IsKeyPressed = raylibLibrary.bind("IsKeyPressed", { args: ["i32"], returns: "bool" });

/** Check if a key has been pressed again */
export const IsKeyPressedRepeat = raylibLibrary.bind("IsKeyPressedRepeat", { args: ["i32"], returns: "bool" });

/** Check if a key is being pressed */
export const IsKeyDown = raylibLibrary.bind("IsKeyDown", { args: ["i32"], returns: "bool" });

/** Check if a key has been released once */
export const IsKeyReleased = raylibLibrary.bind("IsKeyReleased", { args: ["i32"], returns: "bool" });

/** Check if a key is NOT being pressed */
export const IsKeyUp = raylibLibrary.bind("IsKeyUp", { args: ["i32"], returns: "bool" });

/** Get key pressed (keycode), call it multiple times for keys queued, returns 0 when the queue is empty */
export const GetKeyPressed = raylibLibrary.bind("GetKeyPressed", { args: [], returns: "i32" });

/** Get char pressed (unicode), call it multiple times for chars queued, returns 0 when the queue is empty */
export const GetCharPressed = raylibLibrary.bind("GetCharPressed", { args: [], returns: "i32" });

/** Get name of a QWERTY key on the current keyboard layout (eg returns string 'q' for KEY_A on an AZERTY keyboard) */
export const GetKeyName = raylibLibrary.bind("GetKeyName", { args: ["i32"], returns: "utf8string" });

/** Set a custom key to exit program (default is ESC) */
export const SetExitKey = raylibLibrary.bind("SetExitKey", { args: ["i32"], returns: "void" });

/** Check if a gamepad is available */
export const IsGamepadAvailable = raylibLibrary.bind("IsGamepadAvailable", { args: ["i32"], returns: "bool" });

/** Get gamepad internal name id */
export const GetGamepadName = raylibLibrary.bind("GetGamepadName", { args: ["i32"], returns: "utf8string" });

/** Check if a gamepad button has been pressed once */
export const IsGamepadButtonPressed = raylibLibrary.bind("IsGamepadButtonPressed", { args: ["i32", "i32"], returns: "bool" });

/** Check if a gamepad button is being pressed */
export const IsGamepadButtonDown = raylibLibrary.bind("IsGamepadButtonDown", { args: ["i32", "i32"], returns: "bool" });

/** Check if a gamepad button has been released once */
export const IsGamepadButtonReleased = raylibLibrary.bind("IsGamepadButtonReleased", { args: ["i32", "i32"], returns: "bool" });

/** Check if a gamepad button is NOT being pressed */
export const IsGamepadButtonUp = raylibLibrary.bind("IsGamepadButtonUp", { args: ["i32", "i32"], returns: "bool" });

/** Get the last gamepad button pressed */
export const GetGamepadButtonPressed = raylibLibrary.bind("GetGamepadButtonPressed", { args: [], returns: "i32" });

/** Get axis count for a gamepad */
export const GetGamepadAxisCount = raylibLibrary.bind("GetGamepadAxisCount", { args: ["i32"], returns: "i32" });

/** Get movement value for a gamepad axis */
export const GetGamepadAxisMovement = raylibLibrary.bind("GetGamepadAxisMovement", { args: ["i32", "i32"], returns: "f32" });

/** Set internal gamepad mappings (SDL_GameControllerDB) */
export const SetGamepadMappings = raylibLibrary.bind("SetGamepadMappings", { args: ["utf8string"], returns: "i32" });

/** Check if a mouse button has been pressed once */
export const IsMouseButtonPressed = raylibLibrary.bind("IsMouseButtonPressed", { args: ["i32"], returns: "bool" });

/** Check if a mouse button is being pressed */
export const IsMouseButtonDown = raylibLibrary.bind("IsMouseButtonDown", { args: ["i32"], returns: "bool" });

/** Check if a mouse button has been released once */
export const IsMouseButtonReleased = raylibLibrary.bind("IsMouseButtonReleased", { args: ["i32"], returns: "bool" });

/** Check if a mouse button is NOT being pressed */
export const IsMouseButtonUp = raylibLibrary.bind("IsMouseButtonUp", { args: ["i32"], returns: "bool" });

/** Get mouse position X */
export const GetMouseX = raylibLibrary.bind("GetMouseX", { args: [], returns: "i32" });

/** Get mouse position Y */
export const GetMouseY = raylibLibrary.bind("GetMouseY", { args: [], returns: "i32" });

/** Get mouse position XY */
export const GetMousePosition = raylibLibrary.bind("GetMousePosition", { args: [], returns: Vector2 });

/** Get mouse delta between frames */
export const GetMouseDelta = raylibLibrary.bind("GetMouseDelta", { args: [], returns: Vector2 });

/** Set mouse position XY */
export const SetMousePosition = raylibLibrary.bind("SetMousePosition", { args: ["i32", "i32"], returns: "void" });

/** Set mouse offset */
export const SetMouseOffset = raylibLibrary.bind("SetMouseOffset", { args: ["i32", "i32"], returns: "void" });

/** Set mouse scaling */
export const SetMouseScale = raylibLibrary.bind("SetMouseScale", { args: ["f32", "f32"], returns: "void" });

/** Get mouse wheel movement for X or Y, whichever is larger */
export const GetMouseWheelMove = raylibLibrary.bind("GetMouseWheelMove", { args: [], returns: "f32" });

/** Get mouse wheel movement for both X and Y */
export const GetMouseWheelMoveV = raylibLibrary.bind("GetMouseWheelMoveV", { args: [], returns: Vector2 });

/** Set mouse cursor */
export const SetMouseCursor = raylibLibrary.bind("SetMouseCursor", { args: ["i32"], returns: "void" });

/** Get touch position X for touch point 0 (relative to screen size) */
export const GetTouchX = raylibLibrary.bind("GetTouchX", { args: [], returns: "i32" });

/** Get touch position Y for touch point 0 (relative to screen size) */
export const GetTouchY = raylibLibrary.bind("GetTouchY", { args: [], returns: "i32" });

/** Get touch position XY for a touch point index (relative to screen size) */
export const GetTouchPosition = raylibLibrary.bind("GetTouchPosition", { args: ["i32"], returns: Vector2 });

/** Get touch point identifier for given index */
export const GetTouchPointId = raylibLibrary.bind("GetTouchPointId", { args: ["i32"], returns: "i32" });

/** Get number of touch points */
export const GetTouchPointCount = raylibLibrary.bind("GetTouchPointCount", { args: [], returns: "i32" });

/** Enable a set of gestures using flags */
export const SetGesturesEnabled = raylibLibrary.bind("SetGesturesEnabled", { args: ["u32"], returns: "void" });

/** Check if a gesture have been detected */
export const IsGestureDetected = raylibLibrary.bind("IsGestureDetected", { args: ["u32"], returns: "bool" });

/** Get latest detected gesture */
export const GetGestureDetected = raylibLibrary.bind("GetGestureDetected", { args: [], returns: "i32" });

/** Get gesture hold time in seconds */
export const GetGestureHoldDuration = raylibLibrary.bind("GetGestureHoldDuration", { args: [], returns: "f32" });

/** Get gesture drag vector */
export const GetGestureDragVector = raylibLibrary.bind("GetGestureDragVector", { args: [], returns: Vector2 });

/** Get gesture drag angle */
export const GetGestureDragAngle = raylibLibrary.bind("GetGestureDragAngle", { args: [], returns: "f32" });

/** Get gesture pinch delta */
export const GetGesturePinchVector = raylibLibrary.bind("GetGesturePinchVector", { args: [], returns: Vector2 });

/** Get gesture pinch angle */
export const GetGesturePinchAngle = raylibLibrary.bind("GetGesturePinchAngle", { args: [], returns: "f32" });

/** Update camera position for selected mode */
export const UpdateCamera = raylibLibrary.bind("UpdateCamera", { args: ["pointer", "i32"], returns: "void" });

/** Set texture and rectangle to be used on shapes drawing */
export const SetShapesTexture = raylibLibrary.bind("SetShapesTexture", { args: [Texture, Rectangle], returns: "void" });

/** Get texture that is used for shapes drawing */
export const GetShapesTexture = raylibLibrary.bind("GetShapesTexture", { args: [], returns: Texture });

/** Get texture source rectangle that is used for shapes drawing */
export const GetShapesTextureRectangle = raylibLibrary.bind("GetShapesTextureRectangle", { args: [], returns: Rectangle });

/** Draw a pixel using geometry [Can be slow, use with care] */
export const DrawPixel = raylibLibrary.bind("DrawPixel", { args: ["i32", "i32", Color], returns: "void" });

/** Draw a pixel using geometry (Vector version) [Can be slow, use with care] */
export const DrawPixelV = raylibLibrary.bind("DrawPixelV", { args: [Vector2, Color], returns: "void" });

/** Draw a line */
export const DrawLine = raylibLibrary.bind("DrawLine", { args: ["i32", "i32", "i32", "i32", Color], returns: "void" });

/** Draw a line (using gl lines) */
export const DrawLineV = raylibLibrary.bind("DrawLineV", { args: [Vector2, Vector2, Color], returns: "void" });

/** Draw lines sequence (using gl lines) */
export const DrawLineStrip = raylibLibrary.bind("DrawLineStrip", { args: ["pointer", "i32", Color], returns: "void" });

/** Draw a dashed line */
export const DrawLineDashed = raylibLibrary.bind("DrawLineDashed", { args: [Vector2, Vector2, "i32", "i32", Color], returns: "void" });

/** Draw a color-filled rectangle */
export const DrawRectangle = raylibLibrary.bind("DrawRectangle", { args: ["i32", "i32", "i32", "i32", Color], returns: "void" });

/** Draw a color-filled rectangle (Vector version) */
export const DrawRectangleV = raylibLibrary.bind("DrawRectangleV", { args: [Vector2, Vector2, Color], returns: "void" });

/** Draw a color-filled rectangle */
export const DrawRectangleRec = raylibLibrary.bind("DrawRectangleRec", { args: [Rectangle, Color], returns: "void" });

/** Draw a vertical-gradient-filled rectangle */
export const DrawRectangleGradientV = raylibLibrary.bind("DrawRectangleGradientV", { args: ["i32", "i32", "i32", "i32", Color, Color], returns: "void" });

/** Draw a horizontal-gradient-filled rectangle */
export const DrawRectangleGradientH = raylibLibrary.bind("DrawRectangleGradientH", { args: ["i32", "i32", "i32", "i32", Color, Color], returns: "void" });

/** Draw a gradient-filled rectangle with custom vertex colors */
export const DrawRectangleGradientEx = raylibLibrary.bind("DrawRectangleGradientEx", { args: [Rectangle, Color, Color, Color, Color], returns: "void" });

/** Draw rectangle outline */
export const DrawRectangleLines = raylibLibrary.bind("DrawRectangleLines", { args: ["i32", "i32", "i32", "i32", Color], returns: "void" });

/** Draw a color-filled triangle (vertex in counter-clockwise order!) */
export const DrawTriangle = raylibLibrary.bind("DrawTriangle", { args: [Vector2, Vector2, Vector2, Color], returns: "void" });

/** Draw triangle outline (vertex in counter-clockwise order!) */
export const DrawTriangleLines = raylibLibrary.bind("DrawTriangleLines", { args: [Vector2, Vector2, Vector2, Color], returns: "void" });

/** Draw a triangle fan defined by points (first vertex is the center) */
export const DrawTriangleFan = raylibLibrary.bind("DrawTriangleFan", { args: ["pointer", "i32", Color], returns: "void" });

/** Draw a triangle strip defined by points */
export const DrawTriangleStrip = raylibLibrary.bind("DrawTriangleStrip", { args: ["pointer", "i32", Color], returns: "void" });

/** Check collision between two rectangles */
export const CheckCollisionRecs = raylibLibrary.bind("CheckCollisionRecs", { args: [Rectangle, Rectangle], returns: "bool" });

/** Check if point is inside rectangle */
export const CheckCollisionPointRec = raylibLibrary.bind("CheckCollisionPointRec", { args: [Vector2, Rectangle], returns: "bool" });

/** Check if point is inside a triangle */
export const CheckCollisionPointTriangle = raylibLibrary.bind("CheckCollisionPointTriangle", { args: [Vector2, Vector2, Vector2, Vector2], returns: "bool" });

/** Check if point belongs to line created between two points [p1] and [p2] with defined margin in pixels [threshold] */
export const CheckCollisionPointLine = raylibLibrary.bind("CheckCollisionPointLine", { args: [Vector2, Vector2, Vector2, "i32"], returns: "bool" });

/** Check if point is within a polygon described by array of vertices */
export const CheckCollisionPointPoly = raylibLibrary.bind("CheckCollisionPointPoly", { args: [Vector2, "pointer", "i32"], returns: "bool" });

/** Check the collision between two lines defined by two points each, returns collision point by reference */
export const CheckCollisionLines = raylibLibrary.bind("CheckCollisionLines", { args: [Vector2, Vector2, Vector2, Vector2, "pointer"], returns: "bool" });

/** Get collision rectangle for two rectangles collision */
export const GetCollisionRec = raylibLibrary.bind("GetCollisionRec", { args: [Rectangle, Rectangle], returns: Rectangle });

/** Load image from file into CPU memory (RAM) */
export const LoadImage = raylibLibrary.bind("LoadImage", { args: ["utf8string"], returns: Image });

/** Load image from RAW file data */
export const LoadImageRaw = raylibLibrary.bind("LoadImageRaw", { args: ["utf8string", "i32", "i32", "i32", "i32"], returns: Image });

/** Load image sequence from file (frames appended to image.data) */
export const LoadImageAnim = raylibLibrary.bind("LoadImageAnim", { args: ["utf8string", "pointer"], returns: Image });

/** Load image sequence from memory buffer */
export const LoadImageAnimFromMemory = raylibLibrary.bind("LoadImageAnimFromMemory", { args: ["utf8string", "pointer", "i32", "pointer"], returns: Image });

/** Load image from memory buffer, fileType refers to extension: i.e. '.png' */
export const LoadImageFromMemory = raylibLibrary.bind("LoadImageFromMemory", { args: ["utf8string", "pointer", "i32"], returns: Image });

/** Load image from GPU texture data */
export const LoadImageFromTexture = raylibLibrary.bind("LoadImageFromTexture", { args: [Texture], returns: Image });

/** Load image from screen buffer and (screenshot) */
export const LoadImageFromScreen = raylibLibrary.bind("LoadImageFromScreen", { args: [], returns: Image });

/** Check if an image is valid (data and parameters) */
export const IsImageValid = raylibLibrary.bind("IsImageValid", { args: [Image], returns: "bool" });

/** Unload image from CPU memory (RAM) */
export const UnloadImage = raylibLibrary.bind("UnloadImage", { args: [Image], returns: "void" });

/** Export image data to file, returns true on success */
export const ExportImage = raylibLibrary.bind("ExportImage", { args: [Image, "utf8string"], returns: "bool" });

/** Export image to memory buffer, memory must be MemFree() */
export const ExportImageToMemory = raylibLibrary.bind("ExportImageToMemory", { args: [Image, "utf8string", "pointer"], returns: "pointer" });

/** Export image as code file defining an array of bytes, returns true on success */
export const ExportImageAsCode = raylibLibrary.bind("ExportImageAsCode", { args: [Image, "utf8string"], returns: "bool" });

/** Generate image: plain color */
export const GenImageColor = raylibLibrary.bind("GenImageColor", { args: ["i32", "i32", Color], returns: Image });

/** Generate image: linear gradient, direction in degrees [0..360], 0=Vertical gradient */
export const GenImageGradientLinear = raylibLibrary.bind("GenImageGradientLinear", { args: ["i32", "i32", "i32", Color, Color], returns: Image });

/** Generate image: checked */
export const GenImageChecked = raylibLibrary.bind("GenImageChecked", { args: ["i32", "i32", "i32", "i32", Color, Color], returns: Image });

/** Generate image: cellular algorithm, bigger tileSize means bigger cells */
export const GenImageCellular = raylibLibrary.bind("GenImageCellular", { args: ["i32", "i32", "i32"], returns: Image });

/** Generate image: grayscale image from text data */
export const GenImageText = raylibLibrary.bind("GenImageText", { args: ["i32", "i32", "utf8string"], returns: Image });

/** Create an image duplicate (useful for transformations) */
export const ImageCopy = raylibLibrary.bind("ImageCopy", { args: [Image], returns: Image });

/** Create an image from another image piece */
export const ImageFromImage = raylibLibrary.bind("ImageFromImage", { args: [Image, Rectangle], returns: Image });

/** Create an image from a selected channel of another image (GRAYSCALE) */
export const ImageFromChannel = raylibLibrary.bind("ImageFromChannel", { args: [Image, "i32"], returns: Image });

/** Create an image from text (default font) */
export const ImageText = raylibLibrary.bind("ImageText", { args: ["utf8string", "i32", Color], returns: Image });

/** Convert image data to desired format */
export const ImageFormat = raylibLibrary.bind("ImageFormat", { args: ["pointer", "i32"], returns: "void" });

/** Convert image to POT (power-of-two) */
export const ImageToPOT = raylibLibrary.bind("ImageToPOT", { args: ["pointer", Color], returns: "void" });

/** Crop an image to a defined rectangle */
export const ImageCrop = raylibLibrary.bind("ImageCrop", { args: ["pointer", Rectangle], returns: "void" });

/** Apply alpha mask to image */
export const ImageAlphaMask = raylibLibrary.bind("ImageAlphaMask", { args: ["pointer", Image], returns: "void" });

/** Premultiply alpha channel */
export const ImageAlphaPremultiply = raylibLibrary.bind("ImageAlphaPremultiply", { args: ["pointer"], returns: "void" });

/** Apply Gaussian blur using a box blur approximation */
export const ImageBlurGaussian = raylibLibrary.bind("ImageBlurGaussian", { args: ["pointer", "i32"], returns: "void" });

/** Apply custom square convolution kernel to image */
export const ImageKernelConvolution = raylibLibrary.bind("ImageKernelConvolution", { args: ["pointer", "pointer", "i32"], returns: "void" });

/** Resize image (Bicubic scaling algorithm) */
export const ImageResize = raylibLibrary.bind("ImageResize", { args: ["pointer", "i32", "i32"], returns: "void" });

/** Resize image (Nearest-Neighbor scaling algorithm) */
export const ImageResizeNN = raylibLibrary.bind("ImageResizeNN", { args: ["pointer", "i32", "i32"], returns: "void" });

/** Resize canvas and fill with color */
export const ImageResizeCanvas = raylibLibrary.bind("ImageResizeCanvas", { args: ["pointer", "i32", "i32", "i32", "i32", Color], returns: "void" });

/** Compute all mipmap levels for a provided image */
export const ImageMipmaps = raylibLibrary.bind("ImageMipmaps", { args: ["pointer"], returns: "void" });

/** Dither image data to 16bpp or lower (Floyd-Steinberg dithering) */
export const ImageDither = raylibLibrary.bind("ImageDither", { args: ["pointer", "i32", "i32", "i32", "i32"], returns: "void" });

/** Flip image vertically */
export const ImageFlipVertical = raylibLibrary.bind("ImageFlipVertical", { args: ["pointer"], returns: "void" });

/** Flip image horizontally */
export const ImageFlipHorizontal = raylibLibrary.bind("ImageFlipHorizontal", { args: ["pointer"], returns: "void" });

/** Rotate image by input angle in degrees (-359 to 359) */
export const ImageRotate = raylibLibrary.bind("ImageRotate", { args: ["pointer", "i32"], returns: "void" });

/** Rotate image clockwise 90deg */
export const ImageRotateCW = raylibLibrary.bind("ImageRotateCW", { args: ["pointer"], returns: "void" });

/** Rotate image counter-clockwise 90deg */
export const ImageRotateCCW = raylibLibrary.bind("ImageRotateCCW", { args: ["pointer"], returns: "void" });

/** Modify image color: tint */
export const ImageColorTint = raylibLibrary.bind("ImageColorTint", { args: ["pointer", Color], returns: "void" });

/** Modify image color: invert */
export const ImageColorInvert = raylibLibrary.bind("ImageColorInvert", { args: ["pointer"], returns: "void" });

/** Modify image color: grayscale */
export const ImageColorGrayscale = raylibLibrary.bind("ImageColorGrayscale", { args: ["pointer"], returns: "void" });

/** Modify image color: brightness (-255 to 255) */
export const ImageColorBrightness = raylibLibrary.bind("ImageColorBrightness", { args: ["pointer", "i32"], returns: "void" });

/** Modify image color: replace color */
export const ImageColorReplace = raylibLibrary.bind("ImageColorReplace", { args: ["pointer", Color, Color], returns: "void" });

/** Load color data from image as a Color array (RGBA - 32bit) */
export const LoadImageColors = raylibLibrary.bind("LoadImageColors", { args: [Image], returns: "pointer" });

/** Load colors palette from image as a Color array (RGBA - 32bit) */
export const LoadImagePalette = raylibLibrary.bind("LoadImagePalette", { args: [Image, "i32", "pointer"], returns: "pointer" });

/** Unload color data loaded with LoadImageColors() */
export const UnloadImageColors = raylibLibrary.bind("UnloadImageColors", { args: ["pointer"], returns: "void" });

/** Unload colors palette loaded with LoadImagePalette() */
export const UnloadImagePalette = raylibLibrary.bind("UnloadImagePalette", { args: ["pointer"], returns: "void" });

/** Get image pixel color at (x, y) position */
export const GetImageColor = raylibLibrary.bind("GetImageColor", { args: [Image, "i32", "i32"], returns: Color });

/** Clear image background with given color */
export const ImageClearBackground = raylibLibrary.bind("ImageClearBackground", { args: ["pointer", Color], returns: "void" });

/** Draw pixel within an image */
export const ImageDrawPixel = raylibLibrary.bind("ImageDrawPixel", { args: ["pointer", "i32", "i32", Color], returns: "void" });

/** Draw pixel within an image (Vector version) */
export const ImageDrawPixelV = raylibLibrary.bind("ImageDrawPixelV", { args: ["pointer", Vector2, Color], returns: "void" });

/** Draw line within an image */
export const ImageDrawLine = raylibLibrary.bind("ImageDrawLine", { args: ["pointer", "i32", "i32", "i32", "i32", Color], returns: "void" });

/** Draw line within an image (Vector version) */
export const ImageDrawLineV = raylibLibrary.bind("ImageDrawLineV", { args: ["pointer", Vector2, Vector2, Color], returns: "void" });

/** Draw a line defining thickness within an image */
export const ImageDrawLineEx = raylibLibrary.bind("ImageDrawLineEx", { args: ["pointer", Vector2, Vector2, "i32", Color], returns: "void" });

/** Draw a filled circle within an image */
export const ImageDrawCircle = raylibLibrary.bind("ImageDrawCircle", { args: ["pointer", "i32", "i32", "i32", Color], returns: "void" });

/** Draw a filled circle within an image (Vector version) */
export const ImageDrawCircleV = raylibLibrary.bind("ImageDrawCircleV", { args: ["pointer", Vector2, "i32", Color], returns: "void" });

/** Draw circle outline within an image */
export const ImageDrawCircleLines = raylibLibrary.bind("ImageDrawCircleLines", { args: ["pointer", "i32", "i32", "i32", Color], returns: "void" });

/** Draw circle outline within an image (Vector version) */
export const ImageDrawCircleLinesV = raylibLibrary.bind("ImageDrawCircleLinesV", { args: ["pointer", Vector2, "i32", Color], returns: "void" });

/** Draw rectangle within an image */
export const ImageDrawRectangle = raylibLibrary.bind("ImageDrawRectangle", { args: ["pointer", "i32", "i32", "i32", "i32", Color], returns: "void" });

/** Draw rectangle within an image (Vector version) */
export const ImageDrawRectangleV = raylibLibrary.bind("ImageDrawRectangleV", { args: ["pointer", Vector2, Vector2, Color], returns: "void" });

/** Draw rectangle within an image */
export const ImageDrawRectangleRec = raylibLibrary.bind("ImageDrawRectangleRec", { args: ["pointer", Rectangle, Color], returns: "void" });

/** Draw rectangle lines within an image */
export const ImageDrawRectangleLines = raylibLibrary.bind("ImageDrawRectangleLines", { args: ["pointer", Rectangle, "i32", Color], returns: "void" });

/** Draw triangle within an image */
export const ImageDrawTriangle = raylibLibrary.bind("ImageDrawTriangle", { args: ["pointer", Vector2, Vector2, Vector2, Color], returns: "void" });

/** Draw triangle with interpolated colors within an image */
export const ImageDrawTriangleEx = raylibLibrary.bind("ImageDrawTriangleEx", { args: ["pointer", Vector2, Vector2, Vector2, Color, Color, Color], returns: "void" });

/** Draw triangle outline within an image */
export const ImageDrawTriangleLines = raylibLibrary.bind("ImageDrawTriangleLines", { args: ["pointer", Vector2, Vector2, Vector2, Color], returns: "void" });

/** Draw a triangle fan defined by points within an image (first vertex is the center) */
export const ImageDrawTriangleFan = raylibLibrary.bind("ImageDrawTriangleFan", { args: ["pointer", "pointer", "i32", Color], returns: "void" });

/** Draw a triangle strip defined by points within an image */
export const ImageDrawTriangleStrip = raylibLibrary.bind("ImageDrawTriangleStrip", { args: ["pointer", "pointer", "i32", Color], returns: "void" });

/** Draw a source image within a destination image (tint applied to source) */
export const ImageDraw = raylibLibrary.bind("ImageDraw", { args: ["pointer", Image, Rectangle, Rectangle, Color], returns: "void" });

/** Draw text (using default font) within an image (destination) */
export const ImageDrawText = raylibLibrary.bind("ImageDrawText", { args: ["pointer", "utf8string", "i32", "i32", "i32", Color], returns: "void" });

/** Load texture from file into GPU memory (VRAM) */
export const LoadTexture = raylibLibrary.bind("LoadTexture", { args: ["utf8string"], returns: Texture });

/** Load texture from image data */
export const LoadTextureFromImage = raylibLibrary.bind("LoadTextureFromImage", { args: [Image], returns: Texture });

/** Load cubemap from image, multiple image cubemap layouts supported */
export const LoadTextureCubemap = raylibLibrary.bind("LoadTextureCubemap", { args: [Image, "i32"], returns: Texture });

/** Load texture for rendering (framebuffer) */
export const LoadRenderTexture = raylibLibrary.bind("LoadRenderTexture", { args: ["i32", "i32"], returns: RenderTexture });

/** Check if a texture is valid (loaded in GPU) */
export const IsTextureValid = raylibLibrary.bind("IsTextureValid", { args: [Texture], returns: "bool" });

/** Unload texture from GPU memory (VRAM) */
export const UnloadTexture = raylibLibrary.bind("UnloadTexture", { args: [Texture], returns: "void" });

/** Check if a render texture is valid (loaded in GPU) */
export const IsRenderTextureValid = raylibLibrary.bind("IsRenderTextureValid", { args: [RenderTexture], returns: "bool" });

/** Unload render texture from GPU memory (VRAM) */
export const UnloadRenderTexture = raylibLibrary.bind("UnloadRenderTexture", { args: [RenderTexture], returns: "void" });

/** Update GPU texture with new data (pixels should be able to fill texture) */
export const UpdateTexture = raylibLibrary.bind("UpdateTexture", { args: [Texture, "pointer"], returns: "void" });

/** Update GPU texture rectangle with new data (pixels and rec should fit in texture) */
export const UpdateTextureRec = raylibLibrary.bind("UpdateTextureRec", { args: [Texture, Rectangle, "pointer"], returns: "void" });

/** Generate GPU mipmaps for a texture */
export const GenTextureMipmaps = raylibLibrary.bind("GenTextureMipmaps", { args: ["pointer"], returns: "void" });

/** Set texture scaling filter mode */
export const SetTextureFilter = raylibLibrary.bind("SetTextureFilter", { args: [Texture, "i32"], returns: "void" });

/** Set texture wrapping mode */
export const SetTextureWrap = raylibLibrary.bind("SetTextureWrap", { args: [Texture, "i32"], returns: "void" });

/** Draw a Texture2D */
export const DrawTexture = raylibLibrary.bind("DrawTexture", { args: [Texture, "i32", "i32", Color], returns: "void" });

/** Draw a Texture2D with position defined as Vector2 */
export const DrawTextureV = raylibLibrary.bind("DrawTextureV", { args: [Texture, Vector2, Color], returns: "void" });

/** Draw a part of a texture defined by a rectangle */
export const DrawTextureRec = raylibLibrary.bind("DrawTextureRec", { args: [Texture, Rectangle, Vector2, Color], returns: "void" });

/** Check if two colors are equal */
export const ColorIsEqual = raylibLibrary.bind("ColorIsEqual", { args: [Color, Color], returns: "bool" });

/** Get hexadecimal value for a Color (0xRRGGBBAA) */
export const ColorToInt = raylibLibrary.bind("ColorToInt", { args: [Color], returns: "i32" });

/** Get Color normalized as float [0..1] */
export const ColorNormalize = raylibLibrary.bind("ColorNormalize", { args: [Color], returns: Vector4 });

/** Get Color from normalized values [0..1] */
export const ColorFromNormalized = raylibLibrary.bind("ColorFromNormalized", { args: [Vector4], returns: Color });

/** Get HSV values for a Color, hue [0..360], saturation/value [0..1] */
export const ColorToHSV = raylibLibrary.bind("ColorToHSV", { args: [Color], returns: Vector3 });

/** Get a Color from HSV values, hue [0..360], saturation/value [0..1] */
export const ColorFromHSV = raylibLibrary.bind("ColorFromHSV", { args: ["f32", "f32", "f32"], returns: Color });

/** Get color multiplied with another color */
export const ColorTint = raylibLibrary.bind("ColorTint", { args: [Color, Color], returns: Color });

/** Get src alpha-blended into dst color with tint */
export const ColorAlphaBlend = raylibLibrary.bind("ColorAlphaBlend", { args: [Color, Color, Color], returns: Color });

/** Get Color structure from hexadecimal value */
export const GetColor = raylibLibrary.bind("GetColor", { args: ["u32"], returns: Color });

/** Get Color from a source pixel pointer of certain format */
export const GetPixelColor = raylibLibrary.bind("GetPixelColor", { args: ["pointer", "i32"], returns: Color });

/** Set color formatted into destination pixel pointer */
export const SetPixelColor = raylibLibrary.bind("SetPixelColor", { args: ["pointer", Color, "i32"], returns: "void" });

/** Get pixel data size in bytes for certain format */
export const GetPixelDataSize = raylibLibrary.bind("GetPixelDataSize", { args: ["i32", "i32", "i32"], returns: "i32" });

/** Get the default Font */
export const GetFontDefault = raylibLibrary.bind("GetFontDefault", { args: [], returns: Font });

/** Load font from file into GPU memory (VRAM) */
export const LoadFont = raylibLibrary.bind("LoadFont", { args: ["utf8string"], returns: Font });

/** Load font from file with extended parameters, use NULL for codepoints and 0 for codepointCount to load the default character set, font size is provided in pixels height */
export const LoadFontEx = raylibLibrary.bind("LoadFontEx", { args: ["utf8string", "i32", "pointer", "i32"], returns: Font });

/** Load font from Image (XNA style) */
export const LoadFontFromImage = raylibLibrary.bind("LoadFontFromImage", { args: [Image, Color, "i32"], returns: Font });

/** Load font from memory buffer, fileType refers to extension: i.e. '.ttf' */
export const LoadFontFromMemory = raylibLibrary.bind("LoadFontFromMemory", { args: ["utf8string", "pointer", "i32", "i32", "pointer", "i32"], returns: Font });

/** Check if a font is valid (font data loaded, WARNING: GPU texture not checked) */
export const IsFontValid = raylibLibrary.bind("IsFontValid", { args: [Font], returns: "bool" });

/** Load font data for further use */
export const LoadFontData = raylibLibrary.bind("LoadFontData", { args: ["pointer", "i32", "i32", "pointer", "i32", "i32", "pointer"], returns: "pointer" });

/** Generate image font atlas using chars info */
export const GenImageFontAtlas = raylibLibrary.bind("GenImageFontAtlas", { args: ["pointer", "pointer", "i32", "i32", "i32", "i32"], returns: Image });

/** Unload font chars info data (RAM) */
export const UnloadFontData = raylibLibrary.bind("UnloadFontData", { args: ["pointer", "i32"], returns: "void" });

/** Unload font from GPU memory (VRAM) */
export const UnloadFont = raylibLibrary.bind("UnloadFont", { args: [Font], returns: "void" });

/** Export font as code file, returns true on success */
export const ExportFontAsCode = raylibLibrary.bind("ExportFontAsCode", { args: [Font, "utf8string"], returns: "bool" });

/** Draw current FPS */
export const DrawFPS = raylibLibrary.bind("DrawFPS", { args: ["i32", "i32"], returns: "void" });

/** Draw text (using default font) */
export const DrawText = raylibLibrary.bind("DrawText", { args: ["utf8string", "i32", "i32", "i32", Color], returns: "void" });

/** Set vertical line spacing when drawing with line-breaks */
export const SetTextLineSpacing = raylibLibrary.bind("SetTextLineSpacing", { args: ["i32"], returns: "void" });

/** Measure string width for default font */
export const MeasureText = raylibLibrary.bind("MeasureText", { args: ["utf8string", "i32"], returns: "i32" });

/** Get glyph index position in font for a codepoint (unicode character), fallback to '?' if not found */
export const GetGlyphIndex = raylibLibrary.bind("GetGlyphIndex", { args: [Font, "i32"], returns: "i32" });

/** Get glyph font info data for a codepoint (unicode character), fallback to '?' if not found */
export const GetGlyphInfo = raylibLibrary.bind("GetGlyphInfo", { args: [Font, "i32"], returns: GlyphInfo });

/** Get glyph rectangle in font atlas for a codepoint (unicode character), fallback to '?' if not found */
export const GetGlyphAtlasRec = raylibLibrary.bind("GetGlyphAtlasRec", { args: [Font, "i32"], returns: Rectangle });

/** Load UTF-8 text encoded from codepoints array */
export const LoadUTF8 = raylibLibrary.bind("LoadUTF8", { args: ["pointer", "i32"], returns: "pointer" });

/** Unload UTF-8 text encoded from codepoints array */
export const UnloadUTF8 = raylibLibrary.bind("UnloadUTF8", { args: ["pointer"], returns: "void" });

/** Load all codepoints from a UTF-8 text string, codepoints count returned by parameter */
export const LoadCodepoints = raylibLibrary.bind("LoadCodepoints", { args: ["utf8string", "pointer"], returns: "pointer" });

/** Unload codepoints data from memory */
export const UnloadCodepoints = raylibLibrary.bind("UnloadCodepoints", { args: ["pointer"], returns: "void" });

/** Get total number of codepoints in a UTF-8 encoded string */
export const GetCodepointCount = raylibLibrary.bind("GetCodepointCount", { args: ["utf8string"], returns: "i32" });

/** Get next codepoint in a UTF-8 encoded string, 0x3f('?') is returned on failure */
export const GetCodepoint = raylibLibrary.bind("GetCodepoint", { args: ["utf8string", "pointer"], returns: "i32" });

/** Get next codepoint in a UTF-8 encoded string, 0x3f('?') is returned on failure */
export const GetCodepointNext = raylibLibrary.bind("GetCodepointNext", { args: ["utf8string", "pointer"], returns: "i32" });

/** Get previous codepoint in a UTF-8 encoded string, 0x3f('?') is returned on failure */
export const GetCodepointPrevious = raylibLibrary.bind("GetCodepointPrevious", { args: ["utf8string", "pointer"], returns: "i32" });

/** Encode one codepoint into UTF-8 byte array (array length returned as parameter) */
export const CodepointToUTF8 = raylibLibrary.bind("CodepointToUTF8", { args: ["i32", "pointer"], returns: "utf8string" });

/** Load text as separate lines ('\n') */
export const LoadTextLines = raylibLibrary.bind("LoadTextLines", { args: ["utf8string", "pointer"], returns: "pointer" });

/** Unload text lines */
export const UnloadTextLines = raylibLibrary.bind("UnloadTextLines", { args: ["pointer", "i32"], returns: "void" });

/** Copy one string to another, returns bytes copied */
export const TextCopy = raylibLibrary.bind("TextCopy", { args: ["pointer", "utf8string"], returns: "i32" });

/** Check if two text string are equal */
export const TextIsEqual = raylibLibrary.bind("TextIsEqual", { args: ["utf8string", "utf8string"], returns: "bool" });

/** Get text length, checks for '\0' ending */
export const TextLength = raylibLibrary.bind("TextLength", { args: ["utf8string"], returns: "u32" });

/** Get a piece of a text string */
export const TextSubtext = raylibLibrary.bind("TextSubtext", { args: ["utf8string", "i32", "i32"], returns: "utf8string" });

/** Remove text spaces, concat words */
export const TextRemoveSpaces = raylibLibrary.bind("TextRemoveSpaces", { args: ["utf8string"], returns: "utf8string" });

/** Get text between two strings */
export const GetTextBetween = raylibLibrary.bind("GetTextBetween", { args: ["utf8string", "utf8string", "utf8string"], returns: "utf8string" });

/** Replace text string with new string */
export const TextReplace = raylibLibrary.bind("TextReplace", { args: ["utf8string", "utf8string", "utf8string"], returns: "utf8string" });

/** Raw-pointer variant for nullable C string parameters. */
export const TextReplaceRaw = raylibLibrary.bind("TextReplace", { args: ["utf8string", "utf8string", "pointer"], returns: "utf8string" });

/** Replace text string with new string, memory must be MemFree() */
export const TextReplaceAlloc = raylibLibrary.bind("TextReplaceAlloc", { args: ["utf8string", "utf8string", "utf8string"], returns: "pointer" });

/** Raw-pointer variant for nullable C string parameters. */
export const TextReplaceAllocRaw = raylibLibrary.bind("TextReplaceAlloc", { args: ["utf8string", "utf8string", "pointer"], returns: "pointer" });

/** Replace text between two specific strings */
export const TextReplaceBetween = raylibLibrary.bind("TextReplaceBetween", { args: ["utf8string", "utf8string", "utf8string", "utf8string"], returns: "utf8string" });

/** Raw-pointer variant for nullable C string parameters. */
export const TextReplaceBetweenRaw = raylibLibrary.bind("TextReplaceBetween", { args: ["utf8string", "utf8string", "utf8string", "pointer"], returns: "utf8string" });

/** Replace text between two specific strings, memory must be MemFree() */
export const TextReplaceBetweenAlloc = raylibLibrary.bind("TextReplaceBetweenAlloc", { args: ["utf8string", "utf8string", "utf8string", "utf8string"], returns: "pointer" });

/** Raw-pointer variant for nullable C string parameters. */
export const TextReplaceBetweenAllocRaw = raylibLibrary.bind("TextReplaceBetweenAlloc", { args: ["utf8string", "utf8string", "utf8string", "pointer"], returns: "pointer" });

/** Insert text in a defined byte position */
export const TextInsert = raylibLibrary.bind("TextInsert", { args: ["utf8string", "utf8string", "i32"], returns: "utf8string" });

/** Insert text in a defined byte position, memory must be MemFree() */
export const TextInsertAlloc = raylibLibrary.bind("TextInsertAlloc", { args: ["utf8string", "utf8string", "i32"], returns: "pointer" });

/** Join text strings with delimiter */
export const TextJoin = raylibLibrary.bind("TextJoin", { args: ["pointer", "i32", "utf8string"], returns: "utf8string" });

/** Split text into multiple strings, using MAX_TEXTSPLIT_COUNT static strings */
export const TextSplit = raylibLibrary.bind("TextSplit", { args: ["utf8string", "i8", "pointer"], returns: "pointer" });

/** Append text at specific position and move cursor */
export const TextAppend = raylibLibrary.bind("TextAppend", { args: ["pointer", "utf8string", "pointer"], returns: "void" });

/** Find first text occurrence within a string, -1 if not found */
export const TextFindIndex = raylibLibrary.bind("TextFindIndex", { args: ["utf8string", "utf8string"], returns: "i32" });

/** Get upper case version of provided string */
export const TextToUpper = raylibLibrary.bind("TextToUpper", { args: ["utf8string"], returns: "utf8string" });

/** Get lower case version of provided string */
export const TextToLower = raylibLibrary.bind("TextToLower", { args: ["utf8string"], returns: "utf8string" });

/** Get Pascal case notation version of provided string */
export const TextToPascal = raylibLibrary.bind("TextToPascal", { args: ["utf8string"], returns: "utf8string" });

/** Get Snake case notation version of provided string */
export const TextToSnake = raylibLibrary.bind("TextToSnake", { args: ["utf8string"], returns: "utf8string" });

/** Get Camel case notation version of provided string */
export const TextToCamel = raylibLibrary.bind("TextToCamel", { args: ["utf8string"], returns: "utf8string" });

/** Get integer value from text */
export const TextToInteger = raylibLibrary.bind("TextToInteger", { args: ["utf8string"], returns: "i32" });

/** Get float value from text */
export const TextToFloat = raylibLibrary.bind("TextToFloat", { args: ["utf8string"], returns: "f32" });

/** Draw a line in 3D world space */
export const DrawLine3D = raylibLibrary.bind("DrawLine3D", { args: [Vector3, Vector3, Color], returns: "void" });

/** Draw a point in 3D space, actually a small line */
export const DrawPoint3D = raylibLibrary.bind("DrawPoint3D", { args: [Vector3, Color], returns: "void" });

/** Draw a color-filled triangle (vertex in counter-clockwise order!) */
export const DrawTriangle3D = raylibLibrary.bind("DrawTriangle3D", { args: [Vector3, Vector3, Vector3, Color], returns: "void" });

/** Draw a triangle strip defined by points */
export const DrawTriangleStrip3D = raylibLibrary.bind("DrawTriangleStrip3D", { args: ["pointer", "i32", Color], returns: "void" });

/** Draw cube (Vector version) */
export const DrawCubeV = raylibLibrary.bind("DrawCubeV", { args: [Vector3, Vector3, Color], returns: "void" });

/** Draw cube wires (Vector version) */
export const DrawCubeWiresV = raylibLibrary.bind("DrawCubeWiresV", { args: [Vector3, Vector3, Color], returns: "void" });

/** Draw a plane XZ */
export const DrawPlane = raylibLibrary.bind("DrawPlane", { args: [Vector3, Vector2, Color], returns: "void" });

/** Draw a ray line */
export const DrawRay = raylibLibrary.bind("DrawRay", { args: [Ray, Color], returns: "void" });

/** Load model from files (meshes and materials) */
export const LoadModel = raylibLibrary.bind("LoadModel", { args: ["utf8string"], returns: Model });

/** Load model from generated mesh (default material) */
export const LoadModelFromMesh = raylibLibrary.bind("LoadModelFromMesh", { args: [Mesh], returns: Model });

/** Check if a model is valid (loaded in GPU, VAO/VBOs) */
export const IsModelValid = raylibLibrary.bind("IsModelValid", { args: [Model], returns: "bool" });

/** Unload model (including meshes) from memory (RAM and/or VRAM) */
export const UnloadModel = raylibLibrary.bind("UnloadModel", { args: [Model], returns: "void" });

/** Compute model bounding box limits (considers all meshes) */
export const GetModelBoundingBox = raylibLibrary.bind("GetModelBoundingBox", { args: [Model], returns: BoundingBox });

/** Draw bounding box (wires) */
export const DrawBoundingBox = raylibLibrary.bind("DrawBoundingBox", { args: [BoundingBox, Color], returns: "void" });

/** Draw a billboard texture defined by source */
export const DrawBillboardRec = raylibLibrary.bind("DrawBillboardRec", { args: [Camera3D, Texture, Rectangle, Vector3, Vector2, Color], returns: "void" });

/** Upload mesh vertex data in GPU and provide VAO/VBO ids */
export const UploadMesh = raylibLibrary.bind("UploadMesh", { args: ["pointer", "bool"], returns: "void" });

/** Update mesh vertex data in GPU for a specific buffer index */
export const UpdateMeshBuffer = raylibLibrary.bind("UpdateMeshBuffer", { args: [Mesh, "i32", "pointer", "i32", "i32"], returns: "void" });

/** Unload mesh data from CPU and GPU */
export const UnloadMesh = raylibLibrary.bind("UnloadMesh", { args: [Mesh], returns: "void" });

/** Draw a 3d mesh with material and transform */
export const DrawMesh = raylibLibrary.bind("DrawMesh", { args: [Mesh, Material, Matrix], returns: "void" });

/** Draw multiple mesh instances with material and different transforms */
export const DrawMeshInstanced = raylibLibrary.bind("DrawMeshInstanced", { args: [Mesh, Material, "pointer", "i32"], returns: "void" });

/** Compute mesh bounding box limits */
export const GetMeshBoundingBox = raylibLibrary.bind("GetMeshBoundingBox", { args: [Mesh], returns: BoundingBox });

/** Compute mesh tangents */
export const GenMeshTangents = raylibLibrary.bind("GenMeshTangents", { args: ["pointer"], returns: "void" });

/** Export mesh data to file, returns true on success */
export const ExportMesh = raylibLibrary.bind("ExportMesh", { args: [Mesh, "utf8string"], returns: "bool" });

/** Export mesh as code file (.h) defining multiple arrays of vertex attributes */
export const ExportMeshAsCode = raylibLibrary.bind("ExportMeshAsCode", { args: [Mesh, "utf8string"], returns: "bool" });

/** Generate cuboid mesh */
export const GenMeshCube = raylibLibrary.bind("GenMeshCube", { args: ["f32", "f32", "f32"], returns: Mesh });

/** Generate heightmap mesh from image data */
export const GenMeshHeightmap = raylibLibrary.bind("GenMeshHeightmap", { args: [Image, Vector3], returns: Mesh });

/** Generate cubes-based map mesh from image data */
export const GenMeshCubicmap = raylibLibrary.bind("GenMeshCubicmap", { args: [Image, Vector3], returns: Mesh });

/** Load materials from model file */
export const LoadMaterials = raylibLibrary.bind("LoadMaterials", { args: ["utf8string", "pointer"], returns: "pointer" });

/** Load default material (Supports: DIFFUSE, SPECULAR, NORMAL maps) */
export const LoadMaterialDefault = raylibLibrary.bind("LoadMaterialDefault", { args: [], returns: Material });

/** Check if a material is valid (shader assigned, map textures loaded in GPU) */
export const IsMaterialValid = raylibLibrary.bind("IsMaterialValid", { args: [Material], returns: "bool" });

/** Unload material from GPU memory (VRAM) */
export const UnloadMaterial = raylibLibrary.bind("UnloadMaterial", { args: [Material], returns: "void" });

/** Set texture for a material map type (MATERIAL_MAP_DIFFUSE, MATERIAL_MAP_SPECULAR...) */
export const SetMaterialTexture = raylibLibrary.bind("SetMaterialTexture", { args: ["pointer", "i32", Texture], returns: "void" });

/** Set material for a mesh */
export const SetModelMeshMaterial = raylibLibrary.bind("SetModelMeshMaterial", { args: ["pointer", "i32", "i32"], returns: "void" });

/** Load model animations from file */
export const LoadModelAnimations = raylibLibrary.bind("LoadModelAnimations", { args: ["utf8string", "pointer"], returns: "pointer" });

/** Unload animation array data */
export const UnloadModelAnimations = raylibLibrary.bind("UnloadModelAnimations", { args: ["pointer", "i32"], returns: "void" });

/** Check model animation skeleton match */
export const IsModelAnimationValid = raylibLibrary.bind("IsModelAnimationValid", { args: [Model, ModelAnimation], returns: "bool" });

/** Check collision between two bounding boxes */
export const CheckCollisionBoxes = raylibLibrary.bind("CheckCollisionBoxes", { args: [BoundingBox, BoundingBox], returns: "bool" });

/** Get collision info between ray and box */
export const GetRayCollisionBox = raylibLibrary.bind("GetRayCollisionBox", { args: [Ray, BoundingBox], returns: RayCollision });

/** Get collision info between ray and mesh */
export const GetRayCollisionMesh = raylibLibrary.bind("GetRayCollisionMesh", { args: [Ray, Mesh, Matrix], returns: RayCollision });

/** Get collision info between ray and triangle */
export const GetRayCollisionTriangle = raylibLibrary.bind("GetRayCollisionTriangle", { args: [Ray, Vector3, Vector3, Vector3], returns: RayCollision });

/** Get collision info between ray and quad */
export const GetRayCollisionQuad = raylibLibrary.bind("GetRayCollisionQuad", { args: [Ray, Vector3, Vector3, Vector3, Vector3], returns: RayCollision });

/** Initialize audio device and context */
export const InitAudioDevice = raylibLibrary.bind("InitAudioDevice", { args: [], returns: "void" });

/** Close the audio device and context */
export const CloseAudioDevice = raylibLibrary.bind("CloseAudioDevice", { args: [], returns: "void" });

/** Check if audio device has been initialized successfully */
export const IsAudioDeviceReady = raylibLibrary.bind("IsAudioDeviceReady", { args: [], returns: "bool" });

/** Set master volume (listener) */
export const SetMasterVolume = raylibLibrary.bind("SetMasterVolume", { args: ["f32"], returns: "void" });

/** Get master volume (listener) */
export const GetMasterVolume = raylibLibrary.bind("GetMasterVolume", { args: [], returns: "f32" });

/** Load wave data from file */
export const LoadWave = raylibLibrary.bind("LoadWave", { args: ["utf8string"], returns: Wave });

/** Load wave from memory buffer, fileType refers to extension: i.e. '.wav' */
export const LoadWaveFromMemory = raylibLibrary.bind("LoadWaveFromMemory", { args: ["utf8string", "pointer", "i32"], returns: Wave });

/** Checks if wave data is valid (data loaded and parameters) */
export const IsWaveValid = raylibLibrary.bind("IsWaveValid", { args: [Wave], returns: "bool" });

/** Load sound from file */
export const LoadSound = raylibLibrary.bind("LoadSound", { args: ["utf8string"], returns: Sound });

/** Load sound from wave data */
export const LoadSoundFromWave = raylibLibrary.bind("LoadSoundFromWave", { args: [Wave], returns: Sound });

/** Create a new sound that shares the same sample data as the source sound, does not own the sound data */
export const LoadSoundAlias = raylibLibrary.bind("LoadSoundAlias", { args: [Sound], returns: Sound });

/** Checks if a sound is valid (data loaded and buffers initialized) */
export const IsSoundValid = raylibLibrary.bind("IsSoundValid", { args: [Sound], returns: "bool" });

/** Update sound buffer with new data (default data format: 32 bit float, stereo) */
export const UpdateSound = raylibLibrary.bind("UpdateSound", { args: [Sound, "pointer", "i32"], returns: "void" });

/** Unload wave data */
export const UnloadWave = raylibLibrary.bind("UnloadWave", { args: [Wave], returns: "void" });

/** Unload sound */
export const UnloadSound = raylibLibrary.bind("UnloadSound", { args: [Sound], returns: "void" });

/** Unload a sound alias (does not deallocate sample data) */
export const UnloadSoundAlias = raylibLibrary.bind("UnloadSoundAlias", { args: [Sound], returns: "void" });

/** Export wave data to file, returns true on success */
export const ExportWave = raylibLibrary.bind("ExportWave", { args: [Wave, "utf8string"], returns: "bool" });

/** Export wave sample data to code (.h), returns true on success */
export const ExportWaveAsCode = raylibLibrary.bind("ExportWaveAsCode", { args: [Wave, "utf8string"], returns: "bool" });

/** Play a sound */
export const PlaySound = raylibLibrary.bind("PlaySound", { args: [Sound], returns: "void" });

/** Stop playing a sound */
export const StopSound = raylibLibrary.bind("StopSound", { args: [Sound], returns: "void" });

/** Pause a sound */
export const PauseSound = raylibLibrary.bind("PauseSound", { args: [Sound], returns: "void" });

/** Resume a paused sound */
export const ResumeSound = raylibLibrary.bind("ResumeSound", { args: [Sound], returns: "void" });

/** Check if a sound is currently playing */
export const IsSoundPlaying = raylibLibrary.bind("IsSoundPlaying", { args: [Sound], returns: "bool" });

/** Copy a wave to a new wave */
export const WaveCopy = raylibLibrary.bind("WaveCopy", { args: [Wave], returns: Wave });

/** Crop a wave to defined frames range */
export const WaveCrop = raylibLibrary.bind("WaveCrop", { args: ["pointer", "i32", "i32"], returns: "void" });

/** Convert wave data to desired format */
export const WaveFormat = raylibLibrary.bind("WaveFormat", { args: ["pointer", "i32", "i32", "i32"], returns: "void" });

/** Load samples data from wave as a 32bit float data array */
export const LoadWaveSamples = raylibLibrary.bind("LoadWaveSamples", { args: [Wave], returns: "pointer" });

/** Unload samples data loaded with LoadWaveSamples() */
export const UnloadWaveSamples = raylibLibrary.bind("UnloadWaveSamples", { args: ["pointer"], returns: "void" });

/** Load music stream from file */
export const LoadMusicStream = raylibLibrary.bind("LoadMusicStream", { args: ["utf8string"], returns: Music });

/** Load music stream from data */
export const LoadMusicStreamFromMemory = raylibLibrary.bind("LoadMusicStreamFromMemory", { args: ["utf8string", "pointer", "i32"], returns: Music });

/** Checks if a music stream is valid (context and buffers initialized) */
export const IsMusicValid = raylibLibrary.bind("IsMusicValid", { args: [Music], returns: "bool" });

/** Unload music stream */
export const UnloadMusicStream = raylibLibrary.bind("UnloadMusicStream", { args: [Music], returns: "void" });

/** Start music playing */
export const PlayMusicStream = raylibLibrary.bind("PlayMusicStream", { args: [Music], returns: "void" });

/** Check if music is playing */
export const IsMusicStreamPlaying = raylibLibrary.bind("IsMusicStreamPlaying", { args: [Music], returns: "bool" });

/** Updates buffers for music streaming */
export const UpdateMusicStream = raylibLibrary.bind("UpdateMusicStream", { args: [Music], returns: "void" });

/** Stop music playing */
export const StopMusicStream = raylibLibrary.bind("StopMusicStream", { args: [Music], returns: "void" });

/** Pause music playing */
export const PauseMusicStream = raylibLibrary.bind("PauseMusicStream", { args: [Music], returns: "void" });

/** Resume playing paused music */
export const ResumeMusicStream = raylibLibrary.bind("ResumeMusicStream", { args: [Music], returns: "void" });

/** Get music time length (in seconds) */
export const GetMusicTimeLength = raylibLibrary.bind("GetMusicTimeLength", { args: [Music], returns: "f32" });

/** Get current music time played (in seconds) */
export const GetMusicTimePlayed = raylibLibrary.bind("GetMusicTimePlayed", { args: [Music], returns: "f32" });

/** Load audio stream (to stream raw audio pcm data) */
export const LoadAudioStream = raylibLibrary.bind("LoadAudioStream", { args: ["u32", "u32", "u32"], returns: AudioStream });

/** Checks if an audio stream is valid (buffers initialized) */
export const IsAudioStreamValid = raylibLibrary.bind("IsAudioStreamValid", { args: [AudioStream], returns: "bool" });

/** Unload audio stream and free memory */
export const UnloadAudioStream = raylibLibrary.bind("UnloadAudioStream", { args: [AudioStream], returns: "void" });

/** Update audio stream buffers with data */
export const UpdateAudioStream = raylibLibrary.bind("UpdateAudioStream", { args: [AudioStream, "pointer", "i32"], returns: "void" });

/** Check if any audio stream buffers requires refill */
export const IsAudioStreamProcessed = raylibLibrary.bind("IsAudioStreamProcessed", { args: [AudioStream], returns: "bool" });

/** Play audio stream */
export const PlayAudioStream = raylibLibrary.bind("PlayAudioStream", { args: [AudioStream], returns: "void" });

/** Pause audio stream */
export const PauseAudioStream = raylibLibrary.bind("PauseAudioStream", { args: [AudioStream], returns: "void" });

/** Resume audio stream */
export const ResumeAudioStream = raylibLibrary.bind("ResumeAudioStream", { args: [AudioStream], returns: "void" });

/** Check if audio stream is playing */
export const IsAudioStreamPlaying = raylibLibrary.bind("IsAudioStreamPlaying", { args: [AudioStream], returns: "bool" });

/** Stop audio stream */
export const StopAudioStream = raylibLibrary.bind("StopAudioStream", { args: [AudioStream], returns: "void" });

/** Default size for new audio streams */
export const SetAudioStreamBufferSizeDefault = raylibLibrary.bind("SetAudioStreamBufferSizeDefault", { args: ["i32"], returns: "void" });

/** Audio thread callback to request new data */
export const SetAudioStreamCallback = raylibLibrary.bind("SetAudioStreamCallback", { args: [AudioStream, "pointer"], returns: "void" });

/** Attach audio stream processor to stream, receives frames x 2 samples as 'float' (stereo) */
export const AttachAudioStreamProcessor = raylibLibrary.bind("AttachAudioStreamProcessor", { args: [AudioStream, "pointer"], returns: "void" });

/** Detach audio stream processor from stream */
export const DetachAudioStreamProcessor = raylibLibrary.bind("DetachAudioStreamProcessor", { args: [AudioStream, "pointer"], returns: "void" });

/** Attach audio stream processor to the entire audio pipeline, receives frames x 2 samples as 'float' (stereo) */
export const AttachAudioMixedProcessor = raylibLibrary.bind("AttachAudioMixedProcessor", { args: ["pointer"], returns: "void" });

/** Detach audio stream processor from the entire audio pipeline */
export const DetachAudioMixedProcessor = raylibLibrary.bind("DetachAudioMixedProcessor", { args: ["pointer"], returns: "void" });

export const MOUSE_LEFT_BUTTON = MOUSE_BUTTON_LEFT;
export const MOUSE_RIGHT_BUTTON = MOUSE_BUTTON_RIGHT;
export const MOUSE_MIDDLE_BUTTON = MOUSE_BUTTON_MIDDLE;
export const MATERIAL_MAP_DIFFUSE = MATERIAL_MAP_ALBEDO;
export const MATERIAL_MAP_SPECULAR = MATERIAL_MAP_METALNESS;
export const SHADER_LOC_MAP_DIFFUSE = SHADER_LOC_MAP_ALBEDO;
export const SHADER_LOC_MAP_SPECULAR = SHADER_LOC_MAP_METALNESS;
/** Compatibility hack for previous raylib versions */
export const GetMouseRay = GetScreenToWorldRay;
