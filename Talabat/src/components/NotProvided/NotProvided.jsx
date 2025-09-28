import React, { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'

export default function NotProvided() {
  const [item , setItem] = useState()
  useEffect(()=>{} , [])   
  
  return <>
      <div className='p-32 text-3xl text-orange-500 text-center'>
        This web site is Not Provided in your country 
        <i className="fa-light fa-face-pensive"></i>
      </div>
  </>

  
}
