import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layouts/index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';
import { StoreProvider } from './app/context/StoreContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
    <RouterProvider router={router}></RouterProvider>
    </StoreProvider>
  </StrictMode>,
)
