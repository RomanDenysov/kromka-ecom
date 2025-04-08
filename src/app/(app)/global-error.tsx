'use client'

import Error from 'next/error'

export default function GlobalError(props: {
  error: {
    digest?: string
  } & Error
  params: {
    locale: string
  }
}) {
  // TODO: Add fonts for this page separately
  return (
    <html lang={props.params.locale} >
      <body>
        <h1>Fuha, nastala nejaká chyba</h1>
        <Error statusCode={undefined as any} />
      </body>
    </html>
  )
}
