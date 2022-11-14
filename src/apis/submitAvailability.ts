import { GuideAvailability } from '../types/guide'
import { POST_GUIDE_AVAILABILITY } from './endpoints'

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
      err = new Error('some other error')
    }
  }
  return err
}
