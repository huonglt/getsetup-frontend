import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
  Box
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
  dateList: Date[]
  index: number
  onChange: (changedRow: any) => void
  onRemove: (index: number) => void
  availability?: AvailableTime
}
export const AvailabilityRow = (props: Props) => {
  const { dateList, index, onRemove, availability } = props

  // extract day from field from so the day drop down is pre-selected with correct value
  const initialDay = availability?.from ? formatDate(availability.from) : ''
  const initialFrom = availability?.from ? dayjs(availability.from) : null
  const initialTo = availability?.to ? dayjs(availability.to) : null

  const [day, setDay] = useState(initialDay)
  const [from, setFrom] = useState<Dayjs | null>(initialFrom)
  const [to, setTo] = useState<Dayjs | null>(initialTo)

  const { setValue } = useFormContext()

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string)
  }

  const handleFromChange = (timePickerValue: Dayjs | null) => {
    let selectedDay = null
    if (day && timePickerValue) {
      selectedDay = new Date(day)
      selectedDay.setHours(timePickerValue.hour())
      selectedDay.setMinutes(timePickerValue.minute())
    }
    const newFrom = selectedDay ? dayjs(selectedDay) : timePickerValue
    // update the from time picker field
    setFrom(newFrom)
    // update the from field of record availabilities[index]
    setValue(`availabilities[${index}].from`, newFrom)
  }

  const handleToChange = (timePickerValue: Dayjs | null) => {
    let selectedDay = null
    if (day && timePickerValue) {
      selectedDay = new Date(day)
      selectedDay.setHours(timePickerValue.hour())
      selectedDay.setMinutes(timePickerValue.minute())
    }
    const newTo = selectedDay ? dayjs(selectedDay) : timePickerValue
    // update the to time picker field
    setTo(newTo)
    // update the to field of record availabilities[index]s
    setValue(`availabilities[${index}].to`, newTo)
  }

  /**
   * Remove a availability row in the list
   */
  const handleRemove = () => {
    onRemove(index)
  }

  return (
    <Box className="rowContainer">
      <FormControl className="fullWidth">
        <InputLabel>Select day</InputLabel>
        <Select label="Select day" value={day} onChange={handleDayChange}>
          {dateList.map((date, i) => {
            const formattedDate = formatDate(date)
            return (
              <MenuItem value={formattedDate} key={formattedDate}>
                {formattedDate}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Time"
          value={from}
          onChange={handleFromChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Time"
          value={to}
          onChange={handleToChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button onClick={handleRemove}>Remove</Button>
    </Box>
  )
}
