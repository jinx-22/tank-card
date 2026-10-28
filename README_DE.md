# Tank Card – Tankfüllstands-Visualisierung

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration) [![GitHub total downloads](https://img.shields.io/github/downloads/jinx-22/tank-card/total?style=flat-square&color=red)](https://github.com/jinx-22/tank-card/releases/) [![GitHub release](https://img.shields.io/github/release/jinx-22/tank-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jinx-22/tank-card/releases/) [![File size](https://img.shields.io/github/size/jinx-22/tank-card/tank-card.js?label=Card%20Size)](https://github.com/jinx-22/tank-card) [![last commit](https://img.shields.io/github/last-commit/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/commits/main) [![stars](https://img.shields.io/github/stars/jinx-22/tank-card)](https://github.com/jinx-22/tank-card/stargazers) [![Donate Bitcoin](https://img.shields.io/badge/%E2%82%BF-Bitcoin-F7931A?style=flat-square)](#bitcoin) [![Donate Lightning](https://img.shields.io/badge/%E2%9A%A1-Lightning-FFD700?style=flat-square)](#lightning)

🇬🇧 [**English**](https://github.com/jinx-22/tank-card/blob/main/README.md) · 🇩🇪 **Deutsch**

---

**Tank Card** ist eine Home-Assistant-Custom-Card zur Visualisierung von Tankfüllständen, Gesamtkapazität und Verbrauch.

**Aktuelle Version: 0.9.5**

## 🆕 0.9.5

- Editor-Vorschau und Dashboard sehen jetzt gleich aus: Die Karte nutzt eine feste Basisschrift (14 px / 20 px, skaliert mit `font_size`), statt sie vom umgebenden Dialog zu erben
- Schilder (Badges): Die Bezeichnungen werden ausgeschrieben und nur bei Platzmangel abgekürzt, danach wird die Schrift bis auf 0,4 em verkleinert. Jedes Schild wird einzeln angepasst. Bei großer Schrift oder schmaler Karte schalten die Schilder automatisch auf eine Spalte um
- Die Schilder erscheinen in der **Reihenfolge, in der du sie aktivierst** (Hinweis im Editor). Bestehende Karten: ein Schild einmal aus- und wieder einschalten, um es einzusortieren
- Warnschild **Sensor nicht verfügbar** (nur bei gewähltem Sensor, nie im Karten-Picker); der Karten-Picker zeigt halbvolle Tanks
- Einzelne Tank-Namen wieder über `entities[].name` (YAML)
- Editor: Trennlinien zwischen allen Blöcken, neue Reihenfolge in den Bereichen **Anzeige** und **Inhalt** (Anfangsbestand direkt nach dem Sensor), alle Schieberegler sind gleich groß und ihre Zahlenfelder (Kartenhöhe, Schriftgröße, Wellen-Intervall, Blasen) lassen sich frei eintippen, ohne zurückzuspringen, automatische Korrektur der Warnstufen, Hilfetexte fallen auf Englisch zurück
- Die Konfiguration bleibt aufgeräumt: Standardwerte werden entfernt, die Schlüssel sind sortiert
- Benachrichtigungs-Automation: keine Zeitsperre mehr (ein Rückgang von Stufe 1 auf Stufe 2 wird immer gemeldet), die Push-Nachricht der vorherigen Stufe wird auf dem Handy entfernt, exakter Abstand bei jeder Stundenzahl, die Werte werden in der Automation gespeichert und lassen sich in den Editor zurücklesen, die Einheit im Meldungstext wird bereinigt
- Warnstufe 2 kann nicht mehr unter 1 % fallen
- Deutscher Editor: „Design“ statt „Theme“

<img width="50%" height="auto" alt="warn" src="https://github.com/user-attachments/assets/a4df9b41-6878-4e8f-be1a-7486a4f33984" />

---

Du möchtest mehr? **[Tank Card Pro](https://github.com/jinx-22/tank-card-pro)** ergänzt Durchschnitts- und Tagesverbrauch, Reichweite, Nachfüllerkennung und Kosten. 

<img width="33%" height="auto" alt="Pro" src="https://github.com/user-attachments/assets/771db771-cc6a-404c-83aa-6caccfed6c16" />



> **Hinweis:** Nach dem Update das Dashboard mit `Strg + F5` hart neu laden und den Browser-Cache löschen, damit Editor und Karte die neue Version laden.

---

## 📖 Über Tank Card

Unterstützt werden Verbrauchssensoren sowie Füllstandssensoren mit absoluten Werten oder Prozentangaben. Geeignet für Heizöl, Wasser, Diesel, Gas, Pellets, Hackschnitzel und weitere Flüssigkeiten oder Schüttgüter – sowie für freie Farbdarstellungen.

Die Berechnung hängt vom gewählten Sensormodus ab:

- **Verbrauchssensor:** `initial_fill - consumption`
- **Füllstandssensor (L / kg / m³):** direkter Sensorwert
- **Füllstandssensor (%):** Prozentwert bezogen auf die Gesamtkapazität

### Highlights

- Ein oder mehrere Tanks (1–20) mit automatischer Nummerierung, gemeinsamer Beschriftung oder einzelnen Namen
- Füllstand, Gesamtkapazität und Verbrauch auf einen Blick
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

```yaml
type: custom:tank-card
title: Tank Card
tank_count: 3
tank_capacity: 1500
initial_fill: 4500
sensor_mode: consumption
consumption_sensor: sensor.heating_oil_consumption_total
content_type: heating_oil
tank_form: rect
tank_style: metal
tank_label: Tank
entities:
  - name: Tank Nord
  - name: Tank Süd
  - name: Reserve
show_consumption: true
show_max: true
warn_1: true
warn_1_level: 20
warn_2: true
warn_2_level: 10
warn_glow: true
```

Alle nicht aufgeführten Optionen verwenden ihren Standardwert. Der visuelle Editor schreibt nur Werte, die vom Standard abweichen.

---

# 📋 Konfigurationsoptionen

| Option               | Standard                     | Typ     | Beschreibung |
|----------------------|------------------------------|---------|--------------|
| `type`               | `custom:tank-card`            | string  | Kartentyp |
| `title`              | `Tank Card`                   | string  | Kartentitel |
| `show_title`         | `true`                       | boolean | Titel anzeigen |
| `tank_count`         | `3`                          | number  | Anzahl der Tanks (1–20) |
| `tank_capacity`      | `1500`                       | number  | Kapazität pro Tank (in der Mess-Einheit) |
| `initial_fill`       | `tank_count × tank_capacity` | number  | Anfangsfüllstand des Gesamtsystems (leer = voll) |
| `sensor_mode`        | `consumption`                | string  | `consumption`, `fill_level_l` oder `fill_level_percent` |
| `consumption_sensor` | `""`                         | string  | Verbrauchssensor (nur bei `consumption`) |
| `level_sensor`       | `""`                         | string  | Füllstandssensor (bei beiden Level-Modi) |
| `unit`               | `auto`                       | string  | `auto`, `L`, `gal`, `m3`, `kg` oder eine eigene Einheit (z. B. `t`). `auto` nutzt die Einheit des Sensors, sonst das Einheitensystem von Home Assistant (`L` / `gal`) |
| `decimals`           | automatisch                  | number  | Nachkommastellen (0–5). Leer = 2 bei `m³` / `t`, sonst 0 |
| `tank_form`          | `rect`                       | string  | `rect`, `pool` oder `capsule` |
| `tank_style`         | `metal`                      | string  | `metal` oder `glass` |
| `gas_tank`           | `false`                      | boolean | Standfüße und Kuppel (nur Metall + Kapsel + 1 Tank) |
| `show_unittank`      | `true`                       | boolean | Menge pro Tank im Füllbalken anzeigen |
| `show_tank_label`    | `true`                       | boolean | Tank-Beschriftung anzeigen |
| `tank_label`         | `Tank`                       | string  | Gemeinsamer Name der Tanks (Nummerierung automatisch) |
| `entities`           | –                            | list    | Einzelne Tank-Namen: pro Tank `- name: …` (erster Eintrag = Tank 1). Tanks ohne Namen verwenden `tank_label` + Nummer |
| `show_max`           | `true`                       | boolean | „Max:“ anzeigen |
| `show_current`       | `true`                       | boolean | „Aktuell:“ anzeigen |
| `show_fill_level`    | `true`                       | boolean | „Füllstand:“ anzeigen |
| `show_consumption`   | `true`                       | boolean | „Verbrauch:“ anzeigen |
| `content_type`       | `heating_oil`                | string  | Material / Farbe (siehe unten) |
| `custom_color`       | `[33, 150, 243]`             | list    | RGB `[r, g, b]` (nur bei `content_type: custom`) |
| `liquid_style`       | `classic`                    | string  | `classic` (bisherige Darstellung) oder `new` |
| `animation`          | `false`                      | boolean | Wellen-Animation (nur Flüssigkeiten) |
| `animation_interval` | `30`                         | number  | Intervall der Welle in Sekunden (5–60) |
| `bubbles`            | `false`                      | boolean | Aufsteigende Blasen (nur Flüssigkeiten) |
| `bubble_amount`      | `3`                          | number  | Menge der Blasen (1–8) |
| `warn_1`             | `false`                      | boolean | Warnstufe 1 (orange) aktivieren |
| `warn_1_level`       | `20`                         | number  | Warnstufe 1 bei einem Füllstand unter (%), 1–99 |
| `warn_2`             | `false`                      | boolean | Warnstufe 2 (rot) aktivieren |
| `warn_2_level`       | `10`                         | number  | Warnstufe 2 bei einem Füllstand unter (%), 1–99 |
| `warn_glow`          | `false`                      | boolean | Warnstufen visuell signalisieren (Leuchten und Nebel) |
| `warn_auto`          | `false`                      | boolean | Benachrichtigungs-Automation (wird im Editor erstellt, siehe unten) |
| `warn_notify`        | `true`                       | boolean | Home-Assistant-Benachrichtigung (über die Automation) |
| `warn_mobile`        | `false`                      | boolean | Mobile-App-Push-Benachrichtigung (über die Automation) |
| `warn_repeat`        | `1`                          | number  | Benachrichtigung wiederholen alle … (0–100, 0 = keine Wiederholung) |
| `warn_repeat_unit`   | `d`                          | string  | `h` (Stunden) oder `d` (Tage) |
| `warn_time`          | `"14:00:00"`                 | string  | Uhrzeit für die Wiederholung (nur bei `warn_repeat_unit: d`) |
| `theme`              | `""`                         | string  | Optionales HA-Theme |
| `font_size`          | `100`                        | number  | Schriftgröße in Prozent (50–200) |
| `card_height`        | `350`                        | number  | Kartenhöhe in Pixel (250–1000). In der Sections-Ansicht hat der Layout-Reiter Vorrang |

**Reihenfolge der Schilder:** Die Schilder (`show_max`, `show_current`, `show_fill_level`, `show_consumption`) erscheinen in der Reihenfolge ihrer Schlüssel in der Konfiguration. Im Editor ist das die Reihenfolge, in der du sie einschaltest; in YAML kannst du die Zeilen einfach verschieben.

> **Entfernt seit v0.4.0:** `bg_color`. Die Hintergrundgestaltung erfolgt über das Home-Assistant-Theme.

> **Entfernt seit v0.9.2:** Hex-Werte bei `custom_color` (stattdessen `[r, g, b]`) sowie `%` / `em` / `px` bei `font_size` (stattdessen eine Zahl).

---

# 📊 Sensormodi

### Verbrauchssensor

```yaml
sensor_mode: consumption
consumption_sensor: sensor.heating_oil_consumption_total
```

Aktueller Füllstand:

`current_level = initial_fill - consumption`  
(begrenzt auf 0 … Gesamtkapazität)

### Absoluter Füllstand

```yaml
sensor_mode: fill_level_l
level_sensor: sensor.heating_oil_level
```

Sensorwert wird direkt als aktueller Füllstand verwendet (begrenzt auf 0 … Gesamtkapazität).

### Prozentualer Füllstand

```yaml
sensor_mode: fill_level_percent
level_sensor: sensor.heating_oil_level_percent
```

Sensorwert (0–100 %) wird auf die Gesamtkapazität bezogen:

`total_capacity = tank_count × tank_capacity`  
`current_level = total_capacity × percentage / 100`

Ist der gewählte Sensor nicht verfügbar, zeigt die Karte den letzten bekannten Wert (oder den Anfangsbestand) zusammen mit dem Warnschild **Sensor nicht verfügbar**. Ohne gewählten Sensor zeigen die Tanks den Anfangsbestand.

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

Beide Warnstufen sind standardmäßig deaktiviert und können unabhängig voneinander aktiviert werden. Für jede Stufe legst du den Füllstand in Prozent fest, unter dem die Warnung ausgelöst wird (Standard: 20 % und 10 %). Sind beide Stufen aktiv, liegt Stufe 2 immer unter Stufe 1 – der Editor korrigiert die Werte, sobald du das Feld verlässt. Eine Hysterese von 0,5 Prozentpunkten verhindert, dass die Warnstufen in der Nähe eines Schwellenwerts schnell hin- und herspringen.

### Visuelle Signalisierung

`warn_glow: true` lässt die Tanks orange (Stufe 1) bzw. rot (Stufe 2) pulsieren, mit einem ein- und ausblendenden Nebel dahinter. Stufe 2 pulsiert schneller. Ist im System „Bewegung reduzieren“ aktiv, wird stattdessen ein statisches Leuchten angezeigt.

Wenn du im Editor die erste Warnstufe aktivierst, werden `warn_glow` und `warn_notify` automatisch eingeschaltet (sie lassen sich wieder ausschalten).

### Benachrichtigungs-Automation

Eine Karte läuft nur, solange ein Dashboard geöffnet ist. Benachrichtigungen verschickt deshalb eine Home-Assistant-**Automation**, die der Karten-Editor für dich anlegt:

1. Mindestens eine Warnstufe aktivieren und einen Sensor wählen.
2. `warn_auto` einschalten und die Kanäle wählen:

   - `warn_notify: true` – Home-Assistant-Benachrichtigung (Glocke in der Seitenleiste, auch auf dem Handy sichtbar)
   - `warn_mobile: true` – Push-Nachricht an alle Geräte mit der Home-Assistant-Companion-App (Tippen öffnet das Dashboard)
3. Optional `warn_repeat` und `warn_repeat_unit` setzen. Solange der Füllstand unter der Schwelle bleibt, wird die Benachrichtigung in diesem Abstand wiederholt: bei `d` täglich zur Uhrzeit `warn_time`, bei `h` alle n Stunden (Teiler von 24 folgen der Uhr, z. B. 0, 6, 12, 18 Uhr; alle anderen Werte zählen genau n Stunden). `0` = keine Wiederholung.
4. Auf **Automation anlegen** klicken.

Der Editor zeigt an, ob die Automation aktuell ist. Änderungen an den Karteneinstellungen gelten erst nach **Automation aktualisieren**; **Werte aus Automation einlesen** übernimmt die gespeicherten Werte zurück in den Editor; **Automation löschen** entfernt sie wieder. Die Automation heißt „<Kartentitel> Benachrichtigung“. Bitte Einstellungen nur im Karten-Editor ändern, manuelle Änderungen werden überschrieben. Dafür sind Administratorrechte nötig.

Bei jedem Wechsel der Stufe wird gemeldet (auch bei einem Rückgang von Stufe 1 auf Stufe 2). Die Meldung der vorherigen Stufe wird entfernt, auch auf dem Handy. Wird der Tank nachgefüllt und der Füllstand liegt wieder über der Schwelle, werden die Benachrichtigungen automatisch entfernt.

Karten mit demselben Sensor teilen sich eine Automation.

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
