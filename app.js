/* =========================
   STATE + PROGRESS
========================= */
const STATE_KEY = "rk_modules_quiz_sheet_v3";

const badges = [
  { min: 0,  label: "—" },
  { min: 5,  label: "Bronze: Starter" },
  { min: 10, label: "Silber: Anwender:in" },
  { min: 15, label: "Gold: Audit-Ready" },
  { min: 20, label: "Platin: Profi" },
];

let state = loadState();

/* =========================
   MODULE META
========================= */
const modules = {
  m1: { title: "Modul 1 – Überblick", desc: "Zweck, Aufbau, Ampellogik und grundlegende Regeln im Rechtskataster." },
  m2: { title: "Modul 2 – Excel-Basics", desc: "Dropdowns, Standardisierung und schnelle Pflege (z.B. Last Check Shortcut)." },
  m3: { title: "Modul 3 – GAP & Risiko", desc: "Wie Status & GAPs interpretiert werden und warum Farben Prioritäten sichtbar machen." },
  m4: { title: "Modul 4 – Verantwortliche", desc: "Abteilung → Verantwortlichkeit automatisch; warum das Feld gesperrt ist." },
  m5: { title: "Modul 5 – Audit-Ready", desc: "Warum ID/Last Check/Standards Audit-relevant sind und wie man sauber dokumentiert." },
};

/* =========================
   QUIZ DATA (20 Fragen) – mit Modul-Zuordnung
========================= */
const questions = [
  // Modul 1 (Überblick) – 4 Fragen
  { module:"m1", title:"Frage 1", points:1,
    question:"Welche Spalte zeigt am ehesten, wo Handlungsbedarf besteht?",
    options:["Status Quo","GAP Analyse","Paragraph / Artikel"], correct:1 },
  { module:"m1", title:"Frage 2", points:1,
    question:"Wofür steht die Ampellogik (Rot/Gelb/Grün) im Status Quo?",
    options:["Für die Wichtigkeit/Priorität","Für die Schriftgröße","Für die Anzahl der Spalten"], correct:0 },
  { module:"m1", title:"Frage 3", points:1,
    question:"Welche Status-Quo-Option steht im Dropdown ganz oben und wird grün?",
    options:["In Bearbeitung","Implementiert","Nicht vorhanden"], correct:1 },
  { module:"m1", title:"Frage 4", points:1,
    question:"Warum ist „Nicht vorhanden“ rot?",
    options:["Weil hier noch Arbeit nötig ist (kritisch)","Weil es schöner aussieht","Weil Excel rot bevorzugt"], correct:0 },

  // Modul 2 (Excel-Basics) – 4 Fragen
  { module:"m2", title:"Frage 5", points:1,
    question:"Welche drei Auswahlmöglichkeiten gibt es in „Status Quo“?",
    options:["Implementiert / In Bearbeitung / Nicht vorhanden","Done / Doing / Todo","OK / Warnung / Kritisch"], correct:0 },
  { module:"m2", title:"Frage 6", points:1,
    question:"Welche Status-Quo-Auswahl färbt sich gelb (Beobachtung nötig)?",
    options:["Implementiert","In Bearbeitung","Nicht vorhanden"], correct:1 },
  { module:"m2", title:"Frage 7", points:1,
    question:"Wie füllt man „Last Check“ am schnellsten mit dem aktuellen Datum (Windows)?",
    options:["Alt + Enter","Strg + Punkt","Strg + Shift + S"], correct:1 },
  { module:"m2", title:"Frage 8", points:1,
    question:"Warum sind Dropdowns in einem Rechtskataster besonders sinnvoll?",
    options:["Einheitliche Werte, weniger Fehler","Mehr Farben","Damit Tabellen breiter werden"], correct:0 },

  // Modul 3 (GAP & Risiko) – 4 Fragen
  { module:"m3", title:"Frage 9", points:1,
    question:"Welche Status-Quo-Auswahl färbt sich rot (höchster Handlungsbedarf)?",
    options:["Implementiert","In Bearbeitung","Nicht vorhanden"], correct:2 },
  { module:"m3", title:"Frage 10", points:1,
    question:"Was bedeutet „Implementiert“ inhaltlich am ehesten?",
    options:["Umgesetzt, meist nur noch überwachen","Nicht vorhanden","Darf nicht umgesetzt werden"], correct:0 },
  { module:"m3", title:"Frage 11", points:1,
    question:"Was bedeutet „In Bearbeitung“ inhaltlich am ehesten?",
    options:["Fertig, kein Monitoring nötig","Läuft – muss beobachtet werden, bis es umgesetzt ist","Wird automatisch gelöscht"], correct:1 },
  { module:"m3", title:"Frage 12", points:1,
    question:"Welche Aussage passt am besten zur Spalte „GAP Analyse“?",
    options:["Hier stehen Lücken/To-dos und Maßnahmenbedarf","Hier stehen nur Überschriften","Hier steht die ID-Logik"], correct:0 },

  // Modul 4 (Verantwortliche) – 4 Fragen
  { module:"m4", title:"Frage 13", points:1,
    question:"Was passiert automatisch, wenn man eine Abteilung auswählt?",
    options:["Die ID wird zufällig","Verantwortlichkeit wird automatisch gesetzt","Zyklus wird gelöscht"], correct:1 },
  { module:"m4", title:"Frage 14", points:1,
    question:"Warum darf man die Spalte „Verantwortlichkeit“ nicht manuell verändern?",
    options:["Weil dort eine Formel/Automatik liegt","Weil sie unwichtig ist","Weil es nur Deko ist"], correct:0 },
  { module:"m4", title:"Frage 15", points:1,
    question:"Welche Aussage ist richtig zur Abteilungs-Liste (Dropdown)?",
    options:["Man darf nur freie Texte eingeben","Es ist eine feste LegalTegrity-Liste","Sie wird automatisch aus E-Mails erzeugt"], correct:1 },
  { module:"m4", title:"Frage 16", points:1,
    question:"Wenn Abteilung = „Finanzen / Controlling“, wer wird automatisch verantwortlich?",
    options:["Lisa","Birgit","Thomas"], correct:1 },

  // Modul 5 (Audit-Ready) – 4 Fragen
  { module:"m5", title:"Frage 17", points:1,
    question:"Welche vier Optionen gibt es im Dropdown „Zyklus“?",
    options:["Jährlich / Halbjährlich / Quartalsweise / Monatlich","Täglich / Wöchentlich / Monatlich / Jährlich","Sofort / Später / Bald / Nie"], correct:0 },
  { module:"m5", title:"Frage 18", points:1,
    question:"Welche Zyklus-Option färbt sich gelb?",
    options:["Quartalsweise","Monatlich","Halbjährlich"], correct:0 },
  { module:"m5", title:"Frage 19", points:1,
    question:"Welche Zyklus-Option färbt sich rot (meiste Prüfungen)?",
    options:["Jährlich","Quartalsweise","Monatlich"], correct:2 },
  { module:"m5", title:"Frage 20", points:1,
    question:"Warum ist die Spalte „ID“ wichtig?",
    options:["Eindeutige Referenz (z.B. in E-Mails) & bessere Filterung","Damit Status automatisch grün ist","Damit Abteilungen verschwinden"], correct:0 },
];

/* =========================
   DOM REFERENCES
========================= */
const moduleTitle = document.getElementById("moduleTitle");
const moduleDesc  = document.getElementById("moduleDesc");

const questionNav = document.getElementById("questionNav");
const qTitle = document.getElementById("qTitle");
const qQuestion = document.getElementById("qQuestion");
const qOptions = document.getElementById("qOptions");
const qResult = document.getElementById("qResult");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");

const navSheet = document.getElementById("navSheet");
const backToQuizBtn = document.getElementById("backToQuizBtn");
const resetBtn = document.getElementById("resetBtn");

const challengeBtn = document.getElementById("challengeCompleteBtn");
const challengeResult = document.getElementById("challengeResult");

/* =========================
   MODULE NAV
========================= */
let currentModule = state.currentModule ?? "m1";
let currentIndexWithinModule = state.currentIndexWithinModule ?? 0;

document.querySelectorAll(".modulebtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const mod = btn.dataset.module;
    setModule(mod);
  });
});

function setModule(mod) {
  currentModule = mod;
  state.currentModule = mod;
  state.currentIndexWithinModule = 0;
  saveState();

  document.querySelectorAll(".modulebtn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.modulebtn[data-module="${mod}"]`)?.classList.add("active");

  if (mod === "challenge") {
    showView("challenge");
    return;
  }

  showView("quiz");
  updateModuleHeader();
  buildQuestionNav();
  renderQuestion();
}

/* =========================
   QUIZ FILTERED BY MODULE
========================= */
function getModuleQuestions(mod) {
  return questions.filter(q => q.module === mod);
}

function updateModuleHeader() {
  const meta = modules[currentModule];
  moduleTitle.textContent = meta?.title ?? "Modul";
  moduleDesc.textContent  = meta?.desc ?? "";
}

/* Sidebar list: questions in current module */
function buildQuestionNav() {
  const list = getModuleQuestions(currentModule);
  questionNav.innerHTML = "";

  list.forEach((q, idx) => {
    const btn = document.createElement("button");
    btn.className = "navbtn";
    btn.textContent = q.title;

    if (idx === currentIndexWithinModule) btn.classList.add("active");

    // mark done
    const globalIdx = questions.indexOf(q);
    if (state.answered?.[globalIdx]?.done) btn.style.opacity = "0.9";

    btn.addEventListener("click", () => {
      currentIndexWithinModule = idx;
      state.currentIndexWithinModule = idx;
      saveState();
      renderQuestion();
      buildQuestionNav();
      showView("quiz");
    });

    questionNav.appendChild(btn);
  });
}

/* Render active question */
function renderQuestion() {
  const list = getModuleQuestions(currentModule);
  const q = list[currentIndexWithinModule];

  // Safety fallback
  if (!q) return;

  const globalIdx = questions.indexOf(q);
  const ans = state.answered?.[globalIdx];

  qTitle.textContent = q.title;
  qQuestion.textContent = q.question;
  qResult.textContent = "";
  qOptions.innerHTML = "";

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="q" value="${i}" ${ans?.choice === i ? "checked" : ""} />
      <span>${opt}</span>
    `;
    qOptions.appendChild(label);
  });

  const done = !!ans?.done;
  qOptions.querySelectorAll("input").forEach(inp => inp.disabled = done);
  checkBtn.disabled = done;

  if (done) {
    qResult.textContent = ans.correct
      ? `Richtig ✅ (+${q.points} Punkt)`
      : `Falsch ❌ (0 Punkte) – richtige Antwort: ${q.options[q.correct]}`;
  }
}

checkBtn.addEventListener("click", () => {
  const list = getModuleQuestions(currentModule);
  const q = list[currentIndexWithinModule];
  const globalIdx = questions.indexOf(q);

  const checked = qOptions.querySelector('input[name="q"]:checked');
  if (!checked) { qResult.textContent = "Bitte wähle eine Antwort aus."; return; }

  const choice = Number(checked.value);
  const correct = choice === q.correct;

  state.answered = state.answered || {};
  if (state.answered[globalIdx]?.done) return;

  state.answered[globalIdx] = { done:true, choice, correct };
  if (correct) state.points = (state.points || 0) + q.points;

  saveState();
  updateProgress();
  renderQuestion();
  buildQuestionNav();
});

nextBtn.addEventListener("click", () => {
  const list = getModuleQuestions(currentModule);
  if (currentIndexWithinModule < list.length - 1) {
    currentIndexWithinModule++;
  } else {
    // jump to next module if available
    const order = ["m1","m2","m3","m4","m5"];
    const pos = order.indexOf(currentModule);
    if (pos >= 0 && pos < order.length - 1) {
      setModule(order[pos+1]);
      return;
    }
  }

  state.currentIndexWithinModule = currentIndexWithinModule;
  saveState();
  renderQuestion();
  buildQuestionNav();
});

/* =========================
   VIEWS
========================= */
function showView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("view-" + name).classList.add("active");
}

navSheet.addEventListener("click", () => showView("sheet"));
backToQuizBtn.addEventListener("click", () => showView("quiz"));

/* =========================
   CHALLENGE
========================= */
challengeBtn?.addEventListener("click", () => {
  if (state.challengeDone) {
    challengeResult.textContent = "Challenge wurde bereits abgeschlossen ✅";
    return;
  }
  state.challengeDone = true;
  state.points = (state.points || 0) + 2; // Bonus
  saveState();
  updateProgress();
  challengeResult.textContent = "Challenge abgeschlossen ✅ (+2 Bonuspunkte)";
});

/* =========================
   RESET
========================= */
resetBtn.addEventListener("click", () => {
  state = { points:0, currentModule:"m1", currentIndexWithinModule:0, answered:{}, sheetData:null, challengeDone:false };
  saveState();
  location.reload();
});

/* =========================
   PROGRESS UI
========================= */
function updateProgress() {
  const points = state.points || 0;
  const max = questions.reduce((s,q)=> s + q.points, 0) + 2; // +2 Challenge Bonus möglich

  document.getElementById("pointsLabel").textContent = `${points} Punkte`;
  const badge = [...badges].reverse().find(b => points >= b.min)?.label ?? "—";
  document.getElementById("badgeLabel").textContent = badge;

  const pct = Math.min(100, Math.round((points / max) * 100));
  document.getElementById("progressFill").style.width = `${pct}%`;
}

/* =========================
   SHEET (Excel-like structure)
========================= */

/* Abteilungen -> Verantwortliche (deine Namen) */
const deptToOwner = {
  "Product Management": "Thomas",
  "Customer Success": "Hannes",
  "Sales / CS / Marketing-Support": "Pia",
  "Sales Support": "Pia",
  "Marketing & Sales Automation": "Lisa",
  "Finanzen / Controlling": "Birgit",
  "Digital Marketing / Social Media": "Lisa",
  "Outbound-Telefonie": "Pia",
  "Design, Film & Media": "Lisa",
  "Sales Partner": "Thomas",
  "Agenturen": "Lisa",
};

const STATUS = ["Implementiert", "In Bearbeitung", "Nicht vorhanden"];
const CYCLE  = ["Jährlich", "Halbjährlich", "Quartalsweise", "Monatlich"];

/* Columns like the screenshot */
const columns = [
  "ID","Abteilung","Prozess","Prozessschritt","Betroff / Thema","Rechtsgebiet",
  "Paragraph / Artikel","Beschreibung","Status Quo","Last Check","GAP Analyse",
  "Verantwortlichkeit","Dokumentation","Zyklus","Anmerkung"
];

/* Which headers are yellow in screenshot */
const yellowHeaderCols = new Set(["Status Quo","Last Check","GAP Analyse","Verantwortlichkeit"]);

const defaultRows = [
  [1,"Product Management","Grundsätze","Rechtsmäßigkeit der Verarbeitung","Newsletter/Produktupdates","Datenschutzrecht","Art. 6 DSGVO; §25 TTDSG",
   "Versand von Produktinformationen/Updates; Double-Opt-in; Nachweis der Einwilligung","In Bearbeitung","08.01.26","Policy klar dokumentieren","", "", "Halbjährlich","Tracking nur mit Einwilligung; DOI-Nachweis archivieren"],
  [2,"Customer Success","Grundsätze","Verarbeitung besonderer Kategorien personenbezogener Daten","Hinweisgeber","Datenschutzrecht","Art. 6, 9 DSGVO",
   "Optional Identitätsverifikation bei bestimmten Meldungen; Verarbeitung minimiert Identitätsdaten","Nicht vorhanden","08.01.26","", "", "", "Jährlich",""],
  [3,"Finanzen / Controlling","Grundsätze","Verarbeitung besonderer Kategorien personenbezogener Daten","Zahlungsdaten","DSGVO","Art. 6, 32 DSGVO",
   "Verarbeitung erforderlicher Zahlungsdaten; ggf. PCI-DSS Vorgaben","Nicht vorhanden","08.01.26","Falls Third-Party Payment Provider: AVV prüfen","", "", "Jährlich",""],
  [4,"Sales Support","Grundsätze","Verarbeitung besonderer Kategorien (interne Meldungen)","Beschäftigte","Datenschutzrecht","Art. 6 lit. c DSGVO; §26 BDSG",
   "Verarbeitung von Beschäftigtendaten zur Aufklärung interner Vorgänge","In Bearbeitung","08.01.26","Unternehmensinterne Compliance-Prozesse dokumentieren","", "", "Jährlich",""],
  [5,"Marketing & Sales Automation","Grundsätze","Grundsätze der Verarbeitung","Hinweisgeberdaten","Datenschutzrecht","Art. 5, 6 DSGVO",
   "Verarbeitung von Meldungen inkl. optional sensibler Daten; rechtliche Verpflichtung nach HinSchG","Implementiert","08.01.26","Prüfen Rechtsgrundlage für Art.10-Daten; Info besonders sensibel","", "", "Jährlich",""],
  [6,"Digital Marketing / Social Media","Grundsätze","Admin- und Zugriffslogs","Admin-Logs","Datenschutzrecht","Art. 5, 15, 30, 32 DSGVO",
   "Bereitstellen relevanter Logs zur Erfüllung von Auskunfts-/Nachweispflichten","Implementiert","08.01.26","Self-Service Portal ausbauen","", "", "Quartalsweise",""],
];

const sheetTable = document.getElementById("sheetTable");
const filterCol = document.getElementById("filterCol");
const filterVal = document.getElementById("filterVal");

let sheetRows = loadSheet();

function loadSheet() {
  if (state.sheetData && Array.isArray(state.sheetData)) return state.sheetData;

  const rows = structuredClone(defaultRows);
  // Auto-owner initial setzen
  rows.forEach(r => r[11] = deptToOwner[r[1]] || "");
  state.sheetData = rows;
  saveState();
  return rows;
}

function saveSheet() {
  state.sheetData = sheetRows;
  saveState();
}

function buildFilterOptions() {
  filterCol.innerHTML = "";
  columns.forEach((c, i) => {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = c;
    filterCol.appendChild(opt);
  });
}
buildFilterOptions();

function statusClass(val){
  if (val === "Implementiert") return "cell-ok";
  if (val === "In Bearbeitung") return "cell-warn";
  return "cell-bad";
}
function cycleClass(val){
  if (val === "Monatlich") return "cycle-bad";
  if (val === "Quartalsweise") return "cycle-warn";
  return "";
}

function renderSheet() {
  sheetTable.innerHTML = "";

  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  columns.forEach(c => {
    const th = document.createElement("th");
    th.textContent = c;
    if (yellowHeaderCols.has(c)) th.classList.add("hl");
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  sheetTable.appendChild(thead);

  const tbody = document.createElement("tbody");

  const colIdx = Number(filterCol.value || 0);
  const needle = (filterVal.value || "").toLowerCase();

  sheetRows.forEach((row, rIdx) => {
    const match = !needle || String(row[colIdx] ?? "").toLowerCase().includes(needle);
    if (!match) return;

    const tr = document.createElement("tr");

    for (let c = 0; c < columns.length; c++) {
      const colName = columns[c];

      // ID locked
      if (colName === "ID") {
        const td = document.createElement("td");
        td.textContent = String(row[c]);
        td.className = "locked";
        tr.appendChild(td);
        continue;
      }

      // Abteilung dropdown
      if (colName === "Abteilung") {
        const td = document.createElement("td");
        const sel = document.createElement("select");
        Object.keys(deptToOwner).forEach(d => {
          const opt = document.createElement("option");
          opt.value = d;
          opt.textContent = d;
          sel.appendChild(opt);
        });
        sel.value = row[c];
        sel.addEventListener("change", () => {
          sheetRows[rIdx][c] = sel.value;
          // Auto Verantwortlichkeit
          sheetRows[rIdx][11] = deptToOwner[sel.value] || "";
          saveSheet();
          renderSheet();
        });
        td.appendChild(sel);
        tr.appendChild(td);
        continue;
      }

      // Status Quo dropdown + ampelfarbe
      if (colName === "Status Quo") {
        const td = document.createElement("td");
        td.className = statusClass(row[c]);
        const sel = document.createElement("select");
        STATUS.forEach(s => {
          const opt = document.createElement("option");
          opt.value = s;
          opt.textContent = s;
          sel.appendChild(opt);
        });
        sel.value = row[c];
        sel.addEventListener("change", () => {
          sheetRows[rIdx][c] = sel.value;
          saveSheet();
          renderSheet();
        });
        td.appendChild(sel);
        tr.appendChild(td);
        continue;
      }

      // Zyklus dropdown + farbe
      if (colName === "Zyklus") {
        const td = document.createElement("td");
        td.className = cycleClass(row[c]);
        const sel = document.createElement("select");
        CYCLE.forEach(z => {
          const opt = document.createElement("option");
          opt.value = z;
          opt.textContent = z;
          sel.appendChild(opt);
        });
        sel.value = row[c];
        sel.addEventListener("change", () => {
          sheetRows[rIdx][c] = sel.value;
          saveSheet();
          renderSheet();
        });
        td.appendChild(sel);
        tr.appendChild(td);
        continue;
      }

      // Verantwortlichkeit locked auto
      if (colName === "Verantwortlichkeit") {
        const td = document.createElement("td");
        td.textContent = String(row[c] ?? "");
        td.className = "locked";
        tr.appendChild(td);
        continue;
      }

      // All other columns editable text
      const td = document.createElement("td");
      td.textContent = String(row[c] ?? "");
      td.contentEditable = "true";
      td.classList.add("editable");
      td.addEventListener("blur", () => {
        sheetRows[rIdx][c] = td.textContent.trim();
        saveSheet();
      });
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });

  sheetTable.appendChild(tbody);
}

filterCol.addEventListener("change", renderSheet);
filterVal.addEventListener("input", renderSheet);

/* =========================
   PERSISTENCE
========================= */
function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { points:0, currentModule:"m1", currentIndexWithinModule:0, answered:{}, sheetData:null, challengeDone:false };
    const s = JSON.parse(raw);
    if (!s.answered) s.answered = {};
    return s;
  } catch {
    return { points:0, currentModule:"m1", currentIndexWithinModule:0, answered:{}, sheetData:null, challengeDone:false };
  }
}
function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

/* =========================
   INIT
========================= */
updateProgress();
updateModuleHeader();
buildQuestionNav();
renderQuestion();
renderSheet();

// activate current module button styling
document.querySelectorAll(".modulebtn").forEach(b => b.classList.remove("active"));
document.querySelector(`.modulebtn[data-module="${currentModule}"]`)?.classList.add("active");

