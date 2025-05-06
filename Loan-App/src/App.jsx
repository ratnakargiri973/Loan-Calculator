import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderLayout from './components/HeaderLayout'

function App() {

  return (
    <>
       <main>
        <HeaderLayout />
        <Outlet />
       </main>
    </>
  )
}

export default App
