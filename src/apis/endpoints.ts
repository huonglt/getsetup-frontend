/**
 * Modules containing all endpoints using by the app
 */
const HOST = 'http://localhost:3000'

// api to retrieve guide teaching availability
export const GET_GUIDE_AVAILABILITY = `${HOST}/availability`

// api to submit guide teaching availability
export const POST_GUIDE_AVAILABILITY = `${HOST}/availability/update`
