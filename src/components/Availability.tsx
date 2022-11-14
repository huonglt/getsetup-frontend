import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
  Button
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getGuideAvailability } from '../apis/guide'
import { useApi } from '../hooks/useApi'

import { GuideAvailability } from '../types/guide'
import { weekData } from '../util/util'
import { AvailabilityCalendar } from './AvailabilityCalendar'

const initialData = {
  userId: 1,
  weekNumber: 46,
  availability: [
    {
      from: new Date(2022, 11, 13, 8, 0),
      to: new Date(2022, 11, 13, 9, 0),
      booked: false
    }
  ]
}

const guideList = [
  {
    userId: 1,
    userName: 'Doris Wilson'
  },
  {
    userId: 2,
    userName: 'Amy Smith'
  }
]
type Props = {
  onClickSubmit: (userId: number, weekNumber: number) => void
}
export const Availability = (props: Props) => {
  const {
    isLoading,
    isError,
    data,
    loadData: retrieveTeachingAvailability
  } = useApi<GuideAvailability>(getGuideAvailability)
  const [userId, setUserId] = useState('')
  const [weekNumber, setWeekNumber] = useState('')

  const handleGuideChange = (event: SelectChangeEvent) => {
    setUserId(event.target.value as string)
  }

  const handleWeekChange = (event: SelectChangeEvent) => {
    setWeekNumber(event.target.value as string)
  }

  const handleRetrieveAvailability = () => {
    retrieveTeachingAvailability(userId, weekNumber)
  }

  const handleSubmitAvailability = () => {
    if (userId && weekNumber) {
      props.onClickSubmit(Number(userId), Number(weekNumber))
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      <Typography>Select guide:</Typography>
      <FormControl>
        <Select onChange={handleGuideChange} value={userId}>
          {guideList.map((guide) => (
            <MenuItem value={guide.userId} key={guide.userId}>
              {guide.userName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>Select week number:</Typography>
      <FormControl>
        <Select value={weekNumber} onChange={handleWeekChange}>
          {weekData.map((week) => (
            <MenuItem value={week.weekNumber} key={week.weekNumber}>
              Week {week.weekNumber}:{' '}
              {week.monday.toLocaleDateString('en-NZ', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}{' '}
              {' - '}
              {week.sunday.toLocaleDateString('en-NZ', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        <Button
          variant="outlined"
          onClick={handleRetrieveAvailability}
          style={{ width: '300px' }}
        >
          Retrieve Teaching Availability
        </Button>
        <Button
          variant="outlined"
          style={{ width: '300px' }}
          onClick={handleSubmitAvailability}
        >
          Update Teaching Availability
        </Button>
      </Box>
      {!isError && !isLoading && data === null && (
        <div>No teaching availability data found</div>
      )}
      {!isError && !isLoading && data && (
        <>
          <Typography>
            Teaching Availability for userId {data.userId} for the week #
            {data.weekNumber}
          </Typography>
          {data.availability.map((timeslot, index) => (
            <Typography key={index}>
              {new Date(timeslot.from).toDateString()}{' '}
              {new Date(timeslot.from).toLocaleTimeString('en-NZ', {
                timeStyle: 'short'
              })}
              {' - '}
              {new Date(timeslot.to).toLocaleTimeString('en-NZ', {
                timeStyle: 'short'
              })}
            </Typography>
          ))}
        </>
      )}
      <Typography>Calendar</Typography>
    </div>
  )
}
