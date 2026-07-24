SHELL := /bin/sh

PROJECT_ROOT := $(abspath ../..)
CACHE_DIR := $(CURDIR)/.cache
UPSTREAM_DIR := $(CACHE_DIR)/tsvm-doom
GENERATED_DIR := $(CACHE_DIR)/goccia-engine
UPSTREAM_REPOSITORY := https://github.com/curioustorvald/tsvm-doom.git
UPSTREAM_COMMIT := ed6b4b2d44314d947fd0d878554d4c029e5617e3
UPSTREAM_TREE := d053c491e65abfa0c6c8e1c010fd7bfa14210b59
UPSTREAM_STAMP := $(UPSTREAM_DIR)/.goccia-raylib-pinned
GENERATED_STAMP := $(GENERATED_DIR)/.prepared

FREEDOOM_VERSION := 0.13.0
FREEDOOM_ARCHIVE := $(CACHE_DIR)/freedoom-$(FREEDOOM_VERSION).zip
FREEDOOM_URL := https://github.com/freedoom/freedoom/releases/download/v$(FREEDOOM_VERSION)/freedoom-$(FREEDOOM_VERSION).zip
FREEDOOM_SHA256 := 3f9b264f3e3ce503b4fb7f6bdcb1f419d93c7b546f4df3e874dd878db9688f59
FREEDOOM_WAD := $(CACHE_DIR)/freedoom-$(FREEDOOM_VERSION)/freedoom1.wad
CACHED_IWAD := $(CACHE_DIR)/iwad.wad

GOCCIA_LOADER ?= GocciaScriptLoader
GOCCIA_TEST_RUNNER ?= GocciaTestRunner
GOCCIA_CONFIG := examples/doom-gpl/goccia.json

.PHONY: all clean fetch freedoom prepare run run-freedoom smoke test-palette verify-source

all: prepare

fetch: $(UPSTREAM_STAMP)

$(UPSTREAM_STAMP):
	mkdir -p "$(CACHE_DIR)"
	@if [ ! -d "$(UPSTREAM_DIR)/.git" ]; then \
		git init -q "$(UPSTREAM_DIR)"; \
		git -C "$(UPSTREAM_DIR)" remote add origin "$(UPSTREAM_REPOSITORY)"; \
		git -C "$(UPSTREAM_DIR)" sparse-checkout init --no-cone; \
		git -C "$(UPSTREAM_DIR)" sparse-checkout set '/*.mjs' '/COPYING' '/GPL2' '/README.md'; \
	fi
	git -C "$(UPSTREAM_DIR)" fetch --filter=blob:none --depth=1 origin "$(UPSTREAM_COMMIT)"
	git -C "$(UPSTREAM_DIR)" checkout --detach --force FETCH_HEAD
	@test "$$(git -C "$(UPSTREAM_DIR)" rev-parse HEAD)" = "$(UPSTREAM_COMMIT)"
	@test "$$(git -C "$(UPSTREAM_DIR)" rev-parse 'HEAD^{tree}')" = "$(UPSTREAM_TREE)"
	@test ! -e "$(UPSTREAM_DIR)/DOOM-SHAREWARE.WAD"
	touch "$(UPSTREAM_STAMP)"

verify-source: fetch
	@test "$$(git -C "$(UPSTREAM_DIR)" rev-parse HEAD)" = "$(UPSTREAM_COMMIT)"
	@test "$$(git -C "$(UPSTREAM_DIR)" rev-parse 'HEAD^{tree}')" = "$(UPSTREAM_TREE)"
	@grep -q "GNU General Public License as published by" "$(UPSTREAM_DIR)/COPYING"
	@grep -q "version 2" "$(UPSTREAM_DIR)/COPYING"
	@test ! -e "$(UPSTREAM_DIR)/DOOM-SHAREWARE.WAD"
	@echo "Pure-JavaScript LinuxDoom source pin and GPL boundary verified."

$(GENERATED_STAMP): verify-source prepare-port.mjs src/i_input.ts src/i_sound.ts src/i_video.ts
	node prepare-port.mjs "$(UPSTREAM_DIR)" "$(GENERATED_DIR)"
	touch "$@"

prepare: $(GENERATED_STAMP)

$(FREEDOOM_ARCHIVE):
	mkdir -p "$(CACHE_DIR)"
	curl --fail --location "$(FREEDOOM_URL)" --output "$@"
	@echo "$(FREEDOOM_SHA256)  $@" | shasum -a 256 -c -

$(FREEDOOM_WAD): $(FREEDOOM_ARCHIVE)
	unzip -oq "$(FREEDOOM_ARCHIVE)" -d "$(CACHE_DIR)"
	@test -s "$@"

freedoom: $(FREEDOOM_WAD)
	@echo "Freedoom $(FREEDOOM_VERSION) is available at $(FREEDOOM_WAD)"

run: prepare
	@if [ -z "$(IWAD)" ]; then \
		echo "Set IWAD=/absolute/path/to/doom.wad (or use make run-freedoom)." >&2; \
		exit 2; \
	fi
	@test -s "$(IWAD)"
	cp "$(IWAD)" "$(CACHED_IWAD)"
	cd "$(PROJECT_ROOT)" && "$(GOCCIA_LOADER)" examples/doom-gpl/run.ts --config="$(GOCCIA_CONFIG)"

run-freedoom: prepare freedoom
	cp "$(FREEDOOM_WAD)" "$(CACHED_IWAD)"
	cd "$(PROJECT_ROOT)" && "$(GOCCIA_LOADER)" examples/doom-gpl/run.ts --config="$(GOCCIA_CONFIG)"

smoke: prepare freedoom
	cp "$(FREEDOOM_WAD)" "$(CACHED_IWAD)"
	cd "$(PROJECT_ROOT)" && "$(GOCCIA_LOADER)" examples/doom-gpl/smoke.ts --config="$(GOCCIA_CONFIG)"
	@test -s "$(CACHE_DIR)/doom-goccia-smoke.png"

test-palette:
	cd "$(PROJECT_ROOT)" && "$(GOCCIA_TEST_RUNNER)" examples/doom-gpl/tests --config="$(GOCCIA_CONFIG)" --mode=interpreted
	cd "$(PROJECT_ROOT)" && "$(GOCCIA_TEST_RUNNER)" examples/doom-gpl/tests --config="$(GOCCIA_CONFIG)" --mode=bytecode

clean:
	@if [ "$(CACHE_DIR)" = "$(CURDIR)/.cache" ]; then \
		rm -rf "$(CACHE_DIR)"; \
	else \
		echo "Refusing to clean unexpected cache path: $(CACHE_DIR)" >&2; \
		exit 2; \
	fi
