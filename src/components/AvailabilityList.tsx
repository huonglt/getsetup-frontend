import { Typography, Box } from '@mui/material'
import React from 'react'
import { GuideAvailability } from '../types/guide'
import { formatAvailabilityTime } from '../util/util'

type Props = {
  guideAvailability: GuideAvailability
}

/**
 * UI to show guide teaching availability in list format
 * Will improve to render in calendar style format in the future
 */
export const AvailabilityList = (props: Props) => {
  const { userId, weekNumber, availability } = props.guideAvailability

  return (
    <Box className="spaceTop">
      <Typography>
        Teaching Availability for userId {userId} for the week #{weekNumber}
      </Typography>
      {availability
        .filter((timeslot) => timeslot.from && timeslot.to)
        .map((timeslot, index) => {
          return (
            <Typography key={index}>
              {formatAvailabilityTime(timeslot)}
            </Typography>
          )
        })}
    </Box>
  )
}
