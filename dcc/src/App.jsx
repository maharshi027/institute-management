import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'


const App = () => {

  const myRouter = createBrowserRouter([
    {path: '/', element: <Signup/>},
    { path: '/signup', element: <Signup /> },
    {path: '/login', element: <Login/>},
    {path: '/dashboard', element: <Dashboard/>}

  ])

  return (
    <>
      <RouterProvider router = {myRouter}/> 

    </>
  )
}

export default App
