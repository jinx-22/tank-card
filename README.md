# Tank Card – Tank Fill Visualization
*(Link to German version: [Deutsch](#deutsch))*

**Version:** 0.2.1  
**Description:** A Home Assistant custom card to visualize tank levels, total capacity, and consumption.  
Ideal for heating oil, water, diesel, or other liquids.

> **Note:**  
> Fill levels are calculated based on initial fill minus consumption sensor.  
> Liters and percentage values are displayed per tank.

---

## Table of Contents
1. [What does this card do?](#what-does-this-card-do)  
2. [License](#license)
3. [Screenshot](#screenshot)
4. [Features](#features)  
5. [Installation](#manual-installation)  
6. [Example Configuration](#example-configuration)  
7. [All Configuration Options](#configuration-options)  
8. [Functionality](#functionality)  
9. [Developer Notes](#developer-notes)

---

## What does this card do?

Depending on configuration, this custom card shows:

- Multiple tanks with individual names  
- Current fill per tank in liters and percent  
- Total capacity and consumption  
- Color-coded fill levels by liquid type (heating oil, water, diesel, gas, or custom)  
- Customizable tank shapes: rectangle, capsule, pool  
- Responsive layout for desktop and mobile  

---

## License

**Creative Commons – CC BY-NC-SA 4.0**  

- Editing & modifying allowed  
- Non-commercial use only  
- Share adaptations under same license  

[Link to full license](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

## Features

### Tank Visualization
- Each tank shows current fill in liters and percent  
- Gradient colors according to liquid type  

### Tank Information
- Total capacity  
- Current fill  
- Consumption  

### Flexible Layout
- Multiple tanks in a responsive row  
- Customizable tank shapes and colors
- Background adjustments  

### Display Options
- Show/hide liters per tank  
- Show/hide consumption  
- Custom background

### Sensor Support
- Consumption sensor  
- Optional multiple tanks with individual names  

---

## Manual Installation

1. Copy **tank-card.js** to `/config/www/`  
2. In Home Assistant:  
   - Settings  
   - Dashboards  
   - Three-dot menu  
   - Resources  
   - Add Resource  
   - URL: **/local/tank-card.js**  
     Type: **JavaScript Module**
3. Reload browser (CTRL + F5)  

The card is now selectable and visible in the GUI.

---

### Configuration Options

| Option | Default | Type | Description |
|--------|---------|------|-------------|
| `type` | `'custom:tank-card'` | string | Card type |
| `title` | `'Tank Card'` | string | Card title |
| `tank_count` | `3` | number | Number of tanks |
| `tank_capacity` | `1500` | number | Max capacity per tank (L) |
| `initial_fill` | `tank_count*tank_capacity` | number | Initial fill in liters |
| `consumption_sensor` | `''` | string | Consumption sensor entity |
| `liquid_type` | `'heizoel'` | string | Liquid type (heizoel, wasser, diesel, gas, orange, red, brown, blue, yellow) |
| `tank_form` | `'rect'` | string | Tank shape (rect, capsule, pool) |
| `bg_color` | `'rgba(0,0,0,0.3)'` | string | Card background color |
| `show_liters` | `true` | boolean | Show liters in tank |

---

## Example Configuration

```yaml
type: custom:tank-card
title: Meine Tanks
tank_count: 3
tank_capacity: 1500
initial_fill: 1200
consumption_sensor: sensor.heizoelverbrauch_brenner_gesamt_l
liquid_type: heizoel
tank_form: rect
bg_color: 'rgba(0,0,0,0.4)'
show_liters: true
entities:
  - name: Tank 1
  - name: Tank 2
  - name: Tank 3
```

# Functionality

Calculates current fill per tank: current_fill = initial_fill - consumption

Divides current fill evenly among tanks

Displays fill as colored gradient

Responsive layout adjusts for multiple tanks


# Developer Notes

Currently, only the YAML editor is supported in Home Assistant


## Screenshot
<img width="1797" height="2020" alt="tank-card-v 0 2 1" src="https://github.com/user-attachments/assets/97c8f236-a223-4e27-b61e-f272b85d1a18" />

## deutsch
# Tank Card – Tank Visualisierung (Deutsch)

**Version:** 0.2.1  
**Beschreibung:** Eine Home Assistant Custom Card zur Visualisierung von Tankfüllständen, Gesamtkapazität und Verbrauch.  
Ideal für Heizöl, Wasser, Diesel oder andere Flüssigkeiten.

> Hinweis:  
> Die Füllstände werden anhand des Initialfüllstands minus Verbrauchssensor berechnet.  
> Literangaben und Prozentwerte werden pro Tank angezeigt.

---

## Inhaltsverzeichnis
1. [Was macht die Karte?](#was-macht-die-karte)
2. [Lizenz](#lizenz)
3. [Screenshot](#screenshot)
4. [Features](#features)
5. [Installation (manuell)](#installation-manuell)
6. [Beispiel-Konfiguration](#beispiel-konfiguration)
7. [Alle Konfigurationsoptionen](#alle-konfigurationsoptionen)
8. [Funktionsweise](#funktionsweise)
9. [Entwicklerhinweise](#entwicklerhinweise)

---

## Was macht die Karte?

Diese Custom Card zeigt je nach Konfiguration:

- Mehrere Tanks mit individuellen Namen  
- Aktueller Füllstand in Litern und Prozent  
- Gesamtkapazität und Verbrauch  
- Farblich codierte Flüssigkeitsfüllstände nach Typ (Heizöl, Wasser, Diesel, Gas oder individuell)  
- Anpassbare Tankformen: Rechteck, Kapsel, Pool  
- Responsive Layout für Desktop und Mobilgeräte  

---

## Lizenz

**Creative Commons – CC BY-NC-SA 4.0**  

- Bearbeiten & Anpassen erlaubt  
- Keine kommerzielle Nutzung  
- Weitergabe nur unter gleicher Lizenz  

[Link zur vollständigen Lizenz](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

## Features

### Tankvisualisierung
- Jeder Tank zeigt Füllstand in Litern und Prozent  
- Farbverläufe je nach Flüssigkeitstyp  

### Tankinformationen
- Gesamtkapazität  
- Aktueller Füllstand  
- Verbrauch  

### Flexibles Layout
- Mehrere Tanks in einer responsiven Reihe  
- Anpassbare Tankformen und Farben  
- Hintergrundanpassung  

### Anzeigeoptionen
- Literanzeige ein-/ausblendbar  
- Verbrauchsanzeige ein-/ausblendbar  
- Hintergrund individuell einstellbar  

### Sensorunterstützung
- Verbrauchssensor  
- Optional mehrere Tanks mit individuellen Namen  

---

## Installation (manuell)

1. Datei **tank-card.js** nach `/config/www/` kopieren  
2. In Home Assistant:  
   - Einstellungen → Dashboards → Drei-Punkte-Menü → Ressourcen → Ressource hinzufügen  
   - URL: `/local/tank-card.js`  
     Typ: **JavaScript-Modul**
3. Browser neu laden (STRG + F5)  

Die Karte ist nun in der GUI auswählbar.

---

## Beispiel-Konfiguration

```yaml
type: custom:tank-card
title: Meine Tanks
tank_count: 3
tank_capacity: 1500
initial_fill: 1200
consumption_sensor: sensor.heizoelverbrauch_brenner_gesamt_l
liquid_type: heizoel
tank_form: rect
bg_color: 'rgba(0,0,0,0.4)'
show_liters: true
entities:
  - name: Tank 1
  - name: Tank 2
  - name: Tank 3
```

## Alle Konfigurationsoptionen

| Option | Standardwert | Typ | Beschreibung |
|--------|--------------|------|-------------|
| `type` | `'custom:tank-card'` | string | Karten-Typ |
| `title` | `'Tank Card'` | string | Kartentitel |
| `tank_count` | `3` | number | Anzahl der Tanks |
| `tank_capacity` | `1500` | number | Maximalfüllmenge pro Tank (L) |
| `initial_fill` | `tank_count*tank_capacity` | number | Startfüllung in Litern |
| `consumption_sensor` | `''` | string | Entity des Verbrauchssensors |
| `liquid_type` | `'heizoel'` | string | Flüssigkeitstyp |
| `tank_form` | `'rect'` | string | Tankform (rect, capsule, pool) |
| `bg_color` | `'rgba(0,0,0,0.3)'` | string | Hintergrundfarbe der Karte |
| `show_liters` | `true` | boolean | Literanzeige im Tank |

---

## Funktionsweise

- Berechnet aktuellen Füllstand pro Tank: `current_fill = initial_fill - consumption`  
- Verteilt Füllstand gleichmäßig auf alle Tanks  
- Zeigt Füllstand als farbigen Verlauf  
- Responsives Layout passt sich mehreren Tanks an  

---

## Entwicklerhinweise

- Derzeit wird nur der YAML-Editor in Home Assistant unterstützt 
