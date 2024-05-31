import { renderHook, act } from '@testing-library/react'
import { photoList as mockPhotoList } from './mock'
import { PhotosContextProvider, usePhotosHandlers, usePhotosValues } from '../photos.context'

describe('PhotosContextProvider', () => {
  test('Функция addPhotos добавляет данные в массив photoList', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PhotosContextProvider>{children}</PhotosContextProvider>
    )

    const { result } = renderHook(
      () => ({
        handlers: usePhotosHandlers(),
        values: usePhotosValues()
      }),
      { wrapper }
    )

    expect(result.current.values.photoList).toEqual([])

    const portion1 = mockPhotoList.slice(0, 5)
    const portion2 = mockPhotoList.slice(5)

    act(() => {
      result.current.handlers.addPhotos(portion1)
    })

    expect(result.current.values.photoList.length).toEqual(portion1.length)
    expect(result.current.values.photoList).toEqual(portion1)

    act(() => {
      result.current.handlers.addPhotos(portion2)
    })

    expect(result.current.values.photoList.length).toEqual(mockPhotoList.length)
    expect(result.current.values.photoList).toEqual(mockPhotoList)
  })

  test('Функция toggleFavoritePhoto добавляет/убирает избранные элементы в массиве favoritePhotoList', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PhotosContextProvider initialPhotoList={mockPhotoList}>{children}</PhotosContextProvider>
    )

    const { result } = renderHook(
      () => ({
        handlers: usePhotosHandlers(),
        values: usePhotosValues()
      }),
      { wrapper }
    )

    const favoriteItem1 = mockPhotoList[0]
    const favoriteItem2 = mockPhotoList[5]
    const favoriteId1 = favoriteItem1.id
    const favoriteId2 = favoriteItem2.id

    act(() => {
      result.current.handlers.toggleFavoritePhoto(favoriteId1)
      result.current.handlers.toggleFavoritePhoto(favoriteId2)
    })

    expect(result.current.values.favoritePhotoList.length).toBe(2)
    expect(result.current.values.favoritePhotoList).toEqual([favoriteItem1, favoriteItem2])

    act(() => {
      result.current.handlers.toggleFavoritePhoto(favoriteId1)
    })

    expect(result.current.values.favoritePhotoList.length).toBe(1)
    expect(result.current.values.favoritePhotoList).toEqual([favoriteItem2])
  })
})
