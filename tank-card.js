/*
 * Tank Card
 * Version: 0.6.5
 * Home Assistant custom card – cleaned, HA-aligned + conditional editor
 */
const TANK_CARD_VERSION = "0.6.4";

console.info(
  `%c Tank Card %c v${TANK_CARD_VERSION}`,
  "font-weight:bold;background:#03a9f4;color:white;padding:2px 6px;border-radius:3px 0 0 3px",
  "background:#555;color:white;padding:2px 6px;border-radius:0 3px 3px 0"
);

const LANGUAGES = {
  en: {
    ui: {
      max: "Max:",
      level: "Level:",
      fill_level: "Level:",
      consumption: "Consumption:",
      tank: "Tank"
    },
    editor: {
      title: "Title",
      tank_count: "Number of tanks",
      tank_capacity: "Capacity per tank",
      initial_fill: "Initial fill",
      sensor_mode: "Sensor mode",
      consumption_sensor: "Consumption sensor",
      level_sensor: "Level sensor",
      content_type: "Content type",
      unit: "Unit",
      show_unittank: "Show amount per tank",
      tank_form: "Tank shape",
      theme: "Theme",
      font_size: "Font size"
    },
    helper: {
      consumption_sensor: "Sensor used in consumption mode.",
      level_sensor: "Sensor used in both level modes.",
      font_size: "Values below 50 are accepted by the editor. The displayed size is limited to 50–200%."
    },
    options: {
      modes: {
        consumption: "Consumption sensor",
        fill_level_l: "Level sensor (kg, m³)",
        fill_level_percent: "Level sensor (%)"
      },
      contents: {
        heating_oil: "Heating oil",
        gas: "Gas",
        pellets: "Pellets",
        wood_chips: "Wood chips",
        water: "Water",
        diesel: "Diesel",
        orange: "Orange",
        red: "Red",
        brown: "Brown",
        blue: "Blue",
        yellow: "Yellow"
      },
      units: { L: "Liters", kg: "Kilograms", m3: "Cubic meters" },
      forms: { rect: "Rectangle", pool: "Pool", capsule: "Capsule" }
    }
  },
  de: {
    ui: {
      max: "Max:",
      level: "Stand:",
      fill_level: "Füllstand:",
      consumption: "Verbrauch:",
      tank: "Tank"
    },
    editor: {
      title: "Titel",
      tank_count: "Anzahl der Tanks",
      tank_capacity: "Kapazität pro Tank",
      initial_fill: "Anfangsfüllung",
      sensor_mode: "Sensormodus",
      consumption_sensor: "Verbrauchssensor",
      level_sensor: "Füllstandssensor",
      content_type: "Inhalt",
      unit: "Einheit",
      show_unittank: "Menge pro Tank anzeigen",
      tank_form: "Tankform",
      theme: "Theme",
      font_size: "Schriftgröße"
    },
    helper: {
      consumption_sensor: "Sensor für den Modus Verbrauchssensor.",
      level_sensor: "Sensor für beide Füllstandsmodi.",
      font_size: "Werte unter 50 werden vom Editor akzeptiert. Die Darstellung wird erst bei der Anzeige auf 50–200 % begrenzt."
    },
    options: {
      modes: {
        consumption: "Verbrauchssensor",
        fill_level_l: "Füllstandssensor (kg, m³)",
        fill_level_percent: "Füllstandssensor (%)"
      },
      contents: {
        heating_oil: "Heizöl",
        gas: "Gas",
        pellets: "Pellets",
        wood_chips: "Hackschnitzel",
        water: "Wasser",
        diesel: "Diesel",
        orange: "Orange",
        red: "Rot",
        brown: "Braun",
        blue: "Blau",
        yellow: "Gelb"
      },
      units: { L: "Liter", kg: "Kilogramm", m3: "Kubikmeter" },
      forms: { rect: "Rechteck", pool: "Pool", capsule: "Kapsel" }
    }
  }
};

const CONTENT_GRADIENTS = {
  heating_oil: "linear-gradient(to top,#8a0018,#ff2a55)",
  gas: "linear-gradient(to top,#00a8d6,#c4f6ff)",
  pellets:
    "repeating-linear-gradient(135deg,#8B4513 0 6px,transparent 6px 12px)," +
    "repeating-linear-gradient(45deg,#CD853F 0 4px,#8B4513 4px 9px)",
  wood_chips:
    "repeating-linear-gradient(20deg,#7A3E12 0 7px,transparent 7px 14px)," +
    "repeating-linear-gradient(67deg,#9C5A1A 0 5px,#6B3A10 5px 11px)," +
    "repeating-linear-gradient(140deg,#B87333 0 4px,transparent 4px 9px)," +
    "linear-gradient(to top,#8B4513,#A0522D)",
  water: "linear-gradient(to top,#0046d0,#00c8ff)",
  diesel: "linear-gradient(to top,#ffe14d,#b88a00)",
  orange: "linear-gradient(to top,#ffb300,#e65100)",
  red: "linear-gradient(to top,red,darkred)",
  brown: "linear-gradient(to top,#6b2f0a,#cf6a1f)",
  blue: "linear-gradient(to top,#1030d0,#3aa6ff)",
  yellow: "linear-gradient(to top,#e0b000,#fff176)"
};

const CONTENT_GLOWS = {
  heating_oil: "rgba(255,40,80,.75)",
  gas: "rgba(0,200,255,.7)",
  water: "rgba(0,170,255,.75)",
  diesel: "rgba(255,210,50,.7)",
  orange: "rgba(255,150,0,.75)",
  red: "rgba(255,0,0,.75)",
  brown: "rgba(220,110,30,.6)",
  blue: "rgba(40,120,255,.75)",
  yellow: "rgba(255,235,60,.75)"
};

const VALID_SENSOR_MODES = new Set(["consumption", "fill_level_l", "fill_level_percent"]);
const VALID_UNITS = new Set(["L", "kg", "m3"]);
const VALID_FORMS = new Set(["rect", "pool", "capsule"]);

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

function parseNumber(value, fallback = 0) {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeLanguage(language) {
  return String(language || "en").toLowerCase().startsWith("de") ? "de" : "en";
}

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

class TankCard extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._config = null;
    this.attachShadow({ mode: "open" });
  }

  static getStubConfig() {
    return {
      title: "Tank Card",
      tank_count: 3,
      tank_capacity: 1500,
      initial_fill: 4500,
      sensor_mode: "consumption",
      consumption_sensor: "",
      level_sensor: "",
      content_type: "heating_oil",
      unit: "L",
      show_unittank: true,
      tank_form: "rect",
      theme: "",
      font_size: 100,
      entities: [
        { name: "Tank 1" },
        { name: "Tank 2" },
        { name: "Tank 3" }
      ]
    };
  }

  static getConfigForm() {
    const locale = LANGUAGES[normalizeLanguage(document.documentElement?.lang)];
    const options = (group) =>
      Object.entries(group).map(([value, label]) => ({ value, label }));

    const number = (min, max, step = 1) => ({
      number: {
        min,
        ...(max !== undefined ? { max } : {}),
        step,
        mode: "box"
      }
    });

    const select = (group) => ({
      select: { options: options(group) }
    });

    const grid = (name, schema) => ({
      type: "grid",
      name,
      flatten: true,
      schema
    });

    return {
      schema: [
        { name: "title", selector: { text: {} } },

        grid("tank_settings", [
          { name: "tank_count", selector: number(1, 20) },
          { name: "tank_capacity", selector: number(1) },
          { name: "initial_fill", selector: number(0) }
        ]),

        grid("appearance_settings", [
          {
            name: "content_type",
            selector: select(locale.options.contents)
          },
          {
            name: "unit",
            selector: select(locale.options.units)
          }
        ]),

        {
          name: "sensor_mode",
          selector: select(locale.options.modes)
        },

        {
          name: "consumption_sensor",
          selector: { entity: { domain: "sensor" } },
          visible: {
            field: "sensor_mode",
            value: "consumption"
          }
        },

        {
          name: "level_sensor",
          selector: { entity: { domain: "sensor" } },
          visible: {
            condition: "or",
            conditions: [
              { field: "sensor_mode", value: "fill_level_l" },
              { field: "sensor_mode", value: "fill_level_percent" }
            ]
          }
        },

        grid("appearance_settings", [
          {
            name: "tank_form",
            selector: select(locale.options.forms)
          },
          {
            name: "show_unittank",
            selector: { boolean: {} }
          }
        ]),

        {
          name: "theme",
          selector: { theme: {} }
        },

        {
          name: "font_size",
          selector: number(50, 200)
        }
      ],

      computeLabel: (schema) => locale.editor[schema.name] ?? schema.name,

      computeHelper: (schema) => {
        const helpers = locale.helper;
        return {
          consumption_sensor: helpers.consumption_sensor,
          level_sensor: helpers.level_sensor,
          font_size: helpers.font_size
        }[schema.name];
      }
    };
  }

  static _normalizeFontSize(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return `${clamp(value, 50, 200)}%`;
    }
    if (typeof value !== "string" || !value.trim()) return "100%";

    const normalized = value.trim();
    if (/^\d+(?:\.\d+)?%$/.test(normalized)) {
      return `${clamp(Number.parseFloat(normalized), 50, 200)}%`;
    }
    if (/^\d+(?:\.\d+)?em$/.test(normalized)) {
      return `${clamp(Number.parseFloat(normalized) * 100, 50, 200)}%`;
    }
    if (/^\d+(?:\.\d+)?px$/.test(normalized)) {
      return normalized;
    }
    return "100%";
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass || null;

    if (this._shouldUpdate(oldHass, this._hass)) {
      this._render();
    }
  }

  setConfig(config) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error("Invalid Tank Card configuration.");
    }

    this._config = config;

    this._tankCount = this._safeInteger(config.tank_count, 3, 1, 20);
    this._tankCapacity = this._safeNumber(config.tank_capacity, 1500, 1);
    this._initialFill = this._safeNumber(
      config.initial_fill,
      this._tankCount * this._tankCapacity,
      0
    );
    this._sensorMode = VALID_SENSOR_MODES.has(config.sensor_mode)
      ? config.sensor_mode
      : "consumption";
    this._consumptionSensor =
      typeof config.consumption_sensor === "string" ? config.consumption_sensor : "";
    this._levelSensor =
      typeof config.level_sensor === "string" ? config.level_sensor : "";
    this._title =
      typeof config.title === "string" && config.title.length
        ? config.title
        : "Tank Card";
    this._contentType = Object.prototype.hasOwnProperty.call(
      CONTENT_GRADIENTS,
      config.content_type
    )
      ? config.content_type
      : "heating_oil";
    this._unit = VALID_UNITS.has(config.unit) ? config.unit : "L";
    this._showUnitTank = config.show_unittank !== false;
    this._tankForm = VALID_FORMS.has(config.tank_form) ? config.tank_form : "rect";
    this._theme = typeof config.theme === "string" ? config.theme : "";
    this._fontSize = TankCard._normalizeFontSize(config.font_size);
    this._entities = this._buildEntities(config);

    this._render();
  }

  getCardSize() {
    return 6;
  }

  getGridOptions() {
    return {
      rows: 7,
      columns: 12,
      min_rows: 5,
      min_columns: 12,
      max_rows: 8,
    };
  }

  // ——— Private helpers ———

  _safeNumber(value, fallback, minimum = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(n, minimum) : fallback;
  }

  _safeInteger(value, fallback, minimum, maximum) {
    const n = Number(value);
    return Number.isFinite(n) ? clamp(Math.round(n), minimum, maximum) : fallback;
  }

  _buildEntities(config) {
    const configured = Array.isArray(config.entities) ? config.entities : [];
    return Array.from({ length: this._tankCount }, (_, index) => {
      const item = configured[index];
      return item && typeof item === "object" && typeof item.name === "string" && item.name.trim()
        ? { name: item.name }
        : { name: `${this._localize("ui.tank")} ${index + 1}` };
    });
  }

  _localize(path) {
    const language = normalizeLanguage(this._hass?.locale?.language);
    const lookup = (locale) =>
      path.split(".").reduce((obj, key) => obj?.[key], locale);
    return lookup(LANGUAGES[language]) ?? lookup(LANGUAGES.en) ?? path;
  }

  _getState(entityId) {
    return entityId ? this._hass?.states?.[entityId] : undefined;
  }

  _shouldUpdate(oldHass, newHass) {
    if (!this._config) return true;
    if (!oldHass || !newHass) return true;

    // Sprache / Locale hat sich geändert
    if (oldHass.locale?.language !== newHass.locale?.language) {
      return true;
    }

    // Theme-Objekt hat sich geändert
    if (oldHass.themes !== newHass.themes) {
      return true;
    }

    // Relevante Sensoren
    const entities = [];
    if (this._consumptionSensor) entities.push(this._consumptionSensor);
    if (this._levelSensor) entities.push(this._levelSensor);

    return entities.some(
      (id) => oldHass.states?.[id]?.state !== newHass.states?.[id]?.state
    );
  }

  _getValues() {
    const totalCapacity = this._tankCount * this._tankCapacity;
    let currentFill = 0;
    let consumption = 0;

    if (this._sensorMode === "consumption" && this._consumptionSensor) {
      consumption = Math.max(
        parseNumber(this._getState(this._consumptionSensor)?.state, 0),
        0
      );
      currentFill = clamp(this._initialFill - consumption, 0, totalCapacity);
    } else if (this._sensorMode === "fill_level_percent" && this._levelSensor) {
      const percentage = clamp(
        parseNumber(this._getState(this._levelSensor)?.state, 0),
        0,
        100
      );
      currentFill = (totalCapacity * percentage) / 100;
      consumption = Math.max(this._initialFill - currentFill, 0);
    } else if (this._sensorMode === "fill_level_l" && this._levelSensor) {
      currentFill = clamp(
        parseNumber(this._getState(this._levelSensor)?.state, 0),
        0,
        totalCapacity
      );
      consumption = Math.max(this._initialFill - currentFill, 0);
    }

    return { totalCapacity, currentFill, consumption };
  }

  _getTankBorderRadius() {
    return (
      {
        pool: "200px / 15px",
        capsule: "200px",
        rect: "4px"
      }[this._tankForm] || "4px"
    );
  }

  _getFillGradient() {
    return CONTENT_GRADIENTS[this._contentType] || CONTENT_GRADIENTS.heating_oil;
  }

  _applySelectedTheme(card) {
    if (!this._theme || !this._hass?.themes?.themes) return;
    const theme = this._hass.themes.themes[this._theme];
    if (!theme || typeof theme !== "object") return;

    for (const [key, value] of Object.entries(theme)) {
      if (key.startsWith("--") && typeof value === "string") {
        card.style.setProperty(key, value);
      }
    }
  }

  _appendInfo(parent, label, value) {
    const item = createElement("div", "info-item");
    item.append(
      createElement("div", "info-label", label),
      createElement("div", "info-value", value)
    );
    parent.appendChild(item);
  }

  _render() {
    if (!this.shadowRoot || !this._config) return;

    const { totalCapacity, currentFill, consumption } = this._getValues();
    const percentage =
      totalCapacity > 0 ? clamp((currentFill / totalCapacity) * 100, 0, 100) : 0;
    const amountPerTank = this._tankCount > 0 ? currentFill / this._tankCount : 0;
    const borderRadius = this._getTankBorderRadius();

    const style = document.createElement("style");
    const rect = borderRadius === "4px";
    style.textContent = `
      :host{display:block;width:100%;height:100%;min-height:0;box-sizing:border-box;container-type:inline-size;--r:${rect ? "12px" : borderRadius};--r2:${rect ? "8px" : borderRadius};--sr:${rect ? "8px" : "50%"}}
      ha-card{display:flex;flex-direction:column;width:100%;height:100%;min-height:0;box-sizing:border-box;overflow:hidden}
      .content{display:flex;flex-direction:column;flex:1 1 auto;min-height:0;gap:10px;padding:10px;box-sizing:border-box;font-family:inherit;font-size:var(--tank-card-font-size,100%);color:var(--primary-text-color)}
      .title{flex:0 0 auto;text-align:center;font-size:1.7em;font-weight:500;color:var(--primary-text-color)}
      .info-bar{display:grid;grid-template-columns:minmax(0,1fr);gap:.2em 1.5em;width:100%;flex:0 0 auto;box-sizing:border-box;font-size:1.2em;font-weight:bold;color:var(--primary-text-color)}
      @container (min-width:20em){.info-bar{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
      .info-column{display:grid;grid-template-columns:max-content minmax(0,1fr);row-gap:.2em;column-gap:.5em;align-items:baseline;min-width:0;width:100%;box-sizing:border-box}
      .info-item{display:contents}
      .info-label{min-width:0;white-space:nowrap;text-align:left}
      .info-value{min-width:0;white-space:nowrap;text-align:right}
      .tanks{display:flex;flex:1 1 auto;align-items:flex-end;justify-content:center;gap:14px;min-height:0;width:100%;padding-bottom:12px;box-sizing:border-box}
      .tank{position:relative;display:flex;flex:1 1 0;flex-direction:column;align-items:center;min-width:0;min-height:0;height:100%;box-sizing:border-box;padding:10px;border-radius:var(--r);overflow:hidden;
        background:linear-gradient(90deg,rgba(0,0,0,.35),rgba(255,255,255,.38) 10%,rgba(255,255,255,.12) 40%,rgba(0,0,0,.12) 85%,rgba(0,0,0,.4)),
        color-mix(in srgb,var(--card-background-color,var(--primary-background-color)) 80%,var(--primary-text-color) 20%);
        box-shadow:inset 0 3px 6px rgba(255,255,255,.8),inset 0 -10px 14px rgba(0,0,0,.6),0 16px 14px -8px rgba(0,0,0,.55),0 3px 0 rgba(0,0,0,.3)}
      .tank-name{flex:0 0 auto;width:100%;margin-bottom:8px;font-size:1em;font-weight:500;text-align:center;color:var(--primary-text-color);text-shadow:0 1px 1px rgba(0,0,0,.4);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .tank-level{display:flex;flex:1 1 auto;align-items:flex-end;justify-content:center;position:relative;width:100%;min-width:0;min-height:0;overflow:hidden;box-sizing:border-box;border-radius:var(--r2);border:4px solid rgba(0,0,0,.3);
        background:linear-gradient(90deg,rgba(0,0,0,.38),rgba(0,0,0,.04) 18%,rgba(0,0,0,.04) 75%,rgba(0,0,0,.45)),radial-gradient(circle at 40% 30%,#f8f8f8 0%,#e4e4e4 70%,#b8b8b8 100%);
        box-shadow:inset 0 4px 8px rgba(0,0,0,.45),inset 0 -8px 12px rgba(0,0,0,.8),0 1px 0 rgba(255,255,255,.55)}
      .tank-level::before{content:"";position:absolute;left:0;right:0;top:0;height:14%;z-index:3;pointer-events:none;background:radial-gradient(ellipse at 50% 0,rgba(0,0,0,.4),transparent 70%)}
      .tank-level::after{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;border-radius:inherit;
        background:linear-gradient(90deg,transparent 3%,rgba(255,255,255,.6) 7%,rgba(255,255,255,.1) 13%,transparent 20%,transparent 86%,rgba(255,255,255,.25) 92%,transparent 96%),linear-gradient(180deg,rgba(255,255,255,.22),transparent 25%)}
      .tank-fill{--glow:${CONTENT_GLOWS[this._contentType] || "transparent"};position:relative;isolation:isolate;display:flex;align-items:flex-end;justify-content:center;width:100%;box-sizing:border-box;padding-bottom:.2em;background:${this._getFillGradient()};font-size:.9em;font-weight:bold;color:#fff;text-align:center;text-shadow:0 0 4px #000,0 0 8px var(--glow);transition:height .4s ease;
        box-shadow:0 -2px 8px 1px var(--glow),inset 0 0 14px var(--glow),inset 0 -8px 10px rgba(0,0,0,.55);overflow:hidden}
      .tank-fill{--glow:${CONTENT_GLOWS[this._contentType] || "transparent"};position:relative;isolation:isolate;display:flex;align-items:flex-end;justify-content:center;width:100%;box-sizing:border-box;padding-bottom:.2em;background:${this._getFillGradient()};font-size:.9em;font-weight:bold;color:#fff;text-align:center;text-shadow:0 0 4px #000,0 0 8px var(--glow);transition:height .4s ease;
        box-shadow:0 -2px 8px 1px var(--glow),inset 0 0 14px var(--glow),inset 0 -8px 10px rgba(0,0,0,.55);overflow:hidden}
      .tank-fill::before{content:"";position:absolute;left:-3px;right:-3px;top:0;height:.85em;border-radius:var(--sr);z-index:0;background:inherit;filter:brightness(1.4);box-shadow:inset 0 1px 3px rgba(255,255,255,.9),0 0 5px var(--glow);pointer-events:none}
      .tank-fill::after{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(0,0,0,.45),rgba(255,255,255,.25) 14%,transparent 38%,transparent 80%,rgba(0,0,0,.5));pointer-events:none}
      .tank-fill[style*="height: 0%"]{box-shadow:none}
      .tank-fill[style*="height: 0%"]::before{display:none}
    `;

    const card = createElement("ha-card");
    card.className = "tank-card";
    this._applySelectedTheme(card);

    const content = createElement("div", "content");
    content.style.setProperty("--tank-card-font-size", this._fontSize);

    content.appendChild(createElement("div", "title", this._title));

    const infoBar = createElement("div", "info-bar");
    const left = createElement("div", "info-column");
    const right = createElement("div", "info-column");

    this._appendInfo(left, this._localize("ui.max"), `${totalCapacity.toFixed(0)} ${this._unit}`);
    this._appendInfo(left, this._localize("ui.level"), `${currentFill.toFixed(0)} ${this._unit}`);
    this._appendInfo(right, this._localize("ui.fill_level"), `${percentage.toFixed(0)}%`);
    this._appendInfo(right, this._localize("ui.consumption"), `${consumption.toFixed(0)} ${this._unit}`);

    infoBar.append(left, right);
    content.appendChild(infoBar);

    const tanks = createElement("div", "tanks");
    for (const tankConfig of this._entities) {
      const tank = createElement("div", "tank");
      const name = createElement("div", "tank-name", tankConfig.name);
      const level = createElement("div", "tank-level");
      const fill = createElement("div", "tank-fill");

      fill.style.height = `${percentage}%`;
      if (this._showUnitTank) {
        fill.textContent = `${amountPerTank.toFixed(0)} ${this._unit}`;
      }

      level.appendChild(fill);
      tank.append(name, level);
      tanks.appendChild(tank);
    }

    content.appendChild(tanks);
    card.appendChild(content);

    this.shadowRoot.replaceChildren(style, card);
  }
}

if (!customElements.get("tank-card")) {
  customElements.define("tank-card", TankCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "tank-card")) {
  window.customCards.push({
    type: "tank-card",
    name: "Tank Card",
    preview: true,
    description: "Displays tank fill levels using consumption or level sensors.",
    documentationURL: "https://github.com/jinx-22/tank-card",
    version: TANK_CARD_VERSION
  });
}
