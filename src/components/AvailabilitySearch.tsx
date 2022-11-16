import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
  Button
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getGuideAvailability } from '../apis/availability'
import { useApi } from '../hooks/useApi'
import { GuideAvailability } from '../types/guide'
import { formatAvailabilityWeek } from '../util/util'
import '../css/availability.css'
import { AvailabilityList } from './AvailabilityList'
import { useAvailabilityWeeks } from '../hooks/useAvailabilityWeeks'
import { useGuideList } from '../hooks/useGuideList'

type Props = {
  userId: number | null
  weekNumber: number | null
  goToUpdatePage: () => void
  onUserIdChange: (userId: number) => void
  onWeekNumberChange: (weekNumber: number) => void
}

/**
 * UI to search or update teaching availability
 */
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
    loadData: loadTeachingAvailability
  } = useApi<GuideAvailability>(getGuideAvailability)
  const { availabilityWeeks, loadAvailabilityWeeks } = useAvailabilityWeeks()
  const { guideList, loadGuideList } = useGuideList()
  const [errMessage, setErrMessage] = useState('')

  /**
   * Load guide list & availability weeks from backend when mounted
   */
  useEffect(() => {
    loadAvailabilityWeeks()
    loadGuideList()
  }, [])

  const handleGuideChange = (event: SelectChangeEvent) => {
    onUserIdChange(Number(event.target.value))
  }

  const handleWeekChange = (event: SelectChangeEvent) => {
    onWeekNumberChange(Number(event.target.value))
  }

  /**
   * Check if form is valid. If form invalid, an error message is shown
   */
  const validateForm = () => {
    if (!userId) {
      setErrMessage('Please select guide')
      return false
    }
    if (!weekNumber) {
      setErrMessage('Please select week number')
      return false
    }
    setErrMessage('')
    return true
  }

  const handleViewAvailability = () => {
    const isValid = validateForm()
    if (isValid) {
      loadTeachingAvailability(userId, weekNumber)
    }
  }

  const handleUpdateAvailability = () => {
    const isValid = validateForm()
    if (isValid) {
      goToUpdatePage()
    }
  }

  const noTeachingAvailabilityFound =
    !isError && !isLoading && guideAvailability === null
  const showTeachingAvailability = !isError && !isLoading && guideAvailability

  return (
    <div className="container">
      <Typography>Select guide:</Typography>
      <FormControl>
        <Select onChange={handleGuideChange} value={String(userId)}>
          {guideList &&
            guideList.map((guide) => (
              <MenuItem value={guide.userId} key={guide.userId}>
                {guide.userName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Typography>Select week number:</Typography>
      <FormControl>
        <Select value={String(weekNumber)} onChange={handleWeekChange}>
          {availabilityWeeks &&
            availabilityWeeks.map((week) => (
              <MenuItem value={week.weekNumber} key={week.weekNumber}>
                {formatAvailabilityWeek(week)}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Box className="buttonContainer">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleViewAvailability}
          className="button"
        >
          View Teaching Availability
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={handleUpdateAvailability}
        >
          Update Teaching Availability
        </Button>
      </Box>
      {errMessage && <Typography color="red">{errMessage}</Typography>}
      {noTeachingAvailabilityFound && (
        <Typography>No teaching availability data found</Typography>
      )}
      {showTeachingAvailability && (
        <AvailabilityList guideAvailability={guideAvailability} />
      )}
    </div>
  )
}
