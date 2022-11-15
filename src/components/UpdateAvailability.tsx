import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getGuideAvailability } from '../apis/availability'
import { submitAvailability } from '../apis/availability'
import { useApi } from '../hooks/useApi'
import { GuideAvailability } from '../types/guide'
import { AvailabilityRows } from './AvailabilityRows'

type Props = {
  userId: number
  weekNumber: number
  goToSearchPage: () => void
}
export const UpdateAvailability = (props: Props) => {
  const { userId, weekNumber, goToSearchPage } = props
  // error occured on backend when submit teaching availability
  const [submitedError, setSubmitedError] = useState<Error | null>(null)

  const { loadData: submitGuideAvailability } =
    useApi<unknown>(submitAvailability)
  const {
    isLoading,
    isError,
    data,
    loadData: loadTeachingAvailability
  } = useApi<GuideAvailability>(getGuideAvailability)

  useEffect(() => {
    loadTeachingAvailability(userId, weekNumber)
  }, [])

  const handleSubmitAvailability = async (
    guideAvailability: GuideAvailability
  ) => {
    try {
      // clear the error before submitting
      setSubmitedError(null)
      const result = await submitGuideAvailability(guideAvailability)
      goToSearchPage()
    } catch (err) {
      setSubmitedError(err as Error)
    }
  }

  const showData = !isError && !isLoading
  return (
    <div className="container">
      <a className="linkNav" onClick={goToSearchPage} href="#">
        <Typography>Go back to dashboard</Typography>
      </a>
      <Typography>
        Update teaching availability: userId = {userId}, weekNumber ={' '}
        {weekNumber}
      </Typography>
      {showData && (
        <AvailabilityRows
          initialData={data?.availability}
          userId={props.userId}
          weekNumber={props.weekNumber}
          submitAvailability={handleSubmitAvailability}
        />
      )}
      {/* show api error if any */}
      {submitedError && <Typography color={'red'}>{submitedError}</Typography>}
    </div>
  )
}
