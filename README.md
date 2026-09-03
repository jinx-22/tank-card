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

**Current Version: 0.6.4**

## 🆕 0.6.4

- Improved editor order
- Unneeded sensor fields are disabled depending on the selected option
- Editor further aligned with Home Assistant conventions
- Simpler and clearer configuration

> **Note:** After updating, hard-refresh the dashboard with `Ctrl + F5` and clear the browser cache so the editor and card load the new version.

---

## 📖 About Tank Card

**Tank Card** is a Home Assistant custom card for visualizing tank levels, total capacity, and consumption.

It supports consumption sensors as well as level sensors with absolute values or percentages. Suitable for heating oil, water, diesel, gas, pellets, wood chips, and other liquids or bulk materials — as well as free color displays.

The calculation depends on the selected sensor mode:

- **Consumption sensor:** `initial_fill - consumption`
- **Level sensor (L / kg / m³):** direct sensor value
- **Level sensor (%):** percentage based on the total capacity

### Highlights

- One or multiple tanks (1–20) with individual names
- Display of tank level and total capacity
- Consumption and level sensors (absolute or percentage)
- Tank shapes `rect`, `pool`, and `capsule`
- Material- and color-dependent fill gradients / patterns
- Units `L`, `kg`, and `m³`
- Configurable font family and font size (50–200 %)
- Optional Home Assistant theme
- Responsive layout (container queries)
- Home Assistant visual editor with helper texts
- English and German (follows the HA language)
- Home Assistant-compliant card configuration

---

# 📦 Installation

## Easy installation → [![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=tank-card&category=plugin)

## HACS

1. Open **HACS**
2. Select **Frontend**
3. Search for **Tank Card**
4. Install the card
5. Reload Home Assistant or your browser

## Manual

1. Download `tank-card.js`
2. Copy it to `/config/www/community/tank-card/`
3. In Home Assistant, open **Settings → Dashboards → Resources** and add:

   `/local/community/tank-card/tank-card.js`

   Resource type: **JavaScript Module**

Afterwards, reload your browser, for example with **Ctrl + F5**.

---

# ⚙️ Example Configuration

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
    font_family: inherit
    font_size: 100
    entities:
      - name: Tank 1
      - name: Tank 2
      - name: Tank 3

---

# 📋 Configuration Options

| Option | Default | Type | Description |
|---|---|---|---|
| `type` | `custom:tank-card` | string | Card type |
| `title` | `Tank Card` | string | Card title |
| `tank_count` | `3` | number | Number of tanks (1–20) |
| `tank_capacity` | `1500` | number | Capacity per tank |
| `initial_fill` | `tank_count × tank_capacity` | number | Initial fill level of the entire system |
| `sensor_mode` | `consumption` | string | `consumption`, `fill_level_l`, or `fill_level_percent` |
| `consumption_sensor` | `""` | string | Consumption sensor (only for `consumption`) |
| `level_sensor` | `""` | string | Level sensor (for both level modes) |
| `unit` | `L` | string | `L`, `kg`, or `m3` |
| `tank_form` | `rect` | string | `rect`, `pool`, or `capsule` |
| `show_unittank` | `true` | boolean | Show amount per tank in the fill bar |
| `content_type` | `heating_oil` | string | Material / color (see below) |
| `theme` | `""` | string | Optional HA theme |
| `font_family` | `inherit` | string | Font family |
| `font_size` | `100` | number / string | Font size (number = %, also `%` / `em` / `px`; display limited to 50–200 %) |
| `entities` | `[]` | list | List of tanks with `name` |

> **Removed since v0.4.0:** `bg_color`  
> Background styling is handled through the Home Assistant theme.

<img width="797" height="672" alt="tankUnbenannt" src="https://github.com/user-attachments/assets/93ad16d6-bd15-4ed5-afac-4c9d66b0a496" />


---

# 📊 Sensor Modes

### Consumption Sensor

    sensor_mode: consumption
    consumption_sensor: sensor.heating_oil_consumption_total

Current level:

`current_level = initial_fill - consumption`  
(clamped to 0 … total capacity)

### Absolute Level

    sensor_mode: fill_level_l
    level_sensor: sensor.heating_oil_level

The sensor value is used directly as the current tank level (clamped to 0 … total capacity).

### Percentage Level

    sensor_mode: fill_level_percent
    level_sensor: sensor.heating_oil_level_percent

The sensor value (0–100 %) is calculated relative to the total system capacity:

`total_capacity = tank_count × tank_capacity`  
`current_level = total_capacity × percentage / 100`

---

# 🛢️ Tank Shapes

- `rect` – rectangular tank
- `pool` – cylindrical / rounded tank
- `capsule` – capsule-shaped tank

---

# 🧪 Supported Materials & Colors

**Materials / bulk goods**

- `heating_oil` – heating oil
- `water` – water
- `diesel` – diesel
- `gas` – gas
- `pellets` – pellets
- `wood_chips` – wood chips

**Additional color options (documented in 0.5.0)**

- `orange`
- `red`
- `brown`
- `blue`
- `yellow`

<img width="620" height="762" alt="editorUnbenannt" src="https://github.com/user-attachments/assets/b49d3ef9-836f-417c-b29a-ffc1296d459e" />



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

## Lightning

<p align="center">
⚡ <b>Address:</b><br><br>
<code>usefulplay52@walletofsatoshi.com</code><br><br>
<img width="280" alt="Wallet of Satoshi" src="https://github.com/user-attachments/assets/65cc18d9-05d1-4a00-8ccc-9922fdb54baf" />
</p>

## Bitcoin

<div align="center">
<img src="https://github.com/user-attachments/assets/f74cad36-8c05-4a33-89cd-b998075af33b" /><br><br>
<code>bc1qkz7mtp23cmshxnru96lzgeayu0urlysvqk5vry</code><br><br>
<img width="220" alt="Bitcoin Donations" src="https://github.com/user-attachments/assets/196f68e4-b0e8-4f27-bded-8c4fe13b9d45" />
</div>

Thank you for your support — even a free ⭐ helps others discover the project:

[![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers)

---

# 📜 License

**Apache-2.0**

---

Made with ❤️ for Home Assistant
