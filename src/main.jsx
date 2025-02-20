import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './Routes';
import Authentication from './Components/Authentication';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authentication>
    <RouterProvider router={router} />
    </Authentication>
  </StrictMode>,
)
