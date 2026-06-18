// Matching Engine voor Nieuwbouw Perceelkiezer

/**
 * Bereken de overeenkomst (match score) tussen koper-voorkeuren en het Kavel-DNA.
 * @param {Object} preferences - De geselecteerde voorkeuren van de koper.
 * @param {Array} kavels - Lijst met beschikbare kavels uit de database.
 * @returns {Array} - Lijst van gescoorde kavels, gesorteerd op matchingspercentage.
 */
function calculateMatches(preferences, kavels) {
  return kavels.map(kavel => {
    let score = 100;
    let maxWeightTotal = 0;
    let earnedWeightTotal = 0;
    
    const matchedReasons = [];
    const unmatchedReasons = [];
    let isFiltered = false;
    let filterReason = "";

    // --- 1. HARDE CRITERIA (FILTERS) ---
    // A. Budget
    if (preferences.budget && kavel.price > preferences.budget) {
      isFiltered = true;
      filterReason = `Prijs (€${kavel.price.toLocaleString('nl-NL')}) ligt boven uw budget (€${preferences.budget.toLocaleString('nl-NL')})`;
    }

    // B. Woningtype
    if (preferences.houseType && preferences.houseType !== "Geen voorkeur") {
      if (!kavel.houseTypes.includes(preferences.houseType)) {
        isFiltered = true;
        filterReason = `Kavel staat geen ${preferences.houseType.toLowerCase()} toe (alleen ${kavel.houseTypes.join(', ')})`;
      }
    }

    // Als een kavel is weggefilterd, krijgt hij een score van 0
    if (isFiltered) {
      return {
        kavel,
        score: 0,
        isFiltered,
        filterReason,
        matchedReasons: [],
        unmatchedReasons: [filterReason]
      };
    }

    // --- 2. ZACHTE EN GEWOGEN LIFESTYLE CRITERIA ---

    // A. Tuinligging / Zonuren (Gewicht: Hoog)
    // Voorkeur voor veel zon (Zuid, Zuidwest, Zuidoost)
    const sunWeight = parseInt(preferences.sunlightImportance || 0);
    if (sunWeight > 0) {
      maxWeightTotal += sunWeight;
      if (kavel.sunHours >= 8) {
        earnedWeightTotal += sunWeight;
        matchedReasons.push(`Heerlijk zonnige tuin (${kavel.sunHours} zonuren per dag in de zomer) met ligging op het ${kavel.gardenOrientation.toLowerCase()}.`);
      } else if (kavel.sunHours >= 6) {
        earnedWeightTotal += sunWeight * 0.7;
        matchedReasons.push(`Gemiddelde zonuren (${kavel.sunHours} uur) met tuinligging op het ${kavel.gardenOrientation.toLowerCase()}.`);
      } else {
        unmatchedReasons.push(`Minder zonnig (${kavel.sunHours} zonuren), tuin ligt op het ${kavel.gardenOrientation.toLowerCase()}.`);
      }
    }

    // B. Perceeloppervlakte / Buitenleven (Gewicht: Medium/Hoog)
    const outdoorWeight = parseInt(preferences.outdoorImportance || 0);
    if (outdoorWeight > 0) {
      maxWeightTotal += outdoorWeight;
      // Voorkeuren: 1 = compact/makkelijk onderhoud (< 250m2), 2 = gemiddeld (250-380m2), 3 = riant (> 380m2)
      const desiredSize = parseInt(preferences.desiredSize || 2);
      if (desiredSize === 1) { // Compact
        if (kavel.size <= 250) {
          earnedWeightTotal += outdoorWeight;
          matchedReasons.push(`Compact perceel van ${kavel.size} m²: ideaal voor weinig tuinonderhoud.`);
        } else if (kavel.size <= 350) {
          earnedWeightTotal += outdoorWeight * 0.6;
          matchedReasons.push(`Iets ruimer perceel (${kavel.size} m²) dan uw compacte voorkeur.`);
        } else {
          unmatchedReasons.push(`Perceel van ${kavel.size} m² is wellicht te groot voor uw onderhoudswens.`);
        }
      } else if (desiredSize === 2) { // Gemiddeld
        if (kavel.size > 220 && kavel.size <= 380) {
          earnedWeightTotal += outdoorWeight;
          matchedReasons.push(`Mooi bemeten perceel van ${kavel.size} m² met voldoende speel- en leefruimte.`);
        } else {
          earnedWeightTotal += outdoorWeight * 0.5;
          unmatchedReasons.push(`Perceeloppervlakte (${kavel.size} m²) wijkt af van de gewenste gemiddelde grootte.`);
        }
      } else if (desiredSize === 3) { // Riant
        if (kavel.size > 380) {
          earnedWeightTotal += outdoorWeight;
          matchedReasons.push(`Zeer royaal perceel van ${kavel.size} m² met alle ruimte voor buitenleven.`);
        } else if (kavel.size >= 300) {
          earnedWeightTotal += outdoorWeight * 0.6;
          matchedReasons.push(`Royaal perceel (${kavel.size} m²), hoewel iets compacter dan de gevraagde absolute topklasse.`);
        } else {
          unmatchedReasons.push(`Perceeloppervlakte van ${kavel.size} m² is aan de krappe kant voor uw wens naar veel buitenruimte.`);
        }
      }
    }

    // C. Privacy / Rust (Gewicht: Medium/Hoog)
    const privacyWeight = parseInt(preferences.privacyImportance || 0);
    if (privacyWeight > 0) {
      maxWeightTotal += privacyWeight;
      if (kavel.privacyScore >= 8) {
        earnedWeightTotal += privacyWeight;
        matchedReasons.push(`Uitstekende privacy (score ${kavel.privacyScore}/10) dankzij gunstige positionering of groenbuffers.`);
      } else if (kavel.privacyScore >= 6) {
        earnedWeightTotal += privacyWeight * 0.7;
        matchedReasons.push(`Redelijke mate van privacy (score ${kavel.privacyScore}/10) met normale afstand tot buren.`);
      } else {
        unmatchedReasons.push(`Beperktere privacy door centrale ligging nabij doorgangen.`);
      }
    }

    // D. Kindvriendelijkheid / Spelen (Gewicht: Medium)
    const childWeight = parseInt(preferences.childFriendlyImportance || 0);
    if (childWeight > 0) {
      maxWeightTotal += childWeight;
      if (kavel.distanceToPlayground <= 100) {
        earnedWeightTotal += childWeight;
        matchedReasons.push(`Zeer kindvriendelijk: speelveldje op slechts ${kavel.distanceToPlayground} meter loopafstand.`);
      } else if (kavel.distanceToPlayground <= 250) {
        earnedWeightTotal += childWeight * 0.7;
        matchedReasons.push(`Speelgelegenheid is vlot bereikbaar op ${kavel.distanceToPlayground} meter.`);
      } else {
        unmatchedReasons.push(`Speelvoorzieningen liggen wat verder weg (${kavel.distanceToPlayground} meter).`);
      }
    }

    // E. Levendigheid vs Rust (Locatiefactoren)
    const livelinessWeight = parseInt(preferences.livelinessImportance || 0);
    if (livelinessWeight > 0) {
      maxWeightTotal += livelinessWeight;
      // 1 = Rustig (ver weg van hoofdweg/wateractiviteit), 2 = Levendig (dichtbij water, wegen, voorzieningen)
      const desiredAtmosphere = parseInt(preferences.desiredAtmosphere || 1);
      if (desiredAtmosphere === 1) { // Rustig
        if (kavel.distanceToRoad > 250 && kavel.privacyScore >= 7) {
          earnedWeightTotal += livelinessWeight;
          matchedReasons.push(`Rustig gelegen in de luwte van het plangebied, ver van doorgaand verkeer.`);
        } else if (kavel.distanceToRoad > 150) {
          earnedWeightTotal += livelinessWeight * 0.6;
          matchedReasons.push(`Voldoende afstand tot de hoofdweg voor een rustige woonervaring.`);
        } else {
          unmatchedReasons.push(`Dichter bij de ontsluitingsweg gelegen, wat voor meer omgevingsgeluid zorgt.`);
        }
      } else { // Levendig / Dynamisch
        if (kavel.distanceToWater < 50 || kavel.distanceToRoad < 150) {
          earnedWeightTotal += livelinessWeight;
          matchedReasons.push(`Dynamische ligging nabij het water of de entree van de wijk, ideaal voor aansluiting bij de buurt.`);
        } else {
          earnedWeightTotal += livelinessWeight * 0.4;
          unmatchedReasons.push(`Zeer rustig gelegen, waardoor u minder meekrijgt van de centrale wijkdynamiek.`);
        }
      }
    }

    // F. Bouwvrijheid & Uitbreidingsmogelijkheden (DSO-data)
    const freedomWeight = parseInt(preferences.buildingFreedomImportance || 0);
    if (freedomWeight > 0) {
      maxWeightTotal += freedomWeight;
      // Eisen: wens voor aanbouw/serre of hoge woning (nokhoogte > 10m en bebouwingspercentage >= 60%)
      const needsFreedom = preferences.needsBuildingFreedom === true;
      if (needsFreedom) {
        if (kavel.bebouwingspercentage >= 60 && kavel.maxNokhoogte >= 10) {
          earnedWeightTotal += freedomWeight;
          matchedReasons.push(`Ruime bouwmogelijkheden: tot ${kavel.bebouwingspercentage}% bebouwing en ${kavel.maxNokhoogte}m nokhoogte.`);
        } else if (kavel.bebouwingspercentage >= 60 || kavel.maxNokhoogte >= 10) {
          earnedWeightTotal += freedomWeight * 0.6;
          matchedReasons.push(`Gedeeltelijke flexibiliteit: bebouwingspercentage van ${kavel.bebouwingspercentage}% of nokhoogte van ${kavel.maxNokhoogte}m.`);
        } else {
          unmatchedReasons.push(`Striktere bouwregels: maximaal ${kavel.bebouwingspercentage}% bebouwingspercentage en ${kavel.maxNokhoogte}m nokhoogte.`);
        }
      } else {
        // Indien geen specifieke wens, telt dit gewoon positief mee als het soepel is
        earnedWeightTotal += freedomWeight;
      }
    }

    // Matchingspercentage berekenen
    let matchPercentage = 100;
    if (maxWeightTotal > 0) {
      matchPercentage = Math.round((earnedWeightTotal / maxWeightTotal) * 100);
    }

    return {
      kavel,
      score: matchPercentage,
      isFiltered: false,
      filterReason: "",
      matchedReasons: matchedReasons.slice(0, 3), // Max 3 belangrijkste redenen tonen
      unmatchedReasons: unmatchedReasons.slice(0, 2)
    };
  })
  .sort((a, b) => b.score - a.score); // Sorteren op hoogste match score
}

// Global exposure
window.calculateMatches = calculateMatches;
