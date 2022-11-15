/**
 * Method to retrieve teaching availabiltiy for a guide in a given week
 */

import { GuideAvailability } from '../types/guide'
import { GET_GUIDE_AVAILABILITY, POST_GUIDE_AVAILABILITY } from './endpoints'

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
      err = new Error(`Some error occured: ${JSON.stringify(error)}`)
    }
  }
  return err
}

/**
/**
 * Method to submit teaching availability for a guide in a given week
 */
export const submitAvailability = async (
  guideAvailability: GuideAvailability
) => {
  let err: Error | null = null

  try {
    const response = await fetch(POST_GUIDE_AVAILABILITY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guideAvailability)
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
