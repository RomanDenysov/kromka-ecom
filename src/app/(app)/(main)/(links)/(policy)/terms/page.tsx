import { Container } from '~/lib/ui/container'

const sections = [
  { id: 'zakladne-ustanovenia', title: 'Základné ustanovenia' },
  { id: 'pouzivatelsky-ucet', title: 'Používateľský účet' },
  { id: 'prava-povinnosti', title: 'Práva a povinnosti používateľa' },
  { id: 'platobne-podmienky', title: 'Platobné podmienky' },
  { id: 'zaverecne-ustanovenia', title: 'Záverečné ustanovenia' },
]

export default function Page() {
  return (
    <Container className="py-8 md:py-16 max-w-5xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold">Obchodné podmienky</h1>

      <article id="zakladne-ustanovenia" className="space-y-4">
        <h2 className="text-xl font-semibold">1. Základné ustanovenia</h2>
        <p className="text-base font-normal">
          1.1. Tieto obchodné podmienky upravujú vzťahy medzi zmluvnými stranami kúpnej zmluvy, kedy
          na jednej strane je spoločnosť KROMKA s.r.o., IČO: 46 670 068, so sídlom ul. 17. novembra
          8288/106, Prešov 080 01, zapísaná v Obchodnom registri Okresného súdu Prešov, Oddiel: Sro,
          Vložka číslo: 26041/P (ďalej len "predávajúci") a na druhej strane je zákazník (ďalej len
          "kupujúci").
        </p>
        <div className="text-base font-normal">
          <p className="text-base font-normal">1.2. Kontaktné údaje predávajúceho:</p>
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
        <p className="text-base font-normal">
          1.3. Tieto obchodné podmienky sú neoddeliteľnou súčasťou kúpnej zmluvy. Odchylné
          dojednania v kúpnej zmluve majú prednosť pred ustanoveniami týchto obchodných podmienok.
        </p>
      </article>

      <article id="pouzivatelsky-ucet" className="space-y-4">
        <h2 className="text-xl font-semibold">2. Používateľský účet</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">
            2.1. Prístup k používateľskému účtu je zabezpečený prostredníctvom:
          </p>
          <ul className="list-disc space-y-1">
            <li>Magic-link prihlásenia (jednorázový prihlasovací odkaz zaslaný na email)</li>
            <li>Prihlásenia cez Google účet</li>
          </ul>
        </div>
        <p className="text-base font-normal">
          2.2. Kupujúci je povinný zachovávať mlčanlivosť ohľadom informácií potrebných na prístup
          do jeho používateľského účtu.
        </p>
        <p className="text-base font-normal">
          2.3. Kupujúci môže požiadať o zrušenie svojho používateľského účtu emailom na
          eshop@pekarenkromka.sk. Predávajúci sa zaväzuje spracovať túto žiadosť v súlade s platnými
          právnymi predpismi o ochrane osobných údajov.
        </p>
        <p className="text-base font-normal">
          2.4. Predávajúci môže zrušiť používateľský účet v prípade, keď kupujúci poruší svoje
          povinnosti z kúpnej zmluvy alebo týchto obchodných podmienok.
        </p>
      </article>

      <article id="prava-povinnosti" className="space-y-4">
        <h2 className="text-xl font-semibold">3. Práva a povinnosti používateľa</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">3.1. Používateľ sa zaväzuje:</p>
          <ul className="list-disc space-y-1">
            <li>Používať webovú stránku v súlade s právnymi predpismi</li>
            <li>Nezasahovať do technického obsahu stránky</li>
            <li>Neuvádzať nepravdivé, zavádzajúce alebo urážlivé informácie</li>
            <li>Nepoužívať automatizované systémy na prístup k stránke</li>
          </ul>
        </div>
        <div className="text-base font-normal">
          <p className="text-base font-normal">3.2. Komentáre a hodnotenia:</p>
          <ul className="list-disc space-y-1">
            <li>Používateľ môže pridávať komentáre a označovať obsah ako "Páči sa mi"</li>
            <li>
              Komentáre musia byť vecné a nesmú obsahovať urážlivý, nezákonný alebo nevhodný obsah
            </li>
            <li>Predávajúci si vyhradzuje právo odstrániť nevhodné komentáre</li>
          </ul>
        </div>
        <div className="text-base font-normal">
          <p className="text-base font-normal">3.3. Autorské práva:</p>
          <ul className="list-disc space-y-1">
            <li>
              Všetok obsah na webovej stránke (texty, fotografie, logá) je chránený autorským právom
            </li>
            <li>Používateľ môže obsah používať len pre osobnú potrebu</li>
            <li>Akékoľvek komerčné využitie obsahu vyžaduje písomný súhlas predávajúceho</li>
          </ul>
        </div>
      </article>

      <article id="platobne-podmienky" className="space-y-4">
        <h2 className="text-xl font-semibold">4. Platobné podmienky</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">
            4.1. Cenu tovaru a prípadné náklady spojené s dodaním tovaru môže kupujúci uhradiť
            nasledovnými spôsobmi:
          </p>
          <ul className="list-disc space-y-1">
            <li>Platba kartou online prostredníctvom služby Stripe</li>
            <li>Platba v hotovosti pri osobnom odbere</li>
            <li>Platba kartou pri osobnom odbere</li>
          </ul>
        </div>
        <p className="text-base font-normal">
          4.2. V prípade platby prostredníctvom platobnej brány Stripe postupuje kupujúci podľa
          pokynov príslušného poskytovateľa elektronických platieb.
        </p>
        <p className="text-base font-normal">
          4.3. Predávajúci vystaví kupujúcemu daňový doklad - faktúru. Daňový doklad je odoslaný na
          elektronickú adresu kupujúceho.
        </p>
      </article>

      <article id="zaverecne-ustanovenia" className="space-y-4">
        <h2 className="text-xl font-semibold">5. Záverečné ustanovenia</h2>
        <p className="text-base font-normal">
          5.1. Všetky právne vzťahy vznikajúce na základe alebo v súvislosti s týmito obchodnými
          podmienkami sa riadia právnym poriadkom Slovenskej republiky.
        </p>
        <p className="text-base font-normal">
          5.2. V prípade sporu medzi predávajúcim a kupujúcim môže kupujúci využiť možnosť
          mimosúdneho riešenia sporu. V takom prípade môže kupujúci kontaktovať subjekt mimosúdneho
          riešenia sporov.
        </p>
        <p className="text-base font-normal">
          5.3. Tieto obchodné podmienky nadobúdajú účinnosť dňom ich zverejnenia. Predávajúci si
          vyhradzuje právo zmeniť tieto obchodné podmienky. Zmenu obchodných podmienok predávajúci
          zverejní na svojich internetových stránkach.
        </p>
        <p className="text-base font-normal">
          5.4. Kupujúci vyjadruje súhlas s týmito obchodnými podmienkami pri vytvorení
          používateľského účtu alebo pri odoslaní objednávky.
        </p>
        <div className="text-base font-normal">
          <p className="text-base font-normal">
            5.5. Neoddeliteľnou súčasťou týchto obchodných podmienok sú aj:
          </p>
          <ul className="list-disc space-y-1">
            <li>Zásady ochrany osobných údajov</li>
            <li>Zásady používania súborov cookies</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground mt-8 italic">
          Tieto obchodné podmienky sú platné a účinné od 1.12.2024
        </p>
      </article>
    </Container>
  )
}
