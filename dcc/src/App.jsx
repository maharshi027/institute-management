import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Home from './components/home/Home'
import AddBatch from './components/batch/AddBatch'
import GetAllBatch from './components/batch/GetAllBatch'
import AddStudent from './components/student/AddStudent'
import GetAllStudent from './components/student/GetAllStudent'
import CollectFee from './components/fee/CollectFee'
import PaymentHistory from './components/fee/PayementHistory'
import Dashboard from './components/dashboard/Dashboard'
import { ToastContainer } from 'react-toastify';


const App = () => {

  const myRouter = createBrowserRouter([
    {path : '', Component : Login },
    {path : 'login', Component: Login},
    { path : 'signup', Component: Signup },
    {path : 'dashboard', Component: Dashboard, children: [
        {path : '', Component: Home},
        {path : 'home', Component: Home},
        {path : 'batches', Component: GetAllBatch},
        {path : 'add-batch', Component: AddBatch},
        {path : 'students', Component: GetAllStudent},
        {path : 'add-student', Component: AddStudent},
        {path : 'collect-fee', Component: CollectFee},
        {path : 'payment-history', Component: PaymentHistory},

    ]}

  ])

  return (
    <>
      <RouterProvider router = {myRouter}/> 
      <ToastContainer/>
    </>
  )
}

export default App
