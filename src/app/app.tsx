import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { PhotosContextProvider } from 'entities/photos'

import { router } from './router'
import 'shared/styles/styles_clear.css'

const App = () => (
  <PhotosContextProvider>
    <RouterProvider router={router} />
  </PhotosContextProvider>
)

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
