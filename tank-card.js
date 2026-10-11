/** Tank Card – Version 0.9.0 */
const VERSION = "0.9.0";
console.info("%c Tank Card %c v" + VERSION, "font-weight:bold;background:#03a9f4;color:#fff;padding:2px 6px;border-radius:3px 0 0 3px", "background:#555;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0");

// ——— Texte (en/de), flach: u_ = Karte, h_ = Hilfetext, o_ = Auswahlwerte, s_ = Editor-Kategorie, sonst Feldname ———
const TXT = {
  en: {
    u_max: "Max:", u_level: "Current:", u_fill: "Level:", u_cons: "Consumption:", u_tank: "Tank",
    title: "Title", s_tank: "Tank", s_content: "Content", s_display: "Display", s_animation: "Animation",
    tank_form: "Tank shape", tank_count: "Number of tanks", tank_capacity: "Capacity per tank", content_type: "Content type", custom_color: "Color", liquid_style: "Liquid style",
    sensor_mode: "Sensor mode", consumption_sensor: "Consumption sensor", level_sensor: "Level sensor", initial_fill: "Initial fill", unit: "Unit",
    show_max: "Show “Max:”", show_current: "Show “Current:”", show_fill_level: "Show “Level:”", show_consumption: "Show “Consumption:”",
    show_unittank: "Show amount per tank", show_title: "Show title", show_tank_label: "Show tank label", tank_label: "Tank label", animation: "Wave", animation_interval: "Wave interval (seconds)", bubbles: "Rising bubbles",
    bubble_amount: "Amount of bubbles", theme: "Theme", font_size: "Font size", tank_style: "Tank type", gas_tank: "Gas tank",
    h_gas_tank: "Adds legs and a dome to the capsule.",
    h_tank_label: "Name of the tanks, e.g. Water barrel or Gas bottle. The numbering is added automatically. Empty = Tank.",
    h_consumption_sensor: "Sensor used in consumption mode. Tap on the card opens its details.",
    h_level_sensor: "Sensor used in both level modes. Tap on the card opens its details.",
    h_initial_fill: "Total amount of all tanks at the start (max. total capacity). Empty = full.",
    h_animation_interval: "Time between two waves (5–60 seconds).", h_bubble_amount: "1 = a few bubbles, 8 = very many bubbles.",
    h_font_size: "Font size in percent (50–200).",
    o_consumption: "Consumption sensor", o_fill_level_l: "Level sensor (kg, m³, L)", o_fill_level_percent: "Level sensor (%)",
    o_heating_oil: "Heating oil", o_gas: "Gas", o_pellets: "Pellets", o_wood_chips: "Wood chips", o_water: "Water", o_diesel: "Diesel",
    o_custom: "Custom", o_classic: "Previous style", o_new: "New style",
    o_L: "Liters", o_kg: "Kilograms", o_m3: "Cubic meters", o_rect: "Rectangle", o_pool: "Cylinder", o_capsule: "Capsule",
    o_glass: "Glass tank", o_metal: "Metal tank"
  },
  de: {
    u_max: "Max:", u_level: "Aktuell:", u_fill: "Füllstand:", u_cons: "Verbrauch:", u_tank: "Tank",
    title: "Titel", s_tank: "Tank", s_content: "Inhalt", s_display: "Anzeige", s_animation: "Animation",
    tank_form: "Tankform", tank_count: "Anzahl der Tanks", tank_capacity: "Kapazität pro Tank", content_type: "Inhalt", custom_color: "Farbe", liquid_style: "Darstellung der Flüssigkeit",
    sensor_mode: "Sensorart", consumption_sensor: "Verbrauchssensor", level_sensor: "Füllstandssensor", initial_fill: "Anfangsbestand", unit: "Einheit",
    show_max: "„Max:“ anzeigen", show_current: "„Aktuell:“ anzeigen", show_fill_level: "„Füllstand:“ anzeigen", show_consumption: "„Verbrauch:“ anzeigen",
    show_unittank: "Menge pro Tank anzeigen", show_title: "Titel anzeigen", show_tank_label: "Tank-Beschriftung anzeigen", tank_label: "Tank-Beschriftung", animation: "Welle", animation_interval: "Intervall der Welle (Sekunden)", bubbles: "Aufsteigende Blasen",
    bubble_amount: "Menge der Blasen", theme: "Theme", font_size: "Schriftgröße", tank_style: "Tankart", gas_tank: "Gas-Tank",
    h_gas_tank: "Fügt der Kapsel Standfüße und eine Kuppel hinzu.",
    h_tank_label: "Name der Tanks, z. B. Wasserfass oder Gasflasche. Die Nummerierung kommt automatisch. Leer = Tank.",
    h_consumption_sensor: "Sensor für den Modus Verbrauchssensor. Tippen auf die Karte öffnet dessen Details.",
    h_level_sensor: "Sensor für beide Füllstandsmodi. Tippen auf die Karte öffnet dessen Details.",
    h_initial_fill: "Gesamtmenge aller Tanks zu Beginn (max. Gesamtkapazität). Leer = voll.",
    h_animation_interval: "Zeit zwischen zwei Wellen (5–60 Sekunden).", h_bubble_amount: "1 = wenige Blasen, 8 = sehr viele Blasen.",
    h_font_size: "Schriftgröße in Prozent (50–200).",
    o_consumption: "Verbrauchssensor", o_fill_level_l: "Füllstandssensor (kg, m³, L)", o_fill_level_percent: "Füllstandssensor (%)",
    o_heating_oil: "Heizöl", o_gas: "Gas", o_pellets: "Pellets", o_wood_chips: "Hackschnitzel", o_water: "Wasser", o_diesel: "Diesel",
    o_custom: "Benutzerdefiniert", o_classic: "Bisherige Darstellung", o_new: "Neue Darstellung",
    o_L: "Liter", o_kg: "Kilogramm", o_m3: "Kubikmeter", o_rect: "Rechteck", o_pool: "Zylinder", o_capsule: "Kapsel",
    o_glass: "Glastank", o_metal: "Metalltank"
  }
};

const LIQUIDS = ["classic", "new"]; // erster Eintrag = Standard („Bisherige Darstellung“)
const MODES = ["consumption", "fill_level_l", "fill_level_percent"];
const UNITS = ["L", "kg", "m3"];
const FORMS = ["rect", "pool", "capsule"];
const STYLES = ["metal", "glass"];
const CONTENTS = ["heating_oil", "gas", "pellets", "wood_chips", "water", "diesel", "custom"];
// Dropdowns: ungültiger oder geleerter Wert („X“) → Standard aus DEF
const ENUM = { tank_form: FORMS, tank_style: STYLES, content_type: CONTENTS, liquid_style: LIQUIDS, sensor_mode: MODES, unit: UNITS };
// [Farbe an der Oberfläche (hell), Farbe am Boden (dunkel)]
const COLORS = {
  heating_oil: ["#ff4d73", "#8a0018"], gas: ["#c4f6ff", "#00a8d6"], water: ["#27d3ff", "#0046d0"], diesel: ["#fff35a", "#e0a900"]
};
// „Hell unten“ (bisher): kräftigere Verläufe von unten nach oben und Leuchtfarbe der Oberfläche (nur Farben, gleiche Berechnung wie „Hell oben“)
const CLASSIC = {
  heating_oil: "linear-gradient(to top,#ff2a55 0%,#d91445 32%,#a40024 68%,#8a0018 100%)",
  gas: "linear-gradient(to top,#c4f6ff 0%,#68e4fa 30%,#18c3e5 62%,#00a8d6 100%)",
  water: "linear-gradient(to top,#00c8ff 0%,#00aee8 28%,#007bd0 62%,#0046d0 100%)",
  diesel: "linear-gradient(to top,#fff35a 0%,#ffd928 30%,#f5c400 62%,#e0a900 100%)"
};
const GLOWS = {
  heating_oil: "rgba(255,40,80,.75)", gas: "rgba(0,200,255,.75)", water: "rgba(0,190,255,.75)", diesel: "rgba(255,205,45,.75)"
};
// Reihenfolge = Reihenfolge im Kopfbereich
const INFO = [
  { id: "max", flag: "show_max", k: "u_max" }, { id: "fill", flag: "show_fill_level", k: "u_fill" },
  { id: "level", flag: "show_current", k: "u_level" }, { id: "cons", flag: "show_consumption", k: "u_cons" }
];
const DEF = {
  title: "Tank Card", tank_form: "rect", tank_style: "metal", gas_tank: false, tank_count: 3, tank_capacity: 1500, content_type: "heating_oil", custom_color: [33, 150, 243], liquid_style: "classic", sensor_mode: "consumption", unit: "L",
  show_max: true, show_current: true, show_fill_level: true, show_consumption: true, show_unittank: true, show_title: true, show_tank_label: true, tank_label: "Tank",
  animation: false, animation_interval: 30, bubbles: false, bubble_amount: 3, font_size: 100
};

// ——— Lichtkugel der Kapsel (immer rund, nur die Größe passt sich dem Tank an) ———
// size  = Größe der Kugel als Anteil der kurzen Tankseite (größer = größere Kugel)
// shift = Verschiebung als Anteil der kurzen Tankseite (0 = ursprüngliche Position, negativ = weiter nach links, positiv = nach rechts)
const BALL = { size: .17, shift: -.2 };

// ——— Pellets / Hackschnitzel: Größe der Teile (zugleich die Liste der Feststoffe: keine Welle/Blasen) ———
// Kachelgröße in em: kleiner = kleinere Pellets bzw. Schnitzel, größer = größere
const PILE = { pellets: 6.7, wood_chips: 9 };

// ——— Helfer ———
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const num = (v, d, min = -Infinity, max = Infinity) => {
  if (v === "" || v == null) return d;
  const n = Number(v);
  return Number.isFinite(n) ? clamp(n, min, max) : d;
};
const BLANK = (v) => v == null || v === "" || (typeof v === "number" && Number.isNaN(v));
const totalOf = (n, c) => Math.round(n * c * 100) / 100; // Gesamtkapazität (Karte und Editor rechnen gleich)
const lang = (h) => String(h?.locale?.language || document.documentElement.lang || "en").toLowerCase().startsWith("de") ? "de" : "en";
const tr = (l, k) => TXT[l][k] ?? TXT.en[k] ?? k;
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
};
// Zahl, "120", "120%", "1.2em", "19px" (16px = 100 %) → 50–200
const fontPct = (v) => {
  let p = 100;
  if (typeof v === "number") p = v;
  else if (typeof v === "string") {
    const m = v.trim().match(/^(\d+(?:\.\d+)?)\s*(%|em|px)?$/);
    if (m) p = m[2] === "em" ? m[1] * 100 : m[2] === "px" ? (m[1] / 16) * 100 : +m[1];
  }
  return clamp(Number.isFinite(p) ? p : 100, 50, 200);
};
// Zahlen: m³ mit 2 Nachkommastellen, sonst ganze Zahlen; Tausendertrennung nur in Englisch (de: 3000, en: 3,000)
const fmt = (v, u, lg) => v.toLocaleString(lg === "de" ? "de-DE" : "en-US", { minimumFractionDigits: u === "m3" ? 2 : 0, maximumFractionDigits: u === "m3" ? 2 : 0, useGrouping: lg !== "de" }) + " " + (u === "m3" ? "m³" : u);
// Eigene Farbe: [r,g,b] oder "#rrggbb" → Oberfläche heller, Boden dunkler
const rgbOf = (v) => {
  if (Array.isArray(v) && v.length >= 3) return v.slice(0, 3).map((n) => clamp(Math.round(Number(n)) || 0, 0, 255));
  const m = typeof v === "string" && v.trim().match(/^#?([0-9a-f]{6})$/i);
  return m ? [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) : DEF.custom_color;
};
const shade = (rgb, f) => "#" + rgb.map((c) => Math.round(f >= 0 ? c + (255 - c) * f : c * (1 + f)).toString(16).padStart(2, "0")).join("");
const customPal = (v) => { const c = rgbOf(v); return [shade(c, .3), shade(c, -.45)]; };
const customClassic = (v) => { const c = rgbOf(v); return `linear-gradient(to top,${shade(c, .25)} 0%,${shade(c, 0)} 32%,${shade(c, -.25)} 68%,${shade(c, -.45)} 100%)`; };

// ——— Schüttgut: Pellets und Hackschnitzel als kleine nahtlose SVG-Kachel ———
// Zufällig gestreute Einzelteile in zwei Schichten (hinten dunkler) mit Kontaktschatten und feiner Körnung. Licht von links oben:
// Jedes Teil wird so gedreht, dass seine helle Seite zum Licht zeigt; der Schatten fällt auf die Gegenseite.
const solid = (() => {
  const SZ = { pellets: 160, wood_chips: 120 }, cache = {}; // Kachelgröße in SVG-Einheiten (größer = Muster wiederholt sich seltener)
  const prng = (a) => () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const f1 = (n) => +n.toFixed(1);
  const pick = (r, w) => { let s = 0; for (let i = 0; i < w.length; i++) { s += w[i]; if (r < s) return i; } return w.length - 1; };
  const grad = (id, st) => `<linearGradient id='${id}' x1='0' y1='0' x2='0' y2='1'>${st.map((c, i) => `<stop offset='${st.length === 2 ? i : [0, .26, .62, 1][i]}' stop-color='${c}'/>`).join("")}</linearGradient>`;
  const NOISE = "<filter id='n' x='0' y='0' width='1' height='1' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .08 0 0 0 0 .04 0 0 0 0 .01 0 0 0 .9 -.35'/></filter>";
  // Teile gitterartig mit Zufallsversatz verteilen, in Zufallsreihenfolge zeichnen; Teile am Rand erscheinen auch gegenüber (nahtlos).
  // Drehwinkel: zufällig, aber so, dass die Oberseite des Teils zum Licht (links oben) zeigt.
  const scatter = (rnd, T, base, cells, ext, use) => {
    const rect = (f, o) => `<rect width='${T}' height='${T}' fill='${f}'${o ? ` opacity='${o}'` : ""}/>`;
    const layer = () => {
      const items = [], c = T / cells;
      // Unordnung: starker Versatz und ~10 % zusätzliche Teile an Zufallsstellen (Häufchen statt Raster), aber keine großen Lücken (Lücken würden das Muster betonen)
      const wr = (v) => (v % T + T) % T;
      for (let i = 0; i < cells; i++) for (let j = 0; j < cells; j++) items.push([wr((i + .5 + (rnd() - .5) * 1.9) * c), wr((j + .5 + (rnd() - .5) * 1.9) * c), rnd(), rnd(), rnd()]);
      for (let k = 0; k < cells * cells * .1; k++) items.push([rnd() * T, rnd() * T, rnd(), rnd(), rnd()]);
      for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; } // Fisher-Yates: in allen Browsern dasselbe Muster
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

  // Pellets: Ø 6–8 mm, Länge 10–30 mm, hell- bis mittelbraun, vereinzelt dunkel (Rindenanteil). Pro Länge eine Gruppe, die Farbe kommt per fill vom <use>.
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

  // Hackschnitzel: flache, eckige Stücke (Aspekt 2–4), hell- bis rotbraun, mit Faserlinien; manche mit dunkler Rindenkante
  const chips = () => {
    const rnd = prng(23), pt = (p) => p.map(f1).join(",");
    let defs = NOISE + [["#ecd5a0", "#c09a5e"], ["#dcb877", "#ae8546"], ["#cb9c58", "#966a33"], ["#a8763e", "#744a1f"], ["#f2e3b8", "#d2b476"], ["#c0834a", "#8a5226"]].map((s, i) => grad("c" + i, s)).join("");
    for (let k = 0; k < 12; k++) {
      const L = 11 + rnd() * 13, W = 4 + rnd() * 4.5, j = (v) => (rnd() - .5) * v, n = 3 + Math.floor(rnd() * 3);
      // eckiger Umriss: unregelmäßiges Rechteck, Enden schräg abgebrochen
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

  // Ergebnis: CSS-Hintergrundebenen (unten dunkler + Kachel, unten verankert, damit sie beim Füllstandswechsel nicht rutscht)
  // Große, weiche Hell-/Dunkel-Flecken (in % der Fläche, nicht an die Kachel gebunden) verdecken die Wiederholung der Kachel
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

// ——— Styles: 3D-Glasoptik. ———
// --h = Höhe des Deckels, --sh = Höhe der Flüssigkeitsoberfläche, --o = Abstand Füllhöhe → Oberflächenmitte
// (Rechteck: Oberfläche liegt komplett über der Füllhöhe, Zylinder/Kapsel: Füllhöhe = Mitte der Ellipse)
// --k = Höhenkorrektur der Flüssigkeit: Glas = Oberfläche immer sichtbar, Metall = bei 100 % komplett hinter dem Fensterrahmen
// --ov = Überstand der Oberfläche links/rechts (Anteil der Fensterbreite je Seite): Glas 0, Metall .08 → verschwindet hinter dem Rahmen
// --b = Rahmendicke (Kapsel dünner, an den Enden +3px); --bl = Lichtkugel der Kapsel (--br/--bx/--by kommen per JS, siehe _ball)
// --body = Helligkeit der Schüttung, --lid = Helligkeit der Oberfläche (jeweils gesamt, 1 = unverändert), --edge = Schatten direkt an der Kante, --fade = langer Schatten bis zur Hälfte der Füllung (--sf: dazu leichte Aufhellung nach unten)
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
.tanks{flex:1;display:flex;column-gap:clamp(3px,calc(8% / var(--n,3)),24px);min-height:150px;padding:0 1%}
.t{position:relative;isolation:isolate;flex:1;min-width:0;display:flex;flex-direction:column;padding-bottom:16px;container-type:inline-size}
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
@media(prefers-reduced-motion:reduce){.l::before,.bub span{animation:none!important}}`;

const BUBBLE_CSS = `
.bub{position:absolute;inset:0;overflow:hidden;container-type:size;pointer-events:none}
.bub span{position:absolute;left:var(--x);bottom:calc(-1*var(--s));width:var(--s);height:var(--s);border-radius:50%;opacity:0;animation:b var(--t) linear var(--d) infinite;
  background:radial-gradient(circle at 32% 28%,#fff,rgba(255,255,255,.3) 45%,rgba(255,255,255,.12));box-shadow:inset 0 0 0 1px rgba(255,255,255,.6)}
@keyframes b{0%{transform:translate(0,0);opacity:0}10%,90%{opacity:.85}100%{transform:translate(var(--w),calc(-100cqh - 1em));opacity:0}}
.e .bub{display:none}`;

// Blasen pro Tank je Stufe 1–8 als [kleine, mittlere]: Stufe 1 = ein paar kleine, hier und da eine mittlere, dann langsam mehr; Stufe 8 = Maximum (56)
const BUBBLE_COUNT = [[4, 1], [6, 2], [9, 3], [13, 5], [18, 7], [24, 10], [32, 14], [40, 16]];

// Welle läuft ca. 3,2 s (bei kurzem Intervall max. 40 % davon) und pausiert dann bis zum Ende des Intervalls
const waveCss = (s) => `
@keyframes w{0%{background-position:100% 0}${Math.min(3.2 / s * 100, 40).toFixed(2)}%{background-position:0 0}100%{background-position:0 0}}
.anim .l::before{animation:w ${s}s linear var(--wd) infinite}`;

class TankCard extends HTMLElement {
  constructor() {
    super();
    this._hass = this._o = this._els = this._last = this._ro = null;
    this._tv = []; // vom Theme gesetzte Variablen
    this.attachShadow({ mode: "open" });
  }

  static getConfigElement() { return document.createElement("tank-card-editor"); }

  static getStubConfig() {
    return {
      ...DEF, initial_fill: 2250, consumption_sensor: "", level_sensor: "", theme: ""
    };
  }

  getCardSize() { return 6; }
  getGridOptions() { return { rows: 7, columns: 12, min_rows: 5, min_columns: 12, max_rows: 24 }; }

  connectedCallback() { this._observe(); }
  disconnectedCallback() { this._ro?.disconnect(); }

  set hass(h) {
    const old = this._hass, o = this._o;
    this._hass = h || null;
    if (!o || !old || !h || lang(old) !== lang(h) || old.themes !== h.themes ||
        (o.id && old.states?.[o.id]?.state !== h.states?.[o.id]?.state)) this._update();
  }

  setConfig(c) {
    if (!c || typeof c !== "object" || Array.isArray(c)) throw new Error("Invalid Tank Card configuration.");
    const e = (k) => (ENUM[k].includes(c[k]) ? c[k] : DEF[k]); // ungültiger Wert → Standard
    const n = Math.round(num(c.tank_count, DEF.tank_count, 1, 20)), total = totalOf(n, num(c.tank_capacity, DEF.tank_capacity, .01));
    const content = e("content_type"), form = e("tank_form"), style = e("tank_style"), mode = e("sensor_mode");
    const cs = typeof c.consumption_sensor === "string" ? c.consumption_sensor : "", ls = typeof c.level_sensor === "string" ? c.level_sensor : "";
    const anim = !PILE[content]; // Feststoffe: keine Welle/Blasen
    this._last = null;
    this._o = {
      n, total, content, fill: Math.min(num(c.initial_fill, total, 0), total),
      pal: content === "custom" ? customPal(c.custom_color) : COLORS[content], // [Oberfläche, Boden]
      solid: solid(content),
      classic: e("liquid_style") === "classic", // nur Farben: hell unten (bisher, kräftig und ohne Seitenschatten) oder hell oben (neu)
      fc: content === "custom" ? customClassic(c.custom_color) : CLASSIC[content],
      glow: content === "custom" ? `rgba(${rgbOf(c.custom_color).join(",")},.75)` : GLOWS[content],
      mode, cs, ls, id: mode === "consumption" ? cs : ls,
      title: typeof c.title === "string" && c.title ? c.title : DEF.title,
      unit: e("unit"), perTank: c.show_unittank !== false,
      showTitle: c.show_title !== false, showLabel: c.show_tank_label !== false,
      label: typeof c.tank_label === "string" && c.tank_label.trim() ? c.tank_label.trim() : null,
      show: Object.fromEntries(INFO.map((i) => [i.id, c[i.flag] !== false])),
      wave: anim && c.animation === true, interval: num(c.animation_interval, DEF.animation_interval, 5, 60),
      bubbles: anim && c.bubbles === true, amount: Math.round(num(c.bubble_amount, DEF.bubble_amount, 1, 8)),
      form, style, gas: style === "metal" && form === "capsule" && n === 1 && c.gas_tank === true, // Standfüße + Kuppel nur beim Metall-Gastank
      theme: typeof c.theme === "string" ? c.theme : "", font: fontPct(c.font_size),
      names: Array.from({ length: n }, (_, i) => { const x = c.entities?.[i]?.name; return typeof x === "string" && x.trim() && x.trim() !== `Tank ${i + 1}` ? x : null; }) // eigener Name pro Tank (YAML); „Tank N“ = automatisch
    };
    this._build();
    this._update();
  }

  // Ohne Sensor: Anfangsbestand. Bei ausgefallenem Sensor: letzter gültiger Wert.
  _values() {
    const o = this._o, id = o.id;
    const s = id ? this._hass?.states?.[id]?.state : undefined;
    const raw = s === undefined || s === "unknown" || s === "unavailable" ? null : Number.parseFloat(s);
    let r;
    if (raw === null || !Number.isFinite(raw)) {
      r = id && this._last ? this._last : { cur: clamp(o.fill, 0, o.total), cons: 0 };
    } else if (o.mode === "consumption") {
      const cons = Math.max(raw, 0);
      r = { cur: clamp(o.fill - cons, 0, o.total), cons };
    } else {
      const cur = o.mode === "fill_level_percent" ? o.total * clamp(raw, 0, 100) / 100 : clamp(raw, 0, o.total);
      r = { cur, cons: Math.max(o.fill - cur, 0) };
    }
    if (raw !== null && Number.isFinite(raw)) this._last = r;
    return { total: o.total, ...r };
  }

  _bubbles() {
    const layer = el("div", "bub"), r = Math.random;
    const [small, mid] = BUBBLE_COUNT[this._o.amount - 1];
    for (let k = 0; k < small + mid; k++) {
      const b = el("span"), size = k < small ? .1 + r() * .16 : .28 + r() * .22; // zuerst kleine, dann mittlere Blasen
      b.style.cssText = `--x:${(5 + r() * 88).toFixed(0)}%;--s:${size.toFixed(2)}em;--w:${((r() - .5) * 1.2).toFixed(2)}em;--t:${(6 + r() * 6).toFixed(1)}s;--d:-${(r() * 10).toFixed(1)}s`;
      layer.append(b);
    }
    return layer;
  }

  // Größe des Kapsel-Sichtfensters beobachten (Lichtkugel passt sich an)
  _observe() {
    this._ro?.disconnect();
    const w = this._o?.form === "capsule" && this._els?.tanks[0]?.w;
    if (!w || typeof ResizeObserver === "undefined") return;
    this._ro = new ResizeObserver(() => this._ball());
    this._ro.observe(w);
  }

  // Lichtkugel und Lichtstreifen der Kapsel aus der Fenstergröße berechnen.
  // Orientierung wie die CSS-Containerabfrage (Tank breiter als hoch = waagerecht). Die Lichtkugel ist immer rund,
  // nur ihre Größe richtet sich nach der kurzen Tankseite (Einstellung: Konstante BALL ganz oben).
  _ball() {
    const t = this._els?.tanks[0], w = t?.w, v = t?.v;
    if (!w || !v || !w.clientWidth || !w.clientHeight) return;
    const a = w.clientWidth, h = w.clientHeight, s = Math.min(a, h), L = Math.max(a, h);
    const wide = v.clientWidth > v.clientHeight, st = this._els.card.style;
    const px = (n, x) => st.setProperty(n, x.toFixed(1) + "px");
    // Streifen: p = Start entlang der langen Achse, q = Abstand von der Lichtkante, len = Länge, th = Dicke
    const bar = (n, p, q, len, th) => {
      px(`--${n}x`, wide ? p : q); px(`--${n}y`, wide ? q : p);
      px(`--${n}w`, wide ? len : th); px(`--${n}h`, wide ? th : len);
    };
    bar("g1", .22 * s, .13 * s, Math.max(.32 * s, L - .72 * s), .1 * s);
    bar("g2", .3 * s, .785 * s, Math.max(.24 * s, L - .6 * s), .045 * s);
    px("--gb", .03 * s); px("--gb2", .018 * s); // weiche Ränder
    st.setProperty("--ga", wide ? "90deg" : "180deg");
    px("--br", 1.5 * BALL.size * s); // runde Kugel: Radius (Kern wie bisher, Rest läuft transparent aus)
    px("--bx", Math.max(.12, (wide ? .6 : .3) + BALL.shift) * s); // Lage: Kappe des Tanks, mit BALL.shift verschoben (nie ganz an den Rand)
    px("--by", (wide ? .3 : .6) * s);
  }

  // DOM + Style einmalig; Werte setzt danach nur _update() (Höhen-Transition bleibt erhalten)
  _build() {
    const o = this._o, [a, b] = o.pal || [];
    const style = el("style");
    style.textContent = CSS + (o.wave ? waveCss(o.interval) : "") + (o.bubbles ? BUBBLE_CSS : "");

    const bright = o.classic && !o.solid; // „Hell unten“: kräftige Farben, Leuchten, kein dunkler Seitenschatten in der Flüssigkeit
    const card = el("ha-card", `${o.form} ${o.style}${o.solid ? " solid" : ""}${bright ? " bright" : ""}${o.wave ? " anim" : ""}`);
    card.style.setProperty("--fs", o.font + "%");
    card.style.setProperty("--f", o.solid || (bright ? o.fc : `linear-gradient(to bottom,${a},${b})`));
    card.style.setProperty("--g", (bright ? o.glow : a) || "transparent");

    if (o.id) { // Tippen → HA-Sensor-Info
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
      bar.style.setProperty("--cols", Math.max(bar.children.length, 2)); // breite Ansicht: alle sichtbaren Werte in einer Zeile
      card.append(bar);
    }

    const tanksEl = el("div", "tanks"), tanks = [];
    tanksEl.style.setProperty("--n", o.n); // Anzahl der Tanks für den Abstand (siehe .tanks im CSS)
    for (let i = 0; i < o.n; i++) {
      const t = el("div", "t"), nm = el("div", "n"), v = el("div", "v"), w = el("div", "w"), l = el("div", "l"), val = el("div", "val");
      t.style.setProperty("--wd", (i * .35).toFixed(2) + "s");
      if (o.bubbles) l.append(this._bubbles());
      w.append(l, val);
      if (o.form === "capsule") w.append(el("i", "gl g1"), el("i", "gl g2")); // Lichtstreifen mit runden Enden
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
    this._els = { card, info, bar: bar.children.length ? bar : null, tanks };
    this.shadowRoot.replaceChildren(style, card);
    this._observe();
  }

  _update() {
    if (!this._els) return;
    const o = this._o, lg = lang(this._hass), u = o.unit;
    const { total, cur, cons } = this._values();
    const pct = total > 0 ? clamp(cur / total * 100, 0, 100) : 0;
    const fm = { max: fmt(total, u, lg), level: fmt(cur, u, lg), fill: `${pct.toFixed(0)}%`, cons: fmt(cons, u, lg) };

    for (const [id, x] of Object.entries(this._els.info)) {
      x.l.textContent = tr(lg, x.k);
      x.v.textContent = fm[id];
    }
    if (this._els.bar) { // längster Chip-Text bestimmt die gemeinsame Schriftgröße aller Chips
      const n = Math.max(...Object.values(this._els.info).map((x) => x.l.textContent.length + x.v.textContent.length));
      this._els.bar.style.setProperty("--chars", n);
    }

    const theme = o.theme && this._hass?.themes?.themes?.[o.theme], cs = this._els.card.style;
    this._tv.forEach((k) => cs.removeProperty(k)); // Variablen eines früheren Themes entfernen
    this._tv = [];
    if (theme && typeof theme === "object") {
      const th = { ...theme, ...theme.modes?.[this._hass.themes.darkMode ? "dark" : "light"] }; // Hell-/Dunkel-Variablen des Themes
      for (const [k, v] of Object.entries(th)) if (k.startsWith("--") && typeof v === "string") { cs.setProperty(k, v); this._tv.push(k); }
    }

    const vt = o.perTank ? fmt(cur / o.n, u, lg) : "";
    cs.setProperty("--vc", vt.length || 6); // Textlänge → Schrift schrumpft bei langen Werten
    const names = this._els.tanks.map((_, i) => o.names[i] ?? `${o.label ?? tr(lg, "u_tank")} ${i + 1}`);
    cs.setProperty("--lc", Math.max(...names.map((x) => x.length))); // längster Name → Schrift schrumpft
    this._els.tanks.forEach((t, i) => {
      t.nm.textContent = names[i];
      t.v.style.setProperty("--p", pct / 100);
      t.v.classList.toggle("e", pct <= 0);
      t.val.textContent = vt;
    });
  }
}

/** Editor: Kategorien (ha-expansion-panel), immer nur eine offen; „Animation“ entfällt bei Feststoffen. */
class TankCardEditor extends HTMLElement {
  constructor() {
    super();
    this._hass = this._f = this._p = null;
    this._c = {};
    this._shown = undefined; // aktuell im Feld „Anfangsbestand“ angezeigter Wert
    this._empty = new Set(); // vom Nutzer geleerte Felder (werden nicht sofort mit dem Standard gefüllt)
    this.attachShadow({ mode: "open" });
  }

  set hass(h) {
    const changed = lang(this._hass) !== lang(h);
    this._hass = h;
    if (!this._f) return;
    if (changed) this._sync();
    else this._f.forEach((x) => (x.form.hass = h));
  }

  setConfig(c) {
    this._c = { ...(c || {}) };
    for (const k of [...this._empty]) if (!BLANK(this._c[k])) this._empty.delete(k);
    if (!this._f) this._build();
    this._sync();
  }

  _total(d) {
    const n = Number(d.tank_count), c = Number(d.tank_capacity);
    return Number.isFinite(n) && Number.isFinite(c) && n >= 1 && c > 0 ? totalOf(clamp(Math.round(n), 1, 20), c) : null;
  }

  // Fehlende Keys zeigen den Wert, den die Karte tatsächlich verwendet
  _data() {
    const d = { ...DEF, ...this._c };
    for (const k in ENUM) if (!ENUM[k].includes(d[k])) d[k] = DEF[k]; // ungültiger Wert (z. B. entfernte Farben): Karte nutzt den Standard
    const total = this._total(d);
    if (total !== null && !this._empty.has("initial_fill")) {
      // fehlender Anfangsbestand = voll; Anzeige nie größer als die Gesamtkapazität (auch bei bestehenden Karten)
      if (BLANK(d.initial_fill) || Number(d.initial_fill) > total) d.initial_fill = total;
    }
    d.font_size = fontPct(d.font_size);
    if (typeof d.custom_color === "string") d.custom_color = rgbOf(d.custom_color); // Hex aus der YAML → [r,g,b] für den Farbwähler
    for (const k of this._empty) if (BLANK(this._c[k])) d[k] = undefined; // geleerte Felder bleiben leer
    return d;
  }

  _schema(id, d, lg) {
    const S = (name, vs) => ({ name, selector: { select: { options: vs.map((v) => ({ value: v, label: tr(lg, "o_" + v) })) } } });
    const nb = (min, max, step = 1) => ({ number: { min, ...(max !== undefined && { max }), step, mode: "box" } });
    const sl = (min, max, step, unit) => ({ number: { min, max, step, mode: "slider", unit_of_measurement: unit } });
    const b = (name) => ({ name, selector: { boolean: {} } });
    const g = (name, schema) => ({ type: "grid", name, flatten: true, schema });
    const ts = S("tank_style", STYLES);
    return {
      top: [{ name: "title", selector: { text: {} } }],
      tank: [
        S("tank_form", FORMS),
        // Schalter „Gas-Tank“ erscheint rechts neben der Tankart, nur bei Metalltank + Kapsel + genau einem Tank
        d.tank_style === "metal" && d.tank_form === "capsule" && Number(d.tank_count) === 1 ? g("style_row", [ts, b("gas_tank")]) : ts,
        g("tank_size", [{ name: "tank_count", selector: nb(1, 20) }, { name: "tank_capacity", selector: nb(.01, undefined, "any") }]),
        { name: "tank_label", selector: { text: {} } }
      ],
      content: [
        S("content_type", CONTENTS),
        ...(d.content_type === "custom" ? [{ name: "custom_color", selector: { color_rgb: {} } }] : []),
        ...(PILE[d.content_type] ? [] : [S("liquid_style", LIQUIDS)]), // bei Pellets/Hackschnitzel ohne Wirkung → ausgeblendet
        S("sensor_mode", MODES),
        { name: d.sensor_mode === "consumption" ? "consumption_sensor" : "level_sensor", selector: { entity: { domain: "sensor" } } },
        { name: "initial_fill", selector: nb(0, this._total(d) ?? undefined, "any") }
      ],
      display: [
        S("unit", UNITS), b("show_title"), g("display_top", [b("show_max"), b("show_current")]),
        g("display_bottom", [b("show_fill_level"), b("show_consumption")]), b("show_tank_label"), b("show_unittank"),
        { name: "theme", selector: { theme: {} } }, { name: "font_size", selector: sl(50, 200, 5, "%") }
      ],
      animation: [
        b("animation"), ...(d.animation ? [{ name: "animation_interval", selector: sl(5, 60, 1, "s") }] : []),
        b("bubbles"), ...(d.bubbles ? [{ name: "bubble_amount", selector: sl(1, 8, 1) }] : [])
      ]
    }[id];
  }

  // nächster scrollbarer Vorfahre (auch über Shadow-DOM-Grenzen hinweg)
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
    st.textContent = "ha-form{display:block;margin:8px 0}ha-expansion-panel{display:block;margin:8px 0;--expansion-panel-content-padding:0 12px 12px}ha-expansion-panel[hidden]{display:none}";
    const root = el("div");
    this._f = [];
    this._p = [];

    const add = (parent, id) => {
      const form = document.createElement("ha-form");
      form.computeLabel = (s) => tr(lang(this._hass), s.name);
      form.computeHelper = (s) => TXT[lang(this._hass)]["h_" + s.name];
      form.addEventListener("value-changed", (e) => { e.stopPropagation(); this._changed(e.detail?.value); });
      parent.append(form);
      this._f.push({ id, form });
    };

    add(root, "top");
    for (const id of ["tank", "content", "display", "animation"]) {
      const p = document.createElement("ha-expansion-panel");
      p.outlined = true;
      p.expanded = false;
      p.addEventListener("expanded-changed", (e) => {
        e.stopPropagation();
        if (!(e.detail?.expanded ?? p.expanded)) return;
        // Beim Schließen der anderen Bereiche bleibt die Kopfzeile des geöffneten Bereichs an derselben Bildschirmstelle
        const sp = this._scroller(), y = p.getBoundingClientRect().top, t0 = performance.now();
        this._p.forEach((x) => { if (x.p !== p) x.p.expanded = false; });
        const fix = () => {
          if (sp) sp.scrollTop += p.getBoundingClientRect().top - y;
          if (performance.now() - t0 < 500) requestAnimationFrame(fix);
        };
        fix();
      });
      this._p.push({ id, p });
      add(p, id);
      root.append(p);
    }
    this.shadowRoot.replaceChildren(st, root);
  }

  _sync() {
    const lg = lang(this._hass), d = this._data();
    this._shown = d.initial_fill;
    this._f.forEach(({ id, form }) => { form.hass = this._hass; form.data = d; form.schema = this._schema(id, d, lg); });
    const ok = !PILE[d.content_type];
    this._p.forEach(({ id, p }) => {
      p.header = tr(lg, "s_" + id);
      if (id === "animation") { p.hidden = !ok; if (!ok) p.expanded = false; }
    });
  }

  // Anfangsbestand wird nur begrenzt, wenn das Feld selbst geändert wurde.
  // Ändert sich nur Kapazität/Anzahl, bleibt der gespeicherte Wert erhalten (Tippen von „12“ zerstört ihn nicht).
  _changed(value) {
    if (!value || typeof value !== "object") return;
    const next = { ...value }, reset = [];
    for (const k of ["title", "tank_label", "tank_count", "tank_capacity", "initial_fill"]) { // leer = Standard auf der Karte (Anfangsbestand: „voll“), im Editor bleibt das Feld leer
      if (!BLANK(next[k])) this._empty.delete(k);
      else { if (k in value) this._empty.add(k); delete next[k]; }
    }
    for (const k in ENUM) if (BLANK(next[k])) { reset.push(k); delete next[k]; } // „X“ im Dropdown → Standardwert
    const fill = next.initial_fill, stored = this._c.initial_fill;
    if (fill !== undefined) {
      if (fill === this._shown) {
        // Feld nicht angefasst: gespeicherten Wert behalten (oder weiter „voll“ bleiben)
        if (BLANK(stored)) delete next.initial_fill; else next.initial_fill = stored;
      } else {
        // Nutzer hat den Wert geändert: über der Gesamtkapazität → Maximum eintragen
        const total = this._total(next), n = Number(fill);
        if (total !== null && Number.isFinite(n)) {
          next.initial_fill = clamp(n, 0, total);
          if (next.initial_fill !== n) reset.push("initial_fill");
        }
      }
    }
    this._c = next;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: next }, bubbles: true, composed: true }));
    this._sync();
    if (reset.length) {
      // Lit schreibt nur bei geändertem Wert ins Feld: Felder kurz leeren, damit Standard bzw. Maximum wirklich erscheinen
      const e = Object.fromEntries(reset.map((k) => [k, undefined]));
      this._f.forEach(({ form }) => { form.data = { ...this._data(), ...e }; });
      setTimeout(() => this._f.forEach(({ form }) => { form.data = this._data(); }), 40);
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
