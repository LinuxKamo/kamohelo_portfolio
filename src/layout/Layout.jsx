import React, { memo } from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen bg-[#12100d] flex">
        <SideBar/>
        <main className="px-5 pt-20 overflow-y-auto w-full">
            <Outlet/>
        </main>
    </div>
  )
}

export default memo(Layout)