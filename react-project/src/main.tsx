import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
// import './index.css'
import router from './router'
import { Provider } from 'react-redux'
import store from './store'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>

)
