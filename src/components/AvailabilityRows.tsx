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

type AvailabilityItem = {
  from: Date | null
  to: Date | null
  day: string
}
type FormValues = {
  availability: AvailabilityItem[]
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

  /**
   * Add a new blank availability to the fields object
   */
  const addAvailability = () => {
    const newAvailability = {
      from: null,
      to: null,
      day: ''
    }
    append(newAvailability)
  }

  /**
   * Remove an availability from fields object
   */
  const removeAvailability = (index: number) => {
    remove(index)
  }

  /**
   * Update availability in fields object
   */
  const updateAvailability = (
    index: number,
    changedAvailability: AvailabilityItem
  ) => {
    update(index, changedAvailability)
  }

  /**
   * Submit availability button handler
   * Validate form before submssion
   * If form invlid, exit, and show validation error message
   * If form valid, send a post request to update teaching availability
   */
  const handleSubmitAvailability = async () => {
    // trigger form validation
    const isValid = await trigger('availability')
    if (!isValid) {
      return
    }

    // form valid, call api to update availability
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
          const updateRow = (changedRow: AvailabilityItem) => {
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
