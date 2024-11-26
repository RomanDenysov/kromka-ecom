export class PriceFormatter {
  static formatPriceNumber(price: number): number {
    return Number(Math.round(price * 100) / 100)
  }

  static toStripeAmount(price: number): number {
    return Number((Math.round(price * 100) / 100) * 100)
  }
}
