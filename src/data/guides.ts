import { Guide } from '@/types';

export const guides: Guide[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Lainaamisen perusteet
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'lainaamisen-perusteet',
    title: 'Lainaamisen perusteet — Kaikki mitä sinun tulee tietää',
    description:
      'Kattava opas lainaamiseen: lainatyypit, korot, kulut, takaisinmaksutavat ja milloin lainaaminen on järkevää.',
    category: 'Perusteet',
    readTime: 12,
    tableOfContents: [
      { id: 'mika-on-laina', title: 'Mikä on laina?', level: 2 },
      { id: 'lainatyypit', title: 'Lainatyypit Suomessa', level: 2 },
      { id: 'korot', title: 'Korot — nimelliskorko vs. todellinen vuosikorko', level: 2 },
      { id: 'kulut-ja-maksut', title: 'Lainan kulut ja maksut', level: 2 },
      { id: 'lainahakemus', title: 'Miten lainahakemus toimii?', level: 2 },
      { id: 'luottotietojen-tarkistus', title: 'Luottotietojen tarkistus', level: 2 },
      { id: 'takaisinmaksutavat', title: 'Takaisinmaksutavat', level: 2 },
      { id: 'milloin-lainaaminen-kannattaa', title: 'Milloin lainaaminen kannattaa?', level: 2 },
      { id: 'milloin-ei-kannata', title: 'Milloin lainaaminen ei kannata?', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    relatedGuides: ['todellinen-vuosikorko', 'lainan-kilpailutus', 'luottotiedot-suomessa'],
    content: `
<h2 id="mika-on-laina">Mikä on laina?</h2>
<p>Laina on rahoitussopimus, jossa lainanantaja — tyypillisesti pankki tai muu rahoituslaitos — antaa lainanottajalle sovitun rahasumman käyttöön. Lainanottaja sitoutuu maksamaan rahan takaisin sovitussa aikataulussa korkoineen ja kuluineen.</p>
<p>Suomessa lainamarkkinoilla toimivat perinteisten pankkien (OP, Nordea, Danske Bank, S-Pankki, Säästöpankit jne.) rinnalla kymmenet rahoitusyhtiöt ja verkkolainanantajat. Kilpailu pitää korot ja kulut kurissa, kun vertailet tarjouksia useammasta paikasta.</p>
<p>Lainasopimuksessa määritellään vähintään:</p>
<ul>
  <li><strong>Lainasumma</strong> — kuinka paljon rahaa lainataan</li>
  <li><strong>Laina-aika</strong> — millä aikataululla laina maksetaan takaisin</li>
  <li><strong>Korko</strong> — lainasta perittävä hinta prosentteina</li>
  <li><strong>Kulut</strong> — mahdolliset avausmaksut, kuukausimaksut ja muut palkkiot</li>
  <li><strong>Takaisinmaksutapa</strong> — miten kuukausierät muodostuvat</li>
</ul>
<p>Suomessa lainamarkkinoita valvoo Finanssivalvonta (Fiva), ja kuluttajalainoja säätelee erityisesti kuluttajansuojalain 7. luku. Nämä lait suojaavat sinua lainanottajana monin tavoin.</p>

<h2 id="lainatyypit">Lainatyypit Suomessa</h2>
<p>Suomessa on tarjolla useita eri lainatyyppejä eri käyttötarkoituksiin. Oikean lainatyypin valinta vaikuttaa merkittävästi lainan hintaan ja ehtoihin.</p>

<h3>Kulutusluotto</h3>
<p>Kulutusluotto on yleisin vakuudeton lainamuoto. Lainasummat vaihtelevat tyypillisesti 500 eurosta 60 000 euroon ja laina-aika 1–15 vuotta. Koska vakuutta ei vaadita, korko on korkeampi kuin vakuudellisissa lainoissa. Tyypillisiä käyttökohteitä ovat kodinremontti, auto, kodinkoneet tai lääkärikulut. Kulutusluottojen nimelliskorot vaihtelevat hakijasta riippuen noin 5 prosentista lähelle lain sallimaa enimmäiskorkoa (viitekorko + 15 prosenttiyksikköä, enintään 20 %).</p>

<h3>Asuntolaina</h3>
<p>Asuntolaina on vakuudellinen laina, jonka vakuutena toimii ostettava asunto. Asuntolainojen korot ovat selvästi kulutusluottoja matalampia, koska pankilla on vakuus. Laina-ajat ovat pitkiä, tyypillisesti 20–30 vuotta. Finanssivalvonnan lainakaton mukaan asuntolainan enimmäismäärä on 90 % asunnon käyvästä arvosta — ensiasunnon ostajille 95 %.</p>
<p>Pienikin ero marginaalissa tarkoittaa tuhansien eurojen eroa lainan kokonaiskustannuksessa 25 vuoden aikana, joten asuntolainan kilpailutus on erityisen arvokasta. Lue lisää <a href="/oppaat/asuntolaina-ensiostajalle">asuntolainaoppaastamme</a>.</p>

<h3>Autolaina</h3>
<p>Autolaina on tarkoitettu auton ostoon. Se voi olla vakuudellinen (auto vakuutena) tai vakuudeton — vakuudellisen autolainan korko on yleensä edullisempi. Laina-ajat ovat tyypillisesti 1–8 vuotta.</p>
<p>Uusi auto menettää arvoaan nopeasti, jopa 20–30 % ensimmäisenä vuonna. Jos laina on pitkä ja auto menettää arvoaan nopeammin kuin lainaa lyhennetään, voit päätyä tilanteeseen, jossa olet velkaa enemmän kuin auto on arvoinen. Valitse siksi kohtuullinen laina-aika suhteessa auton elinkaareen.</p>

<h3>Yhdistelylaina</h3>
<p>Yhdistelylainalla voi koota useamman pienen lainan yhdeksi isommaksi lainaksi. Tämä voi alentaa kokonaiskorkoa ja yksinkertaistaa velanhoitoa, kun erilliset kuukausierät yhdistyvät yhdeksi. Yhdistely kannattaa erityisesti silloin, kun yksittäisten lainojen korot ovat korkeita (esim. luottokorttien 15–20 % korot) ja yhdistelylainan korko olisi merkittävästi matalampi. Yhdistelylainasta kerromme lisää <a href="/oppaat/velkojen-yhdistely">erillisessä oppaassamme</a>.</p>

<h3>Pikavippi</h3>
<p>Pikavippi on pieni, tyypillisesti alle 2 000 euron lyhytaikainen vakuudeton laina. Pikavipit kuuluvat saman korkokattosääntelyn piiriin kuin muutkin kuluttajaluotot — nimelliskorko ei saa ylittää viitekorkoa + 15 prosenttiyksikköä (enintään 20 %), ja muut kulut ovat enintään 0,01 % lainasummasta päivässä, kuitenkin enintään 150 € vuodessa. Pienten lainasummien kohdalla todellinen vuosikorko jää silti usein korkeaksi, koska kiinteät kulut painavat suhteellisesti paljon.</p>
<p>Jos tarvitset pienen summan nopeasti, selvitä ensin muut vaihtoehdot: luottokortti, tilapäinen luottolimiitti pankista tai hankinnan siirtäminen. Pikavipistä voi syntyä velkakierre, kun pieni summa kasvaa korkokulujen myötä.</p>

<h3>Yrityslaina</h3>
<p>Yrityslaina on tarkoitettu yritystoiminnan rahoittamiseen. Yrityslainoihin liittyy usein erilaisia vakuus- ja takaajavaatimuksia. Ne eivät kuulu kuluttajansuojalain piiriin samalla tavalla kuin henkilökohtaiset lainat.</p>
<p>Yrityslainan hakuprosessi on tyypillisesti monimutkaisempi kuin henkilökohtaisen lainan. Pankki arvioi yrityksen liiketoimintasuunnitelman, taloustiedot, kassavirran ja vakuudet. Suomessa yrityslainoja myöntävät pankkien lisäksi myös Finnvera (valtion erityisrahoitusyhtiö) ja erilaiset yksityiset rahoittajat.</p>

<h2 id="korot">Korot — nimelliskorko vs. todellinen vuosikorko</h2>
<p>Korko on lainan hinta — se summa, jonka maksat lainanantajalle lainaamastasi rahasta. Suomessa käytetään kahta keskeistä korkokäsitettä:</p>

<h3>Nimelliskorko</h3>
<p>Nimelliskorko on lainan peruskorko, joka kertoo, paljonko korkoa peritään lainapääomasta. Se <strong>ei sisällä</strong> lainaan liittyviä kuluja, kuten avausmaksua tai kuukausimaksuja. Nimelliskorko voi olla kiinteä tai vaihtuva.</p>
<ul>
  <li><strong>Kiinteä korko</strong> — pysyy samana koko laina-ajan. Antaa ennustettavuutta, mutta voi olla kalliimpi kuin vaihtuva korko.</li>
  <li><strong>Vaihtuva korko</strong> — sidottu viitekorkoon (esim. euribor) ja muuttuu viitekoron mukana. Asuntolainoissa yleisin muoto Suomessa.</li>
</ul>

<h3>Todellinen vuosikorko (TAV)</h3>
<p>Todellinen vuosikorko on <strong>tärkein luku lainojen vertailussa</strong>. Se sisältää nimelliskoron lisäksi kaikki lainan pakolliset kulut — avausmaksun, kuukausimaksut ja muut palkkiot — laskettuna vuosikorkona. EU-direktiivi velvoittaa kaikkia lainanantajia ilmoittamaan todellisen vuosikoron, joten se on aina vertailukelpoinen eri lainojen välillä.</p>
<p>Lue lisää todellisesta vuosikorosta <a href="/oppaat/todellinen-vuosikorko">erillisestä oppaastamme</a>.</p>

<h2 id="kulut-ja-maksut">Lainan kulut ja maksut</h2>
<p>Lainan kokonaiskustannus koostuu koron lisäksi useista eri maksuista. Näitä ovat tyypillisesti:</p>
<ul>
  <li><strong>Avausmaksu / toimitusmaksu</strong> — kertaluonteinen maksu lainan nostamisen yhteydessä. Voi olla kiinteä summa tai prosentti lainasummasta.</li>
  <li><strong>Kuukausimaksu / tilinhoitomaksu</strong> — kuukausittain perittävä kiinteä maksu. Kaikki muut kulut yhteensä saavat olla enintään 0,01 % lainasummasta päivässä, enimmillään 150 € vuodessa.</li>
  <li><strong>Korko</strong> — lasketaan jäljellä olevasta lainapääomasta.</li>
  <li><strong>Ennenaikaisen takaisinmaksun kulu</strong> — kiinteäkorkoisessa kuluttajaluotossa lainanantaja voi periä korvauksen: enintään 1 % takaisinmaksetusta määrästä (0,5 %, jos päättymiseen on alle vuosi). Viitekorkoon sidotusta lainasta ei saa periä korvausta lainkaan.</li>
  <li><strong>Viivästyskorko</strong> — eräpäivän jälkeen. Enintään Suomen Pankin puolivuosittain vahvistama viitekorko + 7 prosenttiyksikköä.</li>
</ul>
<p><strong>Vinkki:</strong> Kiinnitä huomiota erityisesti kuukausimaksuihin. Pieni kuukausimaksu voi pitkän laina-ajan aikana nostaa lainan kokonaiskustannusta merkittävästi. Esimerkiksi 6 euron kuukausimaksu 10 vuoden lainassa tarkoittaa yhteensä 720 euroa pelkkiä tilinhoitokuluja.</p>

<h3>Miten kulut vaikuttavat kokonaiskustannukseen?</h3>
<p>Katsotaan esimerkki: 10 000 euron laina, 5 vuotta, nimelliskorko 7 %.</p>
<ul>
  <li><strong>Ilman kuluja:</strong> Kokonaiskustannus noin 11 881 € (korkoja 1 881 €)</li>
  <li><strong>Avausmaksu 99 € + kuukausimaksu 5 €:</strong> Kokonaiskustannus noin 12 280 € (korkoja ja kuluja 2 280 €)</li>
</ul>
<p>Kulut nostivat kokonaiskustannusta 399 eurolla. Todellinen vuosikorko nousee nimelliskoron 7 %:sta noin 8,7 %:iin. Tämä osoittaa, miksi pelkkä nimelliskorko ei riitä vertailuun.</p>

<h2 id="lainahakemus">Miten lainahakemus toimii?</h2>
<p>Lainan hakeminen Suomessa on nykyään pääosin digitaalista. Prosessi etenee tyypillisesti näin:</p>
<ol>
  <li><strong>Vertaile lainoja</strong> — Selvitä, mikä laina sopii tarpeeseesi parhaiten. Käytä vertailupalvelua tai pyydä tarjouksia suoraan useilta lainanantajilta.</li>
  <li><strong>Täytä hakemus</strong> — Kerro lainasumma, laina-aika, käyttötarkoitus ja henkilötiedot. Tunnistautuminen tapahtuu yleensä pankkitunnuksilla.</li>
  <li><strong>Luottopäätös</strong> — Lainanantaja tarkistaa luottotietosi, tulosi ja muut taloudelliset tietosi. Päätös tulee usein muutamassa minuutissa tai tunnissa.</li>
  <li><strong>Lainatarjous</strong> — Jos saat myönteisen päätöksen, saat tarjouksen, jossa kerrotaan korko, kulut, kuukausierä ja laina-aika. Sinulla ei ole pakkoa hyväksyä tarjousta.</li>
  <li><strong>Allekirjoitus</strong> — Hyväksyt lainasopimuksen sähköisesti.</li>
  <li><strong>Rahojen siirto</strong> — Lainasumma siirretään tilillesi. Nopeimmillaan rahat ovat käytössäsi saman päivän aikana.</li>
</ol>
<p>Muista, että lainahakemuksen jättäminen ei sido sinua mihinkään. Voit pyytää tarjouksia useilta lainanantajilta ja valita edullisimman.</p>

<h3>Tarvittavat tiedot hakemusta varten</h3>
<p>Lainahakemukseen tarvitset tyypillisesti seuraavat tiedot:</p>
<ul>
  <li>Henkilötiedot (nimi, henkilötunnus, osoite)</li>
  <li>Työnantajan nimi ja työsuhteen kesto</li>
  <li>Bruttotulot kuukaudessa</li>
  <li>Nykyiset lainat ja niiden kuukausierät</li>
  <li>Asumismuoto (vuokra, oma asunto) ja asumiskustannukset</li>
  <li>Lainan käyttötarkoitus</li>
</ul>
<p>Positiivisen luottorekisterin myötä pankit saavat osan näistä tiedoista automaattisesti, mutta hakemuksessa kannattaa silti antaa ajantasaiset tiedot.</p>

<h2 id="luottotietojen-tarkistus">Luottotietojen tarkistus</h2>
<p>Jokainen lainanantaja tarkistaa hakijan luottotiedot ennen luottopäätöksen tekemistä. Suomessa luottotietoja ylläpitävät <strong>Suomen Asiakastieto Oy</strong> ja <strong>Bisnode Finland Oy</strong>.</p>
<p>Luottotietotarkistuksessa selvitetään erityisesti:</p>
<ul>
  <li>Onko sinulla <strong>maksuhäiriömerkintöjä</strong> — eli rekisteröityjä maksujen laiminlyöntejä</li>
  <li>Huhtikuusta 2024 lähtien myös <strong>positiivinen luottorekisteri</strong> — eli tiedot nykyisistä lainoistasi ja tuloistasi</li>
</ul>
<p>Maksuhäiriömerkintä vaikeuttaa lainan saamista merkittävästi. Useimmat lainanantajat eivät myönnä lainaa lainkaan henkilölle, jolla on voimassa oleva merkintä. Lue lisää luottotiedoista <a href="/oppaat/luottotiedot-suomessa">erillisestä oppaastamme</a>.</p>

<h2 id="takaisinmaksutavat">Takaisinmaksutavat</h2>
<p>Lainan takaisinmaksuun on kolme päätapaa. Takaisinmaksutapa vaikuttaa kuukausierän suuruuteen ja lainan kokonaiskustannukseen.</p>

<h3>Annuiteettilaina</h3>
<p>Annuiteettilainassa kuukausierä on <strong>vakiosuuruinen</strong> koko laina-ajan. Lainan alussa suurempi osa erästä on korkoa ja pienempi osa lyhennystä. Ajan myötä koron osuus pienenee ja lyhennyksen osuus kasvaa. Annuiteettilaina on Suomessa yleisin takaisinmaksutapa kulutusluotoissa.</p>
<p><strong>Etu:</strong> Tasaiset kuukausierät helpottavat budjetointia.<br>
<strong>Huomio:</strong> Jos korko on vaihtuva, kuukausierä muuttuu koron mukana.</p>

<h3>Esimerkki annuiteettilainasta</h3>
<p>10 000 euron laina, 5 vuotta, korko 7 %: Kuukausierä on noin 198 €. Ensimmäisen kuukauden erästä 58 € on korkoa ja 140 € lyhennystä. Viimeisen kuukauden erästä vain 1 € on korkoa ja 197 € lyhennystä. Kokonaiskustannus on noin 11 881 €.</p>

<h3>Tasalyhennyslaina</h3>
<p>Tasalyhennyslainassa lyhennys on joka kuukausi sama, mutta korko lasketaan jäljellä olevasta pääomasta. Tämä tarkoittaa, että <strong>kuukausierä pienenee laina-ajan kuluessa</strong>, koska koron osuus laskee pääoman pienentyessä.</p>
<p><strong>Etu:</strong> Kokonaiskorkokustannus on pienempi kuin annuiteettilainassa, koska pääomaa lyhennetään nopeammin.<br>
<strong>Huomio:</strong> Ensimmäiset kuukausierät ovat suurempia.</p>

<h3>Esimerkki tasalyhennyslainasta</h3>
<p>Sama 10 000 euron laina, 5 vuotta, korko 7 %: Kuukausilyhennys on 167 € (10 000 / 60 kk). Ensimmäinen kuukausierä on 225 € (167 € lyhennys + 58 € korko), viimeinen noin 168 €. Kokonaiskustannus on noin 11 779 € — siis noin 100 € edullisempi kuin annuiteettilainassa.</p>

<h3>Bullet-laina (kertalyhennys)</h3>
<p>Bullet-lainassa pääomaa ei lyhennetä lainkaan laina-aikana — maksat vain korkoa. Pääoma maksetaan kokonaisuudessaan takaisin laina-ajan päättyessä. Tämä takaisinmaksutapa on harvinainen kuluttajalainoissa, mutta sitä käytetään joissakin yrityslainoissa ja asuntojen väliaikaisrahoituksessa.</p>
<p><strong>Huomio:</strong> Kokonaiskorkokustannus on korkein kaikista tavoista, koska pääoma ei pienene lainkaan laina-aikana.</p>

<h2 id="milloin-lainaaminen-kannattaa">Milloin lainaaminen kannattaa?</h2>
<p>Lainaaminen voi olla järkevää näissä tilanteissa:</p>
<ul>
  <li><strong>Asunnon hankinta</strong> — Asuntolaina on useimmille ainoa tapa rahoittaa oman asunnon osto.</li>
  <li><strong>Arvoa tuottavat investoinnit</strong> — Kodin energiaremontti, joka alentaa asumiskustannuksia pitkällä aikavälillä.</li>
  <li><strong>Koulutus</strong> — Valtiontakuun kautta myönnettävä opintolaina on edullinen tapa rahoittaa opiskelua.</li>
  <li><strong>Velkojen yhdistely</strong> — Jos sinulla on useita kalliita pienlainoja, yhdistelylainalla voit alentaa kokonaiskorkoa.</li>
  <li><strong>Välttämättömät hankinnat</strong> — Esimerkiksi auto työssäkäyntiin alueella, jossa julkinen liikenne ei toimi.</li>
</ul>

<h2 id="milloin-ei-kannata">Milloin lainaaminen ei kannata?</h2>
<p>Lainaamista kannattaa välttää näissä tilanteissa:</p>
<ul>
  <li><strong>Kulutustavaroiden rahoitus</strong> — Elektroniikka, vaatteet ja muut kulutustavarat menettävät arvoaan nopeasti. Lainakorko tekee niistä vielä kalliimpia.</li>
  <li><strong>Lomamatkat ja juhlat</strong> — Loma-aika päättyy, mutta lainan maksu jatkuu kuukausia. Säästä mieluummin etukäteen.</li>
  <li><strong>Talous on jo tiukoilla</strong> — Jos kuukausittaiset tulot ja menot ovat jo tasapainossa tai miinuksella, uusi laina pahentaa tilannetta.</li>
  <li><strong>Impulssipäätökset</strong> — Älä koskaan hae lainaa hetken mielijohteesta. Nuku yön yli ja mieti, tarvitsetko hankintaa todella.</li>
  <li><strong>Velan maksaminen velalla</strong> — Uuden lainan ottaminen vanhan maksamiseksi johtaa helposti velkakierteeseen, ellei kyseessä ole suunniteltu velkojen yhdistely.</li>
</ul>

<h2 id="yhteenveto">Yhteenveto</h2>
<p>Lainaaminen on arkipäiväinen osa taloutta, mutta se vaatii harkintaa ja vertailua. Muista nämä pääperiaatteet:</p>
<ol>
  <li><strong>Vertaile aina</strong> — Älä hyväksy ensimmäistä tarjousta. Pyydä tarjouksia useilta lainanantajilta.</li>
  <li><strong>Katso todellista vuosikorkoa</strong> — Se kertoo lainan todellisen hinnan kulut mukaan lukien.</li>
  <li><strong>Laske kokonaiskustannus</strong> — Kuukausierä ei kerro koko totuutta. Laske, paljonko maksat lainasta yhteensä.</li>
  <li><strong>Lainaa vain sen verran kuin tarvitset</strong> — Suurempi laina tarkoittaa enemmän korkoja.</li>
  <li><strong>Huolehdi maksuista ajallaan</strong> — Maksuhäiriömerkintä vaikeuttaa elämää vuosiksi.</li>
</ol>
<p>Valitse Laina auttaa sinua löytämään edullisimman lainan. <a href="/vertailu">Vertaa lainoja nyt</a> ja katso, paljonko voit säästää.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Todellinen vuosikorko
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'todellinen-vuosikorko',
    title: 'Todellinen vuosikorko — Miksi se on tärkein luku lainavertailussa',
    description:
      'Opi, mikä todellinen vuosikorko on, miten se lasketaan ja miksi se on ainoa luotettava tapa vertailla eri lainoja.',
    category: 'Korot',
    readTime: 10,
    tableOfContents: [
      { id: 'mita-todellinen-vuosikorko-tarkoittaa', title: 'Mitä todellinen vuosikorko tarkoittaa?', level: 2 },
      { id: 'nimelliskorko-vs-todellinen', title: 'Nimelliskorko vs. todellinen vuosikorko', level: 2 },
      { id: 'miten-lasketaan', title: 'Miten todellinen vuosikorko lasketaan?', level: 2 },
      { id: 'eu-direktiivi', title: 'EU-direktiivin vaatimus', level: 2 },
      { id: 'esimerkit', title: 'Käytännön esimerkkejä', level: 2 },
      { id: 'vertailussa', title: 'Todellinen vuosikorko lainojen vertailussa', level: 2 },
      { id: 'ansat', title: 'Varoitusmerkit ja ansat', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    relatedGuides: ['lainaamisen-perusteet', 'lainan-kilpailutus', 'kuluttajan-oikeudet'],
    content: `
<h2 id="mita-todellinen-vuosikorko-tarkoittaa">Mitä todellinen vuosikorko tarkoittaa?</h2>
<p>Todellinen vuosikorko kertoo lainan <strong>kokonaiskustannuksen vuositasolla prosentteina</strong>. Toisin kuin nimelliskorko, se sisältää koron lisäksi kaikki lainan pakolliset kulut: avausmaksun, kuukausimaksut, tilinhoitopalkkiot ja muut lainanantajan perimät maksut.</p>
<p>Todellisen vuosikoron avulla voit vertailla eri lainojen hintaa keskenään riippumatta siitä, miten lainanantaja on hinnoittelunsa rakentanut. Englanninkielinen vastine on <em>Annual Percentage Rate (APR)</em>.</p>

<h3>Miksi todellinen vuosikorko kehitettiin?</h3>
<p>Ennen todellisen vuosikoron käyttöönottoa lainanantajat saattoivat mainostaa matalaa nimelliskorkoa ja piilottaa todelliset kustannukset erilaisiin maksuihin. Todellinen vuosikorko pakkaa kaikki pakolliset kustannukset yhteen vertailukelpoiseen lukuun.</p>

<h2 id="nimelliskorko-vs-todellinen">Nimelliskorko vs. todellinen vuosikorko</h2>
<p>Monet lainanhakijat sekoittavat nimelliskoron ja todellisen vuosikoron. Ero on kuitenkin merkittävä:</p>
<ul>
  <li><strong>Nimelliskorko</strong> kertoo vain koron, joka peritään lainapääomasta. Se ei sisällä mitään kuluja.</li>
  <li><strong>Todellinen vuosikorko</strong> sisältää nimelliskoron <em>ja</em> kaikki pakolliset kulut laskettuna vuosikorkona.</li>
</ul>
<p>Käytännössä tämä tarkoittaa, että todellinen vuosikorko on <strong>aina nimelliskorkoa korkeampi</strong>, jos lainaan liittyy minkäänlaisia kuluja — ja kuluja liittyy lähes aina.</p>

<h3>Esimerkki erosta</h3>
<p>Kuvitellaan 10 000 euron laina, jonka laina-aika on 5 vuotta:</p>
<ul>
  <li>Nimelliskorko: 6,9 %</li>
  <li>Avausmaksu: 99 €</li>
  <li>Kuukausimaksu: 5 €/kk</li>
</ul>
<p>Pelkän nimelliskoron perusteella laina näyttää edulliselta. Mutta kun lisäämme avausmaksun (99 €) ja kuukausimaksut (5 € × 60 kk = 300 €), lainan todellinen hinta nousee merkittävästi. <strong>Todellinen vuosikorko tässä esimerkissä on noin 8,7 %</strong> — siis lähes 2 prosenttiyksikköä korkeampi kuin nimelliskorko.</p>
<p>Jos vertailisit tätä lainaa toiseen, jonka nimelliskorko on 7,5 % mutta jolla ei ole lainkaan kuluja, tuo toinen laina olisi itse asiassa <strong>edullisempi</strong>, vaikka nimelliskorko näyttää korkeammalta.</p>

<h3>Miksi ero on niin suuri?</h3>
<p>Eroa syntyy, koska kiinteät kulut (avausmaksu, kuukausimaksut) eivät riipu lainasummasta — ne ovat samat riippumatta siitä, lainaatko 1 000 vai 50 000 euroa. Tämän takia kiinteät kulut vaikuttavat suhteellisesti enemmän pieniin lainoihin. 99 euron avausmaksu 1 000 euron lainassa on 9,9 % lainasummasta, mutta 50 000 euron lainassa vain 0,2 %. Tämä on tärkeä syy, miksi pienten lainojen todellinen vuosikorko on usein paljon korkeampi kuin suurten.</p>

<h2 id="miten-lasketaan">Miten todellinen vuosikorko lasketaan?</h2>
<p>Todellisen vuosikoron laskenta perustuu EU:n kuluttajaluottodirektiivin (2008/48/EY) määrittelemään matemaattiseen kaavaan. Kaava etsii sitä vuotuista korkokantaa, jolla lainanottajan kaikkien maksujen nykyarvo vastaa saatujen rahasuoritusten nykyarvoa.</p>
<p>Yksinkertaistettuna laskenta etenee näin:</p>
<ol>
  <li>Lasketaan yhteen kaikki lainasta aiheutuvat maksut: kuukausierät (korko + lyhennys), avausmaksu, kuukausimaksut, muut pakolliset kulut.</li>
  <li>Etsitään se vuotuinen korkokanta, jolla näiden maksujen <strong>diskontattu nykyarvo</strong> (eli kaikkien tulevien maksujen arvo tämän päivän rahassa) vastaa lainan nostettua pääomaa.</li>
  <li>Tämä korkokanta on todellinen vuosikorko.</li>
</ol>
<p>Laskennan tekeminen käsin on monimutkaista, koska se vaatii iteratiivista ratkaisua. Siksi todellisen vuosikoron laskemiseen käytetään yleensä tietokonetta. Lainanantajat ovat velvollisia ilmoittamaan todellisen vuosikoron sinulle — sinun ei tarvitse laskea sitä itse.</p>

<h3>Yksinkertaistettu esimerkki laskennasta</h3>
<p>Oletetaan 1 000 euron laina, laina-aika 1 vuosi, korko 10 %, avausmaksu 50 €. Lainasta saat käteen 1 000 €, mutta maksat takaisin yhteensä 1 150 € (pääoma 1 000 € + korko 100 € + avausmaksu 50 €). Todellinen vuosikorko on se korkokanta, jolla 1 150 euron nykyarvo vastaa 1 000 euroa. Tässä tapauksessa todellinen vuosikorko olisi noin 15 % — merkittävästi enemmän kuin 10 %:n nimelliskorko.</p>

<h3>Mitä laskentaan sisältyy ja mitä ei?</h3>
<p>Todelliseen vuosikorkoon <strong>sisältyvät</strong>:</p>
<ul>
  <li>Nimelliskorko</li>
  <li>Avausmaksu / toimitusmaksu</li>
  <li>Kuukausimaksut / tilinhoitopalkkiot</li>
  <li>Kaikki muut pakolliset kulut, jotka liittyvät lainaan</li>
</ul>
<p>Todelliseen vuosikorkoon <strong>eivät sisälly</strong>:</p>
<ul>
  <li>Maksuviivästyksistä aiheutuvat kulut</li>
  <li>Vapaaehtoiset vakuutukset</li>
  <li>Notaarikulut tai viranomaispalkkiot</li>
  <li>Mahdolliset valuutanvaihtokulut</li>
</ul>

<h2 id="eu-direktiivi">EU-direktiivin vaatimus</h2>
<p>EU:n kuluttajaluottodirektiivi velvoittaa kaikkia EU-maissa toimivia lainanantajia ilmoittamaan todellisen vuosikoron <strong>jokaisessa lainailmoituksessa ja -tarjouksessa</strong>. Tämä vaatimus koskee kaikkia kuluttajaluottoja — niin pankkeja, rahoitusyhtiöitä kuin verkkolainanantajiakin.</p>
<p>Direktiivin tavoite on varmistaa, että kuluttajat voivat vertailla lainoja tasapuolisesti koko EU:n alueella. Laskentakaava on kaikille sama, joten todellinen vuosikorko on aina vertailukelpoinen eri lainanantajien ja eri maiden välillä.</p>
<p>Suomessa todellisen vuosikoron ilmoittamisvelvollisuudesta säädetään kuluttajansuojalain 7. luvussa. Jos lainanantaja ei ilmoita todellista vuosikorkoa tai ilmoittaa sen virheellisesti, kyseessä on lainvastainen menettely.</p>

<p>Käytännössä tämä tarkoittaa, että jokaisessa lainamainoksessa, tarjouskirjeessä ja lainasopimuksessa on oltava todellinen vuosikorko selkeästi esillä. Tämä koskee myös verkkomainontaa, sosiaalista mediaa ja vertailusivustoja. Lainanantaja, joka jättää todellisen vuosikoron ilmoittamatta, voi saada Finanssivalvonnalta huomautuksen tai sanktion.</p>

<h2 id="esimerkit">Käytännön esimerkkejä</h2>
<p>Katsotaan, miten todellinen vuosikorko vaikuttaa käytännössä eri lainatarjousten vertailuun.</p>

<h3>Esimerkki 1: Kaksi 5 000 euron lainaa</h3>
<p><strong>Laina A:</strong></p>
<ul>
  <li>Nimelliskorko: 5,9 %</li>
  <li>Avausmaksu: 150 €</li>
  <li>Kuukausimaksu: 6 €/kk</li>
  <li>Laina-aika: 3 vuotta</li>
  <li><strong>Todellinen vuosikorko: 10,2 %</strong></li>
  <li>Kokonaiskustannus: 5 838 €</li>
</ul>
<p><strong>Laina B:</strong></p>
<ul>
  <li>Nimelliskorko: 7,9 %</li>
  <li>Avausmaksu: 0 €</li>
  <li>Kuukausimaksu: 0 €/kk</li>
  <li>Laina-aika: 3 vuotta</li>
  <li><strong>Todellinen vuosikorko: 7,9 %</strong></li>
  <li>Kokonaiskustannus: 5 629 €</li>
</ul>
<p>Laina B on <strong>209 € edullisempi</strong>, vaikka sen nimelliskorko on 2 prosenttiyksikköä korkeampi. Todellinen vuosikorko paljastaa totuuden.</p>

<h3>Esimerkki 2: Laina-ajan vaikutus</h3>
<p>Sama 10 000 euron laina (nimelliskorko 7 %, avausmaksu 99 €, kuukausimaksu 5 €) eri laina-ajoilla:</p>
<ul>
  <li><strong>2 vuotta:</strong> TAV noin 9,5 % — kokonaiskustannus 10 778 €</li>
  <li><strong>5 vuotta:</strong> TAV noin 8,7 % — kokonaiskustannus 11 957 €</li>
  <li><strong>10 vuotta:</strong> TAV noin 8,2 % — kokonaiskustannus 14 029 €</li>
</ul>
<p>Huomaa: vaikka todellinen vuosikorko <em>laskee</em> laina-ajan pidetessä (koska kiinteät kulut jakautuvat pidemmälle ajalle), <strong>kokonaiskustannus nousee merkittävästi</strong>. Pidempi laina-aika tarkoittaa aina enemmän maksettuja korkoja.</p>

<h3>Esimerkki 3: Luottokorttivelka vs. kulutusluotto</h3>
<p>Monilla suomalaisilla on luottokorttivelkaa, johon peritään 14–20 % korkoa. Vertaa:</p>
<ul>
  <li><strong>Luottokorttivelka 5 000 €:</strong> Korko 18 %, minimierä 150 €/kk → takaisinmaksu kestää yli 4 vuotta, korkoja maksetaan noin 2 100 €</li>
  <li><strong>Kulutusluotto 5 000 €:</strong> TAV 8 %, laina-aika 3 vuotta → korkoja maksetaan noin 643 €</li>
</ul>
<p>Kulutusluotolla luottokorttivelka maksetaan pois ja säästetään noin <strong>1 457 euroa</strong> korkokuluja. Tämä on esimerkki tilanteesta, jossa uuden lainan ottaminen on järkevää — kunhan luottokortin käyttö pidetään sen jälkeen hallinnassa.</p>

<h2 id="vertailussa">Todellinen vuosikorko lainojen vertailussa</h2>
<p>Kun vertailet lainoja, todellinen vuosikorko on paras yksittäinen mittari. Mutta sen tehokas käyttö vaatii muutamia huomioita:</p>

<h3>Vertaile samoja lainasummia ja laina-aikoja</h3>
<p>Todellinen vuosikorko on parhaiten vertailukelpoinen, kun lainasumma ja laina-aika ovat samat. Jos vertailet 5 000 € ja 20 000 € lainoja, todellinen vuosikorko voi olla eri, vaikka lainanantaja ja tuote olisivat samat — koska kiinteät kulut vaikuttavat eri tavalla.</p>
<p>Käytännön vinkki: kun pyydät tarjouksia, pyydä ne aina <strong>samoilla parametreillä</strong> kaikilta lainanantajilta. Sama lainasumma, sama laina-aika. Näin todellinen vuosikorko on suoraan vertailukelpoinen ilman laskentaa.</p>

<h3>Huomioi myös joustavuus</h3>
<p>Pelkkä todellinen vuosikorko ei kerro kaikkea. Ota huomioon myös:</p>
<ul>
  <li>Voitko maksaa lainan takaisin ennenaikaisesti ilman lisäkuluja?</li>
  <li>Voitko siirtää erää myöhemmäksi tarvittaessa?</li>
  <li>Voitko nostaa lisälainaa myöhemmin?</li>
  <li>Onko asiakaspalvelu helposti tavoitettavissa?</li>
</ul>

<h3>Käytä vertailupalvelua</h3>
<p>Lainojen vertailu on helpointa käyttämällä <a href="/vertailu">vertailupalvelua</a>, joka laskee todellisen vuosikoron automaattisesti ja näyttää kaikki tarjoukset rinnakkain. Näin näet heti, mikä laina on edullisin.</p>

<h2 id="ansat">Varoitusmerkit ja ansat</h2>
<p>Vaikka todellinen vuosikorko on erinomainen työkalu, on muutamia tilanteita, joissa se voi johtaa harhaan:</p>

<h3>1. Alkuajan erikoiskorot</h3>
<p>Jotkut lainanantajat tarjoavat houkuttelevan alhaista korkoa ensimmäisiksi kuukausiksi, jonka jälkeen korko nousee merkittävästi. Jos todellinen vuosikorko on laskettu koko laina-ajalle, se saattaa näyttää kohtuulliselta — mutta todellisuudessa suurin osa korkokustannuksesta kertyy alkuajan jälkeen korkeammalla korolla.</p>
<p><strong>Vinkki:</strong> Kysy aina, onko korko kiinteä koko laina-ajalle vai vaihtuva. Jos korko on vaihtuva, selvitä, mistä korko koostuu (viitekorko + marginaali).</p>

<h3>2. Vaihtuvakorkoiset lainat</h3>
<p>Vaihtuvakorkoisessa lainassa todellinen vuosikorko ilmoitetaan <strong>hakuhetken korkotasolla</strong>. Jos korot nousevat, todellinen kustannus voi olla merkittävästi ilmoitettua korkeampi. Tämä on erityisen tärkeää pitkissä asuntolainoissa.</p>

<h3>3. Hyvin pienet tai hyvin suuret lainat</h3>
<p>Pienissä lainoissa kiinteät kulut (avausmaksu, kuukausimaksut) nostavat todellista vuosikorkoa suhteettomasti. 500 euron lainassa 99 euron avausmaksu on valtava suhteessa lainasummaan. Suurissa lainoissa taas kiinteiden kulujen merkitys on vähäinen.</p>

<h3>4. Mainosten "alkaen"-hinnat</h3>
<p>Lainamarkkinoinnissa näkyvä "korko alkaen X %" -ilmoitus tarkoittaa parasta mahdollista korkoa, jonka saa vain pieni osa hakijoista — tyypillisesti ne, joilla on korkeat tulot, ei velkaa ja erinomainen maksuhistoria. <strong>Useimmat hakijat saavat tätä korkeamman koron.</strong></p>
<p>Esimerkki: Jos lainanantaja mainostaa "korko alkaen 4,9 %", saatat saada tarjouksen, jossa korko on 9,5 %. Tämä on täysin laillista ja normaalia — "alkaen"-korko on vain markkinointiluku. Todellinen sinulle tarjottava korko riippuu luottoluokituksestasi, tuloistasi ja muista tekijöistä.</p>

<h3>5. Koroton maksuaika</h3>
<p>Jotkut lainanantajat tarjoavat "ensimmäiset 3 kuukautta korottomia". Tämä voi kuulostaa hyvältä, mutta tarkista aina: mikä on korko korottoman jakson jälkeen? Mikä on todellinen vuosikorko koko laina-ajalle? Usein koroton jakso on vain markkinointikeino, ja kokonaiskustannus ei ole sen edullisempi kuin kilpailijoiden.</p>

<h2 id="yhteenveto">Yhteenveto</h2>
<p>Todellinen vuosikorko on lainojen vertailun kulmakivi. Muista nämä asiat:</p>
<ul>
  <li>Todellinen vuosikorko sisältää koron <em>ja</em> kaikki pakolliset kulut — se on lainan todellinen hinta.</li>
  <li>Vertaile aina todellista vuosikorkoa, älä nimelliskorkoa.</li>
  <li>Pienempi todellinen vuosikorko = edullisempi laina (saman lainasumman ja laina-ajan vertailussa).</li>
  <li>Varo "alkaen"-hintoja, erikoiskorkoja ja vaihtuvakorkoisten lainojen riskejä.</li>
  <li>Todellisen vuosikoron lisäksi huomioi lainan joustavuus ja muut ehdot.</li>
</ul>
<h3>Todellinen vuosikorko eri lainatyypeissä</h3>
<p>Todellisen vuosikoron taso vaihtelee lainatyypin ja markkinatilanteen mukaan. Suuntaa-antavat vaihteluvälit:</p>
<ul>
  <li><strong>Asuntolainat:</strong> noin 3–6 % (euribor + marginaali). Matalimmat korot, koska asunto toimii vakuutena.</li>
  <li><strong>Autolainat:</strong> noin 4–10 %. Vakuudellisissa korko on edullisempi.</li>
  <li><strong>Kulutusluotot:</strong> noin 6–20 %. Suurin hajonta hakijan luottoprofiilin mukaan.</li>
  <li><strong>Luottokortit ja joustoluotot:</strong> nimelliskorko usein lähellä lain sallimaa ylärajaa (viitekorko + 15 prosenttiyksikköä, enimmillään 20 %).</li>
  <li><strong>Pikavipit:</strong> pienissä summissa todellinen vuosikorko voi nousta korkeaksi, koska kiinteät kulut painavat suhteellisesti paljon.</li>
</ul>
<p>Kulutusluottojen <strong>nimelliskorolle</strong> on Suomessa lainsäädännöllinen katto (viitekorko + 15 prosenttiyksikköä, enintään 20 %), mutta <em>todellinen vuosikorko</em> voi silti nousta tätä korkeammaksi, jos kulut kasvattavat kokonaiskustannusta. Ainoa tapa tietää oma korkosi on pyytää tarjous.</p>

<p>Todellinen vuosikorko on paras yksittäinen työkalu lainojen vertailuun. <a href="/vertailu">Vertaa lainoja todellisen vuosikoron perusteella</a>.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Luottotiedot Suomessa
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'luottotiedot-suomessa',
    title: 'Luottotiedot Suomessa — Positiivinen luottorekisteri ja sen vaikutukset',
    description:
      'Kattava opas Suomen luottotietojärjestelmään: maksuhäiriömerkinnät, positiivinen luottorekisteri, luottokelpoisuuden parantaminen.',
    category: 'Perusteet',
    readTime: 11,
    tableOfContents: [
      { id: 'mita-luottotiedot-ovat', title: 'Mitä luottotiedot ovat?', level: 2 },
      { id: 'luottotietorekisterit', title: 'Luottotietorekisterit Suomessa', level: 2 },
      { id: 'maksuhairiomerkinnat', title: 'Maksuhäiriömerkinnät', level: 2 },
      { id: 'positiivinen-luottorekisteri', title: 'Positiivinen luottorekisteri', level: 2 },
      { id: 'miten-vaikuttaa-lainahakemukseen', title: 'Miten luottotiedot vaikuttavat lainahakemukseen?', level: 2 },
      { id: 'tarkista-omat-tiedot', title: 'Näin tarkistat omat luottotietosi', level: 2 },
      { id: 'luottokelpoisuuden-parantaminen', title: 'Luottokelpoisuuden parantaminen', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    relatedGuides: ['lainaamisen-perusteet', 'lainan-kilpailutus', 'velan-hallinta'],
    content: `
<h2 id="mita-luottotiedot-ovat">Mitä luottotiedot ovat?</h2>
<p>Luottotiedot ovat rekisteriin tallennettuja tietoja henkilön maksukäyttäytymisestä ja taloudellisesta asemasta. Ne kertovat lainanantajalle, miten olet hoitanut aiemmat velvoitteesi ja millainen taloudellinen tilanteesi on.</p>
<p>Suomen luottotietojärjestelmä oli pitkään <strong>negatiivinen</strong>: rekisteriin tallennettiin vain tiedot maksujen laiminlyönneistä (maksuhäiriömerkinnät). <strong>1. huhtikuuta 2024 käyttöön otettu positiivinen luottotietorekisteri</strong> toi järjestelmään myös tiedot olemassa olevista luotoista ja tuloista. Rekisteriä ylläpitää Verohallinnon Tulorekisteriyksikkö.</p>

<h2 id="luottotietorekisterit">Luottotietorekisterit Suomessa</h2>
<p>Suomessa toimii rinnakkain kaksi yksityistä luottotietotoimittajaa sekä valtion ylläpitämä positiivinen luottotietorekisteri:</p>

<h3>Suomen Asiakastieto (Enento Group)</h3>
<p>Suomen Asiakastieto on suurin luottotietotoimittaja Suomessa. Se ylläpitää sekä henkilö- että yritysluottotietoja, ja suurin osa lainanantajista hakee maksuhäiriötiedot juuri Asiakastiedon rekisteristä. Yhtiö on osa pörssilistattua Enento Groupia.</p>

<h3>Dun &amp; Bradstreet Finland (ent. Bisnode)</h3>
<p>Toinen merkittävä toimija on Dun &amp; Bradstreet Finland, joka tunnettiin aiemmin nimellä Bisnode Finland. Yhtiö ylläpitää omaa rekisteriään, jossa on pääosin samat tiedot kuin Asiakastiedolla. Koska toimittajat keräävät osan tiedoista eri lähteistä, merkintä voi joissakin tapauksissa näkyä vain toisessa rekisterissä — siksi molempien tarkistus on perusteltua.</p>

<h3>Positiivinen luottotietorekisteri</h3>
<p>Verohallinnon Tulorekisteriyksikön ylläpitämä positiivinen luottotietorekisteri on toiminut 1.4.2024 alkaen. Se yhdistää tiedot kuluttajan olemassa olevista luotoista sekä tulorekisteristä saatavat palkka- ja etuustiedot. Omat tiedot voi tarkistaa osoitteessa luottotietorekisteri.fi.</p>

<h2 id="maksuhairiomerkinnat">Maksuhäiriömerkinnät</h2>
<p>Maksuhäiriömerkintä on tieto siitä, että henkilö on jättänyt maksamatta erääntyneen velan, ja asiasta on tehty oikeudellinen ratkaisu tai se on muuten vahvistettu. Maksuhäiriömerkintä on <strong>vakavin yksittäinen tekijä, joka vaikuttaa lainan saamiseen</strong>.</p>

<h3>Miten maksuhäiriömerkintä syntyy?</h3>
<p>Maksuhäiriömerkintä ei synny yhden myöhästyneen laskun takia. Tavallinen prosessi etenee näin:</p>
<ol>
  <li>Lasku erääntyy ja jää maksamatta</li>
  <li>Velkoja lähettää maksumuistutuksen (yleensä 14 päivän kuluessa)</li>
  <li>Maksumuistutuksen jälkeen asia siirtyy perintätoimistolle</li>
  <li>Perintätoimisto lähettää perintäkirjeen</li>
  <li>Jos velkaa ei makseta, asia voidaan viedä käräjäoikeuteen</li>
  <li>Käräjäoikeuden tuomio tai yksipuolinen tuomio aiheuttaa maksuhäiriömerkinnän</li>
</ol>
<p>Merkintä voi syntyä myös ilman oikeudenkäyntiä, esimerkiksi ulosottomerkinnän kautta.</p>

<h3>Miten pitkään merkintä näkyy?</h3>
<p>Joulukuussa 2022 voimaan tulleen luottotietolain muutoksen jälkeen maksuhäiriömerkintä <strong>poistuu pääsääntöisesti kuukauden kuluessa siitä, kun velka on maksettu</strong> ja luottotietoyhtiö on saanut tiedon maksusta. Uudet maksuhäiriömerkinnät eivät myöskään enää pidennä aiempien merkintöjen säilytysaikaa.</p>
<p>Säilytysaikojen pääsäännöt hoitamattomille veloille:</p>
<ul>
  <li><strong>Yksipuolinen tuomio tai tuomioistuimen vahvistama maksuhäiriö:</strong> enintään 3 vuotta</li>
  <li><strong>Ulosottomerkintä (suppea ulosotto, varattomuusestämä):</strong> enintään 3 vuotta</li>
  <li><strong>Velkajärjestelymerkintä:</strong> maksuohjelman ajan</li>
</ul>
<p>Velan maksaminen ei välttämättä poista merkintää välittömästi, mutta se käynnistää poistumisaikataulun. Paras tapa välttää merkintöjä on hoitaa laskut ajallaan.</p>

<h3>Kuinka yleisiä maksuhäiriömerkinnät ovat?</h3>
<p>Suomessa on noin 400 000 henkilöä, joilla on voimassa oleva maksuhäiriömerkintä. Tämä on noin 7 % aikuisväestöstä. Eniten merkintöjä on 25–44-vuotiailla miehillä. Yleisimmät syyt ovat maksamattomat laskut, pikavippivelat ja perintään edenneet kuluttajaluotot. On tärkeää ymmärtää, että merkintä voi syntyä yllättävän pienestäkin summasta — jopa muutaman kymmenen euron maksamaton lasku voi johtaa merkintään, jos se etenee oikeuteen asti.</p>

<h3>Maksuhäiriömerkinnän vaikutukset</h3>
<p>Maksuhäiriömerkinnällä on kauaskantoisia seurauksia:</p>
<ul>
  <li>Lainan saaminen vaikeutuu merkittävästi — useimmat pankit eivät myönnä lainaa lainkaan</li>
  <li>Vuokra-asunnon saaminen voi olla vaikeaa</li>
  <li>Puhelinliittymän tai nettiyhteyden saaminen voi vaatia ennakkomaksun</li>
  <li>Vakuutusten saaminen voi vaikeutua tai kallistua</li>
  <li>Työnantajat voivat joissakin tehtävissä tarkistaa luottotiedot (erityisesti taloushallinnon tehtävät)</li>
</ul>

<h2 id="positiivinen-luottorekisteri">Positiivinen luottorekisteri</h2>
<p>Suomessa otettiin huhtikuussa 2024 käyttöön <strong>positiivinen luottorekisteri</strong>, joka on merkittävin muutos Suomen luottotietojärjestelmässä vuosikymmeniin. Rekisteriä ylläpitää Tulorekisteriyksikkö, joka toimii Verohallinnon yhteydessä.</p>

<h3>Mikä on positiivinen luottorekisteri?</h3>
<p>Positiivinen luottorekisteri sisältää tietoja henkilön <strong>olemassa olevista luotoista ja tuloista</strong> — ei vain negatiivisista maksuhäiriömerkinnöistä. Nimi "positiivinen" viittaa siihen, että rekisteri sisältää myös myönteistä tietoa taloudellisesta asemasta.</p>

<h3>Mitä tietoja rekisteri sisältää?</h3>
<p>Positiiviseen luottorekisteriin tallennetaan:</p>
<ul>
  <li><strong>Luottotiedot:</strong> kaikki kuluttajaluotot, asuntolainat, opintolainat, luottokortit, osamaksusopimukset ja joustoluotot</li>
  <li><strong>Luoton tiedot:</strong> luoton tyyppi, myöntöpäivä, luottoraja, jäljellä oleva pääoma, korko ja lyhennyserät</li>
  <li><strong>Tulotiedot:</strong> tiedot tulorekisteristä (palkkatulot, eläkkeet, etuudet)</li>
  <li><strong>Maksuhäiriömerkinnät:</strong> perinteiset maksuhäiriötiedot</li>
</ul>

<h3>Miten positiivinen luottorekisteri vaikuttaa lainanhakijoihin?</h3>
<p>Positiivinen luottorekisteri muuttaa lainamarkkinaa monella tavalla:</p>
<ul>
  <li><strong>Tarkemmat luottopäätökset:</strong> Lainanantajat näkevät hakijan kokonaisvelkatilanteen, jolloin he voivat arvioida maksukykyä paremmin.</li>
  <li><strong>Ylivelkaantumisen ehkäisy:</strong> Kun kaikki olemassa olevat lainat näkyvät, on vaikeampi ottaa liikaa velkaa.</li>
  <li><strong>Mahdollisesti paremmat korot:</strong> Jos luottohistoriasi on hyvä ja velkataakkasi kohtuullinen, voit saada edullisempia lainatarjouksia.</li>
  <li><strong>Nopeampi prosessi:</strong> Lainanantajat saavat tiedot automaattisesti rekisteristä ilman, että sinun tarvitsee toimittaa palkkatodistuksia tai tiliotteiden kopioita.</li>
</ul>

<h3>Kuka pääsee tarkastelemaan tietoja?</h3>
<p>Positiivisen luottorekisterin tietoihin pääsevät käsiksi:</p>
<ul>
  <li><strong>Lainanantajat</strong> — luottopäätöksen tekemistä varten (vain hakijan suostumuksella)</li>
  <li><strong>Sinä itse</strong> — voit tarkistaa omat tietosi milloin tahansa</li>
  <li><strong>Viranomaiset</strong> — esimerkiksi Finanssivalvonta valvontatarkoituksessa</li>
</ul>
<p>Tietoja <strong>eivät</strong> saa nähdä esimerkiksi työnantajat, vuokranantajat tai vakuutusyhtiöt.</p>

<h3>Mitä positiivinen luottorekisteri tarkoittaa käytännössä?</h3>
<p>Ennen positiivista luottorekisteriä lainanantaja ei välttämättä tiennyt, kuinka paljon hakijalla on jo velkaa muualla. Hakija saattoi saada lainoja useista eri paikoista samanaikaisesti, ja kokonaisvelka kasvoi hallitsemattomaksi. Positiivinen luottorekisteri korjaa tämän ongelman: lainanantaja näkee hakijan koko velkatilanteen reaaliaikaisesti.</p>
<p>Tämä on pääosin hyödyllinen muutos. Se suojaa kuluttajia ylivelkaantumiselta ja auttaa lainanantajia tekemään tarkempia luottopäätöksiä. Samalla se voi hyödyttää hyviä maksajia, koska lainanantaja näkee konkreettisesti, että hakija on hoitanut velkansa vastuullisesti.</p>

<h2 id="miten-vaikuttaa-lainahakemukseen">Miten luottotiedot vaikuttavat lainahakemukseen?</h2>
<p>Lainanantajat arvioivat hakijan luottokelpoisuutta kokonaisuutena. Keskeisimmät tekijät ovat:</p>
<ol>
  <li><strong>Maksuhäiriömerkinnät:</strong> Voimassa oleva merkintä tarkoittaa useimmiten automaattista hylkäystä.</li>
  <li><strong>Nykyinen velkatilanne:</strong> Positiivinen luottorekisteri näyttää kaikki olemassa olevat lainat. Liian suuri velka suhteessa tuloihin johtaa hylkäykseen.</li>
  <li><strong>Tulotaso:</strong> Riittävät ja säännölliset tulot ovat edellytys luoton saamiselle.</li>
  <li><strong>Maksuhistoria:</strong> Vaikka Suomessa ei ole varsinaista "luottopisteytystä" (credit score) kuten Yhdysvalloissa, lainanantajat arvioivat maksuhistoriaasi kokonaisuutena.</li>
  <li><strong>Työsuhde:</strong> Vakituinen työsuhde katsotaan eduksi, mutta myös yrittäjät ja määräaikaiset työntekijät voivat saada lainaa.</li>
  <li><strong>Velka-tulosuhde:</strong> Tämä on yksi keskeisimmistä mittareista. Lainanantajat laskevat, kuinka suuri osa tuloistasi menee jo olemassa olevien velkojen hoitoon. Jos velka-tulosuhde on yli 40–50 %, uuden lainan saaminen on vaikeaa.</li>
</ol>

<h3>Luottoluokitus Suomessa vs. muualla</h3>
<p>Toisin kuin esimerkiksi Yhdysvalloissa, Suomessa ei ole numeerista "credit scorea" (luottopisteytystä), joka olisi kaikkien lainanantajien yhteiskäytössä. Sen sijaan jokainen lainanantaja tekee oman arvionsa hakijan luottokelpoisuudesta omien kriteereidensä perusteella. Tämä tarkoittaa, että saatat saada hylkäyksen yhdestä pankista mutta hyväksynnän toisesta — koska pankit painottavat eri asioita.</p>
<p>Suomen Asiakastieto tarjoaa kuitenkin oman luottoluokituspalvelunsa, jossa henkilö saa arvion luottokelpoisuudestaan asteikolla. Tämä ei ole virallinen luottopisteytys, mutta antaa osviittaa siitä, miten lainanantajat todennäköisesti arvioivat tilanteesi.</p>

<h2 id="tarkista-omat-tiedot">Näin tarkistat omat luottotietosi</h2>
<p>Jokaisella on oikeus tarkistaa omat luottotietonsa. Suosittelemme tarkistamaan tiedot vähintään kerran vuodessa — ja aina ennen lainahakemuksen jättämistä.</p>

<h3>Maksuhäiriömerkinnät</h3>
<ul>
  <li><strong>Suomen Asiakastieto:</strong> Oma luottotieto -raportin voi tilata osoitteesta omatieto.fi. Henkilöllä on EU:n tietosuoja-asetuksen nojalla oikeus tarkastaa omat tietonsa maksutta.</li>
  <li><strong>Dun &amp; Bradstreet Finland:</strong> Omat tiedot voi tilata osoitteesta my.bisnode.fi.</li>
</ul>

<h3>Positiivinen luottotietorekisteri</h3>
<p>Omat tiedot positiivisesta luottotietorekisteristä voi tarkistaa Tulorekisteriyksikön sähköisessä asiointipalvelussa osoitteessa <strong>luottotietorekisteri.fi</strong>. Kirjautuminen tapahtuu pankkitunnuksilla tai mobiilivarmenteella. Otteen voi tilata maksutta.</p>
<p>Tarkista erityisesti:</p>
<ul>
  <li>Ovatko kaikki luottotiedot oikein (lainasummat, luottorajat)?</li>
  <li>Näkyykö rekisterissä luottoja, jotka olet jo maksanut pois?</li>
  <li>Ovatko tulotiedot ajantasaiset?</li>
</ul>
<p>Jos löydät virheellisiä tietoja, ota yhteyttä kyseiseen luotonantajaan tai Tulorekisteriyksikköön virheen korjaamiseksi.</p>

<h2 id="luottokelpoisuuden-parantaminen">Luottokelpoisuuden parantaminen</h2>
<p>Vaikka Suomessa ei ole pistemäistä luottoluokitusta, on monia asioita, joilla voit parantaa mahdollisuuksiasi saada lainaa edullisilla ehdoilla:</p>

<h3>Lyhyen aikavälin toimet</h3>
<ul>
  <li><strong>Maksa erääntyneet laskut</strong> — Hoida kaikki maksamattomat laskut ennen lainahakemusta.</li>
  <li><strong>Vähennä luottokorttien käyttöä</strong> — Pienennä luottokorttivelkaa, sillä se näkyy positiivisessa luottorekisterissä.</li>
  <li><strong>Tarkista tietosi</strong> — Varmista, että luottotiedoissasi ei ole virheitä.</li>
  <li><strong>Älä hae montaa lainaa samaan aikaan</strong> — Useat lainahakemukset lyhyen ajan sisällä voivat herättää huomiota.</li>
</ul>

<h3>Pitkän aikavälin toimet</h3>
<ul>
  <li><strong>Maksa lainat ajallaan</strong> — Johdonmukainen maksuhistoria on parasta, mitä voit tehdä.</li>
  <li><strong>Kasvata tuloja</strong> — Korkeammat tulot parantavat maksukykyäsi lainanantajan silmissä.</li>
  <li><strong>Vähennä kokonaisvelkaa</strong> — Pienempi velka suhteessa tuloihin (velka-tulosuhde) parantaa luottokelpoisuutta.</li>
  <li><strong>Rakenna säästöpuskuri</strong> — Säästöt osoittavat taloudellista vastuullisuutta ja antavat turvaa yllättävissä tilanteissa.</li>
  <li><strong>Odota merkinnän vanhenemista</strong> — Jos sinulla on maksuhäiriömerkintä, sen vanhenemiseen menee 2–3 vuotta. Maksa velka, niin merkintä poistuu nopeammin.</li>
</ul>

<h3>Erityistilanteet</h3>
<p><strong>Yrittäjät ja freelancerit:</strong> Epäsäännölliset tulot voivat vaikeuttaa lainan saamista, koska lainanantajat arvostavat säännöllisyyttä. Jos olet yrittäjä, valmistaudu todistamaan tulosi pidemmältä ajalta — tyypillisesti 2–3 vuoden verotiedot. Voit myös parantaa tilannettasi pitämällä henkilökohtaisen talouden selkeästi erillään yrityksen taloudesta.</p>
<p><strong>Opiskelijat:</strong> Opiskelijoiden tulot ovat yleensä pienet, mutta opintolaina ei ole este muiden lainojen saamiselle. Tärkeintä on, ettei ole maksuhäiriömerkintöjä ja tulot riittävät kuukausierään.</p>
<p><strong>Eläkeläiset:</strong> Eläketulot ovat säännöllisiä, mutta laina-ajan pituus voi olla rajoitettu iästä riippuen. Pankit arvioivat, ehtiikö laina tulla maksetuksi ennen tiettyä ikää (usein 70–75 vuotta).</p>

<h2 id="yhteenveto">Yhteenveto</h2>
<p>Suomen luottotietojärjestelmä on murroksessa. Positiivinen luottorekisteri tuo läpinäkyvyyttä ja tarkkuutta luottopäätöksiin. Tämä hyödyttää erityisesti niitä, joilla on hyvä maksuhistoria ja kohtuullinen velkataso.</p>
<p>Tärkeimmät muistettavat asiat:</p>
<ul>
  <li>Tarkista omat luottotietosi säännöllisesti — se on ilmaista kerran vuodessa.</li>
  <li>Maksuhäiriömerkintä vaikeuttaa elämää merkittävästi — hoida laskut aina ajallaan.</li>
  <li>Positiivinen luottorekisteri näyttää kaikki lainasi — ole tietoinen kokonaisvelkataakastasi.</li>
  <li>Luottokelpoisuutta voi parantaa johdonmukaisilla toimilla.</li>
</ul>
<h3>Yleisimmät kysymykset luottotiedoista</h3>
<p><strong>Vaikuttaako pelkkä lainahakemus luottotietoihini?</strong> Lainahakemuksen jättäminen ei itsessään aiheuta maksuhäiriömerkintää. Lainanantaja tekee luottotietojen tarkistuksen, joka voi näkyä rekisterissä, mutta se ei heikennä luottokelpoisuuttasi. Useita hakemuksia lyhyen ajan sisällä voi kuitenkin herättää lainanantajan huomiota.</p>
<p><strong>Voiko puolison maksuhäiriömerkintä vaikuttaa omaan lainaan?</strong> Ei suoraan. Lainapäätös tehdään yksilökohtaisesti. Jos kuitenkin haette yhteistä lainaa, molempien luottotiedot tarkistetaan.</p>
<p><strong>Miten kauan maksuhäiriömerkinnän jälkeen saa lainaa?</strong> Kuluttajalainaa on lähtökohtaisesti vaikea saada merkinnän voimassaoloaikana. Vuoden 2022 lakiuudistuksen jälkeen merkintä poistuu kuitenkin noin kuukauden kuluessa velan maksamisesta, joten velan maksaminen on tehokkain tapa palauttaa luottokelpoisuus. Jotkin erikoistuneet toimijat myöntävät lainaa merkinnästä huolimatta, mutta korot ovat silloin korkeita.</p>
<p><strong>Voiko virheellisen luottotietomerkinnän poistaa?</strong> Kyllä. Ota yhteyttä luottotietoyritykseen (Asiakastieto tai Dun &amp; Bradstreet) ja pyydä oikaisua. Luottotietolaki velvoittaa korjaamaan virheelliset tiedot ilman aiheetonta viivytystä.</p>

<p><strong>Näkyvätkö kaikki lainani positiivisessa luottotietorekisterissä?</strong> Rekisteri sisältää tiedot Suomessa myönnetyistä kuluttajaluotoista — kulutusluotoista, asuntolainoista, opintolainoista, luottokorteista, joustoluotoista ja osamaksusopimuksista. Yrityslainat ja ulkomaisista pankeista otetut luotot eivät näy rekisterissä.</p>

<p><strong>Voiko luottotietoja parantaa nopeasti?</strong> Luottotietojen parantaminen on enemmän maraton kuin sprintti. Nopeimmat vaikutukset saat maksamalla erääntyneet laskut ja pienentämällä luottokorttien saldoa. Pidemmällä aikavälillä johdonmukainen maksuhistoria on parasta, mitä voit tehdä. Mitään "pikakeinoa" ei valitettavasti ole.</p>

<p>Hyvät luottotiedot avaavat oven edullisempiin lainoihin. <a href="/vertailu">Vertaa lainoja</a> ja hyödynnä hyvää maksuhistoriaasi.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Lainan kilpailutus
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'lainan-kilpailutus',
    title: 'Lainan kilpailutus — Näin löydät edullisimman lainan',
    description:
      'Vaiheittainen opas lainan kilpailuttamiseen: mitä vertailla, miten neuvotella ja mitkä ovat yleisimmät virheet.',
    category: 'Säästäminen',
    readTime: 10,
    tableOfContents: [
      { id: 'miksi-kilpailuttaa', title: 'Miksi laina kannattaa kilpailuttaa?', level: 2 },
      { id: 'vaihe-vaiheelta', title: 'Lainan kilpailutus vaihe vaiheelta', level: 2 },
      { id: 'mita-vertailla', title: 'Mitä asioita vertailla?', level: 2 },
      { id: 'neuvotteluvinkit', title: 'Neuvotteluvinkit', level: 2 },
      { id: 'vertailupalvelun-kaytto', title: 'Milloin käyttää vertailupalvelua?', level: 2 },
      { id: 'yleiset-virheet', title: 'Yleisimmät virheet', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    relatedGuides: ['todellinen-vuosikorko', 'lainaamisen-perusteet', 'velkojen-yhdistely'],
    content: `
<h2 id="miksi-kilpailuttaa">Miksi laina kannattaa kilpailuttaa?</h2>
<p>Lainan kilpailutus on yksinkertaisin tapa säästää rahaa lainakustannuksissa. Silti moni suomalainen hyväksyy ensimmäisen tarjouksen, jonka saa — usein omasta pankistaan.</p>
<p>Suomen lainamarkkinoilla toimii kymmeniä lainanantajia, joiden korot ja kulut vaihtelevat merkittävästi. Saman 10 000 euron kulutusluoton kokonaiskustannus voi vaihdella satoja tai tuhansia euroja eri tarjousten välillä. Tarjousten pyytäminen on usein 15–30 minuutin työ.</p>

<h3>Käytännön esimerkki</h3>
<p>Oletetaan, että haet 15 000 euron kulutusluottoa 5 vuoden laina-ajalla. Kolme eri tarjousta:</p>
<ul>
  <li><strong>Pankki A:</strong> TAV 7,2 % → kokonaiskustannus 17 862 € → kuukausierä 297,70 €</li>
  <li><strong>Pankki B:</strong> TAV 9,8 % → kokonaiskustannus 18 951 € → kuukausierä 315,85 €</li>
  <li><strong>Pankki C:</strong> TAV 12,5 % → kokonaiskustannus 20 147 € → kuukausierä 335,78 €</li>
</ul>
<p>Pankin A ja pankin C välinen ero on <strong>2 285 euroa</strong>. Tämä raha säästyy pelkällä vertailulla — ilman neuvottelua tai erityisvaatimuksia.</p>

<h2 id="vaihe-vaiheelta">Lainan kilpailutus vaihe vaiheelta</h2>
<p>Tehokas lainan kilpailutus etenee järjestelmällisesti:</p>

<h3>Vaihe 1: Määrittele tarpeesi</h3>
<p>Ennen tarjousten pyytämistä, selvitä itsellesi:</p>
<ul>
  <li><strong>Kuinka paljon tarvitset?</strong> Lainaa kannattaa ottaa vain sen verran kuin oikeasti tarvitset.</li>
  <li><strong>Millä laina-ajalla selviät?</strong> Lyhyempi laina-aika = pienempi kokonaiskustannus, mutta suurempi kuukausierä.</li>
  <li><strong>Mikä on maksimibudjettisi kuukausierälle?</strong> Laske tulosi ja menosi, ja arvioi realistisesti, paljonko voit maksaa kuukaudessa.</li>
  <li><strong>Tarvitsetko joustavuutta?</strong> Esimerkiksi mahdollisuutta siirtää erää tai maksaa ennenaikaisesti.</li>
</ul>

<h3>Vaihe 2: Pyydä tarjouksia laajasti</h3>
<p>Pyydä tarjouksia vähintään 3–5 eri lainanantajalta. Hyvä koostumus:</p>
<ul>
  <li>Oma pankki (sinulla voi olla asiakkuusetuja)</li>
  <li>1–2 muuta perinteistä pankkia</li>
  <li>1–2 fintech-lainanantajaa (verkossa toimivat lainanantajat)</li>
</ul>
<p>Käytä myös <a href="/vertailu">vertailupalvelua</a>, joka pyytää tarjouksia useilta lainanantajilta yhdellä hakemuksella.</p>

<h3>Vaihe 3: Vertaile tarjouksia oikein</h3>
<p>Kun saat tarjoukset, vertaile niitä järjestelmällisesti. Tärkein yksittäinen luku on <strong>todellinen vuosikorko</strong>, mutta katso myös kokonaiskustannusta ja muita ehtoja (ks. alla).</p>

<h3>Vaihe 4: Neuvottele</h3>
<p>Kun sinulla on useita tarjouksia, voit neuvotella paremmat ehdot. Kerro lainanantajalle, että sinulla on kilpaileva tarjous, ja kysy, voivatko he parantaa omaansa.</p>

<h3>Vaihe 5: Tee päätös ja allekirjoita</h3>
<p>Valitse kokonaisuutena paras tarjous. Muista, ettei edullisin ole aina halvin koroltaan — joustavuus, asiakaspalvelu ja muut ehdot voivat olla arvokkaita.</p>

<h2 id="mita-vertailla">Mitä asioita vertailla?</h2>
<p>Lainojen vertailussa kannattaa kiinnittää huomiota ainakin näihin asioihin:</p>

<h3>Todellinen vuosikorko (TAV)</h3>
<p>Tärkein vertailuluku. Sisältää koron ja kaikki pakolliset kulut. <a href="/oppaat/todellinen-vuosikorko">Lue lisää todellisesta vuosikorosta</a>.</p>

<h3>Kokonaiskustannus</h3>
<p>Kuinka paljon maksat lainasta kaikkiaan — pääoma, korot ja kulut yhteensä. Tämä on konkreettisin luku: näet tarkalleen, paljonko laina maksaa euroissa.</p>

<h3>Kuukausierä</h3>
<p>Varmista, että kuukausierä mahtuu budjettiisi. Liian suuri kuukausierä voi aiheuttaa ongelmia, vaikka kokonaiskustannus olisi pieni.</p>

<h3>Kulut eriteltynä</h3>
<p>Tarkista avausmaksu, kuukausimaksu ja muut kulut. Joissakin tapauksissa matalamman koron lainassa on korkeat kiinteät kulut, jotka nostavat kokonaiskustannusta.</p>

<h3>Ennenaikainen takaisinmaksu</h3>
<p>Voitko maksaa lainan pois ennen sovittua aikaa? Kiinteäkorkoisessa kuluttajaluotossa lainanantaja saa periä enintään 1 % (tai 0,5 %, jos laina-aikaa on alle vuosi) takaisinmaksetusta määrästä. <strong>Viitekorkoon sidotusta lainasta ei saa periä korvausta lainkaan</strong> — ennenaikainen takaisinmaksu on maksutonta.</p>

<h3>Joustavuus</h3>
<p>Voitko siirtää erää tai muuttaa laina-aikaa tarvittaessa? Joustavuus on arvokasta, jos taloudellinen tilanteesi muuttuu.</p>

<h3>Korkotyyppi</h3>
<p>Onko korko kiinteä vai vaihtuva? Kiinteä korko antaa ennustettavuutta, vaihtuva korko voi olla alussa edullisempi mutta sisältää korkoriskin.</p>

<h3>Lainan nostamisen nopeus</h3>
<p>Jos tarvitset rahat nopeasti (esim. huutokauppa, kiireellinen hankinta), lainan käsittelynopeus voi olla ratkaiseva tekijä. Fintech-lainanantajat ovat yleensä nopeimpia — päätös ja rahat samana päivänä. Perinteiset pankit voivat käsitellä hakemusta useita päiviä.</p>

<h3>Vertailutaulukko</h3>
<p>Tee yksinkertainen taulukko, johon kirjaat jokaisen tarjouksen: lainanantaja, nimelliskorko, todellinen vuosikorko, kuukausierä, kokonaiskustannus, avausmaksu, kuukausimaksu, joustavuus (kyllä/ei), käsittelynopeus. Tämä tekee vertailusta helppoa ja systemaattista.</p>

<h2 id="neuvotteluvinkit">Neuvotteluvinkit</h2>
<p>Lainan ehdoista voi ja kannattaa neuvotella. Tässä muutamia tehokkaita vinkkejä:</p>

<h3>1. Näytä kilpailevia tarjouksia</h3>
<p>Paras neuvotteluvaltti on kilpaileva tarjous toisesta pankista. Kerro lainanantajalle, mitä muualta tarjotaan, ja kysy, voivatko he tehdä paremman tarjouksen. Tämä toimii erityisen hyvin omassa pankissasi — he eivät halua menettää asiakasta.</p>

<h3>2. Keskitä palveluja</h3>
<p>Pankit tarjoavat usein parempia ehtoja asiakkaille, jotka keskittävät palveluitaan. Jos sinulla on palkkatilin lisäksi säästöjä, sijoituksia tai vakuutuksia samassa pankissa, neuvotteluvoimasi on suurempi.</p>

<h3>3. Ajoita oikein</h3>
<p>Kuukauden ja vuosineljänneksen loppu voi olla hyvä aika neuvotella, kun pankeilla on myyntitavoitteita täytettävänä. Myös uusasiakaskampanjoiden aikana ehdot voivat olla normaalia parempia.</p>

<h3>4. Kysy rohkeasti alennuksia</h3>
<p>Kysy, voiko avausmaksun poistaa tai alentaa. Kysy, onko kuukausimaksua mahdollista jättää pois. Pahimmassa tapauksessa saat kieltävän vastauksen — mutta usein pieniä myönnytyksiä on mahdollista saada.</p>

<h3>5. Ole rehellinen</h3>
<p>Älä liioittele tulojasi tai vähättele velkojasi. Positiivinen luottorekisteri paljastaa todellisen tilanteen joka tapauksessa. Rehellisyys rakentaa luottamusta ja nopeuttaa prosessia.</p>

<h3>6. Muista "kokonaisasiakkuus"</h3>
<p>Jos olet valmis siirtämään myös muita palveluita (palkkatilin, vakuutukset, säästöt) uuteen pankkiin, mainitse se neuvotteluissa. Pankit arvostavat kokonaisasiakkuuksia ja ovat valmiita tarjoamaan parempia ehtoja asiakkaille, jotka tuovat useita tuotteita.</p>

<h3>7. Pyydä tarjous kirjallisena</h3>
<p>Pyydä aina tarjous kirjallisena — mieluiten virallisena SECCI-lomakkeena (Vakiomuotoiset eurooppalaiset kuluttajaluottotiedot). Tämä lomake sisältää kaikki lainan tiedot standardoidussa muodossa, joten vertailu on helppoa. Suullinen lupaus "hyvästä korosta" ei riitä.</p>

<h2 id="vertailupalvelun-kaytto">Milloin käyttää vertailupalvelua?</h2>
<p>Lainavertailupalvelu, kuten Valitse Laina, on hyödyllisin näissä tilanteissa:</p>
<ul>
  <li><strong>Haluat säästää aikaa</strong> — Yksi hakemus, useita tarjouksia. Sinun ei tarvitse täyttää jokaisen pankin lomaketta erikseen.</li>
  <li><strong>Et tunne markkinaa</strong> — Vertailupalvelu näyttää, mitä eri lainanantajat tarjoavat, jolloin saat kuvan markkinahinnasta.</li>
  <li><strong>Haluat varmistaa, ettet maksa liikaa</strong> — Näet heti, onko oman pankkisi tarjous kilpailukykyinen.</li>
  <li><strong>Etsit parasta mahdollista korkoa</strong> — Kilpailutus useilla lainanantajilla nostaa todennäköisyyttä saada markkinoiden paras korko.</li>
</ul>
<p>Vertailupalvelun käyttö on aina ilmaista, eikä se sido sinua mihinkään. Tarjousten pyytäminen ei myöskään vaikuta luottotietoihisi — varsinainen luottotietotarkistus tehdään vasta, kun hyväksyt tarjouksen.</p>

<h3>Miten vertailupalvelu toimii?</h3>
<p>Käytännössä vertailupalvelun käyttö etenee näin:</p>
<ol>
  <li>Täytät yhden hakemuksen, jossa kerrot lainasumman, laina-ajan ja perustietosi.</li>
  <li>Vertailupalvelu välittää tietosi useille lainanantajille samanaikaisesti.</li>
  <li>Saat tarjouksia useilta lainanantajilta — usein jo minuuteissa.</li>
  <li>Vertailet tarjouksia rinnakkain ja valitset parhaan.</li>
  <li>Hyväksyt tarjouksen suoraan lainanantajan palvelussa.</li>
</ol>
<p>Vertailupalvelu on käyttäjälle maksuton. Hyvä vertailupalvelu näyttää kaikki lainat puolueettomasti todellisten kustannusten perusteella — kuten me Valitse Lainassa teemme.</p>

<h2 id="yleiset-virheet">Yleisimmät virheet</h2>
<p>Vältä nämä tyypilliset sudenkuopat lainan kilpailutuksessa:</p>

<h3>1. Vain yhden tarjouksen hyväksyminen</h3>
<p>Yleisin virhe. Ensimmäinen tarjous on harvoin paras. Käytä aina vähintään 15 minuuttia vertailuun — se voi säästää satoja tai tuhansia euroja.</p>

<h3>2. Pelkän nimelliskoron vertailu</h3>
<p>Nimelliskorko ei sisällä kuluja. Vertaile aina <strong>todellista vuosikorkoa</strong> ja kokonaiskustannusta.</p>

<h3>3. Liian pitkän laina-ajan valinta</h3>
<p>Pitkä laina-aika pienentää kuukausierää, mutta nostaa kokonaiskustannusta merkittävästi. Valitse lyhyin laina-aika, jonka kuukausierästä selviät mukavasti.</p>

<h3>4. Tarpeettoman suuren lainasumman hakeminen</h3>
<p>"Pieni puskuri varmuuden vuoksi" voi kuulostaa järkevältä, mutta ylimääräisestä lainasummasta maksat korkoa koko laina-ajan. Lainaa vain sen verran kuin tarvitset.</p>

<h3>5. Joustavuuden unohtaminen</h3>
<p>Halvin laina ei ole aina paras, jos se on jäykkä. Elämäntilanteet muuttuvat — mahdollisuus siirtää erää tai maksaa ennenaikaisesti voi olla arvokas.</p>

<h3>6. Impulssipäätökset</h3>
<p>Älä tee lainapäätöstä kiireessä. Vertaile rauhassa, nuku yön yli ja tee päätös harkiten. Lainasopimus on juridisesti sitova, vaikka kuluttajaluotoissa on 14 päivän peruutusoikeus.</p>

<h3>7. Huomiotta jätetyt lisäkulut</h3>
<p>Monet keskittyvät pelkkään korkoon mutta unohtavat muut kulut. Tarkista aina: onko lainaturvavakuutus pakollinen? Veloittaako pankki tiliotteista tai tilimuutoksista? Näitä kuluja ei aina mainita aktiivisesti, mutta ne voivat nostaa lainan kokonaiskustannusta.</p>

<h3>8. Vanhan lainan unohtaminen</h3>
<p>Jos sinulla on jo laina ja haet uutta, muista huomioida kokonaisvelkatilanteesi. Positiivinen luottorekisteri näyttää kaikki lainasi lainanantajalle — varmista, että pystyt maksamaan kaikkien lainojen kuukausierät yhtä aikaa.</p>

<h2 id="yhteenveto">Yhteenveto</h2>
<p>Lainan kilpailuttaminen on helppoa ja nopeaa — ja se voi säästää tuhansia euroja. Muista nämä pääkohdat:</p>
<ol>
  <li>Pyydä aina vähintään 3–5 tarjousta eri lainanantajilta.</li>
  <li>Vertaile todellista vuosikorkoa ja kokonaiskustannusta.</li>
  <li>Neuvottele — kilpailevat tarjoukset antavat neuvotteluvoimaa.</li>
  <li>Huomioi myös joustavuus ja muut ehdot, ei pelkästään hintaa.</li>
  <li>Käytä <a href="/vertailu">vertailupalvelua</a> säästääksesi aikaa ja varmistaaksesi, että saat markkinoiden parhaan tarjouksen.</li>
</ol>
<h3>Erityistilanteet kilpailutuksessa</h3>
<p><strong>Yrittäjät ja freelancerit:</strong> Jos tulosi vaihtelevat, valmistaudu dokumentoimaan ne huolellisesti. Yrittäjän kannattaa pyytää tarjouksia useammasta paikasta, koska eri lainanantajat suhtautuvat yrittäjätuloihin eri tavoin. Jotkut vaativat 2–3 vuoden verotiedot, toiset hyväksyvät tuoreemmat kirjanpitotiedot.</p>
<p><strong>Pienet lainat (alle 2 000 €):</strong> Pienissä lainoissa kilpailutuksen euromääräinen hyöty on pienempi, mutta suhteellinen ero voi olla suuri. Pienten lainojen kohdalla kannattaa kiinnittää erityistä huomiota kiinteisiin kuluihin (avausmaksu, kuukausimaksu), jotka voivat muodostaa merkittävän osan kokonaiskustannuksesta.</p>

<h3>Tapausesimerkki: Marjan kilpailutus</h3>
<p>Marja tarvitsi 12 000 euron kulutusluoton kylpyhuoneremonttiin. Hän pyysi tarjouksen omasta pankistaan ja sai tarjouksen: nimelliskorko 8,9 %, todellinen vuosikorko 10,4 %, 5 vuoden laina-aika, kuukausierä 256 €, kokonaiskustannus 15 360 €.</p>
<p>Marja päätti kilpailuttaa ja pyysi tarjouksia kahdesta muusta pankista ja yhdeltä fintech-lainanantajalta. Paras tarjous: nimelliskorko 6,2 %, todellinen vuosikorko 6,9 %, 5 vuoden laina-aika, kuukausierä 233 €, kokonaiskustannus 13 980 €.</p>
<p><strong>Marjan säästö: 1 380 euroa.</strong> Kilpailuttaminen vei noin 20 minuuttia. Se on 4 140 euron tuntipalkka.</p>
<p>Kun Marja näytti kilpailijan tarjouksen omalle pankilleen, pankki tarjosi uutta tarjousta: todellinen vuosikorko 7,5 %. Parempi kuin alkuperäinen, mutta ei yhtä hyvä kuin kilpailijan. Marja valitsi edullisimman vaihtoehdon.</p>

<h3>Asuntolainan kilpailutus — erityisen tärkeää</h3>
<p>Asuntolainassa kilpailutuksen merkitys korostuu entisestään, koska lainasummat ovat suuria ja laina-ajat pitkiä. Jo <strong>0,2 prosenttiyksikön ero marginaalissa</strong> 200 000 euron lainassa 25 vuoden ajalta tarkoittaa noin 5 500 euron eroa kokonaiskorkokustannuksessa. Asuntolainan kohdalla kannattaa aina pyytää tarjoukset vähintään 3–4 pankista ja neuvotella aktiivisesti.</p>

<h3>Kilpailutuksen aikataulu</h3>
<p>Hyvä aikataulu lainan kilpailutukseen:</p>
<ul>
  <li><strong>Päivä 1:</strong> Määrittele tarpeesi, laske budjettisi ja täytä vertailuhakemus + oman pankin hakemus.</li>
  <li><strong>Päivät 1–3:</strong> Tarjoukset saapuvat. Kirjaa kaikki tiedot vertailutaulukkoon.</li>
  <li><strong>Päivä 3–4:</strong> Neuvottele parhaan tarjouksen perusteella. Näytä kilpailevaa tarjousta omalle pankillesi ja muille.</li>
  <li><strong>Päivä 5:</strong> Tee päätös ja allekirjoita. Muista, että sinulla on 14 päivän peruutusoikeus kuluttajaluotoissa.</li>
</ul>
<p>Koko prosessi vie siis noin viikon — ja se voi säästää tuhansia euroja. Kiireellisissä tilanteissa prosessin voi tiivistää yhteen päivään vertailupalvelun avulla.</p>

<p>Aloita lainan kilpailutus nyt — <a href="/vertailu">vertaa lainoja</a> ja katso, paljonko voit säästää.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Velkojen yhdistely
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'velkojen-yhdistely',
    title: 'Velkojen yhdistely — Opas yhdistelylainaan',
    description:
      'Opi, milloin velkojen yhdistely kannattaa, miten säästöt lasketaan, mitä riskejä siihen liittyy ja mitä vaihtoehtoja on tarjolla.',
    category: 'Velanhoito',
    readTime: 11,
    tableOfContents: [
      { id: 'mita-on-velkojen-yhdistely', title: 'Mitä on velkojen yhdistely?', level: 2 },
      { id: 'milloin-kannattaa', title: 'Milloin velkojen yhdistely kannattaa?', level: 2 },
      { id: 'milloin-ei-kannata', title: 'Milloin yhdistely ei kannata?', level: 2 },
      { id: 'saastojen-laskeminen', title: 'Säästöjen laskeminen', level: 2 },
      { id: 'riskit', title: 'Velkojen yhdistelyn riskit', level: 2 },
      { id: 'miten-hakea', title: 'Miten yhdistelylainaa haetaan?', level: 2 },
      { id: 'vaihtoehdot', title: 'Vaihtoehdot velkojen yhdistelylle', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    relatedGuides: ['lainan-kilpailutus', 'velan-hallinta', 'todellinen-vuosikorko'],
    content: `
<h2 id="mita-on-velkojen-yhdistely">Mitä on velkojen yhdistely?</h2>
<p>Velkojen yhdistely tarkoittaa sitä, että <strong>useampi erillinen laina kootaan yhdeksi lainaksi</strong>. Otat yhden uuden, suuremman lainan ja käytät sen vanhojen lainojen maksamiseen. Sen jälkeen sinulla on vain yksi kuukausierä yhden lainanantajan kanssa.</p>
<p>Velkojen yhdistely on Suomessa yleinen ratkaisu erityisesti silloin, kun henkilöllä on kertynyt useita pieniä kulutusluottoja, luottokorttivelkoja tai pikavippejä, joiden yhteiskorko on korkea.</p>

<h3>Esimerkki yhdistelyn toiminnasta</h3>
<p>Kuvitellaan tilanne, jossa sinulla on kolme lainaa:</p>
<ul>
  <li>Kulutusluotto 1: 5 000 € — korko 12 % — kuukausierä 167 €</li>
  <li>Kulutusluotto 2: 3 000 € — korko 15 % — kuukausierä 112 €</li>
  <li>Luottokorttivelka: 2 000 € — korko 18 % — kuukausierä 80 €</li>
</ul>
<p>Yhteensä: 10 000 € velkaa, kuukausierät yhteensä 359 €, keskimääräinen korko noin 13,8 %.</p>
<p>Yhdistelylainalla voisit saada:</p>
<ul>
  <li>Yhdistelylaina: 10 000 € — korko 7,5 % — kuukausierä 200 € (5 vuotta)</li>
</ul>
<p>Kuukausierä pienenee 359 eurosta 200 euroon, ja korko laskee 13,8 %:sta 7,5 %:iin. <strong>Tämä on velkojen yhdistelyn perusidea.</strong></p>
<p>Säästöt koroissa voivat olla merkittäviä. Jos vanhojen lainojen keskimääräinen jäljellä oleva aika on 3 vuotta ja niiden kokonaiskorkokustannus olisi ollut noin 2 300 €, yhdistelylainan korkokustannus 5 vuoden ajalta on noin 1 989 €. Vaikka laina-aika pitenee, <strong>korkosäästöjä syntyy, koska korot ovat merkittävästi matalammat</strong>. Tämä on kuitenkin tapauskohtaista — siksi laskeminen on tärkeää.</p>

<h2 id="milloin-kannattaa">Milloin velkojen yhdistely kannattaa?</h2>
<p>Velkojen yhdistely on järkevää seuraavissa tilanteissa:</p>
<ul>
  <li><strong>Sinulla on useita korkeakorkoisia lainoja:</strong> Jos sinulla on pieniä lainoja, joiden korot ovat 10–20 %, yhdistelylainalla voit saada merkittävästi matalamman koron.</li>
  <li><strong>Haluat yksinkertaistaa talouttasi:</strong> Usean erillisen kuukausierän seuraaminen on työlästä ja lisää riskiä unohtaa maksu. Yksi laina = yksi erä = selkeys.</li>
  <li><strong>Kuukausierät ovat liian suuret:</strong> Yhdistelylainalla voit pidentää laina-aikaa, jolloin kuukausierä pienenee (mutta muista, että kokonaiskustannus voi nousta).</li>
  <li><strong>Haluat säästää koroissa:</strong> Jos yhdistelylainan korko on selvästi nykyisten lainojen keskimääräistä korkoa matalampi, säästät rahaa.</li>
</ul>

<h2 id="milloin-ei-kannata">Milloin yhdistely ei kannata?</h2>
<p>Velkojen yhdistely ei ole aina oikea ratkaisu. Näissä tilanteissa yhdistely voi jopa pahentaa asioita:</p>
<ul>
  <li><strong>Yhdistelylainan korko on korkeampi kuin nykyisten lainojen:</strong> Jos luottotietosi ovat heikot, et välttämättä saa yhdistelylainaa edullisella korolla. Tällöin yhdistely ei säästä rahaa.</li>
  <li><strong>Ongelma on kulutuskäyttäytymisessä:</strong> Jos velkaantuminen johtuu liiallisesta kulutuksesta, yhdistelylaina hoitaa oiretta mutta ei syytä. Riski on, että otat pian uutta velkaa vanhojen tilalle — ja päädyt entistä pahempaan tilanteeseen.</li>
  <li><strong>Pidennetty laina-aika nostaa kokonaiskustannusta merkittävästi:</strong> Pienempi kuukausierä tuntuu helpottavalta, mutta pidempi laina-aika tarkoittaa enemmän korkoja. Laske aina kokonaiskustannus, älä katso vain kuukausierää.</li>
  <li><strong>Vanhoissa lainoissa on lyhyt jäljellä oleva aika:</strong> Jos vanhat lainat ovat lähes maksettu, yhdistely ei tuo merkittävää säästöä — mutta voi pidentää velka-aikaa turhaan.</li>
  <li><strong>Yhdistelylainassa on suuria kuluja:</strong> Korkea avausmaksu tai muut kulut voivat syödä korkosäästöt.</li>
</ul>

<h2 id="saastojen-laskeminen">Säästöjen laskeminen</h2>
<p>Ennen yhdistelylainan hakemista, laske tarkkaan, kannattaako se. Tarvitset seuraavat tiedot:</p>

<h3>Nykyinen tilanne</h3>
<p>Listaa kaikki nykyiset lainasi ja tiedot:</p>
<ul>
  <li>Jäljellä oleva pääoma</li>
  <li>Korko (todellinen vuosikorko)</li>
  <li>Kuukausierä</li>
  <li>Jäljellä oleva laina-aika</li>
  <li>Kokonaiskustannus loppuun asti (kuukausierä × jäljellä olevat kuukaudet)</li>
</ul>

<h3>Yhdistelylainan tarjous</h3>
<p>Selvitä yhdistelylainan tiedot:</p>
<ul>
  <li>Lainasumma (= nykyisten lainojen yhteissumma)</li>
  <li>Korko (todellinen vuosikorko)</li>
  <li>Kuukausierä</li>
  <li>Laina-aika</li>
  <li>Kokonaiskustannus (kuukausierä × kuukaudet + avausmaksu)</li>
</ul>

<h3>Vertailu</h3>
<p>Vertaa kokonaiskustannuksia: <strong>Jos yhdistelylainan kokonaiskustannus on pienempi kuin nykyisten lainojen yhteenlaskettu kokonaiskustannus, yhdistely kannattaa.</strong></p>
<p>Muista huomioida myös mahdolliset ennenaikaisen takaisinmaksun kulut vanhoissa lainoissa.</p>

<h3>Käytännön laskuesimerkki</h3>
<p>Oletetaan, että sinulla on:</p>
<ul>
  <li>Laina 1: 3 000 € jäljellä, korko 14 %, 24 kk jäljellä, kuukausierä 144 €, kokonaiskustannus: 3 456 €</li>
  <li>Laina 2: 5 000 € jäljellä, korko 11 %, 36 kk jäljellä, kuukausierä 164 €, kokonaiskustannus: 5 904 €</li>
  <li><strong>Yhteensä:</strong> 8 000 €, kuukausierät 308 €, kokonaiskustannus 9 360 €</li>
</ul>
<p>Yhdistelylainan tarjous: 8 000 €, korko 7,5 %, 48 kk, kuukausierä 193 €, kokonaiskustannus 9 264 €.</p>
<p>Vertailu: Yhdistelylainalla säästät <strong>96 euroa kokonaiskustannuksissa</strong> ja kuukausierä pienenee 308 eurosta 193 euroon — eli <strong>115 € vähemmän kuukaudessa</strong>. Huomaa kuitenkin, että laina-aika pitenee — eli maksat pidempään, vaikka vähemmän kuukaudessa. Tässä esimerkissä yhdistely kannattaa, koska kokonaiskustannus laskee.</p>

<h2 id="riskit">Velkojen yhdistelyn riskit</h2>
<p>Velkojen yhdistelyyn liittyy riskejä, joista on syytä olla tietoinen:</p>

<h3>Pidemmän laina-ajan ansa</h3>
<p>Tämä on yleisin riski. Pienempi kuukausierä houkuttelee valitsemaan pitkän laina-ajan, mutta pidempi aika = enemmän korkoa. 10 000 euron laina 7 % korolla:</p>
<ul>
  <li>3 vuotta: kokonaiskustannus 11 105 € (korkoja 1 105 €)</li>
  <li>5 vuotta: kokonaiskustannus 11 881 € (korkoja 1 881 €)</li>
  <li>10 vuotta: kokonaiskustannus 13 933 € (korkoja 3 933 €)</li>
</ul>
<p><strong>Valitse lyhyin laina-aika, jonka kuukausierästä selviät.</strong></p>

<h3>Uuden velan ottaminen</h3>
<p>Kun vanhat lainat on maksettu pois yhdistelylainalla, luottokortit ja tililuotot ovat taas tyhjillään. On houkuttelevaa alkaa käyttää niitä uudelleen. Jos näin käy, päädyt tilanteeseen, jossa sinulla on yhdistelylaina <em>ja</em> uutta velkaa — eli enemmän velkaa kuin alun perin.</p>
<p><strong>Ratkaisu:</strong> Harkitse luottokorttien käyttörajojen pienentämistä tai turhien korttien sulkemista yhdistelyn yhteydessä. Jotkut asiantuntijat suosittelevat luottokorttien fyysistä tuhoamista yhdistelyn yhteydessä — tai ainakin käyttörajojen pudottamista minimiin.</p>

<h3>Piilokustannukset</h3>
<p>Yhdistelylainassa voi olla kuluja, joita et ensi silmäyksellä huomaa: korkea avausmaksu, kuukausittainen tilinhoitomaksu tai ennenaikaisen takaisinmaksun korvaus. Varmista, että vertailet <strong>todellista vuosikorkoa</strong>, joka sisältää kaikki kulut. Jos todellinen vuosikorko on korkeampi kuin vanhojen lainojesi painotettu keskiarvo, yhdistely ei kannata taloudellisesti.</p>

<h3>Vakuudelliset yhdistelylainat</h3>
<p>Jotkut lainanantajat tarjoavat vakuudellista yhdistelylainaa, jossa vakuutena on asuntosi. Tämä voi alentaa korkoa, mutta riski on vakava: <strong>jos et pysty maksamaan lainaa, voit menettää asuntosi.</strong> Vakuudettomissa kulutusluotoissa tätä riskiä ei ole.</p>

<h2 id="miten-hakea">Miten yhdistelylainaa haetaan?</h2>
<p>Yhdistelylainan hakeminen etenee pitkälti kuten minkä tahansa lainan hakeminen:</p>
<ol>
  <li><strong>Kartoita nykyiset velkasi</strong> — Listaa kaikki lainat ja niiden tiedot.</li>
  <li><strong>Vertaile yhdistelylainatarjouksia</strong> — Käytä <a href="/vertailu">vertailupalvelua</a> tai pyydä tarjouksia suoraan useilta lainanantajilta.</li>
  <li><strong>Laske, kannattaako yhdistely</strong> — Vertaa kokonaiskustannuksia (ks. edellä).</li>
  <li><strong>Hae lainaa</strong> — Täytä hakemus, ilmoita käyttötarkoitukseksi "velkojen yhdistely" ja listaa nykyiset lainasi.</li>
  <li><strong>Hyväksy tarjous ja maksa vanhat lainat</strong> — Jotkut lainanantajat maksavat vanhat lainat suoraan puolestasi, toiset siirtävät rahan tilillesi.</li>
  <li><strong>Varmista, että vanhat lainat on suljettu</strong> — Tarkista, että kaikki entiset lainat on maksettu ja tilit suljettu.</li>
</ol>

<h2 id="vaihtoehdot">Vaihtoehdot velkojen yhdistelylle</h2>
<p>Jos velkojen yhdistely ei tunnu oikealta ratkaisulta, on muitakin vaihtoehtoja:</p>

<h3>Lumivyörymetodi (avalanche)</h3>
<p>Maksa nykyisistä lainoistasi <strong>korkeimman koron lainaa ensin</strong> niin paljon kuin mahdollista, muista lainoista vähimmäiserä. Kun korkeimman koron laina on maksettu, siirry seuraavaksi kalleimpaan. Tämä minimoi kokonaiskorkokustannuksen.</p>

<h3>Lumipallometodi (snowball)</h3>
<p>Maksa <strong>pienintä lainaa ensin</strong>, muista vähimmäiserä. Kun pienin on maksettu, siirry seuraavaksi pienimpään. Tämä ei ole matemaattisesti optimaalinen, mutta <strong>psykologisesti tehokas</strong> — jokainen pois maksettu laina motivoi jatkamaan.</p>

<h3>Tasapainotusmalli</h3>
<p>Yhdistä molemmat metodit: maksa ensin pois hyvin pienet velat (alle 500 €), jotta saat nopeita voittoja ja vähennät hallinnollista taakkaa. Sen jälkeen siirry lumivyörymetodiin ja keskity korkeimpiin korkoihin. Tämä yhdistelmä tarjoaa sekä psykologisia voittoja että matemaattista tehokkuutta.</p>

<h3>Maksujärjestelyt velkojien kanssa</h3>
<p>Ota yhteyttä suoraan lainanantajiin ja kysy, voidaanko kuukausierää pienentää, laina-aikaa pidentää tai korkoa alentaa. Monet lainanantajat suostuvat väliaikaisiin järjestelyihin, koska se on heille parempi vaihtoehto kuin se, että asiakas lopettaa maksamisen kokonaan.</p>

<h3>Talous- ja velkaneuvonta</h3>
<p>Jos velkatilanne tuntuu hallitsemattomalta, ota yhteyttä kuntasi <strong>talous- ja velkaneuvontaan</strong>. Se on maksuton palvelu, jossa ammattilaiset auttavat kartoittamaan tilanteen ja löytämään ratkaisun. Lue lisää <a href="/oppaat/velan-hallinta">velan hallinnan oppaastamme</a>.</p>

<h3>Budjettimuutos yhdistelyn jälkeen</h3>
<p>Kun kuukausierä pienenee yhdistelyn myötä, sinulle jää enemmän rahaa kuussa. Tämä on erinomainen mahdollisuus — mutta myös riski. Jos käytät vapautuneen rahan kulutukseen, et hyödy yhdistelystä pitkällä aikavälillä.</p>
<p>Paras strategia on ohjata vapautunut raha suoraan hyödylliseen käyttöön:</p>
<ul>
  <li><strong>Hätärahasto:</strong> Säästä 1 000–3 000 euroa puskuriksi yllättäviä menoja varten.</li>
  <li><strong>Lisälyhennykset:</strong> Maksa yhdistelylainaa nopeammin loppuun maksamalla kuukausierän päälle lisälyhennyksiä.</li>
  <li><strong>Vakuutukset:</strong> Varmista, että sinulla on riittävät vakuutukset — ne ehkäisevät uutta velkaantumista yllättävissä tilanteissa.</li>
</ul>

<h2 id="yhteenveto">Yhteenveto</h2>
<p>Velkojen yhdistely voi olla erinomainen ratkaisu, kun se tehdään harkitusti ja oikeassa tilanteessa. Muista:</p>
<ul>
  <li>Yhdistely kannattaa, kun saat selvästi nykyistä matalamman koron.</li>
  <li>Laske aina kokonaiskustannus — älä tuijota pelkkää kuukausierää.</li>
  <li>Varo pitkää laina-aikaa — se nostaa kokonaiskustannusta.</li>
  <li>Älä ota uutta velkaa vanhojen tilalle.</li>
  <li>Harkitse vaihtoehtoja: maksustrategiat, neuvottelu velkojien kanssa, talous- ja velkaneuvonta.</li>
</ul>
<h3>Tapausesimerkki: Mikon yhdistely</h3>
<p>Mikolla oli kolme lainaa: 4 000 € kulutusluotto (korko 14 %, 36 kk jäljellä), 2 500 € luottokorttivelka (korko 19 %) ja 1 500 € pikavippivelka (korko 18 %). Yhteensä 8 000 € velkaa, kuukausierät yhteensä 340 €.</p>
<p>Mikko haki yhdistelylainaa ja sai tarjouksen: 8 000 €, todellinen vuosikorko 8,5 %, laina-aika 4 vuotta, kuukausierä 197 €. Kokonaiskorkokustannus yhdistelylainassa: 1 456 €. Vanhojen lainojen kokonaiskorkokustannus jäljellä olevalta ajalta olisi ollut noin 2 100 €.</p>
<p><strong>Mikko säästi noin 644 euroa koroissa</strong> ja hänen kuukausieränsä pieneni 340 eurosta 197 euroon. Tärkeintä: Mikko sulki kaikki vanhat luottotilinsä yhdistelyn yhteydessä, jotta ei päässyt ottamaan uutta velkaa.</p>

<h3>Milloin yhdistely ei kannattanut?</h3>
<p>Annan esimerkki: Annalla oli kaksi lainaa, joissa kummassakin oli enää 6 kuukautta jäljellä. Yhdistelylainan avausmaksu oli 99 € ja korko 7,5 %. Koska vanhat lainat olisivat olleet maksettu puolessa vuodessa joka tapauksessa, yhdistely olisi vain lisännyt kustannuksia avausmaksun ja pidennetyn laina-ajan kautta. Annalle paras ratkaisu oli maksaa vanhat lainat loppuun alkuperäisten ehtojen mukaan.</p>

<p>Velkojen yhdistely on työkalu — ei taikakeino. Se toimii parhaiten yhdistettynä muutokseen kulutustottumuksissa ja selkeään budjetointiin. Sulje tai pienennä vanhojen luottojen käyttörajat yhdistelyn jälkeen ja ohjaa vapautunut kuukausierä hätärahastoon tai lisälyhennyksiin. Ilman näitä muutoksia yhdistely voi johtaa entistä suurempaan velkataakkaan.</p>

<h3>Keneltä kannattaa hakea yhdistelylainaa?</h3>
<p>Yhdistelylainoja tarjoavat lähes kaikki kulutusluottoa myöntävät pankit ja rahoitusyhtiöt. Ilmoita hakemuksessa käyttötarkoitukseksi "velkojen yhdistely" — tämä on yleinen ja hyväksytty käyttötarkoitus. Jotkin lainanantajat ovat erikoistuneet nimenomaan yhdistelylainoihin ja tarjoavat esimerkiksi palvelua, jossa he hoitavat vanhojen lainojen maksamisen puolestasi. Tämä on kätevä lisäpalvelu, joka varmistaa, että vanhat velat todella tulevat maksettua.</p>
<p>Jos sinulla on maksuhäiriömerkintä, yhdistelylainan saaminen tavallisista pankeista on vaikeaa. Tällöin vaihtoehtoina ovat Takuusäätiön takaama järjestelylaina (ks. <a href="/oppaat/velan-hallinta">velan hallinnan opas</a>) tai talous- ja velkaneuvonnan kautta järjestettävä ratkaisu.</p>

<p>Harkitsetko velkojen yhdistelyä? <a href="/vertailu">Vertaa yhdistelylainoja</a> ja katso, paljonko voisit säästää.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Asuntolaina ensiostajalle
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'asuntolaina-ensiostajalle',
    title: 'Asuntolaina ensiasunnon ostajalle — Kattava opas',
    description:
      'Kaikki mitä ensiasunnon ostajan täytyy tietää: ASP-järjestelmä, omarahoitus, stressitesti, korkotyypit, verot ja parhaat vinkit.',
    category: 'Asuntolainat',
    readTime: 14,
    tableOfContents: [
      { id: 'ensiasunnon-ostaminen', title: 'Ensiasunnon ostaminen Suomessa', level: 2 },
      { id: 'asp-jarjestelma', title: 'ASP-järjestelmä', level: 2 },
      { id: 'paljonko-voit-lainata', title: 'Paljonko voit lainata?', level: 2 },
      { id: 'mita-pankki-katsoo', title: 'Mitä pankki katsoo?', level: 2 },
      { id: 'omarahoitus', title: 'Omarahoitus ja vakuudet', level: 2 },
      { id: 'korkotyypit', title: 'Kiinteä vai vaihtuva korko?', level: 2 },
      { id: 'asuntolainatyypit', title: 'Asuntolainatyypit', level: 2 },
      { id: 'lisaakustannukset', title: 'Asunnonoston lisäkustannukset', level: 2 },
      { id: 'vakuutukset', title: 'Vakuutukset', level: 2 },
      { id: 'vinkit-ensiostajalle', title: 'Vinkit ensiasunnon ostajalle', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    relatedGuides: ['lainaamisen-perusteet', 'lainan-kilpailutus', 'todellinen-vuosikorko'],
    content: `
<h2 id="ensiasunnon-ostaminen">Ensiasunnon ostaminen Suomessa</h2>
<p>Ensiasunnon ostaminen on monille elämän suurin yksittäinen taloudellinen päätös. Hyvä uutinen: Suomessa ensiasunnon ostajia tuetaan monin tavoin, ja huolellisella valmistautumisella prosessi sujuu hyvin.</p>
<p>Tämä opas kattaa kaiken, mitä sinun tulee tietää ensiasunnon lainaamisesta — ASP-järjestelmästä verotukseen ja korkovaihtoehtoihin.</p>

<h2 id="asp-jarjestelma">ASP-järjestelmä</h2>
<p>ASP (asuntosäästöpalkkiojärjestelmä) on valtion tukema järjestelmä, joka kannustaa ensiasunnon ostajia säästämään. Se on yksi parhaista eduista, joita ensiasunnon ostaja voi hyödyntää.</p>

<h3>ASP-tilin avaaminen</h3>
<ul>
  <li><strong>Ikäraja:</strong> ASP-tilin voi avata 15–44-vuotias henkilö, joka ei ole aiemmin omistanut asuntoa.</li>
  <li><strong>Säästötavoite:</strong> Tilille on talletettava vähintään 10 % ostettavan asunnon hinnasta vähintään 8 vuosineljänneksen aikana (eli vähintään 2 vuoden säästäminen).</li>
  <li><strong>Vähimmäistalletus:</strong> Joka vuosineljänneksellä tilille on talletettava vähintään 150 € ja enintään 4 500 €.</li>
</ul>

<h3>ASP-tilin edut</h3>
<ul>
  <li><strong>Lisäkorko säästöille:</strong> ASP-tilin talletuksille maksetaan 1 %:n peruskorko ja lisäksi pankin kanssa sovittava lisäkorko (tyypillisesti 2–4 %), joka maksetaan, kun ASP-ehdot täyttyvät ja asunto ostetaan.</li>
  <li><strong>Verovapaa korkotuotto:</strong> ASP-tilille maksetut korot ovat tuloverosta vapaita.</li>
  <li><strong>Valtion korkotuki:</strong> Valtio maksaa korkotukea ASP-lainan korosta siltä osin, kun korko ylittää 3,8 %. Korkotukea maksetaan 70 % rajan ylittävästä osasta ja ensimmäisen 10 vuoden ajan. Jos markkinakorot pysyvät alle 3,8 %:n, tukea ei makseta.</li>
  <li><strong>Maksuton valtiontakaus:</strong> Valtio takaa ASP-lainasta enintään 25 %, kuitenkin enintään 60 000 euroa per asunto. Takaus vähentää tarvetta lisävakuuksille.</li>
</ul>

<h3>Kenelle ASP sopii?</h3>
<p>ASP on erinomainen vaihtoehto, jos olet alle 45-vuotias, et omista vielä asuntoa ja sinulla on aikaa säästää vähintään 2 vuotta. Jos asunnonosto on ajankohtainen nopeammin, ASP ei ehdi käynnistyä — mutta aloita silti heti, jos täytät ehdot.</p>

<h3>ASP-tilin sudenkuopat</h3>
<ul>
  <li><strong>Aiempi asunnonomistus:</strong> Jos olet aiemmin omistanut asunnon (tai osuuden siitä) vähintään 50 %, et voi avata ASP-tiliä.</li>
  <li><strong>Korkotuen kuntakohtainen enimmäismäärä:</strong> Valtion korkotukeen oikeuttavan lainan enimmäismäärä vaihtelee kunnittain. Varsinainen asuntolaina voi olla tätä suurempi, mutta vain osa saa korkotukea.</li>
  <li><strong>Nostamatta jättäminen:</strong> Jos et lopulta ostakaan ensiasuntoa tai rikot ASP-sopimuksen, menetät lisäkoron ja muut edut. Tilin peruskorko jää silti saatavaksi.</li>
</ul>

<h2 id="paljonko-voit-lainata">Paljonko voit lainata?</h2>
<p>Asuntolainan enimmäismäärä riippuu useista tekijöistä. Pankit käyttävät ns. <strong>stressitestiä</strong> arvioidessaan maksukykyäsi.</p>

<h3>Stressitesti</h3>
<p>Finanssivalvonnan suosituksen mukaan pankki testaa, kestäisikö talous, jos korko nousee. Vakiintunut stressitestikorko on <strong>6 %</strong> ja laina-ajan oletuksena 25 vuotta, vaikka todellinen korko olisi nykyisin paljon matalampi.</p>
<p>Esimerkki: 200 000 euron asuntolaina, 25 vuoden laina-aika, stressitestikorko 6 % → kuukausierä noin 1 289 €. Pankki arvioi, riittävätkö tulosi tähän senkin jälkeen, kun muut menot ja muut lainat on huomioitu.</p>

<h3>Lainanhoitorasitus</h3>
<p>Finanssivalvonta suosittelee, että asuntolainanhakijan <strong>lainanhoitomenot eivät stressitestissä ylitä 60 % nettotuloista</strong>. Pankit arvioivat kokonaistilannetta tapauskohtaisesti — ohje on suositus, ei absoluuttinen raja.</p>

<h3>Lainakatto</h3>
<p>Finanssivalvonnan antama lainakatto rajoittaa asuntolainan enimmäismäärää suhteessa vakuuksien käypään arvoon:</p>
<ul>
  <li><strong>Ensiasunnon ostajat:</strong> laina saa olla enintään 95 % vakuuksien arvosta</li>
  <li><strong>Muut ostajat:</strong> laina saa olla enintään 90 % vakuuksien arvosta</li>
</ul>
<p>Ensiasunnon ostajana sinun on siis katettava vähintään 5 % asunnon hinnasta omilla säästöillä tai muulla vakuudella (esim. valtiontakaus, pankkitakaus). Käytännössä useimmat pankit toivovat suurempaa omaa rahoitusta.</p>

<h2 id="mita-pankki-katsoo">Mitä pankki katsoo?</h2>
<p>Asuntolainaa hakiessasi pankki arvioi kokonaistilannettasi. Tärkeimmät tekijät:</p>
<ul>
  <li><strong>Tulot:</strong> Säännölliset bruttotulot ovat perusta. Palkkatulot, yrittäjätulot, eläkkeet ja muut säännölliset tulot.</li>
  <li><strong>Menot:</strong> Kiinteät menot, kuten nykyiset lainat, elatusvelvollisuudet ja muut säännölliset menot.</li>
  <li><strong>Varallisuus:</strong> Säästöt, sijoitukset, muu omaisuus.</li>
  <li><strong>Maksuhistoria:</strong> Luottotiedot ja positiivinen luottorekisteri. Maksuhäiriömerkintä tekee asuntolainan saamisesta erittäin vaikeaa.</li>
  <li><strong>Työsuhde:</strong> Vakituinen työsuhde on ihannetilanne. Määräaikainen tai koeajalla oleva työsuhde voi vaikeuttaa lainan saamista.</li>
  <li><strong>Ikä ja elämäntilanne:</strong> Pankki arvioi, miten pitkään voit maksaa lainaa ennen eläkeikää.</li>
</ul>

<h2 id="omarahoitus">Omarahoitus ja vakuudet</h2>
<p>Asuntolainaan tarvitaan aina omaa rahoitusta. Tässä vaihtoehdot:</p>

<h3>Omat säästöt</h3>
<p>Perinteisin tapa. ASP-tilin säästöt ovat ihannetilanne. Myös muut säästöt käyvät — tilisäästöt, rahastot, osakkeet.</p>

<h3>Valtiontakaus (ASP)</h3>
<p>ASP-lainoissa valtio takaa 25 % lainasta ilmaiseksi. Tämä vähentää lisävakuuksien tarvetta.</p>

<h3>Pankkitakaus</h3>
<p>Jos omaa rahoitusta ei ole tarpeeksi, pankki voi myöntää <strong>pankkitakauksen</strong> omarahoituksen puuttuvalle osalle. Pankkitakauksesta peritään takausmaksu, tyypillisesti noin 2–3 % vuodessa takausmäärästä.</p>

<h3>Muu vakuus</h3>
<p>Ostettava asunto toimii aina ensisijaisena vakuutena. Jos laina-aste ylittää tietyn rajan, pankki voi vaatia lisävakuuksia: vanhempien asuntoa, sijoituksia tai muuta omaisuutta.</p>

<h2 id="korkotyypit">Kiinteä vai vaihtuva korko?</h2>
<p>Asuntolainassa yksi tärkeimmistä valinnoista on korkotyyppi. Molemmissa on etunsa ja riskinsä.</p>

<h3>Vaihtuva korko (euribor-sidonnainen)</h3>
<p>Yleisin vaihtoehto Suomessa. Korko koostuu viitekorosta (yleensä 12 kuukauden euribor) ja pankin marginaalista (esim. 0,5–1,5 %). Korko tarkistetaan tyypillisesti 12 kuukauden välein.</p>
<p><strong>Edut:</strong> Historiallisesti usein edullisempi kuin kiinteä korko pitkällä aikavälillä. Hyödyt matalista koroista.</p>
<p><strong>Riskit:</strong> Jos korot nousevat, kuukausieräsi nousee. Voi olla vaikea budjetoida pitkälle eteenpäin.</p>

<h3>Kiinteä korko</h3>
<p>Korko pysyy samana sovitun ajan — tyypillisesti 3, 5, 10 tai jopa 15–25 vuotta. Kiinteä korko on yleensä korkeampi kuin vaihtuva korko lainan ottohetkellä.</p>
<p><strong>Edut:</strong> Täysi ennustettavuus. Tiedät tarkalleen, paljonko maksat joka kuukausi. Suojaa korkojen nousulta.</p>
<p><strong>Riskit:</strong> Jos korot laskevat, maksat enemmän kuin vaihtuvalla korolla. Kiinteäkorkoisen lainan ennenaikainen takaisinmaksu voi olla kalliimpaa.</p>

<h3>Yhdistelmä</h3>
<p>Monet pankit tarjoavat mahdollisuuden jakaa laina osiin: esimerkiksi puolet vaihtuvalla ja puolet kiinteällä korolla. Tämä hajauttaa riskiä.</p>

<h3>Korkosuojaus</h3>
<p>Vaihtuvakorkoiseen lainaan voi ostaa <strong>korkosuojauksen</strong> (korkokatto tai korkoputki). Korkokatossa sovitaan enimmäiskorko, jota laina ei ylitä — vaikka markkinakorot nousisivat rajusti. Korkoputkessa sovitaan sekä ylä- että alaraja. Korkosuojauksen hinta vaihtelee, mutta se voi tuoda mielenrauhaa erityisesti suuren asuntolainan ottajalle.</p>
<p>Esimerkki: 200 000 euron lainassa korkosuojaus, joka rajaa koron enintään 4 %:iin, voi maksaa muutamasta sadasta eurosta muutamaan tuhanteen euroon vuodessa. Jos euribor nousee yli 4 %:n, suojaus säästää merkittävästi.</p>

<h2 id="asuntolainatyypit">Asuntolainatyypit</h2>
<p>Asuntolainan takaisinmaksutapa vaikuttaa kuukausierään ja kokonaiskustannukseen:</p>
<ul>
  <li><strong>Annuiteettilaina:</strong> Kuukausierä pysyy samana (kun korko ei muutu). Yleisin valinta.</li>
  <li><strong>Tasalyhennyslaina:</strong> Lyhennys on vakio, korko pienenee ajan myötä → kuukausierä pienenee. Kokonaiskorkokustannus on pienempi, mutta alun erät ovat suurempia.</li>
  <li><strong>Kiinteä tasaerä:</strong> Kuukausierä on aina sama. Jos korko nousee, laina-aika pitenee (koska suurempi osa erästä menee korkoon). Jos korko laskee, laina-aika lyhenee.</li>
</ul>

<h2 id="lisaakustannukset">Asunnonoston lisäkustannukset</h2>
<p>Asunnon hinta on vain osa kokonaiskustannusta. Muista budjetoida myös nämä:</p>

<h3>Varainsiirtovero</h3>
<p><strong>Ensiasunnon ostajan varainsiirtoverovapaus poistui 1.1.2024.</strong> Vapautus koski vain ennen vuoden 2024 alkua tehtyjä kauppoja. Vuoden 2024 alusta alkaen varainsiirtoveroa maksavat kaikki ostajat, myös ensiasunnon ostajat. Samassa uudistuksessa verokantoja myös laskettiin:</p>
<ul>
  <li><strong>Asunto-osakkeet (taloyhtiöosakkeet):</strong> 1,5 % kauppahinnasta</li>
  <li><strong>Kiinteistöt (esim. omakotitalo, kiinteistöyhtiö):</strong> 3 % kauppahinnasta</li>
</ul>
<p>200 000 euron asunto-osakkeen varainsiirtovero on siis 3 000 €. Summa kannattaa sisällyttää asunnonoston kokonaisbudjettiin.</p>

<h3>Muut kustannukset</h3>
<ul>
  <li><strong>Lainan järjestelypalkkio:</strong> Pankki voi periä lainan avaamisesta 0–600 €.</li>
  <li><strong>Isännöitsijäntodistus:</strong> 50–100 € (ostajan kustannus asunto-osakkeessa).</li>
  <li><strong>Kuntotarkastus:</strong> 300–800 € (suositeltavaa erityisesti omakotitaloissa).</li>
  <li><strong>Muuttokustannukset:</strong> Muuttoyritys, uudet huonekalut jne.</li>
  <li><strong>Lainaturvavakuutus:</strong> Valinnainen mutta suositeltavaa (ks. alla).</li>
  <li><strong>Remonttivaraus:</strong> Erityisesti vanhemmissa asunnoissa kannattaa varata 5 000–15 000 € mahdollisiin remonttitarpeisiin.</li>
</ul>

<h3>Kokonaiskustannuksen esimerkki</h3>
<p>Esimerkki 200 000 euron asunto-osakkeen ostosta ensiasunnon ostajana:</p>
<ul>
  <li>Asunnon hinta: 200 000 €</li>
  <li>Omarahoitus (10 %): 20 000 €</li>
  <li>Laina: 180 000 €</li>
  <li>Varainsiirtovero (1,5 % asunto-osakkeesta): 3 000 €</li>
  <li>Lainan järjestelypalkkio: 400 €</li>
  <li>Isännöitsijäntodistus: 80 €</li>
  <li>Laskennallinen korkokustannus 25 vuoden annuiteetissa 3,5 % korolla: noin 89 000 €</li>
  <li><strong>Kokonaiskustannus:</strong> noin 292 500 €</li>
</ul>
<p>Korkokustannus on merkittävä osa kokonaishintaa — siksi asuntolainan kilpailutus on erityisen tärkeää.</p>

<h2 id="vakuutukset">Vakuutukset</h2>
<p>Asuntolainan yhteydessä on syytä harkita ainakin seuraavia vakuutuksia:</p>

<h3>Lainaturvavakuutus</h3>
<p>Kattaa lainanlyhennykset, jos joudut työkyvyttömäksi, jäät työttömäksi tai kuolet. Erityisen tärkeä, jos olet ainoa lainanmaksaja. Hinta vaihtelee 0,02–0,10 % lainasummasta kuukaudessa.</p>

<h3>Kotivakuutus</h3>
<p>Pakollinen käytännössä kaikissa asuntoyhtiöissä. Kattaa irtaimiston ja asunnon pintamateriaalit. Hinta noin 15–40 €/kk.</p>

<h3>Henkivakuutus</h3>
<p>Jos sinulla on puoliso tai perhe, henkivakuutus varmistaa, ettei lainanmaksuvastuu jää kokonaan heidän harteilleen. Edullinen lisäturva erityisesti suurissa asuntolainoissa.</p>

<h3>Vakuutusten kilpailutus</h3>
<p>Pankki tarjoaa usein omia vakuutustuotteitaan asuntolainan yhteydessä. Muista, ettei sinulla ole velvollisuutta ostaa vakuutuksia samasta pankista — kilpailuta myös vakuutukset. Eri vakuutusyhtiöiden hinnat ja kattavuudet voivat vaihdella merkittävästi. Lainaturvavakuutuksen hinta vaihtelee tarjoajittain jopa 50 %, joten vertailu kannattaa.</p>

<h2 id="vinkit-ensiostajalle">Vinkit ensiasunnon ostajalle</h2>
<p>Kokeneilta asunnon ostajilta ja rahoitusasiantuntijoilta koottuja vinkkejä:</p>
<ol>
  <li><strong>Aloita ASP-säästäminen heti</strong> — Vaikka asunnonosto tuntuisi kaukaiselta, aloita ASP-säästäminen niin pian kuin mahdollista. Aika on puolellasi.</li>
  <li><strong>Kilpailuta laina aina</strong> — Pyydä tarjouksia vähintään 3 pankista. Jo 0,2 prosenttiyksikön ero marginaalissa säästää tuhansia euroja 25 vuoden lainassa.</li>
  <li><strong>Varaudu korkonnousuun</strong> — Testaa, selviytyisitkö kuukausierästä, jos korko nousee 2–3 prosenttiyksikköä. Älä ota lainaa ihan maksimia.</li>
  <li><strong>Huomioi kokonaiskustannukset</strong> — Asunnon hinta + vastike + sähkö + vesi + vakuutukset + mahdolliset remonttikulut. Varaudu myös yllättäviin menoihin.</li>
  <li><strong>Tutki taloyhtiön talous</strong> — Isännöitsijäntodistus ja tilinpäätös kertovat taloyhtiön kunnosta. Suuri lainaosuus tai tulossa olevat putkiremontit voivat nostaa vastiketta merkittävästi.</li>
  <li><strong>Säilytä puskuri</strong> — Älä laita kaikkia säästöjä asunnon käsirahaan. Pidä vähintään 2–3 kuukauden menojen verran puskurirahastossa.</li>
  <li><strong>Hyödynnä ensiostajan edut</strong> — Varainsiirtoverovapaus ja ASP-järjestelmän edut ovat merkittäviä — käytä ne hyväksesi.</li>
  <li><strong>Älä kiirehdi</strong> — Asunnonosto on iso päätös. Käy useissa kohteissa, vertaile hintoja ja tee tarjous vasta, kun olet varma.</li>
</ol>

<h2 id="yhteenveto">Yhteenveto</h2>
<p>Ensiasunnon ostaminen on suuri päätös, mutta hyvällä valmistautumisella se on myös palkitseva. Tärkeimmät muistettavat asiat:</p>
<ul>
  <li>Hyödynnä ASP-järjestelmä, jos olet ehtoihin sopiva — lisäkorko, valtiontakaus ja korkotuki ovat merkittäviä etuja.</li>
  <li>Kilpailuta laina aina useilta pankeilta.</li>
  <li>Varaudu koron nousuun — älä lainaa maksimia.</li>
  <li>Muista budjetoida varainsiirtovero (1,5 % asunto-osakkeesta, 3 % kiinteistöstä). Ensiasunnon verovapaus poistui 1.1.2024.</li>
  <li>Tutki taloyhtiön talous huolellisesti (tulossa olevat remontit, vastike, taloyhtiölainan osuus).</li>
  <li>Pidä säästöpuskuri myös asunnonoston jälkeen.</li>
</ul>
<h3>Asunnon valinta ja lainan suhde</h3>
<p>Muista, että asuntolainan suuruus riippuu asunnon hinnasta — ja asunnon hinta riippuu valinnastasi. Ensiasunnon ostajana kannattaa miettiä realistisesti, millaisen asunnon todella tarvitset tässä elämänvaiheessa. Monille kompakti kaksio tai pieni kolmio hyvällä sijainnilla on järkevämpi valinta kuin suuri asunto, joka venyttää lainan äärirajoille.</p>
<p>Hyvä nyrkkisääntö: <strong>osta asunto, jonka pystyisit maksamaan myös silloin, kun korko on 6 %.</strong> Jos kuukausierä tuntuu silloin liian suurelta, harkitse edullisempaa asuntoa. Asunnonosto on maraton, ei sprintti — taloudellinen liikkumavara on arvokkaampaa kuin ylimääräiset neliöt.</p>

<h3>Ensiasunnon ostajan muistilista</h3>
<ol>
  <li>Avaa ASP-tili, jos et ole vielä avannut</li>
  <li>Säästä omarahoitusosuus (vähintään 5–15 %)</li>
  <li>Pyydä lainanlupaus omasta pankistasi ennen asunnonetsintää</li>
  <li>Kilpailuta laina vähintään 3 pankissa</li>
  <li>Tutustu taloyhtiön talouteen ja tuleviin remontteihin</li>
  <li>Teetä kuntotarkastus (erityisesti omakotitaloissa)</li>
  <li>Budjetoi varainsiirtovero (1,5 % asunto-osakkeesta, 3 % kiinteistöstä)</li>
  <li>Harkitse lainaturvavakuutusta</li>
  <li>Pidä säästöpuskuri myös oston jälkeen</li>
</ol>

<p>Asunnon ostaminen on suuri päätös, mutta se on myös yksi parhaista investoinneista, jonka voit tehdä pitkällä aikavälillä. Historiallisesti asuntojen hinnat ovat Suomessa nousseet pitkällä aikavälillä, ja asuntolainan lyhennys on tavallaan "pakotettua säästämistä" — joka kuukausi osa erästa kasvattaa varallisuuttasi. Tärkeintä on ostaa asunto, jonka pystyt maksamaan myös taloudellisesti vaikeampina aikoina.</p>

<p>Oletko valmis ostamaan ensimmäisen asuntosi? <a href="/vertailu">Vertaa asuntolainoja</a> ja löydä edullisin vaihtoehto.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Kuluttajan oikeudet
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'kuluttajan-oikeudet',
    title: 'Kuluttajan oikeudet laina-asioissa',
    description:
      'Tunne oikeutesi lainanottajana: peruutusoikeus, korkokatto, hyvä luotonantotapa, valitusoikeudet ja velkojen perintäsäännöt.',
    category: 'Oikeudet',
    readTime: 12,
    tableOfContents: [
      { id: 'lainsaadanto', title: 'Kuluttajaluottojen lainsäädäntö', level: 2 },
      { id: 'peruutusoikeus', title: '14 päivän peruutusoikeus', level: 2 },
      { id: 'ennenaikainen-takaisinmaksu', title: 'Oikeus ennenaikaiseen takaisinmaksuun', level: 2 },
      { id: 'korkokatto', title: 'Korkokatto 20 %', level: 2 },
      { id: 'hyva-luotonantotapa', title: 'Hyvä luotonantotapa', level: 2 },
      { id: 'valitukset', title: 'Valitusoikeudet ja oikeusturvakeinot', level: 2 },
      { id: 'perinta', title: 'Perintä ja ulosotto', level: 2 },
      { id: 'talous-ja-velkaneuvonta', title: 'Talous- ja velkaneuvonta', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    relatedGuides: ['velan-hallinta', 'lainaamisen-perusteet', 'luottotiedot-suomessa'],
    content: `
<h2 id="lainsaadanto">Kuluttajaluottojen lainsäädäntö</h2>
<p>Suomessa kuluttajaluottoja säätelee ensisijaisesti <strong>kuluttajansuojalain 7. luku</strong>, joka perustuu EU:n kuluttajaluottodirektiiviin. Laki suojaa lainanottajaa monin tavoin ja asettaa lainanantajille tiukkoja velvoitteita.</p>
<p>Lisäksi lainamarkkinoita valvovat:</p>
<ul>
  <li><strong>Finanssivalvonta (Fiva)</strong> — valvoo pankkeja ja muita luottolaitoksia</li>
  <li><strong>Etelä-Suomen aluehallintovirasto</strong> — valvoo muita kuluttajaluotonantajia (esim. pikavippiyhtiöt)</li>
  <li><strong>Kilpailu- ja kuluttajavirasto (KKV)</strong> — valvoo markkinointia ja kuluttajansuojaa</li>
</ul>
<p>Nämä viranomaiset varmistavat, että lainanantajat noudattavat lakia ja toimivat vastuullisesti.</p>

<h2 id="peruutusoikeus">14 päivän peruutusoikeus</h2>
<p>Yksi tärkeimmistä kuluttajan oikeuksista laina-asioissa on <strong>14 päivän peruutusoikeus</strong>. Se koskee kaikkia kuluttajaluottoja — kulutusluottoja, autolainoja ja muita vakuudettomia lainoja.</p>

<h3>Miten peruutus toimii?</h3>
<ul>
  <li>Sinulla on <strong>14 päivää</strong> luottosopimuksen allekirjoittamisesta aikaa peruuttaa sopimus ilman perusteluja.</li>
  <li>Peruutus tehdään kirjallisesti lainanantajalle (sähköposti, verkkopalvelu tai kirje).</li>
  <li>Peruutuksen jälkeen sinun on palautettava lainasumma <strong>30 päivän kuluessa</strong>.</li>
  <li>Sinun on maksettava korko peruutuspäivään asti, mutta <strong>ei muita kuluja</strong> (avausmaksua, käsittelypalkkiota jne.).</li>
</ul>

<h3>Milloin peruutusoikeus ei koske?</h3>
<p>Peruutusoikeus <strong>ei koske asuntolainoja</strong>. Asuntolainoissa on eri säännöt: sinulla on oikeus saada tietoa ja harkinta-aikaa, mutta varsinaista 14 päivän peruutusoikeutta ei ole.</p>

<h3>Käytännön vinkki</h3>
<p>Peruutusoikeus antaa sinulle mahdollisuuden muuttaa mielesi. Jos löydät paremman tarjouksen tai tajuat, ettet tarvitsekaan lainaa, voit peruuttaa sopimuksen ilman seuraamuksia. Tämä on arvokas turvaverkko.</p>

<h3>Peruutuksen malli</h3>
<p>Peruutusilmoituksen ei tarvitse olla monimutkainen. Riittää, että ilmoitat selkeästi: peruutan luottosopimuksen [sopimuksen numero], päivämäärä [allekirjoituspäivä]. Sähköposti riittää, mutta tallenna lähettämäsi viesti todisteeksi. Ilmoituksen jälkeen sinulle ilmoitetaan palautettava summa ja tili, jolle rahat maksetaan.</p>

<h2 id="ennenaikainen-takaisinmaksu">Oikeus ennenaikaiseen takaisinmaksuun</h2>
<p>Sinulla on aina <strong>oikeus maksaa kuluttajaluotto takaisin ennen sovittua eräpäivää</strong> — kokonaan tai osittain. Lainanantaja ei voi kieltää ennenaikaista takaisinmaksua.</p>

<h3>Korvaus ennenaikaisesta takaisinmaksusta</h3>
<p>Pääsääntöisesti takaisinmaksusta ei saa periä mitään. Korvaus on sallittu vain <strong>kiinteäkorkoisessa</strong> luotossa, ja silloinkin rajoitetusti:</p>
<ul>
  <li><strong>Enintään 1 %</strong> takaisinmaksetusta määrästä, jos laina-aikaa on jäljellä yli vuosi</li>
  <li><strong>Enintään 0,5 %</strong>, jos laina-aikaa on jäljellä enintään vuosi</li>
  <li><strong>Ei korvausta lainkaan</strong>, jos luoton korko on sidottu viitekorkoon (esim. euribor), tai jos luotto on tililuotto</li>
  <li>Korvaus ei myöskään saa ylittää korkomäärää, joka olisi kertynyt takaisinmaksun ja luottosopimuksen päättymisen väliseltä ajalta</li>
  <li>Pankilla ei ole oikeutta korvaukseen myöskään silloin, kun viimeisen 12 kuukauden aikana ennenaikaisesti maksettu määrä on enintään 10 000 euroa</li>
</ul>

<h3>Esimerkki</h3>
<p>Sinulla on kiinteäkorkoista kulutusluottoa 8 000 euroa jäljellä ja maksat sen kerralla pois kaksi vuotta ennen sovittua päättymistä. Lainanantaja voi periä enintään 80 euron korvauksen (1 % × 8 000 €). Säästö korkokustannuksissa on silti tyypillisesti moninkertainen.</p>

<h2 id="korkokatto">Kulutusluottojen korkokatto</h2>
<p>Kuluttajansuojalaki rajoittaa sekä kuluttajaluoton <strong>korkoa</strong> että muita luottokustannuksia. Sääntely suojaa kuluttajia kohtuuttoman kalliilta lainoilta.</p>

<h3>Koron enimmäismäärä</h3>
<p>Kuluttajaluoton <strong>nimelliskorko</strong> saa olla enintään Suomen Pankin puolivuosittain vahvistama viitekorko + 15 prosenttiyksikköä. Luoton korko ei kuitenkaan voi koskaan ylittää 20 prosenttia, vaikka viitekorko nousisi. Katto koskee nimelliskorkoa, ei todellista vuosikorkoa — todellinen vuosikorko voi olla tätä korkeampi, jos muut kulut kasvattavat kokonaiskustannusta.</p>

<h3>Muiden luottokustannusten katto</h3>
<p>Avausmaksu, kuukausimaksut ja muut luottokulut saavat yhteensä olla enintään <strong>0,01 % lainasummasta päivässä</strong>, kuitenkin enintään <strong>150 euroa vuodessa</strong>. Tämä rajoittaa merkittävästi mahdollisuutta kiertää korkokattoa kulurakenteella.</p>

<h3>Korkokaton historia</h3>
<ul>
  <li>2013: Korkokatto otettiin käyttöön alle 2 000 euron pienlainoille (Suomen Pankin viitekorko + 50 prosenttiyksikköä)</li>
  <li>1.9.2019: Korkokaton soveltamisalaa laajennettiin ja se sidottiin kiinteään 20 %:n nimelliskorkokattoon</li>
  <li>2020–2021: Koronapandemian aikainen väliaikainen 10 %:n korkokatto</li>
  <li>1.10.2023: Nykyinen malli — viitekorko + 15 prosenttiyksikköä, kuitenkin enintään 20 %, sekä erillinen muiden kulujen katto (enintään 0,01 % / pv, 150 € / v)</li>
</ul>

<h3>Mitä tämä tarkoittaa käytännössä?</h3>
<p>Hyvillä luottotiedoilla kulutusluoton nimelliskorko on tyypillisesti selvästi alle korkokaton. Korkokatto on lähinnä suoja äärimmäisiä hinnoittelutapauksia vastaan. Vertaile aina todellista vuosikorkoa, joka paljastaa myös kulujen vaikutuksen.</p>

<h2 id="hyva-luotonantotapa">Hyvä luotonantotapa</h2>
<p>Kuluttajansuojalaki velvoittaa lainanantajia noudattamaan <strong>hyvää luotonantotapaa</strong>. Tämä tarkoittaa käytännössä:</p>
<ul>
  <li><strong>Vastuullinen markkinointi:</strong> Lainaa ei saa markkinoida tavalla, joka vähättelee lainan ottamisen merkitystä tai riskejä. Mainosten "rahaa helposti ja nopeasti" -retoriikka on kiellettyä, jos se antaa harhaanjohtavan kuvan.</li>
  <li><strong>Luottokelpoisuuden arviointi:</strong> Lainanantajan on arvioitava hakijan kyky maksaa laina takaisin ennen luoton myöntämistä. Lainaa ei saa myöntää, jos on ilmeistä, ettei hakija selviä maksuista.</li>
  <li><strong>Tiedonantovelvollisuus:</strong> Lainanantajan on annettava sinulle ennen sopimuksen tekemistä selkeät tiedot lainan ehdoista, kuluista ja riskeistä standardoidussa muodossa (SECCI-lomake).</li>
  <li><strong>Henkilökohtaisen avun tarjoaminen:</strong> Lainanantajan on tarvittaessa selitettävä sinulle lainan ominaisuudet ja riskit ymmärrettävällä tavalla.</li>
</ul>

<h3>Mitä hyvän luotonantotavan rikkominen tarkoittaa?</h3>
<p>Jos lainanantaja rikkoo hyvää luotonantotapaa, se voi johtaa vakaviin seuraamuksiin:</p>
<ul>
  <li>Finanssivalvonta tai aluehallintovirasto voi antaa huomautuksen tai varoituksen</li>
  <li>Vakavissa tapauksissa lainanantajan toimilupa voidaan peruuttaa</li>
  <li>Kuluttaja voi vaatia korvausta, jos hyvän luotonantotavan rikkominen on aiheuttanut hänelle vahinkoa</li>
  <li>Tuomioistuin voi kohtuullistaa lainaehtoja, jos ne on myönnetty vastoin hyvää luotonantotapaa</li>
</ul>
<p>Käytännössä tämä tarkoittaa esimerkiksi sitä, että jos sinulle on myönnetty laina, vaikka oli ilmeistä, ettet selviä maksuista, voit pyytää lainaehtojen kohtuullistamista. Tämä on harvinaista mutta mahdollista.</p>

<h2 id="valitukset">Valitusoikeudet ja oikeusturvakeinot</h2>
<p>Jos koet, että lainanantaja on toiminut väärin, sinulla on useita vaihtoehtoja:</p>

<h3>1. Reklamoi ensin lainanantajalle</h3>
<p>Ota aina ensin yhteyttä suoraan lainanantajaan ja tee kirjallinen reklamaatio. Anna heille kohtuullinen aika (yleensä 2–4 viikkoa) vastata.</p>

<h3>2. Kuluttajaneuvonta</h3>
<p>KKV:n <strong>kuluttajaneuvonta</strong> auttaa kuluttajia riitojen ratkaisussa. Palvelu on maksuton. Neuvojat voivat ottaa yhteyttä yritykseen puolestasi ja ehdottaa ratkaisua. Puhelin: 029 505 3050.</p>

<h3>3. FINE — Vakuutus- ja rahoitusneuvonta</h3>
<p><strong>FINE</strong> on riippumaton organisaatio, joka antaa neuvontaa ja sovittelua pankki- ja vakuutusasioissa. FINE voi antaa ratkaisusuosituksia riitoihin lainanantajan kanssa. Palvelu on maksuton kuluttajille.</p>

<h3>4. Kuluttajariitalautakunta</h3>
<p><strong>Kuluttajariitalautakunta</strong> käsittelee kuluttajien ja yritysten välisiä riitoja ja antaa ratkaisusuosituksia. Käsittely on maksuton. Huomaa, että ratkaisusuositukset eivät ole juridisesti sitovia, mutta yritykset noudattavat niitä lähes aina.</p>

<h3>5. Käräjäoikeus</h3>
<p>Viimeisenä keinona voit viedä asian käräjäoikeuteen. Tämä on yleensä tarpeeton, koska edellä mainitut keinot ratkaisevat suurimman osan riidoista.</p>

<h2 id="perinta">Perintä ja ulosotto</h2>
<p>Jos jätät lainan maksut maksamatta, prosessi etenee tyypillisesti näin:</p>

<h3>Vapaaehtoinen perintä</h3>
<ol>
  <li><strong>Maksumuistutus:</strong> Lainanantaja lähettää maksumuistutuksen. Perintälain mukaan maksumuistutuksen saa lähettää aikaisintaan 14 päivää eräpäivän jälkeen. Muistutuksesta saa periä enintään 5 euroa.</li>
  <li><strong>Perintäkirje:</strong> Jos maksu jää edelleen maksamatta, asia siirtyy usein perintätoimistolle. Ensimmäisestä perintäkirjeestä saa periä enintään 14 euroa (alle 100 € velka) tai 50 euroa (yli 1 000 € velka).</li>
  <li><strong>Maksujärjestely:</strong> Perintätoimiston on tarjottava mahdollisuutta maksujärjestelyyn.</li>
</ol>

<h3>Oikeudellinen perintä</h3>
<p>Jos vapaaehtoinen perintä ei tuota tulosta, velkoja voi viedä asian käräjäoikeuteen. Oikeuden päätöksellä velka vahvistetaan, ja se voidaan siirtää ulosottoon. Oikeudellinen perintä aiheuttaa <strong>maksuhäiriömerkinnän</strong>.</p>

<h3>Ulosotto</h3>
<p><strong>Ulosotto</strong> on viranomaistoimintaa, jossa ulosottomies perii velan pakkokeinoin. Ulosottomies voi:</p>
<ul>
  <li>Pidättää osan palkasta tai eläkkeestä (suojaosuus jätetään aina)</li>
  <li>Ulosmitata omaisuutta (auto, sijoitukset jne.)</li>
  <li>Ulosmitata veronpalautukset</li>
</ul>
<p>Ulosotossa velalliselle jätetään aina <strong>suojaosuus</strong>, jonka suuruus tarkistetaan vuosittain. Suojaosuus kattaa velallisen ja hänen huollettaviensa välttämättömät elinkustannukset, eikä sitä saa ulosmitata. Ajantasaisen suojaosuuden euromäärän voi tarkistaa Ulosottolaitoksen sivuilta (ulosottolaitos.fi).</p>

<h3>Ulosottomiehen velvollisuudet</h3>
<p>Ulosottomies ei toimi mielivaltaisesti. Hänellä on lakisääteiset velvollisuudet:</p>
<ul>
  <li>Toimittava asiallisesti ja puolueettomasti</li>
  <li>Noudatettava suhteellisuusperiaatetta — ei saa ulosmitata enempää kuin velan kattamiseksi tarvitaan</li>
  <li>Annettava velalliselle tietoa oikeuksistaan ja mahdollisuuksistaan</li>
  <li>Suojaosuus on aina jätettävä</li>
</ul>
<p>Jos koet ulosottomiehen toimineen virheellisesti, voit tehdä valituksen käräjäoikeuteen 3 viikon kuluessa ulosottotoimesta.</p>

<h3>Velan vanhentuminen</h3>
<p>Suomessa velan yleinen vanhentumisaika on <strong>3 vuotta</strong> viimeisestä perintätoimesta tai maksusuorituksesta. Jos velkoja ei ole tänä aikana vaatinut maksua tai hakenut ulosottoa, velka vanhentuu. Oikeuden tuomiolla vahvistettu velka vanhenee kuitenkin vasta <strong>15 vuodessa</strong> (luonnolliselle henkilölle 20 vuodessa). Velan vanhentuminen on lopullista — vanhentunutta velkaa ei voi periä.</p>

<h3>Perintälain suoja</h3>
<p>Perintälaki suojaa velallista kohtuuttomilta perintätoimilta:</p>
<ul>
  <li>Perintäkuluille on lakisääteiset enimmäismäärät</li>
  <li>Perintätoimiston on annettava riittävät tiedot velasta</li>
  <li>Velallisella on oikeus kiistää velka ja pyytää tarkempia tietoja</li>
  <li>Häiritsevä tai painostava perintä on kiellettyä</li>
  <li>Perintä on keskeytettävä, jos velallinen kiistää velan olemassaolon tai määrän, kunnes asia on selvitetty</li>
</ul>

<h3>Kuinka paljon perintäkuluja saa periä?</h3>
<p>Perintälaki asettaa tarkat rajat perintäkuluille:</p>
<ul>
  <li><strong>Maksumuistutus:</strong> enintään 5 € (vain yksi maksumuistutus per velka)</li>
  <li><strong>Perintäkirje (velka alle 100 €):</strong> enintään 14 €</li>
  <li><strong>Perintäkirje (velka 100–1 000 €):</strong> enintään 24 €</li>
  <li><strong>Perintäkirje (velka yli 1 000 €):</strong> enintään 50 €</li>
  <li><strong>Maksusuunnitelma:</strong> enintään 20–50 € riippuen velan suuruudesta</li>
  <li><strong>Perintäkulujen kokonaismäärä:</strong> enintään 60–210 € riippuen velan suuruudesta</li>
</ul>
<p>Jos perintätoimisto veloittaa näitä enemmän, kyseessä on lainvastainen menettely. Voit valittaa aluehallintovirastoon.</p>

<h2 id="talous-ja-velkaneuvonta">Talous- ja velkaneuvonta</h2>
<p>Suomessa toimii <strong>maksuton talous- ja velkaneuvontapalvelu</strong>, jota ylläpitävät oikeusaputoimistot. Palvelu on tarkoitettu kaikille, joilla on taloudellisia ongelmia tai jotka tarvitsevat apua velkojen hallinnassa.</p>

<h3>Mitä velkaneuvonta tarjoaa?</h3>
<ul>
  <li>Taloudellisen tilanteen kartoitus ja analyysi</li>
  <li>Neuvonta budjetoinnissa ja taloudenhallinassa</li>
  <li>Apu maksujärjestelyjen neuvottelussa velkojien kanssa</li>
  <li>Avustaminen velkajärjestelyhakemuksen tekemisessä</li>
  <li>Tietoa eri vaihtoehdoista velkaongelmien ratkaisemiseksi</li>
</ul>

<h3>Miten hakeutua velkaneuvontaan?</h3>
<p>Soita oikeusaputoimiston talous- ja velkaneuvonnan puhelinnumeroon (0295 633 500) tai varaa aika verkossa oikeusapu.fi-palvelussa. Palvelu on täysin maksuton.</p>
<p>Lue lisää velan hallinnasta <a href="/oppaat/velan-hallinta">erillisestä oppaastamme</a>.</p>

<h2 id="yhteenveto">Yhteenveto</h2>
<p>Suomalainen lainsäädäntö suojaa lainanottajaa monin tavoin. Tärkeimmät oikeutesi:</p>
<ul>
  <li><strong>14 päivän peruutusoikeus</strong> kuluttajaluotoissa — voit peruuttaa sopimuksen ilman perusteluja.</li>
  <li><strong>Ennenaikaisen takaisinmaksun oikeus</strong> — voit aina maksaa lainan pois ennen aikojaan. Viitekorkoon sidotussa luotossa takaisinmaksu on maksuton.</li>
  <li><strong>Korkokatto:</strong> nimelliskorko enintään viitekorko + 15 prosenttiyksikköä (enintään 20 %), muut kulut enintään 0,01 % / päivä, yhteensä enintään 150 € / vuosi.</li>
  <li><strong>Hyvä luotonantotapa</strong> — lainanantajan on arvioitava maksukykyäsi ja annettava selkeät tiedot lainasta.</li>
  <li><strong>Valituskanavat</strong> — kuluttajaneuvonta, FINE ja kuluttajariitalautakunta ovat maksuttomia.</li>
  <li><strong>Talous- ja velkaneuvonta</strong> — oikeusaputoimistojen maksuton palvelu, joka auttaa velkaongelmissa.</li>
</ul>
<h3>Usein kysyttyjä kysymyksiä oikeuksista</h3>
<p><strong>Voiko lainanantaja muuttaa lainaehtoja yksipuolisesti?</strong> Lainanantaja ei voi muuttaa lainasopimuksen keskeisiä ehtoja (korkoa, kuluja, laina-aikaa) yksipuolisesti ilman sopimusperusteista oikeutta. Vaihtuvakorkoisessa lainassa viitekoron muutokset ovat kuitenkin sopimuksen mukaisia — ne eivät ole yksipuolisia muutoksia. Jos saat ilmoituksen ehtomuutoksesta, lue se huolellisesti ja ota tarvittaessa yhteyttä kuluttajaneuvontaan.</p>
<p><strong>Voiko lainasopimuksen purkaa virheen perusteella?</strong> Jos lainasopimuksessa on olennainen virhe (esim. väärä todellinen vuosikorko, puutteelliset tiedot), sopimus voidaan joissakin tapauksissa purkaa tai ehtoja kohtuullistaa. Tämä edellyttää yleensä oikeudellista prosessia.</p>
<p><strong>Mitä teen, jos perintätoimisto häiritsee?</strong> Perintätoimiston on toimittava lain puitteissa. Jos koet perinnän häiritseväksi (esim. lukuisat puhelut, uhkaileva kielenkäyttö), ota yhteyttä Etelä-Suomen aluehallintovirastoon, joka valvoo perintätoimistoja. Voit myös pyytää, että kaikki yhteydenpito tapahtuu kirjallisesti.</p>
<p><strong>Milloin pääsen eroon ulosotosta?</strong> Ulosotto päättyy, kun velka on kokonaan maksettu tai velka vanhenee. Ulosottoperusteen (tuomion) määräaika on 15 vuotta (luonnolliselle henkilölle 20 vuotta erityistapauksissa). Tämän jälkeen velkaa ei voida enää periä ulosoton kautta.</p>

<p>Suomen lainsäädäntö on eurooppalaisittainkin vahva kuluttajansuojan osalta. Hyödynnä oikeutesi — ne ovat sinua varten. 14 päivän peruutusoikeus antaa mahdollisuuden muuttaa mielesi, ennenaikaisen takaisinmaksun oikeus antaa joustavuutta, ja 20 %:n korkokatto suojaa kohtuuttomilta kustannuksilta. Jos jokin tuntuu epäreilulta, älä empii vaan ota yhteyttä kuluttajaneuvontaan — se on ilmaista ja asiantuntevaa palvelua.</p>
<p>Tunne oikeutesi — ne ovat sinua varten. Ja muista: lainaa vastuullisesti, <a href="/vertailu">vertaile aina</a> ja hae apua ajoissa, jos velkatilanne huolestuttaa.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Velan hallinta
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'velan-hallinta',
    title: 'Velan hallinta — Kun lainat painavat',
    description:
      'Myötätuntoinen ja käytännöllinen opas velkaongelmien ratkaisemiseen: budjetti, maksujärjestelyt, velkaneuvonta, velkajärjestely ja toipuminen.',
    category: 'Velanhoito',
    readTime: 13,
    tableOfContents: [
      { id: 'et-ole-yksin', title: 'Et ole yksin', level: 2 },
      { id: 'tunnista-merkit', title: 'Ylivelkaantumisen merkit', level: 2 },
      { id: 'ensimmaiset-askeleet', title: 'Ensimmäiset askeleet', level: 2 },
      { id: 'maksujärjestelyt', title: 'Maksujärjestelyt velkojien kanssa', level: 2 },
      { id: 'talous-ja-velkaneuvonta', title: 'Talous- ja velkaneuvonta', level: 2 },
      { id: 'sosiaalinen-luototus', title: 'Sosiaalinen luototus', level: 2 },
      { id: 'velkajarjestely', title: 'Velkajärjestely', level: 2 },
      { id: 'takuusaatio', title: 'Takuusäätiö', level: 2 },
      { id: 'mielenterveys-ja-velka', title: 'Mielenterveys ja velka', level: 2 },
      { id: 'toipuminen', title: 'Toipuminen on mahdollista', level: 2 },
      { id: 'yhteenveto', title: 'Yhteenveto', level: 2 },
    ],
    relatedGuides: ['velkojen-yhdistely', 'kuluttajan-oikeudet', 'lainaamisen-perusteet'],
    content: `
<h2 id="et-ole-yksin">Et ole yksin</h2>
<p>Jos velat painavat, haluamme sanoa yhden asian selvästi: <strong>et ole yksin, etkä ole epäonnistunut.</strong></p>
<p>Suomessa on arviolta yli 300 000 henkilöä, joilla on maksuhäiriömerkintä. Velkaantumisen taustalla on usein työttömyys, sairaus, ero, yrityksen konkurssi tai vain pitkään jatkunut liian tiukka talous.</p>
<p>Tilanteeseen on aina ratkaisuja. Mitä aikaisemmin toimit, sitä helpompi tilanne on korjata.</p>

<h2 id="tunnista-merkit">Ylivelkaantumisen merkit</h2>
<p>Velkaongelmat eivät synny yhdessä yössä. Tyypillisesti tilanne pahenee vähitellen. Tunnista nämä varoitusmerkit:</p>
<ul>
  <li><strong>Laskujen maksaminen myöhässä</strong> — Joudut jatkuvasti siirtämään laskujen maksua.</li>
  <li><strong>Uutta velkaa vanhan maksamiseksi</strong> — Otat uuden lainan tai pikavipin aiemman velan maksuun.</li>
  <li><strong>Vain vähimmäiserän maksaminen</strong> — Pystyt maksamaan vain lainojen vähimmäiserät, et enempää.</li>
  <li><strong>Rahat loppuvat ennen palkkaa</strong> — Kuukauden loppupuoli on aina tiukka.</li>
  <li><strong>Perintäkirjeitä</strong> — Saat maksumuistutuksia tai perintäkirjeitä.</li>
  <li><strong>Stressiä ja unettomuutta</strong> — Velat aiheuttavat jatkuvaa ahdistusta.</li>
  <li><strong>Välttelet asian käsittelyä</strong> — Et avaa kirjekuoria tai tarkista pankkitiliäsi, koska pelkäät mitä näet.</li>
</ul>
<p>Jos tunnistat itsesi yhdestäkin näistä, on aika toimia. <strong>Aikaisin puuttuminen on parasta, mitä voit tehdä.</strong></p>

<h2 id="ensimmaiset-askeleet">Ensimmäiset askeleet</h2>
<p>Velkaongelman kohtaaminen vaatii rohkeutta, mutta ensimmäiset askeleet ovat yllättävän yksinkertaisia.</p>

<h3>1. Kartoita tilanteesi</h3>
<p>Kirjoita ylös <strong>kaikki</strong> velkasi. Jokainen laina, luottokorttivelka, pikavippi, maksamatta oleva lasku. Tee taulukko:</p>
<ul>
  <li>Velkoja (kenen kanssa sopimus)</li>
  <li>Jäljellä oleva summa</li>
  <li>Korko</li>
  <li>Kuukausierä</li>
  <li>Eräpäivä</li>
</ul>
<p>Tämä voi olla pelottavaa — mutta tilanteen näkeminen kokonaisuutena on ensimmäinen askel hallintaan. <strong>Tieto on voimaa, vaikka se pelottaisi.</strong></p>

<h3>2. Tee budjetti</h3>
<p>Laske tulosi ja menosi kuukausitasolla:</p>
<ul>
  <li><strong>Tulot:</strong> Palkka, etuudet, muut tulot (nettona)</li>
  <li><strong>Välttämättömät menot:</strong> Vuokra/vastike, ruoka, sähkö, vesi, liikenne, vakuutukset, lääkkeet</li>
  <li><strong>Velanhoito:</strong> Kaikkien lainojen kuukausierät</li>
  <li><strong>Muu kulutus:</strong> Puhelinliittymä, netti, vaatteet, harrastukset</li>
</ul>
<p>Jos menot ylittävät tulot, on löydettävä ratkaisu — joko tulopuolella, menopuolella tai velkapuolella.</p>

<h3>Budjetoinnin työkaluja</h3>
<p>Budjetointi ei tarvitse olla monimutkaista. Yksinkertainen taulukko (Excel, Google Sheets) riittää. Myös monet pankit tarjoavat automaattisia budjetointityökaluja verkkopankissaan. Tärkeintä on, että näet <strong>konkreettisesti</strong>, mihin rahasi menevät. Monet yllättyvät, kuinka paljon pienet hankinnat kertyvät kuukauden aikana.</p>
<p>Hyvä nyrkkisääntö budjetointiin on 50/30/20-sääntö: 50 % tuloista välttämättömiin menoihin, 30 % haluihin (harrastukset, ravintolat, viihde) ja 20 % säästöihin ja velanmaksuun. Jos olet velkaongelmissa, velanmaksun osuutta kannattaa kasvattaa mahdollisimman suureksi.</p>

<h3>3. Ota yhteyttä velkojiin</h3>
<p>Tämä on ehkä tärkein yksittäinen neuvo: <strong>ota yhteyttä velkojiin heti, kun huomaat, ettet selviä maksuista.</strong> Älä odota perintäkirjettä.</p>
<p>Velkojat haluavat saada rahansa — mutta he haluavat myös tehdä järjestelyjä, koska se on heille parempi vaihtoehto kuin perintä tai luottotappio. Useimmat velkojat suostuvat:</p>
<ul>
  <li>Kuukausierän pienentämiseen väliaikaisesti</li>
  <li>Maksuvapaakuukausiin</li>
  <li>Laina-ajan pidentämiseen</li>
  <li>Viivästyskoron kohtuullistamiseen</li>
</ul>
<p>Muista: velkoja haluaa rahansa. Jos et maksa mitään, velkoja saa nollan euroa ja joutuu käynnistämään kalliin perintäprosessin. Jos tarjoat kohtuullisen maksujärjestelyn, velkoja saa rahansa — vaikkakin hitaammin. <strong>Siksi useimmat velkojat suostuvat järjestelyihin.</strong></p>

<h3>Mitä sanoa velkojalle?</h3>
<p>Puhelun tai viestin ei tarvitse olla monimutkainen. Riittää, kun sanot suoraan: "Minulla on tilapäisiä taloudellisia vaikeuksia enkä pysty maksamaan kuukausierää nykyisellä tasolla. Voisinko saada väliaikaisen maksujärjestelyn?" Kerro rehellisesti, paljonko pystyt maksamaan kuukaudessa. Pyydä aina kirjallinen vahvistus sovitusta järjestelystä.</p>

<h2 id="maksujärjestelyt">Maksujärjestelyt velkojien kanssa</h2>
<p>Jos et pysty maksamaan kaikkia velkoja alkuperäisten ehtojen mukaan, neuvottele velkojien kanssa <strong>maksujärjestelystä</strong>.</p>

<h3>Miten neuvotella?</h3>
<ol>
  <li>Ota yhteyttä velkojaan puhelimitse tai kirjallisesti.</li>
  <li>Kerro rehellisesti taloudellinen tilanteesi.</li>
  <li>Ehdota realistinen maksusuunnitelma, johon pystyt sitoutumaan.</li>
  <li>Pyydä vahvistus kirjallisena.</li>
  <li>Noudata sovittua suunnitelmaa.</li>
</ol>

<h3>Priorisoi velat</h3>
<p>Jos rahat eivät riitä kaikkeen, priorisoi näin:</p>
<ol>
  <li><strong>Asuminen:</strong> Vuokra tai asuntolaina — asunnon menettäminen vaikeuttaa kaikkea muuta.</li>
  <li><strong>Välttämättömät palvelut:</strong> Sähkö, vesi, lämpö.</li>
  <li><strong>Ruoka:</strong> Peruselinkustannukset.</li>
  <li><strong>Vakuudelliset velat:</strong> Auto (jos tarvitset sitä töihin), muut vakuudelliset lainat.</li>
  <li><strong>Muut velat:</strong> Kulutusluotot, luottokortit, pikavipit.</li>
</ol>

<h2 id="talous-ja-velkaneuvonta">Talous- ja velkaneuvonta</h2>
<p>Suomessa toimii <strong>maksuton talous- ja velkaneuvontapalvelu</strong>, jota ylläpitävät oikeusaputoimistot. Tämä on yksi Suomen parhaista palveluista velkaongelmissa — ja se on täysin ilmainen.</p>

<h3>Mitä palvelu tarjoaa?</h3>
<ul>
  <li>Ammattilainen kartoittaa taloudellisen tilanteesi kanssasi</li>
  <li>Saat neuvoja budjetointiin ja taloudenhoitoon</li>
  <li>Apua maksujärjestelyjen neuvotteluun velkojien kanssa</li>
  <li>Selvitetään, onko velkajärjestely mahdollinen vaihtoehto</li>
  <li>Avustetaan velkajärjestelyhakemuksen tekemisessä</li>
</ul>

<h3>Miten hakeutua?</h3>
<p>Soita talous- ja velkaneuvonnan puhelinnumeroon <strong>0295 633 500</strong> tai varaa aika verkossa <strong>oikeusapu.fi</strong>-palvelussa. Palvelu on saatavilla kaikissa Suomen oikeusaputoimistoissa.</p>
<p><strong>Älä epäröi ottaa yhteyttä.</strong> Neuvojat ovat ammattilaisia, jotka näkevät velkaongelmia päivittäin. He eivät tuomitse — he auttavat.</p>

<h3>Mitä velkaneuvonnassa tapahtuu?</h3>
<p>Ensimmäisellä käynnillä neuvojat kartoittavat taloudellisen tilanteesi kokonaisuudessaan: tulot, menot, velat, omaisuus. Tämän pohjalta he arvioivat, mikä ratkaisu sopii parhaiten sinun tilanteeseesi. Vaihtoehtoja voivat olla:</p>
<ul>
  <li>Maksujärjestelyt velkojien kanssa (neuvojat voivat auttaa neuvotteluissa)</li>
  <li>Velkojen yhdistely Takuusäätiön takauksella</li>
  <li>Sosiaalinen luototus kunnalta</li>
  <li>Yksityishenkilön velkajärjestely käräjäoikeuden kautta</li>
</ul>
<p>Neuvojat eivät tee päätöksiä puolestasi, mutta antavat kaikki tarvittavat tiedot ja auttavat käytännön järjestelyissä. Prosessi voi kestää useita tapaamiskertoja.</p>

<h2 id="sosiaalinen-luototus">Sosiaalinen luototus</h2>
<p><strong>Sosiaalinen luototus</strong> on kuntien myöntämä matalakorkoinen laina henkilöille, jotka eivät saa kohtuuhintaista luottoa markkinoilta (esim. maksuhäiriömerkinnän takia).</p>

<h3>Kenelle sosiaalinen luotto sopii?</h3>
<ul>
  <li>Henkilöille, joiden tulot ovat pienet mutta riittävät lainan takaisinmaksuun</li>
  <li>Velkojen järjestelyyn tai välttämättömiin hankintoihin</li>
  <li>Tilanteisiin, joissa markkinakorkoinen laina olisi kohtuuton</li>
</ul>

<h3>Miten hakea?</h3>
<p>Sosiaalisen luoton saa kotikunnan sosiaalipalveluista. Vuoden 2023 alusta lähtien kuntien on ollut <strong>pakollista</strong> tarjota sosiaalista luototusta, joten palvelu on saatavilla kaikkialla Suomessa. Ota yhteyttä oman kuntasi sosiaalitoimistoon.</p>

<h2 id="velkajarjestely">Velkajärjestely</h2>
<p>Jos velkatilanne on niin vakava, ettei normaalein keinoin selviä, viimeinen vaihtoehto on <strong>yksityishenkilön velkajärjestely</strong>. Se on tuomioistuimen määräämä velkojen uudelleenjärjestely, jossa osa veloista voidaan leikata pois.</p>

<h3>Velkajärjestelyn edellytykset</h3>
<ul>
  <li><strong>Pysyvä maksukyvyttömyys:</strong> Et pysty kohtuullisessa ajassa maksamaan velkojasi kokonaan.</li>
  <li><strong>Maksukyvyttömyys ei ole itseaiheutettua:</strong> Esimerkiksi uhkapelaaminen, rikollinen toiminta tai ilmeisen vastuuton velkaantuminen voi estää järjestelyn.</li>
  <li><strong>Olet yrittänyt neuvotella:</strong> Olet koettanut sopia maksujärjestelyistä velkojien kanssa ennen hakemusta.</li>
</ul>

<h3>Miten velkajärjestely etenee?</h3>
<ol>
  <li><strong>Talous- ja velkaneuvontaan yhteydessä:</strong> Neuvojat arvioivat, täytätkö edellytykset, ja auttavat hakemuksen tekemisessä.</li>
  <li><strong>Hakemus käräjäoikeuteen:</strong> Velkaneuvoja auttaa laatimaan hakemuksen.</li>
  <li><strong>Käräjäoikeuden päätös:</strong> Oikeus päättää, aloitetaanko velkajärjestely.</li>
  <li><strong>Maksuohjelma:</strong> Selvittäjä laatii maksuohjelman, joka kestää tyypillisesti 3–5 vuotta.</li>
  <li><strong>Maksuohjelman noudattaminen:</strong> Maksat ohjelman mukaiset erät. Maksuohjelman päätyttyä loput velat annetaan anteeksi.</li>
</ol>

<h3>Tärkeää tietää velkajärjestelystä</h3>
<p>Velkajärjestely on vakava toimenpide, jolla on merkittäviä seurauksia:</p>
<ul>
  <li>Maksuohjelman aikana elät hyvin tiukalla budjetilla — käytännössä kaikki tulot menevät välttämättömiin menoihin ja velkojen maksuun</li>
  <li>Omaisuutta saatetaan joutua myymään</li>
  <li>Merkintä luottotiedoissa maksuohjelman loppuun asti</li>
  <li><strong>Mutta:</strong> maksuohjelman päätyttyä saat puhtaan alun — velat on annettu anteeksi</li>
</ul>

<h2 id="takuusaatio">Takuusäätiö</h2>
<p><strong>Takuusäätiö</strong> on yleishyödyllinen säätiö, joka auttaa ylivelkaantuneita henkilöitä. Se tarjoaa kahta pääpalvelua:</p>

<h3>Takuusäätiön takaama järjestelylaina</h3>
<p>Takuusäätiö voi myöntää takauksen pankkilainalle, jolla yhdistetään olemassa olevia velkoja. Tämä on vaihtoehto henkilöille, jotka eivät saa yhdistelylainaa markkinoilta (esim. maksuhäiriömerkinnän vuoksi).</p>
<ul>
  <li>Edellytyksenä on, että pystyt maksamaan järjestelylainan kuukausierät</li>
  <li>Lainan korko on markkinahintainen, mutta takauksen ansiosta se on mahdollista saada</li>
</ul>

<h3>Pienlaina</h3>
<p>Takuusäätiö voi myöntää pienlainan (enintään 2 000 €) välttämättömiin tarpeisiin henkilöille, jotka eivät saa luottoa muualta.</p>

<h3>Miten hakea?</h3>
<p>Takuusäätiön palveluihin hakeudutaan <strong>talous- ja velkaneuvonnan kautta</strong>. Neuvoja arvioi, onko Takuusäätiön takaus tai pienlaina sopiva ratkaisu tilanteessasi.</p>

<h2 id="mielenterveys-ja-velka">Mielenterveys ja velka</h2>
<p>Velkaongelmat ja mielenterveys kulkevat usein käsi kädessä. Jatkuva huoli rahasta voi aiheuttaa:</p>
<ul>
  <li>Ahdistusta ja paniikkikohtauksia</li>
  <li>Unettomuutta</li>
  <li>Masennusta</li>
  <li>Häpeää ja eristäytymistä</li>
  <li>Parisuhdeongelmia</li>
</ul>
<p>Nämä ovat <strong>normaaleja reaktioita epänormaaliin tilanteeseen</strong>. Velkaongelma on taloudellinen haaste, ei merkki siitä, että olisit jotenkin huono ihminen.</p>

<h3>Velka ja ihmissuhteet</h3>
<p>Velkaongelmat vaikuttavat usein myös läheisiin. Häpeä ja salaaminen voivat etäännyttää kumppanista, perheestä ja ystävistä. Moni velkavaikeuksissa oleva salailee tilanteen vuosia. Tutkimukset osoittavat kuitenkin, että avoimuus — ainakin lähimmille — helpottaa tilannetta merkittävästi. Kumppanin kanssa yhdessä tehty maksusuunnitelma on tehokkaampi kuin yksin kannettu taakka.</p>
<p>Jos velat aiheuttavat ristiriitoja parisuhteessa, parisuhdeterapia tai perheneuvonta voi auttaa. Monet kunnat tarjoavat maksutonta perheneuvontaa.</p>

<h3>Mistä apua?</h3>
<ul>
  <li><strong>Terveyskeskus:</strong> Ota yhteyttä omaan terveyskeskukseesi ja kerro tilanteestasi. Velkastressin aiheuttamiin oireisiin saa apua.</li>
  <li><strong>Seurakunnat:</strong> Monet seurakunnat tarjoavat diakoniatyötä ja keskusteluapua — uskonnosta riippumatta.</li>
  <li><strong>Talous- ja velkaneuvonta:</strong> Kuntien ilmainen talous- ja velkaneuvonta auttaa velkojen järjestelyssä ja maksusuunnitelman laatimisessa.</li>
  <li><strong>Takuusäätiö:</strong> Tarjoaa neuvontaa, takausta ja sosiaalista luototusta velkaongelmissa.</li>
</ul>
<p><strong>Avun hakeminen on vahvuutta, ei heikkoutta.</strong></p>

<h2 id="toipuminen">Toipuminen on mahdollista</h2>
<p>Tämä on ehkä tämän oppaan tärkein viesti: <strong>velkaongelmista voi toipua.</strong> Tuhannet suomalaiset ovat selvinneet vakavista velkaongelmista ja rakentaneet taloutensa uudelleen.</p>

<h3>Toipumisen askeleet</h3>
<ol>
  <li><strong>Tunnista tilanne</strong> — Myönnä, että ongelma on olemassa. Tämä on jo valtava askel.</li>
  <li><strong>Hae apua</strong> — Talous- ja velkaneuvonta, Takuusäätiö, sosiaalinen luototus. Apua on tarjolla.</li>
  <li><strong>Tee suunnitelma</strong> — Yhdessä ammattilaisen kanssa laadittu maksusuunnitelma antaa selkeän polun eteenpäin.</li>
  <li><strong>Noudata suunnitelmaa</strong> — Yksi kuukausi kerrallaan. Jokainen maksettu erä on edistystä.</li>
  <li><strong>Rakenna uusia tapoja</strong> — Opi budjetoimaan, säästämään pienen puskurin, tekemään tietoisia taloudellisia valintoja.</li>
  <li><strong>Ole armollinen itsellesi</strong> — Toipuminen ei ole suoraviivaista. Takaiskuja tulee. Se on normaalia. Tärkeintä on jatkaa eteenpäin.</li>
</ol>

<h3>Muista nämä</h3>
<p>Maksuhäiriömerkintä ei ole pysyvä — vuoden 2022 lakimuutoksen jälkeen merkintä poistuu pääsääntöisesti kuukauden kuluessa siitä, kun velka on maksettu. Velkajärjestelyn maksuohjelma päättyy. Velat eivät kestä ikuisesti.</p>
<p>Eräs velkaneuvonnan asiakas kuvasi tilannettaan näin: "Kun vihdoin soitin velkaneuvontaan, tunsin valtavaa helpotusta. En ollut enää yksin asian kanssa. Neuvojan kanssa tehtiin suunnitelma, ja ensimmäistä kertaa vuosiin tunsin, että asiat ovat hallinnassa."</p>

<h3>Käytännön vinkkejä toipumiseen</h3>
<ul>
  <li><strong>Automaattimaksut:</strong> Aseta kaikkien lainojen kuukausierät automaattimaksulle heti palkkapäivänä. Näin vältät myöhästymiset ja säästät henkistä energiaa.</li>
  <li><strong>Pieni hätävara:</strong> Kun velat alkavat pienentyä, aloita pienen hätävaran kerääminen — vaikkapa 500 euroa. Tämä estää uuden velkaantumisen, kun yllättäviä menoja tulee.</li>
  <li><strong>Juhli edistystä:</strong> Jokainen pois maksettu velka on saavutus. Huomioi edistys — se pitää motivaatiota yllä.</li>
  <li><strong>Vältä houkutuksia:</strong> Jos luottokortit olivat ongelman lähde, harkitse niiden käyttörajojen pudottamista tai korttien sulkemista.</li>
  <li><strong>Puhu asiasta:</strong> Velkaongelma ei ole häpeä. Monet ovat olleet samassa tilanteessa ja selvinneet. Vertaistuki — oli se sitten läheisiltä tai vertaisryhmästä — on arvokasta.</li>
</ul>

<h2 id="yhteenveto">Yhteenveto</h2>
<p>Jos velat painavat, toimi nyt — älä odota. Tässä tärkeimmät askeleet:</p>
<ol>
  <li><strong>Kartoita tilanteesi</strong> — Listaa kaikki velat ja tee budjetti.</li>
  <li><strong>Ota yhteyttä velkojiin</strong> — Pyydä maksujärjestelyjä ennen kuin tilanne pahenee.</li>
  <li><strong>Soita talous- ja velkaneuvontaan</strong> — 0295 633 500. Palvelu on maksuton ja luottamuksellinen.</li>
  <li><strong>Selvitä vaihtoehdot:</strong> Sosiaalinen luototus, Takuusäätiö, velkajärjestely — oikea ratkaisu riippuu tilanteestasi.</li>
  <li><strong>Huolehdi itsestäsi</strong> — Velkaongelmat ovat stressaavia. Hae apua myös mielenterveydellisiin oireisiin.</li>
</ol>
<p>Velkaongelmista selviää. Apua on tarjolla. Sinun ei tarvitse selvitä yksin.</p>
<p>Jos haluat tietää lisää oikeuksistasi velallisena, lue oppaamme <a href="/oppaat/kuluttajan-oikeudet">kuluttajan oikeuksista laina-asioissa</a>.</p>
`,
  },
];

// Helper to find a guide by slug
export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

// Helper to get related guides for a given guide
export function getRelatedGuides(guide: Guide): Guide[] {
  return guide.relatedGuides
    .map((slug) => guides.find((g) => g.slug === slug))
    .filter((g): g is Guide => g !== undefined);
}
