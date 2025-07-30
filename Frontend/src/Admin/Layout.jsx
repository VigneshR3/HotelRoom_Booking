import React from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from './Components/Appbar'

const Layout = () => {
  return (
    <div>
      <AppBar/>
      <main className="pt-16 px-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout