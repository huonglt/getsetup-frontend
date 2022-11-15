import { GET_WEEK_DAYS, GET_AVAILABILITY_WEEKS } from './endpoints'

/**
 * Method to get all weeks to add / update availability currently supported
 */
export const getAvailabilityWeeks = async () => {
  let err: Error | null = null

  try {
    const response = await fetch(GET_AVAILABILITY_WEEKS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      err = error
    } else {
      err = new Error(`Some error occured: ${JSON.stringify(error)}`)
    }
  }
  return err
}

export const getWeekDays = async (weekNumber: number) => {
  let err: Error | null = null
  try {
    const url = `${GET_WEEK_DAYS}/${weekNumber}`
    const response = await fetch(url, {
      method: 'GET'
    })

    /**
     * response.json() returns a promise so need await
     */
    const data = await response.json()

    // TODO: checking for valid server data
    return data
  } catch (error) {
    // 403 error, network error etc
    if (error instanceof Error) {
      err = error
    } else {
      err = new Error(`Some error occured: ${JSON.stringify(error)}`)
    }
  }
  return err
}
