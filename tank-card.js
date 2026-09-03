/*
 * Tank Card
 * Version: 0.5.0
 * Home Assistant custom card
 */

const TANK_CARD_VERSION = "0.5.0";

console.info(
  `%c Tank Card %c v${TANK_CARD_VERSION} installed`,
  "font-weight:bold",
  "font-weight:normal"
);

const LANGUAGES = {
  en: {
    ui: {
      max: "Max:", level: "Level:", fill_level: "Level:",
      consumption: "Consumption:", tank: "Tank"
    },
    editor: {
      title: "Title", tank_count: "Number of tanks",
      tank_capacity: "Capacity per tank", initial_fill: "Initial fill",
      sensor_mode: "Sensor mode", consumption_sensor: "Consumption sensor",
      level_sensor: "Level sensor", content_type: "Content type",
      unit: "Unit", show_unittank: "Show amount per tank",
      tank_form: "Tank shape", theme: "Theme",
      font_family: "Font family", font_size: "Font size"
    },
    helper: {
      consumption_sensor: "Sensor used in consumption mode.",
      level_sensor: "Sensor used in both level modes.",
      font_size: "Values below 50 are accepted by the editor. The displayed size is limited to 50–200%."
    },
    options: {
      modes: {
        consumption: "Consumption sensor",
        fill_level_l: "Level sensor (unit)",
        fill_level_percent: "Level sensor (%)"
      },
      contents: {
        heating_oil: "Heating oil", gas: "Gas", pellets: "Pellets",
        wood_chips: "Wood chips", water: "Water", diesel: "Diesel",
        orange: "Orange", red: "Red", brown: "Brown",
        blue: "Blue", yellow: "Yellow"
      },
      units: { L: "Liters", kg: "Kilograms", m3: "Cubic meters" },
      forms: { rect: "Rectangle", pool: "Pool", capsule: "Capsule" }
    }
  },

  de: {
    ui: {
      max: "Max:", level: "Stand:", fill_level: "Füllstand:",
      consumption: "Verbrauch:", tank: "Tank"
    },
    editor: {
      title: "Titel", tank_count: "Anzahl der Tanks",
      tank_capacity: "Kapazität pro Tank", initial_fill: "Anfangsfüllung",
      sensor_mode: "Sensormodus", consumption_sensor: "Verbrauchssensor",
      level_sensor: "Füllstandssensor", content_type: "Inhalt",
      unit: "Einheit", show_unittank: "Menge pro Tank anzeigen",
      tank_form: "Tankform", theme: "Theme",
      font_family: "Schriftart", font_size: "Schriftgröße"
    },
    helper: {
      consumption_sensor: "Sensor für den Modus Verbrauchssensor.",
      level_sensor: "Sensor für beide Füllstandsmodi.",
      font_size: "Werte unter 50 werden vom Editor akzeptiert. Die Darstellung wird erst bei der Anzeige auf 50–200 % begrenzt."
    },
    options: {
      modes: {
        consumption: "Verbrauchssensor",
        fill_level_l: "Füllstandssensor (Einheit)",
        fill_level_percent: "Füllstandssensor (%)"
      },
      contents: {
        heating_oil: "Heizöl", gas: "Gas", pellets: "Pellets",
        wood_chips: "Hackschnitzel", water: "Wasser", diesel: "Diesel",
        orange: "Orange", red: "Rot", brown: "Braun",
        blue: "Blau", yellow: "Gelb"
      },
      units: { L: "Liter", kg: "Kilogramm", m3: "Kubikmeter" },
      forms: { rect: "Rechteck", pool: "Pool", capsule: "Kapsel" }
    }
  }
};

const CONTENT_GRADIENTS = {
  heating_oil: "linear-gradient(to top,rgba(190,0,40,1),rgba(220,90,130,1))",
  gas: "linear-gradient(to top,rgba(180,220,255,.6),rgba(200,240,255,.6))",
  pellets:
    "repeating-linear-gradient(135deg,#8B4513 0 6px,transparent 6px 12px)," +
    "repeating-linear-gradient(45deg,#CD853F 0 4px,#8B4513 4px 9px)",
  wood_chips:
    "repeating-linear-gradient(20deg,#7A3E12 0 7px,transparent 7px 14px)," +
    "repeating-linear-gradient(67deg,#9C5A1A 0 5px,#6B3A10 5px 11px)," +
    "repeating-linear-gradient(140deg,#B87333 0 4px,transparent 4px 9px)," +
    "linear-gradient(to top,#8B4513,#A0522D)",
  water: "linear-gradient(to top,rgba(0,120,255,.8),rgba(0,180,255,.8))",
  diesel: "linear-gradient(to top,rgba(210,180,50,1),rgba(255,220,80,1))",
  orange: "linear-gradient(to top,orange,darkorange)",
  red: "linear-gradient(to top,red,darkred)",
  brown: "linear-gradient(to top,sienna,saddlebrown)",
  blue: "linear-gradient(to top,dodgerblue,deepskyblue)",
  yellow: "linear-gradient(to top,yellow,gold)"
};

const VALID_SENSOR_MODES = new Set([
  "consumption", "fill_level_l", "fill_level_percent"
]);
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
    this._states = {};
    this._unsubscribe = undefined;
    this._connected = false;
    this._updateStates = this._updateStates.bind(this);
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._connected = true;
    this._requestStates();
    this._render();
  }

  disconnectedCallback() {
    this._connected = false;
    this._unsubscribeStates();
  }

  set hass(hass) {
    this._hass = hass || null;
    this._render();
  }

  setConfig(config) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error("Invalid Tank Card configuration.");
    }

    this._tankCount = this._safeInteger(config.tank_count, 3, 1, 20);
    this._tankCapacity = this._safeNumber(config.tank_capacity, 1500, 1);
    this._initialFill = this._safeNumber(
      config.initial_fill,
      this._tankCount * this._tankCapacity,
      0
    );

    this._sensorMode = VALID_SENSOR_MODES.has(config.sensor_mode)
      ? config.sensor_mode : "consumption";

    this._consumptionSensor =
      typeof config.consumption_sensor === "string"
        ? config.consumption_sensor : "";

    this._levelSensor =
      typeof config.level_sensor === "string"
        ? config.level_sensor : "";

    this._title =
      typeof config.title === "string" && config.title.length
        ? config.title : "Tank Card";

    this._contentType = Object.prototype.hasOwnProperty.call(
      CONTENT_GRADIENTS, config.content_type
    ) ? config.content_type : "heating_oil";

    this._unit = VALID_UNITS.has(config.unit) ? config.unit : "L";
    this._showUnitTank = config.show_unittank !== false;
    this._tankForm = VALID_FORMS.has(config.tank_form)
      ? config.tank_form : "rect";

    this._theme = typeof config.theme === "string" ? config.theme : "";

    this._fontFamily =
      typeof config.font_family === "string" && config.font_family.trim()
        ? config.font_family.trim() : "inherit";

    this._fontSize = TankCard._normalizeFontSize(config.font_size);
    this._entities = this._buildEntities(config);
    this._render();
  }

  _safeNumber(value, fallback, minimum = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(n, minimum) : fallback;
  }

  _safeInteger(value, fallback, minimum, maximum) {
    const n = Number(value);
    return Number.isFinite(n) ? clamp(Math.round(n), minimum, maximum) : fallback;
  }

  _requestStates() {
    if (!this._connected) return;

    this._unsubscribeStates();

    const event = new CustomEvent("context-request", {
      bubbles: true,
      composed: true,
      cancelable: true
    });

    event.context = "states";
    event.subscribe = true;
    event.callback = this._updateStates;
    this.dispatchEvent(event);
  }

  _updateStates(states, unsubscribe) {
    this._states = states && typeof states === "object" ? states : {};

    if (typeof unsubscribe === "function") {
      this._unsubscribe = unsubscribe;
    }

    this._render();
  }

  _unsubscribeStates() {
    if (typeof this._unsubscribe === "function") {
      this._unsubscribe();
      this._unsubscribe = undefined;
    }
  }

  _buildEntities(config) {
    const configured = Array.isArray(config.entities) ? config.entities : [];

    return Array.from({ length: this._tankCount }, (_, index) => {
      const item = configured[index];

      return item &&
        typeof item === "object" &&
        typeof item.name === "string" &&
        item.name.trim()
        ? { name: item.name }
        : { name: `${this._localize("ui.tank")} ${index + 1}` };
    });
  }

  _localize(path) {
    const language = normalizeLanguage(this._hass?.locale?.language);

    const lookup = locale => path.split(".").reduce(
      (object, key) => object?.[key], locale
    );

    return lookup(LANGUAGES[language]) ?? lookup(LANGUAGES.en) ?? path;
  }

  _getState(entityId) {
    return entityId && this._states ? this._states[entityId] : undefined;
  }

  _getValues() {
    const totalCapacity = this._tankCount * this._tankCapacity;
    let currentFill = 0;
    let consumption = 0;

    if (this._sensorMode === "consumption" && this._consumptionSensor) {
      consumption = Math.max(
        parseNumber(this._getState(this._consumptionSensor)?.state, 0), 0
      );

      currentFill = clamp(
        this._initialFill - consumption, 0, totalCapacity
      );
    } else if (
      this._sensorMode === "fill_level_percent" &&
      this._levelSensor
    ) {
      const percentage = clamp(
        parseNumber(this._getState(this._levelSensor)?.state, 0),
        0, 100
      );

      currentFill = totalCapacity * percentage / 100;
      consumption = Math.max(this._initialFill - currentFill, 0);
    } else if (
      this._sensorMode === "fill_level_l" &&
      this._levelSensor
    ) {
      currentFill = clamp(
        parseNumber(this._getState(this._levelSensor)?.state, 0),
        0, totalCapacity
      );

      consumption = Math.max(this._initialFill - currentFill, 0);
    }

    return { totalCapacity, currentFill, consumption };
  }

  _getTankBorderRadius() {
    return {
      pool: "200px / 15px",
      capsule: "200px",
      rect: "4px"
    }[this._tankForm] || "4px";
  }

  _getFillGradient() {
    return CONTENT_GRADIENTS[this._contentType] ||
      CONTENT_GRADIENTS.heating_oil;
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

  _render() {
    if (!this.shadowRoot) return;

    const { totalCapacity, currentFill, consumption } = this._getValues();

    const percentage = totalCapacity > 0
      ? clamp(currentFill / totalCapacity * 100, 0, 100)
      : 0;

    const amountPerTank = this._tankCount > 0
      ? currentFill / this._tankCount
      : 0;

    const borderRadius = this._getTankBorderRadius();

    const style = document.createElement("style");

    style.textContent = `
      :host {
        display:block;
        width:100%;
        height:100%;
        min-height:0;
        box-sizing:border-box;
        container-type:inline-size;
      }

      ha-card {
        display:flex;
        flex-direction:column;
        width:100%;
        height:100%;
        min-height:0;
        box-sizing:border-box;
        overflow:hidden;
      }

      .content {
        display:flex;
        flex-direction:column;
        flex:1 1 auto;
        min-height:0;
        gap:10px;
        padding:10px;
        box-sizing:border-box;
        font-family:var(--tank-card-font-family,inherit);
        font-size:var(--tank-card-font-size,100%);
        color:var(--primary-text-color);
      }

      .title {
        flex:0 0 auto;
        text-align:center;
        font-size:1.7em;
        font-weight:500;
        color:var(--primary-text-color);
      }

      .info-bar {
        display:grid;
        grid-template-columns:minmax(0,1fr);
        gap:.2em 1.5em;
        width:100%;
        flex:0 0 auto;
        box-sizing:border-box;
        font-size:1.2em;
        font-weight:bold;
        color:var(--primary-text-color);
      }

      @container (min-width:20em) {
        .info-bar {
          grid-template-columns:minmax(0,1fr) minmax(0,1fr);
        }
      }

      .info-column {
        display:grid;
        grid-template-columns:max-content minmax(0,1fr);
        row-gap:.2em;
        column-gap:.5em;
        align-items:baseline;
        min-width:0;
        width:100%;
        box-sizing:border-box;
      }

      .info-item {
        display:contents;
      }

      .info-label {
        min-width:0;
        white-space:nowrap;
        text-align:left;
      }

      .info-value {
        min-width:0;
        white-space:nowrap;
        text-align:right;
      }

      .tanks {
        display:flex;
        flex:1 1 auto;
        align-items:flex-end;
        justify-content:center;
        gap:12px;
        min-height:0;
        width:100%;
      }

      .tank {
        display:flex;
        flex:1 1 0;
        flex-direction:column;
        align-items:center;
        min-width:0;
        min-height:0;
        height:100%;
        box-sizing:border-box;
        padding:10px;
        background:color-mix(
          in srgb,
          var(--card-background-color,var(--primary-background-color)) 85%,
          var(--primary-text-color) 15%
        );
        border-radius:${borderRadius};
        box-shadow:
          inset 0 3px 6px rgba(255,255,255,.8),
          inset 0 -6px 10px rgba(0,0,0,.7);
        overflow:hidden;
      }

      .tank-name {
        flex:0 0 auto;
        width:100%;
        margin-bottom:8px;
        font-size:1em;
        text-align:center;
        color:var(--primary-text-color);
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }

      .tank-level {
        display:flex;
        flex:1 1 auto;
        align-items:flex-end;
        justify-content:center;
        position:relative;
        width:100%;
        min-width:0;
        min-height:0;
        overflow:hidden;
        box-sizing:border-box;
        border-radius:${borderRadius};
        background:radial-gradient(
          circle at center,
          #f5f5f5 0%,
          #e6e6e6 80%,
          #c8c8c8 100%
        );
        border:5px solid transparent;
        box-shadow:
          inset 0 2px 3px rgba(0,0,0,.25),
          inset 0 -6px 10px rgba(0,0,0,.9),
          0 6px 10px rgba(0,0,0,.6);
      }

      .tank-fill {
        display:flex;
        align-items:flex-end;
        justify-content:center;
        width:100%;
        box-sizing:border-box;
        padding-bottom:.2em;
        background:${this._getFillGradient()};
        font-size:.9em;
        font-weight:bold;
        color:#fff;
        text-align:center;
        text-shadow:0 0 4px rgba(0,0,0,1);
        transition:height .4s ease;
        box-shadow:
          inset 0 4px 6px rgba(255,255,255,.2),
          inset 0 -6px 8px rgba(0,0,0,.6);
        overflow:hidden;
      }
    `;

    const card = createElement("ha-card");
    card.className = "tank-card";
    this._applySelectedTheme(card);

    const content = createElement("div", "content");
    content.style.setProperty("--tank-card-font-family", this._fontFamily);
    content.style.setProperty("--tank-card-font-size", this._fontSize);

    content.appendChild(createElement("div", "title", this._title));

    const infoBar = createElement("div", "info-bar");
    const left = createElement("div", "info-column");
    const right = createElement("div", "info-column");

    this._appendInfo(
      left,
      this._localize("ui.max"),
      `${totalCapacity.toFixed(0)} ${this._unit}`
    );

    this._appendInfo(
      left,
      this._localize("ui.level"),
      `${currentFill.toFixed(0)} ${this._unit}`
    );

    this._appendInfo(
      right,
      this._localize("ui.fill_level"),
      `${percentage.toFixed(0)}%`
    );

    this._appendInfo(
      right,
      this._localize("ui.consumption"),
      `${consumption.toFixed(0)} ${this._unit}`
    );

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
        fill.textContent =
          `${amountPerTank.toFixed(0)} ${this._unit}`;
      }

      level.appendChild(fill);
      tank.append(name, level);
      tanks.appendChild(tank);
    }

    content.appendChild(tanks);
    card.appendChild(content);

    this.shadowRoot.replaceChildren(style, card);
  }

  _appendInfo(parent, label, value) {
    const item = createElement("div", "info-item");
    item.append(
      createElement("div", "info-label", label),
      createElement("div", "info-value", value)
    );
    parent.appendChild(item);
  }

  getCardSize() {
    return 6;
  }

  getGridOptions() {
    return {
      rows: 6,
      columns: 12,
      min_rows: 3,
      min_columns: 6,
      max_rows: 8,
      max_columns: 48
    };
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
      font_family: "inherit",
      font_size: 100,
      entities: [
        { name: "Tank 1" },
        { name: "Tank 2" },
        { name: "Tank 3" }
      ]
    };
  }

  static getConfigForm() {
    const locale =
      LANGUAGES[
        normalizeLanguage(document.documentElement?.lang)
      ];

    const options = group =>
      Object.entries(group).map(([value, label]) => ({
        value, label
      }));

    const number = (min, max, step = 1) => ({
      number: {
        min,
        ...(max !== undefined ? { max } : {}),
        step,
        mode: "box"
      }
    });

    const select = group => ({
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

        {
          name: "sensor_mode",
          selector: select(locale.options.modes)
        },

        {
          name: "consumption_sensor",
          selector: { entity: { domain: "sensor" } }
        },

        {
          name: "level_sensor",
          selector: { entity: { domain: "sensor" } }
        },

        grid("appearance_settings", [
          {
            name: "content_type",
            selector: select(locale.options.contents)
          },
          {
            name: "unit",
            selector: select(locale.options.units)
          },
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

        grid("font_settings", [
          {
            name: "font_family",
            selector: { text: {} }
          },
          {
            name: "font_size",
            selector: number(0, 1000)
          }
        ])
      ],

      computeLabel: schema =>
        locale.editor[schema.name] ?? schema.name,

      computeHelper: schema => {
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

    if (typeof value !== "string" || !value.trim()) {
      return "100%";
    }

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
}

if (!customElements.get("tank-card")) {
  customElements.define("tank-card", TankCard);
}

window.customCards = window.customCards || [];

if (!window.customCards.some(card => card.type === "tank-card")) {
  window.customCards.push({
    type: "tank-card",
    name: "Tank Card",
    preview: true,
    description:
      "Displays tank fill levels using consumption or level sensors.",
    documentationURL:
      "https://github.com/jinx-22/tank-card",
    version: TANK_CARD_VERSION
  });
}
