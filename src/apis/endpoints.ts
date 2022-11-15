/**
 * Modules containing all endpoints using by the app
 */
const HOST = 'http://localhost:3000'

// endpoint to retrieve guide teaching availability
export const GET_GUIDE_AVAILABILITY = `${HOST}/availability`

// endpoint to submit guide teaching availability
export const POST_GUIDE_AVAILABILITY = `${HOST}/availability/update`

// endpoint to get all weeks for availability
export const GET_AVAILABILITY_WEEKS = `${HOST}/week/availabilityWeeks`

// endpoint to get week days of a given week
export const GET_WEEK_DAYS = `${HOST}/week/weekDays`

// endpoint to get list of guides
export const GET_GUIDE_LIST = `${HOST}/guide/list`
