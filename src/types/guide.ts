export type AvailableTime = {
  from: Date | null
  to: Date | null
}

export type GuideAvailability = {
  userId: number
  weekNumber: number
  availability: AvailableTime[]
}
