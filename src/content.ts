// Every text on the site comes from Zeno's portfolio (20240320_Portfolio_Zeno_Hodes).
// Print hyphenation is undone; wording is untouched.

export type ChapterId = "over-mij" | "turfhaven" | "gracht" | "wijnhaven" | "zevensprong" | "uitgevoerd";

export const chapters: { id: ChapterId; nr: string; title: string; index: string; kort: string; preview: string }[] = [
  { id: "over-mij", nr: "00", title: "Over mij", index: "over mij", kort: "Over mij", preview: "over/portret" },
  {
    id: "turfhaven",
    nr: "01",
    title: "Openbare ruimte Turfhaven",
    index: "Openbare ruimte Turfhaven", kort: "Turfhaven",
    preview: "turfhaven/visual-1",
  },
  {
    id: "gracht",
    nr: "02",
    title: "Herinrichting Gedempte Gracht & - Burgwal",
    index: "Herinrichting Gedempte Gracht & Gedempte Burgwal", kort: "Gracht & Burgwal",
    preview: "gracht/visual-a-fase-2",
  },
  {
    id: "wijnhaven",
    nr: "03",
    title: "Herinrichting Wijnhaven",
    index: "Herinrichting Wijnhaven", kort: "Wijnhaven",
    preview: "wijnhaven/plant-ilex-blue-princess",
  },
  {
    id: "zevensprong",
    nr: "04",
    title: "No-Regret maatregelen Zevensprong",
    index: "No-Regret maatregelen Zevensprong", kort: "Zevensprong",
    preview: "zevensprong/scenario-1d",
  },
  {
    id: "uitgevoerd",
    nr: "05",
    title: "Reeds uitgevoerde projecten",
    index: "Reeds uitgevoerde projecten", kort: "Uitgevoerd",
    preview: "uitgevoerd/kaapseplein-1",
  },
];

export const overMij = {
  intro:
    "Welkom bij mijn portfolio: een greep uit het werk waar ik mij als ontwerper mee bezig heb gehouden. Ik ben Zeno Hodes, een 27 jarige ontwerper met een passie voor landschap, design en architectuur.",
  body: [
    "Met veel plezier heb ik Urban Design gestudeerd aan Breda University of Applied Sciences (voorheen NHTV). In juni 2019 heb ik mijn Bachelor of Science diploma Built Environment met studierichting Urban Design mogen ontvangen.",
    "In januari 2020 ben ik mijn professionele loopbaan gestart als junior ontwerper openbare ruimte bij Ingenieursbureau Den Haag. Hier heb ik de ruimte gekregen om mijn kennis en vaardigheden toe te passen en uit te breiden middels verschillende ontwerpopgaven in de openbare ruimte van Den Haag.",
    "Ik wens u veel plezier met het lezen en bekijken van mijn portfolio. Voor mijn achtergrond verwijs ik u naar mijn CV.",
  ],
  groet: "Hartelijke groet,",
  naam: "Zeno Hodes",
};

export const turfhaven = {
  ondertitel: "Voorontwerp en definitief ontwerp",
  tekst: [
    "Een zeer prominente plek in het centrum van Den Haag krijgt een nieuwe openbare ruimte. Op de plek waar voorheen het Ministerie van Justitie en Binnenlandse Zaken stond is een doorbraak naar de Schedeldoekshaven gemaakt met een nieuwe woontoren. Deze nieuwe openbare ruimte heet de Turfhaven. Uitdaging van deze plek is de ondergrondse parkeergarage waar de toren op is gebouwd. Dit brengt strakke kaders mee voor de inrichting van de openbare ruimte vanwege de geringe dekking en draagkracht van het dak.",
    "Vanwege het geringe dek wordt een betonnen vloer toegepast op afschot en met cortenstalen lijngoten die afwateren naar kolken aan de randen van de vloer. Het beton wordt voorzien van een afstrooilaag in twee kleuren; in de basis een beige kleur met een patroon in een mangaan kleur. Gestooid over de ruimte komen ronde plantenbakken met en zonder zitrand en losse zitelementen. Deze bakken zijn in samenwerking met een collega ontworpen en hebben een verfijnde detaillering die de plek allure moeten gaan geven. De bakken zijn ruim genoeg voor het planten van meerstammige bomen in groepen van drie, voorzien van onderbeplanting.",
  ],
  materiaalKop: "Materiaalkeuze en studie patroon",
  materiaal:
    "De vloer wordt voorzien van een verbijzondering in de vorm van een patroon. Dit patroon is afgeleid van het patroon dat Amare in haar interieur gebruikt. Op deze manier krijgt deze hoogstedelijk plek een identiteit die aansluit bij het nieuwe Onderwijs en Cultuur Centrum van de stad. De kleurstelling van zowel de vloer met het patroon als de plantenbakken zijn daarom afgestemd op de omgeving. Naastgelegen foto is de gekozen kleurstelling genomen bij de kolom van Amare en de mangaanklinker. Tevens heeft de leverancier van de afstrooilaag ons kunnen voorzien van een sample van het patroon, dit geeft een goed beeld van de maat en schaal van de ontworpen banen.",
  doBijschrift: "definitief ontwerp",
  bakkenBijschrift: "ontwerp plantenbakken",
  bakken: [
    { id: "1m", maat: "Ø 1 m", soort: "poef", img: "turfhaven/bak-1m" },
    { id: "2m", maat: "Ø 2 m", soort: "poef", img: "turfhaven/bak-2m" },
    { id: "3m", maat: "Ø 3 m", soort: "plantenbak met zitrand", img: "turfhaven/bak-3m" },
  ],
  beplanting: [
    {
      groep: "Meerstammigen",
      planten: [
        { naam: "Prunus serrulata", img: "turfhaven/plant-prunus-serrulata" },
        { naam: "Betula nigra", img: "turfhaven/plant-betula-nigra" },
        { naam: "Malus evereste", img: "turfhaven/plant-malus-evereste" },
        { naam: "Quercus ilex", img: "turfhaven/plant-quercus-ilex" },
      ],
    },
    {
      groep: "Onderbeplanting",
      planten: [
        { naam: "Liriope muscari", img: "turfhaven/plant-liriope-muscari" },
        { naam: "Hedera helix", img: "turfhaven/plant-hedera-helix" },
        { naam: "Carex morowii", img: "turfhaven/plant-carex-morowii" },
        { naam: "Geranium macrorrhizum", img: "turfhaven/plant-geranium-macrorrhizum" },
      ],
    },
  ],
};

export const gracht = {
  ondertitel: "Voorontwerp fase 2 en ontwerp vlonders fase 1 (tijdelijke inrichting)",
  fase2Kop: "Voorontwerp fase 2",
  fase2: [
    "Het voorontwerp van de vernieuwde inrichting van de Gedempte Gracht, de Gedempte Burgwal en de Lutherse Burgwal kenmerken zich door natuurstenen trottoirbanden en een subtiele schrikstrook die de fietsroute duidt. De inrichting van de trottoirs is verschillend en afhankelijk van de breedte van het trottoir en de aanwezige functies van de panden. In het gehele gebied worden stevige plantenbakken als structurerende en herkenbare elementen toegepast. In de Gedempte Burgwal kunnen tussen de kabels en leidingen bomen worden geplant.",
    "Op dit moment staat het project ‘in de wachtrij’ om door de raad vastgesteld te worden.",
  ],
  fase1Kop: "Ontwerp vlonders fase 1",
  fase1: [
    "Vooruitlopend op fase 2 zijn alle parkeervakken op de straten afgedekt met vlonders (zie volgende pagina). Dit is gedaan om alvast op deze korte termijn een verbetering te maken voor fietser en voetganger. Het ontwerp van de vlonders heb ik met collega’s in samenwerking met Den Haag Werkt (de producent van de vlonders) gemaakt. Tevens zijn de plantenbakken die in fase 2 worden voorzien alvast geplaatst om de straat ook een groener gezicht te geven.",
  ],
  profielBijschrift: "Gedempte Burgwal",
  planBijschrift: "voorontwerp",
  varianten: [
    { id: "1", kort: "Variant 1", naam: "lange bank", img: "gracht/vlonder-variant-1" },
    { id: "2", kort: "Variant 2", naam: "bank over dwars", img: "gracht/vlonder-variant-2" },
    { id: "3", kort: "Variant 3", naam: "fietsbeugels", img: "gracht/vlonder-variant-3" },
  ],
  fase1Visual: "visual eerste fase (tijdelijke inrichting)",
  fase2Visual: "visual tweede fase (herinrichting)",
};

export const wijnhaven = {
  ondertitel: "Beplantingsplan (onderdeel van het definitief ontwerp)",
  tekst: [
    "Binnenkort wordt de Wijnhaven opnieuw ingericht. Hier worden rechthoekige groenvakken gerealiseerd. Als concept voor de groenvakken is gekozen voor een basis van blokhagen die robuust zijn en jaarrond groen (Ilex meserveae ‘Blue Prince’ en - ‘Blue Princess’). Om de hagen te beschermen zijn de hagen nooit in de lengte achter de banken geplaatst. Naast de hagen komen drie vakken van verschillende beplantingssoorten met een andere kleur en/of structuur ten opzichte van de haag. Eén vak hiervan komt in een robuuste, ook groenblijvende heester, lager dan de haag en met witte bloemen in de winter (Sarcococca confusa). De twee andere vakken komen in vaste planten met een grasachtig blad (Luzula nivea of Liriope muscari), hier en daar verrijkt met een varen (Polystichum setiferum).",
  ],
  planten: [
    { naam: "Liriope muscari", img: "wijnhaven/plant-liriope-muscari" },
    { naam: "Luzula nivea", img: "wijnhaven/plant-luzula-nivea" },
    { naam: "Polystichum setiferum", img: "wijnhaven/plant-polystichum-setiferum" },
    { naam: "Ilex meserveae ‘Blue Prince’", img: "wijnhaven/plant-ilex-blue-prince" },
    { naam: "Ilex meserveae ‘Blue Princess’", img: "wijnhaven/plant-ilex-blue-princess" },
    { naam: "Sarcococca confusa", img: "wijnhaven/plant-sarcococca-confusa" },
  ],
  referentieBijschrift: "referentiebeeld beplantingsconcept",
  profielBijschrift: "principeprofiel",
};

export const zevensprong = {
  ondertitel: "Variantenstudie",
  tekst: [
    "In Den Haag is de Zevensprong al langer een punt van aandacht. In het coalitieakkoord heeft het bestuur de kruising weer benoemd als project om te onderzoeken naar ongelijkvloerse oplossing. Het onderzoek naar een dergelijke oplossing kost dusdanig veel tijd dat is besloten op korte termijn al maatregelen te treffen die de veiligheid, leefbaarheid en oversteekbaarheid verbeteren.",
    "Met een breed projectteam zijn scenario’s bedacht en berekend en deze zijn inzichtelijk gemaakt. Naastgelegen twee scenario’s zijn een greep hieruit en hebben de interesse gewekt bij de projectgroepleden.",
  ],
  scenarios: [
    {
      id: "1d",
      naam: "Scenario 1D+",
      img: "zevensprong/scenario-1d",
      tekst:
        "Scenario 1D+ kenmerkt zich door het afsluiten van een van de zeven takken zodat de kruising compacter wordt en de oversteekbaarheid aan die kant verbetert. Dit biedt tevens ruimte om de boomstructuur van de Loosduinsekade en -weg iets te verlengen.",
    },
    {
      id: "3ab",
      naam: "Scenario 3A-B",
      img: "zevensprong/scenario-3ab",
      tekst:
        "Scenario 3A-B kenmerkt zich door het doorzetten van de middenberm inclusief bomenrijen waardoor het niet meer mogelijk wordt om de Loosduinseweg en -kade te kruisen. Dit biedt veel mogelijkheden voor de voetganger, fietser en landschappelijke inpassing. Echter brengt dit veel verkeerskundige uitdagingen vanwege de verminderde bereikbaarheid met de auto.",
    },
  ],
  variantKop: "Variant 1D+",
  variantSub: "herinrichten",
  maatregelenKop: "Maatregelen",
  maatregelen: [
    "Afsluiten Apeldoornselaan",
    "Afsluiten rechtdoor gaand en linksaf slaand verkeer vanaf Beeklaan",
    "Afsluiten rechtdoor gaand verkeer vanaf Paul Krugerlaan",
    "Afslag Loosduinsekade > De la Reyweg samenvoegen met rechtdoor gaand verkeer",
    "Beeklaan omvormen tot fietsstraat",
    "Toevoegen groen en bomen",
    "Toevoegen boombakken op parkeerstrook",
    "Regentesselaan 30 km/u",
    "Verbreden oversteek De la Reyweg - Beeklaan",
    "Verbreden oversteek Regentesselaan - Paul Krugerlaan",
  ],
  // Marker centres as a percentage of the map crop, read from the PDF text positions.
  markers: [
    { n: 1, x: 8.44, y: 45.23 },
    { n: 1, x: 22.25, y: 10.86 },
    { n: 1, x: 22.62, y: 68.32 },
    { n: 2, x: 49.19, y: 18.58 },
    { n: 3, x: 68.13, y: 68.32 },
    { n: 4, x: 31.52, y: 59.41 },
    { n: 5, x: 49.19, y: 10.67 },
    { n: 6, x: 74.12, y: 17.08 },
    { n: 7, x: 28.94, y: 13.32 },
    { n: 8, x: 64.43, y: 27.23 },
    { n: 9, x: 34.52, y: 62.97 },
    { n: 10, x: 70.99, y: 29.55 },
  ],
  themasKop: "Thema’s",
  themas: [
    {
      naam: "Verkeersveiligheid",
      punten: [
        { plus: true, tekst: "Meer trottoirruimte Beeklaan door omvormen tot fietsstraat" },
        { plus: true, tekst: "Meer trottoirruimte Regentesselaan door afwaarderen regime" },
        { plus: true, tekst: "Twee prettige verbrede oversteken van noord naar zuid" },
        { plus: true, tekst: "Kruising wordt compacter" },
      ],
    },
    {
      naam: "Oversteekbaarheid",
      punten: [
        { plus: true, tekst: "Meer trottoirruimte Beeklaan door omvormen tot fietsstraat" },
        { plus: true, tekst: "Meer trottoirruimte Regentesselaan door afwaarderen regime" },
        { plus: true, tekst: "Twee prettige verbrede oversteken van noord naar zuid" },
        { plus: true, tekst: "Kruising wordt compacter" },
      ],
    },
    {
      naam: "Doorstroming",
      punten: [
        { plus: true, tekst: "Kruising wordt compacter" },
        {
          plus: false,
          tekst:
            "Afslag Loosduinsekade > De la Reyweg samenvoegen met rechtdoor gaand verkeer kan leiden tot meer congestie en conflicten",
        },
      ],
    },
    {
      naam: "Ruimtelijke Kwaliteit",
      punten: [
        { plus: true, tekst: "Verlengen boomstructuur van Loosduinsekade ter hoogte van Apeldoornselaan" },
        { plus: true, tekst: "Vergroening kop Apeldoornselaan" },
        { plus: true, tekst: "Toevoegen boombakken in parkeerstrook" },
        { plus: false, tekst: "Ruimtewinst ligt nu grotendeels waar in huidige situatie al meer kwaliteit is" },
        { plus: false, tekst: "Opschuiven tramhalte kost twee bomen" },
      ],
    },
  ],
  referentiesKop: "Referenties",
  referenties: [
    { img: "zevensprong/ref-kop-apeldoornselaan", bijschrift: "Zicht op kop Apeldoornselaan" },
    { img: "zevensprong/ref-oversteek", bijschrift: "Referentie ruime en zichtbare oversteek" },
  ],
  ambitieKop: "Toekomstambitie",
  ambities: [
    { naam: "Singel", referentie: "referentie: Ruysdaelkade, Amsterdam", imgs: ["zevensprong/ambitie-singel-1", "zevensprong/ambitie-singel-2"] },
    { naam: "Auto ondergronds", referentie: "referentie: Operaplein, Antwerpen", imgs: ["zevensprong/ambitie-auto-1", "zevensprong/ambitie-auto-2"] },
    { naam: "Tram ondergronds", referentie: "referentie: Maliebaan, Utrecht", imgs: ["zevensprong/ambitie-tram-1", "zevensprong/ambitie-tram-2"] },
    { naam: "Alles ondergronds", referentie: "referentie: Groene Loper, Maastricht", imgs: ["zevensprong/ambitie-alles-1", "zevensprong/ambitie-alles-2"] },
  ],
};

export const FASEN = ["SO", "VO", "DO", "bestek", "uitvoering"] as const;
export type Fase = (typeof FASEN)[number];

export type Uitgevoerd = {
  id: string;
  naam: string;
  wat: string;
  betrokken?: Fase[];
  fotos: string[];
  indeling: "rij" | "raster" | "boekhorst" | "hofzicht";
};

export const uitgevoerd: Uitgevoerd[] = [
  {
    id: "kaapseplein",
    naam: "Kaapseplein",
    wat: "nieuw speelplein voor de wijk Transvaal",
    betrokken: ["SO", "VO", "DO", "bestek", "uitvoering"],
    fotos: [1, 2, 3, 4, 5, 6].map((n) => `uitgevoerd/kaapseplein-${n}`),
    indeling: "raster",
  },
  {
    id: "boekhorststraat",
    naam: "Boekhorststraat",
    wat: "herinrichting van de straat",
    betrokken: ["DO", "bestek", "uitvoering"],
    fotos: [1, 2, 3].map((n) => `uitgevoerd/boekhorststraat-${n}`),
    indeling: "boekhorst",
  },
  {
    id: "ursulaland",
    naam: "Ursulaland",
    wat: "opknapbeurt met vergroening voor buurtplein",
    betrokken: ["VO", "DO", "bestek", "uitvoering"],
    fotos: [1, 2, 3].map((n) => `uitgevoerd/ursulaland-${n}`),
    indeling: "rij",
  },
  {
    id: "hofzichtlaan",
    naam: "Hofzichtlaan",
    wat: "opknappen van een plantsoen",
    fotos: ["uitgevoerd/hofzichtlaan-bouwbord"],
    indeling: "hofzicht",
  },
  {
    id: "stadhuis",
    naam: "Omgeving Stadhuis",
    wat: "vervanging hardsteen",
    betrokken: ["DO", "bestek", "uitvoering"],
    fotos: [1, 2, 3].map((n) => `uitgevoerd/stadhuis-${n}`),
    indeling: "rij",
  },
  {
    id: "berlagelaan",
    naam: "Architect Berlagelaan",
    wat: "opknapbeurt met vergroening voor buurtplein",
    betrokken: ["SO", "VO", "DO"],
    fotos: [1, 2, 3].map((n) => `uitgevoerd/berlagelaan-${n}`),
    indeling: "rij",
  },
];

export const hofzichtlaan = {
  planBijschrift: "beplantingsplan",
  bouwbordBijschrift: "bouwbord met resultaat op achtergrond (foto uit maart)",
  schemaBijschrift: "beplantingsschema",
  planten: [
    { code: "A1, A2, A3", naam: "Spiraea japonica ‘Genpei’", nl: "spierstruik", img: "uitgevoerd/hofzichtlaan-plant-a" },
    { code: "B", naam: "Euonymus fortunei ‘Dart’s Blanket’", nl: "Japanse kardinaalshoed", img: "uitgevoerd/hofzichtlaan-plant-b" },
    { code: "C", naam: "Buddleja weyeriana ‘Honeycomb’", nl: "vlinderstruik", img: "uitgevoerd/hofzichtlaan-plant-c" },
    { code: "D", naam: "Buddleja davidii ‘Dart’s Papillon Blue’", nl: "vlinderstruik", img: "uitgevoerd/hofzichtlaan-plant-d" },
    { code: "E", naam: "Sambucus nigra ‘Black Lace’", nl: "rode vlier", img: "uitgevoerd/hofzichtlaan-plant-e" },
  ],
};

export const PDF = { href: "zeno-hodes-portfolio.pdf", bestand: "Portfolio Zeno Hodes.pdf", label: "Portfolio als pdf" };
