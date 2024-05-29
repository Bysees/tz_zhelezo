import { useLayoutEffect } from 'react'

type UniqKey = string

export const useScrollRestoration = (uniqKey: UniqKey) => {
  uniqKey = `scroll-position-[${uniqKey}]`

  useLayoutEffect(() => {
    const scrollPos = sessionStorage.getItem(uniqKey)

    if (scrollPos) {
      window.scrollTo(0, Number(scrollPos))
      sessionStorage.removeItem(uniqKey)
    }
    
    return () => {
      sessionStorage.setItem(uniqKey, String(window.scrollY))
    }
  }, [uniqKey])
}