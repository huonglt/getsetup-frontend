import { GET_GUIDE_LIST } from './endpoints'

/**
 * Get list of guides from backend
 */
export const getGuideList = async () => {
  let err: Error | null = null

  try {
    const response = await fetch(GET_GUIDE_LIST, {
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
