import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import { TPhoto } from 'shared/types'

export type PhotosContextHandlersType = {
  toggleFavoritePhoto: (id: TPhoto['id']) => void
  checkIsFavorite: (id: TPhoto['id']) => boolean
  addPhotos: (newPhotos: TPhoto[]) => void
  setPage: Dispatch<SetStateAction<number>>
  setLastPage: Dispatch<SetStateAction<number>>
}

export type PhotosContextValuesType = {
  favoritePhotoIds: Set<TPhoto['id']>
  photoList: TPhoto[]
  favoritePhotoList: TPhoto[]
  page: number
  lastPage: number
}

const PAGE = 1
const PhotosContextHandlers = createContext({} as PhotosContextHandlersType)
const PhotosContextValues = createContext({} as PhotosContextValuesType)

type PhotosContextProviderProps = PropsWithChildren & {
  initialPhotoList?: TPhoto[]
}

export const PhotosContextProvider = ({ children, initialPhotoList }: PhotosContextProviderProps) => {
  const [photoList, setPhotoList] = useState<TPhoto[]>(initialPhotoList ?? [])
  const [favoritePhotoIds, setFavoritePhotoIds] = useState<Set<TPhoto['id']>>(new Set())
  const [page, setPage] = useState(PAGE)
  const [lastPage, setLastPage] = useState(Infinity)

  const favoritePhotoList = useMemo(
    () => photoList.filter((photo) => favoritePhotoIds.has(photo.id)),
    [favoritePhotoIds]
  )

  const toggleFavoritePhoto = useCallback((id: TPhoto['id']) => {
    setFavoritePhotoIds((prevIds) => {
      const photoIds = new Set(prevIds)

      if (photoIds.has(id)) {
        photoIds.delete(id)
      } else {
        photoIds.add(id)
      }

      return photoIds
    })
  }, [])

  const checkIsFavorite = useCallback((id: TPhoto['id']) => favoritePhotoIds.has(id), [favoritePhotoIds])

  const addPhotos = useCallback((newPhotos: TPhoto[]) => {
    setPhotoList((prevPhotos) => [...prevPhotos, ...newPhotos])
  }, [])

  const handlers = useMemo(
    () => ({ addPhotos, checkIsFavorite, toggleFavoritePhoto, setPage, setLastPage }),
    [favoritePhotoIds]
  )

  const values = useMemo(
    () => ({ photoList, favoritePhotoList, favoritePhotoIds, page, lastPage }),
    [favoritePhotoIds, favoritePhotoList, photoList, page, lastPage]
  )

  return (
    <PhotosContextHandlers.Provider value={handlers}>
      <PhotosContextValues.Provider value={values}>{children}</PhotosContextValues.Provider>
    </PhotosContextHandlers.Provider>
  )
}

export const usePhotosHandlers = () => useContext(PhotosContextHandlers)
export const usePhotosValues = () => useContext(PhotosContextValues)
