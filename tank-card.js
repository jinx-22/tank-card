const languages = {
  en: {
    ui: {
      max: "Max:",
      level: "Level:",
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
      font_family: "Font family",
      font_size: "Font size"
    },
    options: {
      modes: {
        consumption: "Consumption sensor",
        fill_level_l: "Level sensor (unit)",
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
      units: {
        L: "Liters",
        kg: "Kilograms",
        m3: "Cubic meters"
      },
      forms: {
        rect: "Tank",
        pool: "Cylinder",
        capsule: "Capsule tank"
      }
    }
  },
  de: {
    ui: {
      max: "Max:",
      level: "Stand:",
      tank: "Tank"
    },
    editor: {
      title: "Titel",
      tank_count: "Anzahl Tanks",
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
      font_family: "Schriftart",
      font_size: "Schriftgröße"
    },
    options: {
      modes: {
        consumption: "Verbrauchssensor",
        fill_level_l: "Füllstandssensor (Einheit)",
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
      units: {
        L: "Liter",
        kg: "Kilogramm",
        m3: "Kubikmeter"
      },
      forms: {
        rect: "Tank",
        pool: "Zylinder",
        capsule: "Kapsel-Tank"
      }
    }
  }
};

/** Detect HA UI language (works in card + static computeLabel) */
function detectLang() {
  try {
    const ha = document.querySelector("home-assistant");
    const raw = (
      ha?.hass?.language ||
      ha?.hass?.locale?.language ||
      document.documentElement.lang ||
      "en"
    ).toLowerCase();
    return raw.startsWith("de") ? "de" : "en";
  } catch {
    return "en";
  }
}

function t(key) {
  const lang = detectLang();
  const parts = key.split(".");
  let val = languages[lang];
  for (const p of parts) {
    val = val?.[p];
  }
  if (val == null) {
    val = languages.en;
    for (const p of parts) {
      val = val?.[p];
    }
  }
  return val ?? key;
}

class TankCard extends HTMLElement {
  constructor() {
    super();
    console.info(
      "%c Tank-Card %c v0.4.0",
      "background:#000;color:#fff;font-weight:bold;padding:6px 12px;border-radius:4px;",
      "color:inherit;font-weight:bold;padding:6px 12px;"
    );
    this._config = {};
    this._hass = null;
    this._appliedThemeKeys = [];
    this.attachShadow({ mode: "open" });
  }

  _getLanguage() {
    if (this._hass) {
      const raw = (
        this._hass.language ||
        this._hass.locale?.language ||
        "en"
      ).toLowerCase();
      return raw.startsWith("de") ? "de" : "en";
    }
    return detectLang();
  }

  _localize(key) {
    const lang = this._getLanguage();
    let translated = key
      .split(".")
      .reduce((obj, k) => obj?.[k], languages[lang]);
    if (!translated) {
      translated = key
        .split(".")
        .reduce((obj, k) => obj?.[k], languages.en);
    }
    return translated || key;
  }

  /*
   * Built-in visual editor (HA getConfigForm API).
   * Labels via computeLabel → follow HA language at runtime.
   */
  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        {
          name: "tank_count",
          selector: {
            number: { min: 1, max: 20, step: 1, mode: "box" }
          }
        },
        {
          name: "tank_capacity",
          selector: {
            number: { min: 0, step: 1, mode: "box" }
          }
        },
        {
          name: "initial_fill",
          selector: {
            number: { min: 0, step: 1, mode: "box" }
          }
        },
        {
          name: "sensor_mode",
          selector: {
            select: {
              options: [
                { value: "consumption", label: t("options.modes.consumption") },
                { value: "fill_level_l", label: t("options.modes.fill_level_l") },
                {
                  value: "fill_level_percent",
                  label: t("options.modes.fill_level_percent")
                }
              ]
            }
          }
        },
        {
          name: "consumption_sensor",
          selector: { entity: { domain: "sensor" } }
        },
        {
          name: "level_sensor",
          selector: { entity: { domain: "sensor" } }
        },
        {
          name: "content_type",
          selector: {
            select: {
              options: [
                { value: "heating_oil", label: t("options.contents.heating_oil") },
                { value: "gas", label: t("options.contents.gas") },
                { value: "pellets", label: t("options.contents.pellets") },
                { value: "wood_chips", label: t("options.contents.wood_chips") },
                { value: "water", label: t("options.contents.water") },
                { value: "diesel", label: t("options.contents.diesel") },
                { value: "orange", label: t("options.contents.orange") },
                { value: "red", label: t("options.contents.red") },
                { value: "brown", label: t("options.contents.brown") },
                { value: "blue", label: t("options.contents.blue") },
                { value: "yellow", label: t("options.contents.yellow") }
              ]
            }
          }
        },
        {
          name: "unit",
          selector: {
            select: {
              options: [
                { value: "L", label: t("options.units.L") },
                { value: "kg", label: t("options.units.kg") },
                { value: "m3", label: t("options.units.m3") }
              ]
            }
          }
        },
        {
          name: "show_unittank",
          selector: { boolean: {} }
        },
        {
          name: "tank_form",
          selector: {
            select: {
              options: [
                { value: "rect", label: t("options.forms.rect") },
                { value: "pool", label: t("options.forms.pool") },
                { value: "capsule", label: t("options.forms.capsule") }
              ]
            }
          }
        },
        {
          name: "theme",
          selector: { theme: {} }
        },
        { name: "font_family", selector: { text: {} } },
        { name: "font_size", selector: { text: {} } }
      ],
      // Runtime labels – follows HA language (de/en)
      computeLabel: (schema) => {
        const map = {
          title: t("editor.title"),
          tank_count: t("editor.tank_count"),
          tank_capacity: t("editor.tank_capacity"),
          initial_fill: t("editor.initial_fill"),
          sensor_mode: t("editor.sensor_mode"),
          consumption_sensor: t("editor.consumption_sensor"),
          level_sensor: t("editor.level_sensor"),
          content_type: t("editor.content_type"),
          unit: t("editor.unit"),
          show_unittank: t("editor.show_unittank"),
          tank_form: t("editor.tank_form"),
          theme: t("editor.theme"),
          font_family: t("editor.font_family"),
          font_size: t("editor.font_size")
        };
        return map[schema.name] || undefined;
      },
      assertConfig: (config) => {
        const tankCount = Number(config.tank_count);
        if (
          config.tank_count !== undefined &&
          (!Number.isFinite(tankCount) || tankCount < 1 || tankCount > 20)
        ) {
          throw new Error("tank_count must be between 1 and 20.");
        }
        if (
          config.tank_capacity !== undefined &&
          (!Number.isFinite(Number(config.tank_capacity)) ||
            Number(config.tank_capacity) < 0)
        ) {
          throw new Error("tank_capacity must be zero or greater.");
        }
        if (
          config.initial_fill !== undefined &&
          (!Number.isFinite(Number(config.initial_fill)) ||
            Number(config.initial_fill) < 0)
        ) {
          throw new Error("initial_fill must be zero or greater.");
        }
        if (
          config.sensor_mode !== undefined &&
          !["consumption", "fill_level_l", "fill_level_percent"].includes(
            config.sensor_mode
          )
        ) {
          throw new Error("Invalid sensor_mode.");
        }
        if (
          config.content_type !== undefined &&
          ![
            "heating_oil", "gas", "pellets", "wood_chips", "water",
            "diesel", "orange", "red", "brown", "blue", "yellow"
          ].includes(config.content_type)
        ) {
          throw new Error("Invalid content_type.");
        }
        if (
          config.unit !== undefined &&
          !["L", "kg", "m3"].includes(config.unit)
        ) {
          throw new Error("Invalid unit.");
        }
        if (
          config.tank_form !== undefined &&
          !["rect", "pool", "capsule"].includes(config.tank_form)
        ) {
          throw new Error("Invalid tank_form.");
        }
      }
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
      tank_form: "rect",
      show_unittank: true,
      theme: "",
      font_family: "sans-serif",
      font_size: "1em",
      entities: [
        { name: "Tank 1" },
        { name: "Tank 2" },
        { name: "Tank 3" }
      ]
    };
  }

  getGridOptions() {
    return {
      rows: 6,
      columns: 12,
      min_rows: 4,
      min_columns: 6
    };
  }

  getCardSize() {
    return 6;
  }

  setConfig(config) {
    if (!config || typeof config !== "object") {
      throw new Error("Configuration required.");
    }
    this._config = config;
    this.tankCount = this._getTankCount(config.tank_count);
    this.tankCapacity = this._getNumber(config.tank_capacity, 1500);
    this.initialFill = this._getNumber(
      config.initial_fill,
      this.tankCount * this.tankCapacity
    );
    this.sensorMode = config.sensor_mode || "consumption";
    this.consumptionSensor =
      typeof config.consumption_sensor === "string"
        ? config.consumption_sensor
        : "";
    this.levelSensor =
      typeof config.level_sensor === "string" ? config.level_sensor : "";
    this.title =
      typeof config.title === "string" ? config.title : "Tank Card";
    this.entities = Array.from({ length: this.tankCount }, (_, i) => ({
      name:
        config.entities?.[i]?.name &&
        typeof config.entities[i].name === "string"
          ? config.entities[i].name
          : `Tank ${i + 1}`
    }));
    this.showLiters =
      config.show_unittank !== undefined
        ? Boolean(config.show_unittank)
        : true;
    this.fontFamily =
      typeof config.font_family === "string"
        ? config.font_family
        : "sans-serif";
    this.fontSize =
      typeof config.font_size === "string" ? config.font_size : "1em";
    this.tankForm =
      typeof config.tank_form === "string" ? config.tank_form : "rect";
    this.unit = typeof config.unit === "string" ? config.unit : "L";
    this.theme =
      typeof config.theme === "string" && config.theme ? config.theme : "";
    this.fillColor = this._getFillColor(config.content_type);
    this._applyTheme();
    this.render();
  }

  _getTankCount(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 3;
    return Math.min(Math.max(Math.round(number), 1), 20);
  }

  _getNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  _getFillColor(contentType) {
    switch (contentType) {
      case "heating_oil":
        return "linear-gradient(to top, rgba(190,0,40,1), rgba(220,90,130,1))";
      case "gas":
        return "linear-gradient(to top, rgba(180,220,255,0.6), rgba(200,240,255,0.6))";
      case "pellets":
        return (
          "repeating-linear-gradient(135deg, #8B4513 0px, #8B4513 6px, transparent 6px, transparent 12px)," +
          "repeating-linear-gradient(45deg, #CD853F 0px, #CD853F 4px, #8B4513 4px, #8B4513 9px)"
        );
      case "wood_chips":
        return (
          "repeating-linear-gradient(20deg,#7A3E12 0px,#7A3E12 7px,transparent 7px,transparent 14px)," +
          "repeating-linear-gradient(67deg,#9C5A1A 0px,#9C5A1A 5px,#6B3A10 5px,#6B3A10 11px)," +
          "repeating-linear-gradient(140deg,#B87333 0px,#B87333 4px,transparent 4px,transparent 9px)," +
          "linear-gradient(to top,#8B4513,#A0522D)"
        );
      case "water":
        return "linear-gradient(to top, rgba(0,120,255,0.8), rgba(0,180,255,0.8))";
      case "diesel":
        return "linear-gradient(to top, rgba(210,180,50,1), rgba(255,220,80,1))";
      case "orange":
        return "linear-gradient(to top, orange, darkorange)";
      case "red":
        return "linear-gradient(to top, red, darkred)";
      case "brown":
        return "linear-gradient(to top, sienna, saddlebrown)";
      case "blue":
        return "linear-gradient(to top, dodgerblue, deepskyblue)";
      case "yellow":
        return "linear-gradient(to top, yellow, gold)";
      default:
        return "linear-gradient(to top, #ffcc00, #ffaa00)";
    }
  }

  /** Apply selected HA theme CSS variables onto this element */
  _applyTheme() {
    if (this._appliedThemeKeys?.length) {
      this._appliedThemeKeys.forEach((k) => this.style.removeProperty(k));
    }
    this._appliedThemeKeys = [];

    if (!this._hass?.themes || !this.theme) return;

    const themeData = this._hass.themes.themes?.[this.theme];
    if (!themeData || typeof themeData !== "object") return;

    let vars = { ...themeData };
    if (themeData.modes && typeof themeData.modes === "object") {
      const dark = !!this._hass.themes.darkMode;
      const modeVars = dark ? themeData.modes.dark : themeData.modes.light;
      if (modeVars && typeof modeVars === "object") {
        vars = { ...vars, ...modeVars };
      }
      delete vars.modes;
    }

    for (const [key, value] of Object.entries(vars)) {
      if (value == null || typeof value === "object") continue;
      const prop = key.startsWith("--") ? key : `--${key}`;
      this.style.setProperty(prop, String(value));
      this._appliedThemeKeys.push(prop);
    }
  }

  set hass(hass) {
    this._hass = hass;

    if (this._config && this.tankCount) {
      this.entities = Array.from({ length: this.tankCount }, (_, i) => ({
        name:
          this._config.entities?.[i]?.name &&
          typeof this._config.entities[i].name === "string"
            ? this._config.entities[i].name
            : `${this._localize("ui.tank")} ${i + 1}`
      }));
    }

    this._applyTheme();
    this.render();
  }

  get hass() {
    return this._hass;
  }

  _getValues() {
    const totalCapacity = this.tankCount * this.tankCapacity;
    let currentFill = 0;
    let consumption = 0;

    if (!this._hass) {
      return { totalCapacity, currentFill, consumption };
    }

    if (this.sensorMode === "consumption" && this.consumptionSensor) {
      const state = this._hass.states[this.consumptionSensor];
      const value = parseFloat(state?.state);
      consumption = Number.isNaN(value) ? 0 : value;
      currentFill = Math.max(this.initialFill - consumption, 0);
    }

    if (this.sensorMode === "fill_level_percent" && this.levelSensor) {
      const state = this._hass.states[this.levelSensor];
      const value = parseFloat(state?.state);
      const percent = Number.isNaN(value)
        ? 0
        : Math.min(Math.max(value, 0), 100);
      currentFill = (totalCapacity * percent) / 100;
      consumption = Math.max(this.initialFill - currentFill, 0);
    }

    if (this.sensorMode === "fill_level_l" && this.levelSensor) {
      const state = this._hass.states[this.levelSensor];
      const value = parseFloat(state?.state);
      currentFill = Number.isNaN(value)
        ? 0
        : Math.min(Math.max(value, 0), totalCapacity);
      consumption = Math.max(this.initialFill - currentFill, 0);
    }

    return { totalCapacity, currentFill, consumption };
  }

  _getTankBorderRadius(form) {
    switch (form) {
      case "pool":
        return "200px / 15px";
      case "capsule":
        return "200px / 200px";
      default:
        return "4px";
    }
  }

  _createTextElement(className, text) {
    const element = document.createElement("div");
    element.className = className;
    element.textContent = text;
    return element;
  }

  render() {
    if (!this._hass) return;

    const { totalCapacity, currentFill, consumption } = this._getValues();
    const tankRadius = this._getTankBorderRadius(this.tankForm);
    const systemFillPercent =
      totalCapacity > 0
        ? Math.min(Math.max((currentFill / totalCapacity) * 100, 0), 100)
        : 0;
    const tankFillAmount =
      this.tankCount > 0 ? currentFill / this.tankCount : 0;

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 0;
        box-sizing: border-box;
        overflow: hidden;
      }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 0;
        background: var(--ha-card-background, var(--card-background-color, transparent));
        color: var(--primary-text-color, #fff);
        padding: 10px;
        border-radius: var(--ha-card-border-radius, 12px);
        font-family: ${this.fontFamily};
        font-size: ${this.fontSize};
        box-sizing: border-box;
        overflow: hidden;
      }
      .title {
        flex: 0 0 auto;
        text-align: center;
        font-size: 1.7em;
        color: var(--primary-text-color, #fff);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .info-bar {
        flex: 0 0 auto;
        display: flex;
        justify-content: space-between;
        font-size: 1.2em;
        font-weight: bold;
        color: var(--primary-text-color, #fff);
        min-width: 0;
      }
      .info-left {
        display: grid;
        grid-template-columns: auto auto;
        column-gap: 10px;
        row-gap: 6px;
        padding-left: 12px;
        padding-bottom: 1.2em;
        min-width: 0;
      }
      .info-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 12px;
        gap: 4px;
        min-width: 0;
      }
      .tanks {
        display: flex;
        gap: 12px;
        justify-content: center;
        align-items: stretch;
        flex: 1 1 auto;
        width: 100%;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
      }
      .tank {
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 0;
        min-height: 0;
        background: #2b2b2b;
        border-radius: ${tankRadius};
        padding: 10px;
        box-sizing: border-box;
        box-shadow:
          inset 0 3px 6px rgba(255,255,255,0.08),
          inset 0 -6px 10px rgba(0,0,0,0.7);
        overflow: hidden;
      }
      .tank-name {
        flex: 0 0 auto;
        width: 100%;
        font-size: 1em;
        margin-bottom: 8px;
        color: #fff;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tank-level {
        width: 100%;
        min-width: 0;
        min-height: 0;
        flex: 1 1 auto;
        border-radius: ${tankRadius};
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        background:
          radial-gradient(circle at center, #ddd 0%, #bdbdbd 80%, #888 100%);
        border: 5px solid transparent;
        box-sizing: border-box;
        box-shadow:
          inset 0 2px 3px rgba(255,255,255,0.6),
          inset 0 -6px 10px rgba(0,0,0,0.9),
          0 6px 10px rgba(0,0,0,0.6);
      }
      .tank-fill {
        width: 100%;
        background: ${this.fillColor};
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-size: 0.9em;
        font-weight: bold;
        color: #fff;
        text-shadow: 0 0 4px rgba(0,0,0,1);
        padding-bottom: 0.2em;
        box-sizing: border-box;
        transition: height 0.4s ease;
        box-shadow:
          inset 0 4px 6px rgba(255,255,255,0.2),
          inset 0 -6px 8px rgba(0,0,0,0.6);
        overflow: hidden;
      }
    `;

    const container = document.createElement("div");
    container.className = "container";
    container.appendChild(this._createTextElement("title", this.title));

    const infoBar = document.createElement("div");
    infoBar.className = "info-bar";

    const infoLeft = document.createElement("div");
    infoLeft.className = "info-left";
    infoLeft.appendChild(
      this._createTextElement("info-label", this._localize("ui.max"))
    );
    infoLeft.appendChild(
      this._createTextElement(
        "info-value",
        `${totalCapacity.toFixed(0)} ${this.unit}`
      )
    );
    infoLeft.appendChild(
      this._createTextElement("info-label", this._localize("ui.level"))
    );
    infoLeft.appendChild(
      this._createTextElement(
        "info-value",
        `${currentFill.toFixed(0)} ${this.unit}`
      )
    );

    const infoRight = document.createElement("div");
    infoRight.className = "info-right";
    infoRight.appendChild(
      this._createTextElement(
        "info-percent",
        `${systemFillPercent.toFixed(1)}%`
      )
    );
    infoRight.appendChild(
      this._createTextElement(
        "info-consumption",
        `${consumption.toFixed(1)} ${this.unit}`
      )
    );

    infoBar.appendChild(infoLeft);
    infoBar.appendChild(infoRight);
    container.appendChild(infoBar);

    const tanksDiv = document.createElement("div");
    tanksDiv.className = "tanks";

    this.entities.forEach((tank) => {
      const tankDiv = document.createElement("div");
      tankDiv.className = "tank";

      const nameDiv = document.createElement("div");
      nameDiv.className = "tank-name";
      nameDiv.textContent = tank.name;

      const levelWrapper = document.createElement("div");
      levelWrapper.className = "tank-level";

      const levelFill = document.createElement("div");
      levelFill.className = "tank-fill";
      levelFill.style.height = `${systemFillPercent}%`;
      if (this.showLiters) {
        levelFill.textContent = `${tankFillAmount.toFixed(0)} ${this.unit}`;
      }

      levelWrapper.appendChild(levelFill);
      tankDiv.appendChild(nameDiv);
      tankDiv.appendChild(levelWrapper);
      tanksDiv.appendChild(tankDiv);
    });

    container.appendChild(tanksDiv);
    this.shadowRoot.replaceChildren(style, container);
  }
}

customElements.define("tank-card", TankCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tank-card",
  name: "Tank Card",
  preview: true,
  description:
    "Displays the fill level of your tanks using consumption or level sensors.",
  documentationURL:
    "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/"
});
