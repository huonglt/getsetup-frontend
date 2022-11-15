import React, { useEffect, useRef } from 'react'

/**
 * Hook to check if component is mounted or not
 */
export const useIsMounted = () => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  })

  return isMounted
}
