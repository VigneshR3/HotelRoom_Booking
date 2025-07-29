import React from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from './Components/Appbar'

const Layout = () => {
  return (
    <div>
      <AppBar/>
        <Outlet/>
    </div>
  )
}

export default Layout