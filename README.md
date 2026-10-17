# Tank Card – Tank Level Visualization

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration) [![GitHub total downloads](https://img.shields.io/github/downloads/jinx-22/tank-card/total?style=flat-square&color=red)](https://github.com/jinx-22/tank-card/releases/) [![GitHub release](https://img.shields.io/github/release/jinx-22/tank-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jinx-22/tank-card/releases/) [![File size](https://img.shields.io/github/size/jinx-22/tank-card/tank-card.js?branch=main&label=Card%20Size)](https://github.com/jinx-22/tank-card/blob/main/tank-card.js) [![last commit](https://img.shields.io/github/last-commit/jinx-22/tank-card/main)](https://github.com/jinx-22/tank-card/commits/main) [![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers) [![Donate Bitcoin](https://img.shields.io/badge/%E2%82%BF-Bitcoin-F7931A?style=flat-square)](#bitcoin) [![Donate Lightning](https://img.shields.io/badge/%E2%9A%A1-Lightning-FFD700?style=flat-square)](#lightning)

🇬🇧 **English** · 🇩🇪 [**Deutsch**](README_DE.md)

---

**Tank Card** is a Home Assistant custom card for visualizing tank levels, total capacity, and consumption.

**Current Version: 0.9.2**

## 🆕 0.9.2

- Level warning / signaling (warning level 1 orange, level 2 red) with configurable thresholds (default 20 % / 10 %)
- Visual glow + fading fog behind the tanks
- Optional notification automation, created directly from the card editor: Home Assistant notification and/or mobile app push, with optional repeat every x hours / days
- Automatic unit detection from the sensor (`unit: auto`), new unit `gal`, own units and configurable decimal places (`decimals`)
- Card height now defaults to 350 px (250–1000 px)
- Editor reorganized: guided questions under **Content**, liquid style moved to **Display**, new category **Level notification / signaling**
- Removed: `entities` (individual tank names), Hex colors for `custom_color`, and `%` / `em` / `px` values for `font_size` – see [Configuration Options](#-configuration-options)

<img width="50%" height="auto" alt="warn" src="https://github.com/user-attachments/assets/a4df9b41-6878-4e8f-be1a-7486a4f33984" />


> **Note:** After updating, hard-reload the dashboard with `Ctrl + F5` and clear the browser cache so the editor and card load the new version.

---

## 📖 About Tank Card

Supports consumption sensors as well as level sensors with absolute values or percentages. Suitable for heating oil, water, diesel, gas, pellets, wood chips, and other liquids or bulk materials — as well as free color displays.

The calculation depends on the selected sensor mode:

- **Consumption sensor:** `initial_fill - consumption`
- **Level sensor (L / kg / m³):** direct sensor value
- **Level sensor (%):** percentage based on the total capacity

### Highlights

- One or multiple tanks (1–20) with automatic numbering and a shared label
- Display of tank level and total capacity
- Consumption and level sensors (absolute or percentage)
- Tank shapes `rect`, `pool`, and `capsule`
- Tank type glass or metal
- Material- and color-dependent fill gradients / patterns
- Level warning / signaling (glow + optional notification automation)
- Wave animation and rising bubbles (for liquids)
- Units `L`, `gal`, `kg`, `m³` or your own, with automatic detection
- Configurable font size (50–200 %) and card height (250–1000 px)
- Optional Home Assistant theme
- Responsive layout (container queries)
- Visual Home Assistant editor
- English and German (follows HA language)
- Home Assistant–compliant card configuration

---

# 📦 Installation

## Easy install → [Open in HACS](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=tank-card&category=plugin)

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

```
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
unit: auto
tank_form: rect
tank_style: metal
show_unittank: true
show_title: true
show_tank_label: true
tank_label: Tank
animation: false
bubbles: false
warn_1: false
warn_1_level: 20
warn_2: false
warn_2_level: 10
warn_glow: false
warn_auto: false
warn_notify: true
warn_mobile: false
warn_repeat: 1
warn_repeat_unit: d
warn_time: "14:00:00"
theme: ""
font_size: 100
card_height: 350
```

---

# 📋 Configuration Options

| Option               | Default                      | Type    | Description                                                                                                                                             |
| -------------------- | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`               | `custom:tank-card`           | string  | Card type                                                                                                                                               |
| `title`              | `Tank Card`                  | string  | Card title                                                                                                                                              |
| `show_title`         | `true`                       | boolean | Show title                                                                                                                                              |
| `tank_count`         | `3`                          | number  | Number of tanks (1–20)                                                                                                                                  |
| `tank_capacity`      | `1500`                       | number  | Capacity per tank (in the measuring unit)                                                                                                               |
| `initial_fill`       | `tank_count × tank_capacity` | number  | Initial fill of the whole system (empty = full)                                                                                                         |
| `sensor_mode`        | `consumption`                | string  | `consumption`, `fill_level_l`, or `fill_level_percent`                                                                                                  |
| `consumption_sensor` | `""`                         | string  | Consumption sensor (only for `consumption`)                                                                                                             |
| `level_sensor`       | `""`                         | string  | Level sensor (for both level modes)                                                                                                                     |
| `unit`               | `auto`                       | string  | `auto`, `L`, `gal`, `m3`, `kg`, or your own unit (e.g. `t`). `auto` uses the unit of the sensor, otherwise the Home Assistant unit system (`L` / `gal`) |
| `decimals`           | automatic                    | number  | Decimal places (0–5). Empty = 2 for `m³` / `t`, otherwise 0                                                                                             |
| `tank_form`          | `rect`                       | string  | `rect`, `pool`, or `capsule`                                                                                                                            |
| `tank_style`         | `metal`                      | string  | `metal` or `glass`                                                                                                                                      |
| `gas_tank`           | `false`                      | boolean | Legs and dome (only metal + capsule + 1 tank)                                                                                                           |
| `show_unittank`      | `true`                       | boolean | Show amount per tank in the fill bar                                                                                                                    |
| `show_tank_label`    | `true`                       | boolean | Show tank label                                                                                                                                         |
| `tank_label`         | `Tank`                       | string  | Shared name of the tanks (numbering automatic)                                                                                                          |
| `show_max`           | `true`                       | boolean | Show “Max:”                                                                                                                                             |
| `show_current`       | `true`                       | boolean | Show “Current:”                                                                                                                                         |
| `show_fill_level`    | `true`                       | boolean | Show “Level:”                                                                                                                                           |
| `show_consumption`   | `true`                       | boolean | Show “Consumption:”                                                                                                                                     |
| `content_type`       | `heating_oil`                | string  | Material / color (see below)                                                                                                                            |
| `custom_color`       | `[33, 150, 243]`             | list    | RGB `[r, g, b]` (only with `content_type: custom`)                                                                                                      |
| `liquid_style`       | `classic`                    | string  | `classic` (previous look) or `new`                                                                                                                      |
| `animation`          | `false`                      | boolean | Wave animation (liquids only)                                                                                                                           |
| `animation_interval` | `30`                         | number  | Wave interval in seconds (5–60)                                                                                                                         |
| `bubbles`            | `false`                      | boolean | Rising bubbles (liquids only)                                                                                                                           |
| `bubble_amount`      | `3`                          | number  | Amount of bubbles (1–8)                                                                                                                                 |
| `warn_1`             | `false`                      | boolean | Enable warning level 1 (orange)                                                                                                                         |
| `warn_1_level`       | `20`                         | number  | Warning level 1 below a fill level of (%), 1–99                                                                                                         |
| `warn_2`             | `false`                      | boolean | Enable warning level 2 (red)                                                                                                                            |
| `warn_2_level`       | `10`                         | number  | Warning level 2 below a fill level of (%), 1–99                                                                                                         |
| `warn_glow`          | `false`                      | boolean | Signal warning levels visually (glow and fog)                                                                                                           |
| `warn_auto`          | `false`                      | boolean | Notification automation (created in the editor, see below)                                                                                              |
| `warn_notify`        | `true`                       | boolean | Home Assistant notification (via the automation)                                                                                                        |
| `warn_mobile`        | `false`                      | boolean | Mobile app push notification (via the automation)                                                                                                       |
| `warn_repeat`        | `1`                          | number  | Repeat the notification every … (0–100, 0 = no repeat)                                                                                                  |
| `warn_repeat_unit`   | `d`                          | string  | `h` (hours) or `d` (days)                                                                                                                               |
| `warn_time`          | `"14:00:00"`                 | string  | Time of day for the repeat (only with `warn_repeat_unit: d`)                                                                                            |
| `theme`              | `""`                         | string  | Optional HA theme                                                                                                                                       |
| `font_size`          | `100`                        | number  | Font size in percent (50–200)                                                                                                                           |
| `card_height`        | `350`                        | number  | Card height in pixels (250–1000). In the sections view the layout tab takes precedence                                                                  |

> **Removed since v0.4.0:** `bg_color`
> Background styling is handled by the Home Assistant theme.

> **Removed since v0.9.2:** `entities` (individual tank names, use `tank_label` instead), Hex values for `custom_color` (use `[r, g, b]`), and `%` / `em` / `px` values for `font_size` (use a number).

---

# 📊 Sensor Modes

### Consumption sensor

```
sensor_mode: consumption
consumption_sensor: sensor.heating_oil_consumption_total
```

Current level:

`current_level = initial_fill - consumption`  
(clamped to 0 … total capacity)

### Absolute level

```
sensor_mode: fill_level_l
level_sensor: sensor.heating_oil_level
```

The sensor value is used directly as the current tank level (clamped to 0 … total capacity).

### Percentage level

```
sensor_mode: fill_level_percent
level_sensor: sensor.heating_oil_level_percent
```

The sensor value (0–100 %) is applied to the total capacity:

`total_capacity = tank_count × tank_capacity`  
`current_level = total_capacity × percentage / 100`

---

# 📏 Units

With `unit: auto` the card takes the unit from the selected sensor (`unit_of_measurement`). If the sensor has no unit (or reports `%`), the Home Assistant unit system decides (`L` or `gal`). Alternatively choose `L`, `gal`, `m3`, `kg`, or enter your own unit such as `t`.

`tank_capacity` and `initial_fill` are entered in the same measuring unit. By default amounts are shown without decimal places, `m³` and `t` with two. Use `decimals` (0–5) to change this.

---

# 🛢️ Tank Shapes

- `rect` – rectangular tank (cuboid)
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

# 🚨 Level Warnings & Notifications

The Tank Card supports two configurable warning levels:

- **Warning level 1:** orange
- **Warning level 2:** red

Both warning levels are disabled by default and can be enabled independently of each other. For each level you set the fill level in percent below which the warning is triggered (defaults: 20 % and 10 %). If both levels are enabled, level 2 is always kept below level 1. A hysteresis of 0.5 percentage points prevents the warning levels from switching back and forth rapidly near a threshold.

### Visual signaling

`warn_glow: true` lets the tanks pulse in orange (level 1) or red (level 2) with a fading fog behind them. Level 2 pulses faster. With “reduce motion” enabled in the system, a static glow is shown instead.

When you enable the first warning level in the editor, `warn_glow` and `warn_notify` are switched on automatically (they can be turned off again).

### Notification automation

A card only runs while a dashboard is open, so notifications are sent by a Home Assistant **automation** that the card editor creates for you:

1. Enable at least one warning level and select a sensor.
2. Turn on `warn_auto` and choose the channels:
   - `warn_notify: true` – Home Assistant notification (bell in the sidebar, also visible on mobile)
   - `warn_mobile: true` – push notification to all devices with the Home Assistant Companion app (tapping it opens the dashboard)
3. Optionally set `warn_repeat` and `warn_repeat_unit`. As long as the level stays below the threshold, the notification is repeated at this interval: with `d` every day at `warn_time`, with `h` on a fixed schedule at full hours. `0` = no repeat.
4. Click **Create automation**.

The editor shows whether the automation is up to date. Changes to the card settings only take effect after **Update automation**; **Delete automation** removes it again. The automation is named “<title> Notification”. Please change its settings only in the card editor, manual changes are overwritten. Administrator rights are required.

When the tank is refilled and the level rises above the threshold again, the notifications are removed automatically.

---

# 📸 Screenshot

<img width="40%" height="auto" alt="New-look" src="https://github.com/user-attachments/assets/fdb74b57-51d6-444a-9698-ff5592e45c80" />

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
