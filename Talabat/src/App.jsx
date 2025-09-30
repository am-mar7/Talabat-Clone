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
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import LocationContextProvider from '../Context/LocationContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import '@fortawesome/fontawesome-free/css/all.min.css'
import NotProvided from './components/NotProvided/NotProvided'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'



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
    element:<ProtectedRoute> <Layout /> </ProtectedRoute>,
    children: [
      { index: true, element: <Home/>  },
      { path:'Login', element: <Login/>  },
      { path:'SignUp', element: <SignUp/> },
      { path:'Category/:name/:id', element: <CategoryDetails/> },
      { path: '*', element: <NotFound />},
      
    ]
  },
  {path:'NotProvided' , element: <NotProvided/>}
])

function App() {
  const {t} = useTranslation()
  const lang = cookie.get('i18next') || 'en'

  useEffect(() =>{
    window.document.dir = i18next.dir()
  } ,[lang])
  return (
      <LocationContextProvider>
        <RouterProvider router={router}>        
        </RouterProvider>
      </LocationContextProvider>



    // <div>{t('welcome')}</div>
  )
}

export default App
