import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import { submitAvailability } from '../apis/submitAvailability'
import { useApi } from '../hooks/useApi'
import { AvailableTime, GuideAvailability } from '../types/guide'
import { AvailabilityRow } from './AvailabilityRow'
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
    console.log(`guideAvailability = ${JSON.stringify(guideAvailability)}`)
    submitAvailability(guideAvailability)
  }
  return (
    <FormProvider {...useFormReturn}>
      <Box
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          marginTop: '8px'
        }}
      >
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
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '30px'
          }}
        >
          <Button
            variant="outlined"
            onClick={addAvailability}
            style={{ width: '300px' }}
          >
            Add availability
          </Button>
          <Button
            variant="outlined"
            onClick={handleSubmitAvailability}
            style={{ width: '300px' }}
          >
            Submit availability
          </Button>
        </div>
      </Box>
    </FormProvider>
  )
}
