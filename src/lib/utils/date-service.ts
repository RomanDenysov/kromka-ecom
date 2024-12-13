import { isValid, parseISO } from 'date-fns' // parseISO из date-fns
import { format, toZonedTime } from 'date-fns-tz' // toZonedTime вместо zonedTimeToUtc

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DateService {
  private static readonly TIMEZONE = 'Europe/Bratislava'
  private static readonly DATE_FORMAT = 'yyyy-MM-dd HH:mm'
  private static readonly EMAIL_FORMAT = 'd. MMMM yyyy'

  static formatToISO(date: Date): string {
    if (!isValid(date)) {
      throw new Error('Invalid date provided')
    }
    // Используем toZonedTime вместо zonedTimeToUtc
    const zonedDate = toZonedTime(date, this.TIMEZONE)
    return zonedDate.toISOString()
  }

  static formatForEmail(date: string | Date): string {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    // toZonedTime вместо utcToZonedTime
    const zonedDate = toZonedTime(parsedDate, this.TIMEZONE)
    return format(zonedDate, this.EMAIL_FORMAT, { timeZone: this.TIMEZONE })
  }

  static formatForDB(date: Date): string {
    if (!isValid(date)) {
      throw new Error('Invalid date provided')
    }
    const zonedDate = toZonedTime(date, this.TIMEZONE)
    return format(zonedDate, this.DATE_FORMAT, { timeZone: 'UTC' })
  }

  static parseFromISO(isoString: string): Date {
    const date = parseISO(isoString)
    if (!isValid(date)) {
      throw new Error('Invalid ISO string provided')
    }
    return date
  }
}
