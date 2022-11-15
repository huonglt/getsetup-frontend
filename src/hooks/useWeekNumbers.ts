import { getWeekNumbers } from '../apis/week'
import { AvailabilityWeek } from '../types/guide'
import { useApi } from './useApi'

export const useWeekNumbers = () => {
  const {
    isLoading,
    isError,
    data: weekNumbers,
    loadData: loadWeekNumbers
  } = useApi<AvailabilityWeek[]>(getWeekNumbers)

  return { isLoading, isError, weekNumbers, loadWeekNumbers }
}
