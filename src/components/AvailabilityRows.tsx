import { Box, Button } from '@mui/material'
import React from 'react'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import { AvailableTime, GuideAvailability } from '../types/guide'
import { AvailabilityRow } from './AvailabilityRow'
import '../css/availabilityRows.css'

type Props = {
  userId: number
  weekNumber: number
  submitAvailability: (guideAvailability: GuideAvailability) => void
  initialData: AvailableTime[] | undefined
}
const dateList = [
  new Date(2022, 10, 14),
  new Date(2022, 10, 15),
  new Date(2022, 10, 16),
  new Date(2022, 10, 17),
  new Date(2022, 10, 18),
  new Date(2022, 10, 19),
  new Date(2022, 10, 20)
]

type FormValues = {
  availabilities: AvailableTime[]
}

export const AvailabilityRows = (props: Props) => {
  const { userId, weekNumber, initialData, submitAvailability } = props
  const useFormReturn = useForm<FormValues>({
    defaultValues: {
      availabilities: initialData
    }
  })

  const { control, getValues } = useFormReturn

  const { append, remove, fields, update } = useFieldArray({
    control,
    name: 'availabilities'
  })

  const addAvailability = () => {
    const newAvailability = {
      from: null,
      to: null
    }
    append(newAvailability)
  }

  const removeAvailability = (index: number) => {
    remove(index)
  }
  const updateAvailability = (
    index: number,
    changedAvailability: AvailableTime
  ) => {
    update(index, changedAvailability)
  }
  const handleSubmitAvailability = async () => {
    const availability = getValues('availabilities')
    const guideAvailability = {
      userId,
      weekNumber,
      availability
    }
    submitAvailability(guideAvailability)
  }
  return (
    <FormProvider {...useFormReturn}>
      <Box className="container">
        {fields.map((availability, index) => {
          const removeRow = () => {
            removeAvailability(index)
          }
          const updateRow = (changedRow: AvailableTime) => {
            updateAvailability(index, changedRow)
          }
          const data = { from: availability.from, to: availability.to }
          return (
            <AvailabilityRow
              dateList={dateList}
              index={index}
              onChange={updateRow}
              onRemove={removeRow}
              key={availability.id}
              availability={data}
            />
          )
        })}
        <div className="buttonContainer">
          <Button
            variant="outlined"
            onClick={addAvailability}
            className="button"
          >
            Add availability
          </Button>
          <Button
            variant="outlined"
            onClick={handleSubmitAvailability}
            className="button"
          >
            Submit availability
          </Button>
        </div>
      </Box>
    </FormProvider>
  )
}
