import * as yup from 'yup'

/**
 * Validation schema to submit teaching availability
 * It it an array if {day, from, to}
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
