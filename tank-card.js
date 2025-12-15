class TankCard extends HTMLElement {
  constructor() {
    super();
    console.info(
      "%c Tank-Card %c v.0.3.0",
      "background:#000;color:#fff;font-weight:bold;padding:6px 12px;border-radius:4px;",
      "color:inherit;font-weight:bold;padding:6px 12px;"
    );
    this._config = {};
    this._hass = null;
    this.attachShadow({ mode: "open" });
  }

  static getConfigElement() {
    return document.createElement("tank-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:tank-card",
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
      bg_color: "rgba(0,0,0,0.4)",
      show_unittank: true,
      entities: [
        { name: "Tank 1" },
        { name: "Tank 2" },
        { name: "Tank 3" }
      ]
    };
  }

  setConfig(config) {
    if (!config) throw new Error("Configuration required");
    this._config = config;
    this.tankCount = config.tank_count || 3;
    this.tankCapacity = config.tank_capacity || 1500;
    this.initialFill = config.initial_fill ?? this.tankCount * this.tankCapacity;
    this.sensorMode = config.sensor_mode || "consumption";
    this.consumptionSensor = config.consumption_sensor || "";
    this.levelSensor = config.level_sensor || "";
    this.title = config.title || "Tank Card";
    this.entities = Array.from({ length: this.tankCount }, (_, i) => ({
      name: (config.entities && config.entities[i] && config.entities[i].name) || `Tank ${i + 1}`
    }));
    this.showLiters = config.show_unittank !== undefined ? config.show_unittank : true;
    this.bgColor = config.bg_color || "rgba(0,0,0,0.3)";
    this.fontFamily = config.font_family || "sans-serif";
    this.fontSize = config.font_size || "1em";
    this.tankForm = config.tank_form || "rect";

    switch (config.content_type) {
      case "heating_oil": this.fillColor = "linear-gradient(to top, rgba(190,0,40,1), rgba(220,90,130,1))"; break;
      case "gas": this.fillColor = "linear-gradient(to top, rgba(180,220,255,0.6), rgba(200,240,255,0.6))"; break;
      case "pellets": this.fillColor =  "repeating-linear-gradient(135deg, #8B4513 0px, #8B4513 6px, transparent 6px, transparent 12px)," + "repeating-linear-gradient(45deg, #CD853F 0px, #CD853F 4px, #8B4513 4px, #8B4513 9px)"; break;
      case "wood_chips": this.fillColor = "repeating-linear-gradient(20deg,#7A3E12 0px,#7A3E12 7px,transparent 7px,transparent 14px),repeating-linear-gradient(67deg,#9C5A1A 0px,#9C5A1A 5px,#6B3A10 5px,#6B3A10 11px),repeating-linear-gradient(140deg,#B87333 0px,#B87333 4px,transparent 4px,transparent 9px),linear-gradient(to top,#8B4513,#A0522D)"; break;
      case "water": this.fillColor = "linear-gradient(to top, rgba(0,120,255,0.8), rgba(0,180,255,0.8))"; break;
      case "diesel": this.fillColor = "linear-gradient(to top, rgba(210,180,50,1), rgba(255,220,80,1))"; break;
      case "orange": this.fillColor = "linear-gradient(to top, orange, darkorange)"; break;
      case "red": this.fillColor = "linear-gradient(to top, red, darkred)"; break;
      case "brown": this.fillColor = "linear-gradient(to top, sienna, saddlebrown)"; break;
      case "blue": this.fillColor = "linear-gradient(to top, dodgerblue, deepskyblue)"; break;
      case "yellow": this.fillColor = "linear-gradient(to top, yellow, gold)"; break;
      default: this.fillColor = "linear-gradient(to top, #ffcc00, #ffaa00)";
    }
    
    this.unit = config.unit || "L";
    
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  get hass() { return this._hass; }

  _getValues() {
    const totalCapacity = this.tankCount * this.tankCapacity;
    let currentFill = 0;
    let consumption = 0;
  
    if (!this._hass) return { totalCapacity, currentFill, consumption };
  
    if (this.sensorMode === "consumption" && this.consumptionSensor) {
      const s = parseFloat(this._hass.states[this.consumptionSensor]?.state);
      consumption = isNaN(s) ? 0 : s;
      currentFill = Math.max(this.initialFill - consumption, 0);
    }
  
    if (this.sensorMode === "fill_level_percent" && this.levelSensor) {
      const p = parseFloat(this._hass.states[this.levelSensor]?.state);
      const percent = isNaN(p) ? 0 : Math.min(Math.max(p, 0), 100);
    
      currentFill = (totalCapacity * percent) / 100;
      consumption = Math.max(this.initialFill - currentFill, 0);
    }
  
    if (this.sensorMode === "fill_level_l" && this.levelSensor) {
      const l = parseFloat(this._hass.states[this.levelSensor]?.state);
      currentFill = isNaN(l) ? 0 : Math.min(l, totalCapacity);
      consumption = Math.max(this.initialFill - currentFill, 0); // Verbrauch relativ zu initial_fill
    }
  
    return { totalCapacity, currentFill, consumption };
  }

    _getTankBorderRadius(form) {
      switch (form) {
        case "pool": return "200px / 15px";
        case "capsule": return "200px / 200px";
        default: return "4px";
      }
    }

  render() {
    if (!this._hass) return;

    const { totalCapacity, currentFill, consumption } = this._getValues();
    const tankRadius = this._getTankBorderRadius(this.tankForm);
    const systemFillPercent = (currentFill / totalCapacity) * 100;
    const tankFillLiters = currentFill / this.tankCount;

    const style = document.createElement("style");
    style.textContent = `
      .container { display:flex; flex-direction:column; gap:10px; background:${this.bgColor}; padding:10px; border-radius:12px; font-family:${this.fontFamily}; height:100%; box-sizing:border-box; }
      .title { text-align:center; font-size:1.7em; color:#fff; }
      .info-bar { display:flex; justify-content:space-between; font-size:1.2em; font-weight:bold; color:#fff; }
      .info-left { display:grid; grid-template-columns:auto auto; column-gap:10px; row-gap:6px; padding-left:12px; padding-bottom:1.2em; }
      .info-right { display:flex; flex-direction:column; align-items:flex-end; padding-right:12px; gap:4px; }
      .tanks { display:flex; gap:12px; justify-content:center; flex:1; align-items:flex-end; }
      .tank { flex:1; display:flex; flex-direction:column; align-items:center; background:#2b2b2b; border-radius:${tankRadius}; padding:10px; box-shadow:inset 0 3px 6px rgba(255,255,255,0.08), inset 0 -6px 10px rgba(0,0,0,0.7); height:100%; }
      .tank-name { font-size:1em; margin-bottom:8px; color:#fff; }
      .tank-level { width:100%; flex:1; border-radius:${tankRadius}; overflow:hidden; position:relative; display:flex; align-items:flex-end; justify-content:center;
        background: radial-gradient(circle at center, #ddd 0%, #bdbdbd 80%, #888 100%);
        border:5px solid transparent;
        box-shadow: inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -6px 10px rgba(0,0,0,0.9), 0 6px 10px rgba(0,0,0,0.6);
      }
      .tank-fill { width:100%; background:${this.fillColor}; display:flex; align-items:flex-end; justify-content:center; font-size:0.9em; font-weight:bold; color:#FFF; text-shadow:0 0 4px rgba(0,0,0,1.0); padding-bottom:0.2em; transition:height 0.4s ease; box-shadow: inset 0 4px 6px rgba(255,255,255,0.2), inset 0 -6px 8px rgba(0,0,0,0.6); }
    `;

    const container = document.createElement("div");
    container.className = "container";

    container.innerHTML = `
      <div class="title">${this.title}</div>
      <div class="info-bar">
        <div class="info-left">
          <div>Max:</div><div>${totalCapacity.toFixed(0)} ${this.unit}</div>
          <div>Level:</div><div>${currentFill.toFixed(0)} ${this.unit}</div>
        </div>
        <div class="info-right">
          <div>${systemFillPercent.toFixed(1)}%</div>
          <div>${consumption.toFixed(1)} ${this.unit}</div>
        </div>
      </div>
    `;

    const tanksDiv = document.createElement("div");
    tanksDiv.className = "tanks";

    this.entities.forEach(tank => {
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
      if (this.showLiters) levelFill.textContent = `${tankFillLiters.toFixed(0)} ${this.unit}`;

      levelWrapper.appendChild(levelFill);
      tankDiv.appendChild(nameDiv);
      tankDiv.appendChild(levelWrapper);
      tanksDiv.appendChild(tankDiv);
    });

    container.appendChild(tanksDiv);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
  }

  getCardSize() { return 6; }
}

customElements.define("tank-card", TankCard);

class TankCardEditor extends HTMLElement {
  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    this.innerHTML = `<div style="padding:16px"><ha-form></ha-form></div>`;
    this._form = this.querySelector("ha-form");

    this._form.addEventListener("value-changed", (e) => {
      this._config = e.detail.value;
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      }));
      this._updateSchema();
    });
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    this._updateSchema();
  }

  setConfig(config) {
    this._config = config;
    this._updateSchema();
  }

  _updateSchema() {
    if (!this._form || !this._config || !this._hass) return;

    const lang = this._hass.language; // z.B. "de" oder "en"
    const t = (en, de) => (lang === "de" ? de : en);

    const schema = [
      { name: "title", selector: { text: {} }, label: t() },
      { name: "tank_count", selector: { number: {} }, label: t("Count","Anzahl") },
      { name: "tank_capacity", selector: { number: {} }, label: t("Capacity","Kapazität") },
      { name: "initial_fill", selector: { number: {} }, label: t("Initial fill","Anfangsfüllung") },
      {
        name: "sensor_mode",
        selector: {
          select: {
            options: [
              { value: "consumption", label: t("Consumption sensor","Verbrauchssensor") },
              { value: "fill_level_l", label: t("Level sensor (unit)","Füllstandssensor (Einheit)") },
              { value: "fill_level_percent", label: t("Level sensor (%)","Füllstandssensor (%)") }
            ]
          }
        },
        label: t("Sensor mode","Sensor auswählen")
      },

      this._config.sensor_mode === "consumption"
        ? { name: "consumption_sensor", selector: { entity: { domain: "sensor" } }, label: t("Sensor","Sensor") }
        : { name: "level_sensor", selector: { entity: { domain: "sensor" } }, label: t("Sensor","Sensor") },

      {
        name: "content_type",
        selector: {
          select: {
            options: [
              { value: "heating_oil", label: t("Heating oil","Heizöl") },
              { value: "gas", label: t("Gas","Gas") },
              { value: "pellets", label: t("pellets","Pellets") },
              { value: "wood_chips", label: t("Wood Chips","Hackschnitzel") },
              { value: "water", label: t("Water","Wasser") },
              { value: "diesel", label: t("Diesel","Diesel") },
              { value: "orange", label: t("Orange","Orange") },
              { value: "red", label: t("Red","Rot") },
              { value: "brown", label: t("Brown","Braun") },
              { value: "blue", label: t("Blue","Blau") },
              { value: "yellow", label: t("Yellow","Gelb") }
            ]
          }
        },
        label: t("content","Inhalt")
      },

    { 
      name: "unit",
      selector: {
        select: {
          options: [
            { value: "L", label: t("Liters", "Liter") },
            { value: "kg", label: t("Kilograms", "Kilogramm") },
            { value: "m3", label: t("Cubic meters", "Kubikmeter") }
          ]
        }
      },
      label: t("Unit", "Einheit")
    },      
      { name: "show_unittank", selector: { boolean: {} }, label: t("Show Unit/Tank","Einheit pro Tank anzeigen") }
    ];

    this._form.schema = schema;
    this._form.data = this._config;
    this._form.hass = this._hass;
  }
}
customElements.define("tank-card-editor", TankCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tank-card",
  name: "Tank Card",
  preview: true,
  description: "Displays the fill level of your tanks using consumption or level sensors."
});
