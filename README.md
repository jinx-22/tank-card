# Tank Card – Tank Fill Visualization
*(Link to German version: [Deutsch](#deutsch))*

**Version:** 0.3.0  - What is NEW in this version → [Changelog](https://github.com/jinx-22/tank-card/blob/main/Changelog.md)

---

**Description:** A Home Assistant custom card to visualize tank fill levels, total capacity, and consumption using either consumption sensors or fill level sensors.  
Ideal for heating oil, water, diesel, gas, pellets, wood chips, or other bulk materials.

> **Note:**  
> Fill levels are calculated consistently based on the configured sensor mode:  
> - Consumption sensor: `initial_fill - consumption`  
> - Fill level sensor (L / kg / m³): absolute value  
> - Fill level sensor (%): percentage of `initial_fill`  
>  
> Units and display behavior are fully configurable.

---

## Table of Contents
1. [What does this card do?](#what-does-this-card-do)  
2. [License](#license)  
3. [Screenshot](#screenshot)  
4. [Features](#features)  
5. [Installation](#manual-installation)  
6. [Example Configuration](#example-configuration)  
7. [All Configuration Options](#all-configuration-options)  
8. [Functionality](#functionality)  
9. [Developer Notes](#developer-notes)  

---

## What does this card do?

Depending on configuration, this custom card displays:

- One or multiple tanks with individual names  
- Current fill level per tank  
- System-wide fill level in absolute values and percent  
- Total capacity and calculated consumption  
- Support for liquids and bulk materials (e.g. pellets, wood chips)  
- Color- and pattern-based fill visualization by material type  
- Responsive layout for desktop and mobile dashboards  

---

## License

**Creative Commons – CC BY-NC-SA 4.0**

- Editing and modification allowed  
- Non-commercial use only  
- Share adaptations under the same license  

[Link to full license](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

## Features

### Tank Visualization 
- Visual representation of one or more tanks  
- Fill level displayed per tank and system-wide  
- Material-specific colors and patterns  

### Supported Materials
- Heating oil  
- Water  
- Diesel  
- Gas  
- Pellets   (<-NEW)
- Wood chips  (<-NEW)
- Custom colors  

### Units
- Liters (`L`)  
- Kilograms (`kg`)  
- Cubic meters (`m³`)  

### Sensor Support
- Consumption sensor  
- Fill level sensor (absolute value)  
- Fill level sensor (percentage)  
- Sensor mode selectable via visual editor or YAML  

### Visual Editor
- Integrated Home Assistant visual editor (`ha-form`)  
- Dynamic schema based on selected sensor mode    

### Layout & Display Options
- Adjustable tank shapes (rectangle, capsule, pool)  
- Show or hide values per tank  
- Configurable background and styling  
- Responsive layout  

---

## Manual Installation

1. Copy **tank-card.js** to `/config/www/`  
2. In Home Assistant:  
   - Settings  
   - Dashboards  
   - Three-dot menu  
   - Resources  
   - Add Resource  
   - URL: `/local/tank-card.js`  
     Type: **JavaScript Module**  
3. Reload the browser (CTRL + F5)  

The card is now available in the card picker.

---

## Example Configuration

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
unit: L
tank_form: rect
bg_color: 'rgba(0,0,0,0.4)'
show_unittank: true
entities:
  - name: Tank 1
  - name: Tank 2
  - name: Tank 3
```

## All Configuration Options

| Option               | Default                         | Type     | Description                                                                                   |
|---------------------|---------------------------------|----------|-----------------------------------------------------------------------------------------------|
| `type`              | `'custom:tank-card'`            | string   | Card type                                                                                     |
| `title`             | `'Tank Card'`                   | string   | Card title                                                                                    |
| `tank_count`        | `3`                             | number   | Number of tanks                                                                               |
| `tank_capacity`     | `1500`                          | number   | Capacity per tank (L / kg / m³)                                                              |
| `initial_fill`      | `tank_count * tank_capacity`    | number   | Initial system fill                                                                           |
| `sensor_mode`       | `'consumption'`                 | string   | Sensor mode: `consumption`, `fill_level_l`, `fill_level_percent`                              |
| `consumption_sensor`| `''`                            | string   | Consumption sensor (only if `sensor_mode: consumption`)                                       |
| `level_sensor`      | `''`                            | string   | Fill level sensor (only if `sensor_mode: fill_level_l` or `fill_level_percent`)               |
| `unit`              | `'L'`                           | string   | Unit: `L`, `kg`, `m3`                                                                         |
| `tank_form`         | `'rect'`                        | string   | Tank shape: `rect`, `capsule`, `pool`                                                        |
| `bg_color`          | `'rgba(0,0,0,0.3)'`             | string   | Card background color                                                                         |
| `show_unittank`     | `true`                          | boolean  | Show value per tank (L / kg / m³)                                                            |
| `content_type`      | `'heating_oil'`                 | string   | Material type: `heating_oil`, `water`, `diesel`, `gas`, `pellets`, `wood_chips`, colors      |
| `entities`          | `[]`                            | list     | List of tanks with `name` field, e.g. `[ {name: "Tank 1"}, {name: "Tank 2"} ]`                |

---

## Functionality
Calculates the current system fill based on selected sensor mode  
Determines consumption relative to `initial_fill`  
Distributes the fill evenly across all tanks  
Visualizes fill level via height, color, and pattern  

## Developer Notes
Compatible with Home Assistant visual editor and YAML editor  
Frontend-only custom card, no backend integration required



## Screenshot
<img width="1888" height="2016" alt="tank-card-v0 3 0" src="https://github.com/user-attachments/assets/680864ea-473d-4cb5-b0f6-1b60cd0848c9" />


## deutsch
# Tank Card – Tankfüllstands-Visualisierung

**Version:** 0.3.0 – **Neu in dieser Version** → [Changelog](https://github.com/jinx-22/tank-card/blob/main/Changelog.md)

---

## **Beschreibung:**  
Eine Home-Assistant-Custom-Card zur Visualisierung von Tankfüllständen, Gesamtkapazität und Verbrauch.  
Es können sowohl **Verbrauchssensoren** als auch **Füllstandssensoren** (absolut oder prozentual) verwendet werden.  
Geeignet für Heizöl, Wasser, Diesel, Gas, Pellets, Hackschnitzel und andere Flüssigkeiten oder Schüttgüter.

> **Hinweis:**  
> Die Füllstandsberechnung erfolgt abhängig vom gewählten Sensormodus:  
> - **Verbrauchssensor:** `initial_fill - consumption`  
> - **Füllstandssensor (L / kg / m³):** absoluter Wert  
> - **Füllstandssensor (%):** Prozentwert bezogen auf `initial_fill`  
>  
> Einheit und Anzeigeverhalten sind vollständig konfigurierbar.

---

## Inhaltsverzeichnis
1. [Was macht diese Karte?](#was-macht-diese-karte)  
2. [Lizenz](#lizenz)  
3. [Screenshot](#screenshot)  
4. [Features](#features)  
5. [Installation](#installation-manuell)  
6. [Beispiel-Konfiguration](#beispiel-konfiguration)  
7. [Alle Konfigurationsoptionen](#alle-konfigurationsoptionen)  
8. [Funktionsweise](#funktionsweise)  
9. [Entwicklerhinweise](#entwicklerhinweise)  

---

## Was macht diese Karte?

Abhängig von der Konfiguration zeigt diese Custom Card:

- Einen oder mehrere Tanks mit individuellen Namen  
- Aktuellen Füllstand pro Tank  
- Gesamtsystem-Füllstand absolut und in Prozent  
- Gesamtkapazität und berechneten Verbrauch  
- Unterstützung für Flüssigkeiten und Schüttgüter (z. B. Pellets, Hackschnitzel)  
- Farb- und musterbasierte Füllstandsdarstellung je Material  
- Responsives Layout für Desktop- und Mobile-Dashboards  

---

## Lizenz

**Creative Commons – CC BY-NC-SA 4.0**

- Bearbeiten und Anpassen erlaubt  
- Keine kommerzielle Nutzung  
- Weitergabe nur unter gleicher Lizenz  

[Link zur vollständigen Lizenz](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

## Features

### Tank-Visualisierung
- Grafische Darstellung eines oder mehrerer Tanks  
- Füllstand pro Tank
- Materialabhängige Farben und Muster  

### Unterstützte Materialien
- Heizöl  
- Wasser  
- Diesel  
- Gas  
- Pellets  
- Hackschnitzel  
- Benutzerdefinierte Farben  

### Einheiten
- Liter (`L`)  
- Kilogramm (`kg`)  
- Kubikmeter (`m³`)  

### Sensor-Unterstützung
- Verbrauchssensor  
- Füllstandssensor (absoluter Wert)  
- Füllstandssensor (Prozent)  
- Sensormodus wählbar über visuellen Editor oder YAML  

### Visueller Editor
- Integrierter Home-Assistant-Editor (`ha-form`)  
- Dynamisches Schema abhängig vom Sensormodus  

### Layout- & Anzeigeoptionen
- Verschiedene Tankformen (Rechteck, Kapsel, Pool)  
- Anzeige von Werten pro Tank ein-/ausblendbar  
- Konfigurierbarer Hintergrund und Styling  
- Responsives Layout  

---

## Installation (manuell)

1. **tank-card.js** nach `/config/www/` kopieren  
2. In Home Assistant:  
   - Einstellungen  
   - Dashboards  
   - Drei-Punkte-Menü  
   - Ressourcen  
   - Ressource hinzufügen  
   - URL: `/local/tank-card.js`  
     Typ: **JavaScript-Modul**  
3. Browser neu laden (STRG + F5)  

Die Karte ist nun im Karten-Picker verfügbar.

---

## Beispiel-Konfiguration

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
unit: L
tank_form: rect
bg_color: 'rgba(0,0,0,0.4)'
show_unittank: true
entities:
  - name: Tank 1
  - name: Tank 2
  - name: Tank 3
```

## Alle Konfigurationsoptionen

| Option               | Default                         | Typ      | Beschreibung                                                                                  |
|---------------------|---------------------------------|----------|----------------------------------------------------------------------------------------------|
| `type`              | `'custom:tank-card'`            | string   | Kartentyp                                                                                     |
| `title`             | `'Tank Card'`                   | string   | Titel der Karte                                                                               |
| `tank_count`        | `3`                             | number   | Anzahl der Tanks                                                                              |
| `tank_capacity`     | `1500`                          | number   | Kapazität pro Tank (L / kg / m³)                                                             |
| `initial_fill`      | `tank_count * tank_capacity`    | number   | Startfüllung des Systems                                                                     |
| `sensor_mode`       | `'consumption'`                 | string   | Sensormodus: `consumption`, `fill_level_l`, `fill_level_percent`                              |
| `consumption_sensor`| `''`                            | string   | Verbrauchssensor (nur wenn `sensor_mode: consumption`)                                        |
| `level_sensor`      | `''`                            | string   | Füllstandsensor (nur wenn `sensor_mode: fill_level_l` oder `fill_level_percent`)             |
| `unit`              | `'L'`                           | string   | Einheit: `L`, `kg`, `m3`                                                                     |
| `tank_form`         | `'rect'`                        | string   | Tankform: `rect`, `capsule`, `pool`                                                          |
| `bg_color`          | `'rgba(0,0,0,0.3)'`             | string   | Hintergrundfarbe der Karte                                                                    |
| `show_unittank`     | `true`                          | boolean  | Liter/Kg/m³ im Tank anzeigen                                                                 |
| `content_type`      | `'heating_oil'`                 | string   | Materialtyp: `heating_oil`, `water`, `diesel`, `gas`, `pellets`, `wood_chips`, Farben       |
| `entities`          | `[]`                            | list     | Liste der Tanks mit `name`-Feld, z.B. `[ {name: "Tank 1"}, {name: "Tank 2"} ]`                |

---

## Funktionsweise
Berechnet den aktuellen Systemfüllstand abhängig vom Sensormodus
Ermittelt den Verbrauch relativ zu initial_fill
Verteilt den Füllstand gleichmäßig auf alle Tanks
Visualisiert den Füllstand über Höhe, Farbe und Muster

## Entwicklerhinweise
Home-Assistant-visuellem Editor und YAML-Editor
Reine Frontend-Custom-Card

