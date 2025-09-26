import React, { useEffect, useState} from 'react'
import { useTranslation,} from 'react-i18next'
import logo from '../../assets/Logo.svg'
export default function Home() {

  const {t} = useTranslation()
  const [item , setItem] = useState()
  useEffect(()=>{} , [])   


  return <>
      <section className='bg-orange-50'>
        <div id='heroSection' className="container mx-auto">
          <div className="flex items-center p-5 flex-col gap-5">
            <img src={logo} alt=""/>
            <h1 className='text-orange-500 text-4xl py-3 text-center'>{t("hero text")}</h1>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10 ">                             
              <div className="flex justify-between items-center gap-3 text-slate-900 bg-white px-5 border border-slate-300 rounded-full py-3">
                <div className='flex gap-3 items-center'>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    placeholder={t("search place holder")}
                    className='outline-none md:w-[400px]'
                  />
                </div>
                <i className="fa-solid fa-location-crosshairs"></i>
              </div>
              <button className='bg-orange-500 rounded-full py-3 px-4 text-white hover:bg-orange-600 cursor-pointer'>{t('hero btn')}</button>
            </div>
          </div>
        </div>
      </section>      
  </>

  
}
