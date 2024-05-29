import { Suspense, lazy } from 'react'
import { Link, Navigate, createBrowserRouter } from 'react-router-dom'

import { RoutePath } from 'shared/router'
import { Layout, Loader } from 'shared/ui'

const DashboardPage = lazy(() => import('pages/dashboard'))
const PhotosPage = lazy(() => import('pages/photos'))
const ErrorPage = lazy(() => import('pages/error'))

export const router = createBrowserRouter(
  [
    {
      path: RoutePath.dashboard,
      element: (
        <Suspense fallback={<Loader center />}>
          <Layout routeLink={<Link to={RoutePath.photos}>Фотографии</Link>}>
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
          <Layout routeLink={<Link to={RoutePath.dashboard}>Назад</Link>}>
            <PhotosPage />
          </Layout>
        </Suspense>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: RoutePath.notFound,
      element: <Navigate to={RoutePath.dashboard} replace />
    }
  ],
  { basename: import.meta.env.BASE_URL }
)

console.log('BASE_URL: ', import.meta.env.BASE_URL)
