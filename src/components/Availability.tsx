import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
  Button
} from '@mui/material'
import React, { useState } from 'react'
import { getGuideAvailability } from '../apis/guide'
import { useApi } from '../hooks/useApi'
import { GuideAvailability } from '../types/guide'
import {
  formatAvailabilityTime,
  formatMonToSun,
  guideList,
  weekData
} from '../util/util'

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
              Week {week.weekNumber}: {formatMonToSun(week.monday, week.sunday)}
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
          {data.availability
            .filter((timeslot) => timeslot.from && timeslot.to)
            .map((timeslot, index) => {
              return (
                <Typography key={index}>
                  {formatAvailabilityTime(timeslot)}
                </Typography>
              )
            })}
        </>
      )}
    </div>
  )
}
