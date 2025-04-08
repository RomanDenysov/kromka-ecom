import type { Metadata } from 'next/types'
import { Suspense } from 'react'
import { PostsGrid } from '~/features/posts-grid/ui'
import { TagsFilter } from '~/features/tags-filter/ui'
import { Container } from '~/lib/ui/container'
import { prodUrl } from '~/lib/utils'
import { JsonLd, WebSite, WithContext, createOrganizationSchema, createSchemaUrl } from '~/lib/utils/json-ld'
import { createMetadata } from '~/lib/utils/metadata'
import { api } from '~/trpc/server'

const meta = {
  title: 'Náš Kromka Blog',
  description: 'Vitajte v našom kulinárskom svete! Objavte chutné recepty, tipy na pečenie a varenie, a inšpiráciu pre vašu kuchyňu. Od tradičných slovenských jedál po moderné kulinárske trendy.',
  image: 'images/kromka_bunner_bg_b2b.webp',
}

const jsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: meta.title,
  description: meta.description,
  image: `${prodUrl}${meta.image}`,
  url: createSchemaUrl(new URL('/blog', prodUrl)),
  publisher: createOrganizationSchema(prodUrl)
}

export const metadata: Metadata = createMetadata(meta)

export default async function BlogPage() {
  const posts = await api.posts.getPosts()
  const tags = await api.posts.getTags()

  return (
    <>
      <JsonLd code={jsonLd} />
      <Container className="pt-4 mb-4 flex flex-col gap-2">
        <h1 className="text-left font-bold text-2xl md:text-3xl tracking-tight">
          {'Náš Kromka blog'}
        </h1>
        <p className="text-muted-foreground text-lg">
          {'Vitajte v našom kulinárskom svete! Objavte chutné recepty, užitočné tipy na pečenie a varenie, a inšpiráciu pre vašu kuchyňu. Od tradičných slovenských jedál až po moderné kulinárske trendy.'}
        </p>
      </Container>
      {/* <BlogCarousel posts={posts.slice(0, 4)} /> */}
      <Suspense fallback={null}>
        <TagsFilter tags={tags} />
      </Suspense>
      <Container className="py-5">
        <Suspense fallback={null}>
          <PostsGrid posts={posts} />
        </Suspense>
        {/* <CtaSection /> */}
      </Container>
    </>
  )
}
