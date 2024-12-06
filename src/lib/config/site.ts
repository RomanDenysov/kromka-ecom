const links = {
  home: 'https://pekarenkromka.sk',
  about: 'https://pekarenkromka.sk/o-nas',
  contact: 'https://pekarenkromka.sk/kontakt',
}

export const siteConfig = {
  name: 'Pekáren Kromka',
  description:
    'Pekaren Kromka je online obchod pre pekarení a červených koňať. Naša cieľom je poskytnúť najviac informácií o pekarení a červených koňať pre každého z nás.',
  url: 'https://pekarenkromka.sk',
  ogImage: 'https://pekarenkromka.sk/og.png',
  links,
  mainNav: [
    {
      title: 'Úvodná stránka',
      links: [
        {
          title: 'Úvodná stránka',
          href: links.home,
        },
        {
          title: 'Obchod',
          href: links.home + '/obchod',
        },
        {
          title: 'Aktuálne',
          href: links.home + '/aktualne',
        },
        {
          title: 'Nakupované',
          href: links.home + '/nakupovane',
        },
        {
          title: 'Nakupované aktuálne',
          href: links.home + '/nakupovane/aktualne',
        },
        {
          title: 'Nakupované najnovšie',
          href: links.home + '/nakupovane/najnovsie',
        },
        {
          title: 'Nakupované najnovšie aktuálne',
          href: links.home + '/nakupovane/najnovsie/aktualne',
        },
        {
          title: 'Nakupované najnovšie najnovšie',
          href: links.home + '/nakupovane/najnovsie/najnovsie',
        },
      ],
    },
    {
      title: 'O nás',
      links: [
        {
          title: 'O nás',
          href: links.about,
        },
        {
          title: 'Spoločnosť',
          href: links.about + '/spolocnost',
        },
        {
          title: 'Kontakt',
          href: links.contact,
        },
      ],
    },
  ],
  footerNav: [
    {
      title: 'Obchod',
      links: [
        {
          title: 'Obchod',
          href: links.home,
        },
        {
          title: 'Aktuálne',
          href: links.home + '/aktualne',
        },
        {
          title: 'Nakupované',
          href: links.home + '/nakupovane',
        },
        {
          title: 'Nakupované aktuálne',
          href: links.home + '/nakupovane/aktualne',
        },
        {
          title: 'Nakupované najnovšie',
          href: links.home + '/nakupovane/najnovsie',
        },
        {
          title: 'Nakupované najnovšie aktuálne',
          href: links.home + '/nakupovane/najnovsie/aktualne',
        },
        {
          title: 'Nakupované najnovšie najnovšie',
          href: links.home + '/nakupovane/najnovsie/najnovsie',
        },
      ],
    },
    {
      title: 'O nás',
      links: [
        {
          title: 'O nás',
          href: links.about,
        },
        {
          title: 'Spoločnosť',
          href: links.about + '/spolocnost',
        },
        {
          title: 'Kontakt',
          href: links.contact,
        },
      ],
    },
  ],
}
