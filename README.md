# Tank Card – Tank Level Visualization

🇬🇧 English · 🇩🇪 [Deutsch](README_DE.md)

---

Tank Card is a Home Assistant custom card for visualizing tank levels, total capacity, and consumption.

**Current Version: 0.9.2**

## 🆕 0.9.2

- Tank level warnings and visual signaling (warning level 1 orange, level 2 red)
- Configurable warning thresholds (default 20% / 10%)
- Home Assistant notifications when a warning level is reached (cleared after refilling)
- Optional mobile app push notifications
- Visual glow and fading fog behind the tanks
- Editor: new **Level Warnings / Signaling** category

  <img width="60%" height="auto" alt="warn" src="https://github.com/user-attachments/assets/59d4b6d2-c54b-4237-b539-f5305c153713" />

> **Note:** After updating, hard-reload the dashboard with `Ctrl + F5` and clear the browser cache so the editor and card load the new version.

---

## 📖 About Tank Card

Supports consumption sensors as well as level sensors with absolute values or percentages. Suitable for heating oil, water, diesel, gas, pellets, wood chips, and other liquids or bulk materials — as well as custom colors.

The calculation depends on the selected sensor mode:

- Consumption sensor: `initial_fill - consumption`
- Level sensor (L / kg / m³): direct sensor value
- Level sensor (%): percentage based on the total capacity

### Highlights

- One or multiple tanks (1–20) with individual names
- Display of tank level and total capacity
- Consumption and level sensors (absolute or percentage)
- Tank shapes `rect`, `pool`, and `capsule`
- Metal and glass tank styles
- Material- and color-dependent fill gradients and patterns
- Configurable level warnings with notifications and visual signaling
- Wave animation and rising bubbles (for liquids)
- Units `L`, `kg`, and `m³`
- Configurable font size (50–200%)
- Optional Home Assistant theme
- Responsive layout using container queries
- Visual Home Assistant editor
- English and German (follows the Home Assistant language)
- Home Assistant-compliant card configuration

---

# 📦 Installation

[![Open your Home Assistant instance and open HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=tank-card&category=plugin)

## HACS

1. Open HACS.
2. Select **Frontend**.
3. Search for **Tank Card**.
4. Install the card.
5. Reload Home Assistant or the browser.

## Manual

1. Download `tank-card.js`.
2. Copy it to `/config/www/community/tank-card/`.
3. Under **Settings → Dashboards → Resources**, add the following resource:

   `/local/community/tank-card/tank-card.js`

   **Type:** JavaScript Module

4. Reload the browser, for example with `Ctrl + F5`.

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
    warn_1: false
    warn_1_level: 20
    warn_2: false
    warn_2_level: 10
    warn_notify: true
    warn_mobile: false
    warn_glow: false
    theme: ""
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
| `show_title` | `true` | boolean | Show the card title |
| `tank_count` | `3` | number | Number of tanks (1–20) |
| `tank_capacity` | `1500` | number | Capacity per tank |
| `initial_fill` | `tank_count × tank_capacity` | number | Initial fill of the entire system (empty = full) |
| `sensor_mode` | `consumption` | string | `consumption`, `fill_level_l`, or `fill_level_percent` |
| `consumption_sensor` | `""` | string | Consumption sensor (only for `consumption`) |
| `level_sensor` | `""` | string | Level sensor (for both level modes) |
| `unit` | `L` | string | `L`, `kg`, or `m3` |
| `tank_form` | `rect` | string | `rect`, `pool`, or `capsule` |
| `tank_style` | `metal` | string | `metal` or `glass` |
| `gas_tank` | `false` | boolean | Legs and dome (only metal + capsule + exactly one tank) |
| `show_unittank` | `true` | boolean | Show the amount per tank inside the fill bar |
| `show_tank_label` | `true` | boolean | Show the tank label |
| `tank_label` | `Tank` | string | Shared tank name (numbering is automatic) |
| `show_max` | `true` | boolean | Show "Max:" |
| `show_current` | `true` | boolean | Show "Current:" |
| `show_fill_level` | `true` | boolean | Show "Level:" |
| `show_consumption` | `true` | boolean | Show "Consumption:" |
| `content_type` | `heating_oil` | string | Material / color (see below) |
| `custom_color` | `[33, 150, 243]` | list / string | RGB or Hex color (only with `content_type: custom`) |
| `liquid_style` | `classic` | string | `classic` (previous appearance) or `new` |
| `animation` | `false` | boolean | Wave animation (liquids only) |
| `animation_interval` | `30` | number | Wave interval in seconds (5–60) |
| `warn_1` | `false` | boolean | Enable warning level 1 (orange) |
| `warn_1_level` | `20` | number | Trigger warning level 1 below this fill percentage (%) |
| `warn_2` | `false` | boolean | Enable warning level 2 (red) |
| `warn_2_level` | `10` | number | Trigger warning level 2 below this fill percentage (%) |
| `warn_notify` | `true` | boolean | Send Home Assistant notifications |
| `warn_mobile` | `false` | boolean | Send mobile app push notifications |
| `warn_glow` | `false` | boolean | Visually signal warning levels with glow and fog |
| `bubbles` | `false` | boolean | Rising bubbles (liquids only) |
| `bubble_amount` | `3` | number | Number of bubbles (1–8) |
| `theme` | `""` | string | Optional Home Assistant theme |
| `font_size` | `100` | number / string | Font size (number = %, also `%`, `em`, or `px`; displayed range 50–200%) |
| `entities` | `[]` | list | List of tanks with a `name` |

> Removed since v0.4.0: `bg_color`  
> Background styling is handled by the Home Assistant theme.

---

# 📊 Sensor Modes

### Consumption Sensor

    sensor_mode: consumption
    consumption_sensor: sensor.heating_oil_consumption_total

Current fill level:

`current_level = initial_fill - consumption`

The result is clamped to the range from zero to the total capacity.

### Absolute Fill Level

    sensor_mode: fill_level_l
    level_sensor: sensor.heating_oil_level

The sensor value is used directly as the current fill level and clamped to the range from zero to the total capacity.

### Percentage Fill Level

    sensor_mode: fill_level_percent
    level_sensor: sensor.heating_oil_level_percent

The sensor value (0–100%) is applied to the total capacity:

`total_capacity = tank_count × tank_capacity`

`current_level = total_capacity × percentage / 100`

---

# 🛢️ Tank Shapes

- `rect` – rectangular tank
- `pool` – cylindrical / rounded tank
- `capsule` – capsule-shaped tank

### Tank Styles

- `metal` – metal tank
- `glass` – glass tank

### Gas Tank

`gas_tank: true` enables the legs and dome. This option is available only when `tank_style: metal`, `tank_form: capsule`, and exactly one tank is configured.

---

# 🧪 Supported Materials & Colors

### Materials / Bulk Materials

- `heating_oil` – heating oil
- `water` – water
- `diesel` – diesel
- `gas` – gas
- `pellets` – wood pellets
- `wood_chips` – wood chips
- `custom` – custom color using `custom_color`

### Liquid Appearance

- `classic` – previous appearance (brighter at the bottom)
- `new` – new appearance (brighter at the top)

> Wave animation and bubbles are not used for pellets and wood chips because they are bulk materials.

---

# 🚨 Level Warnings & Notifications

Tank Card supports two configurable warning levels:

- **Warning level 1:** orange
- **Warning level 2:** red

Both warning levels are disabled by default. Enable them individually and configure the fill percentage at which each warning should trigger.

### Notification Options

- `warn_notify: true` enables Home Assistant notifications.
- `warn_mobile: true` enables mobile app push notifications.
- `warn_glow: true` enables visual warning signals using glow and fog effects.

The default thresholds are 20% for warning level 1 and 10% for warning level 2.

When the tank is refilled, the warning notification state is cleared according to the card's warning logic.

---
# Screenshot:

<img width="50%" height="auto" alt="New-look" src="https://github.com/user-attachments/assets/fdb74b57-51d6-444a-9698-ff5592e45c80" />

---

# 🐛 Issues & Feature Requests

When reporting an issue, please provide:

- Home Assistant version
- Tank Card version
- Current configuration
- Relevant error messages
- A short description of the problem

Please remove personal or confidential information from configurations and logs.

[Create a GitHub Issue](https://github.com/jinx-22/tank-card/issues).

---

# 🧡 Support & Donations

### Lightning

`usefulplay52@walletofsatoshi.com`

### Bitcoin

`bc1qkz7mtp23cmshxnru96lzgeayu0urlysvqk5vry`

Thank you for your support. A free ⭐ helps others discover the project.

---

# 📜 License

Apache-2.0

---

Made with ❤️ for Home Assistant
