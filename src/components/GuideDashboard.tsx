import React, { useState } from 'react'
import { Availability } from './Availability'
import { UpdateAvailability } from './UpdateAvailability'

export const GuideDashboard = () => {
  const [currentPage, setCurrentPage] = useState('retrieve')
  const [userId, setUserId] = useState<number | null>(null)
  const [weekNumber, setWeekNumber] = useState<number | null>(null)

  const goToUpdatePage = (userId: number, weekNumber: number) => {
    setUserId(userId)
    setWeekNumber(weekNumber)
    setCurrentPage('submit')
  }
  const goToMainPage = () => {
    setCurrentPage('retrieve')
  }

  if (currentPage === 'submit' && userId && weekNumber) {
    return (
      <UpdateAvailability
        userId={userId}
        weekNumber={weekNumber}
        goBack={goToMainPage}
      />
    )
  }
  return <Availability onClickSubmit={goToUpdatePage} />
}
