import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserProtectedRouter = () => {

  const userId = (localStorage.getItem('auth-id'))

  return (
    userId ? <Outlet /> : <Navigate to='/login' />
  )
}

export default UserProtectedRouter