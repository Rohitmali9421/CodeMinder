import ProfileCard from '@/Components/ProfileCard'
import React from 'react'
import { Outlet } from 'react-router-dom'

function ProfileTracker() {
  return (
    <div className='grid grid-cols-2'>
      <ProfileCard/>
      <Outlet/>
    </div>
  )
}

export default ProfileTracker
