# Tank Card – Tank Level Visualization

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
![GitHub total downloads](https://img.shields.io/github/downloads/jinx-22/tank-card/total?style=flat-square&color=red)
[![GitHub release](https://img.shields.io/github/release/jinx-22/tank-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jinx-22/tank-card/releases/)
![File size](https://img.shields.io/github/size/jinx-22/tank-card/tank-card.js?label=Card%20Size)
![last commit](https://img.shields.io/github/last-commit/jinx-22/tank-card)
[![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers)
[![Donate Bitcoin](https://img.shields.io/badge/₿-Bitcoin-F7931A?style=flat-square)](#bitcoin)
[![Donate Lightning](https://img.shields.io/badge/⚡-Lightning-FFD700?style=flat-square)](#lightning)

🇬🇧 **English** · 🇩🇪 [**Deutsch**](README_DE.md)

---

**Tank Card** is a Home Assistant custom card for visualizing tank levels, total capacity, and consumption.

**Current Version: 0.9.0**

## 🆕 0.9.0

- Glass and metal tank 
- Gas tank with legs and dome (capsule + metal, single tank)
- Liquid style selectable: previous or new look
- New look for wood pellets and wood chips
- Custom color via `content_type: custom` and `custom_color`
- Wave animation and rising bubbles
- Title and tank label individually show/hide
- Shared tank label with automatic numbering
- Tap on the card opens the sensor details
- Editor: new Animation category, font size and design moved under Display
- Font size of the per-tank value increased and adapts to tank width on narrow tanks
- Optical fill height corrected

<img width="60%" height="auto" alt="editor" src="https://github.com/user-attachments/assets/eae75993-cd21-4484-98b5-5f8c3b40bb23" />
<img width="30%" height="auto" alt="New-look" src="https://github.com/user-attachments/assets/fdb74b57-51d6-444a-9698-ff5592e45c80" />


> **Note:** After updating, hard-reload the dashboard with `Ctrl + F5` and clear the browser cache so the editor and card load the new version.

---

## 📖 About Tank Card

Supports consumption sensors as well as level sensors with absolute values or percentages. Suitable for heating oil, water, diesel, gas, pellets, wood chips, and other liquids or bulk materials — as well as free color displays.

The calculation depends on the selected sensor mode:

- **Consumption sensor:** `initial_fill - consumption`
- **Level sensor (L / kg / m³):** direct sensor value
- **Level sensor (%):** percentage based on the total capacity

### Highlights

- One or multiple tanks (1–20) with individual names
- Display of tank level and total capacity
- Consumption and level sensors (absolute or percentage)
- Tank shapes `rect`, `pool`, and `capsule`
- Tank type glass or metal
- Material- and color-dependent fill gradients / patterns
- Wave animation and rising bubbles (for liquids)
- Units `L`, `kg`, and `m³`
- Configurable font size (50–200 %)
- Optional Home Assistant theme
- Responsive layout (container queries)
- Visual Home Assistant editor
- English and German (follows HA language)
- Home Assistant–compliant card configuration

---

# 📦 Installation

## Easy install → [![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=tank-card&category=plugin)

## HACS

1. Open **HACS**
2. Select **Frontend**
3. Search for **Tank Card**
4. Install the card
5. Reload Home Assistant or the browser

## Manual

1. Download `tank-card.js`
2. Copy it to `/config/www/community/tank-card/`
3. Under **Settings → Dashboards → Resources** add the following resource:

`/local/community/tank-card/tank-card.js`

Type: **JavaScript Module**

Afterwards, reload the browser, e.g. with **Ctrl + F5**.

---

# ⚙️ Example Configuration

```yaml
type: custom:tank-card
title: Tank Card
tank_count: 3
tank_capacity: 1500
initial_fill: 4500
sensor_mode: consumption
consumption_sensor: sensor.heating_oil_consumption_total
level_sensor: ""
content_type: heating_oil
liquid_style: classic
unit: L
tank_form: rect
tank_style: metal
show_unittank: true
show_title: true
show_tank_label: true
tank_label: Tank
animation: false
bubbles: false
theme: ""
font_size: 100
entities:
  - name: Tank 1
  - name: Tank 2
  - name: Tank 3
```

---

# 📋 Configuration Options

| Option | Default | Type | Description |
|---|---|---|---|
| `type` | `custom:tank-card` | string | Card type |
| `title` | `Tank Card` | string | Card title |
| `show_title` | `true` | boolean | Show title |
| `tank_count` | `3` | number | Number of tanks (1–20) |
| `tank_capacity` | `1500` | number | Capacity per tank |
| `initial_fill` | `tank_count × tank_capacity` | number | Initial fill of the whole system (empty = full) |
| `sensor_mode` | `consumption` | string | `consumption`, `fill_level_l`, or `fill_level_percent` |
| `consumption_sensor` | `""` | string | Consumption sensor (only for `consumption`) |
| `level_sensor` | `""` | string | Level sensor (for both level modes) |
| `unit` | `L` | string | `L`, `kg`, or `m3` |
| `tank_form` | `rect` | string | `rect`, `pool`, or `capsule` |
| `tank_style` | `metal` | string | `metal` or `glass` |
| `gas_tank` | `false` | boolean | Legs and dome (only metal + capsule + 1 tank) |
| `show_unittank` | `true` | boolean | Show amount per tank in the fill bar |
| `show_tank_label` | `true` | boolean | Show tank label |
| `tank_label` | `Tank` | string | Shared name of the tanks (numbering automatic) |
| `show_max` | `true` | boolean | Show “Max:” |
| `show_current` | `true` | boolean | Show “Current:” |
| `show_fill_level` | `true` | boolean | Show “Level:” |
| `show_consumption` | `true` | boolean | Show “Consumption:” |
| `content_type` | `heating_oil` | string | Material / color (see below) |
| `custom_color` | `[33, 150, 243]` | list / string | RGB or Hex (only with `content_type: custom`) |
| `liquid_style` | `classic` | string | `classic` (previous look) or `new` |
| `animation` | `false` | boolean | Wave animation (liquids only) |
| `animation_interval` | `30` | number | Wave interval in seconds (5–60) |
| `bubbles` | `false` | boolean | Rising bubbles (liquids only) |
| `bubble_amount` | `3` | number | Amount of bubbles (1–8) |
| `theme` | `""` | string | Optional HA theme |
| `font_size` | `100` | number / string | Font size (number = %, also `%` / `em` / `px`; display 50–200 %) |
| `entities` | `[]` | list | List of tanks with `name` |

> **Removed since v0.4.0:** `bg_color`  
> Background styling is handled by the Home Assistant theme.

---

# 📊 Sensor Modes

### Consumption sensor

```yaml
sensor_mode: consumption
consumption_sensor: sensor.heating_oil_consumption_total
```

Current level:

`current_level = initial_fill - consumption`  
(clamped to 0 … total capacity)

### Absolute level

```yaml
sensor_mode: fill_level_l
level_sensor: sensor.heating_oil_level
```

The sensor value is used directly as the current tank level (clamped to 0 … total capacity).

### Percentage level

```yaml
sensor_mode: fill_level_percent
level_sensor: sensor.heating_oil_level_percent
```

The sensor value (0–100 %) is applied to the total capacity:

`total_capacity = tank_count × tank_capacity`  
`current_level = total_capacity × percentage / 100`

---

# 🛢️ Tank Shapes

- `rect` – rectangular tank
- `pool` – cylindrical / rounded tank
- `capsule` – capsule tank

**Tank type**

- `metal` – metal tank
- `glass` – glass tank

**Gas tank**

- `gas_tank: true` – legs and dome (only with `tank_style: metal`, `tank_form: capsule`, and exactly one tank)

---

# 🧪 Supported Materials & Colors

**Materials / bulk goods**

- `heating_oil` – heating oil
- `water` – water
- `diesel` – diesel
- `gas` – gas
- `pellets` – pellets
- `wood_chips` – wood chips
- `custom` – custom color via `custom_color`

**Liquid style**

- `classic` – previous look (bright at the bottom)
- `new` – new look (bright at the top)

> For pellets and wood chips, wave and bubbles are disabled (bulk material).

---

# 🐛 Issues & Feature Requests

Please provide the following information:

- Home Assistant version
- Tank Card version
- Current configuration
- Relevant error messages
- Short description of the problem

Please remove any personal or sensitive information from configurations and logs.

Create a [GitHub Issue](https://github.com/jinx-22/tank-card/issues).

---

# 🧡 Support & Donations

<div align="center">

### <a id="lightning"></a>Lightning

<img width="32" alt="Lightning" src="https://github.com/user-attachments/assets/0bff59d2-7986-46cf-9d39-17fe0dbb128a" />

`usefulplay52@walletofsatoshi.com`

<img height="300" alt="Lightning - Wallet of Satoshi" src="https://github.com/user-attachments/assets/65cc18d9-05d1-4a00-8ccc-9922fdb54baf" />

### <a id="bitcoin"></a>Bitcoin

<img width="32" alt="Bitcoin" src="https://github.com/user-attachments/assets/f74cad36-8c05-4a33-89cd-b998075af33b" />

`bc1qkz7mtp23cmshxnru96lzgeayu0urlysvqk5vry`

<img height="300" alt="Bitcoin donation" src="https://github.com/user-attachments/assets/196f68e4-b0e8-4f27-bded-8c4fe13b9d45" />

</div>

Thank you for your support — a free ⭐ helps others discover the project:

[![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers)

---

# 📜 License

**Apache-2.0**

---

Made with ❤️ for Home Assistant
