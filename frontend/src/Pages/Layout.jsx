import React from 'react'
import Header from '../Components/Home/Header'
import Footer from '../Components/Home/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div>
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Layout
