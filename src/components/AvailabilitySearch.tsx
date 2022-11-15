import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
  Button
} from '@mui/material'
import React from 'react'
import { getGuideAvailability } from '../apis/guide'
import { useApi } from '../hooks/useApi'
import { GuideAvailability } from '../types/guide'
import { formatMonToSun, guideList, weekData } from '../util/util'
import '../css/availability.css'
import { AvailabilityList } from './AvailabilityList'

type Props = {
  userId: number | null
  weekNumber: number | null
  goToUpdatePage: () => void
  onUserIdChange: (userId: number) => void
  onWeekNumberChange: (weekNumber: number) => void
}
export const AvailabilitySearch = (props: Props) => {
  const {
    userId,
    weekNumber,
    goToUpdatePage,
    onUserIdChange,
    onWeekNumberChange
  } = props
  const {
    isLoading,
    isError,
    data: guideAvailability,
    loadData: retrieveTeachingAvailability
  } = useApi<GuideAvailability>(getGuideAvailability)

  const handleGuideChange = (event: SelectChangeEvent) => {
    onUserIdChange(Number(event.target.value))
  }

  const handleWeekChange = (event: SelectChangeEvent) => {
    onWeekNumberChange(Number(event.target.value))
  }

  const handleRetrieveAvailability = () => {
    retrieveTeachingAvailability(userId, weekNumber)
  }

  const noTeachingAvailabilityFound =
    !isError && !isLoading && guideAvailability === null
  const showTeachingAvailability = !isError && !isLoading && guideAvailability

  return (
    <div className="container">
      <Typography>Select guide:</Typography>
      <FormControl>
        <Select onChange={handleGuideChange} value={String(userId)}>
          {guideList.map((guide) => (
            <MenuItem value={guide.userId} key={guide.userId}>
              {guide.userName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>Select week number:</Typography>
      <FormControl>
        <Select value={String(weekNumber)} onChange={handleWeekChange}>
          {weekData.map((week) => (
            <MenuItem value={week.weekNumber} key={week.weekNumber}>
              Week {week.weekNumber}: {formatMonToSun(week.monday, week.sunday)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box className="buttonContainer">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRetrieveAvailability}
          className="button"
        >
          View Teaching Availability
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={goToUpdatePage}
        >
          Update Teaching Availability
        </Button>
      </Box>
      {noTeachingAvailabilityFound && (
        <Typography>No teaching availability data found</Typography>
      )}
      {showTeachingAvailability && (
        <AvailabilityList guideAvailability={guideAvailability} />
      )}
    </div>
  )
}
