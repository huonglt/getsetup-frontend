import { Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { getGuideAvailability } from '../apis/guide'
import { submitAvailability } from '../apis/submitAvailability'
import { useApi } from '../hooks/useApi'
import { AvailableTime, GuideAvailability } from '../types/guide'
import { AvailabilityRow } from './AvailabilityRow'
import { AvailabilityRows } from './AvailabilityRows'

type Props = {
  userId: number
  weekNumber: number
  goBack: () => void
}
export const UpdateAvailability = (props: Props) => {
  const { loadData: submitGuideAvailability } =
    useApi<unknown>(submitAvailability)

  const { userId, weekNumber } = props
  const {
    isLoading,
    isError,
    data,
    loadData: retrieveTeachingAvailability
  } = useApi<GuideAvailability>(getGuideAvailability)

  const handleBackClick = () => {
    props.goBack()
  }

  useEffect(() => {
    retrieveTeachingAvailability(userId, weekNumber)
  }, [])

  const handleSubmitAvailability = async (
    guideAvailability: GuideAvailability
  ) => {
    try {
      const result = await submitGuideAvailability(guideAvailability)
      console.log(`submit availability: result = ${JSON.stringify(result)}`)
    } catch (err) {
      console.log(`err while submitting availability: ${JSON.stringify(err)}`)
    }
  }

  console.log(`availability = ${JSON.stringify(data?.availability)}`)
  const showData = !isError && !isLoading
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      <a
        style={{ width: '300px', cursor: 'pointer' }}
        onClick={handleBackClick}
        href="#"
      >
        Go back to dashboard
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
    </div>
  )
}
