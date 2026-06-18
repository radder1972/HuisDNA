// Kavel-DNA Database en DSO Voorbeeldteksten
const initialKavels = [
  {
    id: 1,
    name: "Kavel 1 (Havenzicht)",
    price: 325000,
    size: 240,
    gardenOrientation: "Zuidwest",
    sunHours: 8,
    houseTypes: ["Rijwoning", "Hoekwoning"],
    bebouwingspercentage: 60,
    maxNokhoogte: 10,
    maxGoothoogte: 6,
    distanceToPlayground: 80,
    distanceToWater: 20,
    distanceToRoad: 120,
    privacyScore: 6,
    description: "Gelegen aan de rand van de haven met prachtig uitzicht over het water. Perfect voor wie houdt van een levendige omgeving met verkoelende briesjes.",
    coordinates: { x: 120, y: 110, width: 70, height: 90, rotation: -10 }
  },
  {
    id: 2,
    name: "Kavel 2 (Havenzicht)",
    price: 310000,
    size: 210,
    gardenOrientation: "Zuidwest",
    sunHours: 8,
    houseTypes: ["Rijwoning"],
    bebouwingspercentage: 60,
    maxNokhoogte: 10,
    maxGoothoogte: 6,
    distanceToPlayground: 95,
    distanceToWater: 35,
    distanceToRoad: 130,
    privacyScore: 5,
    description: "Een knusse tussenkavel met een zonnige tuin. Ideaal voor startende gezinnen die dicht bij het water willen wonen.",
    coordinates: { x: 195, y: 97, width: 60, height: 90, rotation: -10 }
  },
  {
    id: 3,
    name: "Kavel 3 (Havenzicht)",
    price: 315000,
    size: 215,
    gardenOrientation: "Zuidwest",
    sunHours: 7.5,
    houseTypes: ["Rijwoning"],
    bebouwingspercentage: 60,
    maxNokhoogte: 10,
    maxGoothoogte: 6,
    distanceToPlayground: 110,
    distanceToWater: 50,
    distanceToRoad: 140,
    privacyScore: 5,
    description: "Centraal gelegen tussenkavel met uitstekende bezonning en een compacte maar functionele tuinligging.",
    coordinates: { x: 260, y: 85, width: 60, height: 90, rotation: -10 }
  },
  {
    id: 4,
    name: "Kavel 4 (Havenzicht)",
    price: 345000,
    size: 275,
    gardenOrientation: "Zuid",
    sunHours: 9,
    houseTypes: ["Hoekwoning", "Twee-onder-een-kap"],
    bebouwingspercentage: 60,
    maxNokhoogte: 10,
    maxGoothoogte: 6,
    distanceToPlayground: 125,
    distanceToWater: 65,
    distanceToRoad: 150,
    privacyScore: 7,
    description: "Ruime hoekkavel met extra zijtuin en optimale zoninval gedurende de gehele dag. Grenst aan een rustig wandelpad.",
    coordinates: { x: 325, y: 73, width: 75, height: 90, rotation: -10 }
  },
  {
    id: 5,
    name: "Kavel 5 (Parkrand)",
    price: 395000,
    size: 340,
    gardenOrientation: "Noordwest",
    sunHours: 5,
    houseTypes: ["Twee-onder-een-kap"],
    bebouwingspercentage: 50,
    maxNokhoogte: 9,
    maxGoothoogte: 4,
    distanceToPlayground: 40,
    distanceToWater: 150,
    distanceToRoad: 250,
    privacyScore: 8,
    description: "Prachtig gelegen aan de rand van het park. Veel natuurlijke schaduw en privacy door de omliggende volwassen bomenrij.",
    coordinates: { x: 150, y: 280, width: 85, height: 110, rotation: 5 }
  },
  {
    id: 6,
    name: "Kavel 6 (Parkrand)",
    price: 385000,
    size: 320,
    gardenOrientation: "Noord",
    sunHours: 4.5,
    houseTypes: ["Twee-onder-een-kap"],
    bebouwingspercentage: 50,
    maxNokhoogte: 9,
    maxGoothoogte: 4,
    distanceToPlayground: 55,
    distanceToWater: 170,
    distanceToRoad: 260,
    privacyScore: 8,
    description: "Een heerlijk rustige kavel direct grenzend aan een brede groenstrook met speelvoorzieningen voor de kinderen om de hoek.",
    coordinates: { x: 240, y: 288, width: 80, height: 110, rotation: 5 }
  },
  {
    id: 7,
    name: "Kavel 7 (Parkrand)",
    price: 390000,
    size: 330,
    gardenOrientation: "Noord",
    sunHours: 5,
    houseTypes: ["Twee-onder-een-kap"],
    bebouwingspercentage: 50,
    maxNokhoogte: 9,
    maxGoothoogte: 4,
    distanceToPlayground: 70,
    distanceToWater: 190,
    distanceToRoad: 270,
    privacyScore: 8.5,
    description: "Biedt veel privacy en rust. Uitermate geschikt voor natuurliefhebbers die waarde hechten aan een groene, bosrijke leefomgeving.",
    coordinates: { x: 325, y: 295, width: 80, height: 110, rotation: 5 }
  },
  {
    id: 8,
    name: "Kavel 8 (Parkrand)",
    price: 410000,
    size: 380,
    gardenOrientation: "Noordoost",
    sunHours: 5.5,
    houseTypes: ["Twee-onder-een-kap", "Vrijstaand"],
    bebouwingspercentage: 50,
    maxNokhoogte: 9,
    maxGoothoogte: 4,
    distanceToPlayground: 85,
    distanceToWater: 210,
    distanceToRoad: 280,
    privacyScore: 9,
    description: "De grootste kavel in de Parkrand-zone met een riante tuin die overloopt in het gemeenschappelijke bosplantsoen.",
    coordinates: { x: 410, y: 302, width: 90, height: 110, rotation: 5 }
  },
  {
    id: 9,
    name: "Kavel 9 (Zonnehof)",
    price: 445000,
    size: 420,
    gardenOrientation: "Zuidoost",
    sunHours: 8.5,
    houseTypes: ["Vrijstaand"],
    bebouwingspercentage: 70,
    maxNokhoogte: 11,
    maxGoothoogte: 6,
    distanceToPlayground: 220,
    distanceToWater: 90,
    distanceToRoad: 400,
    privacyScore: 8.5,
    description: "Een riante kavel aan een verkeersluw hofje. Zeer gunstige bouwvoorschriften met veel ruimte voor een royale villa met bijgebouwen.",
    coordinates: { x: 550, y: 150, width: 100, height: 100, rotation: 15 }
  },
  {
    id: 10,
    name: "Kavel 10 (Zonnehof)",
    price: 465000,
    size: 450,
    gardenOrientation: "Zuid",
    sunHours: 10,
    houseTypes: ["Vrijstaand"],
    bebouwingspercentage: 70,
    maxNokhoogte: 11,
    maxGoothoogte: 6,
    distanceToPlayground: 240,
    distanceToWater: 105,
    distanceToRoad: 420,
    privacyScore: 9,
    description: "Prachtig zonnig georiënteerd. Uitstekende mogelijkheden voor zonnepanelen, een serre of een riante uitbouw aan de tuinzijde.",
    coordinates: { x: 655, y: 178, width: 105, height: 100, rotation: 15 }
  },
  {
    id: 11,
    name: "Kavel 11 (Zonnehof)",
    price: 430000,
    size: 400,
    gardenOrientation: "Zuid",
    sunHours: 9.5,
    houseTypes: ["Vrijstaand"],
    bebouwingspercentage: 70,
    maxNokhoogte: 11,
    maxGoothoogte: 6,
    distanceToPlayground: 260,
    distanceToWater: 120,
    distanceToRoad: 440,
    privacyScore: 8.5,
    description: "Gelegen in de hoek van het plangebied met rondom vrij uitzicht en veel privacy. De ideale zonligging garandeert de hele dag licht.",
    coordinates: { x: 575, y: 255, width: 95, height: 100, rotation: 15 }
  },
  {
    id: 12,
    name: "Kavel 12 (Zonnehof)",
    price: 485000,
    size: 480,
    gardenOrientation: "Zuidwest",
    sunHours: 10,
    houseTypes: ["Vrijstaand"],
    bebouwingspercentage: 70,
    maxNokhoogte: 11,
    maxGoothoogte: 6,
    distanceToPlayground: 280,
    distanceToWater: 135,
    distanceToRoad: 460,
    privacyScore: 9.5,
    description: "De absolute kroonkavel van het project. Maximale privacy, grootste perceeloppervlakte en perfecte bezonning van 's ochtends tot 's avonds.",
    coordinates: { x: 675, y: 282, width: 110, height: 100, rotation: 15 }
  }
];

const sampleDSOTexts = [
  {
    title: "Havenzicht (Kavels 1 t/m 4) - DSO Omgevingsplan",
    text: `ARTIKEL 4.2: BOUWREGELS ZONE HAVENZICHT
a. Het bebouwingspercentage van het bouwperceel mag niet meer bedragen dan 60%.
b. De nokhoogte van hoofdgebouwen bedraagt ten hoogste 10,00 meter vanaf het peil.
c. De goothoogte van hoofdgebouwen bedraagt ten hoogste 6,00 meter vanaf het peil.
d. Op de kavels 1 t/m 4 zijn uitsluitend woningen van het type 'rijwoning', 'hoekwoning' of 'twee-onder-een-kap' toegestaan.
e. Vergunningvrije uitbouwen aan de achterzijde van het hoofdgebouw zijn toegestaan tot een diepte van maximaal 3,00 meter, mits het bebouwingspercentage niet wordt overschreden.`
  },
  {
    title: "Parkrand (Kavels 5 t/m 8) - DSO Omgevingsplan",
    text: `ARTIKEL 5.6: SPECIFIEKE BOUWVOORSCHRIFTEN PARKRAND-BIOTOP
a. In verband met de instandhouding van de bos- en parkrandbiotoop is de maximale nokhoogte van gebouwen beperkt tot 9,00 meter vanaf peil.
b. Ter waarborging van de bodeminfiltratie bedraagt het maximale bebouwingspercentage 50% van het perceeloppervlakte.
c. De goothoogte mag maximaal 4,00 meter bedragen om de daklijn visueel te beperken.
d. Bijgebouwen en overkappingen mogen een gezamenlijke oppervlakte van maximaal 40 m² beslaan.
e. Vanwege de landschappelijke inpassing zijn uitsluitend twee-onder-een-kapwoningen en op kavel 8 een vrijstaande woning toegestaan.`
  },
  {
    title: "Zonnehof (Kavels 9 t/m 12) - DSO Omgevingsplan",
    text: `ARTIKEL 6.1: ROBUUSTE WONINGBOUW ZONNEHOF
a. Ter bevordering van een ruim opgezette villawijk bedraagt het maximaal toegestane bebouwingspercentage 70%.
b. De maximale nokhoogte bedraagt 11,00 meter vanaf peil, met een goothoogte van ten hoogste 6,00 meter.
c. Op deze kavels zijn uitsluitend vrijstaande woningen toegestaan.
d. De realisatie van een zonnige serre of wintertuin aan de zuid- of westzijde van het hoofdgebouw is expliciet toegestaan en telt voor 50% mee bij de bepaling van de bebouwingsdichtheid, mits voorzien van HR+++ glas.`
  }
];

// Export to window object for global availability since we are using plain scripts
window.initialKavels = initialKavels;
window.sampleDSOTexts = sampleDSOTexts;
