import React, { useState } from 'react'
import { Availability } from './Availability'
import { UpdateAvailability } from './UpdateAvailability'

export const GuideDashboard = () => {
  const [currentPage, setCurrentPage] = useState('retrieve')
  const [userId, setUserId] = useState<number | null>(null)
  const [weekNumber, setWeekNumber] = useState<number | null>(null)

  const goToUpdatePage = () => {
    setCurrentPage('update')
  }
  const goToMainPage = () => {
    setCurrentPage('retrieve')
  }

  // Only go to update availability page when user selected an user and a week number
  if (currentPage === 'update' && userId && weekNumber) {
    return (
      <UpdateAvailability
        userId={userId}
        weekNumber={weekNumber}
        goBack={goToMainPage}
      />
    )
  }
  return (
    <Availability
      goToUpdatePage={goToUpdatePage}
      userId={userId}
      weekNumber={weekNumber}
      onUserIdChange={setUserId}
      onWeekNumberChange={setWeekNumber}
    />
  )
}
