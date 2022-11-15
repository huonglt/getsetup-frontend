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
  const { control, setValue, formState } = useFormContext()

  const { dateList, index, onRemove, availability } = props

  // extract day from field from so the day drop down is pre-selected with correct value
  const initialDay = availability?.from ? formatDate(availability.from) : ''
  const initialFrom = availability?.from ? dayjs(availability.from) : null
  const initialTo = availability?.to ? dayjs(availability.to) : null

  const [day, setDay] = useState(initialDay)
  const [from, setFrom] = React.useState<Dayjs | null>(initialFrom)
  const [to, setTo] = React.useState<Dayjs | null>(initialTo)

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string)
  }

  const handleFromChange = (newValue: Dayjs | null) => {
    let selectedDay = null
    if (day) {
      selectedDay = new Date(day)
      if (newValue) {
        selectedDay.setHours(newValue.hour())
        selectedDay.setMinutes(newValue.minute())
      }
    }
    const selectedFrom = selectedDay ? dayjs(selectedDay) : newValue
    // update the from time picker field
    setFrom(selectedFrom)
    // update the from field of record availabilities[index]
    setValue(`availabilities[${index}].from`, selectedFrom)
  }

  const handleToChange = (newValue: Dayjs | null) => {
    let selectedDay = null
    if (day) {
      selectedDay = new Date(day)
      if (newValue) {
        selectedDay.setHours(newValue.hour())
        selectedDay.setMinutes(newValue.minute())
      }
    }

    const selectedTo = selectedDay ? dayjs(selectedDay) : newValue
    // update the to time picker field
    setTo(selectedTo)
    // update the to field of record availabilities[index]
    setValue(`availabilities[${index}].to`, selectedTo)
  }

  const handleRemove = () => {
    onRemove(index)
  }

  return (
    <Box className="rowContainer">
      <FormControl className="fullWidth">
        <InputLabel>Select day</InputLabel>
        <Select label="Select day" value={day} onChange={handleDayChange}>
          {dateList.map((day, i) => (
            <MenuItem value={day.toDateString()} key={day.toDateString()}>
              {day.toDateString()}
            </MenuItem>
          ))}
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
