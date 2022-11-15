import { getWeekDays } from '../apis/week'
import { useApi } from './useApi'

export const useWeekDays = () => {
  const {
    isLoading,
    isError,
    data: weekDays,
    loadData: loadWeekDays
  } = useApi<Date[]>(getWeekDays)

  return { isLoading, isError, weekDays, loadWeekDays }
}
