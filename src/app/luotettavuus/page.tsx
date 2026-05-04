import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/components/disclosure';

const SITE_NAME = SITE_CONFIG.siteName;

export const metadata: Metadata = {
  title: 'Luotettavuus ja rahoitus — näin ansaitsemme rahaa',
  description: `Miten ${SITE_NAME} valitsee lainanantajat, järjestää tarjoukset ja ansaitsee rahaa. Avoin selvitys palkkioista, järjestysalgoritmista ja siitä mitä emme tee.`,
  alternates: { canonical: 'https://valitselaina.fi/luotettavuus' },
  robots: { index: true, follow: true },
};

export default function LuotettavuusPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#f7fafc]">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Toimituksen periaatteet
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Luotettavuus ja rahoitus
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Tämä sivu kertoo avoimesti, miten {SITE_NAME} hankkii tietonsa,
            järjestää lainatarjoukset ja ansaitsee rahaa. Tavoitteemme on
            rehellinen, kuluttajan etua palveleva vertailu — ja haluamme
            näyttää tarkalleen, mitä se meiltä vaatii.
          </p>
        </header>

        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Mistä lainanantajat tulevat</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Keräämme lainanantajien hinta- ja ehtotiedot suoraan heidän
            julkisilta sivuiltaan ja Finanssivalvonnan rekistereistä. Lisäksi
            voimme käyttää rajatun joukon kumppaneita, joiden kanssa meillä on
            suora affiliate-sopimus.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Sisällytämme listalle <strong>kaikki Suomessa toimiluvalla
            (Finanssivalvonnan valvonnassa) toimivat lainanantajat</strong>,
            joiden tuotetiedot ovat julkisesti saatavilla. Vertailussa on yli
            27 lainanantajaa.
          </p>
        </section>

        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Järjestysalgoritmi</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Lainatuotteet järjestetään{' '}
            <strong>oletuksena todellisen vuosikoron mukaan halvimmasta
            kalleimpaan</strong> ({SITE_CONFIG.rankingCriteria}). Algoritmi
            ottaa huomioon haetun summan, laina-ajan ja kaikki kulut —
            avausmaksun, kuukausimaksun ja muut kulut. Algoritmi <strong>ei</strong>{' '}
            ota huomioon palkkion suuruutta.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Kumppanitarjoukset on merkitty selkeästi pillillä{' '}
            <span className="rounded-full bg-[#E8EEF6] px-2 py-0.5 text-[11px] font-semibold text-[#3B5266]">
              Kumppanitarjous
            </span>
            . Muut kantavat merkintää{' '}
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              Markkinahinta
            </span>
            .
          </p>
        </section>

        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Mitä emme tee</h2>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="flex gap-2">
              <span className="text-[#38a169]">✓</span>
              <span>
                <strong>Emme nosta tarjouksia esiin palkkion suuruuden
                perusteella.</strong> Pay-for-placement on meille kielletty.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#38a169]">✓</span>
              <span>
                <strong>Emme näytä mainostettua todellista vuosikorkoa.</strong>{' '}
                Käytämme syöttämääsi summaa ja laina-aikaa todellisen vuosikoron
                laskemiseen — emme markkinointiin valittua matalaa esimerkkiä.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#38a169]">✓</span>
              <span>
                <strong>Emme suosittele lainaa, jota et tarvitse.</strong>{' '}
                Vertailu on työkalu — sinun päätöksesi.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#38a169]">✓</span>
              <span>
                <strong>Emme välitä henkilötietojasi lainanantajille</strong>{' '}
                ennen kuin teet tietoisen klikkauspäätöksen.
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Päivitysväli</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Lainojen korkotiedot ja kulut tarkistetaan vähintään kerran kuussa.
            Korkojen yleinen taso (esim. 12 kk Euribor) päivittyy automaattisesti.
            Kumppanitarjousten ehdot päivittyvät automaattisesti useamman
            kerran viikossa.
          </p>
        </section>

        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Mukana olevat ja pois jätetyt lainanantajat</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Vertailussa ovat kaikki suuret pankit (OP, Nordea, Danske, S-Pankki,
            Aktia, POP), kotimaiset fintech-toimijat (Sortter, Lendo, Bondora)
            sekä useita pienempiä erikoistuneita toimijoita.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Pois jätetään lainanantajat, joilla ei ole Finanssivalvonnan lupaa,
            joiden vuosikorko ylittää lain salliman maksimin (Pikavipit-laki),
            tai joiden tiedot eivät ole julkisesti saatavilla.
          </p>
        </section>

        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Miten ansaitsemme rahaa</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Kun klikkaat &quot;Hae lainaa&quot;-painiketta ja jatkat hakemuksen
            tekemiseen, saamme osasta lainanantajia palkkion onnistuneesti
            myönnetyistä lainoista. Tämä palkkio ei vaikuta koron suuruuteen,
            jonka sinä maksat. Ilman tätä tulonlähdettä emme voisi tarjota
            palvelua maksuttomasti.
          </p>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Onko jotain epäselvää?</h2>
          <p className="mt-2 text-gray-700">
            Lue lisää{' '}
            <Link href="/sivuston-ansainta" className="text-[#1a365d] underline hover:text-[#2a4a7f]">
              sivuston ansainnasta
            </Link>{' '}
            tai{' '}
            <Link href="/menetelma" className="text-[#1a365d] underline hover:text-[#2a4a7f]">
              vertailumenetelmästä
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
