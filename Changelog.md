# Changelog

All notable changes to this project will be documented in this file.

The format is based on **Keep a Changelog**  
and this project adheres to **Semantic Versioning**.

---

## [0.3.0] – 2025-12-15

### Added
- Visual (GUI) editor support using Home Assistant `ha-form`
- Selectable unit of measurement:
  - Liters (`L`)
  - Kilograms (`kg`)
  - Cubic meters (`m³`)
- New tank fill types:
  - Pellets
  - Wood chips (Hackschnitzel)
- Support for fill level sensors as an alternative to consumption sensors
  - Absolute fill level (L / kg / m³)
  - Percentage-based fill level (%)
- Dynamic language handling in the editor (English / German)

### Changed
- Sensor selection logic refactored to support multiple sensor modes
- Configuration schema unified for YAML editor and visual editor
- Internal value calculation adjusted to consistently respect `initial_fill`

---
