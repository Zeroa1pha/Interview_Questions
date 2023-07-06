import { createBrowserRouter,Navigate} from 'react-router-dom'
import Login from '../pages/Login.tsx'
import Search from '../pages/Search.tsx'
import Layout from '../pages/Layout.tsx'
import Register from '../pages/Register.tsx'
import ForgetPass from '../pages/ForgetPass.tsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/search' />,
    },
    {
      path: '/login',
      element: <Layout />,
      children:[
        {
          index:true,
          element: <Login />,
        },
        {
          path:'register',
          element: <Register />,
        },{
          path:'forgetpass',
          element: <ForgetPass />,
        }
      ]
    },
    {
      path: '/search',
      element: <Search />,
    },
  ])
  
  export default router