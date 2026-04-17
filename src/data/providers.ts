// =============================================================================
// Finnish Loan Provider Data — Comprehensive database of 27+ providers
// All descriptions and user-facing text in Finnish
// All rates represent realistic 2026 Finnish market conditions
// =============================================================================

import type { LoanProduct, LoanProvider } from '@/types';
export type { LoanProduct, LoanProvider };

// ---------------------------------------------------------------------------
// Provider data
// ---------------------------------------------------------------------------

export const providers: LoanProvider[] = [
  // =========================================================================
  // TRADITIONAL BANKS (1–10)
  // =========================================================================

  // 1. Nordea ----------------------------------------------------------------
  {
    id: 'nordea',
    slug: 'nordea',
    name: 'Nordea Bank Oyj',
    shortName: 'Nordea',
    type: 'bank',
    founded: 2001,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.nordea.fi',
    customerServicePhone: '0200 3000',
    description:
      'Nordea on Pohjoismaiden suurin finanssipalvelukonserni ja Suomen johtava pankki. Nordea syntyi vuonna 2001 pohjoismaisten pankkien yhdistymisestä (juuret ulottuvat 1800-luvulle). Nordea tarjoaa kattavan valikoiman lainatuotteita asuntolainoista kulutusluottoihin. Pankilla on vahva digitaalinen palvelutarjonta ja laaja konttoriverkosto.',
    pros: [
      'Suomen suurin pankki — vakaa ja luotettava',
      'Kilpailukykyiset asuntolainakorot pitkäaikaisille asiakkaille',
      'Erinomainen mobiilipankki ja verkkopankki',
      'Laaja konttoriverkosto koko Suomessa',
      'Monipuoliset lainatuotteet kaikenlaisiin tarpeisiin',
    ],
    cons: [
      'Kulutusluottojen korot eivät aina edullisimmat',
      'Asiakaspalvelun jonotusajat voivat olla pitkiä',
      'Parhaat ehdot vaativat usein keskittämistä',
    ],
    isAffiliate: false,
    applyUrls: {
      asuntolaina: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/lainat/asuntolainat/asuntolaina.html',
      kulutusluotto: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/lainat/kulutusluotot/',
      autolaina: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/lainat/kulutusluotot/autolaina.html',
    },
    products: [
      {
        id: 'nordea-asuntolaina',
        providerId: 'nordea',
        name: 'Nordea Asuntolaina',
        type: 'asuntolaina',
        minAmount: 10000,
        maxAmount: 1000000,
        minTermMonths: 12,
        maxTermMonths: 360,
        nominalRate: { min: 0.35, max: 1.2 },
        effectiveRate: { min: 3.8, max: 5.2 },
        setupFee: 0,
        monthlyFee: 2.5,
        requiresCollateral: true,
        requiresGuarantor: false,
        processingTime: '3–7 arkipäivää',
        features: [
          'Euribor 12 kk + marginaali',
          'Kiinteä korko saatavilla 3, 5, 10 ja 15 vuodeksi',
          'Lyhennysvapaata mahdollista',
          'ASP-laina nuorille ensiasunnon ostajille',
          'Vakuutena yleensä asunto itse',
        ],
        restrictions: [
          'Edellyttää säännöllisiä tuloja',
          'Omarahoitusosuus tyypillisesti 5–15 %',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'nordea-kulutusluotto',
        providerId: 'nordea',
        name: 'Nordea Joustoluotto',
        type: 'kulutusluotto',
        minAmount: 2000,
        maxAmount: 50000,
        minTermMonths: 12,
        maxTermMonths: 144,
        nominalRate: { min: 4.5, max: 12.0 },
        effectiveRate: { min: 5.2, max: 13.8 },
        setupFee: 0,
        monthlyFee: 5.0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–3 arkipäivää',
        features: [
          'Vakuudeton laina',
          'Kiinteä kuukausierä',
          'Mahdollisuus lisälyhennyksiin ilman kuluja',
          'Verkkohakemus — vastaus nopeasti',
        ],
        restrictions: ['Edellyttää Nordean asiakkuutta tai sen avaamista'],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'nordea-autolaina',
        providerId: 'nordea',
        name: 'Nordea Autolaina',
        type: 'autolaina',
        minAmount: 3000,
        maxAmount: 80000,
        minTermMonths: 12,
        maxTermMonths: 96,
        nominalRate: { min: 3.9, max: 9.5 },
        effectiveRate: { min: 4.5, max: 10.8 },
        setupFee: 0,
        monthlyFee: 4.0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–3 arkipäivää',
        features: [
          'Vakuudeton — auto ei vakuutena',
          'Kiinteä korko koko laina-ajalle',
          'Sopii uusiin ja käytettyihin autoihin',
          'Joustava takaisinmaksuaika',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 2. OP (Osuuspankki) ------------------------------------------------------
  {
    id: 'op',
    slug: 'op',
    name: 'OP Ryhmä',
    shortName: 'OP',
    type: 'bank',
    founded: 1902,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.op.fi',
    customerServicePhone: '0100 0500',
    description:
      'OP on Suomen suurin finanssiryhmä asiakasmäärällä mitattuna ja suurin asuntolainoittaja. Osuustoiminnallinen rakenne tarkoittaa, että asiakkaat ovat samalla omistajia. OP-bonusjärjestelmä palkitsee palvelujen keskittämisestä.',
    pros: [
      'Suomen suurin asuntolainoittaja — vahva kokemus',
      'OP-bonukset palkitsevat keskittämisestä',
      'Laajin konttoriverkosto Suomessa',
      'Omistaja-asiakkuus tuo etuja',
      'Monipuolinen vakuutus- ja pankkipalvelupaketti',
    ],
    cons: [
      'Parhaat edut vaativat palvelujen keskittämistä',
      'Kulutusluottojen korot keskitasoa',
      'Digitaaliset palvelut kehittyneet mutta eivät aina markkinoiden kärjessä',
    ],
    isAffiliate: false,
    applyUrls: {
      asuntolaina: 'https://www.op.fi/henkiloasiakkaat/lainat-ja-asunnot/asuntolaina',
      kulutusluotto: 'https://www.op.fi/henkiloasiakkaat/lainat-ja-asunnot/kulutusluotot',
      autolaina: 'https://www.op.fi/henkiloasiakkaat/lainat-ja-asunnot/autolaina',
    },
    products: [
      {
        id: 'op-asuntolaina',
        providerId: 'op',
        name: 'OP Asuntolaina',
        type: 'asuntolaina',
        minAmount: 10000,
        maxAmount: 1000000,
        minTermMonths: 12,
        maxTermMonths: 360,
        nominalRate: { min: 0.39, max: 1.3 },
        effectiveRate: { min: 3.9, max: 5.4 },
        setupFee: 0,
        monthlyFee: 2.5,
        requiresCollateral: true,
        requiresGuarantor: false,
        processingTime: '3–7 arkipäivää',
        features: [
          'Euribor 12 kk + marginaali alkaen 0,39 %',
          'Kiinteä korko saatavilla',
          'ASP-laina nuorille ensiasunnon ostajille',
          'Lyhennysvapaata mahdollista',
          'OP-bonukset kattavat palvelumaksuja',
        ],
        restrictions: [
          'Omarahoitusosuus tyypillisesti 5–15 %',
          'Luottopäätös perustuu kokonaisarvioon',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'op-kulutusluotto',
        providerId: 'op',
        name: 'OP Joustoluotto',
        type: 'kulutusluotto',
        minAmount: 2000,
        maxAmount: 50000,
        minTermMonths: 12,
        maxTermMonths: 144,
        nominalRate: { min: 4.7, max: 13.5 },
        effectiveRate: { min: 5.5, max: 15.0 },
        setupFee: 0,
        monthlyFee: 5.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–2 arkipäivää',
        features: [
          'Vakuudeton laina',
          'Nopea verkkohakemus',
          'Joustava takaisinmaksu',
          'OP-bonukset kertyvät lainasta',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'op-autolaina',
        providerId: 'op',
        name: 'OP Autolaina',
        type: 'autolaina',
        minAmount: 3000,
        maxAmount: 80000,
        minTermMonths: 12,
        maxTermMonths: 96,
        nominalRate: { min: 3.9, max: 9.9 },
        effectiveRate: { min: 4.6, max: 11.2 },
        setupFee: 0,
        monthlyFee: 4.0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–3 arkipäivää',
        features: [
          'Kiinteä korko',
          'Ei vakuusvaatimusta',
          'Sopii uusiin ja käytettyihin autoihin',
          'Lisälyhennykset mahdollisia',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 3. Danske Bank ------------------------------------------------------------
  {
    id: 'danske-bank',
    slug: 'danske-bank',
    name: 'Danske Bank Oyj',
    shortName: 'Danske Bank',
    type: 'bank',
    founded: 1871,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.danskebank.fi',
    customerServicePhone: '0200 2590',
    description:
      'Danske Bank on tanskalaisen Danske Bank -konsernin suomalainen tytäryhtiö ja yksi Suomen suurimmista pankeista (ent. Sampo Pankki). Pankki tunnetaan hyvistä digitaalisista palveluistaan ja kilpailukykyisistä asuntolainakoroista. Danske Bankin mobiilipankki on arvostettu käyttäjäystävällisyydestään.',
    pros: [
      'Erinomaiset digitaaliset palvelut',
      'Kilpailukykyiset asuntolainakorot',
      'Hyvä mobiilipankki (MobilePay-integraatio)',
      'Vahva pohjoismainen taustayhtiö',
    ],
    cons: [
      'Supistaa konttoriverkostoa Suomessa',
      'Ei yhtä laajaa paikallista palvelua kuin OP tai Nordea',
      'Kulutusluottojen enimmäismäärä rajallinen',
    ],
    isAffiliate: false,
    applyUrls: {
      asuntolaina: 'https://www.danskebank.fi/sinulle/lainat/asuntolaina',
      kulutusluotto: 'https://www.danskebank.fi/sinulle/lainat/muut/haavelaina',
    },
    products: [
      {
        id: 'danske-asuntolaina',
        providerId: 'danske-bank',
        name: 'Danske Asuntolaina',
        type: 'asuntolaina',
        minAmount: 10000,
        maxAmount: 800000,
        minTermMonths: 12,
        maxTermMonths: 360,
        nominalRate: { min: 0.38, max: 1.25 },
        effectiveRate: { min: 3.85, max: 5.3 },
        setupFee: 0,
        monthlyFee: 2.5,
        requiresCollateral: true,
        requiresGuarantor: false,
        processingTime: '3–7 arkipäivää',
        features: [
          'Euribor 12 kk + marginaali',
          'Kiinteä korko 3–10 vuodeksi',
          'ASP-laina ensiasunnon ostajille',
          'Lyhennysvapaajaksot neuvoteltavissa',
        ],
        restrictions: ['Omarahoitusosuus yleensä 10–15 %'],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'danske-kulutusluotto',
        providerId: 'danske-bank',
        name: 'Danske Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 2000,
        maxAmount: 40000,
        minTermMonths: 12,
        maxTermMonths: 120,
        nominalRate: { min: 4.9, max: 13.0 },
        effectiveRate: { min: 5.8, max: 14.5 },
        setupFee: 0,
        monthlyFee: 5.0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–3 arkipäivää',
        features: [
          'Vakuudeton',
          'Kiinteä kuukausierä',
          'Verkkohakemus',
          'Lisälyhennykset ilman kuluja',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 4. S-Pankki ---------------------------------------------------------------
  {
    id: 's-pankki',
    slug: 's-pankki',
    name: 'S-Pankki Oyj',
    shortName: 'S-Pankki',
    type: 'bank',
    founded: 2007,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.s-pankki.fi',
    customerServicePhone: '010 76 5800',
    description:
      'S-Pankki on S-ryhmän omistama pankki, joka palvelee erityisesti S-ryhmän asiakaskuntaa. Pankki tarjoaa kilpailukykyisiä lainatuotteita, ja S-Etukortin bonukset tekevät palvelusta houkuttelevan keskittäjille. S-Pankki on kasvanut nopeasti Suomen pankkikentässä.',
    pros: [
      'S-bonus-asiakkaille kilpailukykyiset korot',
      'Palvelua S-ryhmän toimipisteissä',
      'Selkeä ja yksinkertainen tuotevalikoima',
      'Hyvä mobiilisovellus',
    ],
    cons: [
      'Tuotevalikoima suppeampi kuin isoilla pankeilla',
      'Konttoripalvelut rajalliset — pääosin verkossa',
      'Parhaat edut vaativat S-Etukorttia ja keskittämistä',
    ],
    isAffiliate: false,
    applyUrls: {
      asuntolaina: 'https://www.s-pankki.fi/fi/lainat/asuntolaina/',
      kulutusluotto: 'https://www.s-pankki.fi/fi/lainat/s-laina/',
    },
    products: [
      {
        id: 's-pankki-asuntolaina',
        providerId: 's-pankki',
        name: 'S-Asuntolaina',
        type: 'asuntolaina',
        minAmount: 10000,
        maxAmount: 700000,
        minTermMonths: 12,
        maxTermMonths: 300,
        nominalRate: { min: 0.45, max: 1.3 },
        effectiveRate: { min: 3.95, max: 5.4 },
        setupFee: 0,
        monthlyFee: 2.0,
        requiresCollateral: true,
        requiresGuarantor: false,
        processingTime: '3–7 arkipäivää',
        features: [
          'Euribor 12 kk + marginaali',
          'Kiinteä korko saatavilla',
          'Lyhennysvapaajaksot mahdollisia',
          'S-Etukortti-asiakkaille etuja',
        ],
        restrictions: ['Edellyttää S-Etukorttia parhaiden ehtojen saamiseksi'],
        lastUpdated: '2026-04-01',
      },
      {
        id: 's-pankki-kulutusluotto',
        providerId: 's-pankki',
        name: 'S-Laina',
        type: 'kulutusluotto',
        minAmount: 2000,
        maxAmount: 30000,
        minTermMonths: 12,
        maxTermMonths: 120,
        nominalRate: { min: 4.5, max: 12.9 },
        effectiveRate: { min: 5.3, max: 14.2 },
        setupFee: 0,
        monthlyFee: 4.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–2 arkipäivää',
        features: [
          'Vakuudeton',
          'Nopea verkkohakemus',
          'Kiinteä korko ja kuukausierä',
          'Lisälyhennykset mahdollisia',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 5. Aktia ------------------------------------------------------------------
  {
    id: 'aktia',
    slug: 'aktia',
    name: 'Aktia Pankki Oyj',
    shortName: 'Aktia',
    type: 'bank',
    founded: 1991,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.aktia.fi',
    customerServicePhone: '010 247 010',
    description:
      'Aktia on suomalainen pankki, joka on perinteisesti palvellut erityisesti rannikko-Suomen ruotsinkielistä väestöä mutta laajentanut palvelujaan koko maahan. Aktia tunnetaan henkilökohtaisesta palvelusta ja hyvistä varainhoitopalveluista.',
    pros: [
      'Henkilökohtainen palvelu ja neuvonta',
      'Hyvät varainhoitopalvelut',
      'Kilpailukykyiset asuntolainakorot',
      'Kaksikielinen palvelu (suomi/ruotsi)',
    ],
    cons: [
      'Konttoriverkosto painottuu rannikkoalueille',
      'Suppeampi tuotevalikoima kuin isoimmilla pankeilla',
      'Ei yhtä vahva mobiilipankki kuin kilpailijoilla',
    ],
    isAffiliate: false,
    applyUrls: {
      asuntolaina: 'https://www.aktia.fi/fi/asuntolaina',
      kulutusluotto: 'https://www.aktia.fi/fi/kulutusluotto',
    },
    products: [
      {
        id: 'aktia-asuntolaina',
        providerId: 'aktia',
        name: 'Aktia Asuntolaina',
        type: 'asuntolaina',
        minAmount: 10000,
        maxAmount: 700000,
        minTermMonths: 12,
        maxTermMonths: 300,
        nominalRate: { min: 0.42, max: 1.3 },
        effectiveRate: { min: 3.9, max: 5.4 },
        setupFee: 0,
        monthlyFee: 2.5,
        requiresCollateral: true,
        requiresGuarantor: false,
        processingTime: '3–7 arkipäivää',
        features: [
          'Euribor 12 kk + marginaali',
          'Kiinteä korko mahdollinen',
          'ASP-laina nuorille',
          'Joustava takaisinmaksu',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'aktia-kulutusluotto',
        providerId: 'aktia',
        name: 'Aktia Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 2000,
        maxAmount: 30000,
        minTermMonths: 12,
        maxTermMonths: 120,
        nominalRate: { min: 5.0, max: 13.5 },
        effectiveRate: { min: 5.9, max: 15.0 },
        setupFee: 0,
        monthlyFee: 5.0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–3 arkipäivää',
        features: [
          'Vakuudeton',
          'Kiinteä korko',
          'Verkkohakemus',
          'Henkilökohtainen lainaneuvonta saatavilla',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 7. Säästöpankki -----------------------------------------------------------
  {
    id: 'saastopankki',
    slug: 'saastopankki',
    name: 'Säästöpankkiryhmä',
    shortName: 'Säästöpankki',
    type: 'bank',
    founded: 1822,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.saastopankki.fi',
    customerServicePhone: '010 406 7000',
    description:
      'Säästöpankit ovat Suomen vanhimpia pankkeja. Ryhmä koostuu itsenäisistä säästöpankeista ympäri Suomea. Paikallinen palvelu ja henkilökohtainen asiakaskokemus ovat Säästöpankin vahvuuksia. Pankit tekevät yhteistyötä Sp-Kodin ja Sp-Hengin kanssa.',
    pros: [
      'Paikallinen, henkilökohtainen palvelu',
      'Kilpailukykyiset lainakorot paikkakunnittain',
      'Pitkä historia ja luotettavuus',
      'Vahva yhteisöllisyys ja paikallisuus',
    ],
    cons: [
      'Konttoriverkosto painottuu pienempiin paikkakuntiin',
      'Digitaaliset palvelut kehittymässä mutta eivät kärjessä',
      'Palvelutaso vaihtelee pankeittain',
    ],
    isAffiliate: false,
    applyUrls: {
      asuntolaina: 'https://www.saastopankki.fi/fi-fi/lainat/asuntolaina',
      kulutusluotto: 'https://www.saastopankki.fi/fi-fi/lainat/kulutusluotto',
    },
    products: [
      {
        id: 'saastopankki-asuntolaina',
        providerId: 'saastopankki',
        name: 'Säästöpankki Asuntolaina',
        type: 'asuntolaina',
        minAmount: 10000,
        maxAmount: 500000,
        minTermMonths: 12,
        maxTermMonths: 300,
        nominalRate: { min: 0.4, max: 1.35 },
        effectiveRate: { min: 3.9, max: 5.5 },
        setupFee: 0,
        monthlyFee: 2.5,
        requiresCollateral: true,
        requiresGuarantor: false,
        processingTime: '3–7 arkipäivää',
        features: [
          'Euribor 12 kk + marginaali',
          'Henkilökohtainen lainaneuvonta',
          'Paikallinen päätöksenteko',
          'Kiinteä korko saatavilla',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'saastopankki-kulutusluotto',
        providerId: 'saastopankki',
        name: 'Säästöpankki Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 2000,
        maxAmount: 30000,
        minTermMonths: 12,
        maxTermMonths: 120,
        nominalRate: { min: 5.0, max: 14.0 },
        effectiveRate: { min: 5.9, max: 15.5 },
        setupFee: 0,
        monthlyFee: 5.0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–3 arkipäivää',
        features: [
          'Vakuudeton',
          'Paikallinen päätöksenteko — joustava',
          'Kiinteä korko ja kuukausierä',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 8. POP Pankki -------------------------------------------------------------
  {
    id: 'pop-pankki',
    slug: 'pop-pankki',
    name: 'POP Pankkiliitto',
    shortName: 'POP Pankki',
    type: 'bank',
    founded: 1997,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.poppankki.fi',
    customerServicePhone: '09 4135 2400',
    description:
      'POP Pankit ovat suomalaisia osuustoiminnallisia pankkeja, jotka keskittyvät paikalliseen palveluun. Pankkien vahvuus on paikallinen päätöksenteko ja henkilökohtainen asiakaspalvelu. POP Pankkeja on noin 20 ympäri Suomea.',
    pros: [
      'Paikallinen ja henkilökohtainen palvelu',
      'Nopea paikallinen päätöksenteko',
      'Osuustoiminnallinen — asiakkaat omistajia',
      'Kilpailukykyiset korot paikallisesti',
    ],
    cons: [
      'Pieni konttoriverkosto valtakunnallisesti',
      'Digitaaliset palvelut rajalliset verrattuna isoihin pankkeihin',
      'Palvelutaso ja hinnoittelu vaihtelee pankeittain',
    ],
    isAffiliate: false,
    applyUrls: {
      asuntolaina: 'https://www.poppankki.fi/palvelut/asuntolainat/asuntolaina',
      kulutusluotto: 'https://www.poppankki.fi/palvelut/lainat-ja-luotot/pop-pikalaina',
    },
    products: [
      {
        id: 'pop-asuntolaina',
        providerId: 'pop-pankki',
        name: 'POP Asuntolaina',
        type: 'asuntolaina',
        minAmount: 10000,
        maxAmount: 400000,
        minTermMonths: 12,
        maxTermMonths: 300,
        nominalRate: { min: 0.45, max: 1.4 },
        effectiveRate: { min: 3.95, max: 5.5 },
        setupFee: 0,
        monthlyFee: 2.5,
        requiresCollateral: true,
        requiresGuarantor: false,
        processingTime: '3–7 arkipäivää',
        features: [
          'Euribor 12 kk + marginaali',
          'Paikallinen päätöksenteko',
          'Henkilökohtainen neuvonta',
          'ASP-laina nuorille',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'pop-kulutusluotto',
        providerId: 'pop-pankki',
        name: 'POP Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 2000,
        maxAmount: 25000,
        minTermMonths: 12,
        maxTermMonths: 96,
        nominalRate: { min: 5.5, max: 14.5 },
        effectiveRate: { min: 6.4, max: 16.0 },
        setupFee: 0,
        monthlyFee: 5.0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–3 arkipäivää',
        features: [
          'Vakuudeton',
          'Paikallinen päätöksenteko',
          'Kiinteä korko',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 9. Oma Säästöpankki -------------------------------------------------------
  {
    id: 'oma-saastopankki',
    slug: 'oma-saastopankki',
    name: 'Oma Säästöpankki Oyj',
    shortName: 'OmaSp',
    type: 'bank',
    founded: 2009,
    headquarters: 'Seinäjoki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.omasp.fi',
    customerServicePhone: '020 784 0000',
    description:
      'Oma Säästöpankki on nopeasti kasvanut suomalainen pankki, joka syntyi useiden pienten säästöpankkien yhdistymisestä. Pankki on listattu Helsingin pörssiin ja tunnetaan aktiivisesta kasvustrategiastaan. OmaSp yhdistää paikallisen palvelun moderniin digipalveluun.',
    pros: [
      'Nopeasti kasvava ja innovatiivinen pankki',
      'Kilpailukykyiset korot — haastaa isoja pankkeja',
      'Hyvät digitaaliset palvelut',
      'Henkilökohtainen palvelu säilyy',
    ],
    cons: [
      'Nuorempi pankki — ei yhtä pitkää historiaa',
      'Konttoriverkosto kasvaa mutta ei kaikkialla',
      'Pörssiyhtiönä fokus voi vaihdella',
    ],
    isAffiliate: false,
    applyUrls: {
      asuntolaina: 'https://www.omasp.fi/henkiloasiakas/lainat/hae-lainaa/asuntolaina',
      kulutusluotto: 'https://www.omasp.fi/henkiloasiakas/lainat/hae-lainaa/kulutusluotto',
    },
    products: [
      {
        id: 'omasp-asuntolaina',
        providerId: 'oma-saastopankki',
        name: 'OmaSp Asuntolaina',
        type: 'asuntolaina',
        minAmount: 10000,
        maxAmount: 500000,
        minTermMonths: 12,
        maxTermMonths: 300,
        nominalRate: { min: 0.39, max: 1.25 },
        effectiveRate: { min: 3.85, max: 5.3 },
        setupFee: 0,
        monthlyFee: 2.0,
        requiresCollateral: true,
        requiresGuarantor: false,
        processingTime: '2–5 arkipäivää',
        features: [
          'Euribor 12 kk + marginaali',
          'Kilpailukykyinen hinnoittelu',
          'Nopea päätöksenteko',
          'Henkilökohtainen palvelu',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'omasp-kulutusluotto',
        providerId: 'oma-saastopankki',
        name: 'OmaSp Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 2000,
        maxAmount: 40000,
        minTermMonths: 12,
        maxTermMonths: 120,
        nominalRate: { min: 4.8, max: 13.0 },
        effectiveRate: { min: 5.6, max: 14.5 },
        setupFee: 0,
        monthlyFee: 4.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–2 arkipäivää',
        features: [
          'Vakuudeton',
          'Nopea verkkohakemus',
          'Kiinteä korko ja kuukausierä',
          'Joustava laina-aika',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 10. Ålandsbanken ----------------------------------------------------------
  {
    id: 'alandsbanken',
    slug: 'alandsbanken',
    name: 'Ålandsbanken Abp',
    shortName: 'Ålandsbanken',
    type: 'bank',
    founded: 1919,
    headquarters: 'Maarianhamina',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.alandsbanken.fi',
    customerServicePhone: '0204 29 011',
    description:
      'Ålandsbanken on ahvenanmaalainen pankki, joka on laajentunut Manner-Suomeen ja Ruotsiin. Pankki on edelläkävijä kestävässä pankkitoiminnassa ja tarjoaa Ålandsbanken Baltic Sea Card -korttia, joka seuraa ostosten hiilijalanjälkeä. Premium-palvelu vaativammille asiakkaille.',
    pros: [
      'Edelläkävijä kestävässä pankkitoiminnassa',
      'Premium-tason henkilökohtainen palvelu',
      'Hyvät varainhoitopalvelut',
      'Kaksikielinen palvelu (suomi/ruotsi)',
      'Baltic Sea Card — vastuullisuutta arjessa',
    ],
    cons: [
      'Hyvin rajallinen konttoriverkosto',
      'Palvelut keskittyvät pääkaupunkiseudulle ja Ahvenanmaalle',
      'Ei edullisimmat lainakorot kaikissa tuotteissa',
    ],
    isAffiliate: false,
    applyUrls: {
      asuntolaina: 'https://www.alandsbanken.fi/pankkipalvelut/lainat/asuntolaina',
    },
    products: [
      {
        id: 'alandsbanken-asuntolaina',
        providerId: 'alandsbanken',
        name: 'Ålandsbanken Asuntolaina',
        type: 'asuntolaina',
        minAmount: 20000,
        maxAmount: 700000,
        minTermMonths: 12,
        maxTermMonths: 300,
        nominalRate: { min: 0.4, max: 1.2 },
        effectiveRate: { min: 3.85, max: 5.2 },
        setupFee: 0,
        monthlyFee: 2.5,
        requiresCollateral: true,
        requiresGuarantor: false,
        processingTime: '3–7 arkipäivää',
        features: [
          'Euribor 12 kk + marginaali',
          'Kiinteä korko mahdollinen',
          'Kestävän kehityksen asuntolainaetu',
          'Henkilökohtainen neuvonta',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // =========================================================================
  // FINTECH / ONLINE LENDERS (11–22)
  // =========================================================================

  // 11. Bank Norwegian --------------------------------------------------------
  {
    id: 'bank-norwegian',
    slug: 'bank-norwegian',
    name: 'Bank Norwegian AS',
    shortName: 'Bank Norwegian',
    type: 'fintech',
    founded: 2007,
    headquarters: 'Oslo',
    country: 'NO',
    finFsaRegulated: true,
    website: 'https://www.banknorwegian.fi',
    customerServicePhone: '09 4245 8670',
    description:
      'Bank Norwegian on norjalainen verkkopankki, joka on saavuttanut suuren suosion Suomessa erityisesti kulutusluotoissaan. Pankki tunnetaan kilpailukykyisistä koroistaan, nopeasta hakuprosessista ja siitä, ettei lainoissa ole avaus- eikä käsittelymaksuja.',
    pros: [
      'Ei avausmaksua eikä kuukausimaksuja',
      'Kilpailukykyiset korot kulutusluotoissa',
      'Täysin digitaalinen ja nopea prosessi',
      'Lisälyhennykset ja ennenaikainen takaisinmaksu ilman kuluja',
      'Suuri lainakatto 60 000 euroa',
    ],
    cons: [
      'Vain kulutusluottoja — ei asuntolainoja',
      'Ei konttoreita Suomessa',
      'Asiakaspalvelu vain puhelimitse ja verkossa',
      'Korkeampi korko pienemmillä lainasummilla',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://www.banknorwegian.fi/laina/kulutusluotto/',
      yhdistelylaina: 'https://www.banknorwegian.fi/laina/lainojen-yhdistaminen/',
    },
    products: [
      {
        id: 'bank-norwegian-kulutusluotto',
        providerId: 'bank-norwegian',
        name: 'Bank Norwegian Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 1000,
        maxAmount: 60000,
        minTermMonths: 12,
        maxTermMonths: 180,
        nominalRate: { min: 4.9, max: 19.9 },
        effectiveRate: { min: 5.01, max: 20.0 },
        setupFee: 0,
        monthlyFee: 0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1 arkipäivä',
        features: [
          'Ei avausmaksua',
          'Ei kuukausimaksua',
          'Lisälyhennykset ilman kuluja',
          'Nopea verkkohakemus — vastaus samana päivänä',
          'Kiinteä korko koko laina-ajalle',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'bank-norwegian-yhdistelylaina',
        providerId: 'bank-norwegian',
        name: 'Bank Norwegian Yhdistelylaina',
        type: 'yhdistelylaina',
        minAmount: 3000,
        maxAmount: 60000,
        minTermMonths: 12,
        maxTermMonths: 180,
        nominalRate: { min: 4.9, max: 19.9 },
        effectiveRate: { min: 5.01, max: 20.0 },
        setupFee: 0,
        monthlyFee: 0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1 arkipäivä',
        features: [
          'Yhdistä vanhat lainat edullisemmaksi',
          'Ei avaus- tai kuukausimaksuja',
          'Bank Norwegian maksaa vanhat lainat puolestasi',
          'Yksi selkeä kuukausierä',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 12. Ferratum (Multitude) --------------------------------------------------
  {
    id: 'ferratum',
    slug: 'ferratum',
    name: 'Multitude SE (Ferratum)',
    shortName: 'Ferratum',
    type: 'fintech',
    founded: 2005,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.ferratum.fi',
    customerServicePhone: '09 2311 3670',
    description:
      'Ferratum (nykyään Multitude-konsernin osa) on suomalainen fintech-yritys, joka tarjoaa kulutusluottoja ja pienlainoja. Ferratum oli yksi ensimmäisiä mobiililainoja tarjoavia yrityksiä maailmassa. Nopea lainapäätös ja digitaalinen prosessi ovat vahvuuksia.',
    pros: [
      'Erittäin nopea lainapäätös — jopa minuuteissa',
      'Suomalainen fintech-yritys',
      'Helppo verkkohakemus',
      'Lainaa myös pienemmillä summilla',
    ],
    cons: [
      'Korkeammat korot kuin perinteisillä pankeilla',
      'Palvelumaksut voivat olla korkeat',
      'Ei sovellu suuriin hankintoihin',
      'Rajalliset tuotteet — vain kulutusluottoja',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://www.ferratumbank.fi/joustoluotto',
      pikavippi: 'https://www.ferratumbank.fi/joustoluotto',
    },
    products: [
      {
        id: 'ferratum-kulutusluotto',
        providerId: 'ferratum',
        name: 'Ferratum Prima',
        type: 'kulutusluotto',
        minAmount: 300,
        maxAmount: 20000,
        minTermMonths: 6,
        maxTermMonths: 72,
        nominalRate: { min: 9.9, max: 19.9 },
        effectiveRate: { min: 12.5, max: 20.0 },
        setupFee: 0,
        monthlyFee: 6.9,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: 'Jopa 15 minuuttia',
        features: [
          'Nopea lainapäätös',
          'Rahat tilille samana päivänä',
          'Verkko- ja mobiilihakemus',
          'Joustava takaisinmaksu',
        ],
        restrictions: ['Vähimmäistulot vaaditaan', 'Ikäraja 20 vuotta'],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'ferratum-pikavippi',
        providerId: 'ferratum',
        name: 'Ferratum Pikavippi',
        type: 'pikavippi',
        minAmount: 100,
        maxAmount: 2000,
        minTermMonths: 1,
        maxTermMonths: 12,
        nominalRate: { min: 9.9, max: 19.9 },
        effectiveRate: { min: 15.0, max: 20.0 },
        setupFee: 0,
        monthlyFee: 5.9,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: 'Jopa 15 minuuttia',
        features: [
          'Nopea lainapäätös — jopa minuuteissa',
          'Rahat tilille samana päivänä',
          'Pienet lainasummat 100–2 000 €',
          'Mobiilihakemus',
        ],
        restrictions: ['Ikäraja 20 vuotta', 'Säännölliset tulot vaaditaan', 'Korkokatto 20 %'],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 13. Resurs Bank -----------------------------------------------------------
  {
    id: 'resurs-bank',
    slug: 'resurs-bank',
    name: 'Resurs Bank AB',
    shortName: 'Resurs Bank',
    type: 'fintech',
    founded: 1977,
    headquarters: 'Helsingborg',
    country: 'SE',
    finFsaRegulated: true,
    website: 'https://www.resursbank.fi',
    customerServicePhone: '010 322 5600',
    description:
      'Resurs Bank on ruotsalainen pankki, joka tunnetaan erityisesti kaupan rahoitusratkaisuista ja kulutusluotoista. Suomessa Resurs Bank tarjoaa kulutusluottoja ja on suosittu verkkokauppojen osamaksurahoituksessa.',
    pros: [
      'Suosittu verkkokauppojen rahoituskumppani',
      'Kohtuulliset korot vakiintuneena toimijana',
      'Helppo hakemus',
      'Yhdistelylaina saatavilla',
    ],
    cons: [
      'Ei asuntolainoja',
      'Osamaksurahoituksen korot voivat olla korkeita',
      'Asiakaspalvelu pääosin verkossa',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://www.resursbank.fi/lainaa/kulutusluotto',
      yhdistelylaina: 'https://www.resursbank.fi/lainaa/yhdista-lainat',
    },
    products: [
      {
        id: 'resurs-kulutusluotto',
        providerId: 'resurs-bank',
        name: 'Resurs Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 1000,
        maxAmount: 30000,
        minTermMonths: 12,
        maxTermMonths: 144,
        nominalRate: { min: 6.9, max: 18.9 },
        effectiveRate: { min: 7.8, max: 20.0 },
        setupFee: 0,
        monthlyFee: 3.95,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–2 arkipäivää',
        features: [
          'Vakuudeton',
          'Kiinteä kuukausierä',
          'Verkkohakemus',
          'Sopii myös yhdistelylainaksi',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'resurs-yhdistelylaina',
        providerId: 'resurs-bank',
        name: 'Resurs Yhdistelylaina',
        type: 'yhdistelylaina',
        minAmount: 2000,
        maxAmount: 30000,
        minTermMonths: 12,
        maxTermMonths: 144,
        nominalRate: { min: 6.9, max: 18.9 },
        effectiveRate: { min: 7.8, max: 20.0 },
        setupFee: 0,
        monthlyFee: 3.95,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–2 arkipäivää',
        features: [
          'Yhdistä vanhat lainat yhdeksi',
          'Yksi kuukausierä',
          'Mahdollisesti pienempi kokonaiskorko',
          'Verkkohakemus',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 14. Svea Ekonomi ----------------------------------------------------------
  {
    id: 'svea-ekonomi',
    slug: 'svea-ekonomi',
    name: 'Svea Bank AB',
    shortName: 'Svea',
    type: 'fintech',
    founded: 1981,
    headquarters: 'Tukholma',
    country: 'SE',
    finFsaRegulated: true,
    website: 'https://www.svea.com/fi',
    customerServicePhone: '010 271 5700',
    description:
      'Svea Ekonomi (Svea Bank) on ruotsalainen finanssiyhtiö, joka tarjoaa Suomessa kulutusluottoja, laskurahoitusta ja verkkokaupan maksupalveluja. Svea on vakiintunut toimija pohjoismaisten yritysten rahoituspalveluissa.',
    pros: [
      'Monipuoliset rahoituspalvelut — kuluttajat ja yritykset',
      'Laskurahoitus yrityksille',
      'Vakiintunut pohjoismainen toimija',
      'Verkkokauppojen maksupalvelut',
    ],
    cons: [
      'Kulutusluottojen korot keskitason yläpuolella',
      'Ei asuntolainoja',
      'Tunnetumpi yrityspalveluista kuin kuluttajalainoista',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://www.svea.com/fi-fi/kuluttajat/lainat/kulutusluotto',
      yrityslaina: 'https://www.svea.com/fi-fi/yritykset/yritysrahoitus',
    },
    products: [
      {
        id: 'svea-kulutusluotto',
        providerId: 'svea-ekonomi',
        name: 'Svea Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 500,
        maxAmount: 20000,
        minTermMonths: 6,
        maxTermMonths: 96,
        nominalRate: { min: 7.5, max: 19.5 },
        effectiveRate: { min: 8.9, max: 20.0 },
        setupFee: 0,
        monthlyFee: 3.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–2 arkipäivää',
        features: [
          'Vakuudeton',
          'Nopea verkkohakemus',
          'Kiinteä kuukausierä',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'svea-yrityslaina',
        providerId: 'svea-ekonomi',
        name: 'Svea Yrityslaina',
        type: 'yrityslaina',
        minAmount: 5000,
        maxAmount: 250000,
        minTermMonths: 6,
        maxTermMonths: 60,
        nominalRate: { min: 5.5, max: 15.0 },
        effectiveRate: { min: 6.5, max: 17.0 },
        setupFee: 200,
        monthlyFee: 0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–5 arkipäivää',
        features: [
          'Vakuudeton yrityslaina',
          'Laskurahoitus saatavilla',
          'Nopea päätöksenteko',
          'Sopii pk-yrityksille',
        ],
        restrictions: [
          'Edellyttää vähintään 1 vuoden liiketoimintaa',
          'Y-tunnus vaaditaan',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 15. TF Bank ---------------------------------------------------------------
  {
    id: 'tf-bank',
    slug: 'tf-bank',
    name: 'TF Bank AB',
    shortName: 'TF Bank',
    type: 'fintech',
    founded: 1987,
    headquarters: 'Borås',
    country: 'SE',
    finFsaRegulated: true,
    website: 'https://www.tfbank.fi',
    customerServicePhone: '09 4245 0350',
    description:
      'TF Bank on ruotsalainen verkkopankki, joka tarjoaa Suomessa kulutusluottoja ja säästötilejä. Pankki on pörssinoteerattu ja toimii useissa Euroopan maissa. TF Bank tunnetaan kilpailukykyisistä koroistaan ja yksinkertaisesta hakuprosessista.',
    pros: [
      'Kilpailukykyiset korot',
      'Yksinkertainen ja nopea verkkohakemus',
      'Ei avausmaksua',
      'Pörssinoteerattu — läpinäkyvä toimija',
    ],
    cons: [
      'Rajoitettu tuotevalikoima — vain kulutusluottoja',
      'Ei konttoreita Suomessa',
      'Ei yhtä tunnettu kuin suuremmat pankit',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://www.tfbank.fi/lainat/laina',
    },
    products: [
      {
        id: 'tf-bank-kulutusluotto',
        providerId: 'tf-bank',
        name: 'TF Bank Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 1000,
        maxAmount: 50000,
        minTermMonths: 12,
        maxTermMonths: 144,
        nominalRate: { min: 4.99, max: 16.9 },
        effectiveRate: { min: 5.6, max: 18.5 },
        setupFee: 0,
        monthlyFee: 3.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1 arkipäivä',
        features: [
          'Ei avausmaksua',
          'Kiinteä korko',
          'Nopea verkkohakemus',
          'Lisälyhennykset mahdollisia',
          'Laina-aika jopa 12 vuotta',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 16. Santander Consumer Finance --------------------------------------------
  {
    id: 'santander',
    slug: 'santander',
    name: 'Santander Consumer Finance Oy',
    shortName: 'Santander',
    type: 'fintech',
    founded: 1857,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.santanderconsumer.fi',
    customerServicePhone: '0800 1 7272',
    description:
      'Santander Consumer Finance on espanjalaisen Santander-konsernin tytäryhtiö, joka on Suomen johtava autorahoittaja. Pankki tekee yhteistyötä autoliikkeiden kanssa ja tarjoaa kilpailukykyistä autorahoitusta sekä kulutusluottoja.',
    pros: [
      'Suomen johtava autorahoittaja',
      'Kilpailukykyiset autorahoituksen korot',
      'Laaja yhteistyöverkosto autoliikkeiden kanssa',
      'Nopea rahoituspäätös autoliikkeessä',
      'Suuri kansainvälinen konserni taustalla',
    ],
    cons: [
      'Kulutusluottojen korot keskitasoa tai korkeammat',
      'Ei asuntolainoja',
      'Asiakaspalvelu pääosin puhelimitse',
      'Keskittyy autorahoitukseen — muut tuotteet rajallisia',
    ],
    isAffiliate: false,
    applyUrls: {
      autolaina: 'https://www.santanderconsumer.fi/laina/autolaina',
      kulutusluotto: 'https://www.santanderconsumer.fi/laina',
    },
    products: [
      {
        id: 'santander-autolaina',
        providerId: 'santander',
        name: 'Santander Autolaina',
        type: 'autolaina',
        minAmount: 2000,
        maxAmount: 100000,
        minTermMonths: 12,
        maxTermMonths: 96,
        nominalRate: { min: 3.5, max: 9.9 },
        effectiveRate: { min: 4.2, max: 11.5 },
        setupFee: 0,
        monthlyFee: 3.0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: 'Jopa saman päivän aikana',
        features: [
          'Nopea päätös autoliikkeessä',
          'Kilpailukykyiset korot',
          'Sopii uusiin ja käytettyihin autoihin',
          'Joustava takaisinmaksuaika',
          'Jäännösarvorahoitus (leasing-tyyppinen)',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'santander-kulutusluotto',
        providerId: 'santander',
        name: 'Santander Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 1000,
        maxAmount: 30000,
        minTermMonths: 12,
        maxTermMonths: 120,
        nominalRate: { min: 6.9, max: 17.9 },
        effectiveRate: { min: 7.8, max: 19.8 },
        setupFee: 0,
        monthlyFee: 4.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–2 arkipäivää',
        features: ['Vakuudeton', 'Kiinteä korko', 'Verkkohakemus'],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 19. GF Money --------------------------------------------------------------
  {
    id: 'gf-money',
    slug: 'gf-money',
    name: 'GF Money Consumer Finance Oy',
    shortName: 'GF Money',
    type: 'fintech',
    founded: 2015,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.gfmoney.fi',
    customerServicePhone: '09 4245 1780',
    description:
      'GF Money on suomalainen fintech-yritys, joka tarjoaa pieniä ja keskisuuria kulutusluottoja. Yritys keskittyy nopeaan ja digitaaliseen lainapalveluun.',
    pros: [
      'Suomalainen yritys — paikallinen palvelu',
      'Nopea hakemus ja päätös',
      'Pienetkin lainasummat mahdollisia',
      'Selkeä hinnoittelu',
    ],
    cons: [
      'Korkeammat korot kuin pankeilla',
      'Rajallinen lainakatto',
      'Pieni toimija — rajallinen tunnettuus',
      'Kuukausimaksut nostavat todellista korkoa',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://gfcard.fi/lainaa/',
      pikavippi: 'https://gfcard.fi/pikavippi/',
    },
    products: [
      {
        id: 'gf-money-kulutusluotto',
        providerId: 'gf-money',
        name: 'GF Money Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 500,
        maxAmount: 15000,
        minTermMonths: 6,
        maxTermMonths: 72,
        nominalRate: { min: 8.9, max: 19.9 },
        effectiveRate: { min: 10.5, max: 20.0 },
        setupFee: 0,
        monthlyFee: 5.9,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: 'Jopa 15 minuuttia',
        features: [
          'Nopea lainapäätös',
          'Pienetkin summat mahdollisia',
          'Verkkohakemus 24/7',
          'Rahat tilille nopeasti',
        ],
        restrictions: ['Ikäraja 20 vuotta', 'Säännölliset tulot vaaditaan'],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'gf-money-pikavippi',
        providerId: 'gf-money',
        name: 'GF Money Pikavippi',
        type: 'pikavippi',
        minAmount: 100,
        maxAmount: 1500,
        minTermMonths: 1,
        maxTermMonths: 6,
        nominalRate: { min: 9.9, max: 19.9 },
        effectiveRate: { min: 16.0, max: 20.0 },
        setupFee: 0,
        monthlyFee: 5.9,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: 'Jopa 15 minuuttia',
        features: [
          'Nopea lainapäätös',
          'Pienet summat 100–1 500 €',
          'Verkkohakemus 24/7',
          'Rahat tilille nopeasti',
        ],
        restrictions: ['Ikäraja 20 vuotta', 'Säännölliset tulot vaaditaan', 'Korkokatto 20 %'],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 20. Lea Bank --------------------------------------------------------------
  {
    id: 'lea-bank',
    slug: 'lea-bank',
    name: 'Lea Bank ASA',
    shortName: 'Lea Bank',
    type: 'fintech',
    founded: 2015,
    headquarters: 'Oslo',
    country: 'NO',
    finFsaRegulated: true,
    website: 'https://www.leabank.fi',
    customerServicePhone: '09 4245 6890',
    description:
      'Lea Bank on norjalainen verkkopankki, joka tarjoaa Suomessa kulutusluottoja ja säästötilejä. Pankki tunnetaan yksinkertaisesta hakuprosessista ja kilpailukykyisistä koroista. Lea Bank on ollut yksi nopeimmin kasvavista verkkopankeista Pohjoismaissa.',
    pros: [
      'Kilpailukykyiset korot',
      'Ei avausmaksua eikä kuukausimaksua',
      'Yksinkertainen verkkohakemus',
      'Nopea lainapäätös',
    ],
    cons: [
      'Ei konttoreita Suomessa',
      'Rajoitettu tuotevalikoima',
      'Suhteellisen uusi toimija',
      'Asiakaspalvelu vain verkossa ja puhelimitse',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://www.leabank.fi/lainat/kulutusluotto',
    },
    products: [
      {
        id: 'lea-bank-kulutusluotto',
        providerId: 'lea-bank',
        name: 'Lea Bank Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 1000,
        maxAmount: 50000,
        minTermMonths: 12,
        maxTermMonths: 180,
        nominalRate: { min: 4.9, max: 18.9 },
        effectiveRate: { min: 5.01, max: 20.0 },
        setupFee: 0,
        monthlyFee: 0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1 arkipäivä',
        features: [
          'Ei avausmaksua',
          'Ei kuukausimaksua',
          'Kiinteä korko',
          'Nopea verkkohakemus',
          'Lisälyhennykset ilman kuluja',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 22. Saldo Finance ---------------------------------------------------------
  {
    id: 'saldo-finance',
    slug: 'saldo-finance',
    name: 'Saldo Finance Oy',
    shortName: 'Saldo Finance',
    type: 'fintech',
    founded: 2018,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.saldofinance.fi',
    customerServicePhone: '09 4245 3500',
    description:
      'Saldo Finance on suomalainen fintech-yritys, joka tarjoaa kulutusluottoja verkossa. Yritys pyrkii erottumaan helppokäyttöisellä palvelulla ja läpinäkyvällä hinnoittelulla. Saldo Finance on suhteellisen uusi mutta kasvava toimija Suomen lainamarkkinoilla.',
    pros: [
      'Suomalainen yritys',
      'Läpinäkyvä hinnoittelu',
      'Helppo verkkohakemus',
      'Nopea käsittely',
    ],
    cons: [
      'Pieni ja uusi toimija',
      'Rajoitettu tuotevalikoima',
      'Korkeammat korot kuin suurilla pankeilla',
      'Rajallinen tunnettuus',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://www.saldo.com/fi-fi/hae/kulutusluotto/',
    },
    products: [
      {
        id: 'saldo-kulutusluotto',
        providerId: 'saldo-finance',
        name: 'Saldo Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 500,
        maxAmount: 20000,
        minTermMonths: 6,
        maxTermMonths: 72,
        nominalRate: { min: 8.5, max: 19.5 },
        effectiveRate: { min: 10.0, max: 20.0 },
        setupFee: 0,
        monthlyFee: 4.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1 arkipäivä',
        features: [
          'Vakuudeton',
          'Nopea verkkohakemus',
          'Kiinteä korko',
          'Selkeä kuukausierä',
        ],
        restrictions: ['Ikäraja 20 vuotta', 'Säännölliset tulot vaaditaan'],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // =========================================================================
  // P2P / ALTERNATIVE LENDERS (23–26)
  // =========================================================================

  // 23. Alisa Pankki (ent. Fellow Finance) ------------------------------------
  {
    id: 'fellow-finance',
    slug: 'fellow-finance',
    name: 'Alisa Pankki Oyj',
    shortName: 'Alisa Pankki',
    type: 'bank',
    founded: 2013,
    headquarters: 'Helsinki',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.alisapankki.fi',
    customerServicePhone: '010 279 3920',
    description:
      'Alisa Pankki (entinen Fellow Finance) on suomalainen pankki, joka keskittyy nykyisin yksinomaan yritysrahoitukseen. Yhtiö luopui kuluttajaluottojen myöntämisestä ja muuttui pankiksi. Alisa Pankki tarjoaa pk-yrityksille vakuudettomia yrityslainoja nopealla päätöksenteolla.',
    pros: [
      'Suomalainen pankki, joka tuntee kotimaiset pk-yritykset',
      'Nopea päätöksenteko ja rahoitus',
      'Vakuudettomat yrityslainat',
      'Läpinäkyvät ehdot',
    ],
    cons: [
      'Ei kuluttajatuotteita — vain yritysasiakkaat',
      'Korot korkeammat kuin perinteisillä pankeilla',
      'Edellyttää vakiintunutta liiketoimintaa',
    ],
    isAffiliate: false,
    applyUrls: {
      yrityslaina: 'https://www.alisapankki.fi/yritysasiakas/yrityslaina',
    },
    products: [
      {
        id: 'fellow-yrityslaina',
        providerId: 'fellow-finance',
        name: 'Alisa Pankki Yrityslaina',
        type: 'yrityslaina',
        minAmount: 3000,
        maxAmount: 100000,
        minTermMonths: 6,
        maxTermMonths: 60,
        nominalRate: { min: 5.9, max: 15.0 },
        effectiveRate: { min: 7.5, max: 18.0 },
        setupFee: 0,
        monthlyFee: 0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '2–5 arkipäivää',
        features: [
          'Yrityslaina pk-yrityksille',
          'Vakuudeton',
          'Nopea käsittely',
          'Digitaalinen hakuprosessi',
        ],
        restrictions: [
          'Edellyttää vähintään 1 vuoden liiketoimintaa',
          'Tilinpäätöstiedot vaaditaan',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // 24. Fixura ----------------------------------------------------------------
  {
    id: 'fixura',
    slug: 'fixura',
    name: 'Fixura Ab Oy',
    shortName: 'Fixura',
    type: 'p2p',
    founded: 2010,
    headquarters: 'Turku',
    country: 'FI',
    finFsaRegulated: true,
    website: 'https://www.fixura.fi',
    customerServicePhone: '02 515 3630',
    description:
      'Fixura on suomalainen vertaislainauspalvelu, jossa yksityishenkilöt voivat lainata toisilleen rahaa. Fixuran konsepti on "sosiaalinen lainaaminen", jossa lainanhakijat ja sijoittajat kohtaavat digitaalisella markkinapaikalla. Fixura on yksi Suomen ensimmäisiä P2P-lainauspalveluja.',
    pros: [
      'Suomalainen pioneeri vertaislainauksessa',
      'Sosiaalinen lainauskonsepti',
      'Läpinäkyvä toimintamalli',
      'Myös pieniä lainasummia',
    ],
    cons: [
      'Korot usein korkeammat kuin pankeilla',
      'Laina ei välttämättä toteudu, jos sijoittajia ei löydy',
      'Pieni toimija — rajalliset resurssit',
      'Hakuprosessi voi kestää pidempään',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://www.fixura.fi/fi-fi/joustoluotto',
      pikavippi: 'https://www.fixura.fi/fi-fi/joustoluotto',
    },
    products: [
      {
        id: 'fixura-kulutusluotto',
        providerId: 'fixura',
        name: 'Fixura Vertaislaina',
        type: 'kulutusluotto',
        minAmount: 200,
        maxAmount: 10000,
        minTermMonths: 6,
        maxTermMonths: 60,
        nominalRate: { min: 7.0, max: 19.9 },
        effectiveRate: { min: 9.0, max: 20.0 },
        setupFee: 0,
        monthlyFee: 3.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–5 arkipäivää',
        features: [
          'Vertaislaina — rahoitus yksityisiltä henkilöiltä',
          'Pienetkin summat mahdollisia',
          'Sosiaalinen lainauskonsepti',
          'Verkkohakemus',
        ],
        restrictions: [
          'Rahoitus riippuu sijoittajien kiinnostuksesta',
          'Ikäraja 18 vuotta',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'fixura-pikavippi',
        providerId: 'fixura',
        name: 'Fixura Pikavippi',
        type: 'pikavippi',
        minAmount: 100,
        maxAmount: 1000,
        minTermMonths: 1,
        maxTermMonths: 6,
        nominalRate: { min: 9.0, max: 19.9 },
        effectiveRate: { min: 15.0, max: 20.0 },
        setupFee: 0,
        monthlyFee: 3.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–5 arkipäivää',
        features: [
          'Vertaislaina — rahoitus yksityisiltä henkilöiltä',
          'Pienet summat 100–1 000 €',
          'Sosiaalinen lainauskonsepti',
          'Verkkohakemus',
        ],
        restrictions: [
          'Rahoitus riippuu sijoittajien kiinnostuksesta',
          'Ikäraja 18 vuotta',
          'Korkokatto 20 %',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },

  // =========================================================================
  // OTHER (26–27)
  // =========================================================================

  // 27. Avida Finance ---------------------------------------------------------
  {
    id: 'avida-finance',
    slug: 'avida-finance',
    name: 'Avida Finans AB',
    shortName: 'Avida',
    type: 'other',
    founded: 1983,
    headquarters: 'Tukholma',
    country: 'SE',
    finFsaRegulated: true,
    website: 'https://www.avida.fi',
    customerServicePhone: '09 4245 4500',
    description:
      'Avida Finance on ruotsalainen rahoitusyhtiö, joka tarjoaa Suomessa kulutusluottoja ja yrityslainoja. Avida on vakiintunut pohjoismainen toimija, joka keskittyy digitaalisiin rahoituspalveluihin.',
    pros: [
      'Vakiintunut pohjoismainen toimija',
      'Sekä kuluttaja- että yritysrahoitusta',
      'Kilpailukykyiset korot kulutusluotoissa',
      'Nopea digitaalinen prosessi',
    ],
    cons: [
      'Ei konttoreita Suomessa',
      'Rajallinen tunnettuus suomalaisille kuluttajille',
      'Palveluvalikoima suppeampi kuin pankeilla',
    ],
    isAffiliate: false,
    applyUrls: {
      kulutusluotto: 'https://www.avidafinance.com/fi-fi/henkiloasiakkaat/',
      yrityslaina: 'https://www.avidafinance.com/fi-fi/yritys-asiakkaat/yritysluotto',
    },
    products: [
      {
        id: 'avida-kulutusluotto',
        providerId: 'avida-finance',
        name: 'Avida Kulutusluotto',
        type: 'kulutusluotto',
        minAmount: 1000,
        maxAmount: 30000,
        minTermMonths: 12,
        maxTermMonths: 120,
        nominalRate: { min: 5.9, max: 17.9 },
        effectiveRate: { min: 6.8, max: 19.5 },
        setupFee: 0,
        monthlyFee: 3.5,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '1–2 arkipäivää',
        features: [
          'Vakuudeton',
          'Kiinteä korko',
          'Nopea verkkohakemus',
          'Lisälyhennykset mahdollisia',
        ],
        lastUpdated: '2026-04-01',
      },
      {
        id: 'avida-yrityslaina',
        providerId: 'avida-finance',
        name: 'Avida Yrityslaina',
        type: 'yrityslaina',
        minAmount: 10000,
        maxAmount: 300000,
        minTermMonths: 6,
        maxTermMonths: 60,
        nominalRate: { min: 5.0, max: 13.0 },
        effectiveRate: { min: 6.0, max: 15.0 },
        setupFee: 250,
        monthlyFee: 0,
        requiresCollateral: false,
        requiresGuarantor: false,
        processingTime: '2–5 arkipäivää',
        features: [
          'Vakuudeton yrityslaina',
          'Nopea käsittely',
          'Joustava takaisinmaksu',
          'Sopii kasvuyrityksille',
        ],
        restrictions: [
          'Vähintään 1 vuoden liiketoiminta',
          'Positiivinen liikevaihto',
        ],
        lastUpdated: '2026-04-01',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Find a provider by its URL slug.
 */
export function getProviderBySlug(slug: string): LoanProvider | undefined {
  return providers.find((p) => p.slug === slug);
}

/**
 * Find a provider by its unique id.
 */
export function getProviderById(id: string): LoanProvider | undefined {
  return providers.find((p) => p.id === id);
}

/**
 * Return all providers of a given type (bank, fintech, p2p, other).
 */
export function getProvidersByType(
  type: LoanProvider['type'],
): LoanProvider[] {
  return providers.filter((p) => p.type === type);
}

/**
 * Return all loan products of a given type across all providers,
 * each enriched with its parent provider reference.
 */
export function getProductsByType(
  type: LoanProduct['type'],
): (LoanProduct & { provider: LoanProvider })[] {
  const results: (LoanProduct & { provider: LoanProvider })[] = [];
  for (const provider of providers) {
    for (const product of provider.products) {
      if (product.type === type) {
        results.push({ ...product, provider });
      }
    }
  }
  return results;
}

/**
 * Return all products sorted by effective min rate (ascending).
 * Useful for "cheapest loans" listings.
 */
export function getProductsSortedByRate(
  type?: LoanProduct['type'],
): (LoanProduct & { provider: LoanProvider })[] {
  const results: (LoanProduct & { provider: LoanProvider })[] = [];
  for (const provider of providers) {
    for (const product of provider.products) {
      if (!type || product.type === type) {
        results.push({ ...product, provider });
      }
    }
  }
  return results.sort(
    (a, b) => a.effectiveRate.min - b.effectiveRate.min,
  );
}

/**
 * Search providers by name (case-insensitive substring match).
 */
export function searchProviders(query: string): LoanProvider[] {
  const lower = query.toLowerCase();
  return providers.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      (p.shortName?.toLowerCase().includes(lower) ?? false) ||
      p.slug.includes(lower),
  );
}

/**
 * Get aggregate statistics across all providers / products.
 */
export function getMarketStats() {
  let totalProducts = 0;
  let minRate = Infinity;
  let maxRate = -Infinity;
  let maxLoanAmount = 0;

  for (const provider of providers) {
    totalProducts += provider.products.length;
    for (const product of provider.products) {
      if (product.effectiveRate.min < minRate)
        minRate = product.effectiveRate.min;
      if (product.effectiveRate.max > maxRate)
        maxRate = product.effectiveRate.max;
      if (product.maxAmount > maxLoanAmount)
        maxLoanAmount = product.maxAmount;
    }
  }

  return {
    totalProviders: providers.length,
    totalProducts,
    rateRange: { min: minRate, max: maxRate },
    maxLoanAmount,
    providersByType: {
      bank: getProvidersByType('bank').length,
      fintech: getProvidersByType('fintech').length,
      p2p: getProvidersByType('p2p').length,
      other: getProvidersByType('other').length,
    },
  };
}
