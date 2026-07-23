# Notices

This directory is a separately licensed GPL-2.0-only subproject. It is not
part of the root MIT npm package.

The engine modules are adapted from
[curioustorvald/tsvm-doom](https://github.com/curioustorvald/tsvm-doom), pinned
to commit `ed6b4b2d44314d947fd0d878554d4c029e5617e3`. That project is a
JavaScript derivative of id Software's GPL LinuxDoom source. Copyright and
license notices are preserved in the generated runtime modules.

The build uses a sparse checkout. It deliberately does not fetch or distribute
the upstream repository's DOOM shareware WAD or music pack.

raylib is loaded dynamically through the separately distributed MIT
GocciaScript bindings and remains under its upstream zlib license. No native
DOOM engine library or WebAssembly module is loaded.

The optional run and smoke targets download checksummed Freedoom 0.13.0 into
ignored cache storage. Its license and credits remain in that downloaded
archive.
