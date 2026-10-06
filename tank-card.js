/**
 * Tank Card
 * Version: 0.7.0
 */
const TANK_CARD_VERSION = "0.7.0";
console.info(
  `%c Tank Card %c v${TANK_CARD_VERSION}`,
  "font-weight:bold;background:#03a9f4;color:white;padding:2px 6px;border-radius:3px 0 0 3px",
  "background:#555;color:white;padding:2px 6px;border-radius:0 3px 3px 0"
);
const LANGUAGES = {
  en: {
    ui: {
      max: "Max:",
      level: "Amount:",
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
      font_size: "Font size in percent (50–200)."
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
      forms: { rect: "Rectangle", pool: "Cylinder", capsule: "Capsule" }
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
      font_size: "Schriftgröße in Prozent (50–200)."
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
      forms: { rect: "Rechteck", pool: "Zylinder", capsule: "Kapsel" }
    }
  }
};
const CONTENT_GRADIENTS = {
  heating_oil: "linear-gradient(to top,#ff2a55 0%,#d91445 32%,#a40024 68%,#8a0018 100%)",
  gas: "linear-gradient(to top,#c4f6ff 0%,#68e4fa 30%,#18c3e5 62%,#00a8d6 100%)",
  pellets:
    "repeating-linear-gradient(135deg,#8B4513 0 6px,transparent 6px 12px)," +
    "repeating-linear-gradient(45deg,#CD853F 0 4px,#8B4513 4px 9px)",
  wood_chips:
    "repeating-linear-gradient(20deg,#7A3E12 0 7px,transparent 7px 14px)," +
    "repeating-linear-gradient(67deg,#9C5A1A 0 5px,#6B3A10 5px 11px)," +
    "repeating-linear-gradient(140deg,#B87333 0 4px,transparent 4px 9px)," +
    "linear-gradient(to top,#8B4513,#A0522D)",
  water: "linear-gradient(to top,#00c8ff 0%,#00aee8 28%,#007bd0 62%,#0046d0 100%)",
  diesel: "linear-gradient(to top,#fff35a 0%,#ffd928 30%,#f5c400 62%,#e0a900 100%)",
  orange: "linear-gradient(to top,#ffb300,#e65100)",
  red: "linear-gradient(to top,#ff3030 0%,#ed2028 32%,#b50012 68%,#8b0000 100%)",
  brown: "linear-gradient(to top,#cf6a1f 0%,#b55315 32%,#85390d 68%,#6b2f0a 100%)",
  blue: "linear-gradient(to top,#3aa6ff 0%,#2788ee 30%,#1958dc 65%,#1030d0 100%)",
  yellow: "linear-gradient(to top,#fff176 0%,#f4df4d 30%,#e8c51d 65%,#e0b000 100%)"
};
const CONTENT_GLOWS = {
  heating_oil: "rgba(255,40,80,.75)",
  gas: "rgba(0,200,255,.75)",
  water: "rgba(0,190,255,.75)",
  diesel: "rgba(255,205,45,.75)",
  orange: "rgba(255,150,0,.75)",
  red: "rgba(255,0,0,.75)",
  brown: "rgba(220,110,30,.75)",
  blue: "rgba(40,120,255,.75)",
  yellow: "rgba(255,235,60,.75)"
};
const TANK_RADII = {
  rect: { outer: "12px", inner: "8px" },
  pool: { outer: "200px / 15px", inner: "200px / 15px" },
  capsule: { outer: "200px", inner: "200px" }
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
    this._els = null;
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
      entities: [{ name: "Tank 1" }, { name: "Tank 2" }, { name: "Tank 3" }]
    };
  }
  static getConfigForm() {
    const locale = LANGUAGES[normalizeLanguage(document.documentElement?.lang)];
    const options = (group) =>
      Object.entries(group).map(([value, label]) => ({ value, label }));
    const number = (min, max, step = 1) => ({
      number: { min, ...(max !== undefined ? { max } : {}), step, mode: "box" }
    });
    const select = (group) => ({ select: { options: options(group) } });
    const grid = (name, schema) => ({ type: "grid", name, flatten: true, schema });
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        grid("tank_settings", [
          { name: "tank_count", selector: number(1, 20) },
          { name: "tank_capacity", selector: number(1) },
          { name: "initial_fill", selector: number(0) }
        ]),
        grid("appearance_settings", [
          { name: "content_type", selector: select(locale.options.contents) },
          { name: "unit", selector: select(locale.options.units) }
        ]),
        { name: "sensor_mode", selector: select(locale.options.modes) },
        {
          name: "consumption_sensor",
          selector: { entity: { domain: "sensor" } },
          visible: { field: "sensor_mode", value: "consumption" }
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
        grid("display_settings", [
          { name: "tank_form", selector: select(locale.options.forms) },
          { name: "show_unittank", selector: { boolean: {} } }
        ]),
        { name: "theme", selector: { theme: {} } },
        { name: "font_size", selector: number(50, 200) }
      ],
      computeLabel: (schema) => locale.editor[schema.name] ?? schema.name,
      computeHelper: (schema) =>
        ({
          consumption_sensor: locale.helper.consumption_sensor,
          level_sensor: locale.helper.level_sensor,
          font_size: locale.helper.font_size
        })[schema.name]
    };
  }
  // Akzeptiert Zahl, "120", "120%", "1.2em" und "19px" (16px = 100 %), begrenzt auf 50–200 %.
  static _normalizeFontSize(value) {
    let percent = 100;
    if (typeof value === "number") {
      percent = value;
    } else if (typeof value === "string") {
      const match = value.trim().match(/^(\d+(?:\.\d+)?)\s*(%|em|px)?$/);
      if (match) {
        const n = Number.parseFloat(match[1]);
        percent = match[2] === "em" ? n * 100 : match[2] === "px" ? (n / 16) * 100 : n;
      }
    }
    return `${clamp(Number.isFinite(percent) ? percent : 100, 50, 200)}%`;
  }
  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass || null;
    if (this._shouldUpdate(oldHass, this._hass)) {
      this._update();
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
    this._levelSensor = typeof config.level_sensor === "string" ? config.level_sensor : "";
    this._title =
      typeof config.title === "string" && config.title.length ? config.title : "Tank Card";
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
    this._build();
    this._update();
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
      max_rows: 8
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
  // name = null → Standardname wird erst beim Rendern lokalisiert
  _buildEntities(config) {
    const configured = Array.isArray(config.entities) ? config.entities : [];
    return Array.from({ length: this._tankCount }, (_, index) => {
      const name = configured[index]?.name;
      return { name: typeof name === "string" && name.trim() ? name : null };
    });
  }
  _localize(path) {
    const language = normalizeLanguage(this._hass?.locale?.language);
    const lookup = (locale) => path.split(".").reduce((obj, key) => obj?.[key], locale);
    return lookup(LANGUAGES[language]) ?? lookup(LANGUAGES.en) ?? path;
  }
  _getState(entityId) {
    return entityId ? this._hass?.states?.[entityId] : undefined;
  }
  _shouldUpdate(oldHass, newHass) {
    if (!this._config) return true;
    if (!oldHass || !newHass) return true;
    if (oldHass.locale?.language !== newHass.locale?.language) return true;
    if (oldHass.themes !== newHass.themes) return true;
    return [this._consumptionSensor, this._levelSensor]
      .filter(Boolean)
      .some((id) => oldHass.states?.[id]?.state !== newHass.states?.[id]?.state);
  }
  _getValues() {
    const totalCapacity = this._tankCount * this._tankCapacity;
    let currentFill = 0;
    let consumption = 0;
    if (this._sensorMode === "consumption" && this._consumptionSensor) {
      consumption = Math.max(parseNumber(this._getState(this._consumptionSensor)?.state, 0), 0);
      currentFill = clamp(this._initialFill - consumption, 0, totalCapacity);
    } else if (this._sensorMode === "fill_level_percent" && this._levelSensor) {
      const percentage = clamp(parseNumber(this._getState(this._levelSensor)?.state, 0), 0, 100);
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
  _addInfo(parent, key) {
    const item = createElement("div", "info-item");
    const label = createElement("div", "info-label");
    const value = createElement("div", "info-value");
    item.append(label, value);
    parent.appendChild(item);
    return { key, label, value };
  }
  // Baut DOM + Style einmalig bei setConfig auf. Werte werden danach nur noch in _update() gesetzt,
  // dadurch bleibt die Höhen-Transition der Füllung erhalten.
  _build() {
    const rect = this._tankForm === "rect";
    const radii = TANK_RADII[this._tankForm];
    const glow = CONTENT_GLOWS[this._contentType] || "transparent";
    const brightness = "1.4";
    const gradient = this._getFillGradient();
    const style = document.createElement("style");
    style.textContent = `
      :host{display:block;width:100%;height:100%;min-height:0;box-sizing:border-box;container-type:inline-size;--r:${radii.outer};--r2:${radii.inner}}
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
        background:linear-gradient(90deg,rgba(0,0,0,.35),rgba(255,255,255,.38) 10%,rgba(255,255,255,.12) 40%,rgba(0,0,0,.12) 85%,rgba(0,0,0,.4)),color-mix(in srgb,var(--card-background-color,var(--primary-background-color)) 80%,var(--primary-text-color) 20%);
        box-shadow:inset 0 3px 6px rgba(255,255,255,.8),inset 0 -10px 14px rgba(0,0,0,.6),0 16px 14px -8px rgba(0,0,0,.55),0 3px 0 rgba(0,0,0,.3)}
      .tank-name{flex:0 0 auto;width:100%;margin-bottom:8px;font-size:1em;font-weight:500;text-align:center;color:var(--primary-text-color);text-shadow:0 1px 1px rgba(0,0,0,.4);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .tank-level{display:flex;flex:1 1 auto;align-items:flex-end;justify-content:center;position:relative;width:100%;min-width:0;min-height:0;overflow:hidden;box-sizing:border-box;border-radius:var(--r2);border:4px solid rgba(0,0,0,.3);isolation:isolate;font-size:clamp(7px,2.8cqw,14px);font-weight:bold;color:#fff;text-align:center;text-shadow:0 0 4px #000,0 0 8px var(--glow);
        background:linear-gradient(90deg,rgba(0,0,0,.38),rgba(0,0,0,.04) 18%,rgba(0,0,0,.04) 75%,rgba(0,0,0,.45)),radial-gradient(circle at 40% 30%,#f8f8f8 0%,#e4e4e4 70%,#b8b8b8 100%);
        box-shadow:inset 0 4px 8px rgba(0,0,0,.45),inset 0 -8px 12px rgba(0,0,0,.8),0 1px 0 rgba(255,255,255,.55)}
      .tank-level::before{content:"";position:absolute;left:0;right:0;top:0;height:14%;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 50% 0,rgba(0,0,0,.4),transparent 70%)}
      .tank-level::after{content:"";position:absolute;inset:0;z-index:20;pointer-events:none;border-radius:inherit;
        background:linear-gradient(90deg,transparent 3%,rgba(255,255,255,.6) 7%,rgba(255,255,255,.1) 13%,transparent 20%,transparent 86%,rgba(255,255,255,.25) 92%,transparent 96%),linear-gradient(180deg,rgba(255,255,255,.22),transparent 25%)}
      .tank-value{position:absolute;left:0;right:0;bottom:.25em;z-index:30;pointer-events:none;font-size:inherit;font-weight:inherit;color:#fff;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,0 0 3px #000,0 0 6px rgba(0,0,0,.9),0 2px 3px rgba(0,0,0,.8)}
      .tank-fill{--glow:${glow};position:relative;z-index:5;isolation:isolate;display:flex;align-items:flex-end;justify-content:center;width:100%;box-sizing:border-box;padding-bottom:.2em;background:${gradient};transition:height .4s ease;overflow:hidden}
      .tank-fill::before{content:"";position:absolute;left:-3px;right:-3px;top:0;height:.85em;z-index:6;background:inherit;filter:brightness(${brightness});pointer-events:none;border-radius:50%;box-shadow:inset 0 1px 3px rgba(255,255,255,.9),0 0 5px var(--glow)}
      .tank-level.rect-form .tank-fill{clip-path:polygon(10% 0,90% 0,100% .9em,100% 100%,0 100%,0 .9em)}
      .tank-level.rect-form .tank-fill::before{left:0;right:0;height:.9em;border-radius:0;
        background:linear-gradient(90deg,rgba(0,0,0,.38),rgba(0,0,0,.04) 18%,rgba(0,0,0,.04) 75%,rgba(0,0,0,.45)),${gradient}}
    `;
    const card = createElement("ha-card", "tank-card");
    const content = createElement("div", "content");
    content.style.setProperty("--tank-card-font-size", this._fontSize);
    content.appendChild(createElement("div", "title", this._title));
    const infoBar = createElement("div", "info-bar");
    const left = createElement("div", "info-column");
    const right = createElement("div", "info-column");
    const info = {
      max: this._addInfo(left, "ui.max"),
      level: this._addInfo(left, "ui.level"),
      fill: this._addInfo(right, "ui.fill_level"),
      consumption: this._addInfo(right, "ui.consumption")
    };
    infoBar.append(left, right);
    content.appendChild(infoBar);
    const tanksEl = createElement("div", "tanks");
    const tanks = this._entities.map(() => {
      const tank = createElement("div", "tank");
      const name = createElement("div", "tank-name");
      const level = createElement("div", rect ? "tank-level rect-form" : "tank-level");
      const fill = createElement("div", "tank-fill");
      const value = createElement("div", "tank-value");
      level.append(fill, value);
      tank.append(name, level);
      tanksEl.appendChild(tank);
      return { name, fill, value };
    });
    content.appendChild(tanksEl);
    card.appendChild(content);
    this._els = { card, info, tanks };
    this.shadowRoot.replaceChildren(style, card);
  }
  _update() {
    const els = this._els;
    if (!els || !this._config) return;
    const { totalCapacity, currentFill, consumption } = this._getValues();
    const percentage =
      totalCapacity > 0 ? clamp((currentFill / totalCapacity) * 100, 0, 100) : 0;
    const amountPerTank = currentFill / this._tankCount;
    const unit = this._unit;
    const setInfo = (item, value) => {
      item.label.textContent = this._localize(item.key);
      item.value.textContent = value;
    };
    setInfo(els.info.max, `${totalCapacity.toFixed(0)} ${unit}`);
    setInfo(els.info.level, `${currentFill.toFixed(0)} ${unit}`);
    setInfo(els.info.fill, `${percentage.toFixed(0)}%`);
    setInfo(els.info.consumption, `${consumption.toFixed(0)} ${unit}`);
    this._applySelectedTheme(els.card);
    els.tanks.forEach((tank, index) => {
      tank.name.textContent =
        this._entities[index].name ?? `${this._localize("ui.tank")} ${index + 1}`;
      tank.fill.style.height = `${percentage}%`;
      tank.value.textContent = this._showUnitTank
        ? `${amountPerTank.toFixed(0)} ${unit}`
        : "";
    });
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
