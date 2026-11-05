"use strict";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const root = document.documentElement;
const NS = "http://www.w3.org/2000/svg";
const money = n => n.toLocaleString("ro-RO") + " lei";

const DATA = {
  light: {
    h1: "Soarele te așteaptă la capătul drumului.",
    lead: "Plaje, insule și ape calde. Noi alegem zborul, cazarea și transferul, iar tu îți faci doar bagajul.",
    cta: "Vezi destinațiile de zi",
    chip: "Plaje de la 1.290 lei",
    dtitle: "Destinații de zi: soare și mare",
    dsub: "Prețul include zbor, cazare și transfer, pe persoană, în cameră dublă.",
    marquee: ["Santorini", "Maldive", "Zanzibar", "Bali", "Algarve", "Amalfi", "Mauritius"],
    tabs: [
      ["Insule", [
        ["Santorini", "Grecia", 7, 2890, "🏝️", 4.9, "Favorit"],
        ["Creta", "Grecia", 7, 2390, "⛱️", 4.7, "Ofertă", 2790],
        ["Maldive", "Maldive", 9, 7490, "🌴", 5.0],
        ["Zanzibar", "Tanzania", 8, 4990, "🐚", 4.8, "Nou"]
      ]],
      ["Litoral", [
        ["Algarve", "Portugalia", 7, 2690, "🌊", 4.8],
        ["Split și Hvar", "Croația", 6, 2190, "⛵", 4.7, "Ofertă", 2490],
        ["Malaga", "Spania", 7, 2490, "🌞", 4.6],
        ["Coasta Amalfi", "Italia", 6, 3890, "🍋", 4.9, "Favorit"]
      ]],
      ["Exotic", [
        ["Bali", "Indonezia", 10, 6290, "🌺", 4.9, "Favorit"],
        ["Phuket", "Thailanda", 10, 5890, "🥥", 4.7],
        ["Dubai", "Emiratele Arabe", 6, 4390, "🏜️", 4.6, "Nou"],
        ["Mauritius", "Mauritius", 9, 6990, "🐠", 4.9]
      ]]
    ],
    ititle: "Circuit în Grecia, 10 zile",
    isub: "Un traseu pe insule, cu zborurile și feribotul incluse. Derulează ca să vezi drumul.",
    stops: [["Atena", "Zilele 1–2", "Acropole și o cină în Plaka."], ["Santorini", "Zilele 3–5", "Apus în Oia și plajă neagră."], ["Creta", "Zilele 6–8", "Plaje, taverne și sate de munte."], ["Rodos", "Zilele 9–10", "Orașul vechi și ultima baie."]],
    total: "4.290 lei / persoană"
  },
  dark: {
    h1: "Orașele se aprind abia când se face noapte.",
    lead: "City break-uri, creste de munte și cer cu aurore. Plecăm când se întunecă și ne întoarcem cu povești.",
    cta: "Vezi destinațiile de noapte",
    chip: "City break de la 890 lei",
    dtitle: "Destinații de noapte: orașe și munți",
    dsub: "Prețul include zbor sau transport, cazare și transfer, pe persoană, în cameră dublă.",
    marquee: ["Tokyo", "New York", "Paris", "Praga", "Dolomiți", "Tromsø", "Islanda"],
    tabs: [
      ["Orașe", [
        ["Tokyo", "Japonia", 8, 5990, "🗼", 4.9, "Favorit"],
        ["New York", "SUA", 6, 6490, "🗽", 4.8],
        ["Paris", "Franța", 4, 2390, "🥐", 4.7, "Ofertă", 2790],
        ["Praga", "Cehia", 4, 1590, "🏰", 4.8]
      ]],
      ["Munți", [
        ["Dolomiți", "Italia", 6, 3190, "🏔️", 4.9],
        ["Alpi elvețieni", "Elveția", 6, 4490, "🚠", 4.8, "Nou"],
        ["Tatra", "Polonia", 4, 1390, "⛰️", 4.6, "Ofertă", 1590],
        ["Făgăraș", "România", 3, 890, "🥾", 4.7]
      ]],
      ["Aurore", [
        ["Tromsø", "Norvegia", 5, 5290, "🌌", 4.9, "Favorit"],
        ["Islanda", "Islanda", 6, 6890, "🧊", 4.9],
        ["Laponia", "Finlanda", 5, 6190, "🦌", 4.8, "Nou"],
        ["Lofoten", "Norvegia", 6, 5790, "🎣", 4.7]
      ]]
    ],
    ititle: "Circuit în Europa Centrală, 9 zile",
    isub: "Patru orașe cu lumini de seară, cu trenul între ele. Derulează ca să vezi drumul.",
    stops: [["Praga", "Zilele 1–3", "Podul Carol la lumina felinarelor."], ["Viena", "Zilele 4–5", "Cafenele, muzee și o seară la operă."], ["Budapesta", "Zilele 6–7", "Băi termale sub cerul nopții."], ["Cracovia", "Zilele 8–9", "Piața Mare și orașul vechi."]],
    total: "3.790 lei / persoană"
  }
};

let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const mk = (tag, attrs, parent) => {
  const el = document.createElementNS(NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  parent.appendChild(el);
  return el;
};

function buildScene() {
  for (let i = 0; i < 26; i++) {
    const c = mk("circle", { cx: rnd() * 480, cy: rnd() * 300, r: 0.8 + rnd() * 1.6 }, $("#stars"));
    c.style.setProperty("--d", (rnd() * 3).toFixed(1) + "s");
  }
  [[60, 18, 70], [150, 26, 90], [100, 14, 80]].forEach(([y, dur, delay], i) => {
    const g = mk("g", { class: "cloud" }, $("#clouds"));
    g.style.cssText = `--y:${y + i * 40}px;animation-duration:${dur + 10}s;animation-delay:-${delay / 3 + i * 8}s`;
    mk("ellipse", { cx: 0, cy: 0, rx: 34, ry: 12 }, g);
    mk("ellipse", { cx: 22, cy: -8, rx: 22, ry: 12 }, g);
    mk("ellipse", { cx: -20, cy: -6, rx: 18, ry: 10 }, g);
  });
  const city = $("#city");
  mk("rect", { class: "bld", x: 0, y: 520, width: 480, height: 40 }, city);
  for (let x = -4; x < 480; ) {
    const w = 30 + rnd() * 20, h = 70 + rnd() * 130;
    mk("rect", { class: "bld", x, y: 520 - h, width: w, height: h }, city);
    for (let wy = 520 - h + 10; wy < 506; wy += 14)
      for (let wx = x + 6; wx < x + w - 8; wx += 10)
        if (rnd() < 0.36) {
          const win = mk("rect", { class: "win" + (rnd() < 0.2 ? " b" : ""), x: wx, y: wy, width: 5, height: 7 }, city);
          win.style.setProperty("--d", (rnd() * 3).toFixed(1) + "s");
        }
    x += w + 3;
  }
}
buildScene();

let tabIndex = 0;

function renderDests(mode) {
  const d = DATA[mode];
  $("#tabs").innerHTML = d.tabs.map(([n], i) =>
    `<button role="tab" class="chip" aria-selected="${i === tabIndex}" data-i="${i}">${n}</button>`).join("");
  $("#dests").innerHTML = d.tabs[tabIndex][1].map(([n, c, nights, p, em, r, tag, old], i) => `
    <article class="dest pop" style="--i:${i}">
      <div class="cover"><span aria-hidden="true">${em}</span>${tag ? `<em class="tagc">${tag}</em>` : ""}</div>
      <div class="dbody">
        <h3>${n}</h3>
        <div class="meta"><span>${c}</span><span>${nights} nopți</span><span>${r.toFixed(1)} din 5</span></div>
        <div class="dfoot">
          <p class="price">${old ? `<s>${money(old)}</s>` : ""}${money(p)}</p>
          <button class="btn" data-n="${n}">Cere ofertă</button>
        </div>
      </div>
    </article>`).join("");
}

function fillSelect() {
  const names = [...DATA.light.tabs, ...DATA.dark.tabs].flatMap(([, l]) => l.map(x => x[0]));
  $("#dsel").innerHTML = names.map(n => `<option>${n}</option>`).join("");
}
fillSelect();

$("#tabs").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  tabIndex = +b.dataset.i;
  renderDests(root.dataset.theme);
});

$("#dests").addEventListener("click", e => {
  const b = e.target.closest("button[data-n]");
  if (!b) return;
  $("#dsel").value = b.dataset.n;
  $("#contact").scrollIntoView({ behavior: "smooth" });
});

const route = $("#route");
const L = route.getTotalLength();
route.style.strokeDasharray = L;
let stopEls = [];

function renderItin(mode) {
  const d = DATA[mode];
  $("#ititle").textContent = d.ititle;
  $("#isub").textContent = d.isub;
  $("#itotal").textContent = "Pachet complet: " + d.total;
  $("#stops").innerHTML = d.stops.map(([n, z, t]) =>
    `<li><b>${n}</b><time>${z}</time><span>${t}</span></li>`).join("");
  $("#stopsg").innerHTML = "";
  stopEls = d.stops.map(([n], i) => {
    const p = route.getPointAtLength(L * i / 3);
    const g = mk("g", { class: "stop" }, $("#stopsg"));
    mk("circle", { cx: p.x, cy: p.y, r: 9 }, g);
    const t = mk("text", { x: Math.min(Math.max(p.x, 40), 440), y: p.y - 18, "text-anchor": "middle" }, g);
    t.textContent = n;
    return g;
  });
  onScroll();
}

function render(mode) {
  const d = DATA[mode];
  root.dataset.theme = mode;
  $("#mode").setAttribute("aria-checked", mode === "dark");
  $("#h1").textContent = d.h1;
  $("#lead").textContent = d.lead;
  $("#cta1").textContent = d.cta;
  $("#chip").textContent = d.chip;
  $("#dtitle").textContent = d.dtitle;
  $("#dsub").textContent = d.dsub;
  tabIndex = 0;
  renderDests(mode);
  const words = d.marquee.map(w => `<span>${w}</span><i></i>`).join("");
  $("#marquee").innerHTML = words + words;
  renderItin(mode);
}

function save(m) { try { localStorage.setItem("zari-mode", m); } catch (e) {} }
function saved() { try { return localStorage.getItem("zari-mode"); } catch (e) { return null; } }

$$(".reveal").forEach(el => {
  const sibs = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
  el.style.setProperty("--i", sibs.indexOf(el));
});

function count(el) {
  const to = +el.dataset.to, dec = +el.dataset.dec || 0, t0 = performance.now();
  (function step(t) {
    const k = Math.min((t - t0) / 1400, 1), v = to * (1 - Math.pow(1 - k, 3));
    el.textContent = dec ? (v / 10).toFixed(1) : Math.round(v);
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}

const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  const n = e.target.querySelector(".num");
  if (n) count(n);
  io.unobserve(e.target);
}), { threshold: 0.15 });
$$(".reveal").forEach(el => io.observe(el));

const clamp = v => Math.min(Math.max(v, 0), 1);
let busy = false;

function onScroll() {
  if (busy) return;
  busy = true;
  requestAnimationFrame(() => {
    const y = scrollY, max = root.scrollHeight - innerHeight;
    root.style.setProperty("--sy", y);
    root.style.setProperty("--p", max > 0 ? y / max : 0);

    const tl = $("#timeline").getBoundingClientRect();
    $("#timeline").style.setProperty("--tl", clamp((innerHeight * 0.7 - tl.top) / tl.height));

    const r = $("#itinerar").getBoundingClientRect();
    const k = clamp((innerHeight * 0.85 - r.top) / (r.height * 0.85));
    route.style.strokeDashoffset = L * (1 - k);
    const pt = route.getPointAtLength(L * k);
    $("#jet").setAttribute("transform", `translate(${pt.x - 13} ${pt.y + 8})`);
    stopEls.forEach((g, i) => g.classList.toggle("on", k >= i / 3 - 0.01));
    $$("#stops li").forEach((li, i) => li.classList.toggle("on", k >= i / 3 - 0.01));
    busy = false;
  });
}
addEventListener("scroll", onScroll, { passive: true });

render(saved() || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

$("#mode").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  render(next);
  save(next);
});

$("#rez").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  $("#rmsg").textContent = `Mulțumim, ${f.get("n")}! Am notat cererea pentru ${f.get("dest")}, ${f.get("p")} persoane, plecare pe ${f.get("d")}. (Demo: cererea nu e reală.)`;
  e.target.reset();
});