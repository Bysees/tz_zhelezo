import { TPhoto } from 'shared/types'
import { extractPages } from 'shared/utils'

export const BASE_URL = 'https://jsonplaceholder.typicode.com'

export type FetchPhotoListParams = {
  page: number
  limit?: number
  signal?: AbortSignal
}

export type PhotoListResponse = {
  photoList: TPhoto[]
  totalCount: number
  firstPage?: number
  prevPage?: number
  nextPage?: number
  lastPage: number
}

export const fetchPhotoList = async (params: FetchPhotoListParams): Promise<PhotoListResponse> => {
  const { limit = 10, page, signal } = params

  const response = await fetch(`${BASE_URL}/albums/1/photos/?_page=${page}_limit=${limit}`, {
    signal
  })

  const photoList: TPhoto[] = await response.json()
  
  const totalCount = +response?.headers.get('x-total-count')!
  const links = response?.headers.get('Link')?.split(',')!
  const { last, first, next, prev } = extractPages(links)
  
  return {
    photoList,
    totalCount,
    firstPage: first,
    prevPage: prev,
    nextPage: next,
    lastPage: last
  }
}
