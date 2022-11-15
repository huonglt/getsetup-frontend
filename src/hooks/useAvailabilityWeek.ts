import { getAvailabilityWeeks } from '../apis/week'
import { AvailabilityWeek } from '../types/guide'
import { useApi } from './useApi'

export const useAvailabilityWeek = () => {
  const {
    isLoading,
    isError,
    data: availabilityWeeks,
    loadData: loadAvailabilityWeeks
  } = useApi<AvailabilityWeek[]>(getAvailabilityWeeks)

  return { isLoading, isError, availabilityWeeks, loadAvailabilityWeeks }
}
