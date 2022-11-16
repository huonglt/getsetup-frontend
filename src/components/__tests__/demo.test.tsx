import { AvailabilityList } from '../AvailabilityList'
import { render, screen } from '@testing-library/react'
import React from 'react'

const guideAvailability = {
  userId: 1,
  weekNumber: 1,
  availability: [
    {
      from: new Date(2022, 10, 16, 8, 0, 0), // 16 Nov 2022 8am
      to: new Date(2022, 10, 16, 9, 0, 0) // 16 Nov 2022 9am
    }
  ]
}
describe('AvailabilityList', () => {
  it('match snapshot', () => {
    const { container } = render(
      <AvailabilityList guideAvailability={guideAvailability} />
    )
    expect(container).toMatchSnapshot()
  })

  it('render correctly', () => {
    render(<AvailabilityList guideAvailability={guideAvailability} />)
    expect(
      screen.getByText('Teaching Availability for userId 1 for the week #1')
    ).toBeInTheDocument()
    expect(screen.getByText('Wed Nov 16 2022 8:00 am - 9:00 am'))
  })
})
