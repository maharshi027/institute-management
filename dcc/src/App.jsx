import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import { ToastContainer } from 'react-toastify';


const App = () => {

  const myRouter = createBrowserRouter([
    {path: '/', element: <Login/>},
    { path: '/signup', element: <Signup /> },
    {path: '/login', element: <Login/>},
    {path: '/dashboard', element: <Dashboard/>}

  ])

  return (
    <>
      <RouterProvider router = {myRouter}/> 
      <ToastContainer/>
    </>
  )
}

export default App
