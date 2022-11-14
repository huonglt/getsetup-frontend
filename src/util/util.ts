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
  return date.toLocaleDateString('en-NZ', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export const formatMonToSun = (monday: Date, sunday: Date) => {
  return formatWeekDay(monday) + ' - ' + formatWeekDay(sunday)
}
export const weekData = [
  {
    weekNumber: 1,
    monday: new Date(2022, 10, 14),
    sunday: new Date(2022, 10, 20)
  },
  {
    weekNumber: 2,
    monday: new Date(2022, 10, 21),
    sunday: new Date(2022, 10, 27)
  },
  {
    weekNumber: 3,
    monday: new Date(2022, 10, 28),
    sunday: new Date(2022, 11, 4)
  },
  {
    weekNumber: 4,
    monday: new Date(2022, 11, 5),
    sunday: new Date(2022, 11, 11)
  }
]

export const guideList = [
  {
    userId: 1,
    userName: 'Doris Wilson'
  },
  {
    userId: 2,
    userName: 'Amy Smith'
  }
]
