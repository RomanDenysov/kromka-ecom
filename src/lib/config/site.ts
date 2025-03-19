const links = {
  home: 'https://pekarenkromka.sk',
  about: 'https://pekarenkromka.sk/o-nas',
  contact: 'https://pekarenkromka.sk/kontakt',
}

export const siteConfig = {
  name: 'Pekáren Kromka',
  description:
    'Pekáreň Kromka je remeselná pekáreň s dlhoročnou tradíciou. Naše pečivo a chlieb vyrábame s láskou, používame kvalitné suroviny a tradičné postupy. Prinášame vám čerstvé pekárenské výrobky priamo z našej pece každý deň.',
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
