#!/usr/bin/env bash
# Bunnymark across GocciaScript versions on one machine.
#
#   benchmarks/fleet-bunnymark.sh
#
# Compares the last 0.10.0 revision of this repository on GocciaScript 0.10.0
# with a current revision on GocciaScript 0.14.0, and prints one Markdown table
# row per draw path. It opens thirteen short raylib windows on the current
# display. It needs raylib 6.0 as a dynamic library (`brew install raylib` on
# macOS) plus git, curl and unzip or tar. A copy outside a clone of this
# repository fetches its own clone.
#
# Optional environment:
#   CURRENT_REF  revision measured on 0.14.0            (default: 0.1.0)
#   FRAMES       frames per run after startup           (default: 100)
#   ROUNDS       interleaved runs per variant           (default: 3)
#   SPRITES      sprites per run                        (default: 10000)
#   RAYLIB_LIB   raylib 6.0 dynamic library to use when it is not in a path
#                the bindings already search
#   LABEL        note for the table, such as the selected GPU
#   WORK_DIR     scratch directory, reused between runs

set -euo pipefail

PREVIOUS_REF=70a04532029e17156d4e206dd55f19cd449106e1
CURRENT_REF=${CURRENT_REF:-0.1.0}
FRAMES=${FRAMES:-100}
ROUNDS=${ROUNDS:-3}
SPRITES=${SPRITES:-10000}
LABEL=${LABEL:-}
WORK_DIR=${WORK_DIR:-${TMPDIR:-/tmp}/gocciascript-raylib-fleet}

# Outside a clone, such as a copy sent to another machine, fetch one.
if ! repository=$(git -C "$(dirname "$0")" rev-parse --show-toplevel 2>/dev/null) ||
  ! git -C "$repository" cat-file -e "$PREVIOUS_REF^{commit}" 2>/dev/null; then
  repository="$WORK_DIR/repository"
  if [ ! -d "$repository/.git" ]; then
    mkdir -p "$WORK_DIR"
    git clone --quiet https://github.com/frostney/GocciaScript-Raylib.git "$repository"
  fi
  git -C "$repository" fetch --quiet --tags origin
fi

case "$(uname -s)-$(uname -m)" in
  Darwin-arm64) platform=macos-arm64; archive=zip; library=libraylib.dylib ;;
  Darwin-x86_64) platform=macos-x64; archive=zip; library=libraylib.dylib ;;
  Linux-aarch64) platform=linux-arm64; archive=tar.gz; library=libraylib.so ;;
  Linux-x86_64) platform=linux-x64; archive=tar.gz; library=libraylib.so ;;
  *) echo "Unsupported platform: $(uname -s)-$(uname -m)" >&2; exit 1 ;;
esac

# Prints the path of the named binary from a pinned GocciaScript release.
goccia_binary() {
  local version=$1 name=$2
  local directory="$WORK_DIR/gocciascript-$version"
  local asset="gocciascript-$version-$platform.$archive"
  # The callers run this in a command substitution, where bash does not exit
  # on a failed command, so each step reports its own failure. The release is
  # extracted beside its final path so an interrupted download is retried.
  if [ ! -d "$directory" ]; then
    rm -rf "$directory.partial"
    mkdir -p "$directory.partial"
    curl --fail --location --silent --show-error \
      "https://github.com/frostney/GocciaScript/releases/download/$version/$asset" \
      --output "$WORK_DIR/$asset" || return 1
    if [ "$archive" = zip ]; then
      unzip -q "$WORK_DIR/$asset" -d "$directory.partial" || return 1
    else
      tar -xzf "$WORK_DIR/$asset" -C "$directory.partial" || return 1
    fi
    mv "$directory.partial" "$directory"
  fi
  local binary
  binary=$(find "$directory" -type f -name "$name" -print -quit)
  if [ -z "$binary" ]; then
    echo "$name is not in $asset" >&2
    return 1
  fi
  chmod +x "$binary"
  printf '%s\n' "$binary"
}

# Extracts one revision and adds a fixture per draw path.
prepare_tree() {
  local ref=$1 tree=$2
  rm -rf "$tree"
  mkdir -p "$tree/.cache/fleet"
  git -C "$repository" archive "$ref" | tar -x -C "$tree"
  if [ -n "${RAYLIB_LIB:-}" ]; then
    ln -s "$RAYLIB_LIB" "$tree/$library"
  fi
  local path
  for path in instanced direct; do
    cat > "$tree/.cache/fleet/$path.ts" <<EOF
import bunnyBytes from "../../examples/assets/raybunny.png" with { type: "bytes" };
import { LOG_WARNING, SetTraceLogLevel } from "../../bindings/raylib.ts";
import { runBunnymark } from "../../examples/lib/run-bunnymark.ts";

// raylib buffers its log separately and would split the summary line.
SetTraceLogLevel(LOG_WARNING);
globalThis.BUNNYMARK_DRAW_PATH = "$path";
globalThis.BUNNYMARK_INITIAL_SPRITES = $SPRITES;
globalThis.BUNNYMARK_RANDOM_SEED = 1234;
globalThis.BUNNYMARK_TARGET_FPS = 0;
globalThis.BUNNYMARK_REPORT_FINAL = true;
runBunnymark(bunnyBytes, $FRAMES);
EOF
  done
  cat > "$tree/.cache/fleet/renderer.ts" <<EOF
import { CloseWindow, InitWindow, closeRaylib } from "../../bindings/raylib.ts";

InitWindow(320, 200, "GocciaScript + raylib: renderer probe");
CloseWindow();
closeRaylib();
EOF
}

mkdir -p "$WORK_DIR"
loader=$(goccia_binary 0.10.0 GocciaScriptLoader)
runner=$(goccia_binary 0.14.0 GocciaRunner)
prepare_tree "$PREVIOUS_REF" "$WORK_DIR/previous"
prepare_tree "$CURRENT_REF" "$WORK_DIR/current"

log="$WORK_DIR/runs.log"
: > "$log"

# raylib names the OpenGL renderer in its start-up log.
renderer=$(cd "$WORK_DIR/current" && "$runner" -P .cache/fleet/renderer.ts 2>&1 |
  sed -n 's/.*> Renderer: *//p' | head -1)
if [ -z "$renderer" ]; then
  echo "raylib did not report an OpenGL renderer; is a display available?" >&2
  exit 1
fi

# Runs one variant and appends "<version> <path> <frames> <milliseconds>".
measure() {
  local version=$1 path=$2 output summary
  if [ "$version" = 0.10.0 ]; then
    output=$(cd "$WORK_DIR/previous" && "$loader" ".cache/fleet/$path.ts" 2>&1)
  else
    # -P accepts the ffi request in goccia.json for this run only.
    output=$(cd "$WORK_DIR/current" && "$runner" -P ".cache/fleet/$path.ts" 2>&1)
  fi
  summary=$(printf '%s\n' "$output" | grep "Bunnymark summary" || true)
  if [ -z "$summary" ] || ! printf '%s\n' "$summary" | grep -q "draw_path=$path "; then
    printf '%s\n' "$output" | tail -20 >&2
    echo "Bunnymark $version $path did not report the $path draw path" >&2
    exit 1
  fi
  printf '%s %s %s %s\n' "$version" "$path" \
    "$(printf '%s\n' "$summary" | sed -n 's/.*frames=\([0-9]*\).*/\1/p')" \
    "$(printf '%s\n' "$summary" | sed -n 's/.*frame_ms=\([0-9]*\).*/\1/p')" >> "$log"
}

round=1
while [ "$round" -le "$ROUNDS" ]; do
  for path in instanced direct; do
    measure 0.10.0 "$path"
    measure 0.14.0 "$path"
  done
  round=$((round + 1))
done

if [ "$(uname -s)" = Darwin ]; then
  processor=$(sysctl -n machdep.cpu.brand_string)
  system="macOS $(sw_vers -productVersion)"
else
  processor=$(sed -n 's/^model name[^:]*: *//p' /proc/cpuinfo | head -1)
  system=$(. /etc/os-release && printf '%s' "$PRETTY_NAME")
fi

echo
echo "Bunnymark, $SPRITES sprites, uncapped, $FRAMES frames per run, $ROUNDS interleaved runs."
echo "Previous: ${PREVIOUS_REF:0:7} on GocciaScript 0.10.0. Current: $CURRENT_REF on GocciaScript 0.14.0."
echo
echo "| Machine | Renderer | Draw path | 0.10.0 | 0.14.0 | Change |"
echo "|---|---|---|---:|---:|---:|"
for path in instanced direct; do
  awk -v path="$path" -v machine="$processor, $system${LABEL:+, $LABEL}" \
    -v renderer="$renderer" '
    $2 == path { frames[$1] += $3; milliseconds[$1] += $4 }
    END {
      previous = frames["0.10.0"] * 1000 / milliseconds["0.10.0"]
      current = frames["0.14.0"] * 1000 / milliseconds["0.14.0"]
      printf "| %s | %s | `%s` | %.1f FPS | %.1f FPS | %+.1f%% |\n",
        machine, renderer, path, previous, current,
        (current / previous - 1) * 100
    }' "$log"
done
echo
echo "Per-run frame times (version, draw path, frames, milliseconds):"
cat "$log"
