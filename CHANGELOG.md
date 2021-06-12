# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.18.0] - 2021-06-12

### Added

- Implemented highlighting for Markdown code blocks in VSCode
- Add more block comment prefix characters (#45)

### Fixed

- Fixed compile errors due to unbounded dependency versions
  - `@types/js-yaml` has had a semver breaking change
  - `typescript` requires type assertions in more places

### Removed

- Removed the incomplete version-specific grammar to avoid confusion

## [0.17.0] - 2020-09-29

### Changed

- Changed the package description to be less ambiguous
- Overhauled the version-specific grammar generator using intermediate data files
- Updated the version-specific grammar/data to 1.16.3 (no command-facing changes)

### Removed

- Purged work-in-progress LSP support in light of other extensions

### Fixed

- Fixed NBT array types (#30)
- Fixed quoted selector keys (#28)
- Fixed quoted keys in NBT paths (#27)

## [0.16.0] - 2019-09-22

### Added

- Implemented a handful of commands and arguments for version-specific grammars
- Ported block comments to the version-specific grammar

### Changed

- Improved architecture for version-specific grammar generator
- Improved support for adjacent block comments and headings in all grammars

## [0.15.0] - 2019-09-20

### Added

- Implemented special case to support greedy commands (say), as per #25
- Implemented support for block predicates without a namespace, as per #26

### Fixed

- Fixed adjacent list access in NBT path, as per #20
- Fixed issue with root redirect (execute run), as per #22

## [0.14.0] - 2019-04-18

### Changed

- Implement imaginary block comment to contain custom comment styling
  - Use `#>` to initiate an imaginary block comment
  - Any text following `#>` is the block heading
    - e.g. `#> This is a block heading`
  - Annotations are now supported within block comments
    - e.g. `# @returns Return value information`
  - Future comment highlights will be supported only within block comments

### Removed

- Remove language grammar definitions for TODO, FIXME, etc

## [0.13.0] - 2019-04-12

### Added

- Add contribution guidelines

### Changed

- Reorganize library code

## [0.12.0] - 2019-03-25

### Added

- Add icon to extension

## [0.11.0] - 2019-03-25

### Added

- File icons SVG for user-level theming

### Fixed

- Fix compound key whitelisted characters, as per #10
- Fix selector scores whitelisted characters, as per #12
- Fix selector argument whitespace issues, as per #13
- Fix invalid trailing arguments without newline, as per #14

## [0.10.0] - 2019-03-02

### Changed

- Version-agnostic grammar:
  - Separate distinct cases of unquoted strings

### Fixed

- Version-agnostic grammar:
  - Fix fakeplayer recognition

## [0.9.0] - 2019-02-25

### Added

- More work on version-specific grammars:
  - Text components for 1.13/1.14 are supported with property-specific highlighting
  - Selectors and arguments are supported with argument-specific highlighting
  - Commands themselves and by extension the grammar generator are the biggest TODO

### Fixed

- Version-agnostic grammar:
  - NBT path list index validation

## [0.8.0] - 2019-02-23

### Added

- Added important information to the readme

## [0.7.0] - 2019-02-23

### Added

- Support for single-quoted strings
- Support for block predicates with NBT

### Changed

- Adjusted comment highlighting
- Adjusted colour classes
- Overhauled grammar generation scheme

## [0.6.0] - 2019-02-17

### Changed

- Adjusted colour classes

### Fixed

- Fixed bug with scores

## [0.5.0] - 2019-02-16

### Changed

- Adjusted colour classes

## [0.4.0] - 2019-02-16

### Added

- Implement support for SublimeText

## [0.3.0] - 2019-02-16

### Added

- Implemented scores/advancements for selectors
- Generate property list file for other editors

## [0.2.0] - 2019-02-15

### Added

- Implemented JSON/text components

### Changed

- Adjusted colour classes

## [0.1.0] - 2019-02-15

- Initial release

[unreleased]: https://github.com/Arcensoth/language-mcfunction/compare/v0.18.0...HEAD
[0.18.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.17.0...v0.18.0
[0.17.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.16.0...v0.17.0
[0.16.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.15.0...v0.16.0
[0.15.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Arcensoth/language-mcfunction/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Arcensoth/language-mcfunction/releases/tag/v0.1.0
