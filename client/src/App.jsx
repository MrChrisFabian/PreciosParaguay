
import { Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import { useState } from 'react'
import { UserProvider } from './context/UserContext'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Register from './views/Register'

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
      </Routes>
    </UserProvider>
  )
}

export default App
