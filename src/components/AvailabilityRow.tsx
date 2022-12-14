import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useFormContext } from 'react-hook-form'
import { AvailableTime } from '../types/guide'
import '../css/availabilityRow.css'
import { formatDate } from '../util/util'

type Props = {
  weekDays: Date[] | undefined
  index: number
  onChange: (changedRow: any) => void
  onRemove: (index: number) => void
  availability?: AvailableTime
}

/**
 * UI to show an availability timeslot for a teacher
 */
export const AvailabilityRow = (props: Props) => {
  const { weekDays, index, onRemove, availability } = props

  // extract day from field from so the day drop down is pre-selected with correct value
  const initialDay = availability?.from ? formatDate(availability.from) : ''
  const initialFrom = availability?.from ? dayjs(availability.from) : null
  const initialTo = availability?.to ? dayjs(availability.to) : null

  const [day, setDay] = useState(initialDay)
  const [from, setFrom] = useState<Dayjs | null>(initialFrom)
  const [to, setTo] = useState<Dayjs | null>(initialTo)

  const {
    setValue,
    register,
    formState: { errors }
  } = useFormContext()

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string)
  }

  /**
   * From field change handler
   */
  const handleFromChange = (timePickerValue: Dayjs | null) => {
    let selectedDay = null

    // from will have value of day from the dropdown, and hour & minute from the picker
    if (day && timePickerValue) {
      selectedDay = new Date(day)
      selectedDay.setHours(timePickerValue.hour())
      selectedDay.setMinutes(timePickerValue.minute())
    }
    const newFrom = selectedDay ? dayjs(selectedDay) : timePickerValue
    // update the from time picker field
    setFrom(newFrom)
    // update the from field of record availabilities[index]
    setValue(`availability[${index}].from`, newFrom)
  }

  /**
   * To field change handler
   */
  const handleToChange = (timePickerValue: Dayjs | null) => {
    let selectedDay = null
    // to will have value of day from the dropdown, and hour & minute from the picker
    if (day && timePickerValue) {
      selectedDay = new Date(day)
      selectedDay.setHours(timePickerValue.hour())
      selectedDay.setMinutes(timePickerValue.minute())
    }
    const newTo = selectedDay ? dayjs(selectedDay) : timePickerValue
    // update the to time picker field
    setTo(newTo)
    // update the to field of record availabilities[index]s
    setValue(`availability[${index}].to`, newTo)
  }

  /**
   * Remove a availability row in the list
   */
  const handleRemove = () => {
    onRemove(index)
  }
  // @ts-ignore: Unreachable code error
  const validationError = errors.availability?.[index]

  return (
    <Box className="rowContainer">
      <FormControl className="fullWidth">
        <InputLabel>Select day</InputLabel>
        <Select
          label="Select day"
          value={day}
          onChange={handleDayChange}
          inputProps={{ ...register(`availability[${index}].day`) }}
        >
          {weekDays &&
            weekDays.map((date) => {
              const formattedDate = formatDate(date)
              return (
                <MenuItem value={formattedDate} key={formattedDate}>
                  {formattedDate}
                </MenuItem>
              )
            })}
        </Select>
        {validationError?.day && (
          <Typography color="red">{validationError.day.message}</Typography>
        )}
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl className="timePicker">
          <TimePicker
            label="Time"
            value={from}
            onChange={handleFromChange}
            renderInput={(params) => <TextField {...params} />}
            InputProps={{ ...register(`availability[${index}].from`) }}
          />
          {validationError?.from && (
            <Typography color="red">{validationError.from.message}</Typography>
          )}
        </FormControl>
        <FormControl className="timePicker">
          <TimePicker
            label="Time"
            value={to}
            onChange={handleToChange}
            renderInput={(params) => <TextField {...params} />}
            InputProps={{ ...register(`availability[${index}].to`) }}
          />
          {validationError?.to && (
            <Typography color="red">{validationError.to.message}</Typography>
          )}
        </FormControl>
      </LocalizationProvider>
      <Button onClick={handleRemove}>Remove</Button>
    </Box>
  )
}
