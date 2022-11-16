import { AvailabilityWeek } from '../../types/guide'
import {
  formatAvailabilityWeek,
  formatWeekDay,
  formatAvailabilityTime
} from '../util'

describe('util module', () => {
  it('formatWeekDay works correctly', () => {
    const date = new Date('2022-11-13T11:00:00.000Z')
    const result = formatWeekDay(date)
    expect(result).toEqual('Mon, 14 Nov')
  })

  it('an availability week is formatted correctly', () => {
    const weekDays = [
      new Date('2022-11-13T11:00:00.000Z'),
      new Date('2022-11-14T11:00:00.000Z'),
      new Date('2022-11-15T11:00:00.000Z'),
      new Date('2022-11-16T11:00:00.000Z'),
      new Date('2022-11-17T11:00:00.000Z'),
      new Date('2022-11-18T11:00:00.000Z'),
      new Date('2022-11-19T11:00:00.000Z')
    ]
    const availabilityWeek: AvailabilityWeek = {
      weekNumber: 1,
      weekDays
    }
    const monday = new Date(2022, 10, 14, 0, 0, 0)
    const sunday = new Date(2022, 10, 20, 0, 0, 0)
    const result = formatAvailabilityWeek(availabilityWeek)
    expect(result).toEqual('Week 1: Mon, 14 Nov - Sun, 20 Nov')
  })

  it('formatAvailabilityTime work correctly', () => {
    const availabilityTime = {
      from: new Date(2022, 10, 16, 8, 0, 0), // 16 Nov 2022 8am
      to: new Date(2022, 10, 16, 9, 0, 0) // 16 Nov 2022 9am
    }
    const result = formatAvailabilityTime(availabilityTime)
    expect(result).toEqual('Wed Nov 16 2022 8:00 am - 9:00 am')
  })
})
