// AI DSO-Pre-processor Simulator

/**
 * Simuleert het stapsgewijs verwerken van een juridische DSO-tekst door AI.
 * @param {string} rawText - De ruwe tekst uit het omgevingsplan.
 * @param {function} onStep - Callback voor elke voortgangsstap (stap, statusbericht, tussentijdse data).
 * @param {function} onComplete - Callback wanneer de verwerking is afgerond, geeft het uiteindelijke JSON-object terug.
 */
function simulateAIProcessing(rawText, onStep, onComplete) {
  const steps = [
    {
      name: "Tekst scannen & Ruis filteren",
      duration: 1500,
      run: () => {
        return {
          status: "Scannen van overheidstekst... Filteren van niet-bouwgerelateerde definities.",
          highlights: findKeywords(rawText),
          data: null
        };
      }
    },
    {
      name: "Bouwmaatvoeringen extraheren",
      duration: 1800,
      run: () => {
        // Simuleer entiteitsherkenning (Named Entity Recognition)
        const extracted = parseEntities(rawText);
        return {
          status: "Entiteiten geïdentificeerd: Nokhoogtes, Goothoogtes en Bebouwingspercentages gedetecteerd.",
          highlights: extracted.highlights,
          data: extracted.entities
        };
      }
    },
    {
      name: "Woningtypes & Beperkingen matchen",
      duration: 1600,
      run: () => {
        const types = parseHouseTypes(rawText);
        return {
          status: "Toegestane woningtypes gedetecteerd en gekoppeld aan BRK-definities.",
          highlights: types.highlights,
          data: { houseTypes: types.list }
        };
      }
    },
    {
      name: "JSON Schema Valideren & Uitlijnen",
      duration: 1200,
      run: () => {
        const fullData = finalizeJson(rawText);
        return {
          status: "Conversie naar Kavel-DNA JSON-schema. Validatie tegen database-constraints succesvol.",
          highlights: [],
          data: fullData
        };
      }
    }
  ];

  let currentStep = 0;

  function executeNextStep(accumulatedData = {}) {
    if (currentStep >= steps.length) {
      const finalJson = finalizeJson(rawText);
      onComplete(finalJson);
      return;
    }

    const step = steps[currentStep];
    const stepResult = step.run();
    const newAccumulatedData = { ...accumulatedData, ...stepResult.data };

    onStep({
      stepNumber: currentStep + 1,
      totalSteps: steps.length,
      stepName: step.name,
      status: stepResult.status,
      highlights: stepResult.highlights,
      accumulatedData: newAccumulatedData
    });

    currentStep++;
    setTimeout(() => {
      executeNextStep(newAccumulatedData);
    }, step.duration);
  }

  // Start de simulatie
  executeNextStep();
}

// Hulpelementen voor het zoeken naar trefwoorden in tekst (eenvoudige regex-simulatie)
function findKeywords(text) {
  const keywords = [/bebouwingspercentage/gi, /nokhoogte/gi, /goothoogte/gi, /woningtype/gi, /rijwoning/gi, /twee-onder-een-kap/gi, /vrijstaande/gi, /serre/gi];
  const highlights = [];
  
  keywords.forEach(regex => {
    let match;
    while ((match = regex.exec(text)) !== null) {
      highlights.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        type: "keyword"
      });
    }
  });
  return highlights;
}

function parseEntities(text) {
  const highlights = [];
  const entities = {};

  // Zoek naar bebouwingspercentage (bijv. 60% of 50%)
  const bebouwMatch = /(bebouwingspercentage|bebouwingsdichtheid)[^0-9]*([0-9]+)\s*%/i.exec(text);
  if (bebouwMatch) {
    entities.bebouwingspercentage = parseInt(bebouwMatch[2]);
    highlights.push({
      start: bebouwMatch.index,
      end: bebouwMatch.index + bebouwMatch[0].length,
      text: bebouwMatch[0],
      type: "metric"
    });
  } else {
    entities.bebouwingspercentage = 60; // default fallback
  }

  // Zoek naar nokhoogte (bijv. 10 meter of 9,00 meter)
  const nokMatch = /nokhoogte[^0-9]*([0-9]+([.,][0-9]+)?)\s*meter/i.exec(text);
  if (nokMatch) {
    entities.maxNokhoogte = parseFloat(nokMatch[1].replace(',', '.'));
    highlights.push({
      start: nokMatch.index,
      end: nokMatch.index + nokMatch[0].length,
      text: nokMatch[0],
      type: "metric"
    });
  } else {
    entities.maxNokhoogte = 10;
  }

  // Zoek naar goothoogte (bijv. 6 meter of 4,00 meter)
  const gootMatch = /goothoogte[^0-9]*([0-9]+([.,][0-9]+)?)\s*meter/i.exec(text);
  if (gootMatch) {
    entities.maxGoothoogte = parseFloat(gootMatch[1].replace(',', '.'));
    highlights.push({
      start: gootMatch.index,
      end: gootMatch.index + gootMatch[0].length,
      text: gootMatch[0],
      type: "metric"
    });
  } else {
    entities.maxGoothoogte = 5;
  }

  return { entities, highlights };
}

function parseHouseTypes(text) {
  const highlights = [];
  const list = [];

  const types = [
    { key: "Rijwoning", patterns: [/rijwoning/gi, /rijwoningen/gi] },
    { key: "Hoekwoning", patterns: [/hoekwoning/gi, /hoekwoningen/gi] },
    { key: "Twee-onder-een-kap", patterns: [/twee-onder-een-kap/gi, /twee-onder-een-kapwoningen/gi, /2-onder-1-kap/gi] },
    { key: "Vrijstand", patterns: [/vrijstaand/gi, /vrijstaande/gi, /villa/gi] }
  ];

  types.forEach(t => {
    t.patterns.forEach(regex => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (!list.includes(t.key)) {
          // Normaliseer "Vrijstand" naar "Vrijstaand" voor onze database
          list.push(t.key === "Vrijstand" ? "Vrijstaand" : t.key);
        }
        highlights.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
          type: "housetype"
        });
      }
    });
  });

  // Fallback indien niets gevonden
  if (list.length === 0) {
    list.push("Vrijstaand", "Twee-onder-een-kap");
  }

  return { list, highlights };
}

function finalizeJson(text) {
  const entities = parseEntities(text).entities;
  const houseTypes = parseHouseTypes(text).list;

  // Zoek eventuele extra uitbreiding of details
  let extensionDepth = 3.0;
  const extMatch = /uitgebouwd[^0-9]*([0-9]+([.,][0-9]+)?)\s*meter/i.exec(text);
  if (extMatch) {
    extensionDepth = parseFloat(extMatch[1].replace(',', '.'));
  }

  return {
    bebouwingspercentage: entities.bebouwingspercentage || 60,
    maxNokhoogte: entities.maxNokhoogte || 10,
    maxGoothoogte: entities.maxGoothoogte || 6,
    houseTypes: houseTypes,
    extensionDepthAllowed: extensionDepth,
    extractedAt: new Date().toISOString(),
    status: "Verified",
    confidenceScore: 0.96
  };
}

// Global exposure
window.simulateAIProcessing = simulateAIProcessing;
