import { getWeekDays } from '../apis/week'
import { useApi } from './useApi'

/**
 * Hook to load week days of a given week
 */
export const useWeekDays = () => {
  const {
    isLoading,
    isError,
    data: weekDays,
    loadData: loadWeekDays
  } = useApi<Date[]>(getWeekDays)

  return { isLoading, isError, weekDays, loadWeekDays }
}
