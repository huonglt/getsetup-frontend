export type AvailableTime = {
  from: Date | null
  to: Date | null
}

export type GuideAvailability = {
  userId: number
  weekNumber: number
  availability: AvailableTime[]
}

export type AvailabilityWeek = {
  weekNumber: number
  weekDays: Date[]
}

export type Guide = {
  userId: number
  userName: string
}
