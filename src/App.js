import React from 'react'
import { UserProvider } from './provider/Auth'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home/Home'
import Login from './screens/Auth/Login'
import Dashboard from './screens/Dashboard/Dashboard'

import { Toaster } from 'react-hot-toast'
import NotFound from './screens/NotFound/NotFound'

export default function App() {
  return (
    <UserProvider>

      <Toaster/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          
          
          <Route path="*" element={<NotFound/>} />
      </Routes>
    </UserProvider>
  )
}
