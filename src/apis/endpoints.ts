/**
 * Modules containing all endpoints using by the app
 */
const HOST = 'http://localhost:3000'

// api to retrieve guide teaching availability
export const GET_GUIDE_AVAILABILITY = `${HOST}/availability`

// api to submit guide teaching availability
export const POST_GUIDE_AVAILABILITY = `${HOST}/availability/update`

// api to get all week numbers
export const GET_WEEK_NUMBERS = `${HOST}/week/weekNumbers`

// api to get week days of a given week
export const GET_WEEK_DAYS = `${HOST}/week/weekDays`
