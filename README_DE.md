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

- Füllstand-Warnung / Signalisierung (Warnstufe 1 orange, Stufe 2 rot) mit konfigurierbaren Schwellenwerten (Standard 20 % / 10 %)
- Visuelles Leuchten + ein-/ausblendender Nebel hinter den Tanks
- Optionale Benachrichtigungs-Automation, direkt im Karten-Editor erstellt: Home-Assistant-Benachrichtigung und/oder Mobile-App-Push, optional mit Wiederholung alle x Stunden / Tage
- Automatische Einheitenerkennung über den Sensor (`unit: auto`), neue Einheit `gal`, eigene Einheiten und einstellbare Nachkommastellen (`decimals`)
- Kartenhöhe jetzt mit Standard 350 px (250–1000 px)
- Editor neu gegliedert: geführte Fragen unter **Inhalt**, Darstellung der Flüssigkeit unter **Anzeige**, neue Kategorie **Füllstand-Meldung / Signalisierung**
- Entfernt: `entities` (individuelle Tanknamen), Hex-Farben bei `custom_color` und `%` / `em` / `px` bei `font_size` – siehe [Konfigurationsoptionen](#-konfigurationsoptionen)

<img width="50%" height="auto" alt="warn" src="https://github.com/user-attachments/assets/5e204451-2a55-4fc3-bd03-fe171db6a82d" />

> **Hinweis:** Nach dem Update das Dashboard mit `Strg + F5` hart neu laden und den Browser-Cache löschen, damit Editor und Karte die neue Version laden.

---

Vorschau auf die nächste Version (Pre-Release):

<img width="40%" height="auto" alt="9 3" src="https://github.com/user-attachments/assets/28d22df7-e9d6-49bd-9ce9-0d0837f942ca" /><img width="40%" height="auto" alt="9 3" src="https://github.com/user-attachments/assets/7373409e-08d3-406c-9c4e-bcd98b048e8d" />

---

## 📖 Über Tank Card

Unterstützt werden Verbrauchssensoren sowie Füllstandssensoren mit absoluten Werten oder Prozentangaben. Geeignet für Heizöl, Wasser, Diesel, Gas, Pellets, Hackschnitzel und weitere Flüssigkeiten oder Schüttgüter – sowie für freie Farbdarstellungen.

Die Berechnung hängt vom gewählten Sensormodus ab:

- **Verbrauchssensor:** `initial_fill - consumption`
- **Füllstandssensor (L / kg / m³):** direkter Sensorwert
- **Füllstandssensor (%):** Prozentwert bezogen auf die Gesamtkapazität

### Highlights

- Ein oder mehrere Tanks (1–20) mit automatischer Nummerierung und gemeinsamer Beschriftung
- Anzeige von Füllstand und Gesamtkapazität
- Verbrauchs- und Füllstandssensoren (absolut oder prozentual)
- Tankformen `rect`, `pool` und `capsule`
- Tankart Glas oder Metall
- Material- und farbabhängige Füllverläufe / Muster
- Füllstand-Warnung / Signalisierung (Leuchten + optionale Benachrichtigungs-Automation)
- Wellen-Animation und aufsteigende Blasen (bei Flüssigkeiten)
- Einheiten `L`, `gal`, `kg`, `m³` oder eigene, mit automatischer Erkennung
- Konfigurierbare Schriftgröße (50–200 %) und Kartenhöhe (250–1000 px)
- Optionales Home-Assistant-Theme
- Responsives Layout (Container Queries)
- Visueller Home-Assistant-Editor
- Englisch und Deutsch (folgt der HA-Sprache)
- Home-Assistant-konforme Kartenkonfiguration

---

# 📦 Installation

## Einfache Installation → [Open in HACS](https://my.home-assistant.io/redirect/hacs_repository/?owner=jinx-22&repository=tank-card&category=plugin)

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

# 📋 Konfigurationsoptionen

| Option               | Standard                     | Typ     | Beschreibung                                                                                                                                                          |
| -------------------- | ---------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`               | `custom:tank-card`           | string  | Kartentyp                                                                                                                                                             |
| `title`              | `Tank Card`                  | string  | Kartentitel                                                                                                                                                           |
| `show_title`         | `true`                       | boolean | Titel anzeigen                                                                                                                                                        |
| `tank_count`         | `3`                          | number  | Anzahl der Tanks (1–20)                                                                                                                                               |
| `tank_capacity`      | `1500`                       | number  | Kapazität pro Tank (in der Mess-Einheit)                                                                                                                              |
| `initial_fill`       | `tank_count × tank_capacity` | number  | Anfangsfüllstand des Gesamtsystems (leer = voll)                                                                                                                      |
| `sensor_mode`        | `consumption`                | string  | `consumption`, `fill_level_l` oder `fill_level_percent`                                                                                                               |
| `consumption_sensor` | `""`                         | string  | Verbrauchssensor (nur bei `consumption`)                                                                                                                              |
| `level_sensor`       | `""`                         | string  | Füllstandssensor (bei beiden Level-Modi)                                                                                                                              |
| `unit`               | `auto`                       | string  | `auto`, `L`, `gal`, `m3`, `kg` oder eine eigene Einheit (z. B. `t`). `auto` nutzt die Einheit des Sensors, sonst das Einheitensystem von Home Assistant (`L` / `gal`) |
| `decimals`           | automatisch                  | number  | Nachkommastellen (0–5). Leer = 2 bei `m³` / `t`, sonst 0                                                                                                              |
| `tank_form`          | `rect`                       | string  | `rect`, `pool` oder `capsule`                                                                                                                                         |
| `tank_style`         | `metal`                      | string  | `metal` oder `glass`                                                                                                                                                  |
| `gas_tank`           | `false`                      | boolean | Standfüße und Kuppel (nur Metall + Kapsel + 1 Tank)                                                                                                                   |
| `show_unittank`      | `true`                       | boolean | Menge pro Tank im Füllbalken anzeigen                                                                                                                                 |
| `show_tank_label`    | `true`                       | boolean | Tank-Beschriftung anzeigen                                                                                                                                            |
| `tank_label`         | `Tank`                       | string  | Gemeinsamer Name der Tanks (Nummerierung automatisch)                                                                                                                 |
| `show_max`           | `true`                       | boolean | „Max:“ anzeigen                                                                                                                                                       |
| `show_current`       | `true`                       | boolean | „Aktuell:“ anzeigen                                                                                                                                                   |
| `show_fill_level`    | `true`                       | boolean | „Füllstand:“ anzeigen                                                                                                                                                 |
| `show_consumption`   | `true`                       | boolean | „Verbrauch:“ anzeigen                                                                                                                                                 |
| `content_type`       | `heating_oil`                | string  | Material / Farbe (siehe unten)                                                                                                                                        |
| `custom_color`       | `[33, 150, 243]`             | list    | RGB `[r, g, b]` (nur bei `content_type: custom`)                                                                                                                      |
| `liquid_style`       | `classic`                    | string  | `classic` (bisherige Darstellung) oder `new`                                                                                                                          |
| `animation`          | `false`                      | boolean | Wellen-Animation (nur Flüssigkeiten)                                                                                                                                  |
| `animation_interval` | `30`                         | number  | Intervall der Welle in Sekunden (5–60)                                                                                                                                |
| `bubbles`            | `false`                      | boolean | Aufsteigende Blasen (nur Flüssigkeiten)                                                                                                                               |
| `bubble_amount`      | `3`                          | number  | Menge der Blasen (1–8)                                                                                                                                                |
| `warn_1`             | `false`                      | boolean | Warnstufe 1 (orange) aktivieren                                                                                                                                       |
| `warn_1_level`       | `20`                         | number  | Warnstufe 1 bei einem Füllstand unter (%), 1–99                                                                                                                       |
| `warn_2`             | `false`                      | boolean | Warnstufe 2 (rot) aktivieren                                                                                                                                          |
| `warn_2_level`       | `10`                         | number  | Warnstufe 2 bei einem Füllstand unter (%), 1–99                                                                                                                       |
| `warn_glow`          | `false`                      | boolean | Warnstufen visuell signalisieren (Leuchten und Nebel)                                                                                                                 |
| `warn_auto`          | `false`                      | boolean | Benachrichtigungs-Automation (wird im Editor erstellt, siehe unten)                                                                                                   |
| `warn_notify`        | `true`                       | boolean | Home-Assistant-Benachrichtigung (über die Automation)                                                                                                                 |
| `warn_mobile`        | `false`                      | boolean | Mobile-App-Push-Benachrichtigung (über die Automation)                                                                                                                |
| `warn_repeat`        | `1`                          | number  | Benachrichtigung wiederholen alle … (0–100, 0 = keine Wiederholung)                                                                                                   |
| `warn_repeat_unit`   | `d`                          | string  | `h` (Stunden) oder `d` (Tage)                                                                                                                                         |
| `warn_time`          | `"14:00:00"`                 | string  | Uhrzeit für die Wiederholung (nur bei `warn_repeat_unit: d`)                                                                                                          |
| `theme`              | `""`                         | string  | Optionales HA-Theme                                                                                                                                                   |
| `font_size`          | `100`                        | number  | Schriftgröße in Prozent (50–200)                                                                                                                                      |
| `card_height`        | `350`                        | number  | Kartenhöhe in Pixel (250–1000). In der Sections-Ansicht hat der Layout-Reiter Vorrang                                                                                 |

> **Entfernt seit v0.4.0:** `bg_color`
> Die Hintergrundgestaltung erfolgt über das Home-Assistant-Theme.

> **Entfernt seit v0.9.2:** `entities` (individuelle Tanknamen, stattdessen `tank_label` verwenden), Hex-Werte bei `custom_color` (stattdessen `[r, g, b]`) sowie `%` / `em` / `px` bei `font_size` (stattdessen eine Zahl).

---

# 📊 Sensormodi

### Verbrauchssensor

```
sensor_mode: consumption
consumption_sensor: sensor.heating_oil_consumption_total
```

Aktueller Füllstand:

`current_level = initial_fill - consumption`  
(begrenzt auf 0 … Gesamtkapazität)

### Absoluter Füllstand

```
sensor_mode: fill_level_l
level_sensor: sensor.heating_oil_level
```

Sensorwert wird direkt als aktueller Füllstand verwendet (begrenzt auf 0 … Gesamtkapazität).

### Prozentualer Füllstand

```
sensor_mode: fill_level_percent
level_sensor: sensor.heating_oil_level_percent
```

Sensorwert (0–100 %) wird auf die Gesamtkapazität bezogen:

`total_capacity = tank_count × tank_capacity`  
`current_level = total_capacity × percentage / 100`

---

# 📏 Einheiten

Mit `unit: auto` übernimmt die Karte die Einheit des gewählten Sensors (`unit_of_measurement`). Hat der Sensor keine Einheit (oder meldet `%`), entscheidet das Einheitensystem von Home Assistant (`L` oder `gal`). Alternativ `L`, `gal`, `m3`, `kg` wählen oder eine eigene Einheit wie `t` eintragen.

`tank_capacity` und `initial_fill` werden in derselben Mess-Einheit angegeben. Standardmäßig werden Mengen ohne Nachkommastellen angezeigt, `m³` und `t` mit zwei. Mit `decimals` (0–5) lässt sich das ändern.

---

# 🛢️ Tankformen

- `rect` – rechteckiger Tank (Quader)
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

Beide Warnstufen sind standardmäßig deaktiviert und können unabhängig voneinander aktiviert werden. Für jede Stufe legst du den Füllstand in Prozent fest, unter dem die Warnung ausgelöst wird (Standard: 20 % und 10 %). Sind beide Stufen aktiv, liegt Stufe 2 immer unter Stufe 1. Eine Hysterese von 0,5 Prozentpunkten verhindert, dass die Warnstufen in der Nähe eines Schwellenwerts schnell hin- und herspringen.

### Visuelle Signalisierung

`warn_glow: true` lässt die Tanks orange (Stufe 1) bzw. rot (Stufe 2) pulsieren, mit einem ein- und ausblendenden Nebel dahinter. Stufe 2 pulsiert schneller. Ist im System „Bewegung reduzieren“ aktiv, wird stattdessen ein statisches Leuchten angezeigt.

Wenn du im Editor die erste Warnstufe aktivierst, werden `warn_glow` und `warn_notify` automatisch eingeschaltet (sie lassen sich wieder ausschalten).

### Benachrichtigungs-Automation

Eine Karte läuft nur, solange ein Dashboard geöffnet ist. Benachrichtigungen verschickt deshalb eine Home-Assistant-**Automation**, die der Karten-Editor für dich anlegt:

1. Mindestens eine Warnstufe aktivieren und einen Sensor wählen.
2. `warn_auto` einschalten und die Kanäle wählen:
   - `warn_notify: true` – Home-Assistant-Benachrichtigung (Glocke in der Seitenleiste, auch auf dem Handy sichtbar)
   - `warn_mobile: true` – Push-Nachricht an alle Geräte mit der Home-Assistant-Companion-App (Tippen öffnet das Dashboard)
3. Optional `warn_repeat` und `warn_repeat_unit` setzen. Solange der Füllstand unter der Schwelle bleibt, wird die Benachrichtigung in diesem Abstand wiederholt: bei `d` täglich zur Uhrzeit `warn_time`, bei `h` im festen Takt zu vollen Stunden. `0` = keine Wiederholung.
4. Auf **Automation anlegen** klicken.

Der Editor zeigt an, ob die Automation aktuell ist. Änderungen an den Karteneinstellungen gelten erst nach **Automation aktualisieren**; **Automation löschen** entfernt sie wieder. Die Automation heißt „<Titel> Benachrichtigung“. Bitte Einstellungen nur im Karten-Editor ändern, manuelle Änderungen werden überschrieben. Dafür sind Administratorrechte nötig.

Wird der Tank nachgefüllt und der Füllstand liegt wieder über der Schwelle, werden die Benachrichtigungen automatisch entfernt.

---

# Screenshot:

<img width="50%" height="auto" alt="New-look" src="https://github.com/user-attachments/assets/fdb74b57-51d6-444a-9698-ff5592e45c80" />

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
