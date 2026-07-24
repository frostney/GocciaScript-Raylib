FROM node:24-bookworm

ARG TARGETARCH
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    cmake \
    curl \
    git \
    libasound2-dev \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    libx11-dev \
    libxcursor-dev \
    libxi-dev \
    libxinerama-dev \
    libxrandr-dev \
    ninja-build \
    patch \
    unzip \
    xauth \
    xvfb

RUN git clone --filter=blob:none https://github.com/raysan5/raylib.git /tmp/raylib \
  && git -C /tmp/raylib checkout dbc56a87da87d973a9c5baa4e7438a9d20121d28 \
  && cmake \
    -S /tmp/raylib \
    -B /tmp/raylib-build \
    -G Ninja \
    -DBUILD_EXAMPLES=OFF \
    -DBUILD_SHARED_LIBS=ON \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=/usr/local \
  && cmake --build /tmp/raylib-build \
  && cmake --install /tmp/raylib-build \
  && ldconfig

RUN case "$TARGETARCH" in \
      amd64) goccia_arch=x64 ;; \
      arm64) goccia_arch=arm64 ;; \
      *) echo "Unsupported Docker architecture: $TARGETARCH" >&2; exit 1 ;; \
    esac \
  && mkdir -p /opt/gocciascript \
  && curl --fail --location \
    "https://github.com/frostney/GocciaScript/releases/download/0.10.0/gocciascript-0.10.0-linux-${goccia_arch}.tar.gz" \
    --output /tmp/gocciascript.tar.gz \
  && tar -xzf /tmp/gocciascript.tar.gz -C /opt/gocciascript --strip-components=1 \
  && chmod +x \
    /opt/gocciascript/GocciaScriptLoader \
    /opt/gocciascript/GocciaTestRunner \
  && ln -s /opt/gocciascript/GocciaScriptLoader /usr/local/bin/GocciaScriptLoader \
  && ln -s /opt/gocciascript/GocciaTestRunner /usr/local/bin/GocciaTestRunner

WORKDIR /workspace
COPY . .
ENV GOCCIA_LOADER=/usr/local/bin/GocciaScriptLoader
ENV GOCCIA_TEST_RUNNER=/usr/local/bin/GocciaTestRunner
ENV RAYLIB_INCLUDE_DIR=/usr/local/include

RUN npm ci \
  && npm run generate \
  && npm test \
  && npm run check:generated \
  && npm run test:types \
  && npm run test:abi \
  && npm run test:ffi \
  && npm run pack:check \
  && mkdir -p .cache \
  && xvfb-run -a GocciaScriptLoader tests/fixtures/basic-window-smoke.ts \
  && xvfb-run -a GocciaScriptLoader tests/fixtures/basic-input-smoke.ts \
  && xvfb-run -a GocciaScriptLoader tests/fixtures/image-loading-smoke.ts \
  && xvfb-run -a GocciaScriptLoader examples/smoke.ts \
  && xvfb-run -a npm run test:bunnymark:visual \
  && xvfb-run -a GocciaScriptLoader tests/fixtures/doom-smoke.ts \
  && test -s .cache/doom-smoke.png \
  && xvfb-run -a make -C examples/doom-gpl smoke
