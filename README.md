# Tank Card – Tank Level Visualization

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
![GitHub total downloads](https://img.shields.io/github/downloads/jinx-22/tank-card/total?style=flat-square&color=red)
[![GitHub release](https://img.shields.io/github/release/jinx-22/tank-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jinx-22/tank-card/releases/)
![File size](https://img.shields.io/github/size/jinx-22/tank-card/tank-card.js?label=Card%20Size)
![last commit](https://img.shields.io/github/last-commit/jinx-22/tank-card)
[![README Deutsch](https://img.shields.io/badge/README-DE)](README_DE.md)
[![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers)
[![Donate Bitcoin](https://img.shields.io/badge/₿-Bitcoin-F7931A?style=flat-square)](#bitcoin)
[![Donate Lightning](https://img.shields.io/badge/⚡-Lightning-FFD700?style=flat-square)](#lightning)

**Version:** 0.4.0

🇩🇪 [Deutsch](README_DE.md)

---

## Description

**Tank Card** is a Home Assistant custom card for visualizing tank levels, total capacity, and consumption.

It supports consumption sensors as well as level sensors with absolute values or percentages. It is suitable for heating oil, water, diesel, gas, pellets, wood chips, and other liquids or bulk materials.

The calculation depends on the selected sensor mode:

- **Consumption sensor:** `initial_fill - consumption`
- **Level sensor (L / kg / m³):** direct sensor value
- **Level sensor (%):** percentage based on the total capacity

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Example Configuration](#example-configuration)
- [Configuration Options](#configuration-options)
- [Sensor Modes](#sensor-modes)
- [Tank Shapes](#tank-shapes)
- [Supported Materials](#supported-materials)
- [Version 0.4.0](#version-040)
- [🧡 Donations](#-donations)
- [🐛 Support](#-support)
- [License](#license)

---

## Features

- One or multiple tanks
- Individual tank names
- Display of tank level and total capacity
- Consumption and level sensors
- Absolute or percentage-based level sensors
- Tank shapes `rect`, `pool`, and `capsule`
- Material-dependent colors and patterns
- Units `L`, `kg`, and `m³`
- Configurable font family and font size
- Optional Home Assistant theme
- Responsive layout
- Home Assistant visual editor
- English and German localization
- Home Assistant-compliant card configuration

---

## Installation

### HACS

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=tank-card&category=plugin)

1. Open HACS.
2. Select **Frontend**.
3. Search for **Tank Card**.
4. Install the card.
5. Reload Home Assistant or your browser.

### Manual Installation

1. Download `tank-card.js`.
2. Copy it to:

`/config/www/community/tank-card/`

3. In Home Assistant, open **Settings → Dashboards → Resources**.
4. Add the following resource:

`/local/community/tank-card/tank-card.js`

Resource type: **JavaScript Module**

Afterwards, reload your browser, for example with **CTRL + F5**.

---

## Example Configuration

    type: custom:tank-card
    title: Tank Card
    tank_count: 3
    tank_capacity: 1500
    initial_fill: 4500
    sensor_mode: consumption
    consumption_sensor: sensor.heating_oil_consumption_total
    level_sensor: ""
    content_type: heating_oil
    unit: L
    tank_form: rect
    show_unittank: true
    theme: ""
    font_family: sans-serif
    font_size: 1em
    entities:
      - name: Tank 1
      - name: Tank 2
      - name: Tank 3

---

## Configuration Options

| Option | Default | Type | Description |
|---|---|---|---|
| `type` | `custom:tank-card` | string | Card type |
| `title` | `Tank Card` | string | Card title |
| `tank_count` | `3` | number | Number of tanks |
| `tank_capacity` | `1500` | number | Capacity per tank |
| `initial_fill` | `tank_count × tank_capacity` | number | Initial fill level of the entire system |
| `sensor_mode` | `consumption` | string | `consumption`, `fill_level_l`, or `fill_level_percent` |
| `consumption_sensor` | `""` | string | Consumption sensor |
| `level_sensor` | `""` | string | Level sensor |
| `unit` | `L` | string | `L`, `kg`, or `m3` |
| `tank_form` | `rect` | string | `rect`, `pool`, or `capsule` |
| `show_unittank` | `true` | boolean | Show the unit inside the tank |
| `content_type` | `heating_oil` | string | Material type |
| `theme` | `""` | string | Optional Home Assistant theme |
| `font_family` | `sans-serif` | string | Font family |
| `font_size` | `1em` | string | Font size |
| `entities` | `[]` | list | List of tanks with a `name` |

> **Removed in v0.4.0:** `bg_color`  
> Background styling is now handled through the Home Assistant theme.

---

## Sensor Modes

### Consumption Sensor

    sensor_mode: consumption
    consumption_sensor: sensor.heating_oil_consumption_total

The current tank level is calculated from the initial fill level and consumption:

`current_level = initial_fill - consumption`

### Absolute Level

    sensor_mode: fill_level_l
    level_sensor: sensor.heating_oil_level

The sensor value is used directly as the current tank level.

### Percentage Level

    sensor_mode: fill_level_percent
    level_sensor: sensor.heating_oil_level_percent

The sensor value is calculated relative to the total system capacity:

`total_capacity = tank_count × tank_capacity`

---

## Tank Shapes

- `rect` – rectangular tank
- `pool` – cylindrical / rounded tank
- `capsule` – capsule-shaped tank

---

## Supported Materials

- `heating_oil` – heating oil
- `water` – water
- `diesel` – diesel
- `gas` – gas
- `pellets` – pellets
- `wood_chips` – wood chips

---

## Version 0.4.0

Version 0.4.0 introduces:

- Updated visual editor
- Home Assistant theme support
- Updated `bg_color` handling

---

## 🧡 Donations

If you like **Tank Card** and would like to support its continued development, you are welcome to make a donation.

## Lightning

<p align="center">
⚡ <b>Address:</b><br><br>
<code>usefulplay52@walletofsatoshi.com</code><br><br>
<img width="320" alt="Self_Wallet of Satoshi" src="https://github.com/user-attachments/assets/65cc18d9-05d1-4a00-8ccc-9922fdb54baf" />
</p>

## Bitcoin

<div align="center">
<img src="https://github.com/user-attachments/assets/f74cad36-8c05-4a33-89cd-b998075af33b" /><br><br>
<code>bc1qkz7mtp23cmshxnru96lzgeayu0urlysvqk5vry</code><br><br>
<img alt="Donations_240px" src="https://github.com/user-attachments/assets/196f68e4-b0e8-4f27-bded-8c4fe13b9d45" />
</div>

Every donation is voluntary and helps support the continued development and maintenance of the project.

---

## 🐛 Support

Bug reports, suggestions, and feature requests are welcome.

Please create a [GitHub Issue](https://github.com/jinx-22/tank-card/issues) and provide the following information where possible:

- Home Assistant version
- Tank Card version
- Current configuration
- Relevant error messages
- Short description of the problem

Please remove any personal or sensitive information from configurations and logs.

---

## License

**Creative Commons BY-NC-SA 4.0**

[License details](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

🇩🇪 **Deutsch:** [README_DE.md](README_DE.md)

Made with ❤️ for Home Assistant
