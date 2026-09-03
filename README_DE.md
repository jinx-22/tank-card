# Tank Card – Tankfüllstands-Visualisierung

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
![GitHub total downloads](https://img.shields.io/github/downloads/jinx-22/tank-card/total?style=flat-square&color=red)
[![GitHub release](https://img.shields.io/github/release/jinx-22/tank-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jinx-22/tank-card/releases/)
![File size](https://img.shields.io/github/size/jinx-22/tank-card/tank-card.js?label=Card%20Size)
![last commit](https://img.shields.io/github/last-commit/jinx-22/tank-card)
[![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers)
[![Donate Bitcoin](https://img.shields.io/badge/₿-Bitcoin-F7931A?style=flat-square)](#bitcoin)
[![Donate Lightning](https://img.shields.io/badge/⚡-Lightning-FFD700?style=flat-square)](#lightning)

🇬🇧 [**English**](README.md) · 🇩🇪 **Deutsch**

---

**Tank Card** ist eine Home-Assistant-Custom-Card zur Visualisierung von Tankfüllständen, Gesamtkapazität und Verbrauch.

**Aktuelle Version: 0.6.4**

## 🆕 0.6.4

- Editor-Reihenfolge überarbeite6
- Nicht benötigte Sensorfelder werden abhängig von der Auswahl deaktiviert
- Editor weiter an die Home-Assistant-Konventionen angepasst
- Einfachere und übersichtlichere Konfiguration

> **Hinweis:** Nach dem Update das Dashboard mit `Strg + F5` hart neu laden und den Browser-Cache löschen, damit Editor und Karte die neue Version laden.

---

## 📖 Über Tank Card

Unterstützt werden Verbrauchssensoren sowie Füllstandssensoren mit absoluten Werten oder Prozentangaben. Geeignet für Heizöl, Wasser, Diesel, Gas, Pellets, Hackschnitzel und weitere Flüssigkeiten oder Schüttgüter – sowie für freie Farbdarstellungen.

Die Berechnung hängt vom gewählten Sensormodus ab:

- **Verbrauchssensor:** `initial_fill - consumption`
- **Füllstandssensor (L / kg / m³):** direkter Sensorwert
- **Füllstandssensor (%):** Prozentwert bezogen auf die Gesamtkapazität

### Highlights

- Ein oder mehrere Tanks (1–20) mit individuellen Namen
- Anzeige von Füllstand und Gesamtkapazität
- Verbrauchs- und Füllstandssensoren (absolut oder prozentual)
- Tankformen `rect`, `pool` und `capsule`
- Material- und farbabhängige Füllverläufe / Muster
- Einheiten `L`, `kg` und `m³`
- Konfigurierbare Schriftgröße (50–200 %)
- Optionales Home-Assistant-Theme
- Responsives Layout (Container Queries)
- Visueller Home-Assistant-Editor
- Englisch und Deutsch (folgt der HA-Sprache)
- Home-Assistant-konforme Kartenkonfiguration

---

# 📦 Installation

## Einfache Installation → [![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=tank-card&category=plugin)

## HACS

1. **HACS** öffnen
2. **Frontend** auswählen
3. Nach **Tank Card** suchen
4. Karte installieren
5. Home Assistant bzw. den Browser neu laden

## Manuell

1. `tank-card.js` herunterladen
2. Nach `/config/www/community/tank-card/` kopieren
3. Unter **Einstellungen → Dashboards → Ressourcen** folgende Ressource hinzufügen:

   `/local/community/tank-card/tank-card.js`

   Typ: **JavaScript-Modul**

Anschließend den Browser neu laden, z. B. mit **Strg + F5**.

---

# ⚙️ Beispiel-Konfiguration

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

# 📋 Konfigurationsoptionen

| Option | Standard | Typ | Beschreibung |
|---|---|---|---|
| `type` | `custom:tank-card` | string | Kartentyp |
| `title` | `Tank Card` | string | Kartentitel |
| `tank_count` | `3` | number | Anzahl der Tanks (1–20) |
| `tank_capacity` | `1500` | number | Kapazität pro Tank |
| `initial_fill` | `tank_count × tank_capacity` | number | Anfangsfüllstand des Gesamtsystems |
| `sensor_mode` | `consumption` | string | `consumption`, `fill_level_l` oder `fill_level_percent` |
| `consumption_sensor` | `""` | string | Verbrauchssensor (nur bei `consumption`) |
| `level_sensor` | `""` | string | Füllstandssensor (bei beiden Level-Modi) |
| `unit` | `L` | string | `L`, `kg` oder `m3` |
| `tank_form` | `rect` | string | `rect`, `pool` oder `capsule` |
| `show_unittank` | `true` | boolean | Menge pro Tank im Füllbalken anzeigen |
| `content_type` | `heating_oil` | string | Material / Farbe (siehe unten) |
| `theme` | `""` | string | Optionales HA-Theme |
| `font_family` | `inherit` | string | Schriftart |
| `font_size` | `100` | number / string | Schriftgröße (Zahl = %, auch `%` / `em` / `px`; Anzeige 50–200 %) |
| `entities` | `[]` | list | Liste der Tanks mit `name` |

> **Entfernt seit v0.4.0:** `bg_color`  
> Die Hintergrundgestaltung erfolgt über das Home-Assistant-Theme.

---

# 📊 Sensormodi

### Verbrauchssensor

    sensor_mode: consumption
    consumption_sensor: sensor.heating_oil_consumption_total

Aktueller Füllstand:

`current_level = initial_fill - consumption`  
(begrenzt auf 0 … Gesamtkapazität)

### Absoluter Füllstand

    sensor_mode: fill_level_l
    level_sensor: sensor.heating_oil_level

Sensorwert wird direkt als aktueller Füllstand verwendet (begrenzt auf 0 … Gesamtkapazität).

### Prozentualer Füllstand

    sensor_mode: fill_level_percent
    level_sensor: sensor.heating_oil_level_percent

Sensorwert (0–100 %) wird auf die Gesamtkapazität bezogen:

`total_capacity = tank_count × tank_capacity`  
`current_level = total_capacity × percentage / 100`

---

# 🛢️ Tankformen

- `rect` – rechteckiger Tank
- `pool` – zylindrischer / abgerundeter Tank
- `capsule` – Kapsel-Tank

---

# 🧪 Unterstützte Materialien & Farben

**Materialien / Schüttgüter**

- `heating_oil` – Heizöl
- `water` – Wasser
- `diesel` – Diesel
- `gas` – Gas
- `pellets` – Pellets
- `wood_chips` – Hackschnitzel

**Zusätzliche Farboptionen (neu in 0.5.0 dokumentiert)**

- `orange`
- `red`
- `brown`
- `blue`
- `yellow`

---

# 🐛 Fehler & Feature Requests

Bitte gib folgende Informationen an:

- Home-Assistant-Version
- Tank-Card-Version
- verwendete Konfiguration
- relevante Fehlermeldungen
- kurze Beschreibung des Problems

Bitte entferne persönliche oder vertrauliche Daten aus Konfigurationen und Logs.

Erstelle ein [GitHub Issue](https://github.com/jinx-22/tank-card/issues).

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

Vielen Dank für deine Unterstützung — ein kostenloser ⭐ hilft anderen, das Projekt zu entdecken:

[![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers)

---

# 📜 Lizenz

**Apache-2.0**

---

Made with ❤️ for Home Assistant
