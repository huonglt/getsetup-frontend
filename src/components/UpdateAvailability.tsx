import { Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { getGuideAvailability } from '../apis/guide'
import { useApi } from '../hooks/useApi'
import { GuideAvailability } from '../types/guide'
import { AvailabilityRow } from './AvailabilityRow'
import { AvailabilityRows } from './AvailabilityRows'

type Props = {
  userId: number
  weekNumber: number
  goBack: () => void
}
export const UpdateAvailability = (props: Props) => {
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
      {showData && <AvailabilityRows rows={data?.availability} />}
    </div>
  )
}
