import { GuideAvailability } from '../types/guide'

export const POST_GUIDE_AVAILABILITY =
  'http://localhost:3000/guide/availability'

/**
/**
 * Method to submit teaching availability for a guide in a given week
 */
export const submitAvailability = async (
  guideAvailability: GuideAvailability
) => {
  let err: Error | null = null
  console.log(
    `submit guide availability: data = ${JSON.stringify(guideAvailability)}`
  )
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
