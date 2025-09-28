import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import cookie from 'js-cookie'

export default function Navbar() {
  let lng;
  const [isOpen , setIsOpen] = useState(false)
  cookie.get('i18next') === 'en' ? lng = 'ar' : lng = 'en'
  const [lang , setLang] = useState(lng)
  ,{t} = useTranslation()
  , userName = JSON.parse(localStorage.getItem('userName'))
  , token = JSON.parse(localStorage.getItem('userToken'))
  function handleLogOut(){
    localStorage.removeItem('userName')
    localStorage.removeItem('userToken')
  }  
  useEffect(()=>{} , [])  
  return <>
      <nav className='bg-orange-50 100 w-full p-4 md:p-5 items-center'>
        <div className="container mx-auto flex flex-col gap-4 sm:flex-row justify-between text-orange-500 text-lg sm:text-2xl">
          <div className='flex gap-6 items-center'>
            <Link>{t('corprate')}</Link>
            <Link>{t('become a partner')}</Link>
          </div>
          <div className='flex gap-4'>
            <span className='cursor-pointer py-2 px-4 bg-white rounded-full' onClick={ () =>{ lang === 'ar' ? setLang('en'): setLang('ar');lang === 'en' ? i18next.changeLanguage('en') : i18next.changeLanguage('ar')} }>{lang} <i className="fa-solid fa-globe"></i></span> 
            
            <button className='cursor-pointer p-2 bg-white rounded-full relative' onClick={() => {isOpen ?setIsOpen(false) : setIsOpen(true)}}>
              <i className="fa-solid fa-user"></i> 
              {              
              isOpen && 
              <div id="dropdown" className="absolute z-30 top-14 left-[-135%]  bg-white text-orange-500 divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                <ul className="text-sm  " aria-labelledby="dropdownDefaultButton">
                  {userName  || token ?
                  <li onClick={() => {handleLogOut()}}>
                    <a href="#" className="block px-4 pb-3 pt-2 hover:bg-orange-600 hover:text-white">{t('Log out')}</a>
                  </li>
                  :
                    <>
                      <li>
                        <Link to='/SignUp' className="block px-4 pt-3 pb-2 hover:bg-orange-600 hover:text-white">{t('Sign Up')}</Link>
                      </li>
                      <li>
                        <Link to='/Login' className="block px-4 py-2 hover:bg-orange-600 hover:text-white">{t('Login')}</Link>
                      </li>
                    </>
                  }
 

                </ul>
              </div>
            }
            </button>
          </div>
        </div>
        
      </nav>
  </>

  
}
