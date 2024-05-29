import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { PhotosContextProvider } from 'entities/photos'

import { router } from './router'
import 'shared/styles/styles_clear.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PhotosContextProvider>
    <RouterProvider router={router} />
  </PhotosContextProvider>
)
