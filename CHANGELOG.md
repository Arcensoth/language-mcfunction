# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Add icon to extension

## [v0.11.0] - 2019-03-25
### Added
- File icons SVG for user-level theming
### Fixed
- Fix compound key whitelisted characters, as per #10
- Fix selector scores whitelisted characters, as per #12
- Fix selector argument whitespace issues, as per #13
- Fix invalid trailing arguments without newline, as per #14

## [v0.10.0] - 2019-03-02
### Changed
- Version-agnostic grammar:
    - Separate distinct cases of unquoted strings

### Fixed
- Version-agnostic grammar:
    - Fix fakeplayer recognition

## [v0.9.0] - 2019-02-25
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
