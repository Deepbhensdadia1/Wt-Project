import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtectedRouter = () => {

  const userId = (localStorage.getItem('auth-id'))
  const userType = (localStorage.getItem('auth-type'))

  return (
    userId && userType === '0' ? <Outlet /> : <Navigate to='/login' />
  )
}

export default AdminProtectedRouter