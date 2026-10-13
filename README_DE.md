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

**Aktuelle Version: 0.9.2**

## 🆕 0.9.2

- Füllstand-Warnung / Signalisierung (Warnstufe 1 orange, Stufe 2 rot)
- Konfigurierbare Schwellenwerte (Standard 20 % / 10 %)
- Home-Assistant-Benachrichtigung bei Erreichen einer Stufe (wird nach dem Nachfüllen entfernt)
- Optionale Mobile-App-Push-Benachrichtigung
- Visuelles Leuchten + ein-/ausblendender Nebel hinter den Tanks
- Editor: neue Kategorie **Füllstand-Meldung / Signalisierung**

<img width="60%" height="auto" alt="warn" src="https://github.com/user-attachments/assets/59d4b6d2-c54b-4237-b539-f5305c153713" />



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
- Tankart Glas oder Metall
- Material- und farbabhängige Füllverläufe / Muster
- Füllstand-Warnung / Signalisierung (Benachrichtigung + visuelles Leuchten)
- Wellen-Animation und aufsteigende Blasen (bei Flüssigkeiten)
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
```

---

# 📋 Konfigurationsoptionen

| Option | Standard | Typ | Beschreibung |
|---|---|---|---|
| `type` | `custom:tank-card` | string | Kartentyp |
| `title` | `Tank Card` | string | Kartentitel |
| `show_title` | `true` | boolean | Titel anzeigen |
| `tank_count` | `3` | number | Anzahl der Tanks (1–20) |
| `tank_capacity` | `1500` | number | Kapazität pro Tank |
| `initial_fill` | `tank_count × tank_capacity` | number | Anfangsfüllstand des Gesamtsystems (leer = voll) |
| `sensor_mode` | `consumption` | string | `consumption`, `fill_level_l` oder `fill_level_percent` |
| `consumption_sensor` | `""` | string | Verbrauchssensor (nur bei `consumption`) |
| `level_sensor` | `""` | string | Füllstandssensor (bei beiden Level-Modi) |
| `unit` | `L` | string | `L`, `kg` oder `m3` |
| `tank_form` | `rect` | string | `rect`, `pool` oder `capsule` |
| `tank_style` | `metal` | string | `metal` oder `glass` |
| `gas_tank` | `false` | boolean | Standfüße und Kuppel (nur Metall + Kapsel + 1 Tank) |
| `show_unittank` | `true` | boolean | Menge pro Tank im Füllbalken anzeigen |
| `show_tank_label` | `true` | boolean | Tank-Beschriftung anzeigen |
| `tank_label` | `Tank` | string | Gemeinsamer Name der Tanks (Nummerierung automatisch) |
| `show_max` | `true` | boolean | „Max:“ anzeigen |
| `show_current` | `true` | boolean | „Aktuell:“ anzeigen |
| `show_fill_level` | `true` | boolean | „Füllstand:“ anzeigen |
| `show_consumption` | `true` | boolean | „Verbrauch:“ anzeigen |
| `content_type` | `heating_oil` | string | Material / Farbe (siehe unten) |
| `custom_color` | `[33, 150, 243]` | list / string | RGB oder Hex (nur bei `content_type: custom`) |
| `liquid_style` | `classic` | string | `classic` (bisherige Darstellung) oder `new` |
| `animation` | `false` | boolean | Wellen-Animation (nur Flüssigkeiten) |
| `animation_interval` | `30` | number | Intervall der Welle in Sekunden (5–60) |
| `warn_1` | `false` | boolean | Warnstufe 1 (orange) aktivieren |
| `warn_1_level` | `20` | number | Warnstufe 1 bei einem Füllstand unter (%) |
| `warn_2` | `false` | boolean | Warnstufe 2 (rot) aktivieren |
| `warn_2_level` | `10` | number | Warnstufe 2 bei einem Füllstand unter (%) |
| `warn_notify` | `true` | boolean | Home-Assistant-Benachrichtigung senden |
| `warn_mobile` | `false` | boolean | Mobile-App-Push-Benachrichtigung senden |
| `warn_glow` | `false` | boolean | Warnstufen visuell signalisieren (Leuchten und Nebel) |
| `bubbles` | `false` | boolean | Aufsteigende Blasen (nur Flüssigkeiten) |
| `bubble_amount` | `3` | number | Menge der Blasen (1–8) |
| `theme` | `""` | string | Optionales HA-Theme |
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

**Tankart**

- `metal` – Metalltank
- `glass` – Glastank

**Gas-Tank**

- `gas_tank: true` – Standfüße und Kuppel (nur bei `tank_style: metal`, `tank_form: capsule` und genau einem Tank)

---

# 🧪 Unterstützte Materialien & Farben

**Materialien / Schüttgüter**

- `heating_oil` – Heizöl
- `water` – Wasser
- `diesel` – Diesel
- `gas` – Gas
- `pellets` – Pellets
- `wood_chips` – Hackschnitzel
- `custom` – eigene Farbe über `custom_color`

**Flüssigkeitsdarstellung**

- `classic` – bisherige Darstellung (hell unten)
- `new` – neue Darstellung (hell oben)

> Bei Pellets und Hackschnitzel entfallen Welle und Blasen (Schüttgut).

---

# 🚨 Füllstandswarnungen & Benachrichtigungen

Die Tank Card unterstützt zwei konfigurierbare Warnstufen:

- **Warnstufe 1:** Orange
- **Warnstufe 2:** Rot

Beide Warnstufen sind standardmäßig deaktiviert. Sie können unabhängig voneinander aktiviert werden. Für jede Warnstufe lässt sich festlegen, bei welchem Füllstand in Prozent die Warnung ausgelöst wird.

### Benachrichtigungsoptionen

- `warn_notify: true` aktiviert Home-Assistant-Benachrichtigungen.
- `warn_mobile: true` aktiviert Push-Benachrichtigungen über die Home-Assistant-App.
- `warn_glow: true` aktiviert die visuelle Signalisierung der Warnstufen durch Leuchteffekte und Nebel.

Die Standardgrenzwerte liegen bei 20 % für Warnstufe 1 und 10 % für Warnstufe 2.

Beim Wiederbefüllen des Tanks wird der Warnstatus entsprechend der Warnlogik der Karte zurückgesetzt.

---

# Screenshot:

<img width="50%" height="auto" alt="New-look" src="https://github.com/user-attachments/assets/fdb74b57-51d6-444a-9698-ff5592e45c80" />

---

# Fehler & Feature Requests

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

Vielen Dank für deine Unterstützung — ein kostenloser ⭐ hilft anderen, das Projekt zu entdecken:

[![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers)

---

# 📜 Lizenz

**Apache-2.0**

---

Made with ❤️ for Home Assistant
