export const generateProductQuantityStr = (quantity: number | undefined) => {
  if (!quantity) return '0 produktov'
  if (quantity === 1) return '1 produkt'
  if (quantity >= 2 && quantity <= 4) return `${quantity} produkty`
  return `${quantity} produktov`
}
