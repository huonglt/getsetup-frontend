import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import { AvailabilityRow } from './AvailabilityRow'
type Row = {
  from: Date | null
  to: Date | null
}
type Props = {
  rows: Row[] | undefined
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
  availabilities: Row[]
}

const defaultValues = [
  {
    from: new Date(2022, 10, 14, 8, 0),
    to: new Date(2022, 10, 14, 9, 0)
  },
  {
    from: new Date(2022, 10, 15, 8, 0),
    to: new Date(2022, 10, 15, 9, 0)
  }
]
export const AvailabilityRows = (props: Props) => {
  const useFormReturn = useForm<FormValues>({
    defaultValues: {
      availabilities: defaultValues //[{ from: null, to: null }]
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
  const updateAvailability = (index: number, changedAvailability: Row) => {
    update(index, changedAvailability)
  }
  const subitAvailability = () => {
    const data = getValues('availabilities')
    console.log(`data = ${JSON.stringify(data)}`)
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
          const updateRow = (changedRow: Row) => {
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
            onClick={subitAvailability}
            style={{ width: '300px' }}
          >
            Submit availability
          </Button>
        </div>
      </Box>
    </FormProvider>
  )
}
