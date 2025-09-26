import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() { 
  const [apiError , setApiError] = useState(null)
  , [loading , setLoading] = useState(false)
  , {t} = useTranslation()
  , navigator = useNavigate()
  , yupSchema = Yup.object().shape({
    email : Yup.string().email('email is invaild').required('email is required'),
    password : Yup.string().required('password is required'),
  })

  , formik = useFormik({
    initialValues:{
      email :'',
      password:'',
    },
    onSubmit:handleLogin,
    validationSchema:yupSchema
  })  
  function handleLogin(values){
    setLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values )
    .then((response) => {
      localStorage.setItem('userToken' , response.data.token)
      localStorage.setItem('userName' , values.name)    
      navigator('/')
    })
    .catch((apiResponse) => {
      setApiError(apiResponse?.response?.data?.message)
      setLoading(false)   
    }) 
  }
  useEffect(() =>{
    if(localStorage.getItem('userName')){
      console.log('a7a');    
      navigator('/')
    }  
  } , [])
  return <>
    <div className="py-10">
      <form onSubmit={formik.handleSubmit} className="w-[80%] sm:w-[70%] lg:w-[40%] mx-auto flex flex-col gap-6">
      <h1 className='text-3xl text-orange-500 text-center'>{t('Login now')}</h1>
        <div className="relative">
          <input
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            id="floating-phone-email"
            className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating-phone-email"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600"
          >
            {t('Email')}
          </label>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs">{formik.errors.email}</p>
          )}
        </div>

        <div className="relative">
            <input
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              id="floating-phone-password"
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating-phone-password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600"
            >
              {t('Password')}
            </label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
        </div>

        <div className="w-full flex justify-center gap-2 items-center">
            <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 min-w-[150px] w-1/4 rounded-lg hover:bg-orange-600 cursor-pointer"
          >
            {loading?<i className='fas fa-spinner fa-spin'></i>:null}{t('Login')}
          </button>
        </div>

        <div className='flex gap-2.5 my-2'>
            <p className='text-slate-600'>{t('switch to Register')}</p>
            <Link className='text-orange-500 hover:text-orange-600' to="/SignUp">{t('Sign Up')}</Link>
        </div>
        {apiError && <p className='bg-red-300 text-red-600 p-3'>{apiError}</p>}
      </form>
    </div>
  </>
  
}
