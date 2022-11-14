import { useCallback, useState } from 'react'

/**
 * Hook to call apiService
 * Manage state of api call: is loading, is error, or loaded with data
 * Also allow user to retry to call a api service if any error occurred
 */

export const useApi = <T>(apiService: (...args: any[]) => Promise<any>) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState<T | undefined>(undefined)

  /**
   * load data. wrap in useCallback to avoid function re-created after each render
   */
  const loadData = useCallback(
    async (...args: any[]) => {
      setIsError(false)
      setIsLoading(true)
      setData(undefined)
      try {
        const result = await apiService(...args)
        if (result instanceof Error) {
          setIsError(true)
        } else {
          setData(result as T)
        }
      } catch (err) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    },
    [apiService]
  )

  return { isLoading, isError, data, loadData }
}
