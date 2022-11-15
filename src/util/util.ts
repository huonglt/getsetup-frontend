import { AvailableTime } from '../types/guide'

export const formatShortTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('en-NZ', {
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
  return new Date(date).toLocaleDateString('en-NZ', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export const formatMonToSun = (monday: Date, sunday: Date) => {
  return formatWeekDay(monday) + ' - ' + formatWeekDay(sunday)
}
