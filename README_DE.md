## Tank Card – Tankfüllstands-Visualisierung

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
![GitHub total downloads](https://img.shields.io/github/downloads/jinx-22/tank-card/total?style=flat-square&color=red)
[![GitHub release](https://img.shields.io/github/release/jinx-22/tank-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jinx-22/tank-card/releases/)
![File size](https://img.shields.io/github/size/jinx-22/tank-card/tank-card.js?label=Card%20Size)
![last commit](https://img.shields.io/github/last-commit/jinx-22/tank-card)
[![README deutsch](https://img.shields.io/badge/README-DE)](https://github.com/jinx-22/tank-card/tree/tank-card-v.0.3.0#tank-card)
[![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers)
[![Donate Bitcoin](https://img.shields.io/badge/₿-Bitcoin-F7931A?style=flat-square)](#bitcoin)
[![Donate Lightning](https://img.shields.io/badge/⚡-Lightning-FFD700?style=flat-square)](#lightning)

**Version:** 0.4.0 

🇬🇧 [English](README.md)

---

## Beschreibung

**Tank Card** ist eine Home-Assistant-Custom-Card zur Visualisierung von Tankfüllständen, Gesamtkapazität und Verbrauch.

Unterstützt werden Verbrauchssensoren sowie Füllstandssensoren mit absoluten Werten oder Prozentangaben. Geeignet für Heizöl, Wasser, Diesel, Gas, Pellets, Hackschnitzel und weitere Flüssigkeiten oder Schüttgüter.

Die Berechnung hängt vom gewählten Sensormodus ab:

- **Verbrauchssensor:** `initial_fill - consumption`
- **Füllstandssensor (L / kg / m³):** direkter Sensorwert
- **Füllstandssensor (%):** Prozentwert bezogen auf die Gesamtkapazität

---

## Inhaltsverzeichnis

- [Features](#features)
- [Installation](#installation)
- [Beispiel-Konfiguration](#beispiel-konfiguration)
- [Konfigurationsoptionen](#konfigurationsoptionen)
- [Sensormodi](#sensormodi)
- [Tankformen](#tankformen)
- [Unterstützte Materialien](#unterstützte-materialien)
- [Lokalisierung](#lokalisierung)
- [Version 0.4.0](#version-040)
- [🧡 Spenden](#-spenden)
- [🐛 Support](#-support)
- [Lizenz](#lizenz)

---

## Features

- Ein oder mehrere Tanks
- Individuelle Tanknamen
- Anzeige von Füllstand und Gesamtkapazität
- Verbrauchs- und Füllstandssensoren
- Absolute oder prozentuale Füllstandssensoren
- Tankformen `rect`, `pool` und `capsule`
- Materialabhängige Farben und Muster
- Einheiten `L`, `kg` und `m³`
- Konfigurierbare Schriftart und Schriftgröße
- Optionales Home-Assistant-Theme
- Responsives Layout
- Visueller Home-Assistant-Editor
- Englisch und Deutsch
- Home-Assistant-konforme Kartenkonfiguration

---

## Installation

### HACS

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=tank-card&category=plugin)

1. HACS öffnen
2. **Frontend** auswählen
3. Nach **Tank Card** suchen
4. Karte installieren
5. Home Assistant bzw. den Browser neu laden

### Manuell

1. `tank-card.js` herunterladen
2. Nach `/config/www/community/tank-card/` kopieren
3. Unter **Einstellungen → Dashboards → Ressourcen** folgende Ressource hinzufügen:

`/local/community/tank-card/tank-card.js`

Typ: **JavaScript-Modul**

Anschließend den Browser neu laden, z. B. mit **STRG + F5**.

---

## Beispiel-Konfiguration

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

## Konfigurationsoptionen

| Option | Standard | Typ | Beschreibung |
|---|---|---|---|
| `type` | `custom:tank-card` | string | Kartentyp |
| `title` | `Tank Card` | string | Kartentitel |
| `tank_count` | `3` | number | Anzahl der Tanks |
| `tank_capacity` | `1500` | number | Kapazität pro Tank |
| `initial_fill` | `tank_count × tank_capacity` | number | Anfangsfüllstand des Gesamtsystems |
| `sensor_mode` | `consumption` | string | `consumption`, `fill_level_l` oder `fill_level_percent` |
| `consumption_sensor` | `""` | string | Verbrauchssensor |
| `level_sensor` | `""` | string | Füllstandssensor |
| `unit` | `L` | string | `L`, `kg` oder `m3` |
| `tank_form` | `rect` | string | `rect`, `pool` oder `capsule` |
| `show_unittank` | `true` | boolean | Einheit im Tank anzeigen |
| `content_type` | `heating_oil` | string | Materialtyp |
| `theme` | `""` | string | Optionales HA-Theme |
| `font_family` | `sans-serif` | string | Schriftart |
| `font_size` | `1em` | string | Schriftgröße |
| `entities` | `[]` | list | Liste der Tanks mit `name` |

> **Entfernt in v0.4.0:** `bg_color`  
> Die Hintergrundgestaltung erfolgt stattdessen über das Home-Assistant-Theme.

---

## Sensormodi

### Verbrauchssensor

    sensor_mode: consumption
    consumption_sensor: sensor.heating_oil_consumption_total

Der aktuelle Füllstand wird aus Anfangsfüllung und Verbrauch berechnet:

`current_level = initial_fill - consumption`

### Absoluter Füllstand

    sensor_mode: fill_level_l
    level_sensor: sensor.heating_oil_level

Der Sensorwert wird direkt als aktueller Füllstand verwendet.

### Prozentualer Füllstand

    sensor_mode: fill_level_percent
    level_sensor: sensor.heating_oil_level_percent

Der Sensorwert wird auf die Gesamtkapazität bezogen:

`total_capacity = tank_count × tank_capacity`

---

## Tankformen

- `rect` – rechteckiger Tank
- `pool` – zylindrischer / abgerundeter Tank
- `capsule` – Kapsel-Tank

---

## Unterstützte Materialien

- `heating_oil` – Heizöl
- `water` – Wasser
- `diesel` – Diesel
- `gas` – Gas
- `pellets` – Pellets
- `wood_chips` – Hackschnitzel
---

## Version 0.4.0

Version 0.4.0 bringt unter anderem:

- überarbeiteten visuellen Editor
- Home-Assistant-Theme-Unterstützung
- Übersetzung `bg_color`

---

## 🧡 Spenden

Wenn dir die **Tank Card** gefällt und du die weitere Entwicklung unterstützen möchtest, kannst du das Projekt gerne mit einer Spende unterstützen.

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

Jede Unterstützung ist freiwillig und hilft bei der weiteren Entwicklung und Pflege des Projekts.

---

## 🐛 Support

Fehler, Verbesserungsvorschläge und Feature Requests sind willkommen.

Bitte erstelle dafür ein [GitHub Issue](https://github.com/jinx-22/tank-card/issues) und füge möglichst folgende Informationen hinzu:

- Home-Assistant-Version
- Tank-Card-Version
- verwendete Konfiguration
- relevante Fehlermeldungen
- kurze Beschreibung des Problems

Bitte entferne persönliche oder vertrauliche Daten aus Konfigurationen und Logs.

---

## Lizenz

**Creative Commons BY-NC-SA 4.0**

[Details zur Lizenz](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

🇬🇧 **English:** [README.md](README.md)

Made with ❤️ for Home Assistant
