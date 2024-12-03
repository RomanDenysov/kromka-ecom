export class PriceFormatter {
  static formatPriceNumber(price: number): number {
    // Округляем до 2 знаков после запятой
    return Number(Math.round(price * 100) / 100)
  }

  static toStripeAmount(price: number): number {
    // Сразу конвертируем в центы без промежуточных операций
    return Math.round(price * 100)
  }

  // Добавим метод для обратной конвертации из центов
  static fromStripeAmount(amount: number): number {
    return Number((amount / 100).toFixed(2))
  }
}
