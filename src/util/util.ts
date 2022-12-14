import { AvailableTime, AvailabilityWeek } from '../types/guide'

const defaultLocale = 'en-NZ'

export const formatShortTime = (date: Date) => {
  return new Date(date).toLocaleTimeString(defaultLocale, {
    timeStyle: 'short'
  })
}

export const formatDate = (date: Date) => new Date(date).toDateString()

export const formatAvailabilityTime = (availableTime: AvailableTime) => {
  const { from, to } = availableTime
  if (!from || !to) {
    return ''
  }
  return (
    formatDate(from) + ' ' + formatShortTime(from) + ' - ' + formatShortTime(to)
  )
}

export const formatWeekDay = (date: Date) => {
  return new Date(date).toLocaleDateString(defaultLocale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export const formatMonToSun = (monday: Date, sunday: Date) => {
  return formatWeekDay(monday) + ' - ' + formatWeekDay(sunday)
}

/**
 * Method to format an availability week forthe UI
 */
export const formatAvailabilityWeek = (availabilityWeek: AvailabilityWeek) => {
  const { weekNumber, weekDays } = availabilityWeek
  return `Week ${weekNumber}: ${formatMonToSun(weekDays[0], weekDays[6])}`
}
