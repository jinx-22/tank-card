# Changelog

All notable changes to **Tank Card** are documented here.

---

<!-- Insert this section directly above the entry [0.6.4] in Changelog.md -->

## [0.9.5] - 2026-10-26

### Added

- Warning sign **Sensor unavailable** (only when a sensor is selected). Without a sensor the tanks show the initial fill.
- Individual tank names via `entities[].name` (YAML).
- Automatic correction of the warning levels when the field is left (level 1 stays above level 2).

### Changed

- The editor preview and the dashboard now look the same: the card uses a fixed base font (14 px / 20 px, scaled by `font_size`) instead of inheriting it from the surrounding dialog.
- Badges: labels are written out and only abbreviated when a badge is too narrow, then the font shrinks down to 0.4 em (measured, not estimated). Every badge is sized individually. With large fonts or narrow cards the badges switch to one column.
- Badges appear in the order in which they are switched on (order of the keys in the configuration). Hint added in the editor. Existing cards: switch a badge off and on once.
- The card picker shows half-filled tanks; the warning sign never appears there.
- The configuration stays tidy: default values are removed and the keys are sorted.
- Editor: dividers between all blocks, new order in the panels Display (title, tank label, liquid style, theme, font size, card height, badges) and Content (initial fill directly after the sensor), all sliders have the same size (units are in the labels), help texts fall back to English, German label “Design” instead of “Theme”.
- Notification automation: no time lock any more (a drop from level 1 to level 2 is always reported), the push message of the previous level is removed from the phone, exact interval for every number of hours (divisors of 24 follow the clock), values are stored in the automation and can be read back into the editor (**Read values from automation**), the unit in the message text is sanitized, a different automation id per edition.
- Calculations (consumption, level, range) are unchanged.

### Fixed

- Number fields (card height, font size, wave interval, bubbles) jumped back to the default while typing; they can be typed freely now and are corrected when the field is left.
- Warning level 2 could drop to 0 % when level 1 was set to 1 %.

---

## [0.9.2] - 2026-10-16

### Added

- Level warning / signaling system:
  * Warning level 1 (orange) and level 2 (red) with configurable thresholds (`warn_1` / `warn_1_level`, `warn_2` / `warn_2_level`; 1–99 %, defaults 20 % / 10 %). With both levels enabled, level 2 is kept below level 1.
  * Visual signaling with pulsing glow and fading fog behind the tanks (`warn_glow`; level 1 orange, level 2 red and faster). Static glow with “reduce motion”.
- Notification automation, created from the card editor (`warn_auto`, administrator rights required):
  * Home Assistant notification (`warn_notify`) and/or mobile app push notification (`warn_mobile`; opens the dashboard).
  * Optional repeat while the level stays below the threshold (`warn_repeat`, `warn_repeat_unit`: `h` / `d`, `warn_time` for daily repeats; `0` = no repeat).
  * Notifications are removed automatically after refilling.
  * Editor buttons to create, update and delete the automation, plus a status display.
- Automatic unit detection (`unit: auto`) from the sensor’s unit, otherwise from the Home Assistant unit system.
- New unit `gal` and free entry of your own units (e.g. `t`).
- Configurable decimal places (`decimals`, 0–5).
- Editor: new **Level notification / signaling** category.
- Editor: enabling the first warning level automatically turns on `warn_glow` and `warn_notify` (can still be turned off).
- Editor: the gas tank switch is always visible and only available for metal + capsule + one tank; it turns on automatically when these conditions are met.

### Changed

- Default unit is now `auto` (previously `L`).
- `card_height` now defaults to 350 px and is limited to 250–1000 px (previously unset = automatic).
- Editor reorganized: guided questions under **Content** (content, sensor, unit, initial fill), liquid style, title and tank label moved to **Display**.
- Rectangular tanks are labeled “Cuboid” in the editor.
- Hysteresis (0.5 percentage points) for warning stages to avoid rapid flapping near the threshold.
- Improved performance: the card only re-renders when displayed values, theme or language change.

### Removed

- `entities` (individual tank names). Use `tank_label`, the numbering is automatic.
- Hex strings for `custom_color`. Use `[r, g, b]`.
- `%` / `em` / `px` values for `font_size`. Use a number (50–200).

---

## [0.9.1] - 2026-10-13

### Added

- Manual card height (`card_height`, 250–1000 px; unset = automatic) in the editor under **Display**.
  * Masonry view: minimum card height in pixels.
  * Sections view: sets the default number of rows; the layout tab takes precedence.
- Editor: the color picker now updates the card live while a color is being chosen.

### Changed

- Card size and grid options now follow the configured card height.
- Changing `card_height` in the editor overrides a row count saved in the layout (`grid_options.rows`).
- The card now also updates when the Home Assistant light/dark mode or the selected theme changes.
- Stricter sensor value handling: only purely numeric sensor states are accepted; anything else keeps the last valid value.
- Individual tank names from `entities` are trimmed of surrounding spaces.

### Fixed

- Editor: pending timers are cleaned up when the editor is closed.

---

## [0.9.0] - 2026-10-12

### Added

- Glass and metal tank styles (`tank_style`: `metal` / `glass`).
- Gas tank mode with legs and dome (`gas_tank`, only for metal capsule with a single tank).
- Selectable liquid style: previous look or new look (`liquid_style`: `classic` / `new`).
- New visual representation for wood pellets and wood chips (seamless SVG tile patterns).
- Custom color via `content_type: custom` and `custom_color` (RGB or Hex).
- Wave animation on the liquid surface (`animation`, `animation_interval`).
- Rising bubbles in the liquid (`bubbles`, `bubble_amount`).
- Individual show/hide for title and tank label (`show_title`, `show_tank_label`).
- Shared tank label with automatic numbering (`tank_label`).
- Tap on the card opens the linked sensor’s more-info dialog.
- Editor: new **Animation** category; font size and design options under **Display**.

### Changed

- Font size of the per-tank value increased; adapts to tank width on narrow tanks.
- Optical fill height corrected (absolute positioning of the fill layer).
- Editor layout reorganized (Tank / Content / Display / Animation).
- Pellets and wood chips no longer use wave or bubble animations (bulk material).

### Fixed

- Fill-level visualization reliability across browsers (including Safari / iOS).
- Fill height calculation and surface alignment for glass and metal tanks.

![editor](https://github.com/user-attachments/assets/5c4fc6e3-bdc3-475b-9df7-cc22bd2705cb) ![New-look](https://github.com/user-attachments/assets/fdb74b57-51d6-444a-9698-ff5592e45c80)

---

## [0.8.1] - 2026-10-11

### Fixed

- Fill level positioning – visual fill no longer collapsed on some browsers (Safari / iOS / webOS).
- Tank fill uses absolute positioning from the bottom so percentage height works reliably.

---

## [0.8.0] - 2026-10-08

### Added

- All values can be removed and individually enabled

### Changed

- New, clearer editor layout

### Fixed

- Minor bug fixes

![editor](https://github.com/user-attachments/assets/63ee6c91-7265-42ce-9725-005c56d14d00)

---

## [0.7.0] - 2026-10-06

### Added

* New 3D tank visualization with enhanced metallic frame and lighting effects.
* Material-dependent glow effects for tank contents.
* Enhanced fill visualization with highlights, shadows and surface lighting.
* Special trapezoid-shaped fill edge for rectangular tanks.
* Improved rectangular tank fill surface with dedicated lighting.
* Additional visual depth through layered inner and outer shadows.

<img width="50%" height="auto" alt="3d-Tank-card" src="https://github.com/user-attachments/assets/9cdca235-e0f7-4d98-81be-07d19b7ebb4d" />

### Changed

* Refactored rendering architecture:

  * DOM and styles are now created once in `_build()`.
  * Dynamic values are updated separately through `_update()`.
* Fill-level height transitions are now preserved during sensor updates.
* Improved tank body lighting and 3D appearance.
* Improved tank-level interior with additional light and shadow layers.
* Increased spacing between tanks from 12px to 14px.
* Added bottom spacing inside the tank container for improved visual proportions.
* Improved content gradients with more detailed color transitions.
* Tank names without explicit configuration are localized dynamically during updates.
* Grid options adjusted for the new tank proportions:

  * Default rows: 7
  * Minimum rows: 5
  * Minimum columns: 12

### Fixed

* Prevented unnecessary complete DOM reconstruction when only sensor values change.
* Improved preservation of fill animations during Home Assistant state updates.
* Improved handling of dynamically localized default tank names.

### Technical

* Added `CONTENT_GLOWS` for material-specific fill glow colors.
* Added dedicated pseudo-elements for tank-level lighting and fill-surface effects.
* Added optimized update detection for relevant Home Assistant sensors, language and themes.

---

## [0.6.4] - 2026-09-03

### Changed
- Improved the order of options in the visual editor.
- Content is selected before the unit.
- Added a separate sensor selection section.
- Sensor configuration is now dynamically adjusted to the selected sensor mode.
- Unneeded sensor fields are disabled depending on the selected option.
- Editor structure further aligned with Home Assistant conventions.
- Simplified and clearer configuration workflow.

### Fixed
- Reduced the possibility of conflicting sensor configurations.
- Improved handling of dependent editor fields.

---

## [0.6.3]

### Changed
- Improved visual editor structure.
- Improved sensor configuration handling.
- Various editor usability improvements.

---

## [0.6.2]

### Changed
- Improved Home Assistant editor compatibility.
- Improved configuration handling.
- Minor stability and UI improvements.

---

## [0.6.1]

### Changed
- Improved visual editor.
- Improved Home Assistant compatibility.
- Refined sensor selection and configuration.
- Minor UI and stability improvements.

---

## [0.6.0]

### Added
- Major editor improvements.
- Improved sensor selection.
- Improved configuration structure.
- Further Home Assistant alignment.

---

## [0.5.0]

### Added
- Version information in the card.
- Version information in the console.
- Additional content colors.
- Improved font-size support.
- Percentage-based font sizes.
- Improved localization.
- Improved Sections support.
- Improved entity and state handling.
- Improved editor help text.
- `documentationURL` for the GitHub repository.

---

## [0.4.0]

### Added
- Home Assistant language support.
- Dynamic translation of editor labels.
- Dynamic translation of editor options.
- German and English localization.
- Theme selection in the visual editor.
- Support for CSS variables from the selected Home Assistant theme.

### Changed
- Removed `bg_color`.
- Card styling now follows Home Assistant themes.
- Improved editor translations.

---

## [0.3.0]

### Added
- Visual Home Assistant editor.
- `ha-form` based configuration.
- Additional units:
  - Liters
  - Kilograms
  - Cubic meters
- Fill-level sensors.
- Absolute fill-level support.
- Percentage fill-level support.
- Pellet support.
- Wood-chip support.
- Dynamic language support.
- German and English localization.

### Changed
- Improved sensor handling.
- Unified YAML and visual editor configuration.
- Improved fill-level calculations.

---

## [0.2.1]

### Changed
- Improved tank visualization.
- Improved fill-level calculations.
- Improved configuration handling.
- Improved tank shape support.

---

## [0.2.0]

### Added
- Initial tank visualization improvements.
- Support for multiple tanks.
- Basic tank configuration options.
- Improved tank display.

---

## [0.1.0]

### Added
- Initial release of Tank Card.
- Basic tank visualization.
- Tank capacity and fill-level display.
- Basic Home Assistant custom-card functionality.

---

## Legend

- **Added** – New features.
- **Changed** – Changes to existing functionality.
- **Fixed** – Bug fixes and corrections.
- **Removed** – Removed functionality.
