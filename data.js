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
    coordinates: { x: 80, y: 310, width: 60, height: 65, rotation: 0 },
    gpsPolygon: [
      [52.3280, 5.0612],
      [52.3282, 5.0612],
      [52.3282, 5.0615],
      [52.3280, 5.0615]
    ]
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
    coordinates: { x: 150, y: 310, width: 55, height: 65, rotation: 0 },
    gpsPolygon: [
      [52.3281, 5.0616],
      [52.3283, 5.0616],
      [52.3283, 5.0619],
      [52.3281, 5.0619]
    ]
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
    coordinates: { x: 215, y: 310, width: 55, height: 65, rotation: 0 },
    gpsPolygon: [
      [52.3282, 5.0620],
      [52.3284, 5.0620],
      [52.3284, 5.0623],
      [52.3282, 5.0623]
    ]
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
    coordinates: { x: 280, y: 310, width: 65, height: 65, rotation: 0 },
    gpsPolygon: [
      [52.3283, 5.0624],
      [52.3285, 5.0624],
      [52.3285, 5.0627],
      [52.3283, 5.0627]
    ]
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
    coordinates: { x: 90, y: 200, width: 65, height: 75, rotation: 10 },
    gpsPolygon: [
      [52.3320, 5.0580],
      [52.3322, 5.0580],
      [52.3322, 5.0583],
      [52.3320, 5.0583]
    ]
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
    coordinates: { x: 165, y: 190, width: 65, height: 75, rotation: 5 },
    gpsPolygon: [
      [52.3321, 5.0584],
      [52.3323, 5.0584],
      [52.3323, 5.0587],
      [52.3321, 5.0587]
    ]
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
    coordinates: { x: 240, y: 185, width: 65, height: 75, rotation: -5 },
    gpsPolygon: [
      [52.3322, 5.0588],
      [52.3324, 5.0588],
      [52.3324, 5.0591],
      [52.3322, 5.0591]
    ]
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
    coordinates: { x: 315, y: 190, width: 70, height: 75, rotation: -10 },
    gpsPolygon: [
      [52.3323, 5.0592],
      [52.3325, 5.0592],
      [52.3325, 5.0595],
      [52.3323, 5.0595]
    ]
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
    coordinates: { x: 480, y: 100, width: 75, height: 75, rotation: 15 },
    gpsPolygon: [
      [52.3310, 5.0665],
      [52.3312, 5.0665],
      [52.3312, 5.0669],
      [52.3310, 5.0669]
    ]
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
    coordinates: { x: 570, y: 80, width: 80, height: 80, rotation: -15 },
    gpsPolygon: [
      [52.3312, 5.0670],
      [52.3314, 5.0670],
      [52.3314, 5.0674],
      [52.3312, 5.0674]
    ]
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
    coordinates: { x: 530, y: 220, width: 80, height: 80, rotation: 10 },
    gpsPolygon: [
      [52.3314, 5.0675],
      [52.3316, 5.0675],
      [52.3316, 5.0679],
      [52.3314, 5.0679]
    ]
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
    coordinates: { x: 630, y: 200, width: 85, height: 85, rotation: -10 },
    gpsPolygon: [
      [52.3316, 5.0680],
      [52.3318, 5.0680],
      [52.3318, 5.0684],
      [52.3316, 5.0684]
    ]
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
