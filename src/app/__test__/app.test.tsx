import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockIsIntersecting } from 'react-intersection-observer/test-utils'
import { interceptors } from './interceptors'
import { photoList as mockPhotoList } from './mock'
import { PhotosContextProvider } from 'entities/photos'
import { routes } from 'app/router'
import { RoutePath } from 'shared/router'

const server = setupServer(...interceptors)

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Интеграционное взаимодействие DashboardPage и PhotosPage', () => {
  const photoListTestId = 'photo-list'
  const favoritePhotoButtonTestId = 'favorite-photo-button'
  const linkToPhotosTestId = 'link-photos'
  const linkToDashboardTestId = 'link-dashboard'
  const intersectTestId = 'intersect'

  test('Переход с DashboardPage на PhotosPage', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [RoutePath.dashboard]
    })

    render(
      <PhotosContextProvider>
        <RouterProvider router={router} />
      </PhotosContextProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId(linkToPhotosTestId)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByTestId(linkToPhotosTestId))

    await waitFor(() => {
      expect(screen.getByTestId(linkToDashboardTestId)).toBeInTheDocument()
    })
  })

  test('Переход с PhotosPage на DashboardPage', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [RoutePath.photos]
    })

    render(
      <PhotosContextProvider>
        <RouterProvider router={router} />
      </PhotosContextProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId(linkToDashboardTestId)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByTestId(linkToDashboardTestId))

    await waitFor(() => {
      expect(screen.getByTestId(linkToPhotosTestId)).toBeInTheDocument()
    })
  })

  test('Переход с DashboardPage на PhotosPage и обратно на DashboardPage', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [RoutePath.dashboard]
    })

    render(
      <PhotosContextProvider>
        <RouterProvider router={router} />
      </PhotosContextProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId(linkToPhotosTestId)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByTestId(linkToPhotosTestId))

    await waitFor(() => {
      expect(screen.getByTestId(linkToDashboardTestId)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByTestId(linkToDashboardTestId))

    await waitFor(() => {
      expect(screen.getByTestId(linkToPhotosTestId)).toBeInTheDocument()
    })
  })

  test('Загрузка и вывод списка PhotosPage', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [RoutePath.photos]
    })

    render(
      <PhotosContextProvider>
        <RouterProvider router={router} />
      </PhotosContextProvider>
    )

    mockIsIntersecting(await screen.findByTestId(intersectTestId), true)

    await waitFor(() => {
      const list = screen.getByTestId(photoListTestId)
      expect(list).toBeInTheDocument()
      expect(list.children.length).toEqual(mockPhotoList.length)
    })
  })

  test('Добавление двух элементов списка в избранное на PhotosPage и отображение этих элементов в DashboardPage', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [RoutePath.photos]
    })

    render(
      <PhotosContextProvider>
        <RouterProvider router={router} />
      </PhotosContextProvider>
    )

    mockIsIntersecting(await screen.findByTestId(intersectTestId), true)

    const linkToDashboard = await screen.findByTestId(linkToDashboardTestId)
    const favoriteButtonList = await screen.findAllByTestId(favoritePhotoButtonTestId)

    expect(favoriteButtonList.length).toEqual(mockPhotoList.length)

    const favoriteCount = 2

    for (let i = 0; i < favoriteCount; i++) {
      await userEvent.click(favoriteButtonList[i])
    }

    await userEvent.click(linkToDashboard)

    await waitFor(() => {
      expect(screen.getByText(/Избранные фотографии/i)).toBeInTheDocument()

      const list = screen.getByTestId(photoListTestId)
      expect(list.children.length).toEqual(favoriteCount)
    })
  })
})
