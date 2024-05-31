import { fireEvent, render, screen } from '@testing-library/react'
import { usePhotosHandlers } from 'entities/photos'
import { FavoritePhotoButton } from '../favorite.button'

vitest.mock('entities/photos')

describe('FavoritePhotoButton', () => {
  const id = 10
  
  test('Функция toggleFavoritePhoto вызывается с корректным id при клике', () => {
    const toggleFavoritePhoto = vitest.fn()
    const checkIsFavorite = vitest.fn().mockReturnValue(false)

    // @ts-expect-error
    usePhotosHandlers.mockReturnValue({ toggleFavoritePhoto, checkIsFavorite })

    render(<FavoritePhotoButton id={id} />)

    const button = screen.getByTestId('favorite-photo-button') as HTMLButtonElement

    fireEvent.click(button)

    expect(toggleFavoritePhoto).toHaveBeenCalledTimes(1)
    expect(toggleFavoritePhoto).toHaveBeenCalledWith(id)
  })

  test('Иконка heart изменяется при нескольких вызовов функции checkIsFavorite с одинаковым id', () => {
    const checkIsFavorite = vitest.fn()
    const id = 10

    //@ts-expect-error
    usePhotosHandlers.mockReturnValue({ checkIsFavorite })

    checkIsFavorite.mockReturnValue(false)
    const { rerender } = render(<FavoritePhotoButton id={id} />)

    const button = screen.getByTestId('favorite-photo-button') as HTMLButtonElement
    const icon = button.firstElementChild

    //* data-prefix="far" -> empty heart icon
    expect(icon).toContainElement(document.querySelector('[data-prefix="far"]'))
    expect(icon).toContainElement(document.querySelector('[data-icon="heart"]'))

    checkIsFavorite.mockReturnValue(true)
    rerender(<FavoritePhotoButton id={id} />)

    //* data-prefix="fas" -> filled heart icon
    expect(icon).toContainElement(document.querySelector('[data-prefix="fas"]'))
    expect(icon).toContainElement(document.querySelector('[data-icon="heart"]'))
  })
})
