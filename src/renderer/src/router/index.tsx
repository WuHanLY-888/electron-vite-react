// import Home from '@/views/home'
// import About from '@/views/about'
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Login from '@renderer/Pages/Login'

const Layout = lazy(() => import('@renderer/layout'))
const About = lazy(() => import('@renderer/Pages/about'))
const Page1 = lazy(() => import('@renderer/Pages/page1'))
const Page2 = lazy(() => import('@renderer/Pages/about copy 2'))

const withLoadingComponent = (comp: JSX.Element) => <React.Suspense>{comp}</React.Suspense>

const routes = [
    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        path: '/',
        element: withLoadingComponent(<Layout />),
        auth: true,
        children: [
            {
                path: '/about',
                element: withLoadingComponent(<About />),
                meta: {
                    about: 'test'
                },
                auth: true
            },
            {
                path: '/page1',
                element: withLoadingComponent(<Page1 />)
            },
            {
                path: '/page2',
                element: withLoadingComponent(<Page2 />)
            }
        ]
    },
    {
        path: '/login',
        element: withLoadingComponent(<Login />)
    }
]

export default routes
