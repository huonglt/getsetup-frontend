import { getAvailabilityWeeks } from '../apis/week'
import { AvailabilityWeek } from '../types/guide'
import { useApi } from './useApi'

/**
 * Hook to get availability weeks fron backend
 */
export const useAvailabilityWeeks = () => {
  const {
    isLoading,
    isError,
    data: availabilityWeeks,
    loadData: loadAvailabilityWeeks
  } = useApi<AvailabilityWeek[]>(getAvailabilityWeeks)

  return { isLoading, isError, availabilityWeeks, loadAvailabilityWeeks }
}
