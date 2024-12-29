import slugify from 'slugify'

const slugifyConfig = {
  lower: true,
  strict: true,
  locale: 'sk',
  remove: /[*+~.()'"!:@]/g,
  replacement: '-',
  replacements: {
    á: 'a',
    ä: 'a',
    č: 'c',
    ď: 'd',
    é: 'e',
    í: 'i',
    ĺ: 'l',
    ľ: 'l',
    ň: 'n',
    ó: 'o',
    ô: 'o',
    ŕ: 'r',
    š: 's',
    ť: 't',
    ú: 'u',
    ý: 'y',
    ž: 'z',
  },
}

function generateSlug(slug: string): string {
  return slugify(slug, slugifyConfig)
}

export { generateSlug }
