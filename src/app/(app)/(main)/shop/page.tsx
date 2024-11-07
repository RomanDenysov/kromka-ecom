import CategoriesGrid from '~/features/shop/categories/ui/categories-grid'
import { Container } from '~/lib/ui/container'

export default function ShopPage() {
  return (
    <Container className="py-5 md:py-10">
      <CategoriesGrid />
    </Container>
  )
}
