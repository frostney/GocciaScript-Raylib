// Generated from official raylib 6.0. Do not edit.

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
  raylibVersion: "6.0";
  raylibCommit: "dbc56a87da87d973a9c5baa4e7438a9d20121d28";
  gocciaScriptVersion: string;
  linkage: "dynamic";
};
export declare const RAYLIB_FIELD_ALIASES: {
  AudioStream: { buffer: "nativeBuffer" };
};
export declare const raylibLibrary: FFILibrary;
export declare function closeRaylib(): void;

/** Vector2, 2 components */
export interface Vector2Value extends FFIAggregateValue {
  "x": number;
  "y": number;
}
export declare const Vector2: FFIStructDescriptor<Vector2Value>;

/** Vector3, 3 components */
export interface Vector3Value extends FFIAggregateValue {
  "x": number;
  "y": number;
  "z": number;
}
export declare const Vector3: FFIStructDescriptor<Vector3Value>;

/** Vector4, 4 components */
export interface Vector4Value extends FFIAggregateValue {
  "x": number;
  "y": number;
  "z": number;
  "w": number;
}
export declare const Vector4: FFIStructDescriptor<Vector4Value>;

/** Matrix, 4x4 components, column major, OpenGL style, right-handed */
export interface MatrixValue extends FFIAggregateValue {
  "m0": number;
  "m4": number;
  "m8": number;
  "m12": number;
  "m1": number;
  "m5": number;
  "m9": number;
  "m13": number;
  "m2": number;
  "m6": number;
  "m10": number;
  "m14": number;
  "m3": number;
  "m7": number;
  "m11": number;
  "m15": number;
}
export declare const Matrix: FFIStructDescriptor<MatrixValue>;

/** Color, 4 components, R8G8B8A8 (32bit) */
export interface ColorValue extends FFIAggregateValue {
  "r": number;
  "g": number;
  "b": number;
  "a": number;
}
export declare const Color: FFIStructDescriptor<ColorValue>;

/** Rectangle, 4 components */
export interface RectangleValue extends FFIAggregateValue {
  "x": number;
  "y": number;
  "width": number;
  "height": number;
}
export declare const Rectangle: FFIStructDescriptor<RectangleValue>;

/** Image, pixel data stored in CPU memory (RAM) */
export interface ImageValue extends FFIAggregateValue {
  "data": FFIPointer;
  "width": number;
  "height": number;
  "mipmaps": number;
  "format": number;
}
export declare const Image: FFIStructDescriptor<ImageValue>;

/** Texture, tex data stored in GPU memory (VRAM) */
export interface TextureValue extends FFIAggregateValue {
  "id": number;
  "width": number;
  "height": number;
  "mipmaps": number;
  "format": number;
}
export declare const Texture: FFIStructDescriptor<TextureValue>;

/** RenderTexture, fbo for texture rendering */
export interface RenderTextureValue extends FFIAggregateValue {
  "id": number;
  "texture": TextureValue;
  "depth": TextureValue;
}
export declare const RenderTexture: FFIStructDescriptor<RenderTextureValue>;

/** NPatchInfo, n-patch layout info */
export interface NPatchInfoValue extends FFIAggregateValue {
  "source": RectangleValue;
  "left": number;
  "top": number;
  "right": number;
  "bottom": number;
  "layout": number;
}
export declare const NPatchInfo: FFIStructDescriptor<NPatchInfoValue>;

/** GlyphInfo, font characters glyphs info */
export interface GlyphInfoValue extends FFIAggregateValue {
  "value": number;
  "offsetX": number;
  "offsetY": number;
  "advanceX": number;
  "image": ImageValue;
}
export declare const GlyphInfo: FFIStructDescriptor<GlyphInfoValue>;

/** Font, font texture and GlyphInfo array data */
export interface FontValue extends FFIAggregateValue {
  "baseSize": number;
  "glyphCount": number;
  "glyphPadding": number;
  "texture": Texture2DValue;
  "recs": FFIPointer;
  "glyphs": FFIPointer;
}
export declare const Font: FFIStructDescriptor<FontValue>;

/** Camera, defines position/orientation in 3d space */
export interface Camera3DValue extends FFIAggregateValue {
  "position": Vector3Value;
  "target": Vector3Value;
  "up": Vector3Value;
  "fovy": number;
  "projection": number;
}
export declare const Camera3D: FFIStructDescriptor<Camera3DValue>;

/** Camera2D, defines position/orientation in 2d space */
export interface Camera2DValue extends FFIAggregateValue {
  "offset": Vector2Value;
  "target": Vector2Value;
  "rotation": number;
  "zoom": number;
}
export declare const Camera2D: FFIStructDescriptor<Camera2DValue>;

/** Mesh, vertex data and vao/vbo */
export interface MeshValue extends FFIAggregateValue {
  "vertexCount": number;
  "triangleCount": number;
  "vertices": FFIPointer;
  "texcoords": FFIPointer;
  "texcoords2": FFIPointer;
  "normals": FFIPointer;
  "tangents": FFIPointer;
  "colors": FFIPointer;
  "indices": FFIPointer;
  "boneCount": number;
  "boneIndices": FFIPointer;
  "boneWeights": FFIPointer;
  "animVertices": FFIPointer;
  "animNormals": FFIPointer;
  "vaoId": number;
  "vboId": FFIPointer;
}
export declare const Mesh: FFIStructDescriptor<MeshValue>;

/** Shader */
export interface ShaderValue extends FFIAggregateValue {
  "id": number;
  "locs": FFIPointer;
}
export declare const Shader: FFIStructDescriptor<ShaderValue>;

/** MaterialMap */
export interface MaterialMapValue extends FFIAggregateValue {
  "texture": Texture2DValue;
  "color": ColorValue;
  "value": number;
}
export declare const MaterialMap: FFIStructDescriptor<MaterialMapValue>;

/** Material, includes shader and maps */
export interface MaterialValue extends FFIAggregateValue {
  "shader": ShaderValue;
  "maps": FFIPointer;
  "params": FFIArrayValue<number>;
}
export declare const Material: FFIStructDescriptor<MaterialValue>;

/** Transform, vertex transformation data */
export interface TransformValue extends FFIAggregateValue {
  "translation": Vector3Value;
  "rotation": QuaternionValue;
  "scale": Vector3Value;
}
export declare const Transform: FFIStructDescriptor<TransformValue>;

/** Bone, skeletal animation bone */
export interface BoneInfoValue extends FFIAggregateValue {
  "name": FFIArrayValue<number>;
  "parent": number;
}
export declare const BoneInfo: FFIStructDescriptor<BoneInfoValue>;

/** Skeleton, animation bones hierarchy */
export interface ModelSkeletonValue extends FFIAggregateValue {
  "boneCount": number;
  "bones": FFIPointer;
  "bindPose": FFIPointer;
}
export declare const ModelSkeleton: FFIStructDescriptor<ModelSkeletonValue>;

/** Model, meshes, materials and animation data */
export interface ModelValue extends FFIAggregateValue {
  "transform": MatrixValue;
  "meshCount": number;
  "materialCount": number;
  "meshes": FFIPointer;
  "materials": FFIPointer;
  "meshMaterial": FFIPointer;
  "skeleton": ModelSkeletonValue;
  "currentPose": FFIPointer;
  "boneMatrices": FFIPointer;
}
export declare const Model: FFIStructDescriptor<ModelValue>;

/** ModelAnimation, contains a full animation sequence */
export interface ModelAnimationValue extends FFIAggregateValue {
  "name": FFIArrayValue<number>;
  "boneCount": number;
  "keyframeCount": number;
  "keyframePoses": FFIPointer;
}
export declare const ModelAnimation: FFIStructDescriptor<ModelAnimationValue>;

/** Ray, ray for raycasting */
export interface RayValue extends FFIAggregateValue {
  "position": Vector3Value;
  "direction": Vector3Value;
}
export declare const Ray: FFIStructDescriptor<RayValue>;

/** RayCollision, ray hit information */
export interface RayCollisionValue extends FFIAggregateValue {
  "hit": boolean;
  "distance": number;
  "point": Vector3Value;
  "normal": Vector3Value;
}
export declare const RayCollision: FFIStructDescriptor<RayCollisionValue>;

/** BoundingBox */
export interface BoundingBoxValue extends FFIAggregateValue {
  "min": Vector3Value;
  "max": Vector3Value;
}
export declare const BoundingBox: FFIStructDescriptor<BoundingBoxValue>;

/** Wave, audio wave data */
export interface WaveValue extends FFIAggregateValue {
  "frameCount": number;
  "sampleRate": number;
  "sampleSize": number;
  "channels": number;
  "data": FFIPointer;
}
export declare const Wave: FFIStructDescriptor<WaveValue>;

/** AudioStream, custom audio stream */
export interface AudioStreamValue extends FFIAggregateValue {
  /** Native C field: buffer. */
  "nativeBuffer": FFIPointer;
  "processor": FFIPointer;
  "sampleRate": number;
  "sampleSize": number;
  "channels": number;
}
export declare const AudioStream: FFIStructDescriptor<AudioStreamValue>;

/** Sound */
export interface SoundValue extends FFIAggregateValue {
  "stream": AudioStreamValue;
  "frameCount": number;
}
export declare const Sound: FFIStructDescriptor<SoundValue>;

/** Music, audio stream, anything longer than ~10 seconds should be streamed */
export interface MusicValue extends FFIAggregateValue {
  "stream": AudioStreamValue;
  "frameCount": number;
  "looping": boolean;
  "ctxType": number;
  "ctxData": FFIPointer;
}
export declare const Music: FFIStructDescriptor<MusicValue>;

/** VrDeviceInfo, Head-Mounted-Display device parameters */
export interface VrDeviceInfoValue extends FFIAggregateValue {
  "hResolution": number;
  "vResolution": number;
  "hScreenSize": number;
  "vScreenSize": number;
  "eyeToScreenDistance": number;
  "lensSeparationDistance": number;
  "interpupillaryDistance": number;
  "lensDistortionValues": FFIArrayValue<number>;
  "chromaAbCorrection": FFIArrayValue<number>;
}
export declare const VrDeviceInfo: FFIStructDescriptor<VrDeviceInfoValue>;

/** VrStereoConfig, VR stereo rendering configuration for simulator */
export interface VrStereoConfigValue extends FFIAggregateValue {
  "projection": FFIArrayValue<MatrixValue>;
  "viewOffset": FFIArrayValue<MatrixValue>;
  "leftLensCenter": FFIArrayValue<number>;
  "rightLensCenter": FFIArrayValue<number>;
  "leftScreenCenter": FFIArrayValue<number>;
  "rightScreenCenter": FFIArrayValue<number>;
  "scale": FFIArrayValue<number>;
  "scaleIn": FFIArrayValue<number>;
}
export declare const VrStereoConfig: FFIStructDescriptor<VrStereoConfigValue>;

/** File path list */
export interface FilePathListValue extends FFIAggregateValue {
  "count": number;
  "paths": FFIPointer;
}
export declare const FilePathList: FFIStructDescriptor<FilePathListValue>;

/** Automation event */
export interface AutomationEventValue extends FFIAggregateValue {
  "frame": number;
  "type": number;
  "params": FFIArrayValue<number>;
}
export declare const AutomationEvent: FFIStructDescriptor<AutomationEventValue>;

/** Automation event list */
export interface AutomationEventListValue extends FFIAggregateValue {
  "capacity": number;
  "count": number;
  "events": FFIPointer;
}
export declare const AutomationEventList: FFIStructDescriptor<AutomationEventListValue>;

/** Quaternion, 4 components (Vector4 alias) */
export type QuaternionValue = Vector4Value;
export declare const Quaternion: typeof Vector4;

/** Texture2D, same as Texture */
export type Texture2DValue = TextureValue;
export declare const Texture2D: typeof Texture;

/** TextureCubemap, same as Texture */
export type TextureCubemapValue = TextureValue;
export declare const TextureCubemap: typeof Texture;

/** RenderTexture2D, same as RenderTexture */
export type RenderTexture2DValue = RenderTextureValue;
export declare const RenderTexture2D: typeof RenderTexture;

/** Camera type fallback, defaults to Camera3D */
export type CameraValue = Camera3DValue;
export declare const Camera: typeof Camera3D;

/** Anim pose, an array of Transform[] */
export type ModelAnimPoseValue = FFIPointer;
export declare const ModelAnimPose: "pointer";

/** Logging: Redirect trace log messages */
export type TraceLogCallbackValue = FFIPointer;
export declare const TraceLogCallback: "pointer";

/** FileIO: Load binary data */
export type LoadFileDataCallbackValue = FFIPointer;
export declare const LoadFileDataCallback: "pointer";

/** FileIO: Save binary data */
export type SaveFileDataCallbackValue = FFIPointer;
export declare const SaveFileDataCallback: "pointer";

/** FileIO: Load text data */
export type LoadFileTextCallbackValue = FFIPointer;
export declare const LoadFileTextCallback: "pointer";

/** FileIO: Save text data */
export type SaveFileTextCallbackValue = FFIPointer;
export declare const SaveFileTextCallback: "pointer";

export type AudioCallbackValue = FFIPointer;
export declare const AudioCallback: "pointer";

/** Set to try enabling V-Sync on GPU */
export declare const FLAG_VSYNC_HINT: 64;
/** Set to run program in fullscreen */
export declare const FLAG_FULLSCREEN_MODE: 2;
/** Set to allow resizable window */
export declare const FLAG_WINDOW_RESIZABLE: 4;
/** Set to disable window decoration (frame and buttons) */
export declare const FLAG_WINDOW_UNDECORATED: 8;
/** Set to hide window */
export declare const FLAG_WINDOW_HIDDEN: 128;
/** Set to minimize window (iconify) */
export declare const FLAG_WINDOW_MINIMIZED: 512;
/** Set to maximize window (expanded to monitor) */
export declare const FLAG_WINDOW_MAXIMIZED: 1024;
/** Set to window non focused */
export declare const FLAG_WINDOW_UNFOCUSED: 2048;
/** Set to window always on top */
export declare const FLAG_WINDOW_TOPMOST: 4096;
/** Set to allow windows running while minimized */
export declare const FLAG_WINDOW_ALWAYS_RUN: 256;
/** Set to allow transparent framebuffer */
export declare const FLAG_WINDOW_TRANSPARENT: 16;
/** Set to support HighDPI */
export declare const FLAG_WINDOW_HIGHDPI: 8192;
/** Set to support mouse passthrough, only supported when FLAG_WINDOW_UNDECORATED */
export declare const FLAG_WINDOW_MOUSE_PASSTHROUGH: 16384;
/** Set to run program in borderless windowed mode */
export declare const FLAG_BORDERLESS_WINDOWED_MODE: 32768;
/** Set to try enabling MSAA 4X */
export declare const FLAG_MSAA_4X_HINT: 32;
/** Set to try enabling interlaced video format (for V3D) */
export declare const FLAG_INTERLACED_HINT: 65536;

/** Display all logs */
export declare const LOG_ALL: 0;
/** Trace logging, intended for internal use only */
export declare const LOG_TRACE: 1;
/** Debug logging, used for internal debugging, it should be disabled on release builds */
export declare const LOG_DEBUG: 2;
/** Info logging, used for program execution info */
export declare const LOG_INFO: 3;
/** Warning logging, used on recoverable failures */
export declare const LOG_WARNING: 4;
/** Error logging, used on unrecoverable failures */
export declare const LOG_ERROR: 5;
/** Fatal logging, used to abort program: exit(EXIT_FAILURE) */
export declare const LOG_FATAL: 6;
/** Disable logging */
export declare const LOG_NONE: 7;

/** Key: NULL, used for no key pressed */
export declare const KEY_NULL: 0;
/** Key: ' */
export declare const KEY_APOSTROPHE: 39;
/** Key: , */
export declare const KEY_COMMA: 44;
/** Key: - */
export declare const KEY_MINUS: 45;
/** Key: . */
export declare const KEY_PERIOD: 46;
/** Key: / */
export declare const KEY_SLASH: 47;
/** Key: 0 */
export declare const KEY_ZERO: 48;
/** Key: 1 */
export declare const KEY_ONE: 49;
/** Key: 2 */
export declare const KEY_TWO: 50;
/** Key: 3 */
export declare const KEY_THREE: 51;
/** Key: 4 */
export declare const KEY_FOUR: 52;
/** Key: 5 */
export declare const KEY_FIVE: 53;
/** Key: 6 */
export declare const KEY_SIX: 54;
/** Key: 7 */
export declare const KEY_SEVEN: 55;
/** Key: 8 */
export declare const KEY_EIGHT: 56;
/** Key: 9 */
export declare const KEY_NINE: 57;
/** Key: ; */
export declare const KEY_SEMICOLON: 59;
/** Key: = */
export declare const KEY_EQUAL: 61;
/** Key: A | a */
export declare const KEY_A: 65;
/** Key: B | b */
export declare const KEY_B: 66;
/** Key: C | c */
export declare const KEY_C: 67;
/** Key: D | d */
export declare const KEY_D: 68;
/** Key: E | e */
export declare const KEY_E: 69;
/** Key: F | f */
export declare const KEY_F: 70;
/** Key: G | g */
export declare const KEY_G: 71;
/** Key: H | h */
export declare const KEY_H: 72;
/** Key: I | i */
export declare const KEY_I: 73;
/** Key: J | j */
export declare const KEY_J: 74;
/** Key: K | k */
export declare const KEY_K: 75;
/** Key: L | l */
export declare const KEY_L: 76;
/** Key: M | m */
export declare const KEY_M: 77;
/** Key: N | n */
export declare const KEY_N: 78;
/** Key: O | o */
export declare const KEY_O: 79;
/** Key: P | p */
export declare const KEY_P: 80;
/** Key: Q | q */
export declare const KEY_Q: 81;
/** Key: R | r */
export declare const KEY_R: 82;
/** Key: S | s */
export declare const KEY_S: 83;
/** Key: T | t */
export declare const KEY_T: 84;
/** Key: U | u */
export declare const KEY_U: 85;
/** Key: V | v */
export declare const KEY_V: 86;
/** Key: W | w */
export declare const KEY_W: 87;
/** Key: X | x */
export declare const KEY_X: 88;
/** Key: Y | y */
export declare const KEY_Y: 89;
/** Key: Z | z */
export declare const KEY_Z: 90;
/** Key: [ */
export declare const KEY_LEFT_BRACKET: 91;
/** Key: '\' */
export declare const KEY_BACKSLASH: 92;
/** Key: ] */
export declare const KEY_RIGHT_BRACKET: 93;
/** Key: ` */
export declare const KEY_GRAVE: 96;
/** Key: Space */
export declare const KEY_SPACE: 32;
/** Key: Esc */
export declare const KEY_ESCAPE: 256;
/** Key: Enter */
export declare const KEY_ENTER: 257;
/** Key: Tab */
export declare const KEY_TAB: 258;
/** Key: Backspace */
export declare const KEY_BACKSPACE: 259;
/** Key: Ins */
export declare const KEY_INSERT: 260;
/** Key: Del */
export declare const KEY_DELETE: 261;
/** Key: Cursor right */
export declare const KEY_RIGHT: 262;
/** Key: Cursor left */
export declare const KEY_LEFT: 263;
/** Key: Cursor down */
export declare const KEY_DOWN: 264;
/** Key: Cursor up */
export declare const KEY_UP: 265;
/** Key: Page up */
export declare const KEY_PAGE_UP: 266;
/** Key: Page down */
export declare const KEY_PAGE_DOWN: 267;
/** Key: Home */
export declare const KEY_HOME: 268;
/** Key: End */
export declare const KEY_END: 269;
/** Key: Caps lock */
export declare const KEY_CAPS_LOCK: 280;
/** Key: Scroll down */
export declare const KEY_SCROLL_LOCK: 281;
/** Key: Num lock */
export declare const KEY_NUM_LOCK: 282;
/** Key: Print screen */
export declare const KEY_PRINT_SCREEN: 283;
/** Key: Pause */
export declare const KEY_PAUSE: 284;
/** Key: F1 */
export declare const KEY_F1: 290;
/** Key: F2 */
export declare const KEY_F2: 291;
/** Key: F3 */
export declare const KEY_F3: 292;
/** Key: F4 */
export declare const KEY_F4: 293;
/** Key: F5 */
export declare const KEY_F5: 294;
/** Key: F6 */
export declare const KEY_F6: 295;
/** Key: F7 */
export declare const KEY_F7: 296;
/** Key: F8 */
export declare const KEY_F8: 297;
/** Key: F9 */
export declare const KEY_F9: 298;
/** Key: F10 */
export declare const KEY_F10: 299;
/** Key: F11 */
export declare const KEY_F11: 300;
/** Key: F12 */
export declare const KEY_F12: 301;
/** Key: Shift left */
export declare const KEY_LEFT_SHIFT: 340;
/** Key: Control left */
export declare const KEY_LEFT_CONTROL: 341;
/** Key: Alt left */
export declare const KEY_LEFT_ALT: 342;
/** Key: Super left */
export declare const KEY_LEFT_SUPER: 343;
/** Key: Shift right */
export declare const KEY_RIGHT_SHIFT: 344;
/** Key: Control right */
export declare const KEY_RIGHT_CONTROL: 345;
/** Key: Alt right */
export declare const KEY_RIGHT_ALT: 346;
/** Key: Super right */
export declare const KEY_RIGHT_SUPER: 347;
/** Key: KB menu */
export declare const KEY_KB_MENU: 348;
/** Key: Keypad 0 */
export declare const KEY_KP_0: 320;
/** Key: Keypad 1 */
export declare const KEY_KP_1: 321;
/** Key: Keypad 2 */
export declare const KEY_KP_2: 322;
/** Key: Keypad 3 */
export declare const KEY_KP_3: 323;
/** Key: Keypad 4 */
export declare const KEY_KP_4: 324;
/** Key: Keypad 5 */
export declare const KEY_KP_5: 325;
/** Key: Keypad 6 */
export declare const KEY_KP_6: 326;
/** Key: Keypad 7 */
export declare const KEY_KP_7: 327;
/** Key: Keypad 8 */
export declare const KEY_KP_8: 328;
/** Key: Keypad 9 */
export declare const KEY_KP_9: 329;
/** Key: Keypad . */
export declare const KEY_KP_DECIMAL: 330;
/** Key: Keypad / */
export declare const KEY_KP_DIVIDE: 331;
/** Key: Keypad * */
export declare const KEY_KP_MULTIPLY: 332;
/** Key: Keypad - */
export declare const KEY_KP_SUBTRACT: 333;
/** Key: Keypad + */
export declare const KEY_KP_ADD: 334;
/** Key: Keypad Enter */
export declare const KEY_KP_ENTER: 335;
/** Key: Keypad = */
export declare const KEY_KP_EQUAL: 336;
/** Key: Android back button */
export declare const KEY_BACK: 4;
/** Key: Android menu button */
export declare const KEY_MENU: 5;
/** Key: Android volume up button */
export declare const KEY_VOLUME_UP: 24;
/** Key: Android volume down button */
export declare const KEY_VOLUME_DOWN: 25;

/** Mouse button left */
export declare const MOUSE_BUTTON_LEFT: 0;
/** Mouse button right */
export declare const MOUSE_BUTTON_RIGHT: 1;
/** Mouse button middle (pressed wheel) */
export declare const MOUSE_BUTTON_MIDDLE: 2;
/** Mouse button side (advanced mouse device) */
export declare const MOUSE_BUTTON_SIDE: 3;
/** Mouse button extra (advanced mouse device) */
export declare const MOUSE_BUTTON_EXTRA: 4;
/** Mouse button forward (advanced mouse device) */
export declare const MOUSE_BUTTON_FORWARD: 5;
/** Mouse button back (advanced mouse device) */
export declare const MOUSE_BUTTON_BACK: 6;

/** Default pointer shape */
export declare const MOUSE_CURSOR_DEFAULT: 0;
/** Arrow shape */
export declare const MOUSE_CURSOR_ARROW: 1;
/** Text writing cursor shape */
export declare const MOUSE_CURSOR_IBEAM: 2;
/** Cross shape */
export declare const MOUSE_CURSOR_CROSSHAIR: 3;
/** Pointing hand cursor */
export declare const MOUSE_CURSOR_POINTING_HAND: 4;
/** Horizontal resize/move arrow shape */
export declare const MOUSE_CURSOR_RESIZE_EW: 5;
/** Vertical resize/move arrow shape */
export declare const MOUSE_CURSOR_RESIZE_NS: 6;
/** Top-left to bottom-right diagonal resize/move arrow shape */
export declare const MOUSE_CURSOR_RESIZE_NWSE: 7;
/** The top-right to bottom-left diagonal resize/move arrow shape */
export declare const MOUSE_CURSOR_RESIZE_NESW: 8;
/** The omnidirectional resize/move cursor shape */
export declare const MOUSE_CURSOR_RESIZE_ALL: 9;
/** The operation-not-allowed shape */
export declare const MOUSE_CURSOR_NOT_ALLOWED: 10;

/** Unknown button, for error checking */
export declare const GAMEPAD_BUTTON_UNKNOWN: 0;
/** Gamepad left DPAD up button */
export declare const GAMEPAD_BUTTON_LEFT_FACE_UP: 1;
/** Gamepad left DPAD right button */
export declare const GAMEPAD_BUTTON_LEFT_FACE_RIGHT: 2;
/** Gamepad left DPAD down button */
export declare const GAMEPAD_BUTTON_LEFT_FACE_DOWN: 3;
/** Gamepad left DPAD left button */
export declare const GAMEPAD_BUTTON_LEFT_FACE_LEFT: 4;
/** Gamepad right button up (i.e. PS3: Triangle, Xbox: Y) */
export declare const GAMEPAD_BUTTON_RIGHT_FACE_UP: 5;
/** Gamepad right button right (i.e. PS3: Circle, Xbox: B) */
export declare const GAMEPAD_BUTTON_RIGHT_FACE_RIGHT: 6;
/** Gamepad right button down (i.e. PS3: Cross, Xbox: A) */
export declare const GAMEPAD_BUTTON_RIGHT_FACE_DOWN: 7;
/** Gamepad right button left (i.e. PS3: Square, Xbox: X) */
export declare const GAMEPAD_BUTTON_RIGHT_FACE_LEFT: 8;
/** Gamepad top/back trigger left (first), it could be a trailing button */
export declare const GAMEPAD_BUTTON_LEFT_TRIGGER_1: 9;
/** Gamepad top/back trigger left (second), it could be a trailing button */
export declare const GAMEPAD_BUTTON_LEFT_TRIGGER_2: 10;
/** Gamepad top/back trigger right (first), it could be a trailing button */
export declare const GAMEPAD_BUTTON_RIGHT_TRIGGER_1: 11;
/** Gamepad top/back trigger right (second), it could be a trailing button */
export declare const GAMEPAD_BUTTON_RIGHT_TRIGGER_2: 12;
/** Gamepad center buttons, left one (i.e. PS3: Select) */
export declare const GAMEPAD_BUTTON_MIDDLE_LEFT: 13;
/** Gamepad center buttons, middle one (i.e. PS3: PS, Xbox: XBOX) */
export declare const GAMEPAD_BUTTON_MIDDLE: 14;
/** Gamepad center buttons, right one (i.e. PS3: Start) */
export declare const GAMEPAD_BUTTON_MIDDLE_RIGHT: 15;
/** Gamepad joystick pressed button left */
export declare const GAMEPAD_BUTTON_LEFT_THUMB: 16;
/** Gamepad joystick pressed button right */
export declare const GAMEPAD_BUTTON_RIGHT_THUMB: 17;

/** Gamepad left stick X axis */
export declare const GAMEPAD_AXIS_LEFT_X: 0;
/** Gamepad left stick Y axis */
export declare const GAMEPAD_AXIS_LEFT_Y: 1;
/** Gamepad right stick X axis */
export declare const GAMEPAD_AXIS_RIGHT_X: 2;
/** Gamepad right stick Y axis */
export declare const GAMEPAD_AXIS_RIGHT_Y: 3;
/** Gamepad back trigger left, pressure level: [1..-1] */
export declare const GAMEPAD_AXIS_LEFT_TRIGGER: 4;
/** Gamepad back trigger right, pressure level: [1..-1] */
export declare const GAMEPAD_AXIS_RIGHT_TRIGGER: 5;

/** Albedo material (same as: MATERIAL_MAP_DIFFUSE) */
export declare const MATERIAL_MAP_ALBEDO: 0;
/** Metalness material (same as: MATERIAL_MAP_SPECULAR) */
export declare const MATERIAL_MAP_METALNESS: 1;
/** Normal material */
export declare const MATERIAL_MAP_NORMAL: 2;
/** Roughness material */
export declare const MATERIAL_MAP_ROUGHNESS: 3;
/** Ambient occlusion material */
export declare const MATERIAL_MAP_OCCLUSION: 4;
/** Emission material */
export declare const MATERIAL_MAP_EMISSION: 5;
/** Heightmap material */
export declare const MATERIAL_MAP_HEIGHT: 6;
/** Cubemap material (NOTE: Uses GL_TEXTURE_CUBE_MAP) */
export declare const MATERIAL_MAP_CUBEMAP: 7;
/** Irradiance material (NOTE: Uses GL_TEXTURE_CUBE_MAP) */
export declare const MATERIAL_MAP_IRRADIANCE: 8;
/** Prefilter material (NOTE: Uses GL_TEXTURE_CUBE_MAP) */
export declare const MATERIAL_MAP_PREFILTER: 9;
/** Brdf material */
export declare const MATERIAL_MAP_BRDF: 10;

/** Shader location: vertex attribute: position */
export declare const SHADER_LOC_VERTEX_POSITION: 0;
/** Shader location: vertex attribute: texcoord01 */
export declare const SHADER_LOC_VERTEX_TEXCOORD01: 1;
/** Shader location: vertex attribute: texcoord02 */
export declare const SHADER_LOC_VERTEX_TEXCOORD02: 2;
/** Shader location: vertex attribute: normal */
export declare const SHADER_LOC_VERTEX_NORMAL: 3;
/** Shader location: vertex attribute: tangent */
export declare const SHADER_LOC_VERTEX_TANGENT: 4;
/** Shader location: vertex attribute: color */
export declare const SHADER_LOC_VERTEX_COLOR: 5;
/** Shader location: matrix uniform: model-view-projection */
export declare const SHADER_LOC_MATRIX_MVP: 6;
/** Shader location: matrix uniform: view (camera transform) */
export declare const SHADER_LOC_MATRIX_VIEW: 7;
/** Shader location: matrix uniform: projection */
export declare const SHADER_LOC_MATRIX_PROJECTION: 8;
/** Shader location: matrix uniform: model (transform) */
export declare const SHADER_LOC_MATRIX_MODEL: 9;
/** Shader location: matrix uniform: normal */
export declare const SHADER_LOC_MATRIX_NORMAL: 10;
/** Shader location: vector uniform: view */
export declare const SHADER_LOC_VECTOR_VIEW: 11;
/** Shader location: vector uniform: diffuse color */
export declare const SHADER_LOC_COLOR_DIFFUSE: 12;
/** Shader location: vector uniform: specular color */
export declare const SHADER_LOC_COLOR_SPECULAR: 13;
/** Shader location: vector uniform: ambient color */
export declare const SHADER_LOC_COLOR_AMBIENT: 14;
/** Shader location: sampler2d texture: albedo (same as: SHADER_LOC_MAP_DIFFUSE) */
export declare const SHADER_LOC_MAP_ALBEDO: 15;
/** Shader location: sampler2d texture: metalness (same as: SHADER_LOC_MAP_SPECULAR) */
export declare const SHADER_LOC_MAP_METALNESS: 16;
/** Shader location: sampler2d texture: normal */
export declare const SHADER_LOC_MAP_NORMAL: 17;
/** Shader location: sampler2d texture: roughness */
export declare const SHADER_LOC_MAP_ROUGHNESS: 18;
/** Shader location: sampler2d texture: occlusion */
export declare const SHADER_LOC_MAP_OCCLUSION: 19;
/** Shader location: sampler2d texture: emission */
export declare const SHADER_LOC_MAP_EMISSION: 20;
/** Shader location: sampler2d texture: heightmap */
export declare const SHADER_LOC_MAP_HEIGHT: 21;
/** Shader location: samplerCube texture: cubemap */
export declare const SHADER_LOC_MAP_CUBEMAP: 22;
/** Shader location: samplerCube texture: irradiance */
export declare const SHADER_LOC_MAP_IRRADIANCE: 23;
/** Shader location: samplerCube texture: prefilter */
export declare const SHADER_LOC_MAP_PREFILTER: 24;
/** Shader location: sampler2d texture: brdf */
export declare const SHADER_LOC_MAP_BRDF: 25;
/** Shader location: vertex attribute: bone indices */
export declare const SHADER_LOC_VERTEX_BONEIDS: 26;
/** Shader location: vertex attribute: bone weights */
export declare const SHADER_LOC_VERTEX_BONEWEIGHTS: 27;
/** Shader location: matrix attribute: bone transforms (animation) */
export declare const SHADER_LOC_MATRIX_BONETRANSFORMS: 28;
/** Shader location: vertex attribute: instance transforms */
export declare const SHADER_LOC_VERTEX_INSTANCETRANSFORM: 29;

/** Shader uniform type: float */
export declare const SHADER_UNIFORM_FLOAT: 0;
/** Shader uniform type: vec2 (2 float) */
export declare const SHADER_UNIFORM_VEC2: 1;
/** Shader uniform type: vec3 (3 float) */
export declare const SHADER_UNIFORM_VEC3: 2;
/** Shader uniform type: vec4 (4 float) */
export declare const SHADER_UNIFORM_VEC4: 3;
/** Shader uniform type: int */
export declare const SHADER_UNIFORM_INT: 4;
/** Shader uniform type: ivec2 (2 int) */
export declare const SHADER_UNIFORM_IVEC2: 5;
/** Shader uniform type: ivec3 (3 int) */
export declare const SHADER_UNIFORM_IVEC3: 6;
/** Shader uniform type: ivec4 (4 int) */
export declare const SHADER_UNIFORM_IVEC4: 7;
/** Shader uniform type: unsigned int */
export declare const SHADER_UNIFORM_UINT: 8;
/** Shader uniform type: uivec2 (2 unsigned int) */
export declare const SHADER_UNIFORM_UIVEC2: 9;
/** Shader uniform type: uivec3 (3 unsigned int) */
export declare const SHADER_UNIFORM_UIVEC3: 10;
/** Shader uniform type: uivec4 (4 unsigned int) */
export declare const SHADER_UNIFORM_UIVEC4: 11;
/** Shader uniform type: sampler2d */
export declare const SHADER_UNIFORM_SAMPLER2D: 12;

/** Shader attribute type: float */
export declare const SHADER_ATTRIB_FLOAT: 0;
/** Shader attribute type: vec2 (2 float) */
export declare const SHADER_ATTRIB_VEC2: 1;
/** Shader attribute type: vec3 (3 float) */
export declare const SHADER_ATTRIB_VEC3: 2;
/** Shader attribute type: vec4 (4 float) */
export declare const SHADER_ATTRIB_VEC4: 3;

/** 8 bit per pixel (no alpha) */
export declare const PIXELFORMAT_UNCOMPRESSED_GRAYSCALE: 1;
/** 8*2 bpp (2 channels) */
export declare const PIXELFORMAT_UNCOMPRESSED_GRAY_ALPHA: 2;
/** 16 bpp */
export declare const PIXELFORMAT_UNCOMPRESSED_R5G6B5: 3;
/** 24 bpp */
export declare const PIXELFORMAT_UNCOMPRESSED_R8G8B8: 4;
/** 16 bpp (1 bit alpha) */
export declare const PIXELFORMAT_UNCOMPRESSED_R5G5B5A1: 5;
/** 16 bpp (4 bit alpha) */
export declare const PIXELFORMAT_UNCOMPRESSED_R4G4B4A4: 6;
/** 32 bpp */
export declare const PIXELFORMAT_UNCOMPRESSED_R8G8B8A8: 7;
/** 32 bpp (1 channel - float) */
export declare const PIXELFORMAT_UNCOMPRESSED_R32: 8;
/** 32*3 bpp (3 channels - float) */
export declare const PIXELFORMAT_UNCOMPRESSED_R32G32B32: 9;
/** 32*4 bpp (4 channels - float) */
export declare const PIXELFORMAT_UNCOMPRESSED_R32G32B32A32: 10;
/** 16 bpp (1 channel - half float) */
export declare const PIXELFORMAT_UNCOMPRESSED_R16: 11;
/** 16*3 bpp (3 channels - half float) */
export declare const PIXELFORMAT_UNCOMPRESSED_R16G16B16: 12;
/** 16*4 bpp (4 channels - half float) */
export declare const PIXELFORMAT_UNCOMPRESSED_R16G16B16A16: 13;
/** 4 bpp (no alpha) */
export declare const PIXELFORMAT_COMPRESSED_DXT1_RGB: 14;
/** 4 bpp (1 bit alpha) */
export declare const PIXELFORMAT_COMPRESSED_DXT1_RGBA: 15;
/** 8 bpp */
export declare const PIXELFORMAT_COMPRESSED_DXT3_RGBA: 16;
/** 8 bpp */
export declare const PIXELFORMAT_COMPRESSED_DXT5_RGBA: 17;
/** 4 bpp */
export declare const PIXELFORMAT_COMPRESSED_ETC1_RGB: 18;
/** 4 bpp */
export declare const PIXELFORMAT_COMPRESSED_ETC2_RGB: 19;
/** 8 bpp */
export declare const PIXELFORMAT_COMPRESSED_ETC2_EAC_RGBA: 20;
/** 4 bpp */
export declare const PIXELFORMAT_COMPRESSED_PVRT_RGB: 21;
/** 4 bpp */
export declare const PIXELFORMAT_COMPRESSED_PVRT_RGBA: 22;
/** 8 bpp */
export declare const PIXELFORMAT_COMPRESSED_ASTC_4x4_RGBA: 23;
/** 2 bpp */
export declare const PIXELFORMAT_COMPRESSED_ASTC_8x8_RGBA: 24;

/** No filter, pixel approximation */
export declare const TEXTURE_FILTER_POINT: 0;
/** Linear filtering */
export declare const TEXTURE_FILTER_BILINEAR: 1;
/** Trilinear filtering (linear with mipmaps) */
export declare const TEXTURE_FILTER_TRILINEAR: 2;
/** Anisotropic filtering 4x */
export declare const TEXTURE_FILTER_ANISOTROPIC_4X: 3;
/** Anisotropic filtering 8x */
export declare const TEXTURE_FILTER_ANISOTROPIC_8X: 4;
/** Anisotropic filtering 16x */
export declare const TEXTURE_FILTER_ANISOTROPIC_16X: 5;

/** Repeats texture in tiled mode */
export declare const TEXTURE_WRAP_REPEAT: 0;
/** Clamps texture to edge pixel in tiled mode */
export declare const TEXTURE_WRAP_CLAMP: 1;
/** Mirrors and repeats the texture in tiled mode */
export declare const TEXTURE_WRAP_MIRROR_REPEAT: 2;
/** Mirrors and clamps to border the texture in tiled mode */
export declare const TEXTURE_WRAP_MIRROR_CLAMP: 3;

/** Automatically detect layout type */
export declare const CUBEMAP_LAYOUT_AUTO_DETECT: 0;
/** Layout is defined by a vertical line with faces */
export declare const CUBEMAP_LAYOUT_LINE_VERTICAL: 1;
/** Layout is defined by a horizontal line with faces */
export declare const CUBEMAP_LAYOUT_LINE_HORIZONTAL: 2;
/** Layout is defined by a 3x4 cross with cubemap faces */
export declare const CUBEMAP_LAYOUT_CROSS_THREE_BY_FOUR: 3;
/** Layout is defined by a 4x3 cross with cubemap faces */
export declare const CUBEMAP_LAYOUT_CROSS_FOUR_BY_THREE: 4;

/** Default font generation, anti-aliased */
export declare const FONT_DEFAULT: 0;
/** Bitmap font generation, no anti-aliasing */
export declare const FONT_BITMAP: 1;
/** SDF font generation, requires external shader */
export declare const FONT_SDF: 2;

/** Blend textures considering alpha (default) */
export declare const BLEND_ALPHA: 0;
/** Blend textures adding colors */
export declare const BLEND_ADDITIVE: 1;
/** Blend textures multiplying colors */
export declare const BLEND_MULTIPLIED: 2;
/** Blend textures adding colors (alternative) */
export declare const BLEND_ADD_COLORS: 3;
/** Blend textures subtracting colors (alternative) */
export declare const BLEND_SUBTRACT_COLORS: 4;
/** Blend premultiplied textures considering alpha */
export declare const BLEND_ALPHA_PREMULTIPLY: 5;
/** Blend textures using custom src/dst factors (use rlSetBlendFactors()) */
export declare const BLEND_CUSTOM: 6;
/** Blend textures using custom rgb/alpha separate src/dst factors (use rlSetBlendFactorsSeparate()) */
export declare const BLEND_CUSTOM_SEPARATE: 7;

/** No gesture */
export declare const GESTURE_NONE: 0;
/** Tap gesture */
export declare const GESTURE_TAP: 1;
/** Double tap gesture */
export declare const GESTURE_DOUBLETAP: 2;
/** Hold gesture */
export declare const GESTURE_HOLD: 4;
/** Drag gesture */
export declare const GESTURE_DRAG: 8;
/** Swipe right gesture */
export declare const GESTURE_SWIPE_RIGHT: 16;
/** Swipe left gesture */
export declare const GESTURE_SWIPE_LEFT: 32;
/** Swipe up gesture */
export declare const GESTURE_SWIPE_UP: 64;
/** Swipe down gesture */
export declare const GESTURE_SWIPE_DOWN: 128;
/** Pinch in gesture */
export declare const GESTURE_PINCH_IN: 256;
/** Pinch out gesture */
export declare const GESTURE_PINCH_OUT: 512;

/** Camera custom, controlled by user (UpdateCamera() does nothing) */
export declare const CAMERA_CUSTOM: 0;
/** Camera free mode */
export declare const CAMERA_FREE: 1;
/** Camera orbital, around target, zoom supported */
export declare const CAMERA_ORBITAL: 2;
/** Camera first person */
export declare const CAMERA_FIRST_PERSON: 3;
/** Camera third person */
export declare const CAMERA_THIRD_PERSON: 4;

/** Perspective projection */
export declare const CAMERA_PERSPECTIVE: 0;
/** Orthographic projection */
export declare const CAMERA_ORTHOGRAPHIC: 1;

/** Npatch layout: 3x3 tiles */
export declare const NPATCH_NINE_PATCH: 0;
/** Npatch layout: 1x3 tiles */
export declare const NPATCH_THREE_PATCH_VERTICAL: 1;
/** Npatch layout: 3x1 tiles */
export declare const NPATCH_THREE_PATCH_HORIZONTAL: 2;

export declare const RAYLIB_VERSION_MAJOR: 6;
export declare const RAYLIB_VERSION_MINOR: 0;
export declare const RAYLIB_VERSION_PATCH: 0;
export declare const RAYLIB_VERSION: "6.0";
export declare const PI: 3.141592653589793;
export declare const DEG2RAD: number;
export declare const RAD2DEG: number;
/** Light Gray */
export declare const LIGHTGRAY: ColorValue;
/** Gray */
export declare const GRAY: ColorValue;
/** Dark Gray */
export declare const DARKGRAY: ColorValue;
/** Yellow */
export declare const YELLOW: ColorValue;
/** Gold */
export declare const GOLD: ColorValue;
/** Orange */
export declare const ORANGE: ColorValue;
/** Pink */
export declare const PINK: ColorValue;
/** Red */
export declare const RED: ColorValue;
/** Maroon */
export declare const MAROON: ColorValue;
/** Green */
export declare const GREEN: ColorValue;
/** Lime */
export declare const LIME: ColorValue;
/** Dark Green */
export declare const DARKGREEN: ColorValue;
/** Sky Blue */
export declare const SKYBLUE: ColorValue;
/** Blue */
export declare const BLUE: ColorValue;
/** Dark Blue */
export declare const DARKBLUE: ColorValue;
/** Purple */
export declare const PURPLE: ColorValue;
/** Violet */
export declare const VIOLET: ColorValue;
/** Dark Purple */
export declare const DARKPURPLE: ColorValue;
/** Beige */
export declare const BEIGE: ColorValue;
/** Brown */
export declare const BROWN: ColorValue;
/** Dark Brown */
export declare const DARKBROWN: ColorValue;
/** White */
export declare const WHITE: ColorValue;
/** Black */
export declare const BLACK: ColorValue;
/** Blank (Transparent) */
export declare const BLANK: ColorValue;
/** Magenta */
export declare const MAGENTA: ColorValue;
/** My own White (raylib logo) */
export declare const RAYWHITE: ColorValue;

/** Initialize window and OpenGL context */
export declare function InitWindow(width: number, height: number, title: string): void;

/** Close window and unload OpenGL context */
export declare function CloseWindow(): void;

/** Check if application should close (KEY_ESCAPE pressed or windows close icon clicked) */
export declare function WindowShouldClose(): boolean;

/** Check if window has been initialized successfully */
export declare function IsWindowReady(): boolean;

/** Check if window is currently fullscreen */
export declare function IsWindowFullscreen(): boolean;

/** Check if window is currently hidden */
export declare function IsWindowHidden(): boolean;

/** Check if window is currently minimized */
export declare function IsWindowMinimized(): boolean;

/** Check if window is currently maximized */
export declare function IsWindowMaximized(): boolean;

/** Check if window is currently focused */
export declare function IsWindowFocused(): boolean;

/** Check if window has been resized last frame */
export declare function IsWindowResized(): boolean;

/** Check if one specific window flag is enabled */
export declare function IsWindowState(flag: number): boolean;

/** Set window configuration state using flags */
export declare function SetWindowState(flags: number): void;

/** Clear window configuration state flags */
export declare function ClearWindowState(flags: number): void;

/** Toggle window state: fullscreen/windowed, resizes monitor to match window resolution */
export declare function ToggleFullscreen(): void;

/** Toggle window state: borderless windowed, resizes window to match monitor resolution */
export declare function ToggleBorderlessWindowed(): void;

/** Set window state: maximized, if resizable */
export declare function MaximizeWindow(): void;

/** Set window state: minimized, if resizable */
export declare function MinimizeWindow(): void;

/** Restore window from being minimized/maximized */
export declare function RestoreWindow(): void;

/** Set icon for window (single image, RGBA 32bit) */
export declare function SetWindowIcon(image: ImageValue): void;

/** Set icon for window (multiple images, RGBA 32bit) */
export declare function SetWindowIcons(images: FFIPointerInput, count: number): void;

/** Set title for window */
export declare function SetWindowTitle(title: string): void;

/** Set window position on screen */
export declare function SetWindowPosition(x: number, y: number): void;

/** Set monitor for the current window */
export declare function SetWindowMonitor(monitor: number): void;

/** Set window minimum dimensions (for FLAG_WINDOW_RESIZABLE) */
export declare function SetWindowMinSize(width: number, height: number): void;

/** Set window maximum dimensions (for FLAG_WINDOW_RESIZABLE) */
export declare function SetWindowMaxSize(width: number, height: number): void;

/** Set window dimensions */
export declare function SetWindowSize(width: number, height: number): void;

/** Set window opacity [0.0f..1.0f] */
export declare function SetWindowOpacity(opacity: number): void;

/** Set window focused */
export declare function SetWindowFocused(): void;

/** Get native window handle */
export declare function GetWindowHandle(): FFIPointer;

/** Get current screen width */
export declare function GetScreenWidth(): number;

/** Get current screen height */
export declare function GetScreenHeight(): number;

/** Get current render width (it considers HiDPI) */
export declare function GetRenderWidth(): number;

/** Get current render height (it considers HiDPI) */
export declare function GetRenderHeight(): number;

/** Get number of connected monitors */
export declare function GetMonitorCount(): number;

/** Get current monitor where window is placed */
export declare function GetCurrentMonitor(): number;

/** Get specified monitor position */
export declare function GetMonitorPosition(monitor: number): Vector2Value;

/** Get specified monitor width (current video mode used by monitor) */
export declare function GetMonitorWidth(monitor: number): number;

/** Get specified monitor height (current video mode used by monitor) */
export declare function GetMonitorHeight(monitor: number): number;

/** Get specified monitor physical width in millimetres */
export declare function GetMonitorPhysicalWidth(monitor: number): number;

/** Get specified monitor physical height in millimetres */
export declare function GetMonitorPhysicalHeight(monitor: number): number;

/** Get specified monitor refresh rate */
export declare function GetMonitorRefreshRate(monitor: number): number;

/** Get window position XY on monitor */
export declare function GetWindowPosition(): Vector2Value;

/** Get window scale DPI factor */
export declare function GetWindowScaleDPI(): Vector2Value;

/** Get the human-readable, UTF-8 encoded name of the specified monitor */
export declare function GetMonitorName(monitor: number): string;

/** Set clipboard text content */
export declare function SetClipboardText(text: string): void;

/** Get clipboard text content */
export declare function GetClipboardText(): string;

/** Get clipboard image content */
export declare function GetClipboardImage(): ImageValue;

/** Enable waiting for events on EndDrawing(), no automatic event polling */
export declare function EnableEventWaiting(): void;

/** Disable waiting for events on EndDrawing(), automatic events polling */
export declare function DisableEventWaiting(): void;

/** Shows cursor */
export declare function ShowCursor(): void;

/** Hides cursor */
export declare function HideCursor(): void;

/** Check if cursor is not visible */
export declare function IsCursorHidden(): boolean;

/** Enables cursor (unlock cursor) */
export declare function EnableCursor(): void;

/** Disables cursor (lock cursor) */
export declare function DisableCursor(): void;

/** Check if cursor is on the screen */
export declare function IsCursorOnScreen(): boolean;

/** Set background color (framebuffer clear color) */
export declare function ClearBackground(color: ColorValue): void;

/** Setup canvas (framebuffer) to start drawing */
export declare function BeginDrawing(): void;

/** End canvas drawing and swap buffers (double buffering) */
export declare function EndDrawing(): void;

/** Begin 2D mode with custom camera (2D) */
export declare function BeginMode2D(camera: Camera2DValue): void;

/** Ends 2D mode with custom camera */
export declare function EndMode2D(): void;

/** Begin 3D mode with custom camera (3D) */
export declare function BeginMode3D(camera: Camera3DValue): void;

/** Ends 3D mode and returns to default 2D orthographic mode */
export declare function EndMode3D(): void;

/** Begin drawing to render texture */
export declare function BeginTextureMode(target: RenderTexture2DValue): void;

/** Ends drawing to render texture */
export declare function EndTextureMode(): void;

/** Begin custom shader drawing */
export declare function BeginShaderMode(shader: ShaderValue): void;

/** End custom shader drawing (use default shader) */
export declare function EndShaderMode(): void;

/** Begin blending mode (alpha, additive, multiplied, subtract, custom) */
export declare function BeginBlendMode(mode: number): void;

/** End blending mode (reset to default: alpha blending) */
export declare function EndBlendMode(): void;

/** Begin scissor mode (define screen area for following drawing) */
export declare function BeginScissorMode(x: number, y: number, width: number, height: number): void;

/** End scissor mode */
export declare function EndScissorMode(): void;

/** Begin stereo rendering (requires VR simulator) */
export declare function BeginVrStereoMode(config: VrStereoConfigValue): void;

/** End stereo rendering (requires VR simulator) */
export declare function EndVrStereoMode(): void;

/** Load VR stereo config for VR simulator device parameters */
export declare function LoadVrStereoConfig(device: VrDeviceInfoValue): VrStereoConfigValue;

/** Unload VR stereo config */
export declare function UnloadVrStereoConfig(config: VrStereoConfigValue): void;

/** Load shader from files and bind default locations */
export declare function LoadShader(vsFileName: string, fsFileName: string): ShaderValue;

/** Raw-pointer variant for nullable C string parameters. */
export declare function LoadShaderRaw(vsFileName: FFIPointerInput, fsFileName: FFIPointerInput): ShaderValue;

/** Load shader from code strings and bind default locations */
export declare function LoadShaderFromMemory(vsCode: string, fsCode: string): ShaderValue;

/** Raw-pointer variant for nullable C string parameters. */
export declare function LoadShaderFromMemoryRaw(vsCode: FFIPointerInput, fsCode: FFIPointerInput): ShaderValue;

/** Check if a shader is valid (loaded on GPU) */
export declare function IsShaderValid(shader: ShaderValue): boolean;

/** Get shader uniform location */
export declare function GetShaderLocation(shader: ShaderValue, uniformName: string): number;

/** Get shader attribute location */
export declare function GetShaderLocationAttrib(shader: ShaderValue, attribName: string): number;

/** Set shader uniform value */
export declare function SetShaderValue(shader: ShaderValue, locIndex: number, value: FFIPointerInput, uniformType: number): void;

/** Set shader uniform value vector */
export declare function SetShaderValueV(shader: ShaderValue, locIndex: number, value: FFIPointerInput, uniformType: number, count: number): void;

/** Set shader uniform value (matrix 4x4) */
export declare function SetShaderValueMatrix(shader: ShaderValue, locIndex: number, mat: MatrixValue): void;

/** Set shader uniform value and bind the texture (sampler2d) */
export declare function SetShaderValueTexture(shader: ShaderValue, locIndex: number, texture: Texture2DValue): void;

/** Unload shader from GPU memory (VRAM) */
export declare function UnloadShader(shader: ShaderValue): void;

/** Get a ray trace from screen position (i.e mouse) */
export declare function GetScreenToWorldRay(position: Vector2Value, camera: CameraValue): RayValue;

/** Get a ray trace from screen position (i.e mouse) in a viewport */
export declare function GetScreenToWorldRayEx(position: Vector2Value, camera: CameraValue, width: number, height: number): RayValue;

/** Get the screen space position for a 3d world space position */
export declare function GetWorldToScreen(position: Vector3Value, camera: CameraValue): Vector2Value;

/** Get size position for a 3d world space position */
export declare function GetWorldToScreenEx(position: Vector3Value, camera: CameraValue, width: number, height: number): Vector2Value;

/** Get the screen space position for a 2d camera world space position */
export declare function GetWorldToScreen2D(position: Vector2Value, camera: Camera2DValue): Vector2Value;

/** Get the world space position for a 2d camera screen space position */
export declare function GetScreenToWorld2D(position: Vector2Value, camera: Camera2DValue): Vector2Value;

/** Get camera transform matrix (view matrix) */
export declare function GetCameraMatrix(camera: CameraValue): MatrixValue;

/** Get camera 2d transform matrix */
export declare function GetCameraMatrix2D(camera: Camera2DValue): MatrixValue;

/** Set target FPS (maximum) */
export declare function SetTargetFPS(fps: number): void;

/** Get time in seconds for last frame drawn (delta time) */
export declare function GetFrameTime(): number;

/** Get elapsed time in seconds since InitWindow() */
export declare function GetTime(): number;

/** Get current FPS */
export declare function GetFPS(): number;

/** Swap back buffer with front buffer (screen drawing) */
export declare function SwapScreenBuffer(): void;

/** Register all input events */
export declare function PollInputEvents(): void;

/** Wait for some time (halt program execution) */
export declare function WaitTime(seconds: number): void;

/** Set the seed for the random number generator */
export declare function SetRandomSeed(seed: number): void;

/** Get a random value between min and max (both included) */
export declare function GetRandomValue(min: number, max: number): number;

/** Load random values sequence, no values repeated */
export declare function LoadRandomSequence(count: number, min: number, max: number): FFIPointer;

/** Unload random values sequence */
export declare function UnloadRandomSequence(sequence: FFIPointerInput): void;

/** Takes a screenshot of current screen (filename extension defines format) */
export declare function TakeScreenshot(fileName: string): void;

/** Setup init configuration flags (view FLAGS) */
export declare function SetConfigFlags(flags: number): void;

/** Open URL with default system browser (if available) */
export declare function OpenURL(url: string): void;

/** Set the current threshold (minimum) log level */
export declare function SetTraceLogLevel(logLevel: number): void;

/** Set custom trace log */
export declare function SetTraceLogCallback(callback: FFIPointerInput): void;

/** Internal memory allocator */
export declare function MemAlloc(size: number): FFIPointer;

/** Internal memory reallocator */
export declare function MemRealloc(ptr: FFIPointerInput, size: number): FFIPointer;

/** Internal memory free */
export declare function MemFree(ptr: FFIPointerInput): void;

/** Load file data as byte array (read) */
export declare function LoadFileData(fileName: string, dataSize: FFIPointerInput): FFIPointer;

/** Unload file data allocated by LoadFileData() */
export declare function UnloadFileData(data: FFIPointerInput): void;

/** Save data to file from byte array (write), returns true on success */
export declare function SaveFileData(fileName: string, data: FFIPointerInput, dataSize: number): boolean;

/** Export data to code (.h), returns true on success */
export declare function ExportDataAsCode(data: FFIPointerInput, dataSize: number, fileName: string): boolean;

/** Load text data from file (read), returns a '\0' terminated string */
export declare function LoadFileText(fileName: string): FFIPointer;

/** Unload file text data allocated by LoadFileText() */
export declare function UnloadFileText(text: FFIPointerInput): void;

/** Save text data to file (write), string must be '\0' terminated, returns true on success */
export declare function SaveFileText(fileName: string, text: string): boolean;

/** Set custom file binary data loader */
export declare function SetLoadFileDataCallback(callback: FFIPointerInput): void;

/** Set custom file binary data saver */
export declare function SetSaveFileDataCallback(callback: FFIPointerInput): void;

/** Set custom file text data loader */
export declare function SetLoadFileTextCallback(callback: FFIPointerInput): void;

/** Set custom file text data saver */
export declare function SetSaveFileTextCallback(callback: FFIPointerInput): void;

/** Rename file (if exists) */
export declare function FileRename(fileName: string, fileRename: string): number;

/** Remove file (if exists) */
export declare function FileRemove(fileName: string): number;

/** Copy file from one path to another, dstPath created if it doesn't exist */
export declare function FileCopy(srcPath: string, dstPath: string): number;

/** Move file from one directory to another, dstPath created if it doesn't exist */
export declare function FileMove(srcPath: string, dstPath: string): number;

/** Replace text in an existing file */
export declare function FileTextReplace(fileName: string, search: string, replacement: string): number;

/** Find text in existing file */
export declare function FileTextFindIndex(fileName: string, search: string): number;

/** Check if file exists */
export declare function FileExists(fileName: string): boolean;

/** Check if a directory path exists */
export declare function DirectoryExists(dirPath: string): boolean;

/** Check file extension (recommended include point: .png, .wav) */
export declare function IsFileExtension(fileName: string, ext: string): boolean;

/** Get file length in bytes (NOTE: GetFileSize() conflicts with windows.h) */
export declare function GetFileLength(fileName: string): number;

/** Get file modification time (last write time) */
export declare function GetFileModTime(fileName: string): number;

/** Get pointer to extension for a filename string (includes dot: '.png') */
export declare function GetFileExtension(fileName: string): string;

/** Get pointer to filename for a path string */
export declare function GetFileName(filePath: string): string;

/** Get filename string without extension (uses static string) */
export declare function GetFileNameWithoutExt(filePath: string): string;

/** Get full path for a given fileName with path (uses static string) */
export declare function GetDirectoryPath(filePath: string): string;

/** Get previous directory path for a given path (uses static string) */
export declare function GetPrevDirectoryPath(dirPath: string): string;

/** Get current working directory (uses static string) */
export declare function GetWorkingDirectory(): string;

/** Get the directory of the running application (uses static string) */
export declare function GetApplicationDirectory(): string;

/** Create directories (including full path requested), returns 0 on success */
export declare function MakeDirectory(dirPath: string): number;

/** Change working directory, return true on success */
export declare function ChangeDirectory(dirPath: string): boolean;

/** Check if a given path is a file or a directory */
export declare function IsPathFile(path: string): boolean;

/** Check if fileName is valid for the platform/OS */
export declare function IsFileNameValid(fileName: string): boolean;

/** Load directory filepaths, files and directories, no subdirs scan */
export declare function LoadDirectoryFiles(dirPath: string): FilePathListValue;

/** Load directory filepaths with extension filtering and subdir scan; some filters available: "*.*", "FILES*", "DIRS*" */
export declare function LoadDirectoryFilesEx(basePath: string, filter: string, scanSubdirs: boolean): FilePathListValue;

/** Unload filepaths */
export declare function UnloadDirectoryFiles(files: FilePathListValue): void;

/** Check if a file has been dropped into window */
export declare function IsFileDropped(): boolean;

/** Load dropped filepaths */
export declare function LoadDroppedFiles(): FilePathListValue;

/** Unload dropped filepaths */
export declare function UnloadDroppedFiles(files: FilePathListValue): void;

/** Get the file count in a directory */
export declare function GetDirectoryFileCount(dirPath: string): number;

/** Get the file count in a directory with extension filtering and recursive directory scan. Use 'DIR' in the filter string to include directories in the result */
export declare function GetDirectoryFileCountEx(basePath: string, filter: string, scanSubdirs: boolean): number;

/** Compress data (DEFLATE algorithm), memory must be MemFree() */
export declare function CompressData(data: FFIPointerInput, dataSize: number, compDataSize: FFIPointerInput): FFIPointer;

/** Decompress data (DEFLATE algorithm), memory must be MemFree() */
export declare function DecompressData(compData: FFIPointerInput, compDataSize: number, dataSize: FFIPointerInput): FFIPointer;

/** Encode data to Base64 string (includes NULL terminator), memory must be MemFree() */
export declare function EncodeDataBase64(data: FFIPointerInput, dataSize: number, outputSize: FFIPointerInput): FFIPointer;

/** Decode Base64 string (expected NULL terminated), memory must be MemFree() */
export declare function DecodeDataBase64(text: string, outputSize: FFIPointerInput): FFIPointer;

/** Compute CRC32 hash code */
export declare function ComputeCRC32(data: FFIPointerInput, dataSize: number): number;

/** Compute MD5 hash code, returns static int[4] (16 bytes) */
export declare function ComputeMD5(data: FFIPointerInput, dataSize: number): FFIPointer;

/** Compute SHA1 hash code, returns static int[5] (20 bytes) */
export declare function ComputeSHA1(data: FFIPointerInput, dataSize: number): FFIPointer;

/** Compute SHA256 hash code, returns static int[8] (32 bytes) */
export declare function ComputeSHA256(data: FFIPointerInput, dataSize: number): FFIPointer;

/** Load automation events list from file, NULL for empty list, capacity = MAX_AUTOMATION_EVENTS */
export declare function LoadAutomationEventList(fileName: string): AutomationEventListValue;

/** Raw-pointer variant for nullable C string parameters. */
export declare function LoadAutomationEventListRaw(fileName: FFIPointerInput): AutomationEventListValue;

/** Unload automation events list from file */
export declare function UnloadAutomationEventList(list: AutomationEventListValue): void;

/** Export automation events list as text file */
export declare function ExportAutomationEventList(list: AutomationEventListValue, fileName: string): boolean;

/** Set automation event list to record to */
export declare function SetAutomationEventList(list: FFIPointerInput): void;

/** Set automation event internal base frame to start recording */
export declare function SetAutomationEventBaseFrame(frame: number): void;

/** Start recording automation events (AutomationEventList must be set) */
export declare function StartAutomationEventRecording(): void;

/** Stop recording automation events */
export declare function StopAutomationEventRecording(): void;

/** Play a recorded automation event */
export declare function PlayAutomationEvent(event: AutomationEventValue): void;

/** Check if a key has been pressed once */
export declare function IsKeyPressed(key: number): boolean;

/** Check if a key has been pressed again */
export declare function IsKeyPressedRepeat(key: number): boolean;

/** Check if a key is being pressed */
export declare function IsKeyDown(key: number): boolean;

/** Check if a key has been released once */
export declare function IsKeyReleased(key: number): boolean;

/** Check if a key is NOT being pressed */
export declare function IsKeyUp(key: number): boolean;

/** Get key pressed (keycode), call it multiple times for keys queued, returns 0 when the queue is empty */
export declare function GetKeyPressed(): number;

/** Get char pressed (unicode), call it multiple times for chars queued, returns 0 when the queue is empty */
export declare function GetCharPressed(): number;

/** Get name of a QWERTY key on the current keyboard layout (eg returns string 'q' for KEY_A on an AZERTY keyboard) */
export declare function GetKeyName(key: number): string;

/** Set a custom key to exit program (default is ESC) */
export declare function SetExitKey(key: number): void;

/** Check if a gamepad is available */
export declare function IsGamepadAvailable(gamepad: number): boolean;

/** Get gamepad internal name id */
export declare function GetGamepadName(gamepad: number): string;

/** Check if a gamepad button has been pressed once */
export declare function IsGamepadButtonPressed(gamepad: number, button: number): boolean;

/** Check if a gamepad button is being pressed */
export declare function IsGamepadButtonDown(gamepad: number, button: number): boolean;

/** Check if a gamepad button has been released once */
export declare function IsGamepadButtonReleased(gamepad: number, button: number): boolean;

/** Check if a gamepad button is NOT being pressed */
export declare function IsGamepadButtonUp(gamepad: number, button: number): boolean;

/** Get the last gamepad button pressed */
export declare function GetGamepadButtonPressed(): number;

/** Get axis count for a gamepad */
export declare function GetGamepadAxisCount(gamepad: number): number;

/** Get movement value for a gamepad axis */
export declare function GetGamepadAxisMovement(gamepad: number, axis: number): number;

/** Set internal gamepad mappings (SDL_GameControllerDB) */
export declare function SetGamepadMappings(mappings: string): number;

/** Check if a mouse button has been pressed once */
export declare function IsMouseButtonPressed(button: number): boolean;

/** Check if a mouse button is being pressed */
export declare function IsMouseButtonDown(button: number): boolean;

/** Check if a mouse button has been released once */
export declare function IsMouseButtonReleased(button: number): boolean;

/** Check if a mouse button is NOT being pressed */
export declare function IsMouseButtonUp(button: number): boolean;

/** Get mouse position X */
export declare function GetMouseX(): number;

/** Get mouse position Y */
export declare function GetMouseY(): number;

/** Get mouse position XY */
export declare function GetMousePosition(): Vector2Value;

/** Get mouse delta between frames */
export declare function GetMouseDelta(): Vector2Value;

/** Set mouse position XY */
export declare function SetMousePosition(x: number, y: number): void;

/** Set mouse offset */
export declare function SetMouseOffset(offsetX: number, offsetY: number): void;

/** Set mouse scaling */
export declare function SetMouseScale(scaleX: number, scaleY: number): void;

/** Get mouse wheel movement for X or Y, whichever is larger */
export declare function GetMouseWheelMove(): number;

/** Get mouse wheel movement for both X and Y */
export declare function GetMouseWheelMoveV(): Vector2Value;

/** Set mouse cursor */
export declare function SetMouseCursor(cursor: number): void;

/** Get touch position X for touch point 0 (relative to screen size) */
export declare function GetTouchX(): number;

/** Get touch position Y for touch point 0 (relative to screen size) */
export declare function GetTouchY(): number;

/** Get touch position XY for a touch point index (relative to screen size) */
export declare function GetTouchPosition(index: number): Vector2Value;

/** Get touch point identifier for given index */
export declare function GetTouchPointId(index: number): number;

/** Get number of touch points */
export declare function GetTouchPointCount(): number;

/** Enable a set of gestures using flags */
export declare function SetGesturesEnabled(flags: number): void;

/** Check if a gesture have been detected */
export declare function IsGestureDetected(gesture: number): boolean;

/** Get latest detected gesture */
export declare function GetGestureDetected(): number;

/** Get gesture hold time in seconds */
export declare function GetGestureHoldDuration(): number;

/** Get gesture drag vector */
export declare function GetGestureDragVector(): Vector2Value;

/** Get gesture drag angle */
export declare function GetGestureDragAngle(): number;

/** Get gesture pinch delta */
export declare function GetGesturePinchVector(): Vector2Value;

/** Get gesture pinch angle */
export declare function GetGesturePinchAngle(): number;

/** Update camera position for selected mode */
export declare function UpdateCamera(camera: FFIPointerInput, mode: number): void;

/** Set texture and rectangle to be used on shapes drawing */
export declare function SetShapesTexture(texture: Texture2DValue, source: RectangleValue): void;

/** Get texture that is used for shapes drawing */
export declare function GetShapesTexture(): Texture2DValue;

/** Get texture source rectangle that is used for shapes drawing */
export declare function GetShapesTextureRectangle(): RectangleValue;

/** Draw a pixel using geometry [Can be slow, use with care] */
export declare function DrawPixel(posX: number, posY: number, color: ColorValue): void;

/** Draw a pixel using geometry (Vector version) [Can be slow, use with care] */
export declare function DrawPixelV(position: Vector2Value, color: ColorValue): void;

/** Draw a line */
export declare function DrawLine(startPosX: number, startPosY: number, endPosX: number, endPosY: number, color: ColorValue): void;

/** Draw a line (using gl lines) */
export declare function DrawLineV(startPos: Vector2Value, endPos: Vector2Value, color: ColorValue): void;

/** Draw lines sequence (using gl lines) */
export declare function DrawLineStrip(points: FFIPointerInput, pointCount: number, color: ColorValue): void;

/** Draw a dashed line */
export declare function DrawLineDashed(startPos: Vector2Value, endPos: Vector2Value, dashSize: number, spaceSize: number, color: ColorValue): void;

/** Draw a color-filled rectangle */
export declare function DrawRectangle(posX: number, posY: number, width: number, height: number, color: ColorValue): void;

/** Draw a color-filled rectangle (Vector version) */
export declare function DrawRectangleV(position: Vector2Value, size: Vector2Value, color: ColorValue): void;

/** Draw a color-filled rectangle */
export declare function DrawRectangleRec(rec: RectangleValue, color: ColorValue): void;

/** Draw a vertical-gradient-filled rectangle */
export declare function DrawRectangleGradientV(posX: number, posY: number, width: number, height: number, top: ColorValue, bottom: ColorValue): void;

/** Draw a horizontal-gradient-filled rectangle */
export declare function DrawRectangleGradientH(posX: number, posY: number, width: number, height: number, left: ColorValue, right: ColorValue): void;

/** Draw a gradient-filled rectangle with custom vertex colors */
export declare function DrawRectangleGradientEx(rec: RectangleValue, topLeft: ColorValue, bottomLeft: ColorValue, bottomRight: ColorValue, topRight: ColorValue): void;

/** Draw rectangle outline */
export declare function DrawRectangleLines(posX: number, posY: number, width: number, height: number, color: ColorValue): void;

/** Draw a color-filled triangle (vertex in counter-clockwise order!) */
export declare function DrawTriangle(v1: Vector2Value, v2: Vector2Value, v3: Vector2Value, color: ColorValue): void;

/** Draw triangle outline (vertex in counter-clockwise order!) */
export declare function DrawTriangleLines(v1: Vector2Value, v2: Vector2Value, v3: Vector2Value, color: ColorValue): void;

/** Draw a triangle fan defined by points (first vertex is the center) */
export declare function DrawTriangleFan(points: FFIPointerInput, pointCount: number, color: ColorValue): void;

/** Draw a triangle strip defined by points */
export declare function DrawTriangleStrip(points: FFIPointerInput, pointCount: number, color: ColorValue): void;

/** Check collision between two rectangles */
export declare function CheckCollisionRecs(rec1: RectangleValue, rec2: RectangleValue): boolean;

/** Check if point is inside rectangle */
export declare function CheckCollisionPointRec(point: Vector2Value, rec: RectangleValue): boolean;

/** Check if point is inside a triangle */
export declare function CheckCollisionPointTriangle(point: Vector2Value, p1: Vector2Value, p2: Vector2Value, p3: Vector2Value): boolean;

/** Check if point belongs to line created between two points [p1] and [p2] with defined margin in pixels [threshold] */
export declare function CheckCollisionPointLine(point: Vector2Value, p1: Vector2Value, p2: Vector2Value, threshold: number): boolean;

/** Check if point is within a polygon described by array of vertices */
export declare function CheckCollisionPointPoly(point: Vector2Value, points: FFIPointerInput, pointCount: number): boolean;

/** Check the collision between two lines defined by two points each, returns collision point by reference */
export declare function CheckCollisionLines(startPos1: Vector2Value, endPos1: Vector2Value, startPos2: Vector2Value, endPos2: Vector2Value, collisionPoint: FFIPointerInput): boolean;

/** Get collision rectangle for two rectangles collision */
export declare function GetCollisionRec(rec1: RectangleValue, rec2: RectangleValue): RectangleValue;

/** Load image from file into CPU memory (RAM) */
export declare function LoadImage(fileName: string): ImageValue;

/** Load image from RAW file data */
export declare function LoadImageRaw(fileName: string, width: number, height: number, format: number, headerSize: number): ImageValue;

/** Load image sequence from file (frames appended to image.data) */
export declare function LoadImageAnim(fileName: string, frames: FFIPointerInput): ImageValue;

/** Load image sequence from memory buffer */
export declare function LoadImageAnimFromMemory(fileType: string, fileData: FFIPointerInput, dataSize: number, frames: FFIPointerInput): ImageValue;

/** Load image from memory buffer, fileType refers to extension: i.e. '.png' */
export declare function LoadImageFromMemory(fileType: string, fileData: FFIPointerInput, dataSize: number): ImageValue;

/** Load image from GPU texture data */
export declare function LoadImageFromTexture(texture: Texture2DValue): ImageValue;

/** Load image from screen buffer and (screenshot) */
export declare function LoadImageFromScreen(): ImageValue;

/** Check if an image is valid (data and parameters) */
export declare function IsImageValid(image: ImageValue): boolean;

/** Unload image from CPU memory (RAM) */
export declare function UnloadImage(image: ImageValue): void;

/** Export image data to file, returns true on success */
export declare function ExportImage(image: ImageValue, fileName: string): boolean;

/** Export image to memory buffer, memory must be MemFree() */
export declare function ExportImageToMemory(image: ImageValue, fileType: string, fileSize: FFIPointerInput): FFIPointer;

/** Export image as code file defining an array of bytes, returns true on success */
export declare function ExportImageAsCode(image: ImageValue, fileName: string): boolean;

/** Generate image: plain color */
export declare function GenImageColor(width: number, height: number, color: ColorValue): ImageValue;

/** Generate image: linear gradient, direction in degrees [0..360], 0=Vertical gradient */
export declare function GenImageGradientLinear(width: number, height: number, direction: number, start: ColorValue, end: ColorValue): ImageValue;

/** Generate image: checked */
export declare function GenImageChecked(width: number, height: number, checksX: number, checksY: number, col1: ColorValue, col2: ColorValue): ImageValue;

/** Generate image: cellular algorithm, bigger tileSize means bigger cells */
export declare function GenImageCellular(width: number, height: number, tileSize: number): ImageValue;

/** Generate image: grayscale image from text data */
export declare function GenImageText(width: number, height: number, text: string): ImageValue;

/** Create an image duplicate (useful for transformations) */
export declare function ImageCopy(image: ImageValue): ImageValue;

/** Create an image from another image piece */
export declare function ImageFromImage(image: ImageValue, rec: RectangleValue): ImageValue;

/** Create an image from a selected channel of another image (GRAYSCALE) */
export declare function ImageFromChannel(image: ImageValue, selectedChannel: number): ImageValue;

/** Create an image from text (default font) */
export declare function ImageText(text: string, fontSize: number, color: ColorValue): ImageValue;

/** Convert image data to desired format */
export declare function ImageFormat(image: FFIPointerInput, newFormat: number): void;

/** Convert image to POT (power-of-two) */
export declare function ImageToPOT(image: FFIPointerInput, fill: ColorValue): void;

/** Crop an image to a defined rectangle */
export declare function ImageCrop(image: FFIPointerInput, crop: RectangleValue): void;

/** Apply alpha mask to image */
export declare function ImageAlphaMask(image: FFIPointerInput, alphaMask: ImageValue): void;

/** Premultiply alpha channel */
export declare function ImageAlphaPremultiply(image: FFIPointerInput): void;

/** Apply Gaussian blur using a box blur approximation */
export declare function ImageBlurGaussian(image: FFIPointerInput, blurSize: number): void;

/** Apply custom square convolution kernel to image */
export declare function ImageKernelConvolution(image: FFIPointerInput, kernel: FFIPointerInput, kernelSize: number): void;

/** Resize image (Bicubic scaling algorithm) */
export declare function ImageResize(image: FFIPointerInput, newWidth: number, newHeight: number): void;

/** Resize image (Nearest-Neighbor scaling algorithm) */
export declare function ImageResizeNN(image: FFIPointerInput, newWidth: number, newHeight: number): void;

/** Resize canvas and fill with color */
export declare function ImageResizeCanvas(image: FFIPointerInput, newWidth: number, newHeight: number, offsetX: number, offsetY: number, fill: ColorValue): void;

/** Compute all mipmap levels for a provided image */
export declare function ImageMipmaps(image: FFIPointerInput): void;

/** Dither image data to 16bpp or lower (Floyd-Steinberg dithering) */
export declare function ImageDither(image: FFIPointerInput, rBpp: number, gBpp: number, bBpp: number, aBpp: number): void;

/** Flip image vertically */
export declare function ImageFlipVertical(image: FFIPointerInput): void;

/** Flip image horizontally */
export declare function ImageFlipHorizontal(image: FFIPointerInput): void;

/** Rotate image by input angle in degrees (-359 to 359) */
export declare function ImageRotate(image: FFIPointerInput, degrees: number): void;

/** Rotate image clockwise 90deg */
export declare function ImageRotateCW(image: FFIPointerInput): void;

/** Rotate image counter-clockwise 90deg */
export declare function ImageRotateCCW(image: FFIPointerInput): void;

/** Modify image color: tint */
export declare function ImageColorTint(image: FFIPointerInput, color: ColorValue): void;

/** Modify image color: invert */
export declare function ImageColorInvert(image: FFIPointerInput): void;

/** Modify image color: grayscale */
export declare function ImageColorGrayscale(image: FFIPointerInput): void;

/** Modify image color: brightness (-255 to 255) */
export declare function ImageColorBrightness(image: FFIPointerInput, brightness: number): void;

/** Modify image color: replace color */
export declare function ImageColorReplace(image: FFIPointerInput, color: ColorValue, replace: ColorValue): void;

/** Load color data from image as a Color array (RGBA - 32bit) */
export declare function LoadImageColors(image: ImageValue): FFIPointer;

/** Load colors palette from image as a Color array (RGBA - 32bit) */
export declare function LoadImagePalette(image: ImageValue, maxPaletteSize: number, colorCount: FFIPointerInput): FFIPointer;

/** Unload color data loaded with LoadImageColors() */
export declare function UnloadImageColors(colors: FFIPointerInput): void;

/** Unload colors palette loaded with LoadImagePalette() */
export declare function UnloadImagePalette(colors: FFIPointerInput): void;

/** Get image pixel color at (x, y) position */
export declare function GetImageColor(image: ImageValue, x: number, y: number): ColorValue;

/** Clear image background with given color */
export declare function ImageClearBackground(dst: FFIPointerInput, color: ColorValue): void;

/** Draw pixel within an image */
export declare function ImageDrawPixel(dst: FFIPointerInput, posX: number, posY: number, color: ColorValue): void;

/** Draw pixel within an image (Vector version) */
export declare function ImageDrawPixelV(dst: FFIPointerInput, position: Vector2Value, color: ColorValue): void;

/** Draw line within an image */
export declare function ImageDrawLine(dst: FFIPointerInput, startPosX: number, startPosY: number, endPosX: number, endPosY: number, color: ColorValue): void;

/** Draw line within an image (Vector version) */
export declare function ImageDrawLineV(dst: FFIPointerInput, start: Vector2Value, end: Vector2Value, color: ColorValue): void;

/** Draw a line defining thickness within an image */
export declare function ImageDrawLineEx(dst: FFIPointerInput, start: Vector2Value, end: Vector2Value, thick: number, color: ColorValue): void;

/** Draw a filled circle within an image */
export declare function ImageDrawCircle(dst: FFIPointerInput, centerX: number, centerY: number, radius: number, color: ColorValue): void;

/** Draw a filled circle within an image (Vector version) */
export declare function ImageDrawCircleV(dst: FFIPointerInput, center: Vector2Value, radius: number, color: ColorValue): void;

/** Draw circle outline within an image */
export declare function ImageDrawCircleLines(dst: FFIPointerInput, centerX: number, centerY: number, radius: number, color: ColorValue): void;

/** Draw circle outline within an image (Vector version) */
export declare function ImageDrawCircleLinesV(dst: FFIPointerInput, center: Vector2Value, radius: number, color: ColorValue): void;

/** Draw rectangle within an image */
export declare function ImageDrawRectangle(dst: FFIPointerInput, posX: number, posY: number, width: number, height: number, color: ColorValue): void;

/** Draw rectangle within an image (Vector version) */
export declare function ImageDrawRectangleV(dst: FFIPointerInput, position: Vector2Value, size: Vector2Value, color: ColorValue): void;

/** Draw rectangle within an image */
export declare function ImageDrawRectangleRec(dst: FFIPointerInput, rec: RectangleValue, color: ColorValue): void;

/** Draw rectangle lines within an image */
export declare function ImageDrawRectangleLines(dst: FFIPointerInput, rec: RectangleValue, thick: number, color: ColorValue): void;

/** Draw triangle within an image */
export declare function ImageDrawTriangle(dst: FFIPointerInput, v1: Vector2Value, v2: Vector2Value, v3: Vector2Value, color: ColorValue): void;

/** Draw triangle with interpolated colors within an image */
export declare function ImageDrawTriangleEx(dst: FFIPointerInput, v1: Vector2Value, v2: Vector2Value, v3: Vector2Value, c1: ColorValue, c2: ColorValue, c3: ColorValue): void;

/** Draw triangle outline within an image */
export declare function ImageDrawTriangleLines(dst: FFIPointerInput, v1: Vector2Value, v2: Vector2Value, v3: Vector2Value, color: ColorValue): void;

/** Draw a triangle fan defined by points within an image (first vertex is the center) */
export declare function ImageDrawTriangleFan(dst: FFIPointerInput, points: FFIPointerInput, pointCount: number, color: ColorValue): void;

/** Draw a triangle strip defined by points within an image */
export declare function ImageDrawTriangleStrip(dst: FFIPointerInput, points: FFIPointerInput, pointCount: number, color: ColorValue): void;

/** Draw a source image within a destination image (tint applied to source) */
export declare function ImageDraw(dst: FFIPointerInput, src: ImageValue, srcRec: RectangleValue, dstRec: RectangleValue, tint: ColorValue): void;

/** Draw text (using default font) within an image (destination) */
export declare function ImageDrawText(dst: FFIPointerInput, text: string, posX: number, posY: number, fontSize: number, color: ColorValue): void;

/** Load texture from file into GPU memory (VRAM) */
export declare function LoadTexture(fileName: string): Texture2DValue;

/** Load texture from image data */
export declare function LoadTextureFromImage(image: ImageValue): Texture2DValue;

/** Load cubemap from image, multiple image cubemap layouts supported */
export declare function LoadTextureCubemap(image: ImageValue, layout: number): TextureCubemapValue;

/** Load texture for rendering (framebuffer) */
export declare function LoadRenderTexture(width: number, height: number): RenderTexture2DValue;

/** Check if a texture is valid (loaded in GPU) */
export declare function IsTextureValid(texture: Texture2DValue): boolean;

/** Unload texture from GPU memory (VRAM) */
export declare function UnloadTexture(texture: Texture2DValue): void;

/** Check if a render texture is valid (loaded in GPU) */
export declare function IsRenderTextureValid(target: RenderTexture2DValue): boolean;

/** Unload render texture from GPU memory (VRAM) */
export declare function UnloadRenderTexture(target: RenderTexture2DValue): void;

/** Update GPU texture with new data (pixels should be able to fill texture) */
export declare function UpdateTexture(texture: Texture2DValue, pixels: FFIPointerInput): void;

/** Update GPU texture rectangle with new data (pixels and rec should fit in texture) */
export declare function UpdateTextureRec(texture: Texture2DValue, rec: RectangleValue, pixels: FFIPointerInput): void;

/** Generate GPU mipmaps for a texture */
export declare function GenTextureMipmaps(texture: FFIPointerInput): void;

/** Set texture scaling filter mode */
export declare function SetTextureFilter(texture: Texture2DValue, filter: number): void;

/** Set texture wrapping mode */
export declare function SetTextureWrap(texture: Texture2DValue, wrap: number): void;

/** Draw a Texture2D */
export declare function DrawTexture(texture: Texture2DValue, posX: number, posY: number, tint: ColorValue): void;

/** Draw a Texture2D with position defined as Vector2 */
export declare function DrawTextureV(texture: Texture2DValue, position: Vector2Value, tint: ColorValue): void;

/** Draw a part of a texture defined by a rectangle */
export declare function DrawTextureRec(texture: Texture2DValue, source: RectangleValue, position: Vector2Value, tint: ColorValue): void;

/** Check if two colors are equal */
export declare function ColorIsEqual(col1: ColorValue, col2: ColorValue): boolean;

/** Get hexadecimal value for a Color (0xRRGGBBAA) */
export declare function ColorToInt(color: ColorValue): number;

/** Get Color normalized as float [0..1] */
export declare function ColorNormalize(color: ColorValue): Vector4Value;

/** Get Color from normalized values [0..1] */
export declare function ColorFromNormalized(normalized: Vector4Value): ColorValue;

/** Get HSV values for a Color, hue [0..360], saturation/value [0..1] */
export declare function ColorToHSV(color: ColorValue): Vector3Value;

/** Get a Color from HSV values, hue [0..360], saturation/value [0..1] */
export declare function ColorFromHSV(hue: number, saturation: number, value: number): ColorValue;

/** Get color multiplied with another color */
export declare function ColorTint(color: ColorValue, tint: ColorValue): ColorValue;

/** Get src alpha-blended into dst color with tint */
export declare function ColorAlphaBlend(dst: ColorValue, src: ColorValue, tint: ColorValue): ColorValue;

/** Get Color structure from hexadecimal value */
export declare function GetColor(hexValue: number): ColorValue;

/** Get Color from a source pixel pointer of certain format */
export declare function GetPixelColor(srcPtr: FFIPointerInput, format: number): ColorValue;

/** Set color formatted into destination pixel pointer */
export declare function SetPixelColor(dstPtr: FFIPointerInput, color: ColorValue, format: number): void;

/** Get pixel data size in bytes for certain format */
export declare function GetPixelDataSize(width: number, height: number, format: number): number;

/** Get the default Font */
export declare function GetFontDefault(): FontValue;

/** Load font from file into GPU memory (VRAM) */
export declare function LoadFont(fileName: string): FontValue;

/** Load font from file with extended parameters, use NULL for codepoints and 0 for codepointCount to load the default character set, font size is provided in pixels height */
export declare function LoadFontEx(fileName: string, fontSize: number, codepoints: FFIPointerInput, codepointCount: number): FontValue;

/** Load font from Image (XNA style) */
export declare function LoadFontFromImage(image: ImageValue, key: ColorValue, firstChar: number): FontValue;

/** Load font from memory buffer, fileType refers to extension: i.e. '.ttf' */
export declare function LoadFontFromMemory(fileType: string, fileData: FFIPointerInput, dataSize: number, fontSize: number, codepoints: FFIPointerInput, codepointCount: number): FontValue;

/** Check if a font is valid (font data loaded, WARNING: GPU texture not checked) */
export declare function IsFontValid(font: FontValue): boolean;

/** Load font data for further use */
export declare function LoadFontData(fileData: FFIPointerInput, dataSize: number, fontSize: number, codepoints: FFIPointerInput, codepointCount: number, type: number, glyphCount: FFIPointerInput): FFIPointer;

/** Generate image font atlas using chars info */
export declare function GenImageFontAtlas(glyphs: FFIPointerInput, glyphRecs: FFIPointerInput, glyphCount: number, fontSize: number, padding: number, packMethod: number): ImageValue;

/** Unload font chars info data (RAM) */
export declare function UnloadFontData(glyphs: FFIPointerInput, glyphCount: number): void;

/** Unload font from GPU memory (VRAM) */
export declare function UnloadFont(font: FontValue): void;

/** Export font as code file, returns true on success */
export declare function ExportFontAsCode(font: FontValue, fileName: string): boolean;

/** Draw current FPS */
export declare function DrawFPS(posX: number, posY: number): void;

/** Draw text (using default font) */
export declare function DrawText(text: string, posX: number, posY: number, fontSize: number, color: ColorValue): void;

/** Set vertical line spacing when drawing with line-breaks */
export declare function SetTextLineSpacing(spacing: number): void;

/** Measure string width for default font */
export declare function MeasureText(text: string, fontSize: number): number;

/** Get glyph index position in font for a codepoint (unicode character), fallback to '?' if not found */
export declare function GetGlyphIndex(font: FontValue, codepoint: number): number;

/** Get glyph font info data for a codepoint (unicode character), fallback to '?' if not found */
export declare function GetGlyphInfo(font: FontValue, codepoint: number): GlyphInfoValue;

/** Get glyph rectangle in font atlas for a codepoint (unicode character), fallback to '?' if not found */
export declare function GetGlyphAtlasRec(font: FontValue, codepoint: number): RectangleValue;

/** Load UTF-8 text encoded from codepoints array */
export declare function LoadUTF8(codepoints: FFIPointerInput, length: number): FFIPointer;

/** Unload UTF-8 text encoded from codepoints array */
export declare function UnloadUTF8(text: FFIPointerInput): void;

/** Load all codepoints from a UTF-8 text string, codepoints count returned by parameter */
export declare function LoadCodepoints(text: string, count: FFIPointerInput): FFIPointer;

/** Unload codepoints data from memory */
export declare function UnloadCodepoints(codepoints: FFIPointerInput): void;

/** Get total number of codepoints in a UTF-8 encoded string */
export declare function GetCodepointCount(text: string): number;

/** Get next codepoint in a UTF-8 encoded string, 0x3f('?') is returned on failure */
export declare function GetCodepoint(text: string, codepointSize: FFIPointerInput): number;

/** Get next codepoint in a UTF-8 encoded string, 0x3f('?') is returned on failure */
export declare function GetCodepointNext(text: string, codepointSize: FFIPointerInput): number;

/** Get previous codepoint in a UTF-8 encoded string, 0x3f('?') is returned on failure */
export declare function GetCodepointPrevious(text: string, codepointSize: FFIPointerInput): number;

/** Encode one codepoint into UTF-8 byte array (array length returned as parameter) */
export declare function CodepointToUTF8(codepoint: number, utf8Size: FFIPointerInput): string;

/** Load text as separate lines ('\n') */
export declare function LoadTextLines(text: string, count: FFIPointerInput): FFIPointer;

/** Unload text lines */
export declare function UnloadTextLines(text: FFIPointerInput, lineCount: number): void;

/** Copy one string to another, returns bytes copied */
export declare function TextCopy(dst: FFIPointerInput, src: string): number;

/** Check if two text string are equal */
export declare function TextIsEqual(text1: string, text2: string): boolean;

/** Get text length, checks for '\0' ending */
export declare function TextLength(text: string): number;

/** Get a piece of a text string */
export declare function TextSubtext(text: string, position: number, length: number): string;

/** Remove text spaces, concat words */
export declare function TextRemoveSpaces(text: string): string;

/** Get text between two strings */
export declare function GetTextBetween(text: string, begin: string, end: string): string;

/** Replace text string with new string */
export declare function TextReplace(text: string, search: string, replacement: string): string;

/** Raw-pointer variant for nullable C string parameters. */
export declare function TextReplaceRaw(text: string, search: string, replacement: FFIPointerInput): string;

/** Replace text string with new string, memory must be MemFree() */
export declare function TextReplaceAlloc(text: string, search: string, replacement: string): FFIPointer;

/** Raw-pointer variant for nullable C string parameters. */
export declare function TextReplaceAllocRaw(text: string, search: string, replacement: FFIPointerInput): FFIPointer;

/** Replace text between two specific strings */
export declare function TextReplaceBetween(text: string, begin: string, end: string, replacement: string): string;

/** Raw-pointer variant for nullable C string parameters. */
export declare function TextReplaceBetweenRaw(text: string, begin: string, end: string, replacement: FFIPointerInput): string;

/** Replace text between two specific strings, memory must be MemFree() */
export declare function TextReplaceBetweenAlloc(text: string, begin: string, end: string, replacement: string): FFIPointer;

/** Raw-pointer variant for nullable C string parameters. */
export declare function TextReplaceBetweenAllocRaw(text: string, begin: string, end: string, replacement: FFIPointerInput): FFIPointer;

/** Insert text in a defined byte position */
export declare function TextInsert(text: string, insert: string, position: number): string;

/** Insert text in a defined byte position, memory must be MemFree() */
export declare function TextInsertAlloc(text: string, insert: string, position: number): FFIPointer;

/** Join text strings with delimiter */
export declare function TextJoin(textList: FFIPointerInput, count: number, delimiter: string): string;

/** Split text into multiple strings, using MAX_TEXTSPLIT_COUNT static strings */
export declare function TextSplit(text: string, delimiter: number, count: FFIPointerInput): FFIPointer;

/** Append text at specific position and move cursor */
export declare function TextAppend(text: FFIPointerInput, append: string, position: FFIPointerInput): void;

/** Find first text occurrence within a string, -1 if not found */
export declare function TextFindIndex(text: string, search: string): number;

/** Get upper case version of provided string */
export declare function TextToUpper(text: string): string;

/** Get lower case version of provided string */
export declare function TextToLower(text: string): string;

/** Get Pascal case notation version of provided string */
export declare function TextToPascal(text: string): string;

/** Get Snake case notation version of provided string */
export declare function TextToSnake(text: string): string;

/** Get Camel case notation version of provided string */
export declare function TextToCamel(text: string): string;

/** Get integer value from text */
export declare function TextToInteger(text: string): number;

/** Get float value from text */
export declare function TextToFloat(text: string): number;

/** Draw a line in 3D world space */
export declare function DrawLine3D(startPos: Vector3Value, endPos: Vector3Value, color: ColorValue): void;

/** Draw a point in 3D space, actually a small line */
export declare function DrawPoint3D(position: Vector3Value, color: ColorValue): void;

/** Draw a color-filled triangle (vertex in counter-clockwise order!) */
export declare function DrawTriangle3D(v1: Vector3Value, v2: Vector3Value, v3: Vector3Value, color: ColorValue): void;

/** Draw a triangle strip defined by points */
export declare function DrawTriangleStrip3D(points: FFIPointerInput, pointCount: number, color: ColorValue): void;

/** Draw cube (Vector version) */
export declare function DrawCubeV(position: Vector3Value, size: Vector3Value, color: ColorValue): void;

/** Draw cube wires (Vector version) */
export declare function DrawCubeWiresV(position: Vector3Value, size: Vector3Value, color: ColorValue): void;

/** Draw a plane XZ */
export declare function DrawPlane(centerPos: Vector3Value, size: Vector2Value, color: ColorValue): void;

/** Draw a ray line */
export declare function DrawRay(ray: RayValue, color: ColorValue): void;

/** Load model from files (meshes and materials) */
export declare function LoadModel(fileName: string): ModelValue;

/** Load model from generated mesh (default material) */
export declare function LoadModelFromMesh(mesh: MeshValue): ModelValue;

/** Check if a model is valid (loaded in GPU, VAO/VBOs) */
export declare function IsModelValid(model: ModelValue): boolean;

/** Unload model (including meshes) from memory (RAM and/or VRAM) */
export declare function UnloadModel(model: ModelValue): void;

/** Compute model bounding box limits (considers all meshes) */
export declare function GetModelBoundingBox(model: ModelValue): BoundingBoxValue;

/** Draw bounding box (wires) */
export declare function DrawBoundingBox(box: BoundingBoxValue, color: ColorValue): void;

/** Draw a billboard texture defined by source */
export declare function DrawBillboardRec(camera: CameraValue, texture: Texture2DValue, source: RectangleValue, position: Vector3Value, size: Vector2Value, tint: ColorValue): void;

/** Upload mesh vertex data in GPU and provide VAO/VBO ids */
export declare function UploadMesh(mesh: FFIPointerInput, dynamic: boolean): void;

/** Update mesh vertex data in GPU for a specific buffer index */
export declare function UpdateMeshBuffer(mesh: MeshValue, index: number, data: FFIPointerInput, dataSize: number, offset: number): void;

/** Unload mesh data from CPU and GPU */
export declare function UnloadMesh(mesh: MeshValue): void;

/** Draw a 3d mesh with material and transform */
export declare function DrawMesh(mesh: MeshValue, material: MaterialValue, transform: MatrixValue): void;

/** Draw multiple mesh instances with material and different transforms */
export declare function DrawMeshInstanced(mesh: MeshValue, material: MaterialValue, transforms: FFIPointerInput, instances: number): void;

/** Compute mesh bounding box limits */
export declare function GetMeshBoundingBox(mesh: MeshValue): BoundingBoxValue;

/** Compute mesh tangents */
export declare function GenMeshTangents(mesh: FFIPointerInput): void;

/** Export mesh data to file, returns true on success */
export declare function ExportMesh(mesh: MeshValue, fileName: string): boolean;

/** Export mesh as code file (.h) defining multiple arrays of vertex attributes */
export declare function ExportMeshAsCode(mesh: MeshValue, fileName: string): boolean;

/** Generate cuboid mesh */
export declare function GenMeshCube(width: number, height: number, length: number): MeshValue;

/** Generate heightmap mesh from image data */
export declare function GenMeshHeightmap(heightmap: ImageValue, size: Vector3Value): MeshValue;

/** Generate cubes-based map mesh from image data */
export declare function GenMeshCubicmap(cubicmap: ImageValue, cubeSize: Vector3Value): MeshValue;

/** Load materials from model file */
export declare function LoadMaterials(fileName: string, materialCount: FFIPointerInput): FFIPointer;

/** Load default material (Supports: DIFFUSE, SPECULAR, NORMAL maps) */
export declare function LoadMaterialDefault(): MaterialValue;

/** Check if a material is valid (shader assigned, map textures loaded in GPU) */
export declare function IsMaterialValid(material: MaterialValue): boolean;

/** Unload material from GPU memory (VRAM) */
export declare function UnloadMaterial(material: MaterialValue): void;

/** Set texture for a material map type (MATERIAL_MAP_DIFFUSE, MATERIAL_MAP_SPECULAR...) */
export declare function SetMaterialTexture(material: FFIPointerInput, mapType: number, texture: Texture2DValue): void;

/** Set material for a mesh */
export declare function SetModelMeshMaterial(model: FFIPointerInput, meshId: number, materialId: number): void;

/** Load model animations from file */
export declare function LoadModelAnimations(fileName: string, animCount: FFIPointerInput): FFIPointer;

/** Unload animation array data */
export declare function UnloadModelAnimations(animations: FFIPointerInput, animCount: number): void;

/** Check model animation skeleton match */
export declare function IsModelAnimationValid(model: ModelValue, anim: ModelAnimationValue): boolean;

/** Check collision between two bounding boxes */
export declare function CheckCollisionBoxes(box1: BoundingBoxValue, box2: BoundingBoxValue): boolean;

/** Get collision info between ray and box */
export declare function GetRayCollisionBox(ray: RayValue, box: BoundingBoxValue): RayCollisionValue;

/** Get collision info between ray and mesh */
export declare function GetRayCollisionMesh(ray: RayValue, mesh: MeshValue, transform: MatrixValue): RayCollisionValue;

/** Get collision info between ray and triangle */
export declare function GetRayCollisionTriangle(ray: RayValue, p1: Vector3Value, p2: Vector3Value, p3: Vector3Value): RayCollisionValue;

/** Get collision info between ray and quad */
export declare function GetRayCollisionQuad(ray: RayValue, p1: Vector3Value, p2: Vector3Value, p3: Vector3Value, p4: Vector3Value): RayCollisionValue;

/** Initialize audio device and context */
export declare function InitAudioDevice(): void;

/** Close the audio device and context */
export declare function CloseAudioDevice(): void;

/** Check if audio device has been initialized successfully */
export declare function IsAudioDeviceReady(): boolean;

/** Set master volume (listener) */
export declare function SetMasterVolume(volume: number): void;

/** Get master volume (listener) */
export declare function GetMasterVolume(): number;

/** Load wave data from file */
export declare function LoadWave(fileName: string): WaveValue;

/** Load wave from memory buffer, fileType refers to extension: i.e. '.wav' */
export declare function LoadWaveFromMemory(fileType: string, fileData: FFIPointerInput, dataSize: number): WaveValue;

/** Checks if wave data is valid (data loaded and parameters) */
export declare function IsWaveValid(wave: WaveValue): boolean;

/** Load sound from file */
export declare function LoadSound(fileName: string): SoundValue;

/** Load sound from wave data */
export declare function LoadSoundFromWave(wave: WaveValue): SoundValue;

/** Create a new sound that shares the same sample data as the source sound, does not own the sound data */
export declare function LoadSoundAlias(source: SoundValue): SoundValue;

/** Checks if a sound is valid (data loaded and buffers initialized) */
export declare function IsSoundValid(sound: SoundValue): boolean;

/** Update sound buffer with new data (default data format: 32 bit float, stereo) */
export declare function UpdateSound(sound: SoundValue, data: FFIPointerInput, sampleCount: number): void;

/** Unload wave data */
export declare function UnloadWave(wave: WaveValue): void;

/** Unload sound */
export declare function UnloadSound(sound: SoundValue): void;

/** Unload a sound alias (does not deallocate sample data) */
export declare function UnloadSoundAlias(alias: SoundValue): void;

/** Export wave data to file, returns true on success */
export declare function ExportWave(wave: WaveValue, fileName: string): boolean;

/** Export wave sample data to code (.h), returns true on success */
export declare function ExportWaveAsCode(wave: WaveValue, fileName: string): boolean;

/** Play a sound */
export declare function PlaySound(sound: SoundValue): void;

/** Stop playing a sound */
export declare function StopSound(sound: SoundValue): void;

/** Pause a sound */
export declare function PauseSound(sound: SoundValue): void;

/** Resume a paused sound */
export declare function ResumeSound(sound: SoundValue): void;

/** Check if a sound is currently playing */
export declare function IsSoundPlaying(sound: SoundValue): boolean;

/** Copy a wave to a new wave */
export declare function WaveCopy(wave: WaveValue): WaveValue;

/** Crop a wave to defined frames range */
export declare function WaveCrop(wave: FFIPointerInput, initFrame: number, finalFrame: number): void;

/** Convert wave data to desired format */
export declare function WaveFormat(wave: FFIPointerInput, sampleRate: number, sampleSize: number, channels: number): void;

/** Load samples data from wave as a 32bit float data array */
export declare function LoadWaveSamples(wave: WaveValue): FFIPointer;

/** Unload samples data loaded with LoadWaveSamples() */
export declare function UnloadWaveSamples(samples: FFIPointerInput): void;

/** Load music stream from file */
export declare function LoadMusicStream(fileName: string): MusicValue;

/** Load music stream from data */
export declare function LoadMusicStreamFromMemory(fileType: string, data: FFIPointerInput, dataSize: number): MusicValue;

/** Checks if a music stream is valid (context and buffers initialized) */
export declare function IsMusicValid(music: MusicValue): boolean;

/** Unload music stream */
export declare function UnloadMusicStream(music: MusicValue): void;

/** Start music playing */
export declare function PlayMusicStream(music: MusicValue): void;

/** Check if music is playing */
export declare function IsMusicStreamPlaying(music: MusicValue): boolean;

/** Updates buffers for music streaming */
export declare function UpdateMusicStream(music: MusicValue): void;

/** Stop music playing */
export declare function StopMusicStream(music: MusicValue): void;

/** Pause music playing */
export declare function PauseMusicStream(music: MusicValue): void;

/** Resume playing paused music */
export declare function ResumeMusicStream(music: MusicValue): void;

/** Get music time length (in seconds) */
export declare function GetMusicTimeLength(music: MusicValue): number;

/** Get current music time played (in seconds) */
export declare function GetMusicTimePlayed(music: MusicValue): number;

/** Load audio stream (to stream raw audio pcm data) */
export declare function LoadAudioStream(sampleRate: number, sampleSize: number, channels: number): AudioStreamValue;

/** Checks if an audio stream is valid (buffers initialized) */
export declare function IsAudioStreamValid(stream: AudioStreamValue): boolean;

/** Unload audio stream and free memory */
export declare function UnloadAudioStream(stream: AudioStreamValue): void;

/** Update audio stream buffers with data */
export declare function UpdateAudioStream(stream: AudioStreamValue, data: FFIPointerInput, frameCount: number): void;

/** Check if any audio stream buffers requires refill */
export declare function IsAudioStreamProcessed(stream: AudioStreamValue): boolean;

/** Play audio stream */
export declare function PlayAudioStream(stream: AudioStreamValue): void;

/** Pause audio stream */
export declare function PauseAudioStream(stream: AudioStreamValue): void;

/** Resume audio stream */
export declare function ResumeAudioStream(stream: AudioStreamValue): void;

/** Check if audio stream is playing */
export declare function IsAudioStreamPlaying(stream: AudioStreamValue): boolean;

/** Stop audio stream */
export declare function StopAudioStream(stream: AudioStreamValue): void;

/** Default size for new audio streams */
export declare function SetAudioStreamBufferSizeDefault(size: number): void;

/** Audio thread callback to request new data */
export declare function SetAudioStreamCallback(stream: AudioStreamValue, callback: FFIPointerInput): void;

/** Attach audio stream processor to stream, receives frames x 2 samples as 'float' (stereo) */
export declare function AttachAudioStreamProcessor(stream: AudioStreamValue, processor: FFIPointerInput): void;

/** Detach audio stream processor from stream */
export declare function DetachAudioStreamProcessor(stream: AudioStreamValue, processor: FFIPointerInput): void;

/** Attach audio stream processor to the entire audio pipeline, receives frames x 2 samples as 'float' (stereo) */
export declare function AttachAudioMixedProcessor(processor: FFIPointerInput): void;

/** Detach audio stream processor from the entire audio pipeline */
export declare function DetachAudioMixedProcessor(processor: FFIPointerInput): void;

export declare const MOUSE_LEFT_BUTTON: typeof MOUSE_BUTTON_LEFT;
export declare const MOUSE_RIGHT_BUTTON: typeof MOUSE_BUTTON_RIGHT;
export declare const MOUSE_MIDDLE_BUTTON: typeof MOUSE_BUTTON_MIDDLE;
export declare const MATERIAL_MAP_DIFFUSE: typeof MATERIAL_MAP_ALBEDO;
export declare const MATERIAL_MAP_SPECULAR: typeof MATERIAL_MAP_METALNESS;
export declare const SHADER_LOC_MAP_DIFFUSE: typeof SHADER_LOC_MAP_ALBEDO;
export declare const SHADER_LOC_MAP_SPECULAR: typeof SHADER_LOC_MAP_METALNESS;
/** Compatibility hack for previous raylib versions */
export declare const GetMouseRay: typeof GetScreenToWorldRay;
