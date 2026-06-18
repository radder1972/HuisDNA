// Kavel-DNA Database en DSO Voorbeeldteksten voor De Krijgsman Muiden
const initialKavels = [
  {
    id: 1,
    name: "Kavel 1 (Kruitpadwal - Type Houtwerf)",
    price: 575000,
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
    description: "Prachtig gelegen aan de Muidertrekvaart in plandeel Kruitpadwal. Deze kavel biedt fraai uitzicht over het water en bevindt zich direct nabij de historische vesting Muiden.",
    coordinates: { x: 120, y: 110, width: 70, height: 90, rotation: -10 }
  },
  {
    id: 2,
    name: "Kavel 2 (Kruitpadwal - Type Zaagloodsen)",
    price: 550000,
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
    description: "Gunstige tussenkavel in plandeel Kruitpadwal met een zonnige achtertuin. Perfect passend binnen het industriële en historische erfgoed van de oude KNSF-fabriek.",
    coordinates: { x: 195, y: 97, width: 60, height: 90, rotation: -10 }
  },
  {
    id: 3,
    name: "Kavel 3 (Kruitpadwal - Type Werkplaats)",
    price: 560000,
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
    description: "Centraal gelegen tussenkavel nabij de historische kruitpaden. Compacte, efficiënte indeling met uitstekende zonuren.",
    coordinates: { x: 260, y: 85, width: 60, height: 90, rotation: -10 }
  },
  {
    id: 4,
    name: "Kavel 4 (Kruitpadwal - Type Mengerij)",
    price: 610000,
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
    description: "Riante hoekkavel aan het einde van plandeel Kruitpadwal. Optimale zoninval met extra zijtuin grenzend aan een brede waterpartij.",
    coordinates: { x: 325, y: 73, width: 75, height: 90, rotation: -10 }
  },
  {
    id: 5,
    name: "Kavel 5 (Het Bos - Bosrijk Wonen)",
    price: 895000,
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
    description: "Gelegen in de lommerrijke, bosrijke zone van De Krijgsman. Veel schaduw en optimale privacy door volwassen loofbomen.",
    coordinates: { x: 150, y: 280, width: 85, height: 110, rotation: 5 }
  },
  {
    id: 6,
    name: "Kavel 6 (Het Bos - Bosrijk Wonen)",
    price: 875000,
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
    description: "Prachtig ingepaste kavel in de bosrand. Grenst aan een groen wandelpad dat direct leidt naar de dijk en het IJmeer.",
    coordinates: { x: 240, y: 288, width: 80, height: 110, rotation: 5 }
  },
  {
    id: 7,
    name: "Kavel 7 (Het Bos - Natuurpark)",
    price: 885000,
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
    description: "Biedt veel privacy en rust. Uitermate geschikt voor gezinnen die in een rustige, bosrijke biotoop nabij Amsterdam willen wonen.",
    coordinates: { x: 325, y: 295, width: 80, height: 110, rotation: 5 }
  },
  {
    id: 8,
    name: "Kavel 8 (Het Bos - De Bosvilla)",
    price: 925000,
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
    description: "Een van de grootste kavels in plandeel Het Bos. Grenst direct aan het gemeenschappelijke bosplantsoen met optimale schaduw en rust.",
    coordinates: { x: 410, y: 302, width: 90, height: 110, rotation: 5 }
  },
  {
    id: 9,
    name: "Kavel 9 (De Eilanden - Villa-eiland)",
    price: 1450000,
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
    description: "Exclusieve kavel gelegen in plandeel De Eilanden. Direct omgeven door grachten en bevaarbaar vaarwater met verbinding naar de Vecht.",
    coordinates: { x: 550, y: 150, width: 100, height: 100, rotation: 15 }
  },
  {
    id: 10,
    name: "Kavel 10 (De Eilanden - Waterkant)",
    price: 1650000,
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
    description: "Zongeoriënteerde villakavel aan het open water. Perfecte bezonning gedurende de hele dag met ruimte voor een eigen aanlegsteiger.",
    coordinates: { x: 655, y: 178, width: 105, height: 100, rotation: 15 }
  },
  {
    id: 11,
    name: "Kavel 11 (De Eilanden - Eilandvilla)",
    price: 1525000,
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
    description: "Gelegen in een verkeersluw hofje op De Eilanden. Biedt maximale rust en privacy met riante bouwmogelijkheden volgens het beeldkwaliteitsplan.",
    coordinates: { x: 575, y: 255, width: 95, height: 100, rotation: 15 }
  },
  {
    id: 12,
    name: "Kavel 12 (De Eilanden - Kroonkavel)",
    price: 1950000,
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
    description: "De absolute kroonkavel van De Eilanden. Maximaal perceeloppervlak, eigen eiland-gevoel, perfecte bezonning en weids uitzicht over het water.",
    coordinates: { x: 675, y: 282, width: 110, height: 100, rotation: 15 }
  }
];

const sampleDSOTexts = [
  {
    title: "Kruitpadwal (Kavels 1 t/m 4) - DSO Omgevingsplan",
    text: `ARTIKEL 12.3: SPECIALE BOUWVOORSCHRIFTEN PLANDEEL KRUITPADWAL
a. Het bebouwingspercentage van het kavelperceel bedraagt ten hoogste 60% voor de hoofdgebouwen.
b. De nokhoogte van woningen aan het Kruitpadwal bedraagt maximaal 10,00 meter gemeten vanaf peil.
c. De goothoogte van hoofdgebouwen bedraagt ten hoogste 6,00 meter vanaf peil.
d. Binnen deze zone zijn uitsluitend woningen van het type 'rijwoning' of 'hoekwoning' toegestaan om het historische lintkarakter te behouden.
e. Het realiseren van bijgebouwen aan de waterzijde van de Muidertrekvaart is verboden om het open zicht vanaf het vaarwater te waarborgen.`
  },
  {
    title: "Het Bos (Kavels 5 t/m 8) - DSO Omgevingsplan",
    text: `ARTIKEL 14.2: GEBIEDSREGELS PARKRAND EN HET BOS
a. Ter bescherming van de boomwortels en bosrijke biotoop is het maximale bebouwingspercentage vastgesteld op 50% van het perceel.
b. De nokhoogte van de bosvilla's en tweekappers mag niet meer bedragen dan 9,00 meter vanaf peil.
c. De goothoogte bedraagt maximaal 4,00 meter, teneinde de kaplijn in harmonie te brengen met het omliggende loofbos.
d. Uitsluitend twee-onder-een-kapwoningen zijn toegestaan, met uitzondering van kavel 8 waar een vrijstaande villa is toegestaan.
e. Er geldt een verplichte tuininrichtingszone van 3,00 meter grenzend aan het openbaar groen die vrij moet blijven van erfafscheidingen hoger dan 1,00 meter.`
  },
  {
    title: "De Eilanden (Kavels 9 t/m 12) - DSO Omgevingsplan",
    text: `ARTIKEL 16.5: EXCLUSIEVE WATERKAVELS PLANDEEL DE EILANDEN
a. Voor de riante villa-eilanden is een bebouwingspercentage van maximaal 70% van het perceel toegestaan.
b. De maximale nokhoogte bedraagt 11,00 meter vanaf peil, met een goothoogte van maximaal 6,00 meter.
c. Binnen plandeel De Eilanden zijn uitsluitend vrijstaande woningen (villa's) toegestaan.
d. Aanlegsteigers voor pleziervaartuigen zijn toegestaan tot een lengte van 6,00 meter, mits deze binnen de eigen perceelgrens vallen en het vaarverkeer niet hinderen.`
  }
];

// Export to window object for global availability since we are using plain scripts
window.initialKavels = initialKavels;
window.sampleDSOTexts = sampleDSOTexts;
