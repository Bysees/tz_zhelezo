import { Suspense, lazy } from 'react'
import { Link, Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'

import { RoutePath } from 'shared/router'
import { Layout, Loader } from 'shared/ui'

const DashboardPage = lazy(() => import('pages/dashboard'))
const PhotosPage = lazy(() => import('pages/photos'))
const ErrorPage = lazy(() => import('pages/error'))

export const routes: RouteObject[] = [
  {
    index: true,
    path: RoutePath.dashboard,
    element: (
      <Suspense fallback={<Loader center />}>
        <Layout
          routeLink={
            <Link
              data-testid={'link-photos'}
              to={RoutePath.photos}>
              Фотографии
            </Link>
          }>
          <DashboardPage />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: RoutePath.photos,
    element: (
      <Suspense fallback={<Loader center />}>
        <Layout
          routeLink={
            <Link
              data-testid={'link-dashboard'}
              to={RoutePath.dashboard}>
              Назад
            </Link>
          }>
          <PhotosPage />
        </Layout>
      </Suspense>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: RoutePath.notFound,
    element: (
      <Navigate
        to={RoutePath.dashboard}
        replace
      />
    )
  }
]

export const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })
