import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Main from '../layout/Main'
const home = React.lazy(() => import('../page/home.js'))
const post = React.lazy(() => import('../page/posts.js'))
const login = React.lazy(() => import('../page/login.js'))

const loading = () => <div className="" />

export const LoadComponent = ({ component: Component }) => (
  <Suspense fallback={loading()}>
    <Component />
  </Suspense>
)

const AllRoutes = () => {
  return useRoutes([
    {
      element: <Main />,
      children: [
        {
          path: '',
          element: <LoadComponent component={home} />,
        },
        {
            path:'/posts',
            element: <LoadComponent component={post} path="/post"/>  
        },
        {
          path:'/login',
          element: <LoadComponent component={login} path="/login"/>  
      }
      ]
    }
  ])
}

export { AllRoutes }
