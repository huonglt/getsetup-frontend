import { Box, Button } from '@mui/material'
import React from 'react'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import { AvailableTime, GuideAvailability } from '../types/guide'
import { AvailabilityRow } from './AvailabilityRow'
import '../css/availabilityRows.css'
import guideAvailabilitySchema from '../validations/guideAvailability'
import { yupResolver } from '@hookform/resolvers/yup'
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

type AvailableTimeWithDay = {
  from: Date | null
  to: Date | null
  day: string
}
type FormValues = {
  availability: AvailableTimeWithDay[]
}

export const AvailabilityRows = (props: Props) => {
  const { userId, weekNumber, initialData, submitAvailability } = props
  const useFormReturn = useForm<FormValues>({
    resolver: yupResolver(guideAvailabilitySchema),
    defaultValues: {
      availability: initialData
    }
  })

  const {
    control,
    getValues,
    trigger,
    formState: { errors }
  } = useFormReturn

  const { append, remove, fields, update } = useFieldArray({
    control,
    name: 'availability'
  })

  const addAvailability = () => {
    const newAvailability = {
      from: null,
      to: null,
      day: ''
    }
    append(newAvailability)
  }

  const removeAvailability = (index: number) => {
    remove(index)
  }
  const updateAvailability = (
    index: number,
    changedAvailability: AvailableTimeWithDay
  ) => {
    update(index, changedAvailability)
  }
  const handleSubmitAvailability = async () => {
    const isValid = await trigger('availability')
    if (!isValid) {
      return
    }
    const availability = getValues('availability')
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
          const updateRow = (changedRow: AvailableTimeWithDay) => {
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

        <Button variant="text" onClick={addAvailability} className="fitContent">
          + Add availability
        </Button>

        <Box className="buttonContainer">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitAvailability}
            className="button"
          >
            Submit availability
          </Button>
        </Box>
      </Box>
    </FormProvider>
  )
}
