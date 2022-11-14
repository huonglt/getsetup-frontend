export type AvailableTime = {
  from: Date
  to: Date
}

export type GuideAvailability = {
  userId: number
  weekNumber: number
  availability: AvailableTime[]
}
