import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import { AvailableTime, GuideAvailability } from '../types/guide'
import { AvailabilityRow } from './AvailabilityRow'
import '../css/availabilityRows.css'
import guideAvailabilitySchema from '../validations/guideAvailability'
import { yupResolver } from '@hookform/resolvers/yup'
import { useWeekDays } from '../hooks/useWeekDays'
import { getWeekDays } from '../apis/week'
type Props = {
  userId: number
  weekNumber: number
  submitAvailability: (guideAvailability: GuideAvailability) => void
  initialData: AvailableTime[] | undefined
}

/**
 * UI extract day out of from field, so add day field to AvailableTime
 */
type AvailabilityItem = AvailableTime & {
  day: string
}
type FormValues = {
  availability: AvailabilityItem[]
}

const emptyRow = {
  from: null,
  to: null,
  day: ''
}
export const AvailabilityRows = (props: Props) => {
  const {
    userId,
    weekNumber,
    submitAvailability,
    initialData = [emptyRow]
  } = props
  const { weekDays, loadWeekDays } = useWeekDays()

  useEffect(() => {
    loadWeekDays(weekNumber)
  }, [])

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
    append(emptyRow)
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
              weekDays={weekDays}
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
