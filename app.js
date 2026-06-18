// Main Applicatie Logica voor Nieuwbouw Perceelkiezer

// App State
let kavels = [...window.initialKavels];
let activeTab = "wizard";
let activeStep = 1;
const totalSteps = 4;
let selectedKavelId = null;
let currentMapMode = "svg";
let leafletMap = null;
let leafletPolygons = {};

// Standaard lifestyle voorkeuren van de koper
let preferences = {
  budget: 1200000,
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

// --- INTERACTIEVE PLATTEGROND (SVG & LEAFLET) ---
function initMap() {
  renderMapKavels();
  
  // Setup Map Toggle Buttons
  const svgToggle = document.getElementById("map-toggle-svg");
  const satToggle = document.getElementById("map-toggle-satellite");
  const svgContainer = document.getElementById("interactive-neighborhood");
  const satContainer = document.getElementById("leaflet-map");
  
  if (svgToggle && satToggle) {
    svgToggle.addEventListener("click", () => {
      currentMapMode = "svg";
      svgToggle.classList.add("active");
      svgToggle.setAttribute("aria-checked", "true");
      satToggle.classList.remove("active");
      satToggle.setAttribute("aria-checked", "false");
      
      svgContainer.style.display = "block";
      satContainer.style.display = "none";
    });
    
    satToggle.addEventListener("click", () => {
      currentMapMode = "satellite";
      satToggle.classList.add("active");
      satToggle.setAttribute("aria-checked", "true");
      svgToggle.classList.remove("active");
      svgToggle.setAttribute("aria-checked", "false");
      
      svgContainer.style.display = "none";
      satContainer.style.display = "block";
      
      // Initialiseer Leaflet indien nog niet gedaan
      if (!leafletMap) {
        initLeafletMap();
      } else {
        // Vraag Leaflet om zijn grootte te herberekenen na weergave-wijziging
        setTimeout(() => leafletMap.invalidateSize(), 50);
      }
    });
  }
}

function renderMapKavels() {
  const g = document.getElementById("svg-kavels-group");
  g.innerHTML = "";

  // Dynamic status badge count
  const statusBadge = document.getElementById("matching-status-badge");
  if (statusBadge) {
    statusBadge.textContent = `${kavels.length} kavels geladen`;
  }

  kavels.forEach(kavel => {
    const coords = kavel.coordinates;
    
    // Maak een group aan voor transformatie (rotatie & positie)
    const kavelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    kavelGroup.setAttribute("transform", `translate(${coords.x}, ${coords.y}) rotate(${coords.rotation || 0})`);
    kavelGroup.setAttribute("class", `svg-kavel-wrapper ${kavel.status}`);
    kavelGroup.setAttribute("data-id", kavel.id);

    // Kavel rechthoek
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", coords.width);
    rect.setAttribute("height", coords.height);
    rect.setAttribute("class", `svg-kavel ${kavel.status}`);
    rect.setAttribute("id", `svg-kavel-${kavel.id}`);
    
    // Label kavelnummer
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", coords.width / 2);
    label.setAttribute("y", coords.height / 2 + 4);
    label.setAttribute("class", `svg-kavel-label ${kavel.status}`);
    label.textContent = kavel.id;

    kavelGroup.appendChild(rect);
    kavelGroup.appendChild(label);
    
    // Click en Hover events
    kavelGroup.addEventListener("click", () => {
      if (kavel.status === 'sold') return; // Sold plots cannot be selected
      selectKavel(kavel.id);
    });

    g.appendChild(kavelGroup);
  });
}

// --- LEAFLET SATELLIETKAART (OPTIE B) FUNCTIES ---
function initLeafletMap() {
  // Centreer op De Eilanden island in De Krijgsman Muiden (coördinaten: 52.3340, 5.0645)
  leafletMap = L.map('leaflet-map', {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView([52.3340, 5.0645], 17);
  
  // Activeer zoom pas na focus
  leafletMap.on('focus', () => { leafletMap.scrollWheelZoom.enable(); });
  leafletMap.on('blur', () => { leafletMap.scrollWheelZoom.disable(); });
  
  // PDOK Actuele Luchtfoto (Luchtfoto van het Kadaster) inladen
  const aerialLayer = L.tileLayer('https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueelortho25/EPSG:3857/{z}/{x}/{y}.jpeg', {
    attribution: 'Foto &copy; <a href="https://www.pdok.nl">PDOK</a>',
    maxZoom: 19
  });

  // Kadaster BRT Achtergrondkaart (Standaard PDOK basiskaart) inladen en direct activeren
  const brtLayer = L.tileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png', {
    attribution: 'Kaart &copy; <a href="https://www.kadaster.nl">Kadaster</a>',
    maxZoom: 19
  }).addTo(leafletMap);

  // Voeg een lagen-toggle toe aan de kaart zodat de gebruiker kan schakelen
  const baseMaps = {
    "Actuele Luchtfoto (PDOK)": aerialLayer,
    "Kadaster Kaart (BRT)": brtLayer
  };
  L.control.layers(baseMaps, null, { position: 'topright', collapsed: false }).addTo(leafletMap);
  
  // Plot de polygonen op de kaart
  renderLeafletPolygons();
  
  // Indien er al een kavel geselecteerd was, highlight deze direct
  if (selectedKavelId) {
    highlightLeafletPolygon(selectedKavelId);
  }
  
  // Synchroniseer matchings-highlights indien van toepassing
  const listContainer = document.getElementById("matching-results-list");
  if (listContainer && listContainer.querySelector(".match-card")) {
    const matches = window.calculateMatches(preferences, kavels);
    updateLeafletHighlighting(matches);
  }
}

function getLeafletPolygonStyle(kavelId) {
  const kavel = kavels.find(k => k.id === kavelId);
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const isSelected = selectedKavelId === kavelId;
  
  if (kavel && kavel.status === 'sold') {
    return {
      fillColor: isLight ? "#cbd5e1" : "#334155",
      fillOpacity: 0.45,
      color: isLight ? "rgba(15, 45, 89, 0.2)" : "rgba(255, 255, 255, 0.15)",
      weight: 1.5,
      dashArray: "3, 5"
    };
  }
  
  if (isSelected) {
    return {
      fillColor: "#4cc2a5",
      fillOpacity: 0.35,
      color: "#4cc2a5",
      weight: 4
    };
  }
  
  return {
    fillColor: isLight ? "#f59e0b" : "#d97706",
    fillOpacity: 0.4,
    color: isLight ? "#d97706" : "#fbbf24",
    weight: 2
  };
}

function renderLeafletPolygons() {
  // Verwijder eventuele oude layers
  for (let id in leafletPolygons) {
    leafletMap.removeLayer(leafletPolygons[id]);
  }
  leafletPolygons = {};
  
  kavels.forEach(kavel => {
    if (!kavel.gpsPolygon) return;
    
    const polygon = L.polygon(kavel.gpsPolygon, getLeafletPolygonStyle(kavel.id));
    
    // Voeg tooltip toe
    const tooltipText = kavel.status === 'sold' 
      ? `<strong>${kavel.name}</strong><br><span style="color:#ef4444;font-weight:700;">Verkocht / Onder Optie</span>`
      : `<strong>${kavel.name}</strong><br>€ ${kavel.price.toLocaleString('nl-NL')} v.o.n.`;
      
    polygon.bindTooltip(tooltipText, {
      className: 'leaflet-tooltip-huisdna',
      direction: 'top',
      sticky: true
    });
    
    // Hover-effecten
    polygon.on('mouseover', () => {
      if (kavel.status === 'sold') return; // Sold plots don't highlight on hover
      if (selectedKavelId !== kavel.id) {
        polygon.setStyle({
          fillColor: "#4cc2a5",
          fillOpacity: 0.2,
          color: "#4cc2a5",
          weight: 3
        });
      }
    });
    
    polygon.on('mouseout', () => {
      if (kavel.status === 'sold') return; // Sold plots don't trigger mouseout highlights
      const isSelected = selectedKavelId === kavel.id;
      if (isSelected) {
        polygon.setStyle(getLeafletPolygonStyle(kavel.id));
      } else {
        // Herstel matching highlights of standaard style
        const matches = window.calculateMatches ? window.calculateMatches(preferences, kavels) : [];
        const match = matches.find(m => m.kavel.id === kavel.id);
        const validMatches = matches.filter(m => !m.isFiltered);
        
        if (match && match.isFiltered) {
          polygon.setStyle({
            fillColor: "#334155",
            fillOpacity: 0.1,
            color: "rgba(0,0,0,0.1)",
            weight: 1
          });
        } else if (match) {
          const rankIndex = validMatches.findIndex(m => m.kavel.id === kavel.id);
          if (rankIndex >= 0 && rankIndex < 3) {
            if (rankIndex === 0) {
              polygon.setStyle({
                fillColor: "#f59e0b",
                fillOpacity: 0.3,
                color: "#f59e0b",
                weight: 4
              });
            } else {
              polygon.setStyle({
                fillColor: "#10b981",
                fillOpacity: 0.25,
                color: "#10b981",
                weight: 3.5
              });
            }
          } else {
            polygon.setStyle(getLeafletPolygonStyle(kavel.id));
          }
        } else {
          polygon.setStyle(getLeafletPolygonStyle(kavel.id));
        }
      }
    });
    
    polygon.on('click', () => {
      if (kavel.status === 'sold') return; // Sold plots cannot be selected
      selectKavel(kavel.id);
    });
    
    polygon.addTo(leafletMap);
    leafletPolygons[kavel.id] = polygon;
  });
}

function updateLeafletHighlighting(matches) {
  if (!leafletMap) return;
  
  const validMatches = matches.filter(m => !m.isFiltered);
  
  kavels.forEach(kavel => {
    const polygon = leafletPolygons[kavel.id];
    if (!polygon) return;
    
    const match = matches.find(m => m.kavel.id === kavel.id);
    const isSelected = selectedKavelId === kavel.id;
    
    if (isSelected) {
      polygon.setStyle(getLeafletPolygonStyle(kavel.id));
      return;
    }
    
    if (match && match.isFiltered) {
      // Uitgefilterd
      polygon.setStyle({
        fillColor: "#334155",
        fillOpacity: 0.1,
        color: "rgba(0,0,0,0.1)",
        weight: 1
      });
    } else if (match) {
      const rankIndex = validMatches.findIndex(m => m.kavel.id === kavel.id);
      if (rankIndex >= 0 && rankIndex < 3) {
        if (rankIndex === 0) {
          polygon.setStyle({
            fillColor: "#f59e0b",
            fillOpacity: 0.3,
            color: "#f59e0b",
            weight: 4
          });
          polygon.setTooltipContent(`<strong>${kavel.name}</strong><br><span style="color:#f59e0b;font-weight:700;">★ Best Match: ${match.score}%</span><br>€ ${kavel.price.toLocaleString('nl-NL')} v.o.n.`);
        } else {
          polygon.setStyle({
            fillColor: "#10b981",
            fillOpacity: 0.25,
            color: "#10b981",
            weight: 3.5
          });
          polygon.setTooltipContent(`<strong>${kavel.name}</strong><br><span style="color:#10b981;font-weight:700;">✓ Match: ${match.score}%</span><br>€ ${kavel.price.toLocaleString('nl-NL')} v.o.n.`);
        }
      } else {
        polygon.setStyle(getLeafletPolygonStyle(kavel.id));
        polygon.setTooltipContent(`<strong>${kavel.name}</strong><br><span style="color:var(--accent-color);">${match.score}% Match</span><br>€ ${kavel.price.toLocaleString('nl-NL')} v.o.n.`);
      }
    }
  });
}

function highlightLeafletPolygon(id) {
  if (!leafletMap) return;
  
  const matches = window.calculateMatches ? window.calculateMatches(preferences, kavels) : [];
  const validMatches = matches.filter(m => !m.isFiltered);
  
  kavels.forEach(kavel => {
    const polygon = leafletPolygons[kavel.id];
    if (!polygon) return;
    
    const isSelected = kavel.id === id;
    
    if (isSelected) {
      polygon.setStyle({
        fillColor: "#4cc2a5",
        fillOpacity: 0.35,
        color: "#4cc2a5",
        weight: 5
      });
      polygon.bringToFront();
    } else {
      const match = matches.find(m => m.kavel.id === kavel.id);
      if (match && match.isFiltered) {
        polygon.setStyle({
          fillColor: "#334155",
          fillOpacity: 0.1,
          color: "rgba(0,0,0,0.1)",
          weight: 1
        });
      } else if (match) {
        const rankIndex = validMatches.findIndex(m => m.kavel.id === kavel.id);
        if (rankIndex >= 0 && rankIndex < 3) {
          if (rankIndex === 0) {
            polygon.setStyle({
              fillColor: "#f59e0b",
              fillOpacity: 0.3,
              color: "#f59e0b",
              weight: 4
            });
          } else {
            polygon.setStyle({
              fillColor: "#10b981",
              fillOpacity: 0.25,
              color: "#10b981",
              weight: 3.5
            });
          }
        } else {
          polygon.setStyle(getLeafletPolygonStyle(kavel.id));
        }
      } else {
        polygon.setStyle(getLeafletPolygonStyle(kavel.id));
      }
    }
  });
}

function updateMapHighlighting(matches) {
  // Verwijder match-klassen op SVG
  const kavelElements = document.querySelectorAll(".svg-kavel");
  kavelElements.forEach(el => {
    el.classList.remove("top-match");
    el.style.stroke = "rgba(255, 255, 255, 0.2)";
    el.style.strokeWidth = "2";
  });

  // Markeer de top 3 matches op SVG
  const validMatches = matches.filter(m => !m.isFiltered);
  validMatches.slice(0, 3).forEach((match, index) => {
    const kavelId = match.kavel.id;
    const el = document.getElementById(`svg-kavel-${kavelId}`);
    if (el) {
      el.classList.add("top-match");
      if (index === 0) {
        el.style.stroke = "#f59e0b"; // Goud/amber
        el.style.strokeWidth = "3.5";
      } else {
        el.style.stroke = "#10b981"; // Smaragdgroen
        el.style.strokeWidth = "3";
      }
    }
  });

  // Synchroniseer met Leaflet satellietkaart
  updateLeafletHighlighting(matches);
}

function selectKavel(id) {
  selectedKavelId = id;
  
  // Reset selectie op SVG
  document.querySelectorAll(".svg-kavel").forEach(el => {
    el.classList.remove("selected");
  });

  // Highlight actieve kavel op SVG
  const activeEl = document.getElementById(`svg-kavel-${id}`);
  if (activeEl) {
    activeEl.classList.add("selected");
  }

  // Highlight actieve kavel op Leaflet
  highlightLeafletPolygon(id);

  // Highlight actieve kavel in de resultatenlijst
  document.querySelectorAll(".match-card").forEach(card => {
    card.classList.remove("active");
    if (card.getAttribute("data-kavel-id") == id) {
      card.classList.add("active");
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
