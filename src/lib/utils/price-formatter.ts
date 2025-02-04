export const PriceFormatter = {
  formatPriceNumber: (price: number): number => {
    // Округляем до 2 знаков после запятой
    return Number(price.toFixed(2))
  },

  toStripeAmount: (price: number): number => {
    // Сразу конвертируем в центы без промежуточных операций
    return Math.round(price * 100)
  },

  // Добавим метод для обратной конвертации из центов
  fromStripeAmount: (amount: number): number => {
    return Number((amount / 100).toFixed(2))
  },
}
