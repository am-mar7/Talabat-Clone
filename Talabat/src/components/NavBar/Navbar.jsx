import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isOpen , setIsOpen] = useState(false)
  const [lang , setLang] = useState('Ar')
  useEffect(()=>{} , [])  
  const {t} = useTranslation()
  return <>
      <nav className='bg-orange-50 100 w-full p-4 md:p-5 items-center'>
        <div className="container mx-auto flex flex-col gap-4 sm:flex-row justify-between text-orange-500 text-lg sm:text-2xl">
          <div className='flex gap-6 items-center'>
            <Link >{t('corprate')}</Link>
            <Link>{t('become a partner')}</Link>
          </div>
          <div className='flex gap-4'>
            <span className='cursor-pointer py-2 px-4 bg-white rounded-full' onClick={ () =>{ lang === 'Ar' ? setLang('En'): setLang('Ar');lang === 'En' ? i18next.changeLanguage('en') : i18next.changeLanguage('ar')} }>{lang} <i className="fa-solid fa-globe"></i></span> 
            
            <button className='cursor-pointer p-2 bg-white rounded-full relative' onClick={() => {isOpen ?setIsOpen(false) : setIsOpen(true)}}>
              <i className="fa-solid fa-user"></i> 
              {              
              isOpen && 
              <div id="dropdown" className="absolute z-30 top-14 left-[-135%]  bg-white text-orange-500 divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                <ul className="text-sm  " aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#" className="block px-4 pt-3 pb-2 hover:bg-orange-600 hover:text-white">Sign Up</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-orange-600 hover:text-white">Login</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 pb-3 pt-2 hover:bg-orange-600 hover:text-white">Log out</a>
                  </li>
                </ul>
              </div>
            }
            </button>
          </div>
        </div>
        
      </nav>
  </>

  
}
