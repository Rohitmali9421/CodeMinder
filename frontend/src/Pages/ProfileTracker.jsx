import React from 'react'
import { Outlet } from 'react-router-dom'

function ProfileTracker() {
  return (
    <div className='pt-20'>
      ProfileTracker
      <Outlet/>
    </div>
  )
}

export default ProfileTracker
