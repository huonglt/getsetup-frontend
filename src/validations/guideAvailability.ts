import * as yup from 'yup'

/**
 * Validation schema for bedroom arrangement task
 * Support multiples rooms, each room has multiple beds
 */
const guideAvailabilitySchema = yup.object({
  availability: yup.array().of(
    yup.object({
      day: yup.string().required('Please select a day'),
      from: yup
        .string()
        .nullable(true)
        .test('ValidDate', 'Please select from time', (value) => {
          return !isNaN(Date.parse(value as string))
        }),
      to: yup
        .string()
        .nullable(true)
        .test('ValidDate', 'Please select to time', (value) => {
          return !isNaN(Date.parse(value as string))
        })
    })
  )
})

export default guideAvailabilitySchema
