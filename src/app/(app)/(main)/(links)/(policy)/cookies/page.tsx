import { Container } from '~/lib/ui/container'

const sections = [
  { id: 'co-su-cookies', title: 'Čo sú súbory cookies' },
  { id: 'preco-pouzivame', title: 'Prečo používame cookies' },
  { id: 'typy-cookies', title: 'Typy cookies, ktoré používame' },
  { id: 'sprava-nastaveni', title: 'Správa nastavení cookies' },
  { id: 'zmeny-cookies', title: 'Zmeny v používaní cookies' },
  { id: 'kontaktne-udaje', title: 'Kontaktné údaje' },
]

export default function Page() {
  return (
    <Container className="py-8 md:py-16 max-w-5xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold">Zásady používania súborov cookies</h1>

      <article id="co-su-cookies" className="space-y-4">
        <h2 className="text-xl font-semibold">1. Čo sú súbory cookies</h2>
        <p className="text-base font-normal">
          1.1. Súbory cookies sú malé textové súbory, ktoré môžu byť do prehliadača odosielané pri
          návšteve webových stránok a ukladané do vášho zariadenia (počítača alebo do iného
          zariadenia s prístupom na internet, ako napr. smartphone alebo tablet).
        </p>
        <p className="text-base font-normal">
          1.2. Súbory cookies sa ukladajú do priečinka pre súbory vášho prehliadača. Cookies obvykle
          obsahujú názov webovej stránky, z ktorej pochádzajú, platnosť a hodnotu.
        </p>
      </article>

      <article id="preco-pouzivame" className="space-y-4">
        <h2 className="text-xl font-semibold">2. Prečo používame cookies</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">
            2.1. Naša webová stránka používa súbory cookies na nasledujúce účely:
          </p>
          <div className="space-y-4">
            <div>
              <p className="font-medium">a) Nevyhnutné cookies:</p>
              <ul className="list-disc space-y-1 ml-6">
                <li>Umožňujú základné funkcie stránky</li>
                <li>Zabezpečujú správne fungovanie e-shopu</li>
                <li>Umožňujú prihlásenie a autentifikáciu používateľa</li>
                <li>Uchovávajú obsah košíka</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">b) Funkčné cookies:</p>
              <ul className="list-disc space-y-1 ml-6">
                <li>Pamätajú si vaše preferencie</li>
                <li>Umožňujú personalizáciu obsahu</li>
                <li>Zlepšujú používateľský komfort</li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <article id="typy-cookies" className="space-y-4">
        <h2 className="text-xl font-semibold">3. Typy cookies, ktoré používame</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">3.1. Z hľadiska trvanlivosti používame:</p>
          <div className="space-y-4">
            <div>
              <p className="font-medium">a) Krátkodobé (session) cookies:</p>
              <ul className="list-disc space-y-1 ml-6">
                <li>Sú dočasné</li>
                <li>Zostávajú uložené vo vašom prehliadači len do jeho zatvorenia</li>
                <li>Umožňujú potrebnú funkcionalitu počas prehliadania</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">b) Dlhodobé (persistent) cookies:</p>
              <ul className="list-disc space-y-1 ml-6">
                <li>Zostávajú uložené dlhšie</li>
                <li>Zlepšujú používateľský komfort</li>
                <li>Pamätajú si vaše nastavenia pre budúce návštevy</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-base font-normal">
          <p className="text-base font-normal">3.2. Nepoužívame:</p>
          <ul className="list-disc space-y-1">
            <li>Cookies tretích strán</li>
            <li>Marketingové cookies</li>
            <li>Analytické cookies</li>
          </ul>
        </div>
      </article>

      <article id="sprava-nastaveni" className="space-y-4">
        <h2 className="text-xl font-semibold">4. Správa nastavení cookies</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">4.1. Prehliadače obvykle umožňujú:</p>
          <ul className="list-disc space-y-1">
            <li>Zobraziť existujúce cookies</li>
            <li>Povoliť alebo zakázať cookies</li>
            <li>Vymazať existujúce cookies</li>
            <li>Nastaviť pravidlá pre jednotlivé webové stránky</li>
          </ul>
        </div>
        <div className="text-base font-normal">
          <p className="text-base font-normal">
            4.2. Návod na správu cookies v jednotlivých prehliadačoch:
          </p>
          <ul className="list-disc space-y-1">
            <li>Chrome: Nastavenia → Súkromie a zabezpečenie → Cookies</li>
            <li>Firefox: Nastavenia → Súkromie a zabezpečenie → Cookies</li>
            <li>Safari: Predvoľby → Súkromie → Cookies</li>
            <li>Edge: Nastavenia → Cookies a povolenia stránok</li>
          </ul>
        </div>
        <p className="text-base font-normal">
          4.3. Upozorňujeme, že obmedzenie používania cookies môže ovplyvniť funkcionalitu našej
          stránky.
        </p>
      </article>

      <article id="zmeny-cookies" className="space-y-4">
        <h2 className="text-xl font-semibold">5. Zmeny v používaní cookies</h2>
        <p className="text-base font-normal">
          5.1. Vyhradzujeme si právo kedykoľvek upraviť a doplniť túto politiku cookies. Zmeny budú
          zverejnené na tejto stránke.
        </p>
        <p className="text-base font-normal">
          5.2. V prípade zavedenia nových typov cookies budeme o tom používateľov vopred informovať
          a vyžiadame si ich súhlas, ak to vyžaduje zákon.
        </p>
      </article>

      <article id="kontaktne-udaje" className="space-y-4">
        <h2 className="text-xl font-semibold">6. Kontaktné údaje</h2>
        <div className="text-base font-normal">
          <p className="text-base font-normal">
            6.1. V prípade otázok ohľadom používania cookies nás môžete kontaktovať na:
          </p>
          <ul className="list-disc space-y-1">
            <li>
              <span className="text-muted-foreground italic font-semibold">Email:</span>{' '}
              kromka@kavejo.sk
            </li>
            <li>
              <span className="text-muted-foreground italic font-semibold">Adresa:</span> ul. 17.
              novembra 8288/106, Prešov 080 01
            </li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground mt-8 italic">
          Tieto zásady používania súborov cookies sú platné a účinné od 1.12.2024
        </p>
      </article>
    </Container>
  )
}
