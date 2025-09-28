import React, { useEffect, useState } from 'react'
import Navbar from '../NavBar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'



export default function Layout() {
  const [item , setItem] = useState()
  useEffect(()=>{} , [])  

  
  return <>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  </>

  
}
