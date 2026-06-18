// Main Applicatie Logica voor Nieuwbouw Perceelkiezer

// App State
let kavels = [...window.initialKavels];
let activeTab = "wizard";
let activeStep = 1;
const totalSteps = 4;
let selectedKavelId = null;

// Standaard lifestyle voorkeuren van de koper
let preferences = {
  budget: 400000,
  houseType: "Geen voorkeur",
  desiredSize: 2, // 1=compact, 2=gemiddeld, 3=riant
  sunlightImportance: 1,
  outdoorImportance: 1,
  desiredAtmosphere: 1, // 1=rustig, 2=levendig
  privacyImportance: 1,
  childFriendlyImportance: 1,
  livelinessImportance: 0,
  needsBuildingFreedom: false,
  buildingFreedomImportance: 0
};

// Start de app zodra het DOM geladen is
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initWizard();
  initMap();
  initPlayground();
  
  // Toon initiële kaveldata in DNA inspector
  updateDnaInspector(null);
});

// --- TABS NAVIGATIE ---
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetViewId = tab.getAttribute("aria-controls");
      switchTab(targetViewId);
    });
  });

  // Logo klik brengt de gebruiker terug naar de startpagina
  const logoBtn = document.getElementById("logo-home-btn");
  if (logoBtn) {
    logoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      switchTab("view-wizard");
    });
  }
}

function switchTab(viewId) {
  // Update tabs visual state
  document.querySelectorAll(".nav-tab").forEach(t => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  
  const activeTabBtn = document.querySelector(`[aria-controls="${viewId}"]`);
  if (activeTabBtn) {
    activeTabBtn.classList.add("active");
    activeTabBtn.setAttribute("aria-selected", "true");
  }

  // Update views display
  document.querySelectorAll(".app-view").forEach(view => {
    view.classList.remove("active");
  });
  
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add("active");
  }
}

// --- LIFESTYLE MATCHING WIZARD ---
function initWizard() {
  const btnStart = document.getElementById("btn-start-wizard");
  const welcomePanel = document.getElementById("wizard-welcome");
  const wizardContainer = document.getElementById("wizard-container");
  const btnPrev = document.getElementById("btn-wizard-prev");
  const btnNext = document.getElementById("btn-wizard-next");
  const budgetInput = document.getElementById("input-budget");
  const budgetVal = document.getElementById("val-budget");

  // Start wizard button
  btnStart.addEventListener("click", () => {
    welcomePanel.style.display = "none";
    wizardContainer.style.display = "block";
    updateWizardStep();
  });

  // Slider budget weergave
  budgetInput.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    budgetVal.textContent = `€ ${val.toLocaleString('nl-NL')}`;
    preferences.budget = val;
  });

  // Woningtype selectie visual
  const houseCards = document.querySelectorAll('#step-1 .option-card');
  setupCardSelection(houseCards, (val) => {
    preferences.houseType = val;
  });

  // Perceelgrootte selectie visual
  const gardenCards = document.querySelectorAll('#step-2 .option-card');
  setupCardSelection(gardenCards, (val) => {
    preferences.desiredSize = parseInt(val);
  });

  // Atmosfeer selectie visual
  const atmosCards = document.querySelectorAll('#step-3 .option-card');
  setupCardSelection(atmosCards, (val) => {
    preferences.desiredAtmosphere = parseInt(val);
  });

  // Bouwvrijheid checkbox
  const freedomCheck = document.getElementById("input-buildingfreedom");
  freedomCheck.addEventListener("change", (e) => {
    preferences.needsBuildingFreedom = e.target.checked;
  });

  // Gewichten / Belang knoppen instellen
  setupWeightSelectors();

  // Wizard Navigatie knoppen
  btnPrev.addEventListener("click", () => {
    if (activeStep > 1) {
      activeStep--;
      updateWizardStep();
    }
  });

  btnNext.addEventListener("click", () => {
    if (activeStep < totalSteps) {
      activeStep++;
      updateWizardStep();
    } else {
      // Laatste stap afgerond -> Bereken matches en switch naar dashboard
      runMatchingProcess();
    }
  });
}

function setupCardSelection(cards, callback) {
  cards.forEach(card => {
    const input = card.querySelector('input');
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      input.checked = true;
      callback(input.value);
    });
  });
}

function setupWeightSelectors() {
  const groups = document.querySelectorAll(".weight-btn-group");
  groups.forEach(group => {
    const prefName = group.getAttribute("data-pref");
    const buttons = group.querySelectorAll(".weight-btn");
    
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const val = parseInt(btn.getAttribute("data-val"));
        preferences[prefName] = val;
      });
    });
  });
}

function updateWizardStep() {
  const btnPrev = document.getElementById("btn-wizard-prev");
  const btnNext = document.getElementById("btn-wizard-next");
  const stepTitle = document.getElementById("wizard-step-title");

  // Show/hide steps
  for (let i = 1; i <= totalSteps; i++) {
    const content = document.getElementById(`step-${i}`);
    if (i === activeStep) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  }

  // Update dots
  const dots = document.querySelectorAll(".step-dot");
  dots.forEach((dot, idx) => {
    dot.classList.remove("active", "completed");
    if (idx + 1 === activeStep) {
      dot.classList.add("active");
    } else if (idx + 1 < activeStep) {
      dot.classList.add("completed");
    }
  });

  // Update Buttons & Title
  btnPrev.style.visibility = activeStep === 1 ? "hidden" : "visible";
  
  if (activeStep === totalSteps) {
    btnNext.textContent = "Bereken Kavel Match 🏁";
  } else {
    btnNext.textContent = "Volgende ➡️";
  }

  switch(activeStep) {
    case 1:
      stepTitle.textContent = "Stap 1: Woningtype & Budget";
      break;
    case 2:
      stepTitle.textContent = "Stap 2: Buitenleven & Zoninval";
      break;
    case 3:
      stepTitle.textContent = "Stap 3: Omgeving & Sfeer";
      break;
    case 4:
      stepTitle.textContent = "Stap 4: Bouwvrijheid & Opties";
      break;
  }
}

function runMatchingProcess() {
  // Bereken matches
  const matches = window.calculateMatches(preferences, kavels);
  
  // Render de resultatenlijst
  renderMatchingResults(matches);

  // Update de kaart (accentueer de top-3)
  updateMapHighlighting(matches);

  // Switch naar het dashboard
  switchTab("view-dashboard");
}

function renderMatchingResults(matches) {
  const listContainer = document.getElementById("matching-results-list");
  listContainer.innerHTML = "";

  if (matches.length === 0 || matches.every(m => m.isFiltered)) {
    listContainer.innerHTML = `
      <div class="empty-state">
        <span style="font-size:2rem;">⚠️</span>
        <p>Helaas voldoen geen van de kavels aan uw harde criteria (budget of woningtype). Pas uw budget of type aan in de matcher!</p>
      </div>
    `;
    return;
  }

  // Filter de kavels die zijn uitgesloten
  const validMatches = matches.filter(m => !m.isFiltered);

  validMatches.forEach((match, index) => {
    const kavel = match.kavel;
    const isTop3 = index < 3;
    const cardClass = isTop3 ? "match-card active" : "match-card";
    
    let reasonsHtml = "";
    if (isTop3) {
      match.matchedReasons.forEach(reason => {
        reasonsHtml += `
          <div class="reason-item match">
            <span class="reason-icon">✓</span>
            <span>${reason}</span>
          </div>
        `;
      });
      match.unmatchedReasons.forEach(reason => {
        reasonsHtml += `
          <div class="reason-item mismatch">
            <span class="reason-icon">✗</span>
            <span>${reason}</span>
          </div>
        `;
      });
    }

    const card = document.createElement("div");
    card.className = cardClass;
    card.setAttribute("data-kavel-id", kavel.id);
    card.innerHTML = `
      <div class="match-card-header">
        <span class="match-card-title">${kavel.name}</span>
        <span class="match-percentage-badge">${match.score}% Match</span>
      </div>
      <div class="match-card-subtitle">
        <span>€ ${kavel.price.toLocaleString('nl-NL')} v.o.n.</span>
        <span>${kavel.size} m² | Tuin op het ${kavel.gardenOrientation}</span>
      </div>
      ${isTop3 ? `<div class="reasons-container">${reasonsHtml}</div>` : ''}
    `;

    // Click handler voor kaartinspectie
    card.addEventListener("click", () => {
      selectKavel(kavel.id);
    });

    listContainer.appendChild(card);
  });
}

// --- INTERACTIEVE PLATTEGROND (SVG) ---
function initMap() {
  renderMapKavels();
}

function renderMapKavels() {
  const g = document.getElementById("svg-kavels-group");
  g.innerHTML = "";

  kavels.forEach(kavel => {
    const coords = kavel.coordinates;
    
    // Maak een group aan voor transformatie (rotatie & positie)
    const kavelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    kavelGroup.setAttribute("transform", `translate(${coords.x}, ${coords.y}) rotate(${coords.rotation || 0})`);
    kavelGroup.setAttribute("class", "svg-kavel-wrapper");
    kavelGroup.setAttribute("data-id", kavel.id);

    // Kavel rechthoek
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", coords.width);
    rect.setAttribute("height", coords.height);
    rect.setAttribute("class", "svg-kavel");
    rect.setAttribute("id", `svg-kavel-${kavel.id}`);
    
    // Label kavelnummer
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", coords.width / 2);
    label.setAttribute("y", coords.height / 2 + 4);
    label.setAttribute("class", "svg-kavel-label");
    label.textContent = kavel.id;

    kavelGroup.appendChild(rect);
    kavelGroup.appendChild(label);
    
    // Click en Hover events
    kavelGroup.addEventListener("click", () => {
      selectKavel(kavel.id);
    });

    g.appendChild(kavelGroup);
  });
}

function updateMapHighlighting(matches) {
  // Verwijder eerst alle match-klassen
  const kavelElements = document.querySelectorAll(".svg-kavel");
  kavelElements.forEach(el => {
    el.classList.remove("top-match");
    el.style.stroke = "rgba(255, 255, 255, 0.2)";
    el.style.strokeWidth = "2";
  });

  // Markeer de top 3 matches op de kaart
  const validMatches = matches.filter(m => !m.isFiltered);
  validMatches.slice(0, 3).forEach((match, index) => {
    const kavelId = match.kavel.id;
    const el = document.getElementById(`svg-kavel-${kavelId}`);
    if (el) {
      el.classList.add("top-match");
      // Kleuren op basis van ranking: 1e = goudachtig groen, 2e/3e = smaragdgroen
      if (index === 0) {
        el.style.stroke = "#f59e0b"; // Gold/amber border
        el.style.strokeWidth = "3.5";
      } else {
        el.style.stroke = "#10b981"; // Emerald green
        el.style.strokeWidth = "3";
      }
    }
  });
}

function selectKavel(id) {
  selectedKavelId = id;
  
  // Reset selectie op kaart
  document.querySelectorAll(".svg-kavel").forEach(el => {
    el.classList.remove("selected");
  });

  // Highlight actieve kavel op kaart
  const activeEl = document.getElementById(`svg-kavel-${id}`);
  if (activeEl) {
    activeEl.classList.add("selected");
  }

  // Highlight actieve kavel in de resultatenlijst
  document.querySelectorAll(".match-card").forEach(card => {
    card.classList.remove("active");
    if (card.getAttribute("data-kavel-id") == id) {
      card.classList.add("active");
      // Scroll card in view smoothly
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  // Update DNA inspecteur sidebar
  const selectedKavel = kavels.find(k => k.id === id);
  updateDnaInspector(selectedKavel);
}

function updateDnaInspector(kavel) {
  const emptyState = document.getElementById("dna-empty-state");
  const content = document.getElementById("dna-content");
  const badge = document.getElementById("selected-kavel-badge");

  if (!kavel) {
    emptyState.style.display = "block";
    content.style.display = "none";
    badge.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  content.style.display = "block";
  badge.style.display = "inline-block";
  badge.textContent = `Kavel ${kavel.id}`;

  // DNA metrics invullen
  document.getElementById("inspect-kavel-name").textContent = kavel.name;
  document.getElementById("inspect-kavel-price").textContent = `€ ${kavel.price.toLocaleString('nl-NL')} v.o.n.`;
  document.getElementById("inspect-kavel-desc").textContent = kavel.description;
  document.getElementById("inspect-kavel-size").textContent = `${kavel.size} m²`;
  document.getElementById("inspect-kavel-orientation").textContent = kavel.gardenOrientation;
  document.getElementById("inspect-kavel-sun").textContent = `${kavel.sunHours} uur`;
  document.getElementById("inspect-kavel-types").textContent = kavel.houseTypes.join(", ");

  // DSO rules invullen
  document.getElementById("inspect-dso-bebouwing").textContent = `${kavel.bebouwingspercentage}%`;
  document.getElementById("inspect-dso-nok").textContent = `${kavel.maxNokhoogte.toFixed(2)} meter`;
  document.getElementById("inspect-dso-goot").textContent = `${kavel.maxGoothoogte.toFixed(2)} meter`;
  
  // Proximity metrics invullen
  document.getElementById("inspect-dist-play").textContent = `${kavel.distanceToPlayground} meter`;
  document.getElementById("inspect-dist-water").textContent = `${kavel.distanceToWater} meter`;
  document.getElementById("inspect-dist-road").textContent = `${kavel.distanceToRoad} meter`;
}

// --- AI PRE-PROCESSOR PLAYGROUND ---
let lastExtractedDsoData = null;

function initPlayground() {
  const presetGroup = document.getElementById("dso-preset-group");
  const textInput = document.getElementById("dso-raw-text");
  const btnRun = document.getElementById("btn-run-ai");
  const btnApply = document.getElementById("btn-apply-database");

  // Laad presets
  window.sampleDSOTexts.forEach((preset, index) => {
    const btn = document.createElement("button");
    btn.className = `preset-btn ${index === 0 ? 'active' : ''}`;
    btn.textContent = preset.title.split(" - ")[0]; // Kort de titel in
    btn.addEventListener("click", () => {
      document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      textInput.value = preset.text;
    });
    presetGroup.appendChild(btn);
  });

  // Zet initiële preset tekst in textarea
  if (window.sampleDSOTexts.length > 0) {
    textInput.value = window.sampleDSOTexts[0].text;
  }

  // AI startknop
  btnRun.addEventListener("click", () => {
    const text = textInput.value.trim();
    if (!text) {
      alert("Voer eerst een DSO omgevingsplanteest in.");
      return;
    }

    // Reset console & start pulse
    const consoleOutput = document.getElementById("console-output");
    consoleOutput.innerHTML = "";
    document.getElementById("console-pulse").style.display = "block";
    document.getElementById("ai-json-result-container").style.display = "none";
    
    // Reset indicators
    for (let i = 1; i <= 4; i++) {
      const stepRow = document.getElementById(`ai-step-${i}`);
      stepRow.className = "ai-step-row pending";
    }

    btnRun.disabled = true;

    // Start de AI pre-processor simulatie
    window.simulateAIProcessing(
      text,
      // onStep callback
      (stepInfo) => {
        // Log in console
        const line = document.createElement("div");
        line.className = "console-line info";
        line.textContent = `[Stap ${stepInfo.stepNumber}/4] ${stepInfo.stepName}...`;
        consoleOutput.appendChild(line);

        const statusLine = document.createElement("div");
        statusLine.className = "console-line";
        statusStatusMsg = stepInfo.status;
        statusLine.textContent = `> ${statusStatusMsg}`;
        consoleOutput.appendChild(statusLine);

        // Highlight matching text indien van toepassing
        if (stepInfo.highlights.length > 0) {
          const matchLine = document.createElement("div");
          matchLine.className = "console-line highlight-match";
          matchLine.textContent = `Gedetecteerde matches: ` + stepInfo.highlights.map(h => `"${h.text}"`).join(', ');
          consoleOutput.appendChild(matchLine);
        }

        // Update indicators
        for (let i = 1; i <= 4; i++) {
          const stepRow = document.getElementById(`ai-step-${i}`);
          if (i === stepInfo.stepNumber) {
            stepRow.className = "ai-step-row active";
          } else if (i < stepInfo.stepNumber) {
            stepRow.className = "ai-step-row completed";
          }
        }
        
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
      },
      // onComplete callback
      (finalJson) => {
        btnRun.disabled = false;
        document.getElementById("console-pulse").style.display = "none";
        
        // Finaliseer laatste stap
        document.getElementById("ai-step-4").className = "ai-step-row completed";
        
        const completeLine = document.createElement("div");
        completeLine.className = "console-line success";
        completeLine.textContent = `[Succes] DSO tekst succesvol geanalyseerd.`;
        consoleOutput.appendChild(completeLine);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;

        // Laat de JSON zien
        document.getElementById("ai-json-result-container").style.display = "block";
        document.getElementById("ai-json-output").textContent = JSON.stringify(finalJson, null, 2);
        
        lastExtractedDsoData = finalJson;
      }
    );
  });

  // Opslaan in database knop
  btnApply.addEventListener("click", () => {
    if (!lastExtractedDsoData) return;

    const targetVal = document.getElementById("apply-to-kavel-select").value;
    const targetIds = targetVal.split(",").map(id => parseInt(id));

    // Update de database (kavels array)
    kavels = kavels.map(kavel => {
      if (targetIds.includes(kavel.id)) {
        return {
          ...kavel,
          bebouwingspercentage: lastExtractedDsoData.bebouwingspercentage,
          maxNokhoogte: lastExtractedDsoData.maxNokhoogte,
          maxGoothoogte: lastExtractedDsoData.maxGoothoogte,
          houseTypes: lastExtractedDsoData.houseTypes
        };
      }
      return kavel;
    });

    // Alert & updates
    alert(`Succes: De DSO-bouwvoorschriften zijn opgeslagen in het DNA van Kavels ${targetVal}!`);

    // Herbereken de matches op basis van de nieuwe database en update het dashboard
    const matches = window.calculateMatches(preferences, kavels);
    renderMatchingResults(matches);
    updateMapHighlighting(matches);
    
    // Selecteer een van de geüpdatete kavels om het effect te inspecteren
    selectKavel(targetIds[0]);

    // Spring naar de dashboard tab om het effect te zien
    switchTab("view-dashboard");
  });
}
