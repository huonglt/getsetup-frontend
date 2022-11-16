import { getGuideList } from '../apis/guide'
import { Guide } from '../types/guide'
import { useApi } from './useApi'

/**
 * Hook to get guide list from backend
 */
export const useGuideList = () => {
  const {
    isLoading,
    isError,
    data: guideList,
    loadData: loadGuideList
  } = useApi<Guide[]>(getGuideList)

  return { isLoading, isError, guideList, loadGuideList }
}
