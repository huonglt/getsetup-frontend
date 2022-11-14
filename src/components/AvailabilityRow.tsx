import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useThemeProps,
  TextField,
  Button
} from '@mui/material'
import React, { useState } from 'react'

import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useFormContext } from 'react-hook-form'
import { AvailableTime } from '../types/guide'
type Props = {
  dateList: Date[]
  index: number
  onChange: (changedRow: any) => void
  onRemove: (index: number) => void
  availability?: AvailableTime
}
export const AvailabilityRow = (props: Props) => {
  const { control, register, getValues, setValue, formState, clearErrors } =
    useFormContext()

  const { dateList, onChange, index, onRemove, availability } = props

  const initialDay =
    availability?.from && availability?.from?.toDateString
      ? availability.from.toDateString()
      : ''
  const [day, setDay] = useState(initialDay)

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string)
  }
  const [from, setFrom] = React.useState<Dayjs | null>(() =>
    availability?.from ? dayjs(availability.from) : null
  )
  const [to, setTo] = React.useState<Dayjs | null>(() =>
    availability?.to ? dayjs(availability.to) : null
  )

  const handleFromChange = (newValue: Dayjs | null) => {
    let selectedDay = null
    if (day) {
      selectedDay = new Date(day)
      if (newValue) {
        selectedDay.setHours(newValue.hour())
        selectedDay.setMinutes(newValue.minute())
      }
    }
    const temp = selectedDay ? dayjs(selectedDay) : newValue
    setFrom(temp)
    setValue(`availabilities[${index}].from`, newValue)
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
    const temp = selectedDay ? dayjs(selectedDay) : newValue
    setTo(temp)
    setValue(`availabilities[${index}].to`, newValue)
  }

  const handleRemove = () => {
    onRemove(index)
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        flex: 1,
        marginBottom: '10px',
        gap: '8px'
      }}
    >
      <FormControl style={{ width: '100%' }}>
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
    </div>
  )
}
