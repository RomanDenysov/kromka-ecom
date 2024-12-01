import { Container } from '~/lib/ui/container'

const sections = [
  { id: 'zakladne-informacie', title: 'Základné informácie' },
  { id: 'rozsah-spracovania', title: 'Rozsah spracúvania osobných údajov' },
  { id: 'ucel-spracovania', title: 'Účel spracovania osobných údajov' },
  { id: 'doba-uchovavania', title: 'Doba uchovávania údajov' },
  { id: 'prijemcovia', title: 'Príjemcovia osobných údajov' },
  { id: 'prava-osoby', title: 'Práva dotknutej osoby' },
  { id: 'zabezpecenie', title: 'Zabezpečenie osobných údajov' },
  { id: 'zaverecne-ustanovenia', title: 'Záverečné ustanovenia' },
]

export default function Page() {
  return (
    <Container className="py-8 md:py-16 max-w-5xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold">Ochrana osobných údajov</h1>

      <article id="zakladne-informacie" className="space-y-4">
        <h2 className="text-xl font-semibold">1. Základné informácie</h2>
        <p className="text-base font-normal">
          1.1. Prevádzkovateľom osobných údajov podľa čl. 4 bod 7 nariadenia Európskeho parlamentu a
          Rady (EÚ) 2016/679 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom
          pohybe takýchto údajov (ďalej len "GDPR") je KROMKA s.r.o., IČO: 46 670 068, so sídlom ul.
          17. novembra 8288/106, Prešov 080 01 (ďalej len "prevádzkovateľ").
        </p>
        <div className="text-base font-normal">
          <p className="text-base font-normal">1.2. Kontaktné údaje prevádzkovateľa:</p>
          <ul className="list-disc space-y-1">
            <li>
              <span className="text-muted-foreground italic font-semibold">Email:</span>{' '}
              eshop@pekarenkromka.sk
            </li>
            <li>
              <span className="text-muted-foreground italic font-semibold">Adresa:</span> ul. 17.
              novembra 8288/106, Prešov 080 01
            </li>
          </ul>
        </div>
      </article>

      <article id="rozsah-spracovania" className="space-y-4">
        <h2 className="text-xl font-semibold">2. Rozsah spracúvania osobných údajov</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">2.1. Pred registráciou spracúvame:</p>
          <ul className="list-disc space-y-1">
            <li>Technické údaje o zariadení používateľa</li>
            <li>Identifikátor zariadenia pre účely poskytovania personalizovaných služieb</li>
          </ul>
        </div>
        <div className="text-base font-normal">
          <p className="text-base font-normal">2.2. Po registrácii spracúvame:</p>
          <ul className="list-disc space-y-1">
            <li>Meno a priezvisko</li>
            <li>E-mailovú adresu</li>
            <li>Telefónne číslo</li>
          </ul>
        </div>
        <div className="text-base font-normal">
          <p className="text-base font-normal">2.3. Pri platbe cez Stripe spracúvame:</p>
          <ul className="list-disc space-y-1">
            <li>Platobné údaje v rozsahu nevyhnutnom pre realizáciu platby</li>
            <li>
              Platobné údaje nie sú ukladané na našich serveroch, ale sú spracúvané priamo
              spoločnosťou Stripe
            </li>
          </ul>
        </div>
      </article>

      <article id="ucel-spracovania" className="space-y-4">
        <h2 className="text-xl font-semibold">3. Účel spracovania osobných údajov</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">3.1. Osobné údaje spracúvame na tieto účely:</p>
          <ul className="list-disc space-y-1">
            <li>Vytvorenie a správa používateľského účtu</li>
            <li>Poskytovanie personalizovaných služieb</li>
            <li>Spracovanie objednávok a platieb</li>
            <li>Komunikácia so zákazníkom</li>
            <li>Plnenie zákonných povinností</li>
          </ul>
        </div>
      </article>

      <article id="doba-uchovavania" className="space-y-4">
        <h2 className="text-xl font-semibold">4. Doba uchovávania údajov</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">4.1. Osobné údaje spracúvame a uchovávame:</p>
          <ul className="list-disc space-y-1">
            <li>Po dobu používania účtu</li>
            <li>Po dobu nevyhnutnú na plnenie zákonných povinností</li>
            <li>Do odvolania súhlasu používateľom</li>
          </ul>
        </div>
        <p className="text-base font-normal">
          4.2. Po uplynutí doby uchovávania osobných údajov prevádzkovateľ osobné údaje vymaže.
        </p>
      </article>

      <article id="prijemcovia" className="space-y-4">
        <h2 className="text-xl font-semibold">5. Príjemcovia osobných údajov</h2>
        <p className="text-base font-normal">
          5.1. K osobným údajom majú prístup len oprávnení zamestnanci prevádzkovateľa.
        </p>
        <p className="text-base font-normal">
          5.2. Na spracovanie platieb využívame službu Stripe, ktorá spracúva platobné údaje v
          súlade s GDPR.
        </p>
      </article>

      <article id="prava-osoby" className="space-y-4">
        <h2 className="text-xl font-semibold">6. Práva dotknutej osoby</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">6.1. Za podmienok stanovených v GDPR máte:</p>
          <ul className="list-disc space-y-1">
            <li>Právo na prístup k svojim osobným údajom</li>
            <li>Právo na opravu osobných údajov</li>
            <li>Právo na vymazanie osobných údajov</li>
            <li>Právo na obmedzenie spracúvania</li>
            <li>Právo na prenosnosť údajov</li>
            <li>Právo namietať proti spracúvaniu</li>
            <li>Právo odvolať súhlas so spracovaním osobných údajov</li>
          </ul>
        </div>
        <p className="text-base font-normal">
          6.2. Ďalej máte právo podať sťažnosť na Úrade pre ochranu osobných údajov v prípade, že sa
          domnievate, že bolo porušené Vaše právo na ochranu osobných údajov.
        </p>
      </article>

      <article id="zabezpecenie" className="space-y-4">
        <h2 className="text-xl font-semibold">7. Zabezpečenie osobných údajov</h2>
        <p className="text-base font-normal">
          7.1. Prevádzkovateľ vyhlasuje, že prijal všetky primerané technické a organizačné
          opatrenia na zabezpečenie osobných údajov.
        </p>
        <p className="text-base font-normal">
          7.2. Prevádzkovateľ prijal technické opatrenia na zabezpečenie dátových úložísk a úložísk
          osobných údajov v písomnej podobe.
        </p>
      </article>

      <article id="zaverecne-ustanovenia" className="space-y-4">
        <h2 className="text-xl font-semibold">8. Záverečné ustanovenia</h2>
        <p className="text-base font-normal">
          8.1. Odoslaním registračného formulára potvrdzujete, že ste oboznámení s podmienkami
          ochrany osobných údajov a že ich v celom rozsahu prijímate.
        </p>
        <p className="text-base font-normal">
          8.2. Prevádzkovateľ je oprávnený tieto podmienky zmeniť. Novú verziu podmienok ochrany
          osobných údajov zverejní na svojich internetových stránkach.
        </p>
        <p className="text-sm text-muted-foreground mt-8 italic">
          Tieto podmienky ochrany osobných údajov sú platné a účinné od 1.12.2024
        </p>
      </article>
    </Container>
  )
}
