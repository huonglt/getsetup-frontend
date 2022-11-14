/**
 * Method to retrieve teaching availabiltiy for a guide in a given week
 */

import { GET_GUIDE_AVAILABILITY } from './endpoints'

export const getGuideAvailability = async (
  userId: number,
  weekNumber: number
): Promise<unknown | Error> => {
  let err: Error | null = null
  try {
    const url = `${GET_GUIDE_AVAILABILITY}/${userId}/${weekNumber}`
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
      err = new Error('some other error')
    }
  }
  return err
}
