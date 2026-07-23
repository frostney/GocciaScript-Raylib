# Skipped raylib functions

Generated against raylib 6.0 at `dbc56a87da87d973a9c5baa4e7438a9d20121d28` and
GocciaScript 0.10.0.

- Official API functions: 600
- Generated and callable on the pinned stable runtime: 488
- Deterministically skipped: 112
- Target after mixed-top-level-`f32` support: 597

The report is a compatibility boundary, not a claim that skipped functions are
implemented. Re-run the generator after the upstream FFI restriction is removed.
The three intentional 0.1 exclusions remain out of scope.

## intentional-0.1-scope: varargs (2)

- `void TraceLog(int, const char *, ...)`
- `const char * TextFormat(const char *, ...)`

## stable-runtime-limit: mixed-top-level-f32 (109)

- `void SetGamepadVibration(int, float, float, float)`
- `void UpdateCameraPro(Camera *, Vector3, Vector3, float)`
- `void DrawLineEx(Vector2, Vector2, float, Color)`
- `void DrawLineBezier(Vector2, Vector2, float, Color)`
- `void DrawCircle(int, int, float, Color)`
- `void DrawCircleV(Vector2, float, Color)`
- `void DrawCircleGradient(Vector2, float, Color, Color)`
- `void DrawCircleSector(Vector2, float, float, float, int, Color)`
- `void DrawCircleSectorLines(Vector2, float, float, float, int, Color)`
- `void DrawCircleLines(int, int, float, Color)`
- `void DrawCircleLinesV(Vector2, float, Color)`
- `void DrawEllipse(int, int, float, float, Color)`
- `void DrawEllipseV(Vector2, float, float, Color)`
- `void DrawEllipseLines(int, int, float, float, Color)`
- `void DrawEllipseLinesV(Vector2, float, float, Color)`
- `void DrawRing(Vector2, float, float, float, float, int, Color)`
- `void DrawRingLines(Vector2, float, float, float, float, int, Color)`
- `void DrawRectanglePro(Rectangle, Vector2, float, Color)`
- `void DrawRectangleLinesEx(Rectangle, float, Color)`
- `void DrawRectangleRounded(Rectangle, float, int, Color)`
- `void DrawRectangleRoundedLines(Rectangle, float, int, Color)`
- `void DrawRectangleRoundedLinesEx(Rectangle, float, int, float, Color)`
- `void DrawPoly(Vector2, int, float, float, Color)`
- `void DrawPolyLines(Vector2, int, float, float, Color)`
- `void DrawPolyLinesEx(Vector2, int, float, float, float, Color)`
- `void DrawSplineLinear(const Vector2 *, int, float, Color)`
- `void DrawSplineBasis(const Vector2 *, int, float, Color)`
- `void DrawSplineCatmullRom(const Vector2 *, int, float, Color)`
- `void DrawSplineBezierQuadratic(const Vector2 *, int, float, Color)`
- `void DrawSplineBezierCubic(const Vector2 *, int, float, Color)`
- `void DrawSplineSegmentLinear(Vector2, Vector2, float, Color)`
- `void DrawSplineSegmentBasis(Vector2, Vector2, Vector2, Vector2, float, Color)`
- `void DrawSplineSegmentCatmullRom(Vector2, Vector2, Vector2, Vector2, float, Color)`
- `void DrawSplineSegmentBezierQuadratic(Vector2, Vector2, Vector2, float, Color)`
- `void DrawSplineSegmentBezierCubic(Vector2, Vector2, Vector2, Vector2, float, Color)`
- `Vector2 GetSplinePointLinear(Vector2, Vector2, float)`
- `Vector2 GetSplinePointBasis(Vector2, Vector2, Vector2, Vector2, float)`
- `Vector2 GetSplinePointCatmullRom(Vector2, Vector2, Vector2, Vector2, float)`
- `Vector2 GetSplinePointBezierQuad(Vector2, Vector2, Vector2, float)`
- `Vector2 GetSplinePointBezierCubic(Vector2, Vector2, Vector2, Vector2, float)`
- `bool CheckCollisionCircles(Vector2, float, Vector2, float)`
- `bool CheckCollisionCircleRec(Vector2, float, Rectangle)`
- `bool CheckCollisionCircleLine(Vector2, float, Vector2, Vector2)`
- `bool CheckCollisionPointCircle(Vector2, Vector2, float)`
- `Image GenImageGradientRadial(int, int, float, Color, Color)`
- `Image GenImageGradientSquare(int, int, float, Color, Color)`
- `Image GenImageWhiteNoise(int, int, float)`
- `Image GenImagePerlinNoise(int, int, int, int, float)`
- `Image ImageTextEx(Font, const char *, float, float, Color)`
- `void ImageAlphaCrop(Image *, float)`
- `void ImageAlphaClear(Image *, Color, float)`
- `void ImageColorContrast(Image *, float)`
- `Rectangle GetImageAlphaBorder(Image, float)`
- `void ImageDrawTextEx(Image *, Font, const char *, Vector2, float, float, Color)`
- `void DrawTextureEx(Texture2D, Vector2, float, float, Color)`
- `void DrawTexturePro(Texture2D, Rectangle, Rectangle, Vector2, float, Color)`
- `void DrawTextureNPatch(Texture2D, NPatchInfo, Rectangle, Vector2, float, Color)`
- `Color Fade(Color, float)`
- `Color ColorBrightness(Color, float)`
- `Color ColorContrast(Color, float)`
- `Color ColorAlpha(Color, float)`
- `Color ColorLerp(Color, Color, float)`
- `void DrawTextEx(Font, const char *, Vector2, float, float, Color)`
- `void DrawTextPro(Font, const char *, Vector2, Vector2, float, float, float, Color)`
- `void DrawTextCodepoint(Font, int, Vector2, float, Color)`
- `void DrawTextCodepoints(Font, const int *, int, Vector2, float, float, Color)`
- `Vector2 MeasureTextEx(Font, const char *, float, float)`
- `Vector2 MeasureTextCodepoints(Font, const int *, int, float, float)`
- `void DrawCircle3D(Vector3, float, Vector3, float, Color)`
- `void DrawCube(Vector3, float, float, float, Color)`
- `void DrawCubeWires(Vector3, float, float, float, Color)`
- `void DrawSphere(Vector3, float, Color)`
- `void DrawSphereEx(Vector3, float, int, int, Color)`
- `void DrawSphereWires(Vector3, float, int, int, Color)`
- `void DrawCylinder(Vector3, float, float, float, int, Color)`
- `void DrawCylinderEx(Vector3, Vector3, float, float, int, Color)`
- `void DrawCylinderWires(Vector3, float, float, float, int, Color)`
- `void DrawCylinderWiresEx(Vector3, Vector3, float, float, int, Color)`
- `void DrawCapsule(Vector3, Vector3, float, int, int, Color)`
- `void DrawCapsuleWires(Vector3, Vector3, float, int, int, Color)`
- `void DrawGrid(int, float)`
- `void DrawModel(Model, Vector3, float, Color)`
- `void DrawModelEx(Model, Vector3, Vector3, float, Vector3, Color)`
- `void DrawModelWires(Model, Vector3, float, Color)`
- `void DrawModelWiresEx(Model, Vector3, Vector3, float, Vector3, Color)`
- `void DrawBillboard(Camera, Texture2D, Vector3, float, Color)`
- `Mesh GenMeshPoly(int, float)`
- `Mesh GenMeshPlane(float, float, int, int)`
- `Mesh GenMeshSphere(float, int, int)`
- `Mesh GenMeshHemiSphere(float, int, int)`
- `Mesh GenMeshCylinder(float, float, int)`
- `Mesh GenMeshCone(float, float, int)`
- `Mesh GenMeshTorus(float, float, int, int)`
- `Mesh GenMeshKnot(float, float, int, int)`
- `void UpdateModelAnimation(Model, ModelAnimation, float)`
- `void UpdateModelAnimationEx(Model, ModelAnimation, float, ModelAnimation, float, float)`
- `bool CheckCollisionSpheres(Vector3, float, Vector3, float)`
- `bool CheckCollisionBoxSphere(BoundingBox, Vector3, float)`
- `RayCollision GetRayCollisionSphere(Ray, Vector3, float)`
- `void SetSoundVolume(Sound, float)`
- `void SetSoundPitch(Sound, float)`
- `void SetSoundPan(Sound, float)`
- `void SeekMusicStream(Music, float)`
- `void SetMusicVolume(Music, float)`
- `void SetMusicPitch(Music, float)`
- `void SetMusicPan(Music, float)`
- `void SetAudioStreamVolume(AudioStream, float)`
- `void SetAudioStreamPitch(AudioStream, float)`
- `void SetAudioStreamPan(AudioStream, float)`

## intentional-0.1-scope: more-than-8-arguments (1)

- `void DrawBillboardPro(Camera, Texture2D, Rectangle, Vector3, Vector3, Vector2, Vector2, float, Color)`
