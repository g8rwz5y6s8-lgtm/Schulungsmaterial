/* ==========
   Mini E-Learning + Spreadsheet Demo
   - Navigation
   - Quiz + Punkte + Badge
   - Spreadsheet (editierbare Tabelle)
   - Einfache Formeln: =SUM(A1:A3) und Zellreferenzen
   ========== */

const STATE_KEY = "rk_elearing_state_v1";

const correctAnswers = {
  q1: "b",
  q2: "b",
  q3: "b",
  q4: "b",
  q5: "b",
};

const badges = [
  { min: 0,  label: "—" },
  { min: 5,  label: "Bronze: Starter" },
  { min: 10, label: "Silber: Anwender:in" },
  { min: 16, label: "Gold: Audit-Ready" },
  { min: 22, label: "Platin: Rechtskataster-Profi" },
];

let state = loadState();

/* ===== Navigation ===== */
document.querySelectorAll(".navbtn[data-view]").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.view));
});

function showView(viewName) {
  document.querySelectorAll(".navbtn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.navbtn[data-view="${viewName}"]`)?.classList.add("active");

  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(`view-${viewName}`)?.classList.add("active");
}

/* ===== Reset ===== */
document.getElementById("resetBtn").addEventListener("click", () => {
  state = { points: 0, completed: {}, quizDone: {}, highlightGap: false, sheetData: null };
  saveState();
  location.reload();
});

/* ===== Quiz Handling ===== */
document.querySelectorAll("[data-submit-quiz]").forEach(btn => {
  btn.addEventListener("click", () => {
    const quizId = btn.dataset.submitQuiz;
    submitQuiz(quizId);
  });
});

function submitQuiz(quizId) {
  const quizEl = document.querySelector(`.quiz[data-quiz-id="${quizId}"]`);
  const points = Number(quizEl.dataset.points || 0);
  const resultEl = document.getElementById(`${quizId}-result`);

  if (state.quizDone[quizId]) {
    resultEl.textContent = "Schon erledigt ✅";
    return;
  }

  const checked = document.querySelector(`input[name="${quizId}"]:checked`);
  if (!checked) {
    resultEl.textContent = "Bitte wähle eine Antwort.";
    return;
  }

  const ok = checked.value === correctAnswers[quizId];
  if (ok) {
    state.points += points;
    state.quizDone[quizId] = true;
    resultEl.textContent = `Richtig ✅ (+${points} Punkte)`;
  } else {
    state.quizDone[quizId] = true; // im Uni-Projekt kann man auch Wiederholungen erlauben
    resultEl.textContent = "Nicht ganz ❌ (0 Punkte) – Lösung: die zweite Option ist korrekt.";
  }

  saveState();
  updateProgress();
}

/* ===== Challenge ===== */
document.getElementById("challengeCompleteBtn").addEventListener("click", () => {
  const resultEl = document.getElementById("challenge-result");
  if (state.completed.challenge) {
    resultEl.textContent = "Challenge wurde bereits abgeschlossen ✅";
    return;
  }
  state.points += 10;
  state.completed.challenge = true;
  saveState();
  updateProgress();
  resultEl.textContent = "Challenge abgeschlossen ✅ (+10 Punkte)";
});

/* ===== Progress UI ===== */
function updateProgress() {
  document.getElementById("pointsLabel").textContent = `${state.points} Punkte`;

  const badge = [...badges].reverse().find(b => state.points >= b.min)?.label ?? "—";
  document.getElementById("badgeLabel").textContent = badge;

  // Max Punkte: 2+3+4+3+4 + 10 = 26
  const pct = Math.min(100, Math.round((state.points / 26) * 100));
  document.getElementById("progressFill").style.width = `${pct}%`;
}
updateProgress();

/* ===== Spreadsheet Data ===== */
const columns = [
  "ID", "Abteilung", "Prozess", "Prozessschritt", "Betroff./Thema",
  "Rechtsgebiet", "Paragraph/Artikel", "Beschreibung", "Status Quo",
  "Last Check", "GAP Analyse", "Verantwortlichkeit", "Dokumentation", "Zyklus", "Anmerkung"
];

// Demo-Daten (vereinfacht, aber ähnlich zu deinem Screenshot)
const defaultRows = [
  ["D&I-001","", "Betrieb Hinweisgebersystem (SaaS)", "Erhebung von Meldungsdaten", "Hinweisgeber, Beschuldigte, Zeugen","DSGVO","Art. 5, 6, 9, 10",
   "Rechtmäßigkeit, Zweckbindung, Datenminimierung", "Strg.", "", "Prüfen Rechtsgrundlage; Info besonders sensibel", "", "", "", ""],
  ["D&I-004","", "Betrieb Hinweisgebersystem (SaaS)", "Protokollierung/Logging", "Hinweisgeberdaten, Admin-Events","DSGVO/TTDSG","Art. 5(1)(b-f); §25 TTDSG",
   "Sicherheits- & Administrationslogs; Cookies/Endgerätezugriffe", "Strg.", "", "TTDSG-Abgrenzung; Retention festlegen", "", "", "", ""],
  ["D&I-014","Sicherheit", "TOMs", "Verschlüsselung", "Daten in Ruhe/Transport","DSGVO","Art. 32",
   "TLS 1.2+; AES-256; Key Mgmt", "Strg.", "2024-02-15", "KMS Rotation dokumentieren", "", "", "jährlich", ""],
  ["D&I-023","Incident Mgmt", "Incident Management", "Data Breach Handling", "Betroffene, Behörde","DSGVO/BDSG","Art. 33, 34; §43 BDSG",
   "Meldung 72h; Benachrichtigung Betroffene; Doku", "Strg.", "", "Tabletop-Übungen protokollieren", "", "", "halbjährlich", ""],
  ["D&I-020","VVT", "Verzeichnis Verarbeitungstätigkeiten", "VVT Intern", "Mitarbeiter, Sales/Marketing","DSGVO","Art. 30(1)",
   "VVT Verantwortlicher", "Strg.", "2023-11-01", "Ergänzung TTDSG-relevanter Tools", "", "", "jährlich", ""],
];

// Build sheet
const sheetTable = document.getElementById("sheetTable");
const filterCol = document.getElementById("filterCol");
const filterVal = document.getElementById("filterVal");
const highlightGapBtn = document.getElementById("highlightGapBtn");
const recalcBtn = document.getElementById("recalcBtn");

let rows = loadSheetData();

function loadSheetData() {
  if (state.sheetData && Array.isArray(state.sheetData)) return state.sheetData;
  return structuredClone(defaultRows);
}

function renderFilterOptions() {
  filterCol.innerHTML = "";
  columns.forEach((c, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = c;
    filterCol.appendChild(opt);
  });
}
renderFilterOptions();

function renderSheet() {
  sheetTable.innerHTML = "";

  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  columns.forEach(c => {
    const th = document.createElement("th");
    th.textContent = c;
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  sheetTable.appendChild(thead);

  const tbody = document.createElement("tbody");

  const colIdx = Number(filterCol.value || 0);
  const needle = (filterVal.value || "").toLowerCase();

  rows.forEach((r, rIdx) => {
    const match = !needle || String(r[colIdx] ?? "").toLowerCase().includes(needle);
    if (!match) return;

    const tr = document.createElement("tr");
    if (state.highlightGap) {
      const gap = String(r[10] ?? "").trim();
      if (gap.length > 0) tr.classList.add("highlight");
    }

    r.forEach((val, cIdx) => {
      const td = document.createElement("td");
      td.contentEditable = true;
      td.dataset.r = String(rIdx);
      td.dataset.c = String(cIdx);
      td.textContent = String(val ?? "");
      td.addEventListener("blur", onCellEdit);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  sheetTable.appendChild(tbody);
}

function onCellEdit(e) {
  const td = e.target;
  const r = Number(td.dataset.r);
  const c = Number(td.dataset.c);
  rows[r][c] = td.textContent;
  persistSheet();
}

function persistSheet() {
  state.sheetData = rows;
  saveState();
}

/* ===== Formel-Engine (mini) ===== */
function colLetterToIndex(letter) {
  // A=0, B=1 ... Z=25 (für Demo ausreichend)
  const code = letter.toUpperCase().charCodeAt(0);
  return code - 65;
}
function parseCellRef(ref) {
  // e.g. H2
  const m = String(ref).trim().match(/^([A-Z])(\d+)$/i);
  if (!m) return null;
  const c = colLetterToIndex(m[1]);
  const r = Number(m[2]) - 1;
  return { r, c };
}
function getCellValueByRef(ref) {
  const p = parseCellRef(ref);
  if (!p) return 0;
  const v = rows[p.r]?.[p.c];
  const num = Number(String(v ?? "").replace(",", "."));
  return Number.isFinite(num) ? num : 0;
}
function evalSum(range) {
  // A1:A3
  const m = range.match(/^([A-Z]\d+):([A-Z]\d+)$/i);
  if (!m) return 0;
  const a = parseCellRef(m[1]);
  const b = parseCellRef(m[2]);
  if (!a || !b || a.c !== b.c) return 0; // nur gleiche Spalte in dieser Mini-Demo
  const start = Math.min(a.r, b.r);
  const end = Math.max(a.r, b.r);
  let s = 0;
  for (let r = start; r <= end; r++) {
    const v = rows[r]?.[a.c];
    const num = Number(String(v ?? "").replace(",", "."));
    if (Number.isFinite(num)) s += num;
  }
  return s;
}
function evalFormula(text) {
  // =SUM(H2:H6) oder =A1
  const t = String(text).trim();
  if (!t.startsWith("=")) return text;

  const body = t.slice(1).trim();

  // SUM
  const sm = body.match(/^SUM\((.+)\)$/i);
  if (sm) return String(evalSum(sm[1].trim()));

  // single cell ref
  const ref = parseCellRef(body);
  if (ref) return String(getCellValueByRef(body));

  return "#FORMEL?";
}

function recalcFormulas() {
  rows = rows.map(r => r.map(v => {
    const val = String(v ?? "");
    if (val.trim().startsWith("=")) return evalFormula(val);
    return v;
  }));
  persistSheet();
  renderSheet();
}

/* ===== Sheet controls ===== */
filterCol.addEventListener("change", renderSheet);
filterVal.addEventListener("input", renderSheet);
highlightGapBtn.addEventListener("click", () => {
  state.highlightGap = !state.highlightGap;
  saveState();
  renderSheet();
});
recalcBtn.addEventListener("click", recalcFormulas);

/* ===== State ===== */
function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { points: 0, completed: {}, quizDone: {}, highlightGap: false, sheetData: null };
    return JSON.parse(raw);
  } catch {
    return { points: 0, completed: {}, quizDone: {}, highlightGap: false, sheetData: null };
  }
}
function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

/* Initial render */
renderSheet();
