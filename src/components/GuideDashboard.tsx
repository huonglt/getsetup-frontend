import React, { useState } from 'react'
import { AvailabilitySearch } from './AvailabilitySearch'
import { UpdateAvailability } from './UpdateAvailability'

/**
 * The dashboard UI for teaching availability
 */
export const GuideDashboard = () => {
  const [currentPage, setCurrentPage] = useState('search')
  const [userId, setUserId] = useState<number | null>(null)
  const [weekNumber, setWeekNumber] = useState<number | null>(null)

  const goToUpdatePage = () => {
    setCurrentPage('update')
  }
  const goToSearchPage = () => {
    setCurrentPage('search')
  }

  // Only go to update availability page when user selected an user and a week number
  if (currentPage === 'update' && userId && weekNumber) {
    return (
      <UpdateAvailability
        userId={userId}
        weekNumber={weekNumber}
        goToSearchPage={goToSearchPage}
      />
    )
  }

  // main page is search page
  return (
    <AvailabilitySearch
      goToUpdatePage={goToUpdatePage}
      userId={userId}
      weekNumber={weekNumber}
      onUserIdChange={setUserId}
      onWeekNumberChange={setWeekNumber}
    />
  )
}
