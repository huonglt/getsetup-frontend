import { getWeekNumbers } from '../apis/week'
import { WeekNumber } from '../types/guide'
import { useApi } from './useApi'

export const useWeekNumbers = () => {
  const {
    isLoading,
    isError,
    data: weekNumbers,
    loadData: loadWeekNumbers
  } = useApi<WeekNumber[]>(getWeekNumbers)

  return { isLoading, isError, weekNumbers, loadWeekNumbers }
}
