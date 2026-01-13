/* =========================
   STATE + PROGRESS
========================= */
const STATE_KEY = "lt_modules_quiz_sheet_v4";

const badges = [
  { min: 0,  label: "—" },
  { min: 6,  label: "Bronze: Starter" },
  { min: 12, label: "Silber: Anwender:in" },
  { min: 18, label: "Gold: Audit-Ready" },
  { min: 25, label: "Platin: Profi" },
];

let state = loadState();

/* =========================
   MODULE META
========================= */
const modules = {
  m1: { title: "Modul 1 – Grundverständnis des Rechtskatasters", desc: "Warum das Rechtskataster existiert und wie Status/Last Check/IDs helfen." },
  m2: { title: "Modul 2 – Struktur & Interpretation", desc: "Wie man Prozesse einordnet, Dokumentation nutzt und Risiken zuverlässig erkennt." },
  m3: { title: "Modul 3 – Pflege & Aktualisierung", desc: "Wann Einträge gepflegt werden müssen, wer ändern darf und welche Felder Pflicht sind." },
  m4: { title: "Modul 4 – Navigation & effiziente Nutzung", desc: "Schnell finden, sinnvoll sortieren und konsistent arbeiten." },
  m5: { title: "Modul 5 – Governance, Rollen & Schnittstellen", desc: "Verantwortlichkeiten, Abhängigkeiten, Implementierung und Team-Relevanz." },
};

/* =========================
   QUIZ DATA (deine Fragen)
   - single: radio
   - multi: checkbox
   points: 1 pro Frage
========================= */
const questions = [
  // ✅ Modul 1 – 5 Fragen
  {
    module:"m1", title:"Frage 1", points:1, type:"single",
    question:"Wofür dient das Rechtskataster im Unternehmenskontext primär?",
    options:[
      "Zur Ablage juristischer Texte",
      "Zur strukturierten Übersicht aller Prozesse, Pflichten und Verantwortlichkeiten",
      "Zur Verteilung von Aufgaben an Mitarbeitende"
    ],
    correct:[1]
  },
  {
    module:"m1", title:"Frage 2", points:1, type:"single",
    question:"Was zeigt der „Status Quo“ sinnvollerweise an?",
    options:[
      "Den aktuellen Umsetzungsstand",
      "Die Priorität des Prozesses",
      "Die historische Entwicklung"
    ],
    correct:[0]
  },
  {
    module:"m1", title:"Frage 3", points:1, type:"single",
    question:"Welche Bedeutung hat das Feld „Last Check“?",
    options:[
      "Das Datum, wann die letzte Prüfung des Eintrags erfolgt ist",
      "Einen kommenden Audittermin",
      "Die interne Priorisierung"
    ],
    correct:[0]
  },
  {
    module:"m1", title:"Frage 4", points:1, type:"single",
    question:"Fall: Im Sheet „Compliance & Strafrecht“ siehst du beim Eintrag C&S 007: • Last Check = 01/01/2026 • Gap Analyse: „Lösch- und Sperrkonzept mit Fristen abgleichen“ • In der Realität wurde das Löschkonzept bereits aktualisiert – steht aber nicht in der Tabelle. Was wäre der richtige nächste Schritt?",
    options:[
      "Den Eintrag auf „Implementiert“ setzen",
      "„Last Check“ aktualisieren und Gap Analyse ergänzen (z. B. „erledigt / Umsetzung dokumentiert“)",
      "Den Prozess löschen, da er nicht mehr relevant ist"
    ],
    correct:[1]
  },
  {
    module:"m1", title:"Frage 5", points:1, type:"multi",
    question:"Was ist der Zweck von eindeutigen IDs wie „C&S 023“? (Mehrfachauswahl möglich)",
    options:[
      "Sie ermöglichen die Zuordnung über Filter, Suchfunktionen und Abteilungen hinweg",
      "Sie zeigen die Wichtigkeit einer Sache",
      "Sie vereinfachen den Austausch über bestimmte Einträge"
    ],
    correct:[0,2]
  },

  // ✅ Modul 2 – 5 Fragen
  {
    module:"m2", title:"Frage 1", points:1, type:"single",
    question:"Woran erkennt man interne vs. kundenbezogene Prozesse?",
    options:[
      "An der Rechtsgrundlage",
      "Kombination aus Abteilung + Prozessschritt",
      "Am Zyklus"
    ],
    correct:[1]
  },
  {
    module:"m2", title:"Frage 2", points:1, type:"single",
    question:"Welche Funktion hat die Spalte „Dokumentation“?",
    options:[
      "Verweis auf interne Unterlagen wie Policies oder Prozessbeschreibungen",
      "Sammlung von rechtlichen Quellen",
      "Bereich für interne Kommentare der GF"
    ],
    correct:[0]
  },
  {
    module:"m2", title:"Frage 3", points:1, type:"single",
    question:"Wie identifiziert man Risiken im Inventar am zuverlässigsten?",
    options:[
      "An fehlenden Verantwortlichkeiten",
      "An Hinweisen in Gap Analyse / Anmerkungen / Status „Nicht vorhanden“",
      "An der Länge der Beschreibung"
    ],
    correct:[1]
  },
  {
    module:"m2", title:"Frage 4", points:1, type:"single",
    question:"Warum gibt es unterschiedliche Sheets (Datenschutz, HR, Compliance etc.)?",
    options:[
      "Zur logischen Trennung verschiedener Pflichtthemen",
      "Damit die Datei übersichtlicher bleibt",
      "Zur Archivierung alter Prozesse"
    ],
    correct:[0]
  },
  {
    module:"m2", title:"Frage 5", points:1, type:"multi",
    question:"Was sagt eine leere Gap Analyse nicht automatisch aus? (Mehrfachauswahl möglich)",
    options:[
      "Es wurde noch nichts bewertet",
      "Der Prozess ist vollständig",
      "Es besteht kein Verbesserungsbedarf"
    ],
    correct:[0,2]
  },

  // ✅ Modul 3 – 5 Fragen
  {
    module:"m3", title:"Frage 1", points:1, type:"single",
    question:"Wann MUSS ein Eintrag aktualisiert werden?",
    options:[
      "Bei jeder Prozessänderung oder spätestens zum Zyklusdatum",
      "Nur wenn ein Auditor darauf hinweist",
      "Wenn eine Rechtsänderung kommt"
    ],
    correct:[0]
  },
  {
    module:"m3", title:"Frage 2", points:1, type:"single",
    question:"Wer darf Einträge ändern?",
    options:[
      "Jede/r Mitarbeitende",
      "Nur fachlich Verantwortliche oder definierte Rollen",
      "Nur Legal"
    ],
    correct:[1]
  },
  {
    module:"m3", title:"Frage 3", points:1, type:"single",
    question:"Welche Felder sind bei einer Aktualisierung zwingend anzupassen?",
    options:[
      "„Last Check“ und ggf. „Gap Analyse“ + Dokumentation",
      "Rechtsgebiet",
      "Abteilung"
    ],
    correct:[0]
  },
  {
    module:"m3", title:"Frage 4", points:1, type:"single",
    question:"Woran erkennt man veraltete Einträge?",
    options:[
      "„Last Check“ liegt lange zurück",
      "Die ID ist niedrig",
      "Der Status ist „Implementiert“"
    ],
    correct:[0]
  },
  {
    module:"m3", title:"Frage 5", points:1, type:"single",
    question:"Welche Informationen dürfen nicht eingetragen werden?",
    options:[
      "Personenbezogene Einzelfalldaten",
      "Interne To Dos",
      "Angaben zu Verantwortlichkeiten"
    ],
    correct:[0]
  },

  // ✅ Modul 4 – 5 Fragen
  {
    module:"m4", title:"Frage 1", points:1, type:"single",
    question:"Wie findet man einen Eintrag effizient?",
    options:[
      "Scrollen",
      "Filter oder STRG+F",
      "Nach Farben sortieren"
    ],
    correct:[1]
  },
  {
    module:"m4", title:"Frage 2", points:1, type:"single",
    question:"Was zeigt das Sheet „Vorlage“?",
    options:[
      "Die verbindliche Pflichtstruktur aller Einträge",
      "Beispieleinträge",
      "Die wichtigsten Rechtsgebiete"
    ],
    correct:[0]
  },
  {
    module:"m4", title:"Frage 3", points:1, type:"single",
    question:"Warum ist die Statusübersicht (Sheet 2) hilfreich?",
    options:[
      "Sie zeigt aggregiert Risiken & Fortschritt pro Rechtsgebiet",
      "Sie dient primär dem Marketing",
      "Sie bildet historische Daten ab"
    ],
    correct:[0]
  },
  {
    module:"m4", title:"Frage 4", points:1, type:"single",
    question:"Welche der folgenden Methoden führt NICHT zu einer sinnvollen Sortierung?",
    options:[
      "Filtern nach Abteilungen",
      "Sortieren nach Status Quo",
      "Löschen aller nicht relevanten Zeilen"
    ],
    correct:[2]
  },
  {
    module:"m4", title:"Frage 5", points:1, type:"single",
    question:"Warum ist Konsistenz bei der Pflege entscheidend?",
    options:[
      "Es erleichtert Audits und Nachvollziehbarkeit",
      "Die Datei ist farbsensitiv",
      "Um Speicherplatz zu sparen"
    ],
    correct:[0]
  },

  // ✅ Modul 5 – 5 Fragen
  {
    module:"m5", title:"Frage 1", points:1, type:"single",
    question:"Warum ist die Verantwortlichkeitsspalte essenziell?",
    options:[
      "Wegen nachvollziehbarer Zuweisung",
      "Wegen Designvorgaben",
      "Für die Archivierung"
    ],
    correct:[0]
  },
  {
    module:"m5", title:"Frage 2", points:1, type:"single",
    question:"Wann ist ein Eintrag „Implementiert“?",
    options:[
      "Wenn der Prozess läuft, dokumentiert und geprüft ist",
      "Wenn er im Inventar steht",
      "Wenn Legal zustimmt"
    ],
    correct:[0]
  },
  {
    module:"m5", title:"Frage 3", points:1, type:"single",
    question:"Wodurch können Governance Probleme entstehen?",
    options:[
      "Durch eine neue Rechtslage",
      "Durch einen neuen Mitarbeitenden",
      "Durch fehlende Verantwortlichkeiten und unklare Prozesse"
    ],
    correct:[2]
  },
  {
    module:"m5", title:"Frage 4", points:1, type:"single",
    question:"Wie erkennt man Abhängigkeiten zwischen Prozessen?",
    options:[
      "Ähnliche Kombinationen aus Abteilung + Prozessschritt",
      "Gleiche Farben",
      "Durch Excel-Berechnungen"
    ],
    correct:[0]
  },
  {
    module:"m5", title:"Frage 5", points:1, type:"single",
    question:"Warum ist das Rechtskataster auch für ein kleines Team wichtig?",
    options:[
      "Weil regulatorische Pflichten unabhängig von Teamgröße bestehen",
      "Weil Excel es so vorsieht",
      "Weil es intern gefordert wird"
    ],
    correct:[0]
  },
];

/* =========================
   DOM REFERENCES
========================= */
const moduleTitle = document.getElementById("moduleTitle");
const moduleDesc  = document.getElementById("moduleDesc");

const questionNav = document.getElementById("questionNav");
const qTitle = document.getElementById("qTitle");
const qMeta = document.getElementById("qMeta");
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
  btn.addEventListener("click", () => setModule(btn.dataset.module));
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

function buildQuestionNav() {
  const list = getModuleQuestions(currentModule);
  questionNav.innerHTML = "";

  list.forEach((q, idx) => {
    const btn = document.createElement("button");
    btn.className = "navbtn";
    btn.textContent = q.title;

    if (idx === currentIndexWithinModule) btn.classList.add("active");

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

/* helpers */
function arraysEqualAsSets(a, b){
  const sa = new Set(a), sb = new Set(b);
  if (sa.size !== sb.size) return false;
  for (const x of sa) if (!sb.has(x)) return false;
  return true;
}

function renderQuestion() {
  const list = getModuleQuestions(currentModule);
  const q = list[currentIndexWithinModule];
  if (!q) return;

  const globalIdx = questions.indexOf(q);
  const ans = state.answered?.[globalIdx];

  qTitle.textContent = q.title;
  qQuestion.textContent = q.question;

  const isMulti = q.type === "multi";
  qMeta.textContent = isMulti ? "Mehrfachauswahl möglich (Checkboxen)." : "Wähle eine Antwort (Radio).";
  qResult.textContent = "";
  qOptions.innerHTML = "";

  const inputType = isMulti ? "checkbox" : "radio";

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");

    const checked = ans?.choices?.includes(i) ? "checked" : "";
    label.innerHTML = `
      <input type="${inputType}" name="q" value="${i}" ${checked} />
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
      : `Falsch ❌ (0 Punkte)\nRichtig ist/sind: ${q.correct.map(i => q.options[i]).join(" | ")}`;
  }
}

checkBtn.addEventListener("click", () => {
  const list = getModuleQuestions(currentModule);
  const q = list[currentIndexWithinModule];
  if (!q) return;

  const globalIdx = questions.indexOf(q);
  const selectedInputs = [...qOptions.querySelectorAll('input[name="q"]:checked')];
  if (selectedInputs.length === 0) { qResult.textContent = "Bitte wähle eine Antwort aus."; return; }

  const choices = selectedInputs.map(i => Number(i.value)).sort((a,b)=>a-b);

  state.answered = state.answered || {};
  if (state.answered[globalIdx]?.done) return;

  const correct = arraysEqualAsSets(choices, q.correct);

  state.answered[globalIdx] = { done:true, choices, correct };
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
  state = {
    points:0,
    currentModule:"m1",
    currentIndexWithinModule:0,
    answered:{},
    sheetData:null,
    challengeDone:false,
    sheetTasksDone:{}
  };
  saveState();
  location.reload();
});

/* =========================
   PROGRESS UI
========================= */
function updateProgress() {
  const points = state.points || 0;
  const quizMax = questions.reduce((s,q)=> s + q.points, 0); // 25
  const max = quizMax + 2 + 4; // +2 challenge +4 sheet tasks

  document.getElementById("pointsLabel").textContent = `${points} Punkte`;
  const badge = [...badges].reverse().find(b => points >= b.min)?.label ?? "—";
  document.getElementById("badgeLabel").textContent = badge;

  const pct = Math.min(100, Math.round((points / max) * 100));
  document.getElementById("progressFill").style.width = `${pct}%`;
}

/* =========================
   SHEET (Excel-like structure)
========================= */
const deptToOwner = {
  "Product Management": "Thomas",
  "Customer Success": "Hannes",
  "Sales / CS / Sales Partner": "Pia",
  "Sales Support": "Pia",
  "Marketing & Sales Automation / Agenturen": "Lisa",
  "Finanzen / Controlling": "Birgit",
  "Digital Marketing / Social Media": "Lisa",
  "Outbound-Telefonie": "Pia",
  "Design, Film & Media": "Lisa",
  "Personal / HR": "Pia",
  "Geschäftsführung": "Thomas",
};

const STATUS = ["Implementiert", "In Bearbeitung", "Nicht vorhanden"];
const CYCLE  = ["Jährlich", "Halbjährlich", "Quartalsweise", "Monatlich"];

const columns = [
  "ID","Abteilung","Prozess","Prozessschritt","Betroff / Thema","Rechtsgebiet",
  "Paragraph / Artikel","Beschreibung","Status Quo","Last Check","GAP Analyse",
  "Verantwortlichkeit","Dokumentation","Zyklus","Anmerkung"
];

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

      if (colName === "ID") {
        const td = document.createElement("td");
        td.textContent = String(row[c]);
        td.className = "locked";
        tr.appendChild(td);
        continue;
      }

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
          sheetRows[rIdx][11] = deptToOwner[sel.value] || "";
          saveSheet();
          renderSheet();
        });
        td.appendChild(sel);
        tr.appendChild(td);
        continue;
      }

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

      if (colName === "Verantwortlichkeit") {
        const td = document.createElement("td");
        td.textContent = String(row[c] ?? "");
        td.className = "locked";
        tr.appendChild(td);
        continue;
      }

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
   AUTO-AUFGABENPRÜFUNG (SHEET)
========================= */
const checkTasksBtn = document.getElementById("checkTasksBtn");
const tasksResult = document.getElementById("tasksResult");
const tasksPointsInfo = document.getElementById("tasksPointsInfo");

function findRowById(id) {
  return sheetRows.find(r => Number(r[0]) === Number(id));
}
function countNonEmptyLastChecks() {
  return sheetRows.filter(r => String(r[9] ?? "").trim().length > 0).length;
}
function ensureTasksState() {
  state.sheetTasksDone = state.sheetTasksDone || {};
}
function updateTasksInfo() {
  ensureTasksState();
  const doneCount = Object.values(state.sheetTasksDone).filter(Boolean).length;
  if (tasksPointsInfo) tasksPointsInfo.textContent = `Erledigt: ${doneCount}/4 Aufgaben`;
}
updateTasksInfo();

checkTasksBtn?.addEventListener("click", () => {
  ensureTasksState();

  const r3 = findRowById(3);
  const task1ok = r3 && r3[8] === "Nicht vorhanden";

  const r1 = findRowById(1);
  const task2ok = r1 && r1[1] === "Product Management" && r1[11] === "Thomas";

  const task3ok = countNonEmptyLastChecks() >= 2;

  const r6 = findRowById(6);
  const task4ok = r6 && r6[13] === "Quartalsweise";

  const checks = [
    { key: "t1", ok: task1ok, text: "Aufgabe 1: ID 3 – Status Quo = „Nicht vorhanden“" },
    { key: "t2", ok: task2ok, text: "Aufgabe 2: ID 1 – Product Management → Verantwortlichkeit „Thomas“" },
    { key: "t3", ok: task3ok, text: "Aufgabe 3: Mindestens 2× Last Check ausgefüllt" },
    { key: "t4", ok: task4ok, text: "Aufgabe 4: ID 6 – Zyklus = „Quartalsweise“" },
  ];

  let gained = 0;
  let lines = [];

  checks.forEach(c => {
    const already = !!state.sheetTasksDone[c.key];
    if (c.ok && !already) {
      state.points = (state.points || 0) + 1;
      state.sheetTasksDone[c.key] = true;
      gained += 1;
    }
    const mark = c.ok ? "✅" : "❌";
    const note = c.ok ? (already ? " (schon gewertet)" : " (+1 Punkt)") : " (noch offen)";
    lines.push(`${mark} ${c.text}${note}`);
  });

  saveState();
  updateProgress();
  updateTasksInfo();

  if (tasksResult) {
    tasksResult.textContent =
      gained > 0
        ? `Super! Du hast ${gained} Punkt(e) durch die Aufgabenprüfung bekommen.\n\n${lines.join("\n")}`
        : `Noch keine neuen Punkte.\n\n${lines.join("\n")}`;
  }
});

/* =========================
   PERSISTENCE
========================= */
function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return {
      points:0,
      currentModule:"m1",
      currentIndexWithinModule:0,
      answered:{},
      sheetData:null,
      challengeDone:false,
      sheetTasksDone:{}
    };
    const s = JSON.parse(raw);
    if (!s.answered) s.answered = {};
    if (!s.sheetTasksDone) s.sheetTasksDone = {};
    return s;
  } catch {
    return {
      points:0,
      currentModule:"m1",
      currentIndexWithinModule:0,
      answered:{},
      sheetData:null,
      challengeDone:false,
      sheetTasksDone:{}
    };
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

document.querySelectorAll(".modulebtn").forEach(b => b.classList.remove("active"));
document.querySelector(`.modulebtn[data-module="${currentModule}"]`)?.classList.add("active");
/* ===== Navigation ===== */
const navItems = document.querySelectorAll(".nav-item");
const views = document.querySelectorAll(".view");

function showView(id){
  views.forEach(v => v.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  navItems.forEach(b => b.classList.remove("active"));
  document.querySelector(`[data-view="${id}"]`)?.classList.add("active");
}

navItems.forEach(btn => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    if(view) showView(view);
  });
});

/* ===== Video abgeschlossen ===== */
document.getElementById("videoDoneBtn").addEventListener("click", () => {
  showView("modul1");
});

/* ===== Reset ===== */
document.getElementById("resetBtn").addEventListener("click", () => {
  location.reload();
});

/* ===== MODULE CONTENT (gekürzt dargestellt – Logik bleibt gleich) ===== */
document.getElementById("modul1").innerHTML = `
  <h1>Modul 1 – Grundverständnis</h1>
  <p>Wofür dient das Rechtskataster primär?</p>
  <label><input type="radio"> Ablage juristischer Texte</label><br>
  <label><input type="radio" checked> Strukturierte Übersicht aller Pflichten</label><br>
  <label><input type="radio"> Aufgabenverteilung</label>
`;

/* 👉 Hier bleiben deine bestehenden Modul-Logiken & Quizfragen
   👉 einfach unverändert weiterführen */

