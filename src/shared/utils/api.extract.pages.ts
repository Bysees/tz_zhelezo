type Pages = {
  first?: number
  prev?: number
  next?: number
  last: number
}

export const extractPages = (links: string[]): Pages => {
  return links.reduce((acc, link) => {
    const match = link.match(/_page=(\d+)/)
    const rel = link.match(/rel="([^"]+)"/)

    if (match && rel) {
      const pageNumber = parseInt(match[1], 10)
      const relName = rel[1] as keyof Pages
      acc[relName] = pageNumber
    }

    return acc
  }, {} as Pages)
}