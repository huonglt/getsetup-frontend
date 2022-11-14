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
import '../css/availability.css'

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
    <div className="container">
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
      <Box className="buttonContainer">
        <Button
          variant="outlined"
          onClick={handleRetrieveAvailability}
          className="button"
        >
          Retrieve Teaching Availability
        </Button>
        <Button
          variant="outlined"
          className="button"
          onClick={handleSubmitAvailability}
        >
          Update Teaching Availability
        </Button>
      </Box>
      {!isError && !isLoading && data === null && (
        <Typography>No teaching availability data found</Typography>
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
