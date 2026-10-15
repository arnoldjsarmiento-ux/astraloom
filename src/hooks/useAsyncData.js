import { useEffect, useRef, useState } from 'react'

// Runs `fetcher` once on mount. `initialData` renders immediately so sections
// never flash a spinner; the fetched result replaces it when it arrives.
export function useAsyncData(fetcher, initialData = null) {
  const [data, setData] = useState(initialData)
  const [error, setError] = useState(null)
  const fetcherRef = useRef(fetcher)

  useEffect(() => {
    let cancelled = false
    fetcherRef
      .current()
      .then((result) => {
        if (!cancelled && result != null) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error('An error occurred'))
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, error }
}
