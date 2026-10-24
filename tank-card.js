const VERSION = "0.9.3";
console.info("%c Tank Card %c v" + VERSION, "font-weight:bold;background:#03a9f4;color:#fff;padding:2px 6px;border-radius:3px 0 0 3px", "background:#555;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0");
const TXT = {
  en: {
    u_max: "Max:", u_level: "Current:", u_fill: "Level:", u_cons: "Consumption:", u_tank: "Tank",
    title: "Title", s_tank: "Tank", s_content: "Content", s_display: "Display", s_animation: "Animation",
    tank_form: "Tank shape", tank_count: "Number of tanks", tank_capacity: "Capacity per tank", content_type: "Content type", custom_color: "Color", liquid_style: "Liquid style",
    sensor_mode: "Sensor mode", initial_fill: "Initial fill",
    q_content: "What is in the tank:", q_mode: "Which measuring sensor is used:", q_sensor: "Select your {m} here:", q_fill: "Enter initial fill:", unit: "Unit", decimals: "Decimal places",
    show_max: "Show “Max:”", show_current: "Show “Current:”", show_fill_level: "Show “Level:”", show_consumption: "Show “Consumption:”",
    show_unittank: "Show amount per tank", show_title: "Show title", show_tank_label: "Show tank label", tank_label: "Tank label", animation: "Wave", animation_interval: "Wave interval (seconds)", bubbles: "Rising bubbles",
    bubble_amount: "Amount of bubbles", theme: "Theme", font_size: "Font size", card_height: "Card height", tank_style: "Tank type", gas_tank: "Gas tank",
    i_gas: "Adds legs and a dome to the capsule.", i_gas_on: "Available: capsule + metal + number 1.",
    h_tank_label: "Name of the tanks, e.g. Water barrel or Gas bottle. The numbering is added automatically. Empty = Tank.",
    h_consumption_sensor: "Sensor used in consumption mode. Tap on the card opens its details.",
    h_level_sensor: "Sensor used in both level modes. Tap on the card opens its details.",
    h_tank_capacity: "Entered in the measuring unit (see Content).",
    h_initial_fill: "Total amount of all tanks at the start, empty = full. Please update after resetting the consumption sensor.",
    h_initial_fill_l: "Total amount of all tanks at the start, empty = full. Only used for the “Consumption” display.",
    h_u_auto: "Auto detect: {u}", h_u_man: "Set manually: {u}",
    h_decimals: "0–5, empty = automatic",
    h_animation_interval: "Time between two waves (5–60 seconds).", h_bubble_amount: "1 = a few bubbles, 8 = very many bubbles.",
    h_font_size: "Font size in percent (50–200).",
    h_card_height: "250–1000 pixels. In the sections view the layout tab takes precedence.",
    s_warn: "Level notification / signaling", warn_1: "Warning level 1 (orange)", warn_1_level: "Level 1 below (%)", warn_2: "Warning level 2 (red)", warn_2_level: "Level 2 below (%)", warn_notify: "Send notification", warn_mobile: "Send mobile app notification", warn_glow: "Signal warning levels",
    h_warn_1_level: "Warning when the level falls below this value (default 20 %).", h_warn_2_level: "Warning when the level falls below this value (default 10 %).",
    h_warn_notify: "Creates a notification in Home Assistant (bell in the sidebar, also visible on mobile) when a level is reached.",
    h_warn_mobile: "Additionally sends the message as a push notification to all devices with the Home Assistant Companion app.",
    h_warn_glow: "Level 1: orange glow, level 2: red glow, with a fading fog behind the tanks.",
    warn_auto: "Create notification automation", warn_repeat: "Every", warn_repeat_unit: "Time unit",
    h_warn_time: "Time", h_warn_repeat: "0 = no repeat.",
    a_suffix: "Notification",
    a_desc: "Created by Tank Card. Please change settings in the card editor, manual changes are overwritten.",
    a_note: "Creates an automation in Home Assistant, only when you press the button, never automatically. When the editor opens, the values of an existing automation are read into the editor. Changes only apply after “Update automation”; saving the card does not change the automation. Cards with the same sensor share one automation. If you delete the card or change the sensor, the automation stays – please delete it yourself. Notifies at the interval set below as long as the level stays below the threshold. For “Days” at the set time, for hours on a fixed schedule!",
    a_create: "Create automation", a_update: "Update automation", a_delete: "Delete automation", a_confirm: "Delete the automation?",
    a_read: "Read values from automation", a_s_nov: "This automation was created by an older version and has no readable values. Please update it once.", a_s_read: "Values read from automation “{n}”.",
    a_s_wait: "Checking automation…", a_s_none: "Automation not created yet.", a_s_ok: "Automation “{n}” is up to date.", a_s_old: "Automation “{n}” differs from the editor values. “Update automation” applies them, “Read values from automation” discards your changes. Saving the card does not change the automation.", a_s_err: "Automation status unknown: {e}",
    a_s_created: "Automation “{n}” created.", a_s_updated: "Automation “{n}” updated.", a_s_deleted: "Automation “{n}” deleted.", a_s_fail: "Saving failed: {e}",
    a_need_sensor: "Select a sensor first.", a_need_warn: "Enable at least one warning level first.", a_need_channel: "Enable “Send notification” or “Send mobile app notification” first.", a_need_phone: "No mobile app devices found.", a_admin: "Administrator rights are required to manage the automation.",
    n_title: "Tank warning – level {s}", n_channel: "Tank warning", n_msg: "{t}: warning level {s} – level below {l} %. Now {p} % ({c} of {m}).",
    o_consumption: "Consumption sensor", o_fill_level_l: "Level sensor (kg, m³, L)", o_fill_level_percent: "Level sensor (%)",
    o_heating_oil: "Heating oil", o_gas: "Gas", o_pellets: "Pellets", o_wood_chips: "Wood chips", o_water: "Water", o_diesel: "Diesel",
    o_custom: "Custom", o_classic: "Previous style", o_new: "New style",
    o_auto: "Auto detect", o_L: "Liters", o_gal: "Gallons", o_kg: "Kilograms", o_m3: "Cubic meters", o_rect: "Cuboid", o_pool: "Cylinder", o_capsule: "Capsule",
    o_glass: "Glass tank", o_metal: "Metal tank",
    o_h: "Hours", o_d: "Days"
  },
  de: {
    u_max: "Max:", u_level: "Aktuell:", u_fill: "Füllstand:", u_cons: "Verbrauch:", u_tank: "Tank",
    title: "Titel", s_tank: "Tank", s_content: "Inhalt", s_display: "Anzeige", s_animation: "Animation",
    tank_form: "Tankform", tank_count: "Anzahl der Tanks", tank_capacity: "Kapazität pro Tank", content_type: "Inhalt", custom_color: "Farbe", liquid_style: "Darstellung der Flüssigkeit",
    sensor_mode: "Sensorart", initial_fill: "Anfangsbestand",
    q_content: "Was wurde getankt:", q_mode: "Welcher Mess-Sensor wird verwendet:", q_sensor: "Wählen Sie Ihren {m} hier aus:", q_fill: "Anfangsbestand eingeben:", unit: "Einheit", decimals: "Nachkommastellen",
    show_max: "„Max:“ anzeigen", show_current: "„Aktuell:“ anzeigen", show_fill_level: "„Füllstand:“ anzeigen", show_consumption: "„Verbrauch:“ anzeigen",
    show_unittank: "Menge pro Tank anzeigen", show_title: "Titel anzeigen", show_tank_label: "Tank-Beschriftung anzeigen", tank_label: "Tank-Beschriftung", animation: "Welle", animation_interval: "Intervall der Welle (Sekunden)", bubbles: "Aufsteigende Blasen",
    bubble_amount: "Menge der Blasen", theme: "Theme", font_size: "Schriftgröße", card_height: "Kartenhöhe", tank_style: "Tankart", gas_tank: "Gas-Tank",
    i_gas: "Fügt der Kapsel Standfüße und eine Kuppel hinzu.", i_gas_on: "Verfügbar: Kapsel + Metall + Anzahl 1.",
    h_tank_label: "Name der Tanks, z. B. Wasserfass oder Gasflasche. Die Nummerierung kommt automatisch. Leer = Tank.",
    h_consumption_sensor: "Sensor für den Modus Verbrauchssensor. Tippen auf die Karte öffnet dessen Details.",
    h_level_sensor: "Sensor für beide Füllstandsmodi. Tippen auf die Karte öffnet dessen Details.",
    h_tank_capacity: "Angabe in der Mess-Einheit (siehe Inhalt).",
    h_initial_fill: "Gesamtmenge aller Tanks zum Start, leer = voll. Nach dem Zurücksetzen des Verbrauchssensors bitte aktualisieren.",
    h_initial_fill_l: "Gesamtmenge aller Tanks zum Start, leer = voll. Wird nur für die Anzeige „Verbrauch“ gebraucht.",
    h_u_auto: "Auto-Erkennung: {u}", h_u_man: "Manuell eingestellt: {u}",
    h_decimals: "0–5, leer = automatisch",
    h_animation_interval: "Zeit zwischen zwei Wellen (5–60 Sekunden).", h_bubble_amount: "1 = wenige Blasen, 8 = sehr viele Blasen.",
    h_font_size: "Schriftgröße in Prozent (50–200).",
    h_card_height: "250–1000 Pixel. In der Sections-Ansicht hat der Layout-Reiter Vorrang.",
    s_warn: "Füllstand-Meldung / Signalisierung", warn_1: "Warnstufe 1 (orange)", warn_1_level: "Stufe 1 unter (%)", warn_2: "Warnstufe 2 (rot)", warn_2_level: "Stufe 2 unter (%)", warn_notify: "Benachrichtigung senden", warn_mobile: "Mobile-App-Benachrichtigung senden", warn_glow: "Warnstufen signalisieren",
    h_warn_1_level: "Warnung, wenn der Füllstand unter diesen Wert fällt (Standard 20 %).", h_warn_2_level: "Warnung, wenn der Füllstand unter diesen Wert fällt (Standard 10 %).",
    h_warn_notify: "Erstellt in Home Assistant eine Benachrichtigung (Glocke in der Seitenleiste, auch auf dem Handy sichtbar), sobald eine Stufe erreicht wird.",
    h_warn_mobile: "Sendet die Meldung zusätzlich als Push-Nachricht an alle Geräte mit der Home-Assistant-Companion-App.",
    h_warn_glow: "Stufe 1: oranges Leuchten, Stufe 2: rotes Leuchten, mit einem ein- und ausblendenden Nebel hinter den Tanks.",
    warn_auto: "Benachrichtigungs-Automation erstellen", warn_repeat: "Alle", warn_repeat_unit: "Zeiteinheit",
    h_warn_time: "Uhrzeit", h_warn_repeat: "0 = keine Wiederholung.",
    a_suffix: "Benachrichtigung",
    a_desc: "Von der Tank Card angelegt. Einstellungen bitte im Karten-Editor ändern, manuelle Änderungen werden überschrieben.",
    a_note: "Legt in Home Assistant eine Automation an, nur per Button, nie automatisch. Beim Öffnen des Editors werden die Werte einer vorhandenen Automation in den Editor eingelesen. Änderungen gelten erst nach „Automation aktualisieren“, das Speichern der Karte ändert die Automation nicht. Karten mit demselben Sensor teilen sich eine Automation. Wird die Karte gelöscht oder der Sensor gewechselt, bleibt die Automation bestehen, bitte selbst löschen. Benachrichtigt im unten eingestellten Zeitabstand, solange der Füllstand unter der Schwelle bleibt. Bei „Tage“ zur eingestellten Uhrzeit, bei Stunden im festen Takt!",
    a_create: "Automation anlegen", a_update: "Automation aktualisieren", a_delete: "Automation löschen", a_confirm: "Automation löschen?",
    a_read: "Werte aus Automation einlesen", a_s_nov: "Diese Automation stammt aus einer älteren Version und enthält keine lesbaren Werte. Bitte einmal aktualisieren.", a_s_read: "Werte aus Automation „{n}“ eingelesen.",
    a_s_wait: "Automation wird geprüft …", a_s_none: "Automation noch nicht angelegt.", a_s_ok: "Automation „{n}“ ist aktuell.", a_s_old: "Automation „{n}“ weicht von den Editor-Werten ab. „Automation aktualisieren“ übernimmt sie, „Werte aus Automation einlesen“ verwirft deine Änderungen. Das Speichern der Karte ändert die Automation nicht.", a_s_err: "Status der Automation unbekannt: {e}",
    a_s_created: "Automation „{n}“ angelegt.", a_s_updated: "Automation „{n}“ aktualisiert.", a_s_deleted: "Automation „{n}“ gelöscht.", a_s_fail: "Speichern fehlgeschlagen: {e}",
    a_need_sensor: "Bitte zuerst einen Sensor wählen.", a_need_warn: "Bitte zuerst mindestens eine Warnstufe aktivieren.", a_need_channel: "Bitte „Benachrichtigung senden“ oder „Mobile-App-Benachrichtigung senden“ aktivieren.", a_need_phone: "Keine Mobile-App-Geräte gefunden.", a_admin: "Für die Automation sind Administratorrechte nötig.",
    n_title: "Tank-Warnung – Stufe {s}", n_channel: "Tank-Warnung", n_msg: "{t}: Warnstufe {s} – Füllstand unter {l} %. Aktuell {p} % ({c} von {m}).",
    o_consumption: "Verbrauchssensor", o_fill_level_l: "Füllstandssensor (kg, m³, L)", o_fill_level_percent: "Füllstandssensor (%)",
    o_heating_oil: "Heizöl", o_gas: "Gas", o_pellets: "Pellets", o_wood_chips: "Hackschnitzel", o_water: "Wasser", o_diesel: "Diesel",
    o_custom: "Benutzerdefiniert", o_classic: "Bisherige Darstellung", o_new: "Neue Darstellung",
    o_auto: "Automatisch erkennen", o_L: "Liter", o_gal: "Gallonen", o_kg: "Kilogramm", o_m3: "Kubikmeter", o_rect: "Quader", o_pool: "Zylinder", o_capsule: "Kapsel",
    o_glass: "Glastank", o_metal: "Metalltank",
    o_h: "Stunden", o_d: "Tage"
  }
};
const LIQUIDS = ["classic", "new"];
const MODES = ["consumption", "fill_level_l", "fill_level_percent"];
const REPEATS = ["h", "d"];
const REPEAT_MS = { h: 36e5, d: 864e5 };
const UNITS = ["auto", "L", "gal", "m3", "kg"];
const FORMS = ["rect", "pool", "capsule"];
const STYLES = ["metal", "glass"];
const CONTENTS = ["heating_oil", "gas", "pellets", "wood_chips", "water", "diesel", "custom"];
const ENUM = { tank_form: FORMS, tank_style: STYLES, content_type: CONTENTS, liquid_style: LIQUIDS, sensor_mode: MODES, warn_repeat_unit: REPEATS };
const COLORS = {
  heating_oil: ["#ff4d73", "#8a0018"], gas: ["#c4f6ff", "#00a8d6"], water: ["#27d3ff", "#0046d0"], diesel: ["#fff35a", "#e0a900"]
};
const CLASSIC = {
  heating_oil: "linear-gradient(to top,#ff2a55 0%,#d91445 32%,#a40024 68%,#8a0018 100%)",
  gas: "linear-gradient(to top,#c4f6ff 0%,#68e4fa 30%,#18c3e5 62%,#00a8d6 100%)",
  water: "linear-gradient(to top,#00c8ff 0%,#00aee8 28%,#007bd0 62%,#0046d0 100%)",
  diesel: "linear-gradient(to top,#fff35a 0%,#ffd928 30%,#f5c400 62%,#e0a900 100%)"
};
const GLOWS = {
  heating_oil: "rgba(255,40,80,.75)", gas: "rgba(0,200,255,.75)", water: "rgba(0,190,255,.75)", diesel: "rgba(255,205,45,.75)"
};
const INFO = [
  { id: "max", flag: "show_max", k: "u_max" }, { id: "fill", flag: "show_fill_level", k: "u_fill" },
  { id: "level", flag: "show_current", k: "u_level" }, { id: "cons", flag: "show_consumption", k: "u_cons" }
];
const DEF = {
  title: "Tank Card", tank_form: "rect", tank_style: "metal", gas_tank: false, tank_count: 3, tank_capacity: 1500, content_type: "heating_oil", custom_color: [33, 150, 243], liquid_style: "classic", sensor_mode: "consumption", unit: "auto",
  show_max: true, show_current: true, show_fill_level: true, show_consumption: true, show_unittank: true, show_title: true, show_tank_label: true, tank_label: "Tank",
  animation: false, animation_interval: 30, bubbles: false, bubble_amount: 3, font_size: 100, card_height: 350,
  warn_1: false, warn_1_level: 20, warn_2: false, warn_2_level: 10, warn_notify: true, warn_mobile: false, warn_glow: false, warn_auto: false, warn_repeat: 1, warn_repeat_unit: "d", warn_time: "14:00:00"
};
const WARN_HYST = .5;
const gasOk = (c) => { const x = { ...DEF, ...c }; return x.tank_style === "metal" && x.tank_form === "capsule" && Number(x.tank_count) === 1; };
const warnOn = (c) => c.warn_1 === true || c.warn_2 === true;
const autoOn = (c) => c.warn_auto === true && warnOn(c);
const BALL = { size: .17, shift: -.2 };
const PILE = { pellets: 6.7, wood_chips: 9 };
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const num = (v, d, min = -Infinity, max = Infinity) => {
  if (v === "" || v == null) return d;
  const n = Number(v);
  return Number.isFinite(n) ? clamp(n, min, max) : d;
};
const BLANK = (v) => v == null || v === "" || (typeof v === "number" && Number.isNaN(v));
const totalOf = (n, c) => Math.round(n * c * 100) / 100;
const lang = (h) => String(h?.locale?.language || document.documentElement.lang || "en").toLowerCase().startsWith("de") ? "de" : "en";
const tr = (l, k) => TXT[l][k] ?? TXT.en[k] ?? k;
const tpl = (s, v) => s.replace(/\{(\w)\}/g, (m, k) => (k in v ? v[k] : m));
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
};
const UL = (u) => (u === "m3" ? "m³" : u);
const sensorUnit = (h, id) => { const r = String(h?.states?.[id]?.attributes?.unit_of_measurement ?? "").trim(); return r && r !== "%" ? r : ""; };
const sysUnit = (h) => (h?.config?.unit_system?.volume === "gal" ? "gal" : "L");
const NF = {};
const fmt = (v, u, lg, d) => {
  d ??= /^(m[3³]|t)$/.test(u) ? 2 : 0;
  const k = lg + d;
  return (NF[k] ??= new Intl.NumberFormat(lg === "de" ? "de-DE" : "en-US", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: lg !== "de" })).format(v) + " " + UL(u);
};
const rgbOf = (v) => Array.isArray(v) && v.length >= 3 ? v.slice(0, 3).map((n) => clamp(Math.round(Number(n)) || 0, 0, 255)) : DEF.custom_color;
const shade = (rgb, f) => "#" + rgb.map((c) => Math.round(f >= 0 ? c + (255 - c) * f : c * (1 + f)).toString(16).padStart(2, "0")).join("");
const customPal = (v) => { const c = rgbOf(v); return [shade(c, .3), shade(c, -.45)]; };
const customClassic = (v) => { const c = rgbOf(v); return `linear-gradient(to top,${shade(c, .25)} 0%,${shade(c, 0)} 32%,${shade(c, -.25)} 68%,${shade(c, -.45)} 100%)`; };
const solid = (() => {
  const SZ = { pellets: 160, wood_chips: 120 }, cache = {};
  const prng = (a) => () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const f1 = (n) => +n.toFixed(1);
  const pick = (r, w) => { let s = 0; for (let i = 0; i < w.length; i++) { s += w[i]; if (r < s) return i; } return w.length - 1; };
  const grad = (id, st) => `<linearGradient id='${id}' x1='0' y1='0' x2='0' y2='1'>${st.map((c, i) => `<stop offset='${st.length === 2 ? i : [0, .26, .62, 1][i]}' stop-color='${c}'/>`).join("")}</linearGradient>`;
  const NOISE = "<filter id='n' x='0' y='0' width='1' height='1' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .08 0 0 0 0 .04 0 0 0 0 .01 0 0 0 .9 -.35'/></filter>";
  const scatter = (rnd, T, base, cells, ext, use) => {
    const rect = (f, o) => `<rect width='${T}' height='${T}' fill='${f}'${o ? ` opacity='${o}'` : ""}/>`;
    const layer = () => {
      const items = [], c = T / cells, wr = (v) => (v % T + T) % T;
      for (let i = 0; i < cells; i++) for (let j = 0; j < cells; j++) items.push([wr((i + .5 + (rnd() - .5) * 1.9) * c), wr((j + .5 + (rnd() - .5) * 1.9) * c), rnd(), rnd(), rnd()]);
      for (let k = 0; k < cells * cells * .1; k++) items.push([rnd() * T, rnd() * T, rnd(), rnd(), rnd()]);
      for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; }
      let out = "";
      for (const [x0, y0, r1, r2, r3] of items) {
        let a = r3 * 180 - 90;
        if (.89 * Math.cos(a * Math.PI / 180) - .45 * Math.sin(a * Math.PI / 180) < 0) a += 180;
        for (const dx of [-T, 0, T]) for (const dy of [-T, 0, T]) {
          const x = Math.round(x0 + dx), y = Math.round(y0 + dy);
          if (x > -ext && x < T + ext && y > -ext && y < T + ext) out += use(x, y, Math.round(a), r1, r2);
        }
      }
      return out;
    };
    return rect(base) + layer() + rect("#120802", .38) + layer() + `<rect width='${T}' height='${T}' filter='url(#n)' opacity='.45'/>`;
  };
  const pellets = () => {
    const rnd = prng(11), D = 6.6, h = D / 2, LEN = [7, 10, 14, 18, 23, 28];
    let defs = NOISE + [["#5a3a1c", "#d0a46c", "#a97b44", "#4a2c13"], ["#6a4624", "#dcb67c", "#b88a52", "#59391b"], ["#4a2d14", "#b98650", "#8c5d30", "#3a2110"], ["#35200e", "#80532a", "#5a3519", "#241207"]].map((s, i) => grad("p" + i, s)).join("");
    LEN.forEach((L, k) => {
      const end = (x) => `<rect x='${f1(x)}' y='${f1(-h + 1.3)}' width='1.3' height='${f1(D - 2.6)}' rx='.4' fill='#e6c08c' opacity='.55'/>`;
      defs += `<g id='s${k}'><rect x='${f1(-L / 2 - .3)}' y='${f1(-h + .9)}' width='${L + .6}' height='${D}' rx='2' fill='#000' fill-opacity='.28'/><rect x='${-L / 2}' y='${-h}' width='${L}' height='${D}' rx='1.5'/>${end(-L / 2 + .1)}${end(L / 2 - 1.4)}`
        + `<path d='M${f1(-L * .12)} ${f1(-h + .6)}l.5 ${f1(D - 1.2)}M${f1(L * .22)} ${f1(-h + .7)}l-.4 ${f1(D - 1.4)}' stroke='#241206' stroke-opacity='.38' stroke-width='.3' fill='none'/>`
        + `<path d='M${f1(-L / 2 + 2)} ${f1(-h + 1.5)}H${f1(L / 2 - 2)}' stroke='#fff0d0' stroke-opacity='.32' stroke-width='.55' stroke-linecap='round' fill='none'/></g>`;
    });
    return `<defs>${defs}</defs>` + scatter(rnd, SZ.pellets, "#3a2210", 13, 18, (x, y, a, r1, r2) => `<use href='#s${pick(r1, [.1, .17, .3, .22, .13, .08])}' transform='translate(${x} ${y})rotate(${a})scale(${f1(.88 + ((r1 * 97) % 1) * .24)})' fill='url(#p${pick(r2, [.35, .25, .3, .1])})' opacity='${(.86 + ((r2 * 53) % 1) * .14).toFixed(2)}'/>`);
  };
  const chips = () => {
    const rnd = prng(23), pt = (p) => p.map(f1).join(",");
    let defs = NOISE + [["#ecd5a0", "#c09a5e"], ["#dcb877", "#ae8546"], ["#cb9c58", "#966a33"], ["#a8763e", "#744a1f"], ["#f2e3b8", "#d2b476"], ["#c0834a", "#8a5226"]].map((s, i) => grad("c" + i, s)).join("");
    for (let k = 0; k < 12; k++) {
      const L = 11 + rnd() * 13, W = 4 + rnd() * 4.5, j = (v) => (rnd() - .5) * v, n = 3 + Math.floor(rnd() * 3);
      const P = [[-L / 2 + j(L * .1), -W / 2 + j(W * .25)], [-L * .05 + j(L * .2), -W / 2 + j(W * .2)], [L / 2 + j(L * .06), -W / 2 * (.3 + rnd() * .7)],
        [L / 2 - rnd() * L * .08, W / 2 + j(W * .2)], [L * .1 + j(L * .2), W / 2 + j(W * .2)], [-L / 2 + rnd() * L * .08, W / 2 * (.2 + rnd() * .8)]];
      let g = "";
      for (let i = 0; i < n; i++) {
        const y = (i - (n - 1) / 2) * W * .22 + j(W * .06), x1 = -L * .38 + j(L * .1), x2 = L * .38 + j(L * .1);
        g += `M${f1(x1)} ${f1(y)}Q${f1((x1 + x2) / 2)} ${f1(y + j(W * .25))} ${f1(x2)} ${f1(y + j(W * .1))}`;
      }
      defs += `<polygon id='w${k}' points='${P.map(pt).join(" ")}'/><g id='g${k}'><use href='#w${k}' y='1.2' fill='#000' fill-opacity='.3' stroke='#000' stroke-opacity='.18' stroke-width='1.2'/>`
        + `<use href='#w${k}' stroke='#33200c' stroke-opacity='.5' stroke-width='.35'/><path d='${g}' stroke='#3a2208' stroke-opacity='.3' stroke-width='.3' fill='none'/>`
        + (rnd() < .3 ? `<polyline points='${P.slice(0, 4).map(pt).join(" ")}' stroke='#4a3320' stroke-opacity='.8' stroke-width='1.1' stroke-linejoin='round' stroke-linecap='round' fill='none'/>` : "") + `</g>`;
    }
    return `<defs>${defs}</defs>` + scatter(rnd, SZ.wood_chips, "#4a3018", 9, 18, (x, y, a, r1, r2) => {
      const z = f1(.85 + ((r2 * 7) % 1) * .4), m = (r1 * 12) % 1 < .5 ? -z : z;
      return `<use href='#g${Math.floor(r1 * 11.99)}' transform='translate(${x} ${y})rotate(${a})scale(${f1(m)} ${z})' fill='url(#c${pick(r2, [.24, .24, .2, .1, .12, .1])})'/>`;
    });
  };
  const BLOTCH = [[24, 62, 45, 55, "0,0,0,.24"], [72, 34, 40, 50, "255,230,190,.12"], [90, 78, 32, 42, "0,0,0,.2"], [48, 18, 30, 38, "255,230,190,.1"], [8, 22, 28, 36, "0,0,0,.16"]]
    .map(([x, y, w, h, c]) => `radial-gradient(ellipse ${w}% ${h}% at ${x}% ${y}%,rgba(${c}),rgba(${c.split(",").slice(0, 3)},0) 72%)`).join(",");
  return (kind) => {
    if (!PILE[kind]) return null;
    if (!cache[kind]) {
      const T = SZ[kind], svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${T} ${T}'>${kind === "pellets" ? pellets() : chips()}</svg>`;
      cache[kind] = `${BLOTCH},url("data:image/svg+xml,${svg.replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E")}") 0 100%/${PILE[kind]}em ${PILE[kind]}em repeat`;
    }
    return cache[kind];
  };
})();
const AUTO_NAME = "Tank-Card";
const stable = (v) => JSON.stringify(v, (k, x) => (x && typeof x === "object" && !Array.isArray(x) ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) : x));
const autoConfig = (c, h) => {
  const x = { ...DEF, ...c }, lg = lang(h);
  const n = Math.round(num(x.tank_count, DEF.tank_count, 1, 20)), total = totalOf(n, num(x.tank_capacity, DEF.tank_capacity, .01));
  const mode = ENUM.sensor_mode.includes(x.sensor_mode) ? x.sensor_mode : DEF.sensor_mode;
  const sid = String((mode === "consumption" ? x.consumption_sensor : x.level_sensor) || "").trim();
  const fill = Math.min(num(x.initial_fill, total, 0), total);
  const wl = (k) => ({ on: x["warn_" + k] === true, lvl: num(x["warn_" + k + "_level"], DEF["warn_" + k + "_level"], 1, 99) });
  const w1 = wl(1), w2 = wl(2);
  if (w1.on && w2.on) w2.lvl = Math.min(w2.lvl, w1.lvl - 1);
  const notify = x.warn_notify !== false, mobile = x.warn_mobile === true;
  const unit = ENUM.warn_repeat_unit.includes(x.warn_repeat_unit) ? x.warn_repeat_unit : DEF.warn_repeat_unit;
  const cnt = Math.round(num(x.warn_repeat, DEF.warn_repeat, 0, 100));
  const rep = cnt * REPEAT_MS[unit] / 1000, tol = { h: 1800, d: 43200 }[unit];
  const tm = /^(\d{1,2}):(\d{2})/.exec(String(x.warn_time || "")) || /^(\d{1,2}):(\d{2})/.exec(DEF.warn_time);
  const at = `${tm[1].padStart(2, "0")}:${tm[2]}:00`;
  const title = typeof x.title === "string" ? x.title.trim() : "";
  const name = (title || AUTO_NAME) + " " + tr(lg, "a_suffix");
  const man = typeof x.unit === "string" && x.unit.trim() && x.unit.trim() !== DEF.unit ? x.unit.trim() : "";
  const uraw = man || sensorUnit(h, sid) || sysUnit(h);
  const dec = BLANK(x.decimals) ? (/^(m[3³]|t)$/.test(uraw) ? 2 : 0) : Math.round(num(x.decimals, 0, 0, 5));
  const phones = mobile ? Object.keys(h?.services?.notify || {}).filter((k) => k.startsWith("mobile_app_")) : [];
  // Machine-readable settings, stored at the top of the automation so the editor can read them back
  const vars = { tc_w1: w1.on, tc_w1_level: w1.lvl, tc_w2: w2.on, tc_w2_level: w2.lvl, tc_notify: notify, tc_mobile: mobile, tc_time: at, tc_repeat: cnt, tc_unit: unit };
  const id = "tank_card_" + sid.replace(/\W+/g, "_"), res = { id, name, config: null, problem: "", note: "", vars };
  if (!/^[a-z0-9_]+\.[a-z0-9_]+$/.test(sid)) res.problem = "a_need_sensor";
  else if (!w1.on && !w2.on) res.problem = "a_need_warn";
  else if (!notify && !mobile) res.problem = "a_need_channel";
  else if (!notify && !phones.length) res.problem = "a_need_phone";
  else if (mobile && !phones.length) res.note = "a_need_phone";
  if (res.problem) return res;
  const S = `states('${sid}')`, raw = `${S} | float(0)`, OK = `${S} | is_number`;
  const P = mode === "consumption" ? `([[${fill} - ([${raw}, 0] | max), 0] | max, ${total}] | min) / ${total} * 100`
    : mode === "fill_level_l" ? `([[${raw}, 0] | max, ${total}] | min) / ${total} * 100`
    : `[[${raw}, 0] | max, 100] | min`;
  const ST = (w2.on ? `2 if p < ${w2.lvl} else ` : "") + (w1.on ? `1 if p < ${w1.lvl} else ` : "") + "0";
  const SET = `{% set p = ${P} %}{% set st = ${ST} %}`;
  const r4 = (v) => Math.round(v * 1e4) / 1e4, pc = total / 100;
  const thr = (lv) => r4(mode === "consumption" ? Math.max(fill - lv * pc, 0) : mode === "fill_level_l" ? lv * pc : lv);
  const triggers = [];
  for (const [tid, w] of [["s1", w1], ["s2", w2]]) if (w.on) triggers.push({ trigger: "numeric_state", id: tid, entity_id: sid, [mode === "consumption" ? "above" : "below"]: thr(w.lvl) });
  triggers.push({ trigger: "numeric_state", id: "ok", entity_id: sid, [mode === "consumption" ? "below" : "above"]: thr(w1.on ? w1.lvl : w2.lvl) });
  if (rep) triggers.push(unit === "d" ? { trigger: "time", id: "rep", at }
    : { trigger: "time_pattern", id: "rep", ...([1, 2, 3, 4, 6, 8, 12].includes(cnt) ? { hours: `/${cnt}` } : {}), minutes: 0 });
  const cl = ["trigger.id == 'ok' and st == 0"];
  if (w1.on) cl.push("trigger.id == 's1' and st == 1");
  if (w2.on) cl.push("trigger.id == 's2' and st == 2");
  if (rep) cl.push(`trigger.id == 'rep' and st > 0 and (as_timestamp(now()) - as_timestamp(this.attributes.last_triggered, 0)) >= ${Math.max(rep - tol, 0)}`);
  const conditions = [{ condition: "template", value_template: `${SET}{{ ${OK} and (${cl.map((q) => `(${q})`).join(" or ")}) }}` }];
  const pre = id + "_s", u = UL(uraw), clean = (q) => q.replace(/[{}]/g, "");
  const rd = dec === 0 ? "round(0) | int" : `round(${dec})` + (lg === "de" ? " | string | replace('.', ',')" : "");
  const lvl = w1.on && w2.on ? `${w2.lvl} if st == 2 else ${w1.lvl}` : String(w2.on ? w2.lvl : w1.lvl);
  const msgTitle = tpl(tr(lg, "n_title"), { s: "{{ st }}" });
  const message = tpl(tr(lg, "n_msg"), { t: clean(title || AUTO_NAME), s: "{{ st }}", l: "{{ lvl }}", p: "{{ p | round(0) | int }}", c: `{{ cur }} ${u}`, m: fmt(total, uraw, lg, dec) });
  const path = (typeof location !== "undefined" && location.pathname) || "", url = path && !path.startsWith("/config") ? path : "";
  const push = { title: msgTitle, message, data: { tag: `{{ '${pre}' ~ st }}`, channel: tr(lg, "n_channel"), ttl: 0, priority: "high", ...(url && { url, clickAction: url }) } };
  const seq = [{ variables: { p: `{{ ${P} }}`, st: `{{ ${ST} }}`, lvl: `{{ ${lvl} }}`, cur: `{{ (p / 100 * ${total}) | ${rd} }}` } }];
  if (notify) {
    seq.push({ action: "persistent_notification.dismiss", continue_on_error: true, data: { notification_id: `{{ '${pre}' ~ (3 - st) }}` } });
    seq.push({ action: "persistent_notification.create", data: { title: msgTitle, message, notification_id: `{{ '${pre}' ~ st }}` } });
  }
  phones.forEach((ph) => seq.push({ action: "notify." + ph, continue_on_error: true, data: push }));
  const clr = [];
  if (notify) [1, 2].forEach((k) => clr.push({ action: "persistent_notification.dismiss", continue_on_error: true, data: { notification_id: pre + k } }));
  phones.forEach((ph) => [1, 2].forEach((k) => clr.push({ action: "notify." + ph, continue_on_error: true, data: { message: "clear_notification", data: { tag: pre + k } } })));
  res.config = {
    alias: name, description: tr(lg, "a_desc"), variables: vars, mode: "queued", max: 5, triggers, conditions,
    actions: [{ choose: [{ conditions: [{ condition: "trigger", id: "ok" }], sequence: clr }], default: seq }]
  };
  return res;
};
// Turns the stored automation variables back into editor settings
const fromVars = (v) => ({
  warn_1: v.tc_w1 === true, warn_1_level: num(v.tc_w1_level, DEF.warn_1_level, 1, 99),
  warn_2: v.tc_w2 === true, warn_2_level: num(v.tc_w2_level, DEF.warn_2_level, 1, 99),
  warn_notify: v.tc_notify !== false, warn_mobile: v.tc_mobile === true,
  warn_time: typeof v.tc_time === "string" && v.tc_time ? v.tc_time : DEF.warn_time,
  warn_repeat: Math.round(num(v.tc_repeat, DEF.warn_repeat, 0, 100)),
  warn_repeat_unit: ENUM.warn_repeat_unit.includes(v.tc_unit) ? v.tc_unit : DEF.warn_repeat_unit,
  warn_auto: true
});
const CSS = `
:host{display:block;height:100%;min-height:240px;container-type:inline-size}
ha-card{height:100%;display:flex;flex-direction:column;gap:10px;padding:10px;box-sizing:border-box;overflow:hidden;container-type:inline-size;font-size:var(--fs,100%);color:var(--primary-text-color);background:radial-gradient(120% 70% at 50% 0,color-mix(in srgb,var(--card-background-color,#1c1c1c) 90%,#fff),var(--card-background-color,#1c1c1c))}
ha-card[tabindex]:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px}
.rect{--rad:0 0 6px 6px;--h:14px;--o:var(--sh)}
.pool{--rad:50%/calc(var(--h)/2);--h:24px;--o:calc(var(--sh)/2)}
.capsule{--rad:999px;--h:22px;--o:calc(var(--sh)/2);--bl:radial-gradient(circle var(--br,10px) at var(--bx,20px) var(--by,12px),rgba(255,255,255,.55),rgba(255,255,255,.32) 30%,rgba(255,255,255,.12) 62%,transparent 100%)}
.glass{--sh:var(--h);--wi:0;--wrad:var(--rad);--k:calc(var(--o)*-1);--ov:0}
.glass.rect{--rad:0 0 3px 3px}
.metal{--sh:calc(var(--h)*.82);--k:calc(var(--sh) - var(--o));--ov:.08;--b:clamp(2px,1.8cqw,4px)}
.metal.rect,.metal.pool{--wi:calc(var(--h) + 2.2em) 9% 7%}
.metal.rect{--wrad:4px}
.metal.pool{--wrad:50%/calc(var(--sh)/2)}
.metal.capsule{--wi:clamp(8px,min(14cqw,14cqh),30px);--wrad:999px;--b:clamp(1.5px,1.1cqw,3px)}
.capsule .v{container-type:size}
.title{text-align:center;font-size:1.6em;font-weight:500}
.info{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4em .8em}
@container (min-width:56em){.info{grid-template-columns:repeat(var(--cols,4),minmax(0,1fr))}}
.chip{display:flex;justify-content:space-between;gap:.5em;padding:.35em .8em;border-radius:.9em;font-weight:600;white-space:nowrap;container-type:inline-size;background:linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,.03));box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 2px 6px rgba(0,0,0,.25)}
.chip span{font-size:clamp(.5em,calc((100cqw - .5em)/(var(--chars,16)*.6)),1em)}
.chip span:first-child{opacity:.7;font-weight:500;flex:none}
.tanks{position:relative;flex:1;display:flex;column-gap:clamp(3px,calc(8% / var(--n,3)),24px);min-height:150px;padding:0 1%}
.t{position:relative;z-index:1;isolation:isolate;flex:1;min-width:0;display:flex;flex-direction:column;padding-bottom:16px;container-type:inline-size}
.t::after{content:"";position:absolute;z-index:-1;left:-6%;right:-6%;bottom:0;height:24px;background:radial-gradient(ellipse at 50% 40%,rgba(0,0,0,.55),transparent 70%);filter:blur(2px)}
.n{text-align:center;font-weight:500;line-height:1.2;font-size:max(.3em,min(1.1em,calc(72cqw/(var(--lc,8)*.62))));margin-bottom:.3em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.v{position:relative;z-index:1;flex:1;min-height:100px;overflow:hidden;border-radius:var(--rad);background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.03) 28%,rgba(255,255,255,.03) 70%,rgba(0,0,0,.25)),rgba(120,130,140,.18);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.35),inset 0 -14px 22px rgba(0,0,0,.4),inset 0 10px 18px rgba(255,255,255,.1)}
.rect .v{clip-path:polygon(7% 0,93% 0,100% var(--h),100% 100%,0 100%,0 var(--h))}
.v::before{content:"";position:absolute;z-index:6;left:0;right:0;top:0;height:var(--h);pointer-events:none;border-radius:50%;background:radial-gradient(ellipse at 32% 35%,rgba(255,255,255,.65),rgba(255,255,255,.12) 62%,rgba(255,255,255,.22));box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.7)}
.rect .v::before{border-radius:0;clip-path:polygon(7% 0,93% 0,100% 100%,0 100%);background:linear-gradient(180deg,rgba(255,255,255,.18),rgba(255,255,255,.6));box-shadow:none}
.v::after{content:"";position:absolute;inset:0;z-index:7;pointer-events:none;border-radius:inherit;background:linear-gradient(90deg,transparent 6%,rgba(255,255,255,.55) 10%,rgba(255,255,255,.08) 17%,transparent 24%,transparent 84%,rgba(255,255,255,.3) 91%,transparent 95%)}
.capsule .v::before,.capsule .v::after,.metal .v::after{display:none}
.w{position:absolute;inset:var(--wi);border-radius:var(--wrad);overflow:hidden}
.l{position:absolute;z-index:2;left:0;right:0;bottom:0;height:calc((100% + var(--k))*var(--p));transition:height .6s ease;background:linear-gradient(90deg,rgba(0,0,0,.5),rgba(255,255,255,.28) 22%,transparent 48%,rgba(0,0,0,.35)),var(--f)}
.l::before{content:"";position:absolute;left:calc(var(--ov)*-100%);right:calc(var(--ov)*-100%);top:calc(var(--o)*-1);height:var(--sh);border-radius:50%;filter:brightness(1.35);background:linear-gradient(100deg,transparent 38%,rgba(255,255,255,.55) 50%,transparent 62%) 100% 0/250% 100% no-repeat,var(--f);box-shadow:inset 0 2px 4px rgba(255,255,255,.8),0 0 10px var(--g)}
.rect .l::before{border-radius:0;clip-path:polygon(calc((.07 + var(--ov))/(1 + 2*var(--ov))*100%) 0,calc(100% - (.07 + var(--ov))/(1 + 2*var(--ov))*100%) 0,100% 100%,0 100%);box-shadow:none}
.e .l::before{display:none}
.bright .l{background:var(--f);box-shadow:inset 0 -.9em 1.1em -.5em var(--g),inset 0 -.2em .6em rgba(255,255,255,.3)}
.val{position:absolute;z-index:8;left:0;right:0;bottom:.7em;text-align:center;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none;font-size:min(clamp(.4em,calc(22cqw - .35em),1.15em),calc(60cqw/(var(--vc,6)*.62)));text-shadow:0 1px 3px #000,0 0 6px rgba(0,0,0,.8)}
.metal .v{background:linear-gradient(90deg,rgba(0,0,0,.4),rgba(255,255,255,.45) 10%,rgba(255,255,255,.14) 40%,rgba(0,0,0,.12) 82%,rgba(0,0,0,.45)),#9ba4ac;box-shadow:inset 0 3px 6px rgba(255,255,255,.7),inset 0 -10px 14px rgba(0,0,0,.45)}
.metal .v::before{box-shadow:inset 0 0 0 1px rgba(0,0,0,.4),inset 0 2px 2px rgba(255,255,255,.7);background:linear-gradient(90deg,rgba(0,0,0,.4),rgba(255,255,255,.4) 12%,rgba(255,255,255,.14) 45%,rgba(0,0,0,.1) 85%,rgba(0,0,0,.42)),linear-gradient(180deg,rgba(0,0,0,.22),rgba(255,255,255,.3) 60%,rgba(255,255,255,.7)),#bcc4cb}
.metal.rect .v::before{box-shadow:inset 0 2px 2px rgba(0,0,0,.3),inset 0 -2px 2px rgba(255,255,255,.8)}
.metal.rect .n,.metal.pool .n{position:absolute;z-index:9;left:8%;right:8%;top:calc(var(--h) + 16px - .6em);margin:0;color:#232a31;text-shadow:0 1px 0 rgba(255,255,255,.6)}
.metal .w{border:solid transparent;border-width:var(--b);background:linear-gradient(90deg,rgba(0,0,0,.38),rgba(0,0,0,.04) 18%,rgba(0,0,0,.04) 75%,rgba(0,0,0,.45)) padding-box,radial-gradient(circle at 40% 30%,#f8f8f8,#e4e4e4 70%,#b8b8b8) padding-box,linear-gradient(145deg,rgba(0,0,0,.3),rgba(0,0,0,.1) 30%,rgba(255,255,255,.22) 55%,rgba(255,255,255,.55)) border-box;box-shadow:inset 3px 4px 8px rgba(0,0,0,.45),inset 0 -8px 12px rgba(0,0,0,.8),inset -1px -1px 2px rgba(255,255,255,.3),0 0 0 1px rgba(0,0,0,.3),-1px -1px 2px rgba(0,0,0,.35),1px 2px 2px rgba(255,255,255,.55)}
.metal .w::after,.capsule .w::after{content:"";position:absolute;inset:0;z-index:7;pointer-events:none;border-radius:inherit}
.metal .w::after{background:linear-gradient(90deg,transparent 4%,rgba(255,255,255,.5) 9%,rgba(255,255,255,.08) 16%,transparent 24%,transparent 85%,rgba(255,255,255,.22) 92%,transparent 96%),linear-gradient(180deg,rgba(255,255,255,.22),transparent 25%)}
.glass.capsule .v{background:rgba(120,130,140,.18)}
.gl{position:absolute;z-index:7;pointer-events:none;border-radius:999px}
.g1{left:var(--g1x,0);top:var(--g1y,0);width:var(--g1w,0);height:var(--g1h,0);background:linear-gradient(var(--ga,90deg),transparent,rgba(255,255,255,.7) 22%,rgba(255,255,255,.5) 62%,transparent);filter:blur(var(--gb,1px))}
.g2{left:var(--g2x,0);top:var(--g2y,0);width:var(--g2w,0);height:var(--g2h,0);background:linear-gradient(var(--ga,90deg),transparent,rgba(255,255,255,.28) 25%,rgba(255,255,255,.2) 70%,transparent);filter:blur(var(--gb2,1px))}
.capsule .w::after{background:var(--bl),linear-gradient(180deg,rgba(0,0,0,.3),transparent 28%,transparent 62%,rgba(0,0,0,.4)),linear-gradient(90deg,rgba(0,0,0,.3),transparent 14%,transparent 86%,rgba(0,0,0,.35))}
.metal.capsule .w{border-width:var(--b) calc(var(--b) + 3px);background:radial-gradient(circle at 40% 30%,#f8f8f8,#e4e4e4 70%,#b8b8b8) padding-box,linear-gradient(180deg,#fdfdfd,#d5d9dc 30%,#80878d 65%,#e9ebed) border-box;box-shadow:inset 0 4px 8px rgba(0,0,0,.4),inset 0 -8px 12px rgba(0,0,0,.7),0 0 0 1px rgba(0,0,0,.3),0 -1px 1px rgba(255,255,255,.6)}
@container (max-aspect-ratio:1/1){.capsule .w::after{background:var(--bl),linear-gradient(90deg,rgba(0,0,0,.3),transparent 28%,transparent 62%,rgba(0,0,0,.4)),linear-gradient(180deg,rgba(0,0,0,.3),transparent 14%,transparent 86%,rgba(0,0,0,.35))}.metal.capsule .w{border-width:calc(var(--b) + 3px) var(--b);background:radial-gradient(circle at 40% 30%,#f8f8f8,#e4e4e4 70%,#b8b8b8) padding-box,linear-gradient(90deg,#fdfdfd,#d5d9dc 30%,#80878d 65%,#e9ebed) border-box;box-shadow:inset 4px 0 8px rgba(0,0,0,.4),inset -8px 0 12px rgba(0,0,0,.7),0 0 0 1px rgba(0,0,0,.3),-1px 0 1px rgba(255,255,255,.6)}}
.solid{--lid:1.9;--body:1.25;--edge:.3;--top:.5;--mid:.18;--bot:.1;--pg:rgba(255,205,150,.32)}
.solid .l{filter:brightness(var(--body));background:linear-gradient(to top,rgba(255,228,190,var(--bot)) 0%,rgba(255,228,190,0) 40%,rgba(0,0,0,var(--mid)) 70%,rgba(0,0,0,var(--top)) 100%),var(--f);box-shadow:inset 0 -.9em 1.1em -.5em var(--pg),inset 0 -.2em .6em rgba(255,255,255,.3)}
.solid .l::before{z-index:1;filter:brightness(calc(var(--lid)/var(--body)));background:radial-gradient(ellipse 70% 120% at 35% 20%,rgba(255,244,220,.3),transparent 70%),var(--f);box-shadow:inset 0 -1px 0 rgba(160,115,70,.7),0 4px 5px -2px rgba(0,0,0,var(--edge))}
.dome{position:relative;z-index:2;align-self:flex-start;left:35%;transform:translateX(-50%);width:clamp(50px,calc(50px + (100cqw - 200px)*.025),72px);height:clamp(11px,calc(max(16px,6cqw) - max(0px,110px - 100cqw)*.15),24px);margin:0 0 -4px;box-sizing:border-box;border:1px solid rgba(55,55,55,.8);border-radius:50% 50% 6px 6px/100% 100% 30% 30%;background:radial-gradient(ellipse at 50% 18%,rgba(255,255,255,.95),rgba(255,255,255,.5) 18%,rgba(255,255,255,0) 42%),linear-gradient(180deg,#eee,#cfcfcf 25%,#9a9a9a 55%,#dcdcdc 75%,#666);box-shadow:inset 0 2px 2px rgba(255,255,255,.9),inset 0 -6px 7px rgba(0,0,0,.45),0 3px 5px rgba(0,0,0,.5)}
.feet{position:relative;z-index:0;display:flex;justify-content:space-between;height:16px;margin-top:-6px;padding:0 20%}
.feet i{width:clamp(18px,18cqw,34px);clip-path:polygon(12% 0,88% 0,100% 100%,0 100%);background:linear-gradient(90deg,#444,#888 20%,#d8d8d8 50%,#f2f2f2 68%,#777 88%,#3f3f3f)}
.warn1{--wc:255,152,0}
.warn2{--wc:255,40,40}
.tanks::before{content:"";position:absolute;z-index:0;inset:-12% -5%;pointer-events:none;border-radius:50%;opacity:0;background:radial-gradient(ellipse 60% 62% at 50% 55%,rgba(var(--wc,255,40,40),.55),transparent 72%);filter:blur(12px)}
.warn1 .tanks::before,.warn2 .tanks::before{animation:wfog 3.4s ease-in-out infinite}
.warn1 .t,.warn2 .t{animation:wglow 3.4s ease-in-out infinite}
.warn2 .tanks::before,.warn2 .t{animation-duration:2.2s}
@keyframes wfog{0%,100%{opacity:0}50%{opacity:1}}
@keyframes wglow{0%,100%{filter:drop-shadow(0 0 0 rgba(var(--wc),0))}50%{filter:drop-shadow(0 0 .7em rgba(var(--wc),.9))}}
@media(prefers-reduced-motion:reduce){.l::before,.bub span,.tanks::before,.t{animation:none!important}.warn1 .tanks::before,.warn2 .tanks::before{opacity:.6}}`;
const BUBBLE_CSS = `
.bub{position:absolute;inset:0;overflow:hidden;container-type:size;pointer-events:none}
.bub span{position:absolute;left:var(--x);bottom:calc(-1*var(--s));width:var(--s);height:var(--s);border-radius:50%;opacity:0;animation:b var(--t) linear var(--d) infinite;
  background:radial-gradient(circle at 32% 28%,#fff,rgba(255,255,255,.3) 45%,rgba(255,255,255,.12));box-shadow:inset 0 0 0 1px rgba(255,255,255,.6)}
@keyframes b{0%{transform:translate(0,0);opacity:0}10%,90%{opacity:.85}100%{transform:translate(var(--w),calc(-100cqh - 1em));opacity:0}}
.e .bub{display:none}`;
const BUBBLE_COUNT = [[4, 1], [6, 2], [9, 3], [13, 5], [18, 7], [24, 10], [32, 14], [40, 16]];
const waveCss = (s) => `
@keyframes w{0%{background-position:100% 0}${Math.min(3.2 / s * 100, 40).toFixed(2)}%{background-position:0 0}100%{background-position:0 0}}
.anim .l::before{animation:w ${s}s linear var(--wd) infinite}`;
class TankCard extends HTMLElement {
  constructor() {
    super();
    this._hass = this._o = this._els = this._last = this._ro = this._u = this._key = this._th = this._dk = null;
    this._tv = [];
    this._st = 0;
    this.attachShadow({ mode: "open" });
  }
  static getConfigElement() { return document.createElement("tank-card-editor"); }
  static getStubConfig() {
    return { ...DEF, initial_fill: 2250, consumption_sensor: "", level_sensor: "", theme: "" };
  }
  getCardSize() { return Math.round((this._o?.height || DEF.card_height) / 50); }
  getGridOptions() {
    const rows = Math.ceil(((this._o?.height || DEF.card_height) + 8) / 64);
    return { rows, columns: 12, min_rows: Math.min(5, rows), min_columns: 12, max_rows: 24 };
  }
  connectedCallback() { this._observe(); }
  disconnectedCallback() { this._ro?.disconnect(); }
  set hass(h) {
    const old = this._hass, o = this._o;
    this._hass = h || null;
    if (!o || !old || !h || old.locale !== h.locale || old.themes !== h.themes ||
        old.themes?.darkMode !== h.themes?.darkMode ||
        (o.id && old.states?.[o.id]?.state !== h.states?.[o.id]?.state)) this._update();
  }
  setConfig(c) {
    if (!c || typeof c !== "object" || Array.isArray(c)) throw new Error("Invalid Tank Card configuration.");
    const e = (k) => (ENUM[k].includes(c[k]) ? c[k] : DEF[k]);
    const n = Math.round(num(c.tank_count, DEF.tank_count, 1, 20)), total = totalOf(n, num(c.tank_capacity, DEF.tank_capacity, .01));
    const content = e("content_type"), form = e("tank_form"), style = e("tank_style"), mode = e("sensor_mode");
    const cs = typeof c.consumption_sensor === "string" ? c.consumption_sensor : "", ls = typeof c.level_sensor === "string" ? c.level_sensor : "";
    const anim = !PILE[content];
    const id = mode === "consumption" ? cs : ls;
    const wl = (k) => ({ on: c["warn_" + k] === true, lvl: num(c["warn_" + k + "_level"], DEF["warn_" + k + "_level"], 1, 99) });
    const w1 = wl(1), w2 = wl(2);
    if (w1.on && w2.on) w2.lvl = Math.min(w2.lvl, w1.lvl - 1);
    const ch = Math.round(num(c.card_height, DEF.card_height, 250, 1000));
    this._last = null;
    this._u = null;
    this._st = 0;
    this._o = {
      n, total, fill: Math.min(num(c.initial_fill, total, 0), total),
      pal: content === "custom" ? customPal(c.custom_color) : COLORS[content],
      solid: solid(content),
      classic: e("liquid_style") === "classic",
      fc: content === "custom" ? customClassic(c.custom_color) : CLASSIC[content],
      glow: content === "custom" ? `rgba(${rgbOf(c.custom_color).join(",")},.75)` : GLOWS[content],
      mode, id,
      warn: [w1, w2], wglow: c.warn_glow === true,
      title: typeof c.title === "string" && c.title ? c.title : DEF.title,
      unit: typeof c.unit === "string" && c.unit.trim() ? c.unit.trim() : DEF.unit,
      dec: BLANK(c.decimals) ? undefined : Math.round(num(c.decimals, 0, 0, 5)),
      perTank: c.show_unittank !== false,
      showTitle: c.show_title !== false, showLabel: c.show_tank_label !== false,
      label: typeof c.tank_label === "string" && c.tank_label.trim() ? c.tank_label.trim() : null,
      show: Object.fromEntries(INFO.map((i) => [i.id, c[i.flag] !== false])),
      wave: anim && c.animation === true, interval: num(c.animation_interval, DEF.animation_interval, 5, 60),
      bubbles: anim && c.bubbles === true, amount: Math.round(num(c.bubble_amount, DEF.bubble_amount, 1, 8)),
      form, style, gas: style === "metal" && form === "capsule" && n === 1 && c.gas_tank === true,
      theme: typeof c.theme === "string" ? c.theme : "", font: num(c.font_size, DEF.font_size, 50, 200),
      height: ch, minH: typeof c.grid_options?.rows === "number" ? 0 : ch
    };
    this._build();
    this._update();
  }
  _unit() {
    const o = this._o;
    if (o.unit !== DEF.unit) return o.unit;
    const raw = sensorUnit(this._hass, o.id);
    if (raw) this._u = raw;
    return this._u || sysUnit(this._hass);
  }
  _values() {
    const o = this._o, s = o.id ? this._hass?.states?.[o.id]?.state : undefined;
    const txt = String(s ?? "").trim(), raw = txt ? Number(txt) : NaN, ok = Number.isFinite(raw);
    let r;
    if (!ok) {
      r = this._last || { cur: o.fill, cons: 0 };
    } else if (o.mode === "consumption") {
      const cons = Math.max(raw, 0);
      r = { cur: clamp(o.fill - cons, 0, o.total), cons };
    } else {
      const cur = o.mode === "fill_level_percent" ? o.total * clamp(raw, 0, 100) / 100 : clamp(raw, 0, o.total);
      r = { cur, cons: Math.max(o.fill - cur, 0) };
    }
    if (ok) this._last = r;
    return { total: o.total, ...r };
  }
  _stage(pct) {
    const [w1, w2] = this._o.warn, prev = this._st;
    let s = w2.on && pct < w2.lvl ? 2 : w1.on && pct < w1.lvl ? 1 : 0;
    if (s < prev && pct < (prev === 2 ? w2 : w1).lvl + WARN_HYST) s = prev;
    return (this._st = s);
  }
  _bubbles() {
    const layer = el("div", "bub"), r = Math.random;
    const [small, mid] = BUBBLE_COUNT[this._o.amount - 1];
    for (let k = 0; k < small + mid; k++) {
      const b = el("span"), size = k < small ? .1 + r() * .16 : .28 + r() * .22;
      b.style.cssText = `--x:${(5 + r() * 88).toFixed(0)}%;--s:${size.toFixed(2)}em;--w:${((r() - .5) * 1.2).toFixed(2)}em;--t:${(6 + r() * 6).toFixed(1)}s;--d:-${(r() * 10).toFixed(1)}s`;
      layer.append(b);
    }
    return layer;
  }
  _observe() {
    this._ro?.disconnect();
    const w = this._o?.form === "capsule" && this._els?.tanks[0]?.w;
    if (!w) return;
    this._ro = new ResizeObserver(() => this._ball());
    this._ro.observe(w);
  }
  _ball() {
    const t = this._els?.tanks[0], w = t?.w, v = t?.v;
    if (!w || !v || !w.clientWidth || !w.clientHeight) return;
    const a = w.clientWidth, h = w.clientHeight, s = Math.min(a, h), L = Math.max(a, h);
    const wide = v.clientWidth > v.clientHeight, st = this._els.card.style;
    const px = (n, x) => st.setProperty(n, x.toFixed(1) + "px");
    const bar = (n, p, q, len, th) => {
      px(`--${n}x`, wide ? p : q); px(`--${n}y`, wide ? q : p);
      px(`--${n}w`, wide ? len : th); px(`--${n}h`, wide ? th : len);
    };
    bar("g1", .22 * s, .13 * s, Math.max(.32 * s, L - .72 * s), .1 * s);
    bar("g2", .3 * s, .785 * s, Math.max(.24 * s, L - .6 * s), .045 * s);
    px("--gb", .03 * s); px("--gb2", .018 * s);
    st.setProperty("--ga", wide ? "90deg" : "180deg");
    px("--br", 1.5 * BALL.size * s);
    px("--bx", Math.max(.12, (wide ? .6 : .3) + BALL.shift) * s);
    px("--by", (wide ? .3 : .6) * s);
  }
  _build() {
    const o = this._o, [a, b] = o.pal || [];
    const style = el("style");
    style.textContent = CSS + (o.wave ? waveCss(o.interval) : "") + (o.bubbles ? BUBBLE_CSS : "");
    const bright = o.classic && !o.solid;
    const card = el("ha-card", `${o.form} ${o.style}${o.solid ? " solid" : ""}${bright ? " bright" : ""}${o.wave ? " anim" : ""}`);
    card.style.setProperty("--fs", o.font + "%");
    card.style.minHeight = this.style.minHeight = o.minH ? o.minH + "px" : "";
    card.style.setProperty("--f", o.solid || (bright ? o.fc : `linear-gradient(to bottom,${a},${b})`));
    card.style.setProperty("--g", (bright ? o.glow : a) || "transparent");
    if (o.id) {
      const tap = () => this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: o.id } }));
      card.style.cursor = "pointer";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.addEventListener("click", tap);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tap(); } });
    }
    if (o.showTitle) card.append(el("div", "title", o.title));
    const info = {}, bar = el("div", "info");
    for (const i of INFO) {
      if (!o.show[i.id]) continue;
      const chip = el("div", "chip"), l = el("span"), v = el("span");
      chip.append(l, v);
      bar.append(chip);
      info[i.id] = { l, v, k: i.k };
    }
    if (bar.children.length) {
      bar.style.setProperty("--cols", Math.max(bar.children.length, 2));
      card.append(bar);
    }
    const tanksEl = el("div", "tanks"), tanks = [];
    tanksEl.style.setProperty("--n", o.n);
    for (let i = 0; i < o.n; i++) {
      const t = el("div", "t"), nm = el("div", "n"), v = el("div", "v"), w = el("div", "w"), l = el("div", "l"), val = el("div", "val");
      t.style.setProperty("--wd", (i * .35).toFixed(2) + "s");
      if (o.bubbles) l.append(this._bubbles());
      w.append(l, val);
      if (o.form === "capsule") w.append(el("i", "gl g1"), el("i", "gl g2"));
      v.append(w);
      if (o.showLabel) t.append(nm);
      if (o.gas) t.append(el("div", "dome"));
      t.append(v);
      if (o.gas) { const f = el("div", "feet"); f.append(el("i"), el("i")); t.append(f); }
      tanksEl.append(t);
      tanks.push({ nm, v, w, val });
    }
    card.append(tanksEl);
    this._tv = [];
    this._key = this._th = this._dk = null;
    this._els = { card, info, bar: bar.children.length ? bar : null, tanks };
    this.shadowRoot.replaceChildren(style, card);
    this._observe();
  }
  _update() {
    if (!this._els) return;
    const o = this._o, lg = lang(this._hass), u = this._unit();
    const { total, cur, cons } = this._values();
    const F = (v) => fmt(v, u, lg, o.dec);
    const pct = clamp(cur / total * 100, 0, 100);
    const stage = this._stage(pct);
    const fm = { max: F(total), level: F(cur), fill: `${pct.toFixed(0)}%`, cons: F(cons) };
    const vt = o.perTank ? F(cur / o.n) : "";
    const theme = (o.theme && this._hass?.themes?.themes?.[o.theme]) || null, dark = !!this._hass?.themes?.darkMode;
    const key = [lg, stage, pct, fm.max, fm.level, fm.cons, vt].join("|");
    if (key === this._key && theme === this._th && dark === this._dk) return;
    this._key = key;
    const cs = this._els.card.style;
    this._els.card.classList.toggle("warn1", o.wglow && stage === 1);
    this._els.card.classList.toggle("warn2", o.wglow && stage === 2);
    for (const [id, x] of Object.entries(this._els.info)) {
      x.l.textContent = tr(lg, x.k);
      x.v.textContent = fm[id];
    }
    if (this._els.bar) {
      const n = Math.max(...Object.values(this._els.info).map((x) => x.l.textContent.length + x.v.textContent.length));
      this._els.bar.style.setProperty("--chars", n);
    }
    if (theme !== this._th || dark !== this._dk) {
      this._th = theme;
      this._dk = dark;
      this._tv.forEach((k) => cs.removeProperty(k));
      this._tv = [];
      if (theme) {
        const th = { ...theme, ...theme.modes?.[dark ? "dark" : "light"] };
        for (const [k, v] of Object.entries(th)) if (k.startsWith("--") && typeof v === "string") { cs.setProperty(k, v); this._tv.push(k); }
      }
    }
    cs.setProperty("--vc", vt.length || 6);
    const names = this._els.tanks.map((_, i) => `${o.label ?? tr(lg, "u_tank")} ${i + 1}`);
    cs.setProperty("--lc", Math.max(...names.map((x) => x.length)));
    this._els.tanks.forEach((t, i) => {
      t.nm.textContent = names[i];
      t.v.style.setProperty("--p", pct / 100);
      t.v.classList.toggle("e", pct <= 0);
      t.val.textContent = vt;
    });
  }
}
class TankCardEditor extends HTMLElement {
  constructor() {
    super();
    this._hass = this._f = this._p = this._q = this._gn = this._t = this._raf = this._an = this._ct = this._saved = null;
    this._aq = 0;
    this._busy = this._ju = false;
    this._err = this._info = "";
    this._cid = this._srv = this._sv = null;
    this._imps = new Set();
    this._c = {};
    this._shown = undefined;
    this._empty = new Set();
    this.attachShadow({ mode: "open" });
  }
  disconnectedCallback() { clearTimeout(this._t); clearTimeout(this._ct); cancelAnimationFrame(this._raf); this._t = this._ct = null; }
  set hass(h) {
    const changed = lang(this._hass) !== lang(h), first = !this._hass;
    this._hass = h;
    if (!this._f) return;
    if (first) this._need();
    if (changed) this._sync();
    else this._f.forEach((x) => { if (x.live) x.form.hass = h; });
  }
  setConfig(c) {
    this._c = { ...(c || {}) };
    for (const k of this._empty) if (!BLANK(this._c[k])) this._empty.delete(k);
    if (!this._f) this._build();
    this._sync();
    this._need();
  }
  _total(d) {
    const n = Number(d.tank_count), c = Number(d.tank_capacity);
    return Number.isFinite(n) && Number.isFinite(c) && n >= 1 && c > 0 ? totalOf(clamp(Math.round(n), 1, 20), c) : null;
  }
  _data() {
    const d = { ...DEF, ...this._c };
    for (const k in ENUM) if (!ENUM[k].includes(d[k])) d[k] = DEF[k];
    const total = this._total(d);
    if (total !== null && !this._empty.has("initial_fill")) {
      if (BLANK(d.initial_fill) || Number(d.initial_fill) > total) d.initial_fill = total;
    }
    d.font_size = num(d.font_size, DEF.font_size, 50, 200);
    d.card_height = num(d.card_height, DEF.card_height, 250, 1000);
    if (!warnOn(d)) d.warn_notify = d.warn_mobile = d.warn_glow = d.warn_auto = false;
    if (!gasOk(d)) d.gas_tank = false;
    for (const k of this._empty) if (BLANK(this._c[k])) d[k] = undefined;
    return d;
  }
  _uh() {
    const d = this._data(), auto = d.unit === DEF.unit;
    const id = d.sensor_mode === "consumption" ? d.consumption_sensor : d.level_sensor;
    return tpl(tr(lang(this._hass), auto ? "h_u_auto" : "h_u_man"), { u: UL(auto ? sensorUnit(this._hass, id) || sysUnit(this._hass) : d.unit) });
  }
  _help(s) {
    if (s.name === "unit") return this._uh();
    const lg = lang(this._hass);
    if (s.name === "initial_fill" && this._data().sensor_mode !== "consumption") return tr(lg, "h_initial_fill_l");
    return TXT[lg]["h_" + s.name];
  }
  _schemas(d, lg) {
    const S = (name, vs, x) => ({ name, selector: { select: { ...x, options: vs.map((v) => ({ value: v, label: tr(lg, "o_" + v) })) } } });
    const nb = (min, max, step = 1) => ({ number: { min, ...(max !== undefined && { max }), step, mode: "box" } });
    const sl = (min, max, step, unit) => ({ number: { min, max, step, mode: "slider", unit_of_measurement: unit } });
    const b = (name) => ({ name, selector: { boolean: {} } });
    const g = (name, schema, w) => ({ type: "grid", name, flatten: true, ...(w && { column_min_width: w }), schema });
    const dd = { mode: "dropdown" }, wOn = warnOn(d), aOn = autoOn(d);
    return {
      tank: [
        S("tank_form", FORMS, dd),
        S("tank_style", STYLES, dd),
        g("tank_size", [{ name: "tank_count", selector: nb(1, 20) }, { name: "tank_capacity", selector: nb(.01, undefined, "any") }])
      ],
      gas: [{ ...b("gas_tank"), disabled: !gasOk(d) }],
      content: [
        S("content_type", CONTENTS),
        ...(d.content_type === "custom" ? [{ name: "custom_color", selector: { color_rgb: {} } }] : [])
      ],
      mode: [S("sensor_mode", MODES, dd)],
      sensor: [{ name: d.sensor_mode === "consumption" ? "consumption_sensor" : "level_sensor", selector: { entity: { domain: "sensor" } } }],
      unit: [g("unit_row", [S("unit", UNITS, { ...dd, custom_value: true }), { name: "decimals", selector: nb(0, 5) }])],
      fill: [{ name: "initial_fill", selector: nb(0, this._total(d) ?? undefined, "any") }],
      display: [
        b("show_title"), ...(d.show_title !== false ? [{ name: "title", selector: { text: {} } }] : []),
        b("show_tank_label"), ...(d.show_tank_label !== false ? [{ name: "tank_label", selector: { text: {} } }] : []),
        g("display_top", [b("show_max"), b("show_current")]),
        g("display_bottom", [b("show_fill_level"), b("show_consumption")]),
        b("show_unittank"),
        ...(PILE[d.content_type] ? [] : [S("liquid_style", LIQUIDS, dd)]),
        { name: "card_height", selector: sl(250, 1000, 10, "px") },
        { name: "font_size", selector: sl(50, 200, 5, "%") },
        { name: "theme", selector: { theme: {} } }
      ],
      animation: PILE[d.content_type] ? [] : [
        b("animation"), ...(d.animation ? [{ name: "animation_interval", selector: sl(5, 60, 1, "s") }] : []),
        b("bubbles"), ...(d.bubbles ? [{ name: "bubble_amount", selector: sl(1, 8, 1) }] : [])
      ],
      warn: [
        g("warn_row1", [b("warn_1"), { name: "warn_1_level", selector: nb(1, 99) }]),
        g("warn_row2", [b("warn_2"), { name: "warn_2_level", selector: nb(1, 99) }]),
        ...["warn_glow", "warn_auto"].map((k) => ({ ...b(k), disabled: !wOn }))
      ],
      wrep: aOn ? [g("warn_sched", [{ name: "warn_time", selector: { time: { no_second: true } }, disabled: d.warn_repeat_unit !== "d" }, { name: "warn_repeat", selector: nb(0, 100) }, S("warn_repeat_unit", REPEATS, dd)], "110px")] : [],
      wnot: aOn ? [b("warn_notify"), b("warn_mobile")] : []
    };
  }
  _scroller() {
    let n = this;
    while (n) {
      n = n.assignedSlot || n.parentElement || n.getRootNode?.().host || null;
      if (n && n.nodeType === 1) {
        const oy = getComputedStyle(n).overflowY;
        if ((oy === "auto" || oy === "scroll") && n.scrollHeight > n.clientHeight) return n;
      }
    }
    return document.scrollingElement;
  }
  _build() {
    const st = el("style");
    st.textContent = "ha-form{display:block;margin:8px 0}.note{margin:-4px 0 8px;padding:0 16px;font-size:12px;line-height:16px;color:var(--secondary-text-color)}.note .b{font-weight:700}.q{margin:12px 0 0;font-weight:600;color:var(--primary-text-color)}ha-expansion-panel{display:block;margin:8px 0;--expansion-panel-content-padding:0 12px 12px}ha-expansion-panel[hidden]{display:none}.auto{margin:12px 0 0;padding:0 16px}.auto .note{margin:0 0 8px;padding:0}.am{margin:0 0 10px;font-size:13px;line-height:18px;font-weight:500;white-space:pre-line}.ar{display:flex;flex-wrap:wrap;gap:8px}.ab{font:inherit;font-weight:500;padding:8px 16px;border:0;border-radius:18px;background:var(--primary-color);color:var(--text-primary-color,#fff);cursor:pointer}.ab:disabled{opacity:.4;cursor:default}.ab.ad{background:var(--error-color,#db4437)}.ab.ao{background:transparent;color:var(--primary-color);box-shadow:inset 0 0 0 1px var(--primary-color)}.ab.bl:not(:disabled){animation:abl 2.4s ease-in-out infinite}@keyframes abl{0%,100%{opacity:1}50%{opacity:.35}}@media(prefers-reduced-motion:reduce){.ab.bl:not(:disabled){animation:none;outline:2px solid var(--warning-color,#ffa600);outline-offset:2px}}ha-form[hidden]{display:none}";
    const root = el("div");
    this._f = [];
    this._p = [];
    this._q = [];
    const add = (parent, id) => {
      const form = document.createElement("ha-form");
      form.computeLabel = (s) => (s.name === "consumption_sensor" || s.name === "level_sensor" || s.name === "warn_time" ? "" : tr(lang(this._hass), s.name));
      form.computeHelper = (s) => this._help(s);
      form.addEventListener("value-changed", (e) => { e.stopPropagation(); this._changed(e.detail?.value); });
      form.addEventListener("input", (e) => this._live(e));
      parent.append(form);
      this._f.push({ id, form, live: id === "sensor" || id === "display" });
    };
    for (const id of ["tank", "content", "display", "animation", "warn"]) {
      const p = document.createElement("ha-expansion-panel");
      p.outlined = true;
      p.expanded = false;
      p.addEventListener("expanded-changed", (e) => {
        e.stopPropagation();
        if (!(e.detail?.expanded ?? p.expanded)) return;
        const sp = this._scroller(), y = p.getBoundingClientRect().top, t0 = performance.now();
        this._p.forEach((x) => { if (x.p !== p) x.p.expanded = false; });
        const fix = () => {
          if (sp) sp.scrollTop += p.getBoundingClientRect().top - y;
          if (performance.now() - t0 < 500) requestAnimationFrame(fix);
        };
        fix();
      });
      this._p.push({ id, p });
      if (id === "content") {
        const q = (k) => { const h = el("div", "q"); this._q.push([h, k]); p.append(h); };
        q("q_content"); add(p, id); q("q_mode"); add(p, "mode"); q("q_sensor"); add(p, "sensor"); add(p, "unit"); q("q_fill"); add(p, "fill");
      } else add(p, id);
      if (id === "tank") { add(p, "gas"); this._gn = el("div", "note"); p.append(this._gn); }
      if (id === "warn") {
        this._n1 = el("div", "note"); p.append(this._n1);
        add(p, "wrep");
        add(p, "wnot");
        this._an = this._autoUI(); p.append(this._an.box);
      }
      root.append(p);
    }
    this.shadowRoot.replaceChildren(st, root);
  }
  _autoUI() {
    const box = el("div", "auto"), msg = el("div", "am"), row = el("div", "ar");
    const bs = el("button", "ab"), br = el("button", "ab ao"), bd = el("button", "ab ad");
    bs.type = br.type = bd.type = "button";
    bs.addEventListener("click", () => this._asave());
    br.addEventListener("click", () => this._aread());
    bd.addEventListener("click", () => this._adel());
    row.append(bs, br, bd);
    box.append(msg, row);
    return { box, msg, bs, br, bd };
  }
  _emsg(e) { return String(e?.body?.message || e?.error || e?.message || e); }
  _has(a) { return this._cid === a.id && this._srv !== null; }
  _vdiff(a) { return !!this._sv && stable(a.vars) !== stable(this._sv); }
  _load() {
    // Puts the values of the automation into the editor (the card is only changed when the dialog is saved)
    if (this._sv) this._changed({ ...this._data(), ...fromVars(this._sv) }, true);
  }
  _need() {
    // The automation is only read here, never written: the editor looks it up when it opens or when the sensor changes
    const h = this._hass;
    if (!h || !h.user?.is_admin) return;
    const a = autoConfig(this._c, h);
    if (a.problem === "a_need_sensor") { this._cid = this._srv = this._sv = null; return; }
    if (a.id === this._cid) return;
    clearTimeout(this._ct);
    this._ct = setTimeout(() => this._fetch(), 600);
  }
  _arender() {
    const an = this._an, h = this._hass;
    if (!an || !h) return;
    const lg = lang(h), a = autoConfig(this._c, h), admin = !!h.user?.is_admin, has = this._has(a);
    const sig = a.config ? stable(a.config) : "", sv = this._saved;
    const ok = has && !!a.config && (this._srv === sig || (!!sv && sv.id === a.id && sv.sig === sig && sv.srv === this._srv));
    let t;
    if (!admin) t = tr(lg, "a_admin");
    else if (a.problem) t = tr(lg, a.problem);
    else if (this._cid !== a.id) t = tr(lg, "a_s_wait");
    else if (this._err) t = tpl(tr(lg, "a_s_err"), { e: this._err });
    else if (!has) t = tr(lg, "a_s_none");
    else t = tpl(tr(lg, ok ? "a_s_ok" : "a_s_old"), { n: a.name });
    if (admin && has && !this._sv) t += "\n" + tr(lg, "a_s_nov");
    if (a.note && !a.problem) t += "\n" + tr(lg, a.note);
    an.msg.textContent = (this._info ? this._info + "\n" : "") + t;
    an.bs.textContent = tr(lg, has ? "a_update" : "a_create");
    an.bs.disabled = !admin || !!a.problem || this._busy || this._cid !== a.id;
    an.bs.classList.toggle("bl", has && !ok);
    an.br.textContent = tr(lg, "a_read");
    an.br.disabled = !admin || this._busy || !has || !this._vdiff(a);
    an.bd.textContent = tr(lg, "a_delete");
    an.bd.hidden = !has;
    an.bd.disabled = !admin || this._busy;
  }
  async _fetch() {
    const h = this._hass;
    if (!h) return;
    const a = autoConfig(this._c, h), q = ++this._aq;
    if (a.problem === "a_need_sensor") return;
    let srv = null, sv = null, err = "";
    try {
      const cur = { ...(await h.callApi("GET", "config/automation/config/" + a.id)) };
      delete cur.id;
      srv = stable(cur);
      sv = cur.variables && typeof cur.variables === "object" ? cur.variables : null;
    } catch (e) { if (e?.status_code !== 404) err = this._emsg(e); }
    if (q !== this._aq || autoConfig(this._c, h).id !== a.id) return;
    if (srv !== null && this._ju && a.config) this._saved = { id: a.id, sig: stable(a.config), srv };
    this._ju = false;
    this._cid = a.id; this._srv = srv; this._sv = sv; this._err = err;
    // First look at this automation in this editor session: take over its values (also switches "Create notification automation" on)
    if (!err && !this._imps.has(a.id)) {
      this._imps.add(a.id);
      if (sv && (this._vdiff(autoConfig(this._c, h)) || !autoOn(this._c))) this._load();
    }
    this._arender();
  }
  async _asave() {
    const h = this._hass, lg = lang(h), a = autoConfig(this._c, h);
    if (!a.config || this._busy) return;
    const upd = this._has(a);
    this._busy = true; this._info = "";
    this._arender();
    try {
      await h.callApi("POST", "config/automation/config/" + a.id, a.config);
      this._info = tpl(tr(lg, upd ? "a_s_updated" : "a_s_created"), { n: a.name });
      this._ju = true;
    } catch (e) { this._info = tpl(tr(lg, "a_s_fail"), { e: this._emsg(e) }); }
    this._busy = false;
    await this._fetch();
  }
  _aread() {
    if (!this._sv || this._busy) return;
    const a = autoConfig(this._c, this._hass);
    this._load();
    this._info = tpl(tr(lang(this._hass), "a_s_read"), { n: a.name });
    this._arender();
  }
  async _adel() {
    const h = this._hass, lg = lang(h), a = autoConfig(this._c, h);
    if (!this._has(a) || this._busy || !window.confirm(tr(lg, "a_confirm"))) return;
    this._busy = true; this._info = "";
    this._arender();
    try {
      await h.callApi("DELETE", "config/automation/config/" + a.id);
      this._info = tpl(tr(lg, "a_s_deleted"), { n: a.name });
      this._srv = this._sv = this._saved = null;
    } catch (e) { this._info = tpl(tr(lg, "a_s_fail"), { e: this._emsg(e) }); }
    this._busy = false;
    this._arender();
  }
  _sync() {
    const lg = lang(this._hass), d = this._data(), sc = this._schemas(d, lg);
    this._shown = d.initial_fill;
    this._f.forEach(({ id, form }) => { form.hass = this._hass; form.data = d; form.schema = sc[id]; form.hidden = !sc[id].length; });
    const sm = tr(lg, "o_" + d.sensor_mode);
    this._q.forEach(([h, k]) => { h.textContent = tpl(tr(lg, k), { m: lg === "en" ? sm[0].toLowerCase() + sm.slice(1) : sm }); });
    this._gn.replaceChildren(el("div", "", tr(lg, "i_gas")), el("div", "b", tr(lg, "i_gas_on")));
    this._n1.textContent = tr(lg, "a_note");
    this._an.box.hidden = !autoOn(d);
    this._p.forEach(({ id, p }) => {
      p.header = tr(lg, "s_" + id);
      p.hidden = !sc[id].length;
      if (p.hidden) p.expanded = false;
    });
    this._arender();
  }
  _live(e) {
    const inp = e.composedPath().find((n) => n instanceof HTMLInputElement && n.type === "color");
    if (!inp || !/^#[0-9a-f]{6}$/i.test(inp.value)) return;
    const rgb = [1, 3, 5].map((i) => parseInt(inp.value.slice(i, i + 2), 16)), cur = rgbOf(this._c.custom_color);
    if (rgb.every((v, i) => v === cur[i])) return;
    cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(() => this._changed({ ...this._data(), custom_color: rgb }));
  }
  _changed(value, imp) {
    if (!value || typeof value !== "object") return;
    const next = { ...value }, reset = [];
    for (const k of ["title", "tank_label", "tank_count", "tank_capacity", "initial_fill", "decimals", "warn_1_level", "warn_2_level", "warn_repeat"]) {
      if (!BLANK(next[k])) this._empty.delete(k);
      else { if (k in value) this._empty.add(k); delete next[k]; }
    }
    for (const k of [...Object.keys(ENUM), "unit"]) if (BLANK(next[k])) { reset.push(k); delete next[k]; }
    const prevH = num(this._c.card_height, DEF.card_height, 250, 1000);
    if (next.card_height !== undefined && next.card_height !== prevH && next.grid_options && "rows" in next.grid_options) {
      const { rows, ...rest } = next.grid_options;
      if (Object.keys(rest).length) next.grid_options = rest;
      else delete next.grid_options;
    }
    if (!gasOk(next)) next.gas_tank = false;
    else if (!gasOk(this._c)) next.gas_tank = true;
    if (!warnOn(next)) next.warn_notify = next.warn_mobile = next.warn_glow = next.warn_auto = false;
    else if (!imp && !warnOn(this._c)) { next.warn_glow = true; next.warn_notify = true; }
    const fill = next.initial_fill, stored = this._c.initial_fill;
    if (fill !== undefined) {
      if (fill === this._shown) {
        if (BLANK(stored)) delete next.initial_fill; else next.initial_fill = stored;
      } else {
        const total = this._total(next), n = Number(fill);
        if (total !== null && Number.isFinite(n)) {
          next.initial_fill = clamp(n, 0, total);
          if (next.initial_fill !== n) reset.push("initial_fill");
        }
      }
    }
    this._c = next;
    this._info = "";
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: next }, bubbles: true, composed: true }));
    this._sync();
    this._need();
    if (reset.length) {
      const e = Object.fromEntries(reset.map((k) => [k, undefined]));
      this._f.forEach(({ form }) => { form.data = { ...this._data(), ...e }; });
      clearTimeout(this._t);
      this._t = setTimeout(() => { this._t = null; this._f?.forEach(({ form }) => { form.data = this._data(); }); }, 40);
    }
  }
}
if (!customElements.get("tank-card")) customElements.define("tank-card", TankCard);
if (!customElements.get("tank-card-editor")) customElements.define("tank-card-editor", TankCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "tank-card")) {
  window.customCards.push({
    type: "tank-card", name: "Tank Card", preview: true, version: VERSION,
    description: "Displays tank fill levels using consumption or level sensors.",
    documentationURL: "https://github.com/jinx-22/tank-card"
  });
}
