import { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation, initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import cookie from 'js-cookie'
i18next
  .use(HttpApi)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,    
    detection: {
      order: ['cookie' , 'htmlTag', 'localStorage'],
      caches: ['cookie'],
    },
    backend:{
      loadPath:'/locale/{{lng}}/translation.json'
    }
  });

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])

function App() {
  const {t} = useTranslation()
  const lang = cookie.get('i18next') || 'en'
  
  useEffect(() =>{
    window.document.dir = i18next.dir()
  } ,[lang])
  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
    // <div>{t('welcome')}</div>
  )
}

export default App
